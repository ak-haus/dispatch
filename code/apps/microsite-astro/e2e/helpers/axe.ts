/**
 * axe-core in-suite (Golden Board A2): every journey page must hold the
 * WCAG 2.2 AA floor mechanically, not by review. Violations attach to the
 * report as JSON so a failure names the exact nodes.
 *
 * color-contrast is LIVE (F5 closed at S2, 2026-08-18): the size-scoped
 * copper split + AA ink variants landed as tokens (ADR-0003 register §10;
 * per-node math in packages/tokens/__tests__/contrast.test.mjs), so the
 * suspension list this helper carried since PR #8 is gone.
 *
 * Motion settle (the ADR-0003 Stage-4 flake law, applied to axe): axe
 * flattens element opacity into its computed colors, so a scan taken while
 * Motion entrance animations are mid-flight reads phantom low-contrast
 * "inks" that exist in no stylesheet (the PR #8 muted/faint readings were
 * exactly this). Finite animations must finish before analysis; infinite
 * ones (decorative pulses, aria-hidden chrome) are excluded — they never
 * settle by definition.
 */

import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, type TestInfo } from '@playwright/test'

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

async function settleMotion(page: Page): Promise<void> {
	// Hydration first: an island that hasn't hydrated yet has not STARTED its
	// entrance animation, so an animations-only wait passes vacuously and the
	// scan races the fade (nondeterministic across runs). `astro-island` sheds
	// its `ssr` attribute on hydration — the same oracle the uptime synthetic
	// uses.
	await page.waitForFunction(() => document.querySelectorAll('astro-island[ssr]').length === 0, undefined, {
		timeout: 10_000,
	})
	await page.waitForFunction(
		() =>
			document.getAnimations().every((a) => {
				if (a.playState !== 'running') return true
				const timing = a.effect?.getTiming()
				return timing?.iterations === Infinity
			}),
		undefined,
		{ timeout: 10_000 },
	)
	// The masthead enters on a Motion SPRING (JS-driven, not WAAPI — invisible
	// to getAnimations()), so probe it for frame-stability instead: computed
	// opacity+transform must hold for 3 consecutive frames. Covers both the
	// settled state (opacity 1) and home's intentionally-hidden hero header
	// (stable at 0). Capped, not swallowed: if chrome truly never settles the
	// scan runs anyway and axe fails loudly on the mid-flight colors.
	await page.evaluate(async () => {
		const h = document.querySelector('header')
		if (!h) return
		const snap = () => {
			const s = getComputedStyle(h)
			return `${s.opacity}|${s.transform}`
		}
		let prev = snap()
		let stable = 0
		for (let i = 0; i < 180 && stable < 3; i++) {
			await new Promise((r) => requestAnimationFrame(() => r(null)))
			const cur = snap()
			stable = cur === prev ? stable + 1 : 0
			prev = cur
		}
	})
	// Two paint frames so final animation values are committed before axe reads.
	await page.evaluate(
		() =>
			new Promise<void>((resolve) => {
				requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
			}),
	)
}

export async function expectNoAxeViolations(page: Page, testInfo: TestInfo): Promise<void> {
	await settleMotion(page)
	const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
	if (results.violations.length > 0) {
		await testInfo.attach('axe-violations', {
			body: JSON.stringify(results.violations, null, 2),
			contentType: 'application/json',
		})
	}
	expect(
		results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'})`),
	).toEqual([])
}
