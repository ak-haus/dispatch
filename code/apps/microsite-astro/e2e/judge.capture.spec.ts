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

async function capture(page: import('@playwright/test').Page, name: string): Promise<void> {
	await settleMotion(page)
	fs.mkdirSync(OUT_DIR, { recursive: true })
	await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`) })
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
	})
}
