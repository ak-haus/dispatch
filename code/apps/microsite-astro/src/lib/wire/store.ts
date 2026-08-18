/**
 * Live Wire polling store — ONE data layer for both surfaces (ADR-0001 Addendum D2).
 *
 * Module-scope singleton shared via useSyncExternalStore: WireTicker and
 * WirePage subscribe here; one in-flight request serves every island on the
 * page. Polling discipline per the researched spec:
 *   - pause when document.hidden; immediate revalidate on visibility/focus/online
 *   - browser-native ETag revalidation (cache: 'no-cache' → free CDN 304s;
 *     never cache-busting query params — those force billed MISSes)
 *   - exponential backoff with full jitter on failure, reset on success
 *   - last-good entries NEVER unmount: failures keep the previous feed and
 *     flip status to 'reconnecting' only after 3 consecutive misses
 *
 * Framework-free on purpose — React wiring lives in the islands.
 */

import { EMPTY_FEED, WIRE_FEED_URL, isWireFeed, type WireFeed } from './contract'
import snapshotData from '../../data/wire-snapshot.json'

export type WireStatus = 'live' | 'stale' | 'paused' | 'reconnecting'

export interface WireState {
	feed: WireFeed
	status: WireStatus
	lastFetched: number | null
}

const FAILURES_BEFORE_RECONNECTING = 3
const BACKOFF_CAP_MS = 5 * 60_000
const REVALIDATE_THROTTLE_MS = 5_000

const snapshot: WireFeed = isWireFeed(snapshotData) ? snapshotData : EMPTY_FEED

/** Stable initial state — server render and first client render must match. */
const INITIAL_STATE: WireState = { feed: snapshot, status: 'stale', lastFetched: null }

let state: WireState = INITIAL_STATE
let listeners: Array<() => void> = []
let baseIntervalMs = 60_000
let timer: ReturnType<typeof setTimeout> | null = null
let failures = 0
let started = false

function emit(next: WireState) {
	state = next
	for (const l of listeners) l()
}

function clearTimer() {
	if (timer !== null) {
		clearTimeout(timer)
		timer = null
	}
}

function schedule(delayMs: number) {
	clearTimer()
	timer = setTimeout(tick, delayMs)
}

async function tick() {
	clearTimer()
	if (typeof document !== 'undefined' && document.hidden) {
		if (state.status !== 'paused') emit({ ...state, status: 'paused' })
		return // visibilitychange revalidates and restarts the chain
	}
	try {
		const res = await fetch(WIRE_FEED_URL, { cache: 'no-cache' })
		if (!res.ok) throw new Error(`feed ${res.status}`)
		const body: unknown = await res.json()
		if (!isWireFeed(body)) throw new Error('feed shape invalid')
		failures = 0
		emit({ feed: body, status: 'live', lastFetched: Date.now() })
		schedule(baseIntervalMs)
	} catch {
		failures += 1
		// Keep the last-good feed rendered — only the status degrades.
		const status: WireStatus =
			failures >= FAILURES_BEFORE_RECONNECTING ? 'reconnecting' : state.status
		if (status !== state.status) emit({ ...state, status })
		// Full jitter (AWS): random in [0, min(cap, base·2^n)]
		const ceiling = Math.min(BACKOFF_CAP_MS, baseIntervalMs * 2 ** failures)
		schedule(Math.max(1_000, Math.random() * ceiling))
	}
}

function revalidateNow() {
	if (typeof document !== 'undefined' && document.hidden) return
	if (state.lastFetched !== null && Date.now() - state.lastFetched < REVALIDATE_THROTTLE_MS) return
	void tick()
}

function onVisibilityChange() {
	if (document.hidden) {
		clearTimer()
		if (state.status !== 'paused') emit({ ...state, status: 'paused' })
	} else {
		revalidateNow()
	}
}

function start() {
	if (started || !WIRE_FEED_URL || typeof window === 'undefined') return
	started = true
	document.addEventListener('visibilitychange', onVisibilityChange)
	window.addEventListener('focus', revalidateNow)
	window.addEventListener('online', revalidateNow)
	void tick()
}

function stop() {
	if (!started) return
	started = false
	clearTimer()
	document.removeEventListener('visibilitychange', onVisibilityChange)
	window.removeEventListener('focus', revalidateNow)
	window.removeEventListener('online', revalidateNow)
}

/** Surfaces declare their cadence at mount (60s ticker · 30s /wire, per the
 *  kickoff-gate decision). If two surfaces ever share a page, the faster wins. */
export function configureWireInterval(ms: number) {
	baseIntervalMs = Math.min(baseIntervalMs, ms)
}

export function subscribe(listener: () => void): () => void {
	listeners = [...listeners, listener]
	start()
	return () => {
		listeners = listeners.filter((l) => l !== listener)
		if (listeners.length === 0) stop()
	}
}

export function getSnapshot(): WireState {
	return state
}

export function getServerSnapshot(): WireState {
	return INITIAL_STATE
}
