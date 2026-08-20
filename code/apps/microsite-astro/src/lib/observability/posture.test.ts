/**
 * The error-tracking posture, as a gate.
 *
 * U6 decided Sentry with a set of explicit corrections to the vendor's own
 * onboarding: no replay, no user info, sample rates tuned, wired through
 * `getPrimeSentryConfig` rather than the snippet. Those corrections are only
 * worth the file they are written in if weakening them FAILS something — so
 * they are asserted here, on the existing `unit (vitest)` required context. No
 * new ruleset seat; the row's privacy stance simply cannot regress quietly.
 *
 * The same reasoning as the analytics posture test next door, and the same
 * choice: assert the RUNTIME values that ship, not the presence of a string in
 * a file.
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	SENTRY_DATA_COLLECTION,
	SENTRY_DENY_URLS,
	SENTRY_IGNORE_ERRORS,
	SENTRY_REPLAY_RATES,
	SENTRY_SAMPLE_RATE,
} from './posture'
import * as client from './client'

/** Arm the modules under a stubbed DSN. The config is read once at module
 *  scope (so the guard resolves at build time in the real bundle), which means
 *  arming it in a test requires a fresh module graph, not a mutated value. */
async function armed() {
	vi.resetModules()
	vi.stubEnv('PUBLIC_SENTRY_DSN', 'https://examplePublicKey@o0.ingest.us.sentry.io/0')
	// Mocked at the vendor-module seam, not at @sentry/browser: `./sentry` is
	// the only file allowed to touch the SDK, so this is the boundary the rest
	// of the code is written against.
	const init = vi.fn()
	const captureException = vi.fn()
	vi.doMock('./sentry', () => ({ startSentry: init, reportToSentry: captureException }))
	const boot = await import('./boot')
	const armedClient = await import('./client')
	return { boot, client: armedClient, init, captureException }
}

afterEach(() => {
	vi.unstubAllEnvs()
	vi.doUnmock('./sentry')
})

describe('the privacy posture', () => {
	it('never populates user fields', () => {
		// The line that survives the v11 default flip. @sentry/core's own
		// resolveDataCollectionOptions notes that in v11 the defaults apply and
		// `userInfo` becomes true — inheriting rather than naming it is how a
		// version bump would silently start collecting readers.
		expect(SENTRY_DATA_COLLECTION.userInfo).toBe(false)
	})

	it('collects nothing attributable to a reader', () => {
		// Sentry is US-region and the page ships no consent banner, so error
		// tracking earns that stance by collecting nothing personal at all.
		expect(SENTRY_DATA_COLLECTION.cookies).toBe(false)
		expect(SENTRY_DATA_COLLECTION.urlQueryParams).toBe(false)
		expect(SENTRY_DATA_COLLECTION.httpBodies).toEqual([])
	})

	it('does not capture local variables from stack frames', () => {
		// The default is true. A throw inside SearchPalette would otherwise put
		// the reader's typed query into a captured frame.
		expect(SENTRY_DATA_COLLECTION.stackFrameVariables).toBe(false)
	})

	it('ships with session replay off at both sample rates', () => {
		// Register §9: replay OFF at launch. `replayIntegration` is also never
		// imported, so the code is not in the bundle — this is the second of the
		// two mechanisms, the one that still holds if someone adds the import.
		expect(SENTRY_REPLAY_RATES.replaysSessionSampleRate).toBe(0)
		expect(SENTRY_REPLAY_RATES.replaysOnErrorSampleRate).toBe(0)
	})
})

describe('the quota posture', () => {
	it('captures every error rather than sampling signal away', () => {
		// 5K/month free tier: at launch volume the risk is missing the one
		// reproduction that matters, not exceeding the ceiling.
		expect(SENTRY_SAMPLE_RATE).toBe(1.0)
	})

	it('filters noise no code change here could fix', () => {
		expect(SENTRY_IGNORE_ERRORS).toContain('ResizeObserver loop completed with undelivered notifications')
		expect(SENTRY_IGNORE_ERRORS).toContain('Failed to fetch')
		expect(SENTRY_DENY_URLS.some((pattern) => pattern.test('chrome-extension://abc/inject.js'))).toBe(true)
	})
})

