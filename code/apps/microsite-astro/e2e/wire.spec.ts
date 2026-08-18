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

test('pause freezes the displayed feed; resume jumps to current', async ({ page }) => {
	const first = makeEntry(1, 30)
	await serveWireFeed(page, makeFeed([first]))
	await page.goto('/wire')
	await expect(page.getByRole('link', { name: first.title })).toBeVisible()

	// One physical button whose label flips Pause↔Resume — locate by either name.
	const pauseToggle = page.getByRole('button', { name: /Pause updates|^Resume/ })
	await pauseToggle.click()
	await expect(pauseToggle).toHaveAttribute('aria-pressed', 'true')

	// A new publish lands on the rail while paused.
	const fresh = makeEntry(2, 0)
	await serveWireFeed(page, makeFeed([fresh, first]))

	// Sit out the store's 5s revalidate throttle, then trigger its focus
	// revalidation path — deterministic, no 30s poll wait.
	await page.waitForTimeout(5_100)
	await page.evaluate(() => window.dispatchEvent(new Event('focus')))

	// The store saw the new entry (pending count on the button) but the
	// displayed frame is frozen — the fresh title must NOT render yet.
	await expect(pauseToggle).toContainText('1 new')
	await expect(page.getByRole('link', { name: fresh.title })).toHaveCount(0)

	// Resume = jump to CURRENT (never a backlog replay).
	await pauseToggle.click()
	await expect(page.getByRole('link', { name: fresh.title })).toBeVisible()
	await expect(pauseToggle).toHaveAttribute('aria-pressed', 'false')
})

test('/wire holds the axe WCAG floor', async ({ page }, testInfo) => {
	await serveWireFeed(page, makeFeed([makeEntry(1, 5), makeEntry(2, 90, 'bluesky')]))
	await page.goto('/wire')
	await expect(page.getByText('updated just now')).toBeVisible()
	await expectNoAxeViolations(page, testInfo)
})
