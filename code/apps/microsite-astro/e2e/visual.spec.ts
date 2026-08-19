/**
 * Playwright visual floor (ADR-0003 §Stage 4, wiring step 2): the $0,
 * in-repo, vendor-independent pixel lock. Baselines live in git
 * (visual.spec.ts-snapshots/), are generated in the CI linux runner —
 * NEVER on a Mac (documented rendering variance; ADR bake-off row) — and
 * diff PNGs land on disk where agents read them directly.
 *
 * Scope — the masthead/wordmark surfaces, per the ADR:
 *   - masthead chrome element (Wordmark + SiteNav strip) on the three
 *     journey surfaces where it renders settled at load: article, /wire,
 *     404 — at desktop and mobile widths.
 *   - home is DELIBERATELY absent (no silent caps): its masthead is
 *     hidden at scroll-top by design (body.dispatch-hero), and the cover
 *     wordmark sits on the cartographic VIDEO substrate + a live-date
 *     swap — flake-law hostile for a pixel gate. Home is covered by the
 *     Chromatic e2e archive lane (AK-dispositioned diffs, register §2
 *     policy A) and the semantic judge.
 *
 * Flake law: settleMotion (the S2 axe discipline) runs before every
 * capture; toHaveScreenshot's own animations:"disabled" default handles
 * CSS/WAAPI; the spring-driven masthead entrance is JS-driven, which is
 * exactly what settleMotion's frame-stability probe covers.
 *
 * Shipped-faces gate (fail-closed): a baseline captured on fallback
 * stacks would enshrine the defect the S1 pre-steps exist to prevent —
 * so the spec ASSERTS the canon faces are loaded before capturing. In CI
 * that requires the PP fonts hydrated via `pnpm fetch:fonts` before the
 * e2e build (the old "CI stays hermetic-fontless" posture ended with S1:
 * a visual gate asserts on faces by definition).
 */

import { expect, test } from './helpers/fixtures'
import { settleMotion } from './helpers/axe'
import { makeEntry, makeFeed, serveWireFeed } from './helpers/wire-fixture'

const VIEWPORTS = [
	{ label: 'desktop', width: 1280, height: 720 },
	{ label: 'mobile', width: 375, height: 812 },
] as const

/** Canon faces the masthead/wordmark surfaces render with (DESIGN.md
 *  §Typography slots): wordmark = PP Editorial New 700, nav = PP Pangram
 *  Sans 800, body = Crimson Pro 400. document.fonts.check() reports
 *  loaded-ness without triggering loads — the masthead's own render is
 *  what pulls them in. */
async function expectShippedFaces(page: import('@playwright/test').Page): Promise<void> {
	await page.evaluate(() => document.fonts.ready)
	const faces = await page.evaluate(() =>
		[
			['Pangram Editorial New', '700 1em "Pangram Editorial New"'],
			['Pangram Sans', '800 1em "Pangram Sans"'],
			['Crimson Pro', '400 1em "Crimson Pro"'],
		].map(([family, probe]) => ({ family, loaded: document.fonts.check(probe) })),
	)
	expect(
		faces.filter((f) => !f.loaded).map((f) => f.family),
		'canon faces must be loaded before a pixel capture — a fallback-stack baseline enshrines the defect (run `pnpm fetch:fonts` for the PP rail)',
	).toEqual([])
}

/** Article discovery mirrors article.spec.ts (sitemap over hardcoding —
 *  AK owns content, the suite owns the route shape), plus a sort so the
 *  pick is stable under new-content additions. The masthead chrome is
 *  identical across articles; the element capture never frames content. */
async function firstDispatchPath(request: import('@playwright/test').APIRequestContext): Promise<string> {
	const res = await request.get('/sitemap-0.xml')
	expect(res.ok()).toBe(true)
	const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
		.map((m) => new URL(m[1]).pathname)
		.filter((p) => p.startsWith('/dispatch/'))
		.sort()
	expect(paths.length, 'sitemap must list at least one /dispatch/ article').toBeGreaterThan(0)
	return paths[0]
}

for (const vp of VIEWPORTS) {
	test.describe(`masthead chrome — ${vp.label}`, () => {
		test.use({ viewport: { width: vp.width, height: vp.height } })

		test(`article masthead holds the pixel lock (${vp.label})`, async ({ page, request }) => {
			await page.goto(await firstDispatchPath(request))
			await settleMotion(page)
			await expectShippedFaces(page)
			await expect(page.locator('header')).toHaveScreenshot(`masthead-article-${vp.label}.png`)
		})

		test(`wire masthead holds the pixel lock (${vp.label})`, async ({ page }) => {
			await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
			await page.goto('/wire')
			await settleMotion(page)
			await expectShippedFaces(page)
			await expect(page.locator('header')).toHaveScreenshot(`masthead-wire-${vp.label}.png`)
		})

		test(`404 masthead holds the pixel lock (${vp.label})`, async ({ page }) => {
			await page.goto('/this-dispatch-does-not-exist/')
			await settleMotion(page)
			await expectShippedFaces(page)
			await expect(page.locator('header')).toHaveScreenshot(`masthead-404-${vp.label}.png`)
		})
	})
}
