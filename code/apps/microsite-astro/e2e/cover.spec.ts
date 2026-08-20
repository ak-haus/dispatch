/**
 * Cover composition contract (AK, 2026-08-19).
 *
 * Two rules, and the first one is the one that keeps getting broken:
 *
 * 1. THE WORDMARK AND THE LIVE TICKER ARE INDEPENDENT COMPONENTS. They were
 *    bound together in an early build by an inference error — a wrapper that
 *    left-aligned the ticker to the D and let whichever was wider size the
 *    pair — and that coupling is what dragged the wordmark off centre (168px
 *    at 1280w, worse with every longer headline, because the drift is
 *    (tickerWidth − wordmarkWidth)/2). What was actually being tuned was
 *    VERTICAL: enough distance that the cover reads as composed. Proximity,
 *    not alignment. These tests fail if anything couples them horizontally
 *    again — including a future agent "helpfully" re-aligning them.
 *
 * 2. The wordmark sits SLIGHTLY off the centre line so the "in print"
 *    hairline lands over the black half of the word, centred on the "a" of
 *    patch. Asserted as a relationship, not as the 0.412em that implements
 *    it, so a type or tracking change fails here instead of shipping.
 */

import { expect, test } from './helpers/fixtures'
import { settleMotion } from './helpers/axe'
import { archiveSnapshot } from './helpers/archive'
import { makeEntry, makeFeed, serveWireFeed } from './helpers/wire-fixture'

const VIEWPORTS = [
	{ label: 'desktop', width: 1280, height: 720 },
	{ label: 'mobile', width: 375, height: 812 },
] as const

async function coverGeometry(page: import('@playwright/test').Page) {
	// The letters animate in on the main thread through Motion, so
	// getAnimations() never sees them and settleMotion returns early.
	await page.waitForFunction(
		() =>
			Array.from(
				document.querySelectorAll('h1[aria-label="DISpatch"] span.inline-block'),
			).every((s) => Number(getComputedStyle(s).opacity) === 1),
		undefined,
		{ timeout: 10_000 },
	)
	return page.evaluate(() => {
		const h1 = document.querySelector('h1[aria-label="DISpatch"]') as HTMLElement
		const rule = document.querySelector(
			'div[aria-hidden="true"][class*="h-px"]',
		) as HTMLElement
		const ticker = document.querySelector(
			'h1[aria-label="DISpatch"] ~ div',
		) as HTMLElement | null
		const box = (el: Element | null) => {
			if (!el) return null
			const r = el.getBoundingClientRect()
			return { left: r.left, right: r.right, centre: r.left + r.width / 2, height: r.height }
		}
		const letters = Array.from(
			h1.querySelectorAll('span.inline-block'),
		) as HTMLElement[]
		const a = letters.find((el, i) => el.textContent === 'a' && i > 2)!
		const ruleRect = rule.getBoundingClientRect()
		return {
			pageCentre: window.innerWidth / 2,
			h1: box(h1)!,
			rule: box(rule)!,
			ticker: box(ticker),
			a: box(a)!,
			covered: letters
				.filter((el) => {
					const r = el.getBoundingClientRect()
					return r.right > ruleRect.left && r.left < ruleRect.right
				})
				.map((el) => el.textContent),
		}
	})
}

async function openCover(page: import('@playwright/test').Page) {
	await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
	await page.goto('/')
	await settleMotion(page)
}

for (const vp of VIEWPORTS) {
	test.describe(`cover composition — ${vp.label}`, () => {
		test.use({ viewport: { width: vp.width, height: vp.height } })

		test(`the hairline is centred on the "a" of patch (${vp.label})`, async ({ page }, testInfo) => {
			await openCover(page)
			const g = await coverGeometry(page)
			expect(
				Math.abs(g.a.centre - g.rule.centre),
				'the hairline must sit centred on the "a" of patch',
			).toBeLessThanOrEqual(1)

			// Chromatic archive lane — HOME lives here, and only here.
			//
			// The ADR assigns home to this lane precisely because the pixel floor
			// excludes it (visual.spec.ts header note), and this file is the only
			// place the cover provably reaches rest: coverGeometry waits on the
			// letter-by-letter wordmark, which Motion drives on the main thread
			// where getAnimations() cannot see it.
			//
			// One snapshot per viewport, from THIS test only — the other four
			// cover tests end on the same page (and one deliberately rewrites the
			// ticker copy), so archiving them would buy five near-identical
			// snapshots and one corrupted page.
			//
			// Scope, stated rather than implied: this captures the cover at
			// scroll-top. The spreads below it are SSR'd at opacity 0 until they
			// scroll into view, so they archive blank — the deep page is the judge
			// packet's job, not this lane's.
			await archiveSnapshot(page, 'home-cover', testInfo)
		})

		test(`the hairline stays over "patch", toward the p (${vp.label})`, async ({ page }) => {
			await openCover(page)
			const g = await coverGeometry(page)
			expect(g.covered.length, 'the rule must overlap the word').toBeGreaterThan(0)
			expect(
				g.covered.every((c) => 'patch'.includes(c ?? '')),
				`the rule must never reach back into the red DIS; it covered ${g.covered.join('')}`,
			).toBe(true)
		})

		test(`the wordmark is only SLIGHTLY off the centre line (${vp.label})`, async ({ page }) => {
			await openCover(page)
			const g = await coverGeometry(page)
			// The optical step is ~0.41 of the type size. Anything approaching
			// half the wordmark's width means the coupling defect is back.
			const off = Math.abs(g.h1.centre - g.pageCentre)
			expect(off, 'the wordmark drifted far off centre').toBeLessThan(
				(g.h1.right - g.h1.left) * 0.2,
			)
		})

		test(`the ticker holds the centre line on its own (${vp.label})`, async ({ page }) => {
			await openCover(page)
			const g = await coverGeometry(page)
			expect(g.ticker, 'the ticker must render').not.toBeNull()
			// Independent component: it shares the cover's centre line with the
			// volume label and the hairline, NOT the wordmark's left edge.
			expect(
				Math.abs(g.ticker!.centre - g.pageCentre),
				'the ticker must sit on the page centre line, not follow the wordmark',
			).toBeLessThanOrEqual(1)
		})

		test(`a longer headline moves neither component (${vp.label})`, async ({ page }) => {
			// The exact regression: when the two were coupled, the ticker sized
			// the pair, so a longer featured title walked the wordmark left.
			await openCover(page)
			const before = await coverGeometry(page)
			await page.evaluate(() => {
				const p = document.querySelector('h1[aria-label="DISpatch"] ~ div p')
				if (p) p.textContent = 'Live — '.concat('a considerably longer featured dispatch headline '.repeat(2))
			})
			const after = await coverGeometry(page)
			expect(
				Math.abs(after.a.centre - before.a.centre),
				'the featured title must not move the wordmark — they are independent',
			).toBeLessThanOrEqual(1)
		})
	})
}
