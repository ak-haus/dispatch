/**
 * WCAG 1.4.10 Reflow, every public route — F59.
 *
 * `home.spec.ts` already pins the home page at 320 and 412 (B12) and on a
 * landscape phone (F51). This widens that floor to the whole built surface,
 * which is where the remaining failures were: `/article` measured scrollWidth
 * 368 against innerWidth 320 (the Media filter group's intrinsic width, broken
 * from 320 to 367 and clean from 368), `/preview/figure` 437 at EVERY viewport
 * (one unbreakable token at a fixed `text-5xl`), and `/preview/tokens` 338
 * (fixed 4-, 5- and 12-column grids leaving a few pixels of content width per
 * cell at 320).
 *
 * 320x256 is the normative test: SC 1.4.10 is written as 320 CSS pixels wide
 * AND 256 CSS pixels tall, which is 400% zoom of a 1280x1024 window. Both are
 * checked because the failures differ — a short viewport changes what wraps.
 *
 * TWO measurements, because one of them missed a real failure. An element's
 * bounding box can sit inside the viewport while its TEXT INK overflows that
 * box: `/preview/tokens` scrolled 3px sideways with no element's right edge
 * past 320. So the pin asserts both that the document does not exceed the
 * viewport AND that it genuinely cannot be scrolled sideways.
 */

import { expect, test } from './helpers/fixtures'

const ROUTES = [
	'/',
	'/about',
	'/article',
	'/wire',
	'/sitemap',
	'/dispatch/dispatch-01',
	'/preview/figure',
	'/preview/tokens',
	'/preview/reading-room',
	'/404',
]

/** 320x256 is SC 1.4.10's own reference; 320x568 is a real phone at that width. */
const VIEWPORTS = [
	{ width: 320, height: 256, label: '320x256 (400% zoom of 1280x1024)' },
	{ width: 320, height: 568, label: '320x568' },
]

for (const vp of VIEWPORTS) {
	test(`every route reflows at ${vp.label} with no two-dimensional scrolling`, async ({ page }) => {
		await page.setViewportSize({ width: vp.width, height: vp.height })
		const offenders: Array<{ route: string; scrollWidth: number; scrolledTo: number }> = []

		for (const route of ROUTES) {
			await page.goto(route)
			await page.waitForTimeout(900)
			const m = await page.evaluate(() => {
				// Ink can overflow a box that is itself inside the viewport, so
				// ask the document whether it will actually move sideways.
				window.scrollTo(200, 0)
				const scrolledTo = Math.round(window.scrollX)
				window.scrollTo(0, 0)
				return {
					scrollWidth: document.documentElement.scrollWidth,
					clientWidth: document.documentElement.clientWidth,
					scrolledTo,
				}
			})
			if (m.scrollWidth > m.clientWidth || m.scrolledTo > 0) {
				offenders.push({ route, scrollWidth: m.scrollWidth, scrolledTo: m.scrolledTo })
			}
		}

		expect(offenders).toEqual([])
	})
}

/*
 * The detector, proven. A probe that cannot see sideways scrolling would
 * report every route clean, so make it see some: a deliberately over-wide
 * element must be caught by the same measurement the pins above use.
 */
test('control — the reflow probe detects sideways scrolling when it exists', async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 568 })
	await page.goto('/about')
	await page.waitForTimeout(600)

	const detected = await page.evaluate(() => {
		const canary = document.createElement('div')
		canary.style.cssText = 'width:900px;height:8px'
		document.body.appendChild(canary)
		window.scrollTo(200, 0)
		const moved = Math.round(window.scrollX)
		const wide = document.documentElement.scrollWidth > document.documentElement.clientWidth
		canary.remove()
		window.scrollTo(0, 0)
		return { moved, wide }
	})
	expect(detected.wide, 'the width measurement must notice an over-wide element').toBe(true)
	expect(detected.moved, 'the scroll measurement must notice real sideways travel').toBeGreaterThan(
		0,
	)
})
