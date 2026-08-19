/**
 * Semantic-judge capture pass (ADR-0003 §Stage 4b): deterministic screenshots
 * of the journey surfaces at route/scroll states × 2 viewports. NOT a test
 * lane — no assertions on pixels; the captures feed scripts/semantic-judge.mjs
 * (Claude vision against DESIGN.md). Runs ONLY under playwright.judge.config.ts
 * (the main config ignores this file), reusing the same webServer + fixtures +
 * settle discipline as the e2e suite.
 *
 * Determinism posture: settleMotion + stubbed wire feed + shipped faces, same
 * as visual.spec.ts — but the judge tolerates residual nondeterminism (the
 * home cover's video substrate, live-date swap) because a vision judge reads
 * layout/canon, not pixels. That is exactly why home CAN appear here while the
 * pixel floor deliberately excludes it.
 */

import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from './helpers/fixtures'
import { settleMotion } from './helpers/axe'
import { makeEntry, makeFeed, serveWireFeed } from './helpers/wire-fixture'

const OUT_DIR = path.join(process.cwd(), 'test-results', 'judge-captures')

const VIEWPORTS = [
	{ label: 'desktop', width: 1280, height: 720 },
	{ label: 'mobile', width: 375, height: 812 },
] as const

/**
 * The cover wordmark animates in letter by letter through Motion, with the
 * last letter starting at 1.29s and running 0.85s. Those are main-thread rAF
 * animations, so getAnimations() never sees them and settleMotion returns
 * long before they finish — which is why every home capture in the evidence
 * packet so far has shown an EMPTY cover: the hairline rule, the substrate,
 * and no wordmark at all (found 2026-08-19, reviewing the packet AK judges).
 * Wait for the letters themselves. No-op on surfaces without a cover.
 */
async function settleCoverWordmark(page: import('@playwright/test').Page): Promise<void> {
	await page.waitForFunction(
		() => {
			const letters = Array.from(
				document.querySelectorAll('h1[aria-label="DISpatch"] span.inline-block'),
			)
			return letters.every((s) => Number(getComputedStyle(s).opacity) === 1)
		},
		undefined,
		{ timeout: 10_000 },
	)
}

async function capture(
	page: import('@playwright/test').Page,
	name: string,
	{ fullPage = false }: { fullPage?: boolean } = {},
): Promise<void> {
	await settleMotion(page)
	fs.mkdirSync(OUT_DIR, { recursive: true })
	// Journey surfaces capture the VIEWPORT: what the reader sees at a given
	// route/scroll state is the thing under review. A component proving ground
	// is the opposite — the evidence IS the variants side by side, and a
	// viewport crop shows the masthead and one plate. Opt in per capture.
	await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage })
}

async function firstDispatchPath(request: import('@playwright/test').APIRequestContext): Promise<string> {
	const res = await request.get('/sitemap-0.xml')
	expect(res.ok()).toBe(true)
	const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
		.map((m) => new URL(m[1]).pathname)
		.filter((p) => p.startsWith('/dispatch/'))
		.sort()
	expect(paths.length).toBeGreaterThan(0)
	return paths[0]
}

for (const vp of VIEWPORTS) {
	test.describe(`judge captures — ${vp.label}`, () => {
		test.use({ viewport: { width: vp.width, height: vp.height } })

		test(`home cover + mid-scroll (${vp.label})`, async ({ page }) => {
			await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
			await page.goto('/')
			await settleCoverWordmark(page)
			await capture(page, `home-cover-${vp.label}`)
			// Mid-scroll state: the article/DLDS spread region. Native scrollTo —
			// Lenis syncs from native scroll; settleMotion absorbs the smoothing.
			await page.evaluate(() => window.scrollTo(0, Math.round(document.body.scrollHeight * 0.35)))
			await capture(page, `home-midscroll-${vp.label}`)
		})

		test(`article opener (${vp.label})`, async ({ page, request }) => {
			await page.goto(await firstDispatchPath(request))
			await capture(page, `article-opener-${vp.label}`)
		})

		test(`wire rail (${vp.label})`, async ({ page }) => {
			await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
			await page.goto('/wire')
			await capture(page, `wire-${vp.label}`)
		})

		test(`404 editorial page (${vp.label})`, async ({ page }) => {
			await page.goto('/this-dispatch-does-not-exist/')
			await capture(page, `notfound-${vp.label}`)
		})

		// S4 (design-intent-to-code): the lane's proof artifact enters the
		// evidence packet, so what AK judges is the component as the astro
		// compile actually renders it — the same surface the pixel floor
		// locks, full-page rather than per-element so the variants are
		// legible side by side. whileInView entrances need the scroll pass
		// before the capture, or the plates photograph mid-fade.
		test(`figure proving ground (${vp.label})`, async ({ page }) => {
			await page.goto('/preview/figure/')
			for (const kase of ['default', 'meta-terminal', 'cartography-frame', 'photograph']) {
				await page.locator(`[data-figure-case="${kase}"] .prime-figure`).scrollIntoViewIfNeeded()
				await expect(
					page.locator(`[data-figure-case="${kase}"] .prime-figure`),
				).toHaveCSS('opacity', '1')
			}
			await page.evaluate(() => window.scrollTo(0, 0))
			await capture(page, `figure-proving-ground-${vp.label}`, { fullPage: true })
		})
	})
}
