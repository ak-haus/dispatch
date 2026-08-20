/**
 * The early-error trap — what actually observes a failure (Golden Board A6,
 * error-tracking half). Booted once per page from StackLayout.
 *
 * THE PROBLEM THIS SOLVES. Sentry's own guidance is to initialise the SDK "as
 * early as possible", because the errors worth catching on a JS-first
 * scrollytelling site happen during hydration — GSAP/Motion/Lenis islands
 * coming up, before any lazily-imported module has finished loading. But
 * eagerly shipping the vendor bundle on every page view spends bytes and main-
 * thread time on the ~100% of page views where nothing breaks, and both are
 * held by a live ratchet (`lighthouse (budget ratchet)`, A4).
 *
 * THE RESOLUTION. Take the early handlers without taking the early bytes: this
 * module attaches two listeners synchronously — a few hundred bytes of
 * first-party code, in the page's own bundle — and buffers what they catch.
 * The vendor SDK is fetched only once something has actually gone wrong, and
 * the buffered errors are replayed into it on arrival. A healthy page view
 * pays for the listeners and nothing else; a broken one pays for the SDK and
 * reports the error that triggered it, including the first one.
 *
 * This is the same shape as Sentry's own Loader Script, deliberately, but
 * first-party: the Loader is a `<script>` from a Sentry CDN, and OQ-2 closed
 * with zero runtime third-party origins on this page. Ingestion is a network
 * call to Sentry; loading our own code is not.
 *
 * ACCEPTED LOSS, stated rather than hidden: an error thrown in the last
 * moments before the reader navigates away can be lost while the SDK is still
 * in flight. The window is one fetch of an already-cached-after-first-use
 * chunk, and it applies to the FIRST error on a page only. Buying that back
 * would mean eager-loading on every view — which is the cost this trade
 * exists to avoid.
 */

import { captureError, errorTrackingArmed } from './client'

/**
 * How many pre-SDK errors to hold. An error inside a rAF loop or a scroll
 * handler can fire hundreds of times per second, and a buffer without a
 * ceiling would retain every one of them while the SDK is in flight. Five is
 * enough to carry the first fault plus its immediate consequences; Sentry's
 * `dedupeIntegration` collapses what is genuinely the same error anyway.
 */
const BUFFER_LIMIT = 5

/** Extension schemes. An error thrown by the reader's browser extension is not
 *  a Dispatch defect, and must not be the thing that pulls the SDK down. The
 *  posture's `denyUrls` drops these at send time; this drops them before the
 *  fetch, which is what keeps "no vendor bytes on a healthy page" true on a
 *  browser carrying extensions. */
const FOREIGN_SOURCE = /^(chrome|moz|safari(-web)?)-extension:\/\//i

const buffered: unknown[] = []
let draining = false

function isForeign(filename: string | undefined): boolean {
	return typeof filename === 'string' && FOREIGN_SOURCE.test(filename)
}

/**
 * Hand everything buffered to the SDK, then stand down.
 *
 * Our listeners are detached BEFORE the first capture: once the SDK is
 * initialised its own global handlers are attached, and leaving ours in place
 * would report every subsequent error twice.
 */
async function drain(): Promise<void> {
	if (draining) return
	draining = true
	detach()

	const pending = buffered.splice(0, buffered.length)
	for (const error of pending) {
		await captureError(error)
	}
}

function onError(event: ErrorEvent): void {
	if (isForeign(event.filename)) return
	if (buffered.length < BUFFER_LIMIT) {
		// `event.error` is the thrown value and carries the stack; `event.message`
		// is the fallback for cross-origin scripts, which report as an opaque
		// "Script error." with no stack to read.
		buffered.push(event.error ?? new Error(event.message || 'Unknown error'))
	}
	void drain()
}

function onRejection(event: PromiseRejectionEvent): void {
	if (buffered.length < BUFFER_LIMIT) {
		buffered.push(event.reason ?? new Error('Unhandled promise rejection'))
	}
	void drain()
}

function detach(): void {
	window.removeEventListener('error', onError)
	window.removeEventListener('unhandledrejection', onRejection)
}

/**
 * Arm the error trap for this page. Safe to call when unarmed — it returns
 * before attaching anything, so an unkeyed build carries no listeners at all.
 */
export function bootErrorTracking(): void {
	if (!errorTrackingArmed()) return
	window.addEventListener('error', onError)
	window.addEventListener('unhandledrejection', onRejection)
}
