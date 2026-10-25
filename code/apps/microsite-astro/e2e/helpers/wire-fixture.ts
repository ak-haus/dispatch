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

/** The stub's pinned clock for any page the archive lane captures (F49).
 *  /wire prints each entry's day as a plain-text heading (WirePage.tsx,
 *  `dayLabel`), outside every data-live region, so an archive stamped from
 *  the wall clock read a new date on every day it ran and drew a Chromatic
 *  change on commits that changed no code. Noon UTC keeps a 90-minute-old
 *  entry on the same day. It is weeks in the past, so the cards print the
 *  absolute form ("Sep 1, 2026"), which no later run can change. */
export const ARCHIVE_EPOCH = Date.parse('2026-09-01T12:00:00Z')

/** Entry timestamps are generated relative to `now` (the wall clock unless a
 *  test pins it) so relative-time rendering ("just now", "N min ago") stays
 *  deterministic at any wall-clock. A test that archives passes ARCHIVE_EPOCH. */
export function makeEntry(
	n: number,
	minutesAgo: number,
	platform = 'devto',
	title = `E2E fixture publish ${n}`,
	now = Date.now(),
): FixtureEntry {
	return {
		id: `e2e-fixture-${n}`,
		ts: new Date(now - minutesAgo * 60_000).toISOString(),
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