describe('the unarmed build', () => {
	it('is inert until the DSN reaches the build', () => {
		// No PUBLIC_SENTRY_DSN in test/CI env: nothing may load or send. A
		// missing DSN must be a clean no-op, never a half-wired state.
		expect(client.errorTrackingArmed()).toBe(false)
		expect(client.errorTrackingReady()).toBe(false)
	})

	it('attaches no listeners at all', async () => {
		const { default: boot } = { default: await import('./boot') }
		const add = vi.spyOn(window, 'addEventListener')
		boot.bootErrorTracking()
		expect(add).not.toHaveBeenCalled()
	})

	it('swallows a capture call rather than throwing into the page', async () => {
		await expect(client.captureError(new Error('unarmed'))).resolves.toBeUndefined()
	})
})

describe('the early-error trap', () => {
	it('reports an error thrown before the SDK exists', async () => {
		const { boot, init, captureException } = await armed()
		boot.bootErrorTracking()

		const thrown = new Error('hydration blew up')
		window.dispatchEvent(new ErrorEvent('error', { error: thrown, filename: '/_astro/index.js' }))
		await vi.waitFor(() => expect(captureException).toHaveBeenCalled())

		// The whole point of the trap: the SDK is initialised BECAUSE an error
		// happened, and the error that triggered it is still reported.
		expect(init).toHaveBeenCalledTimes(1)
		expect(captureException).toHaveBeenCalledWith(thrown)
	})

	it('detaches its listeners once the SDK owns them, so nothing reports twice', async () => {
		const { boot, captureException } = await armed()
		boot.bootErrorTracking()

		window.dispatchEvent(new ErrorEvent('error', { error: new Error('first'), filename: '/_astro/a.js' }))
		await vi.waitFor(() => expect(captureException).toHaveBeenCalledTimes(1))

		// Sentry's own global handlers are live now; ours must be gone.
		window.dispatchEvent(new ErrorEvent('error', { error: new Error('second'), filename: '/_astro/a.js' }))
		await new Promise((resolve) => setTimeout(resolve, 10))
		expect(captureException).toHaveBeenCalledTimes(1)
	})

	it('ignores a browser extension rather than loading the SDK for it', async () => {
		const { boot, init } = await armed()
		boot.bootErrorTracking()

		window.dispatchEvent(
			new ErrorEvent('error', { error: new Error('extension'), filename: 'chrome-extension://abc/inject.js' }),
		)
		await new Promise((resolve) => setTimeout(resolve, 10))

		// "No vendor bytes on a healthy page" has to survive a reader who has
		// extensions installed — otherwise the trade this design makes is void.
		expect(init).not.toHaveBeenCalled()
	})

	it('caps the buffer so a runaway loop cannot retain unbounded errors', async () => {
		const { boot, captureException } = await armed()
		boot.bootErrorTracking()

		for (let i = 0; i < 50; i++) {
			window.dispatchEvent(new ErrorEvent('error', { error: new Error(`loop ${i}`), filename: '/_astro/a.js' }))
		}
		await vi.waitFor(() => expect(captureException).toHaveBeenCalled())
		expect(captureException.mock.calls.length).toBeLessThanOrEqual(5)
	})

	it('catches an unhandled promise rejection too', async () => {
		const { boot, captureException } = await armed()
		boot.bootErrorTracking()

		const reason = new Error('await blew up')
		window.dispatchEvent(
			Object.assign(new Event('unhandledrejection'), { reason }) as unknown as PromiseRejectionEvent,
		)
		await vi.waitFor(() => expect(captureException).toHaveBeenCalledWith(reason))
	})
})
