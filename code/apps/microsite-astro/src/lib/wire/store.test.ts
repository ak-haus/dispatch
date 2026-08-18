/**
 * Wire store discipline (Golden Board A3) — proves the ADR-0001 polling
 * spec mechanically: exponential backoff with full jitter (reset on
 * success), last-good entries never unmount, reconnecting only after 3
 * consecutive misses, pause-on-hidden with throttled revalidation, and the
 * fastest-surface-wins interval law.
 *
 * The store is a module-scope singleton, so every test imports a FRESH
 * module (resetModules + dynamic import) with the feed URL stubbed before
 * evaluation. Timers and Date are faked; jitter is pinned via Math.random.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

type StoreModule = typeof import('./store')

const FEED_URL = 'https://wire-unit.test/feed.json'

const feedWith = (id: string) => ({
	schemaVersion: 1,
	generatedAt: '2026-08-18T12:00:00.000Z',
	entries: [
		{
			id,
			ts: '2026-08-18T11:00:00.000Z',
			platform: 'devto',
			kind: 'publish',
			title: `Publish ${id}`,
			url: `https://dev.to/prime/${id}`,
		},
	],
})

const ok = (body: unknown) => ({ ok: true, json: async () => body }) as Response
const httpError = (status: number) => ({ ok: false, status, json: async () => ({}) }) as Response

let store: StoreModule
let fetchMock: ReturnType<typeof vi.fn>
let unsubs: Array<() => void>
let hidden: boolean

beforeEach(async () => {
	vi.useFakeTimers()
	vi.stubEnv('PUBLIC_WIRE_FEED_URL', FEED_URL)
	fetchMock = vi.fn()
	vi.stubGlobal('fetch', fetchMock)
	hidden = false
	Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden })
	unsubs = []
	vi.resetModules()
	store = await import('./store')
})

afterEach(() => {
	for (const u of unsubs) u()
	vi.useRealTimers()
	vi.unstubAllEnvs()
	vi.unstubAllGlobals()
})

function subscribe(): void {
	unsubs.push(store.subscribe(() => {}))
}

async function flush(ms = 0): Promise<void> {
	await vi.advanceTimersByTimeAsync(ms)
}

describe('initial state', () => {
	it('serves the build snapshot as stale before any poll', () => {
		const s = store.getSnapshot()
		expect(s.status).toBe('stale')
		expect(s.lastFetched).toBeNull()
		expect(s.feed.schemaVersion).toBe(1)
		expect(store.getServerSnapshot()).toEqual(s)
	})
})

describe('polling', () => {
	it('fetches on subscribe and goes live', async () => {
		fetchMock.mockResolvedValueOnce(ok(feedWith('a')))
		subscribe()
		await flush()
		expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(fetchMock).toHaveBeenCalledWith(FEED_URL, { cache: 'no-cache' })
		expect(store.getSnapshot().status).toBe('live')
		expect(store.getSnapshot().feed.entries[0]?.id).toBe('a')
		expect(store.getSnapshot().lastFetched).not.toBeNull()
	})

	it('repolls at the base interval', async () => {
		fetchMock.mockResolvedValue(ok(feedWith('a')))
		subscribe()
		await flush()
		fetchMock.mockResolvedValue(ok(feedWith('b')))
		await flush(59_999)
		expect(fetchMock).toHaveBeenCalledTimes(1)
		await flush(1)
		expect(fetchMock).toHaveBeenCalledTimes(2)
		expect(store.getSnapshot().feed.entries[0]?.id).toBe('b')
	})

	it('the fastest surface wins the interval; slower joiners never widen it', async () => {
		fetchMock.mockResolvedValue(ok(feedWith('a')))
		store.configureWireInterval(30_000) // /wire mounts at 30s
		store.configureWireInterval(60_000) // ticker joins at 60s — must not widen
		subscribe()
		await flush()
		expect(fetchMock).toHaveBeenCalledTimes(1)
		await flush(30_000)
		expect(fetchMock).toHaveBeenCalledTimes(2)
	})

	it('stops polling when the last subscriber leaves', async () => {
		fetchMock.mockResolvedValue(ok(feedWith('a')))
		subscribe()
		await flush()
		unsubs.pop()!()
		await flush(600_000)
		expect(fetchMock).toHaveBeenCalledTimes(1)
	})
})

describe('failure discipline — last-good + backoff', () => {
	it('keeps the last-good feed through failures; reconnecting only after 3 misses', async () => {
		vi.spyOn(Math, 'random').mockReturnValue(1) // jitter pinned to full ceiling
		fetchMock.mockResolvedValueOnce(ok(feedWith('good')))
		subscribe()
		await flush()
		expect(store.getSnapshot().status).toBe('live')

		fetchMock.mockRejectedValue(new Error('rail down'))
		// miss 1 at the 60s poll → backoff ceiling 60s·2¹ = 120s
		await flush(60_000)
		expect(store.getSnapshot().status).toBe('live') // not yet degraded
		// miss 2 after 120s → ceiling 240s
		await flush(120_000)
		expect(store.getSnapshot().status).toBe('live')
		// miss 3 after 240s → status degrades, feed stays last-good
		await flush(240_000)
		expect(store.getSnapshot().status).toBe('reconnecting')
		expect(store.getSnapshot().feed.entries[0]?.id).toBe('good')
	})

	it('caps backoff at 5 minutes and resets it on success', async () => {
		vi.spyOn(Math, 'random').mockReturnValue(1)
		fetchMock.mockRejectedValue(new Error('down'))
		subscribe()
		await flush() // miss 1 (immediate tick) → ceiling 120s
		await flush(120_000) // miss 2 → 240s
		await flush(240_000) // miss 3 → 480s → CAPPED at 300s
		expect(fetchMock).toHaveBeenCalledTimes(3)
		await flush(299_999)
		expect(fetchMock).toHaveBeenCalledTimes(3) // still inside the cap window
		fetchMock.mockResolvedValue(ok(feedWith('back')))
		await flush(1) // capped retry fires and succeeds
		expect(fetchMock).toHaveBeenCalledTimes(4)
		expect(store.getSnapshot().status).toBe('live')
		// failures reset → next poll at the plain base interval again
		await flush(60_000)
		expect(fetchMock).toHaveBeenCalledTimes(5)
	})

	it('backoff growth is exponential, not linear (2/4/8s divergence at a 1s base)', async () => {
		// Mutant killer: base·2^n vs base·2·n coincide at n=1,2 under the 60s
		// base (the cap truncates before they diverge). A 1s base exposes the
		// divergence at n=3: exponential 8s vs linear 6s.
		vi.spyOn(Math, 'random').mockReturnValue(1)
		store.configureWireInterval(1_000)
		fetchMock.mockRejectedValue(new Error('down'))
		subscribe()
		await flush() // miss 1 → ceiling 2s
		expect(fetchMock).toHaveBeenCalledTimes(1)
		await flush(2_000) // miss 2 → ceiling 4s
		expect(fetchMock).toHaveBeenCalledTimes(2)
		await flush(4_000) // miss 3 → ceiling 8s (linear would arm 6s)
		expect(fetchMock).toHaveBeenCalledTimes(3)
		await flush(6_000) // a linear mutant fires here
		expect(fetchMock).toHaveBeenCalledTimes(3)
		await flush(2_000) // t=8s after miss 3 — the exponential retry
		expect(fetchMock).toHaveBeenCalledTimes(4)
	})

	it('a miss after recovery starts a NEW streak (failures reset, ceiling re-based)', async () => {
		// Mutant killer: deleting `failures = 0` on success survives the plain
		// reset test (the success path schedules baseInterval regardless). The
		// tell is the NEXT miss: with the reset it is miss #1 (status stays
		// live); without it it is miss #4 (instant 'reconnecting').
		vi.spyOn(Math, 'random').mockReturnValue(1)
		fetchMock.mockRejectedValue(new Error('down'))
		subscribe()
		await flush() // miss 1
		await flush(120_000) // miss 2
		await flush(240_000) // miss 3
		expect(store.getSnapshot().status).toBe('reconnecting')
		fetchMock.mockResolvedValue(ok(feedWith('back')))
		await flush(300_000) // capped retry succeeds
		expect(store.getSnapshot().status).toBe('live')

		fetchMock.mockRejectedValue(new Error('down again'))
		await flush(60_000) // one miss on a fresh streak
		expect(store.getSnapshot().status).toBe('live') // NOT reconnecting
		fetchMock.mockResolvedValue(ok(feedWith('again')))
		await flush(120_000) // and its ceiling is base·2¹, not the 300s cap
		expect(store.getSnapshot().status).toBe('live')
		expect(store.getSnapshot().feed.entries[0]?.id).toBe('again')
	})

	it('jitter draws from [0, ceiling] with a 1s floor (random=0 retries at 1s)', async () => {
		// Mutant killer: both other backoff tests pin random=1, where full
		// jitter and no-jitter are indistinguishable. random=0 separates them:
		// jittered delay = max(1s, 0) = 1s; a no-jitter mutant waits 120s.
		vi.spyOn(Math, 'random').mockReturnValue(0)
		fetchMock.mockRejectedValue(new Error('down'))
		subscribe()
		await flush() // miss 1
		expect(fetchMock).toHaveBeenCalledTimes(1)
		await flush(999)
		expect(fetchMock).toHaveBeenCalledTimes(1)
		await flush(1) // the 1s floor fires
		expect(fetchMock).toHaveBeenCalledTimes(2)
	})

	it('treats an HTTP error status as a miss', async () => {
		fetchMock.mockResolvedValue(httpError(500))
		subscribe()
		await flush()
		expect(store.getSnapshot().status).toBe('stale')
		expect(store.getSnapshot().lastFetched).toBeNull()
	})

	it('rejects an invalid feed shape whole and keeps the last-good state', async () => {
		fetchMock.mockResolvedValueOnce(ok(feedWith('good')))
		subscribe()
		await flush()
		// hostile/corrupt body: one entry smuggles a javascript: url
		const hostile = feedWith('good')
		hostile.entries.push({ ...hostile.entries[0]!, id: 'evil', url: 'javascript:alert(1)' })
		fetchMock.mockResolvedValue(ok(hostile))
		await flush(60_000)
		expect(fetchMock).toHaveBeenCalledTimes(2)
		expect(store.getSnapshot().feed.entries.map((e) => e.id)).toEqual(['good'])
	})
})

describe('visibility discipline', () => {
	it('pauses on hidden, clears the timer, and revalidates on return', async () => {
		fetchMock.mockResolvedValue(ok(feedWith('a')))
		subscribe()
		await flush()
		expect(store.getSnapshot().status).toBe('live')

		hidden = true
		document.dispatchEvent(new Event('visibilitychange'))
		expect(store.getSnapshot().status).toBe('paused')
		await flush(600_000) // hidden: no polls fire
		expect(fetchMock).toHaveBeenCalledTimes(1)

		hidden = false
		fetchMock.mockResolvedValue(ok(feedWith('fresh')))
		document.dispatchEvent(new Event('visibilitychange'))
		await flush()
		expect(fetchMock).toHaveBeenCalledTimes(2) // immediate revalidate
		expect(store.getSnapshot().status).toBe('live')
		expect(store.getSnapshot().feed.entries[0]?.id).toBe('fresh')
	})

	it('throttles focus revalidation inside the 5s window', async () => {
		fetchMock.mockResolvedValue(ok(feedWith('a')))
		subscribe()
		await flush()
		window.dispatchEvent(new Event('focus')) // 0ms after success — throttled
		await flush()
		expect(fetchMock).toHaveBeenCalledTimes(1)
		await flush(5_001)
		window.dispatchEvent(new Event('focus')) // outside the window — revalidates
		await flush()
		expect(fetchMock).toHaveBeenCalledTimes(2)
	})

	it('hide→unhide inside the throttle window re-arms the chain instead of killing it', async () => {
		// Regression (found by the 2026-08-18 adversarial verify): the hide
		// branch clears the timer; if the return lands <5s after a successful
		// fetch, the throttle used to bare-return — no timer, no chain, status
		// stranded on 'paused' forever. A tab-flick killed the wire.
		fetchMock.mockResolvedValue(ok(feedWith('a')))
		subscribe()
		await flush()
		expect(store.getSnapshot().status).toBe('live')

		hidden = true
		document.dispatchEvent(new Event('visibilitychange'))
		expect(store.getSnapshot().status).toBe('paused')
		await flush(2_000) // return well inside the 5s throttle
		hidden = false
		document.dispatchEvent(new Event('visibilitychange'))

		expect(store.getSnapshot().status).toBe('live') // not stranded paused
		fetchMock.mockResolvedValue(ok(feedWith('b')))
		await flush(60_000) // the chain must still be alive
		expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(2)
		expect(store.getSnapshot().feed.entries[0]?.id).toBe('b')
	})

	it('a scheduled tick that lands while hidden parks as paused instead of fetching', async () => {
		fetchMock.mockResolvedValue(ok(feedWith('a')))
		subscribe()
		await flush()
		hidden = true // tab hides WITHOUT the event (e.g. race) — tick itself must guard
		await flush(60_000)
		expect(fetchMock).toHaveBeenCalledTimes(1)
		expect(store.getSnapshot().status).toBe('paused')
	})
})
