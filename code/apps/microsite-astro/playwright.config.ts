/**
 * Playwright E2E — Golden Board A2, under the Phase A rules of law:
 * the suite runs against a LOCAL build (astro preview over dist/) with the
 * feed rail stubbed in-page — never production, no credentials anywhere.
 * `pnpm test:e2e` is the one entry point: it bakes the fixture feed URL
 * into a fresh build, then runs this suite over `pnpm preview`.
 */

import { defineConfig, devices } from '@playwright/test'
import type { ChromaticConfig } from '@chromatic-com/playwright'
import { LIVE_REGION_SELECTOR } from './e2e/helpers/archive'

const PORT = 4321

export default defineConfig<ChromaticConfig>({
	testDir: './e2e',
	// The judge capture pass is not a test lane — it runs only under
	// playwright.judge.config.ts (ADR-0003 §Stage 4b).
	testIgnore: '**/judge.capture.spec.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: `http://localhost:${PORT}`,
		trace: 'on-first-retry',
		// Chromatic archive lane — OFF by default (F19, ADR-0003 §Stage 4 flake
		// law). The @chromatic-com/playwright fixture archives every test's
		// final DOM unless told otherwise, which is how 39 tests came to ship
		// snapshots nobody chose and 21 of them differed run-to-run. Coverage is
		// now a decision: `archiveSnapshot()` in e2e/helpers/archive.ts is the
		// only way a surface reaches the lane, and check-archive-coverage.mjs
		// holds that list to what the e2e workflow expects.
		disableAutoSnapshot: true,
		// Declared-live markup is excluded from the diff. Same selector the
		// rest probe skips — a region that never settles must not be compared.
		ignoreSelectors: [LIVE_REGION_SELECTOR],
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'pnpm preview',
		port: PORT,
		// NEVER reuse: a dev server on 4321 serves src with .env.local's REAL
		// ledger URL — silently substituting it for the e2e-built preview would
		// break the never-prod law. A port conflict must fail loudly instead.
		reuseExistingServer: false,
		timeout: 30_000,
	},
})
