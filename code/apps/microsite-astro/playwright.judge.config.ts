/**
 * Semantic-judge Playwright config (ADR-0003 §Stage 4b): the SAME base config
 * as the e2e gate — same webServer, same never-prod law — scoped to the
 * capture pass only. The main config ignores judge.capture.spec.ts; this one
 * runs nothing else.
 */

import { defineConfig } from '@playwright/test'
import baseConfig from './playwright.config'

export default defineConfig({
	...baseConfig,
	testMatch: '**/judge.capture.spec.ts',
	testIgnore: undefined,
})
