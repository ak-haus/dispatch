/**
 * Production uptime synthetic (Golden Board A6) — READ-ONLY page visits.
 *
 * The curl header oracle is blind to JS death: Astro can serve a 200 shell
 * while every island is dead. This smoke proves the live product answers
 * AND its JS actually executes — deploy-agnostically: an <astro-island>
 * carries its `ssr` attribute until the client component hydrates, so
 * "at least one island lost `ssr`" is true on ANY healthy Astro deploy,
 * past or future. (Feature-level journeys live in the local E2E suite —
 * prod may lag main; deploys are manual ask-first. When the Live Wire
 * deploy lands, /wire joins this synthetic via the D1 golden-gate work.)
 *
 * It never writes, never publishes, and touches no credential — it sees
 * exactly what a reader sees.
 */

import { expect, test } from '@playwright/test'

test('dispatchmag.dev answers and its islands hydrate', async ({ page }) => {
	const response = await page.goto('/')
	expect(response?.status()).toBe(200)
	await expect(page).toHaveTitle(/DISpatch/)

	// Real prerendered islands are present in the shell…
	await expect(page.locator('astro-island').first()).toBeAttached()
	// …and at least one hydrates: astro removes `ssr` when the client
	// component mounts. A dead JS pipeline never clears it.
	await expect(page.locator('astro-island:not([ssr])').first()).toBeAttached({
		timeout: 15_000,
	})
})
