/**
 * The error-tracking posture, as data (Golden Board A6 error-tracking half;
 * vendor + DSN decided at U6, 2026-08-18: Sentry free Developer tier, org
 * `prime-city`, US region).
 *
 * It lives in its own module, exported as a frozen object, for the same reason
 * the analytics posture does: a posture written as prose in a comment is a
 * promise, and a posture written as a value is a thing a test can assert.
 * `posture.test.ts` asserts every field below, so weakening the privacy stance
 * fails `unit (vitest)` rather than passing review.
 *
 * Every option name and default here was read from the INSTALLED package's own
 * types (@sentry/core 10.70.0, `types/datacollection.d.ts` +
 * `types/options.d.ts`), not from the docs — see `SENTRY_DATA_COLLECTION`
 * below for why that distinction is load-bearing this time.
 *
 * SCOPE: errors only. Tracing is tree-shaken out of the bundle entirely
 * (`__SENTRY_TRACING__: false` in astro.config.mjs), which is why nothing here
 * sets `tracesSampleRate` even though `getPrimeSentryConfig` computes one — see
 * `client.ts` for that seam. Field performance is not this row; the A4
 * Lighthouse ratchet holds the lab floor.
 */

/**
 * What the SDK is allowed to collect.
 *
 * THE REASON THIS IS EXPLICIT RATHER THAN DEFAULTED. `dataCollection` replaced
 * the now-deprecated `sendDefaultPii` in v10, and the core's own
 * `resolveDataCollectionOptions` carries this note:
 *
 *   "TODO(v11): Remove `sendDefaultPii` support and always fall through to
 *    DEFAULTS so that `userInfo: true` […] In v10, DEFAULTS only apply when
 *    `dataCollection` is explicitly provided."
 *
 * So the quiet path — set nothing, inherit the v10 bridge — is the path that
 * silently starts collecting user info at the v11 upgrade. Naming every field
 * is what makes the posture survive a version bump.
 *
 * Sentry is a US-region vendor and Dispatch ships NO consent banner (ADR-0003
 * register §9). The analytics stage earns that stance with EU residency and
 * cookieless server-hash mode; error tracking cannot earn it the same way, so
 * it earns it by collecting nothing attributable to a reader at all.
 *
 * `stackFrameVariables: false` is the least obvious and most important line:
 * the default is `true`, and a throw inside SearchPalette would put a reader's
 * typed query into a local variable in the captured frame. A stack trace is
 * what we want; the reader's words are not.
 */
export const SENTRY_DATA_COLLECTION = Object.freeze({
	userInfo: false,
	cookies: false,
	urlQueryParams: false,
	httpBodies: [] as const,
	stackFrameVariables: false,
	databaseQueryData: false,
} as const)

/**
 * Session Replay is OFF, and stays off by two independent mechanisms:
 *
 *   1. `replayIntegration` is never imported, so rollup never puts rrweb in the
 *      bundle — the code does not exist to run;
 *   2. both sample rates are pinned to 0 here, so ADDING the import later still
 *      records nothing until someone also changes an asserted value.
 *
 * Register §9 ruled replay off at launch: it is incompatible with a no-banner
 * posture (it records the reader's screen), and it is app-friction tooling
 * rather than an editorial instrument.
 */
export const SENTRY_REPLAY_RATES = Object.freeze({
	replaysSessionSampleRate: 0,
	replaysOnErrorSampleRate: 0,
} as const)

/**
 * Error sampling. Deliberately 1.0, and that IS the tuning.
 *
 * The free Developer tier allows 5K errors/month (~166/day). At Dispatch's
 * launch volume the risk is not blowing the quota with real errors — it is
 * missing the single reproduction of the one defect that matters. Sampling
 * below 1.0 buys quota headroom by discarding signal we do not yet have enough
 * of to discard. The quota is a ceiling Sentry enforces by dropping events, not
 * a bill.
 *
 * What actually protects the quota is filtering noise that is not ours
 * (`SENTRY_IGNORE_ERRORS` / `SENTRY_DENY_URLS`) plus the default
 * `dedupeIntegration`. REVIEW TRIGGER: if a month's ingest approaches 5K, tune
 * this down rather than widening the tier.
 */
export const SENTRY_SAMPLE_RATE = 1.0

/**
 * Noise that is not a Dispatch defect. Every entry is a browser-, extension-,
 * or network-level condition that no code change here can fix, and each one
 * would otherwise consume quota that a real defect needs.
 */
export const SENTRY_IGNORE_ERRORS = Object.freeze([
	// Benign and famously unactionable: fired when a ResizeObserver callback
	// does not settle within one frame. Chromium reports it; nothing breaks.
	'ResizeObserver loop limit exceeded',
	'ResizeObserver loop completed with undelivered notifications',
	// The reader's network went away mid-fetch (the wire rail polls). The rail
	// already handles this with backoff — it is not an error report.
	'Failed to fetch',
	'NetworkError when attempting to fetch resource',
	'Load failed',
	// Navigation raced an in-flight import; the next page is already loading.
	'AbortError',
] as const)

/**
 * Origins whose errors are never ours. Browser extensions execute in the page
 * and throw into our global handlers; without this they read as Dispatch
 * defects and are unreproducible by construction.
 */
export const SENTRY_DENY_URLS = Object.freeze([
	/^chrome-extension:\/\//i,
	/^moz-extension:\/\//i,
	/^safari-(web-)?extension:\/\//i,
] as const)
