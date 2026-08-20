/**
 * Journey: /wire — poll + pause (Golden Board A2).
 *
 * Proves the full ADR-0001 store discipline end-to-end against the stubbed
 * rail: the island polls on mount and goes live; "Pause updates" freezes the
 * DISPLAYED feed while the store keeps polling underneath (pending count
 * surfaces on the button); resume jumps to CURRENT state.
 */

import { expect, test } from './helpers/fixtures'
import { expectNoAxeViolations } from './helpers/axe'
import { archiveSnapshot } from './helpers/archive'
import { makeEntry, makeFeed, serveWireFeed } from './helpers/wire-fixture'

test('polls the stubbed rail on mount and goes live', async ({ page }) => {
	const entry = makeEntry(1, 2)
	await serveWireFeed(page, makeFeed([entry]))
	await page.goto('/wire')

	// Live-poll proof: the freshness line only exists after a successful fetch
	// (prerendered HTML says "build snapshot"), and the rendered entry is the
	// fixture's — content the build snapshot cannot contain.
	await expect(page.getByText('updated just now')).toBeVisible()
	await expect(page.getByRole('link', { name: entry.title })).toBeVisible()
})

test('pause freezes the displayed feed; resume snaps to current with a multi-entry backlog', async ({ page }) => {
	const first = makeEntry(1, 30)
	await serveWireFeed(page, makeFeed([first]))
	await page.goto('/wire')
	await expect(page.getByRole('link', { name: first.title })).toBeVisible()

	// One physical button whose label flips Pause↔Resume — locate by either name.
	const pauseToggle = page.getByRole('button', { name: /Pause updates|^Resume/ })
	await pauseToggle.click()
	await expect(pauseToggle).toHaveAttribute('aria-pressed', 'true')

	// TWO new publishes land on the rail while paused (A13 sharpening: a
	// single pending entry cannot distinguish snap-to-current from a backlog
	// drain-replay — both converge to the same end state at n=1).
	const fresh2 = makeEntry(2, 1)
	const fresh3 = makeEntry(3, 0)
	await serveWireFeed(page, makeFeed([fresh3, fresh2, first]))

	// Sit out the store's 5s revalidate throttle, then trigger its focus
	// revalidation path — deterministic, no 30s poll wait.
	await page.waitForTimeout(5_100)
	await page.evaluate(() => window.dispatchEvent(new Event('focus')))

	// The store counted BOTH pending entries but the displayed frame is
	// frozen — neither fresh title may render yet.
	await expect(pauseToggle).toContainText('2 new')
	await expect(page.getByRole('link', { name: fresh2.title })).toHaveCount(0)
	await expect(page.getByRole('link', { name: fresh3.title })).toHaveCount(0)

	// Resume = jump to CURRENT (never a backlog replay): the whole current
	// frame renders at once — every entry exactly once (no replay
	// duplication), feed-order preserved, and the ARIA set describes the
	// full current frame.
	await pauseToggle.click()
	await expect(page.getByRole('link', { name: fresh3.title })).toBeVisible()
	await expect(page.getByRole('link', { name: fresh2.title })).toBeVisible()
	await expect(page.getByRole('link', { name: first.title })).toBeVisible()
	await expect(pauseToggle).toHaveAttribute('aria-pressed', 'false')

	const feedArticles = page.locator('article[aria-posinset]')
	await expect(feedArticles).toHaveCount(3)
	const ids = await feedArticles.evaluateAll((els) => els.map((el) => el.id))
	expect(new Set(ids).size, 'no entry may render twice (replay duplication)').toBe(3)
	expect(ids, 'current-feed order, newest first').toEqual(['e2e-fixture-3', 'e2e-fixture-2', 'e2e-fixture-1'])
	await expect(feedArticles.first()).toHaveAttribute('aria-setsize', '3')
})

test('/wire holds the axe WCAG floor', async ({ page }, testInfo) => {
	await serveWireFeed(page, makeFeed([makeEntry(1, 5), makeEntry(2, 90, 'bluesky')]))
	await page.goto('/wire')
	await expect(page.getByText('updated just now')).toBeVisible()
	await expectNoAxeViolations(page, testInfo)
	// Chromatic archive lane. /wire is the surface with genuinely live regions
	// — the entry timestamps and the freshness line move with the wall clock
	// on every run. They carry data-live, so the lane ignores them and diffs
	// the rail around them (the two behavioural tests above are NOT archived:
	// both end on a deliberately mutated feed).
	await archiveSnapshot(page, 'wire', testInfo)
})
