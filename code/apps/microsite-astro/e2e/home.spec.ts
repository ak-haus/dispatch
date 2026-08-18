/**
 * Journey: home + hydration proof (Golden Board A2).
 *
 * The homepage is prerendered HTML with client:load islands — markup alone
 * proves nothing about the JS product. The hydration proof is behavioral:
 * the Live Wire ticker's pause control must actually TOGGLE, which only
 * happens once React has attached handlers. A dead island fails this test.
 */

import { expect, test } from '@playwright/test'
import { expectNoAxeViolations } from './helpers/axe'
import { makeEntry, makeFeed, serveWireFeed } from './helpers/wire-fixture'

test('front page renders and the wire island hydrates', async ({ page }) => {
	const entry = makeEntry(1, 3)
	await serveWireFeed(page, makeFeed([entry]))
	await page.goto('/')
	await expect(page).toHaveTitle(/DISpatch/)

	// Hydration proof: the SSR HTML already contains this button, so its mere
	// presence is meaningless — clicking must flip aria-pressed. Retried as a
	// block because a click racing hydration is legitimately lost. The label
	// flips Pause↔Resume, so the locator matches either state.
	const pauseToggle = page.getByRole('button', { name: /Pause updates|^Resume/ })
	await pauseToggle.scrollIntoViewIfNeeded()
	await expect(async () => {
		await pauseToggle.click()
		await expect(pauseToggle).toHaveAttribute('aria-pressed', 'true', { timeout: 500 })
	}).toPass({ timeout: 15_000 })

	// And the hydrated island reached the (stubbed) rail: fixture content
	// no build snapshot can contain is on the page.
	await expect(page.getByRole('link', { name: entry.title })).toBeVisible()
})

test('home holds the axe WCAG floor', async ({ page }, testInfo) => {
	await serveWireFeed(page, makeFeed([makeEntry(1, 5)]))
	await page.goto('/')
	await expect(page).toHaveTitle(/DISpatch/)
	await expectNoAxeViolations(page, testInfo)
})
