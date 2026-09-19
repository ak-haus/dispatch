/**
 * Journey: home + hydration proof (Golden Board A2).
 *
 * The homepage is prerendered HTML with client:load islands — markup alone
 * proves nothing about the JS product. The hydration proof is behavioral:
 * the Live Wire ticker's pause control must actually TOGGLE, which only
 * happens once React has attached handlers. A dead island fails this test.
 */

import { expect, test } from './helpers/fixtures'
import { expectNoAxeViolations, settleMotion } from './helpers/axe'
import { makeEntry, makeFeed, serveWireFeed } from './helpers/wire-fixture'

type Paints = { fcp?: number; lcp: { time: number; inCover: boolean }[] }

test('front page renders and the wire island hydrates', async ({ page }) => {
	const entry = makeEntry(1, 3)
	await serveWireFeed(page, makeFeed([entry]))
	await page.goto('/')
	await expect(page).toHaveTitle(/DISpatch/)

	// Hydration proof: the SSR HTML already contains this button, so its mere
	// presence is meaningless — clicking must flip aria-pressed. Retried as a
	// block because a click racing hydration is legitimately lost. The label
	// flips Pause↔Resume, so the locator matches either state.
	const pauseToggle = page.getByRole('button', { name: /Pause updates|^Resume/ })
	await pauseToggle.scrollIntoViewIfNeeded()
	await expect(async () => {
		await pauseToggle.click()
		await expect(pauseToggle).toHaveAttribute('aria-pressed', 'true', { timeout: 500 })
	}).toPass({ timeout: 15_000 })

	// And the hydrated island reached the (stubbed) rail: fixture content
	// no build snapshot can contain is on the page.
	await expect(page.getByRole('link', { name: entry.title })).toBeVisible()
})

test('home holds the axe WCAG floor', async ({ page }, testInfo) => {
	await serveWireFeed(page, makeFeed([makeEntry(1, 5)]))
	await page.goto('/')
	await expect(page).toHaveTitle(/DISpatch/)
	await expectNoAxeViolations(page, testInfo)
})

/**
 * B12: the cover's text paints with the first paint. It used to be
 * server-rendered at opacity 0 and faded in by Motion after the island
 * hydrated, and LCP ignores paints at opacity 0, so production Lighthouse
 * read LCP 12.5–13.9s. The Lighthouse ratchet cannot see this class of
 * defect: served from localhost, every request finishes before the first
 * paint, so its simulated LCP read the same 13.6s with the text hidden and
 * with it visible. This test measures the render delay itself.
 */
test('home paints its largest text with the first paint, not after hydration (B12)', async ({ page }) => {
	await page.addInitScript(() => {
		const paints: Paints = { lcp: [] }
		Object.assign(window, { __paints: paints })
		new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) if (entry.name === 'first-contentful-paint') paints.fcp = entry.startTime
		}).observe({ type: 'paint', buffered: true })
		new PerformanceObserver((list) => {
			for (const entry of list.getEntries() as (PerformanceEntry & { element: Element | null })[]) {
				paints.lcp.push({
					time: entry.startTime,
					inCover: !!entry.element?.closest('section[aria-label="DISpatch — Volume 01 cover"]'),
				})
			}
		}).observe({ type: 'largest-contentful-paint', buffered: true })
	})
	await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
	await page.goto('/')
	// Every entrance has finished, JS or CSS: a reveal that waited for
	// hydration would have reported its later LCP entry by now.
	await settleMotion(page)
	const paints = await page.evaluate(() => (window as unknown as { __paints: Paints }).__paints)
	const lcp = paints.lcp.at(-1)
	expect(lcp, 'home reported no LCP entry').toBeDefined()
	expect(paints.fcp, 'home reported no first contentful paint').toBeDefined()
	expect(lcp!.inCover, 'the largest paint must be the cover').toBe(true)
	expect(lcp!.time - paints.fcp!, 'the largest paint must land with the first paint').toBeLessThanOrEqual(250)
})

/**
 * WCAG 1.4.10 Reflow at its 320px reference width, and at 412px, the phone
 * the Lighthouse ratchet measures. A single nowrap caption 510px wide
 * (BuildTicker) made the whole page scroll sideways on a phone, and Chrome
 * widened the initial viewport to 514×1027 to fit it, which pulled
 * below-the-fold headings into the LCP race (B12).
 */
for (const width of [320, 412]) {
	test(`home reflows at ${width}px with no sideways scroll (WCAG 1.4.10, B12)`, async ({ page }) => {
		await page.setViewportSize({ width, height: 800 })
		await serveWireFeed(page, makeFeed([makeEntry(1, 2)]))
		await page.goto('/')
		await settleMotion(page)
		const { scrollWidth, clientWidth } = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth,
		}))
		expect(scrollWidth, 'the page is wider than the viewport').toBeLessThanOrEqual(clientWidth)
	})
}
