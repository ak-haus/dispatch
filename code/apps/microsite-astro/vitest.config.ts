/**
 * Unit tests for the live wire logic (Golden Board A3): the store's
 * backoff/visibility discipline, the contract's content-trust guard, and
 * the snapshot script's failure modes. Pure TS units — no Astro components
 * — so plain vitest config suffices (no getViteConfig needed).
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'happy-dom',
		include: ['src/**/*.{test,spec}.ts', 'scripts/**/*.{test,spec}.ts'],
		css: false,
		restoreMocks: true,
		clearMocks: true,
		testTimeout: 15_000,
	},
})
