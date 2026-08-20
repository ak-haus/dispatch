/**
 * The analytics posture, as data (ADR-0003 §Stage 6 + AK decision register §9,
 * answered 2026-08-18: option A — PostHog EU Cloud free tier, cookieless
 * server-hash mode, NO consent banner, session replay OFF at launch).
 *
 * It lives in its own module, exported as a frozen object, for one reason: a
 * posture written as prose in a comment is a promise, and a posture written as
 * a value is a thing a test can assert. `posture.test.ts` asserts every field
 * below, so weakening the privacy stance fails `unit (vitest)` rather than
 * passing review.
 *
 * Every option name and value here was verified against the installed
 * package's own types (@posthog/types 1.405.0, posthog-config.d.ts), not the
 * docs — the docs page for anonymous-vs-identified lists only
 * 'identified_only' | 'always' for person_profiles and omits 'never', which is
 * the value this posture depends on.
 */

/** EU Cloud (Frankfurt). `api_host` is the ingestion endpoint; `ui_host` is
 *  where the toolbar sends you, and must be set explicitly or PostHog assumes
 *  US. Data residency is the point — it is half of why no consent banner is
 *  needed. */
export const POSTHOG_API_HOST = 'https://eu.i.posthog.com'
export const POSTHOG_UI_HOST = 'https://eu.posthog.com'

/**
 * The init config. Each line is a decision, not a default:
 *
 * - `cookieless_mode: 'always'` — the register §9 ruling. PostHog derives a
 *   daily server-side hash instead of storing anything on the device, so there
 *   is nothing to ask consent FOR on a design-led editorial page. Accepted
 *   cost, recorded in the ADR: a returning reader counts as a new person each
 *   day, so these numbers read as engagement SHAPE, never audience-size truth.
 * - `person_profiles: 'never'` — no person profile is ever created. This is
 *   the structural half of the identify() ban: not a rule asking the
 *   instrumentation to behave, but a vendor-level state in which there is no
 *   person to attach anything to.
 * - `autocapture: false` — EDITORIAL EVENTS ONLY. Autocapture would emit an
 *   unbounded stream of clicks: untargeted data that answers no editorial
 *   question and burns the 1M/mo free tier.
 * - `capture_pageview: true` — the one automatic event kept. Every editorial
 *   question ("did they read it?") is a ratio whose denominator is a pageview.
 *   VERIFYING THIS: posthog-js captures the initial pageview only while
 *   `document.visibilityState === 'visible'`; if the page is hidden at init it
 *   registers a `visibilitychange` listener and fires later (posthog-js
 *   `Ho()`). Headless and embedded browsers can report `hidden` permanently —
 *   the Claude Code Browser pane does — so a check there sees custom events
 *   arrive and NO `$pageview`, which looks exactly like a bug and is not one.
 *   Confirmed 2026-08-20 by spoofing visibility and dispatching the event: the
 *   deferred pageview fired and ingested immediately.
 * - `capture_pageleave: false` — dwell is carried explicitly by
 *   `dispatch_read_complete`, which answers the editorial question directly;
 *   $pageleave would duplicate it at the cost of an event per view.
 * - `disable_session_recording` / `disable_surveys` — replay is OFF at launch
 *   per register §9 (incompatible with the no-banner posture, and it is
 *   app-friction tooling rather than editorial). Surveys are an on-page
 *   intrusion the design does not admit.
 */
export const POSTHOG_POSTURE = Object.freeze({
	api_host: POSTHOG_API_HOST,
	ui_host: POSTHOG_UI_HOST,
	// Pinned, not floating: `defaults` is how posthog-js versions its own
	// behaviour changes, so an unpinned value would let an upgrade silently
	// alter what is captured.
	defaults: '2026-08-29',
	cookieless_mode: 'always',
	person_profiles: 'never',
	autocapture: false,
	capture_pageview: true,
	capture_pageleave: false,
	disable_session_recording: true,
	disable_surveys: true,
} as const)

/**
 * Event properties that would identify a reader. PostHog's own identification
 * path travels through `$set` / `$set_once` on a capture, plus the reserved
 * `$identify` / `$create_alias` events — with `person_profiles: 'never'` there
 * is no profile to write to, and `before_send` (below) drops the payload
 * anyway. Two independent mechanisms, because this is the one property of the
 * stage that must not fail quietly.
 */
const IDENTIFYING_KEYS = ['$set', '$set_once', '$unset'] as const
const IDENTIFYING_EVENTS = ['$identify', '$create_alias', '$set'] as const

/**
 * The last gate before an event leaves the page: drop anything that carries
 * identification. Returning null discards the event
 * (`BeforeSendFn = (cr: CaptureResult | null) => CaptureResult | null`).
 *
 * This exists so the no-banner posture cannot be undone by a future edit. A
 * comment saying "do not call identify()" is advice; this is a mechanism —
 * the call can be written and the data still never leaves the browser.
 */
export function dropIdentifyingEvents<
	T extends { event: string; properties?: Record<string, unknown> } | null,
>(captured: T): T | null {
	if (!captured) return captured
	if ((IDENTIFYING_EVENTS as readonly string[]).includes(captured.event)) return null
	const props = captured.properties
	if (props && IDENTIFYING_KEYS.some((key) => key in props)) return null
	return captured
}
