/**
 * Prod smoke config (Golden Board A6) — the ONLY Playwright config allowed
 * to point at production, and only with read-only page visits. The main
 * E2E suite (playwright.config.ts) stays local-build + stubbed-feed per the
 * Phase A rules of law.
 */

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './e2e-prod',
	retries: 2,
	reporter: 'list',
	use: {
		baseURL: 'https://dispatchmag.dev',
		trace: 'on-first-retry',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
