/**
 * Modal scroll lock — F52.
 *
 * Lenis is a programmatic scroller: it drives the page from its own rAF loop,
 * so `overflow: hidden` on <body> never touches it and neither does the top
 * layer. All three overlays are native <dialog>s opened with `showModal()` —
 * which makes the rest of the document inert for FOCUS, per the HTML standard
 * — and every one of them still scrolled the page behind itself. Measured at
 * the C1 bash: 1999px on `/about` at 375x812.
 *
 * The repair is a single state-derived listener in StackLayout, not three
 * imperative stop/start pairs: "is any modal dialog open?" cannot desync the
 * way a paired lock can, and it covers a fourth overlay for free.
 *
 * THE GESTURE IS SWEPT, NOT FIXED, and that is load-bearing. A first draft of
 * this pin wheeled once at the viewport's centre and reported the chapter
 * sheet CLEAN against a build that leaks 2851px — the centre of that sheet
 * happens to be a dead spot while its top and bottom edges leak. Every pin
 * below wheels at three points inside the overlay's own box and fails if any
 * one of them moves the page.
 *
 * Each pin was watched FAILING against the unfixed build and none can pass
 * vacuously: every one asserts the overlay really opened (`:modal`) and that
 * the same gesture DOES scroll the page when no overlay is open.
 */

import type { Locator, Page } from '@playwright/test'
import { expect, test } from './helpers/fixtures'

const PHONE = { width: 375, height: 812 }

async function wheelAt(page: Page, x: number, y: number): Promise<void> {
	for (let i = 0; i < 8; i++) {
		await page.mouse.move(x, y)
		await page.mouse.wheel(0, 400)
		await page.waitForTimeout(90)
	}
	// Lenis eases; give its rAF loop time to land.
	await page.waitForTimeout(700)
}

async function scrollY(page: Page): Promise<number> {
	return page.evaluate(() => Math.round(window.scrollY))
}

async function resetScroll(page: Page): Promise<void> {
	await page.evaluate(() => window.scrollTo(0, 0))
	await page.waitForTimeout(400)
}

/**
 * The control every pin leans on: with NO overlay open the same gesture must
 * move the page. Without it, a "lock" could pass on a page that cannot scroll.
 */
async function assertPageScrollsNormally(page: Page): Promise<void> {
	await resetScroll(page)
	await wheelAt(page, PHONE.width / 2, PHONE.height / 2)
	expect(await scrollY(page), 'control: the page must scroll when nothing is open').toBeGreaterThan(
		100,
	)
	await resetScroll(page)
}

/** Sweep the overlay's own box — top edge, middle, bottom edge. */
async function assertNoLeakBehind(page: Page, overlay: Locator, what: string): Promise<void> {
	expect(
		await overlay.evaluate((d) => (d as HTMLDialogElement).matches(':modal')),
		`${what} must really be modal, or this pin proves nothing`,
	).toBe(true)

	const box = await overlay.boundingBox()
	expect(box, `${what} must have a box to wheel over`).not.toBeNull()
	const b = box as NonNullable<typeof box>
	const x = b.x + b.width / 2
	const points: Array<[string, number]> = [
		['top edge', b.y + 20],
		['middle', b.y + b.height / 2],
		['bottom edge', b.y + b.height - 20],
	]

	for (const [label, y] of points) {
		await resetScroll(page)
		const before = await scrollY(page)
		await wheelAt(page, x, y)
		expect(
			await scrollY(page),
			`the page must not move behind ${what} (wheel at its ${label})`,
		).toBe(before)
	}
}

test.describe('F52 — an open overlay freezes the page behind it', () => {
	test.use({ viewport: PHONE })

	test('the masthead menu does not leak scroll', async ({ page }) => {
		await page.goto('/about')
		await page.waitForTimeout(1200)
		await assertPageScrollsNormally(page)

		await page.getByRole('button', { name: /open menu/i }).click()
		const sheet = page.locator('#dispatch-mobile-menu')
		await expect(sheet).toBeVisible()
		await assertNoLeakBehind(page, sheet, 'the masthead menu')
	})

	test('the search palette does not leak scroll', async ({ page }) => {
		await page.goto('/about')
		await page.waitForTimeout(1200)
		await assertPageScrollsNormally(page)

		await page.keyboard.press('ControlOrMeta+k')
		const palette = page.locator('dialog[open]').first()
		await expect(palette).toBeVisible()
		await assertNoLeakBehind(page, palette, 'the search palette')
	})

	test('the chapter sheet does not leak scroll', async ({ page }) => {
		await page.goto('/dispatch/dispatch-01')
		await page.waitForTimeout(1200)
		await assertPageScrollsNormally(page)

		const chip = page.locator('[aria-controls="chapter-rail-sheet"]')
		await expect(chip).toBeVisible()
		await chip.click()
		const sheet = page.locator('#chapter-rail-sheet')
		await expect(sheet).toBeVisible()
		await assertNoLeakBehind(page, sheet, 'the chapter sheet')
	})

	/*
	 * The reason the lock lives outside the Lenis branch. Under reduce Lenis
	 * is never constructed — `window.__lenis` is absent and all five of its
	 * subscribers tolerate that — so a lock written inside that branch would
	 * leave precisely the readers this floor exists for unprotected.
	 */
	test('the lock holds under reduced motion, where Lenis never exists', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' })
		await page.goto('/about')
		await page.waitForTimeout(1200)
		expect(
			await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches),
			'reduced-motion emulation must actually reach the page',
		).toBe(true)
		expect(
			await page.evaluate(() => '__lenis' in window),
			'this pin is only meaningful while reduce genuinely skips Lenis',
		).toBe(false)

		await assertPageScrollsNormally(page)
		await page.getByRole('button', { name: /open menu/i }).click()
		const sheet = page.locator('#dispatch-mobile-menu')
		await expect(sheet).toBeVisible()
		await assertNoLeakBehind(page, sheet, 'the masthead menu under reduce')
	})

	test('closing the overlay hands scrolling back', async ({ page }) => {
		await page.goto('/about')
		await page.waitForTimeout(1200)

		await page.getByRole('button', { name: /open menu/i }).click()
		await expect(page.locator('#dispatch-mobile-menu')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.locator('#dispatch-mobile-menu')).toBeHidden()

		// The lock must RELEASE — a lock that never lifts is its own defect.
		await resetScroll(page)
		await wheelAt(page, PHONE.width / 2, PHONE.height / 2)
		expect(await scrollY(page), 'scrolling must resume once the overlay closes').toBeGreaterThan(
			100,
		)
	})
})
