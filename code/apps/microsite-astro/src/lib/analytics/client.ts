/**
 * The analytics client — the ONLY surface app code may touch.
 *
 * This module exports exactly two functions, `initAnalytics` and `track`. It
 * does not re-export the posthog instance, and there is deliberately no
 * `identify`, `alias`, or `setPersonProperties` wrapper: `identify()` is
 * FORBIDDEN in the instrumentation (ADR-0003 §Stage 6) because it manufactures
 * personal data and undoes the no-consent-banner posture, and the way to make
 * that structural rather than advisory is to leave app code with no reachable
 * path to it.
 *
 * Three independent mechanisms hold the line, so no single edit can undo it:
 *   1. this module's export surface — the call cannot be written;
 *   2. `person_profiles: 'never'` — there is no profile to write to;
 *   3. `dropIdentifyingEvents` on `before_send` — an identifying payload is
 *      discarded in the browser before any request is made.
 *
 * ARMING. The project key arrives as `PUBLIC_POSTHOG_KEY`. Until AK performs
 * the one-time signup there is no key and this module is INERT: the guard
 * returns before the dynamic import, so nothing is fetched and no listener is
 * attached. (Rollup still emits the posthog-js chunk into dist/ — ~247KB —
 * but nothing preloads it, so the browser never asks for it. Verified against
 * the built output, not assumed.) Same "arms on token, and says so" posture
 * the Chromatic lane uses; a missing key must never be a silent half-working
 * state.
 */

import { POSTHOG_POSTURE, dropIdentifyingEvents } from './posture'
import type { EditorialEvent } from './events'

/** Astro inlines PUBLIC_* at build time, so an unset key compiles to a literal
 *  empty string and the guard below is resolved before the browser runs. */
const PROJECT_KEY = import.meta.env.PUBLIC_POSTHOG_KEY ?? ''

type PostHogLike = {
	init: (key: string, config: Record<string, unknown>) => void
	capture: (event: string, properties?: Record<string, unknown>) => void
}

let client: PostHogLike | null = null
let booted = false

/** True when a project key is present. Exported so callers can skip building
 *  event payloads that would be thrown away. */
export function analyticsArmed(): boolean {
	return PROJECT_KEY.length > 0
}

/**
 * Load and initialise posthog-js. Idempotent, and a no-op when unarmed.
 *
 * The import is dynamic so the vendor bundle is fetched only on an armed
 * build — an unarmed page pays nothing, not even bytes.
 */
export async function initAnalytics(): Promise<void> {
	if (booted || !analyticsArmed()) return
	booted = true
	const { default: posthog } = await import('posthog-js')
	posthog.init(PROJECT_KEY, {
		...POSTHOG_POSTURE,
		before_send: dropIdentifyingEvents,
	})
	client = posthog as unknown as PostHogLike
}

/**
 * Emit one editorial event. Typed against the closed union in `events.ts`, so
 * an event name the weekly loop does not query cannot be sent from here.
 *
 * Never throws: analytics failing must never take a reader's page with it.
 */
export function track(event: EditorialEvent): void {
	if (!client) return
	try {
		client.capture(event.name, event.properties)
	} catch {
		/* an analytics failure is not a reading failure */
	}
}
