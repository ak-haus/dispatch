/**
 * Playwright E2E — Golden Board A2, under the Phase A rules of law:
 * the suite runs against a LOCAL build (astro preview over dist/) with the
 * feed rail stubbed in-page — never production, no credentials anywhere.
 * `pnpm test:e2e` is the one entry point: it bakes the fixture feed URL
 * into a fresh build, then runs this suite over `pnpm preview`.
 */

import { defineConfig, devices } from '@playwright/test'

const PORT = 4321

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: `http://localhost:${PORT}`,
		trace: 'on-first-retry',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'pnpm preview',
		port: PORT,
		reuseExistingServer: !process.env.CI,
		timeout: 30_000,
	},
})
