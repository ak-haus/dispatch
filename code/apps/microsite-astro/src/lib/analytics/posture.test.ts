/**
 * The analytics posture, as a gate.
 *
 * ADR-0003 §Stage 6 and register §9 decided a cookieless, no-consent-banner,
 * replay-off, identify-free posture. That decision is only worth the file it
 * is written in if weakening it FAILS something — so every clause of it is
 * asserted here, on the existing `unit (vitest)` required context. No new
 * ruleset seat; the stage's privacy stance simply cannot regress quietly.
 *
 * Rides on unit tests rather than a source-scanning script because the thing
 * worth protecting is the RUNTIME behaviour (what config ships, what payloads
 * survive before_send), not the presence or absence of a string in a file.
 */

import { describe, expect, it } from 'vitest'
import { POSTHOG_POSTURE, POSTHOG_API_HOST, POSTHOG_UI_HOST, dropIdentifyingEvents } from './posture'
import { EDITORIAL_EVENT_NAMES, SCROLL_MILESTONES, surfaceFor } from './events'
import * as client from './client'

describe('the no-consent-banner posture', () => {
	it('stores nothing on the reader’s device', () => {
		// The whole no-banner answer rests on this one value: cookieless
		// server-hash mode means there is nothing to ask consent for.
		expect(POSTHOG_POSTURE.cookieless_mode).toBe('always')
	})

	it('never creates a person profile', () => {
		// The structural half of the identify() ban — no profile exists to
		// attach an identity to, whatever the instrumentation asks for.
		expect(POSTHOG_POSTURE.person_profiles).toBe('never')
	})

	it('keeps data in the EU', () => {
		expect(POSTHOG_API_HOST).toBe('https://eu.i.posthog.com')
		expect(POSTHOG_UI_HOST).toBe('https://eu.posthog.com')
		expect(POSTHOG_POSTURE.api_host.startsWith('https://eu.')).toBe(true)
	})

	it('ships with session replay and surveys off', () => {
		// Register §9: replay OFF at launch. Turning it on is an AK decision,
		// not an edit.
		expect(POSTHOG_POSTURE.disable_session_recording).toBe(true)
		expect(POSTHOG_POSTURE.disable_surveys).toBe(true)
	})

	it('captures editorial events only — never autocapture', () => {
		// Autocapture is an unbounded click stream: it answers no editorial
		// question and would burn the 1M/mo free tier.
		expect(POSTHOG_POSTURE.autocapture).toBe(false)
	})

	it('pins the posthog-js defaults version', () => {
		// An unpinned `defaults` lets a library upgrade silently change what is
		// captured — the posture would drift without a diff.
		expect(POSTHOG_POSTURE.defaults).toMatch(/^\d{4}-\d{2}-\d{2}$/)
	})
})

describe('identify() is structurally unreachable', () => {
	it('is not on the client’s export surface', () => {
		// App code has no path to identification: this module is the only
		// analytics surface, and it exposes exactly init + track (+ the armed
		// predicate).
		expect(Object.keys(client).sort()).toEqual(['analyticsArmed', 'initAnalytics', 'track'])
		for (const forbidden of ['identify', 'alias', 'setPersonProperties', 'posthog', 'default']) {
			expect(client).not.toHaveProperty(forbidden)
		}
	})

	it('drops identifying events before they leave the browser', () => {
		expect(dropIdentifyingEvents({ event: '$identify', properties: {} })).toBeNull()
		expect(dropIdentifyingEvents({ event: '$create_alias', properties: {} })).toBeNull()
	})

	it('drops person properties smuggled onto an ordinary event', () => {
		// The subtler path: $set on a normal capture writes person properties
		// without ever calling identify().
		expect(dropIdentifyingEvents({ event: 'dispatch_scroll_depth', properties: { $set: { email: 'a@b.c' } } })).toBeNull()
		expect(dropIdentifyingEvents({ event: 'dispatch_scroll_depth', properties: { $set_once: { plan: 'x' } } })).toBeNull()
	})

	it('lets ordinary editorial events through untouched', () => {
		const event = { event: 'dispatch_read_complete', properties: { surface: 'dispatch', dwell_seconds: 42 } }
		expect(dropIdentifyingEvents(event)).toBe(event)
		expect(dropIdentifyingEvents(null)).toBeNull()
	})
})

describe('the editorial event contract', () => {
	it('emits only milestones, never a continuous scroll trace', () => {
		// The budget guard: four milestones is the entire per-page depth spend.
		expect([...SCROLL_MILESTONES]).toEqual([25, 50, 75, 90])
		expect(SCROLL_MILESTONES.length).toBeLessThanOrEqual(4)
	})

	it('names exactly the events the weekly loop queries', () => {
		// If this list and the loop's HogQL disagree, an event lands in PostHog
		// that nothing ever analyses.
		expect([...EDITORIAL_EVENT_NAMES]).toEqual([
			'dispatch_scroll_depth',
			'dispatch_read_complete',
			'nav_engagement',
			'wire_engagement',
		])
	})

	it('reports surfaces by editorial name, so a route change keeps its history', () => {
		expect(surfaceFor('/')).toBe('home')
		expect(surfaceFor('/dispatch/dispatch-03/')).toBe('dispatch')
		expect(surfaceFor('/wire')).toBe('wire')
		expect(surfaceFor('/preview/figure/')).toBe('other')
	})
})

describe('the unarmed build', () => {
	it('is inert until AK’s one-time signup provides a key', () => {
		// No PUBLIC_POSTHOG_KEY in test/CI env: nothing may load or send. A
		// missing key must be a clean no-op, never a half-wired state.
		expect(client.analyticsArmed()).toBe(false)
		expect(() => client.track({ name: 'nav_engagement', properties: { surface: 'home', target: '/' } })).not.toThrow()
	})
})
