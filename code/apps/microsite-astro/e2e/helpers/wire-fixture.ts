/**
 * Stubbed Live Wire rail for E2E (Golden Board A2; Phase A rules of law).
 *
 * The suite NEVER touches the production ledger: `e2e:build` bakes
 * PUBLIC_WIRE_FEED_URL to this reserved-`.test`-TLD host (unresolvable by
 * real DNS), and every request to it is intercepted in-page via
 * page.route(). Presence of an entry here = a fixture, never a publish.
 */

import type { Page } from '@playwright/test'

/** Must match the PUBLIC_WIRE_FEED_URL literal in package.json's `e2e:build`. */
export const WIRE_E2E_FEED_URL = 'https://wire-ledger.test/feed.json'

export interface FixtureEntry {
	id: string
	ts: string
	platform: string
	kind: 'publish'
	title: string
	url: string
	excerpt?: string
}

export interface FixtureFeed {
	schemaVersion: 1
	generatedAt: string
	entries: FixtureEntry[]
}

/** Entry timestamps are generated relative to now so relative-time rendering
 *  ("just now", "N min ago") stays deterministic at any wall-clock. */
export function makeEntry(
	n: number,
	minutesAgo: number,
	platform = 'devto',
	title = `E2E fixture publish ${n}`,
): FixtureEntry {
	return {
		id: `e2e-fixture-${n}`,
		ts: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
		platform,
		kind: 'publish',
		title,
		url: `https://example.com/e2e/${n}`,
	}
}

export function makeFeed(entries: FixtureEntry[]): FixtureFeed {
	return {
		schemaVersion: 1,
		generatedAt: new Date().toISOString(),
		entries,
	}
}

/** (Re)point the stubbed rail at a feed. Replaces any previous stub, so a
 *  test can advance the wire mid-flight: serve A → interact → serve B. */
export async function serveWireFeed(page: Page, feed: FixtureFeed): Promise<void> {
	await page.unroute(WIRE_E2E_FEED_URL)
	await page.route(WIRE_E2E_FEED_URL, (route) => route.fulfill({ json: feed }))
}
