/**
 * Journey: the public routes the axe floor could not see, and the one STATE
 * it could not reach (Golden Board F54).
 *
 * WHY THIS FILE EXISTS. Until now the suite scanned `/`, `/wire`, a
 * `/dispatch/<slug>` article, `/404` and `/preview/figure`. Three public,
 * indexed routes were scanned by nothing — `/article` (the reading room),
 * `/sitemap` (the atlas) and `/about` — and no scan had ever run against the
 * masthead menu while it was OPEN.
 *
 * The gap was route and state, never width. F48 filed it as a width problem;
 * the C1 bash measured a 320/375 sweep of every route and came back
 * byte-identical, which is what corrected the axis into F54. The widths below
 * are therefore not a hunt for width-specific defects — they are the
 * acceptance criterion for the two routes that were failing AA, pinned at the
 * desktop and phone ends so a future regression cannot hide at either.
 *
 * WHAT THE COVERAGE IMMEDIATELY FOUND, all fixed in the same build as this
 * file (a coverage gap and the defects it hid must clear together, or landing
 * the coverage alone just turns the suite red on arrival):
 *
 *   - F53 — `/article` carried 10 nodes and `/sitemap` 1 at the editorial
 *     lane pigment, 4.25:1 and 4.02:1, because a DISPLAY token was carrying
 *     12–15px bold text. Fixed by a role-scoped `--lane-editorial-label`
 *     sibling (AK's ruling, 2026-09-20); per-node math lives in
 *     packages/tokens/__tests__/contrast.test.mjs.
 *   - `video-caption` — the reading room's synthesized cover videos are
 *     silent decoration; they are now out of the accessibility tree, which is
 *     both the determinate answer and the honest one.
 *   - `aria-hidden-focus` — see the open-menu test at the bottom.
 */

import type { Page } from '@playwright/test'
import { expect, test } from './helpers/fixtures'
import { expectNoAxeViolations } from './helpers/axe'

/**
 * The three routes nothing scanned, at both ends of the range.
 *
 * Each carries its own proof-of-render, because a clean scan of an empty
 * shell is worth nothing and the three shells differ. `/sitemap` deliberately
 * has no `<h1>` — its atlas opens at `<h3>` — so it is proved by its index
 * rail instead. (That heading structure is a real finding this coverage
 * surfaced, but `page-has-heading-one` and `heading-order` are axe
 * BEST-PRACTICE rules, outside the WCAG tag set this floor asserts, so it is
 * filed as F69 rather than fixed here.)
 */
const UNSCANNED_ROUTES = [
	{ path: '/article', name: 'the reading room', rendered: (p: Page) => p.getByRole('heading', { level: 1 }).first() },
	{ path: '/sitemap', name: 'the atlas', rendered: (p: Page) => p.locator('ol li button').first() },
	{ path: '/about', name: 'about', rendered: (p: Page) => p.getByRole('heading', { level: 1 }).first() },
] as const

const WIDTHS = [
	{ width: 1280, height: 900, label: 'desktop' },
	{ width: 375, height: 812, label: 'phone' },
] as const

for (const route of UNSCANNED_ROUTES) {
	for (const vp of WIDTHS) {
		test(`${route.path} holds the axe WCAG floor at ${vp.width}px (${vp.label}) — F54`, async ({
			page,
		}, testInfo) => {
			await page.setViewportSize({ width: vp.width, height: vp.height })
			const response = await page.goto(route.path)
			expect(response?.status(), `${route.path} must be a real public route`).toBe(200)
			// Prove the page actually rendered before trusting a clean scan: an
			// empty shell scans clean and means nothing.
			await expect(route.rendered(page), `${route.path} did not render ${route.name}`).toBeVisible()
			await expectNoAxeViolations(page, testInfo)
		})
	}
}

/**
 * The masthead menu, OPEN — the state no scan had ever reached.
 *
 * WHAT WAS WRONG. The sheet was a Radix Dialog. Radix marks the background
 * with `aria-hidden` (via the aria-hidden package's `hideOthers`) and never
 * sets `inert`, so axe answered `aria-hidden-focus` INCOMPLETE on five nodes:
 * three background containers that still held focusable children, plus
 * Radix's own two `tabindex="0"` focus guards. That rule is in neither of the
 * helper's allowance lists and could not be added to one — it catches real
 * defects, and ADR-0004 forbids blanket grandfathering. axe reads the static
 * DOM and cannot see a runtime focus trap, so no amount of correct JavaScript
 * would have resolved it. The markup was the question.
 *
 * THE FIX. A native `<dialog>` opened with `showModal()`, the pattern
 * SearchPalette and ChapterRail already use in this repo — both of which
 * scan fully determinate with their sheets open. Per the HTML standard, while
 * a modal dialog is open every node in the document except the dialog and its
 * descendants "must become inert", and inert nodes "cannot be focused" and
 * are not exposed "to accessibility APIs or assistive technologies". The trap
 * comes from the platform, so the guards are gone and axe answers definitely.
 *
 * The assertions below exist so a clean scan can never be VACUOUS — a scan of
 * a sheet that silently failed to open would also report zero violations.
 * The focus-steal probe is B27's oracle: Chromium's Tab cycle passes through
 * <body> as a wrap marker, so "focus stays inside" is not provable by tabbing;
 * a programmatic .focus() that cannot take focus out of the modal is.
 */
test('the masthead menu holds the axe floor while OPEN, and its modality is the platform’s — F54', async ({
	page,
}, testInfo) => {
	await page.setViewportSize({ width: 375, height: 812 })
	await page.goto('/about')

	const sheet = page.locator('#dispatch-mobile-menu')
	await expect(sheet, 'the sheet must be a native <dialog>').toHaveJSProperty('tagName', 'DIALOG')
	expect(await sheet.evaluate((d: HTMLDialogElement) => d.open), 'closed before the click').toBe(false)

	await page.getByRole('button', { name: /open menu/i }).click()
	await expect(sheet).toBeVisible()

	// NOT VACUOUS, part 1: really open, really modal, really populated.
	const state = await sheet.evaluate((d: HTMLDialogElement) => ({
		open: d.open,
		// :modal matches only for a dialog in the top layer via showModal() —
		// .show() would leave this false, and grants no inertness.
		modal: d.matches(':modal'),
		navLinks: d.querySelectorAll('a[href]').length,
		radixGuards: document.querySelectorAll('[data-radix-focus-guard]').length,
	}))
	expect(state.open, 'the sheet must be open').toBe(true)
	expect(state.modal, 'the sheet must be opened with showModal(); .show() grants no inertness').toBe(
		true,
	)
	expect(state.navLinks, 'an empty sheet would scan clean and prove nothing').toBeGreaterThan(0)
	expect(state.radixGuards, 'the Radix focus guards were themselves flagged nodes').toBe(0)

	// NOT VACUOUS, part 2: the background is genuinely inert. A programmatic
	// .focus() on masthead chrome must not be able to take focus out.
	const escaped = await page.evaluate(() => {
		const outside = document.querySelector<HTMLElement>('header a[href], header button')
		if (!outside) return 'no background control to steal with'
		outside.focus()
		const sheetEl = document.querySelector('#dispatch-mobile-menu')
		return sheetEl?.contains(document.activeElement) ? null : 'focus escaped the modal'
	})
	expect(escaped, 'focus must not be reachable outside an open modal').toBeNull()

	await expectNoAxeViolations(page, testInfo)
})
