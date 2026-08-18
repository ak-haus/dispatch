/**
 * Shared test base with the network law built in (2026-08-18 adversarial
 * verify, e2e finding): the Phase A rule "never prod" used to hold by
 * convention — a stale dist built with the real ledger URL, or a dev server
 * silently reused on 4321, would have sent real (read-only) GETs to the
 * production blob. This catch-all route makes the law hold by construction:
 * only localhost (the preview server) and the reserved-.test fixture host
 * may ever leave the page; everything else is aborted.
 *
 * Every spec imports { test, expect } from here, never from
 * '@playwright/test' directly.
 */

import { test as base, expect } from '@playwright/test'
import { WIRE_E2E_FEED_URL } from './wire-fixture'

const FIXTURE_ORIGIN = new URL(WIRE_E2E_FEED_URL).origin

export const test = base.extend({
	page: async ({ page }, use) => {
		// Registered FIRST so spec-level routes (the wire stub) run before it;
		// anything unhandled lands here and must be local or fixture traffic.
		await page.route('**/*', (route) => {
			const url = new URL(route.request().url())
			if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return route.continue()
			if (url.origin === FIXTURE_ORIGIN) return route.continue()
			return route.abort('blockedbyclient')
		})
		await use(page)
	},
})

export { expect }
