/**
 * Journey: 404 (Golden Board A2).
 *
 * A wrong address must answer with a real 404 status (SEO/honesty — a soft
 * 200 would poison crawlers) AND the editorial not-in-print page.
 */

import { expect, test } from '@playwright/test'
import { expectNoAxeViolations } from './helpers/axe'

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
})
