/**
 * Cover wordmark — the optical-centering contract (AK, 2026-08-19).
 *
 * The cover does NOT centre the wordmark's bounding box on the page. The
 * "in print" hairline stays on the page centre line and the wordmark sits
 * SLIGHTLY off it, so the rule lands over the black half of the word,
 * centred on the "a" of patch. That relationship is the design; the
 * translateX in CoverSpread is only its current implementation.
 *
 * This asserts the relationship, not the implementation, so a type change,
 * a tracking change or a refactor that breaks the intent fails here rather
 * than shipping. It also guards the defect that made the rule necessary:
 * before this, a featured title longer than the wordmark widened the
 * centred group and dragged the left-aligned wordmark 168px off centre —
 * a drift that grew with every longer headline.
 */

import { expect, test } from './helpers/fixtures'
import { settleMotion } from './helpers/axe'
import { makeEntry, makeFeed, serveWireFeed } from './helpers/wire-fixture'

const VIEWPORTS = [
	{ label: 'desktop', width: 1280, height: 720 },
	{ label: 'mobile', width: 375, height: 812 },
] as const

/** Letter geometry + the hairline, after the entrance has fully settled. */
async function coverGeometry(page: import('@playwright/test').Page) {
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
		const rule = h1.closest('div')?.parentElement?.querySelector(
			'div[aria-hidden="true"][class*="h-px"]',
		) as HTMLElement
		const centre = (el: Element) => {
			const r = el.getBoundingClientRect()
			return r.left + r.width / 2
		}
		const letters = Array.from(
			h1.querySelectorAll('span.inline-block'),
		) as HTMLElement[]
		// "patch" is the second group; its "a" is the anchor.
		const a = letters.find((el, i) => el.textContent === 'a' && i > 2)!
		const ruleRect = rule.getBoundingClientRect()
		return {
			aCentre: centre(a),
			ruleCentre: centre(rule),
			ruleLeft: ruleRect.left,
			ruleRight: ruleRect.right,
			covered: letters
				.filter((el) => {
					const r = el.getBoundingClientRect()
					return r.right > ruleRect.left && r.left < ruleRect.right
				})
				.map((el) => el.textContent),
		}
	})
}

for (const vp of VIEWPORTS) {
	test.describe(`cover wordmark — ${vp.label}`, () => {
		test.use({ viewport: { width: vp.width, height: vp.height } })

		test(`the in-print rule is centred on the "a" of patch (${vp.label})`, async ({ page }) => {
			await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
			await page.goto('/')
			await settleMotion(page)
			const g = await coverGeometry(page)
			// One device pixel of tolerance; this is an optical relationship,
			// not a pixel lock.
			expect(
				Math.abs(g.aCentre - g.ruleCentre),
				'the hairline must sit centred on the "a" of patch',
			).toBeLessThanOrEqual(1)
		})

		test(`the rule sits over the black letters, toward the p (${vp.label})`, async ({ page }) => {
			await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
			await page.goto('/')
			await settleMotion(page)
			const g = await coverGeometry(page)
			// It must cover patch letters only — never reach back into the red
			// DIS, and never run past the end of the word.
			expect(g.covered.length, 'the rule must overlap some letters').toBeGreaterThan(0)
			expect(
				g.covered.every((c) => 'patch'.includes(c ?? '')),
				`the rule must stay over "patch"; it covered ${g.covered.join('')}`,
			).toBe(true)
		})

		test(`a long featured title cannot drag the wordmark off centre (${vp.label})`, async ({ page }) => {
			// The regression that made this contract necessary: the ticker used
			// to size the centred group, so a longer headline moved the wordmark.
			await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
			await page.goto('/')
			await settleMotion(page)
			const short = await coverGeometry(page)
			await page.evaluate(() => {
				const p = document.querySelector('h1[aria-label="DISpatch"]')
					?.closest('div')
					?.querySelector('p')
				if (p) p.textContent = 'Live — '.concat('an extremely long featured dispatch headline '.repeat(3))
			})
			const long = await coverGeometry(page)
			expect(
				Math.abs(long.aCentre - short.aCentre),
				'the featured title must not move the wordmark',
			).toBeLessThanOrEqual(1)
		})
	})
}
