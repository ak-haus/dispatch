/**
 * Playwright visual floor (ADR-0003 §Stage 4, wiring step 2): the $0,
 * in-repo, vendor-independent pixel lock. Baselines live in git
 * (visual.spec.ts-snapshots/), are generated in the CI linux runner —
 * NEVER on a Mac (documented rendering variance; ADR bake-off row) — and
 * diff PNGs land on disk where agents read them directly.
 *
 * Scope — two locks:
 *
 *   1. the masthead/wordmark surfaces, per the ADR (below);
 *   2. COMPONENT locks over the /preview/* proving grounds (added at S4, the
 *      design-intent-to-code lane). The story lane already snapshots
 *      components from Storybook; this locks them in the real astro compile,
 *      where global.css, the shipped @font-face rail and the page-owned
 *      letterpress are all in the cascade — the one place a Storybook-only
 *      capture could still be lying. Element captures, so page chrome and
 *      neighbouring cases never bleed into a component's baseline.
 *
 * Masthead scope, per the ADR:
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

/* ── Component locks — ImageWithCaption (CD7 #24), the S4 lane's proof
 * artifact. Every variant renders on /preview/figure, which is deliberately
 * static: no live data, every asset eager-loaded, so the only nondeterminism
 * is the entrance animation the settle helper below absorbs. */

const FIGURE_CASES = [
	'default',
	'meta-terminal',
	'cartography-frame',
	'photograph',
] as const

/**
 * Flake law for whileInView entrances: the figures ship SSR'd at opacity 0 and
 * the island animates them in only once they intersect the viewport, so a
 * capture must (a) bring the case into view and (b) wait for the settled
 * value. settleMotion's own probe covers WAAPI animations and the masthead
 * spring, not Motion's main-thread rAF on an arbitrary element — hence the
 * explicit per-element wait, the same discipline the story rail uses.
 */
async function settleFigure(page: import('@playwright/test').Page, kase: string) {
	const figure = page.locator(`[data-figure-case="${kase}"] .prime-figure`)
	await figure.scrollIntoViewIfNeeded()
	await expect(figure).toHaveCSS('opacity', '1')
	await expect(figure).toHaveCSS('transform', 'none')
	// The image itself must have decoded, or the plate captures as a gap.
	await page.locator(`[data-figure-case="${kase}"] .prime-figure__media`).evaluate(
		(img) => (img as HTMLImageElement).decode().catch(() => undefined),
	)
	return figure
}

for (const vp of VIEWPORTS) {
	test.describe(`ImageWithCaption — ${vp.label}`, () => {
		test.use({ viewport: { width: vp.width, height: vp.height } })

		for (const kase of FIGURE_CASES) {
			test(`${kase} variant holds the pixel lock (${vp.label})`, async ({ page }) => {
				await page.goto('/preview/figure/')
				await settleMotion(page)
				await expectShippedFaces(page)
				const figure = await settleFigure(page, kase)
				await expect(figure).toHaveScreenshot(`figure-${kase}-${vp.label}.png`)
			})
		}
	})
}
