/**
 * The error-tracking client — the ONLY surface app code may touch.
 *
 * Mirrors the analytics client's shape deliberately (arm on a public env var,
 * lazy dynamic import, inert and silent when unarmed), because a second
 * third-party on this page should not invent a second pattern.
 *
 * THE CONFIG SEAM. The SDK is never handed a hand-written config object: the
 * shape comes from `getPrimeSentryConfig` in @prime-dispatch/ui, the F10
 * observability primitive that has existed (tested, and consumed by nothing)
 * since 2026-05-29. U6 recorded the rule — wire through the primitive, not
 * Sentry's onboarding snippet — and this module is where that rule is kept.
 * The primitive decides dsn/environment/release/enabled; `posture.ts` decides
 * what may be collected; the SDK gets the union and nothing else.
 *
 * ONE FIELD IS DELIBERATELY DROPPED. `getPrimeSentryConfig` computes a
 * `tracesSampleRate`, and this consumer does not pass it, because tracing is
 * tree-shaken out of the bundle (`__SENTRY_TRACING__: false`, astro.config.mjs)
 * and passing it would be dead config that reads as a live decision. A6 is the
 * error-tracking row; the lab performance floor is A4's Lighthouse ratchet. If
 * a future row wants field performance, the change is to stop defining that
 * global and pass the field — one line each, in that order.
 *
 * ARMING. The DSN arrives as `PUBLIC_SENTRY_DSN`. Astro inlines PUBLIC_* at
 * build time, so an unset DSN compiles to a literal empty string, the primitive
 * returns `enabled: false`, and this module never imports the SDK — an unkeyed
 * build carries no listeners and fetches no vendor bytes. Same "arms on token,
 * and says so" posture as the analytics and Chromatic lanes; a missing DSN must
 * never be a silent half-working state.
 */

import { getPrimeSentryConfig } from '@prime-dispatch/ui/observability'

/**
 * The env slice handed to the primitive. Keys are read individually, never
 * spread: Vite inlines `import.meta.env.PUBLIC_X` as a literal at build time,
 * and spreading the object would defeat that and leave the guard unresolved.
 *
 * `SENTRY_ENVIRONMENT` is derived rather than read — the raw name is not a
 * PUBLIC_ var, so it does not reach the browser, and `import.meta.env.PROD` is
 * the build-time truth for the same question.
 */
function sentryEnv(): Record<string, string | undefined> {
	return {
		PUBLIC_SENTRY_DSN: import.meta.env.PUBLIC_SENTRY_DSN ?? '',
		SENTRY_ENVIRONMENT: import.meta.env.PROD ? 'production' : 'development',
		// Unset today. Setting this in the Vercel project to the commit SHA is
		// what makes "which deploy broke it" answerable; Sentry groups issues
		// correctly without it, so it stays optional rather than blocking.
		SENTRY_RELEASE: import.meta.env.PUBLIC_SENTRY_RELEASE ?? undefined,
	}
}

const CONFIG = getPrimeSentryConfig(sentryEnv())

let booted = false
let ready = false

/** True when a DSN is present. Exported so callers can skip work whose only
 *  consumer would be a client that will never load. */
export function errorTrackingArmed(): boolean {
	return CONFIG.enabled
}

/** True once `Sentry.init` has actually run and capture calls will be sent. */
export function errorTrackingReady(): boolean {
	return ready
}

/**
 * Load and initialise the Sentry browser SDK. Idempotent, and a no-op when
 * unarmed.
 *
 * The import is dynamic so the vendor bundle is fetched only when it is about
 * to be used — see `boot.ts` for when that is, and why it is not "on page
 * load".
 */
export async function initErrorTracking(): Promise<void> {
	if (booted || !CONFIG.enabled) return
	booted = true

	// `./sentry` is the ONLY module that touches @sentry/browser, and it is
	// reached exclusively through this dynamic import. That indirection is what
	// makes the vendor code both lazy AND tree-shakeable — see the header of
	// that file for the measurement that forced the split.
	const { startSentry } = await import('./sentry')
	startSentry(CONFIG)

	ready = true
}

/**
 * Report one error. Never throws: error tracking failing must never take a
 * reader's page with it — the same rule `track()` follows next door.
 */
export async function captureError(error: unknown): Promise<void> {
	if (!CONFIG.enabled) return
	try {
		await initErrorTracking()
		const { reportToSentry } = await import('./sentry')
		reportToSentry(error)
	} catch {
		/* an observability failure is not a reading failure */
	}
}
