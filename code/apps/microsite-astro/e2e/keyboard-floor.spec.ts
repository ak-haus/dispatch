/**
 * The keyboard floor — F56.
 *
 * Three defects no instrument in this repo could have seen: axe has no rule
 * for focus visibility, so widening the axe sweep (F54) could never have
 * reached any of them.
 *
 *  (1) WCAG 2.4.7 / 2.4.11 — the hero masthead is hidden with `opacity: 0`
 *      and `pointer-events: none`, which stops the eye and the mouse but not
 *      the Tab key. Measured: 10 focusable children at BOTH 375 and 1280,
 *      entirely above the viewport (top -66px), still focusable a full second
 *      later because the header is `position: fixed` and focus-scroll has
 *      nothing to scroll to. Enter on one opened the navigation dialog.
 *      (The row filed 2 and 9; the measurement says 10 at both.)
 *  (2) WCAG 2.4.7 Level A — `outline-none` with nothing put back on the six
 *      Atlas markers and the six district rows.
 *  (3) WCAG 2.4.1 Level A — no skip link on any route, and `<main>` carried
 *      no id, so there was nothing to skip to.
 *
 * None can pass vacuously: each asserts it found the surface it is judging.
 */

import { expect, test } from './helpers/fixtures'

const ROUTES = ['/', '/about', '/article', '/wire', '/sitemap', '/dispatch/dispatch-01']

/* ── (1) Nothing focusable hides above the fold ─────────────────────────── */
for (const width of [1280, 375]) {
	test(`F56(1) — the hidden hero masthead holds no tab stops at ${width}`, async ({ page }) => {
		await page.setViewportSize({ width, height: 812 })
		await page.goto('/')
		await page.waitForTimeout(2500)

		const probe = await page.evaluate(() => {
			const hdr = document.querySelector('body.dispatch-hero header') as HTMLElement | null
			if (!hdr) return null
			const sel = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
			return {
				opacity: getComputedStyle(hdr).opacity,
				visibility: getComputedStyle(hdr).visibility,
				children: hdr.querySelectorAll(sel).length,
			}
		})
		expect(probe, 'the home page must still be a hero surface').not.toBeNull()
		const p = probe as NonNullable<typeof probe>

		// Cannot pass vacuously: the masthead must still CARRY its controls and
		// still be the hidden one. A build that deleted the nav would fail here.
		expect(p.children, 'the masthead must still contain its controls').toBeGreaterThan(5)
		expect(p.opacity, 'this pin only means something while the masthead is hidden').toBe('0')

		// The actual requirement.
		expect(p.visibility, 'a hidden masthead must leave the tab order').toBe('hidden')

		// And behaviourally: Tab from the top must never land above the viewport.
		const offscreen: string[] = []
		for (let i = 0; i < 6; i++) {
			await page.keyboard.press('Tab')
			const info = await page.evaluate(() => {
				const el = document.activeElement as HTMLElement | null
				if (!el || el === document.body) return null
				const r = el.getBoundingClientRect()
				return {
					label: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30),
					above: r.bottom <= 0,
				}
			})
			if (info?.above) offscreen.push(info.label)
		}
		expect(offscreen, 'Tab must not reach controls parked above the viewport').toEqual([])
	})
}

/* ── (2) Every visible control draws a focus indicator ──────────────────── */
test('F56(2) — no visible control removes its focus indicator', async ({ page }) => {
	await page.goto('/sitemap')
	await page.waitForTimeout(1500)

	const result = await page.evaluate(() => {
		const sel = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
		const visible = [...document.querySelectorAll(sel)].filter((e) => {
			const el = e as HTMLElement
			const r = el.getBoundingClientRect()
			return el.offsetParent !== null && r.width > 0 && r.height > 0
		}) as HTMLElement[]
		const ringless: string[] = []
		let ringed = 0
		for (const el of visible) {
			el.focus()
			const cs = getComputedStyle(el)
			const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0
			const shadow = !!cs.boxShadow && cs.boxShadow !== 'none'
			if (outline || shadow) ringed++
			else ringless.push((el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 30))
		}
		return { total: visible.length, ringed, ringless }
	})

	expect(result.total, 'the sweep must find controls to judge').toBeGreaterThan(10)
	// Proves the detector: some controls DO draw a ring under this exact
	// method, so a universally-blind probe cannot report a clean sweep.
	expect(result.ringed, 'the probe must be able to see a ring at all').toBeGreaterThan(0)
	expect(result.ringless).toEqual([])
})

/* ── (3) Every route can bypass its navigation ──────────────────────────── */
test('F56(3) — every route offers a working skip link', async ({ page }) => {
	for (const route of ROUTES) {
		await page.goto(route)
		await page.waitForTimeout(1000)

		const main = page.locator('#main-content')
		await expect(main, `${route} must carry a skip target`).toHaveCount(1)

		// The FIRST tab stop must be the skip link — a skip link buried behind
		// the navigation it bypasses is not a bypass.
		await page.keyboard.press('Tab')
		const first = await page.evaluate(() => {
			const el = document.activeElement as HTMLElement | null
			const r = el?.getBoundingClientRect()
			return {
				href: el?.getAttribute('href') ?? null,
				text: (el?.textContent ?? '').trim(),
				// Must be ON SCREEN once focused, not merely present.
				visible: !!r && r.top >= 0 && r.height > 0,
			}
		})
		expect(first.href, `${route}: the first tab stop must be the skip link`).toBe('#main-content')
		expect(first.visible, `${route}: the skip link must become visible on focus`).toBe(true)

		// And it must actually move focus to the content.
		await page.keyboard.press('Enter')
		await page.waitForTimeout(300)
		const landed = await page.evaluate(() => document.activeElement?.id ?? null)
		expect(landed, `${route}: activating the skip link must focus the content`).toBe(
			'main-content',
		)
	}
})
