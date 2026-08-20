/**
 * Journey: 404 (Golden Board A2).
 *
 * A wrong address must answer with a real 404 status (SEO/honesty — a soft
 * 200 would poison crawlers) AND the editorial not-in-print page.
 */

import { expect, test } from './helpers/fixtures'
import { expectNoAxeViolations } from './helpers/axe'
import { archiveSnapshot } from './helpers/archive'

test('an unknown address returns status 404 with the editorial page', async ({ page }) => {
	const response = await page.goto('/this-dispatch-does-not-exist/')
	expect(response?.status()).toBe(404)
	await expect(page.getByText('Error 404 · address unknown')).toBeVisible()
	// The way home stays on the page.
	await expect(page.getByRole('link', { name: /Back to the front page/ })).toBeVisible()
})

test('the 404 page holds the axe WCAG floor', async ({ page }, testInfo) => {
	await page.goto('/this-dispatch-does-not-exist/')
	await expect(page.getByText('Error 404 · address unknown')).toBeVisible()
	await expectNoAxeViolations(page, testInfo)
	// Chromatic archive lane. This surface is why the settle law matters: the
	// old auto-archive shipped the 404 with its masthead at opacity 0, a page
	// state the site never presents.
	await archiveSnapshot(page, 'not-found', testInfo)
})
