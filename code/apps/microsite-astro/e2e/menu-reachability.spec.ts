/**
 * Every control in the mobile menu is reachable — F58.
 *
 * On a landscape phone the sheet is taller than the viewport and four
 * controls sit below the fold with no way to reach them: the search trigger
 * and all three theme-cycle buttons, at bottom 386-390 against an
 * innerHeight of 375.
 *
 * The row named "no overflow-y-auto and no min-h-0". Measured, the dialog
 * DOES compute `overflow-y: auto` — and it cannot help, because the panel
 * inside it is `position: fixed` and therefore outside the dialog's scroll
 * flow entirely. That is why `scrollHeight === clientHeight === 375` while
 * its own children overflow. The scroller has to be the panel itself.
 *
 * The row's own correction is confirmed here rather than taken on trust:
 * "any viewport height below 457px" does not hold. Portrait 375x667 strands
 * nothing. The landscape case is the reproducible one, and the portrait
 * cases are kept as controls so a fix that simply hid controls would fail.
 */

import { expect, test } from './helpers/fixtures'

const LANDSCAPE = { width: 667, height: 375 }
const PORTRAIT = { width: 375, height: 667 }

type Probe = {
	focusables: number
	stranded: Array<{ label: string; bottom: number }>
	panelScrolls: boolean
	innerH: number
}

async function openMenuAndProbe(page: import('@playwright/test').Page): Promise<Probe> {
	await page.goto('/about')
	await page.waitForTimeout(1200)
	await page.getByRole('button', { name: /open menu/i }).click()
	await page.waitForTimeout(600)

	return page.evaluate(() => {
		const dlg = document.getElementById('dispatch-mobile-menu') as HTMLElement
		const sel = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
		const focusables = [...dlg.querySelectorAll(sel)] as HTMLElement[]
		const stranded = focusables
			.filter((e) => e.getBoundingClientRect().bottom > window.innerHeight + 1)
			.map((e) => ({
				label: (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30),
				bottom: Math.round(e.getBoundingClientRect().bottom),
			}))
		// Whatever holds the controls must be able to scroll to them.
		const panelScrolls = [dlg, ...dlg.querySelectorAll('*')].some((e) => {
			const cs = getComputedStyle(e)
			return /auto|scroll/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 2
		})
		return { focusables: focusables.length, stranded, panelScrolls, innerH: window.innerHeight }
	})
}

test.describe('F58 — the mobile menu on a short viewport', () => {
	test('a landscape phone can reach every control', async ({ page }) => {
		await page.setViewportSize(LANDSCAPE)
		const r = await openMenuAndProbe(page)

		// Cannot pass vacuously: the sheet must actually carry controls, and a
		// fix that deleted them would fail here rather than go green.
		expect(r.focusables, 'the sheet must contain its controls').toBeGreaterThanOrEqual(9)

		if (r.stranded.length > 0) {
			// Below the fold is acceptable ONLY if something can scroll to it.
			expect(
				r.panelScrolls,
				`controls sit below the fold (${JSON.stringify(r.stranded)}) and nothing scrolls to them`,
			).toBe(true)
		}
	})

	test('every control is reachable by keyboard on a landscape phone', async ({ page }) => {
		await page.setViewportSize(LANDSCAPE)
		await openMenuAndProbe(page)

		// Tab through the trap and require each stop to land inside the viewport
		// once focus-scroll has done its work. A control the browser cannot
		// bring on screen is not reachable, whatever the tab order says.
		const offscreen: string[] = []
		for (let i = 0; i < 12; i++) {
			await page.keyboard.press('Tab')
			const info = await page.evaluate(() => {
				const el = document.activeElement as HTMLElement | null
				if (!el || el === document.body) return null
				const r = el.getBoundingClientRect()
				return {
					label: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30),
					onScreen: r.top >= -1 && r.bottom <= window.innerHeight + 1,
				}
			})
			if (info && !info.onScreen) offscreen.push(info.label)
		}
		expect(offscreen).toEqual([])
	})

	test('control — a portrait phone strands nothing in the first place', async ({ page }) => {
		await page.setViewportSize(PORTRAIT)
		const r = await openMenuAndProbe(page)
		expect(r.focusables).toBeGreaterThanOrEqual(9)
		expect(r.stranded, 'portrait was never the failing case; the row said so and it holds').toEqual(
			[],
		)
	})
})
