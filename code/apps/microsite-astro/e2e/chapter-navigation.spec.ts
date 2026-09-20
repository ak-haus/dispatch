/**
 * Chapter navigation across the viewport split (Golden Board F32, AK ruled
 * to build 2026-09-20).
 *
 * WHY THIS FILE EXISTS. ChapterRail ships two forms of the same navigation —
 * the thread-with-dots rail as desktop chrome, the chip/sheet pair as the
 * phone form — and the host mounted the island inside a `hidden lg:block`
 * wrapper, so BOTH were off below lg and the phone form was unreachable at
 * every viewport. Opening that wrapper is a one-class change; keeping it open
 * is what needs an instrument, because nothing else in the suite renders an
 * article narrow enough to see it:
 *
 *   - the e2e project is Desktop Chrome (1280w), so article.spec.ts's axe
 *     floor has only ever scanned the rail;
 *   - the story rail cannot see it either, and not by omission —
 *     @storybook/addon-vitest forces every story to 1200x900
 *     (DEFAULT_VIEWPORT_DIMENSIONS), overriding browser.viewport at every
 *     level, so the story lane's a11y green has NEVER covered the chip or the
 *     sheet (measured at B26, F33).
 *
 * So the chip and the sheet are audited here or nowhere. The desktop half
 * below is not ceremony: the two CSS rules that implement the split are a
 * deliberate PAIR, and the plausible "fix" for a phone with no navigation is
 * to open the rail's own 64rem rule — which would put a 32px sticky rail on a
 * phone. Asserting both directions is what makes that fail loudly.
 *
 * Dialog semantics are asserted against the PLATFORM's behaviour, not against
 * our attributes: showModal() is what grants the focus trap, and a dialog
 * opened with .show() or a div wearing role="dialog" would pass an attribute
 * check and fail the :modal and Tab-walk assertions below.
 */

import { expect, test } from './helpers/fixtures'
import { expectNoAxeViolations, settleMotion } from './helpers/axe'
import { archiveSnapshot } from './helpers/archive'

/** Discovered from the built sitemap rather than hardcoded — AK owns content;
 *  the suite owns the route shape. Local by the file's own convention, as in
 *  article.spec.ts / visual.spec.ts / judge.capture.spec.ts. */
async function firstDispatchPath(request: import('@playwright/test').APIRequestContext): Promise<string> {
	const res = await request.get('/sitemap-0.xml')
	expect(res.ok()).toBe(true)
	const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
		.map((m) => new URL(m[1]).pathname)
		.filter((p) => p.startsWith('/dispatch/'))
	expect(paths.length, 'sitemap must list at least one /dispatch/ article').toBeGreaterThan(0)
	return paths[0]
}

const RAIL = '.prime-chapter-rail'
const CHIP = '.prime-chapter-rail__chip'
const SHEET = '#chapter-rail-sheet'

/** An article whose chapter navigation has actually mounted. The rail only
 *  renders when the dispatch has h2 anchors, so a content change that removed
 *  every heading would otherwise turn these tests green by vacancy. */
async function openArticleWithChapters(
	page: import('@playwright/test').Page,
	request: import('@playwright/test').APIRequestContext,
) {
	await page.goto(await firstDispatchPath(request))
	await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
	await expect(
		page.locator('#chapter-rail'),
		'the discovered article carries no chapter navigation at all — it has no h2 anchors, ' +
			'so this suite would be asserting against an empty page',
	).toHaveCount(1)
	await settleMotion(page)
}

test.describe('chapter navigation — phone', () => {
	test.use({ viewport: { width: 375, height: 812 } })

	test('an article offers the chapter chip, and not the desktop rail', async ({ page, request }, testInfo) => {
		await openArticleWithChapters(page, request)

		await expect(page.locator(CHIP), 'the chapter chip must reach phones (F32)').toBeVisible()
		await expect(page.locator(RAIL), 'the 32px sticky rail is desktop chrome and must stay off a phone').toBeHidden()

		await expect(page.locator(CHIP)).toHaveAttribute('aria-haspopup', 'dialog')
		await expect(page.locator(CHIP)).toHaveAttribute('aria-expanded', 'false')
		await expect(page.locator(CHIP)).toHaveAttribute('aria-controls', 'chapter-rail-sheet')

		// Chromatic archive lane — the chip in situ on a phone. Deliberately the
		// CLOSED state: a dialog opened with showModal() lives in the top layer,
		// which an archived DOM cannot replay (the [open] rules would paint the
		// panel but the ::backdrop would be absent), and a snapshot that renders
		// a state the browser never shows is exactly the wolf the archive law
		// exists to kill. The sheet is evidenced functionally and by axe below,
		// which is a stronger floor than a pixel diff.
		await archiveSnapshot(page, 'article-mobile', testInfo)
	})

	test('the chip opens a real modal sheet, and Escape closes it', async ({ page, request }) => {
		await openArticleWithChapters(page, request)
		const chip = page.locator(CHIP)
		const sheet = page.locator(SHEET)

		await expect(sheet).toBeHidden()
		await chip.click()
		await expect(sheet).toBeVisible()
		await expect(chip).toHaveAttribute('aria-expanded', 'true')

		// Modality from the platform, not from our attributes: showModal() puts
		// the dialog in the top layer and makes everything else inert. .show()
		// sets [open] too and would pass a visibility check — this is what
		// separates them.
		expect(
			await sheet.evaluate((d) => (d as HTMLDialogElement).matches(':modal')),
			'the sheet must be opened with showModal(); .show() grants no focus trap and no inertness',
		).toBe(true)

		await page.keyboard.press('Escape')
		await expect(sheet).toBeHidden()
		await expect(chip).toHaveAttribute('aria-expanded', 'false')
	})

	test('focus is trapped inside the open sheet', async ({ page, request }) => {
		await openArticleWithChapters(page, request)
		await page.locator(CHIP).click()
		await expect(page.locator(SHEET)).toBeVisible()

		const focusables = await page.locator(`${SHEET} a[href], ${SHEET} button`).count()
		expect(focusables, 'a sheet with nothing to focus cannot demonstrate a trap').toBeGreaterThan(1)

		// Walk well past one full cycle so the wrap is exercised repeatedly.
		//
		// MEASURED, not assumed (B27): Chromium's modal cycle is
		// [link 01, link 02, ..., body, close] — tabbing past the last focusable
		// resets the sequential-navigation starting point through <body> before
		// re-entering the dialog. document.body is the WRAP MARKER, not an
		// escape: it is not interactive, everything around it is inert, and the
		// next Tab lands back inside. A naive "always inside" assertion fails on
		// a trap that is working correctly, so the real invariant is: focus never
		// reaches an element OUTSIDE the sheet.
		const stops: string[] = []
		for (let i = 0; i < focusables * 2 + 4; i++) {
			await page.keyboard.press('Tab')
			const stop = await page.evaluate(() => {
				const el = document.activeElement as HTMLElement | null
				if (!el || el === document.body) return { outside: false, wrap: true, id: 'body' }
				return {
					outside: !el.closest('#chapter-rail-sheet'),
					wrap: false,
					id: `${el.tagName.toLowerCase()}:${el.getAttribute('aria-label') ?? el.textContent?.trim().slice(0, 24) ?? ''}`,
				}
			})
			expect(stop.outside, `Tab ${i + 1} escaped the sheet and landed on ${stop.id}`).toBe(false)
			if (!stop.wrap) stops.push(stop.id)
		}
		expect(
			new Set(stops).size,
			'the walk never moved — a trap that pins one element is not a usable trap',
		).toBe(focusables)

		// The guarantee itself, asserted directly rather than inferred from the
		// walk: while the sheet is modal the rest of the document is inert, so
		// even a PROGRAMMATIC focus() on the masthead cannot take focus. This is
		// what separates showModal() from .show() plus a hand-rolled key handler.
		const stolen = await page.evaluate(() => {
			const outside = document.querySelector('header a') as HTMLElement | null
			if (!outside) return { attempted: false, took: false }
			outside.focus()
			return { attempted: true, took: document.activeElement === outside }
		})
		expect(stolen.attempted, 'the masthead link must exist for this to prove anything').toBe(true)
		expect(stolen.took, 'the document outside a modal sheet must be inert').toBe(false)
	})

	test('a chapter link dismisses the sheet and moves the reader', async ({ page, request }) => {
		await openArticleWithChapters(page, request)
		await page.locator(CHIP).click()
		const sheet = page.locator(SHEET)
		await expect(sheet).toBeVisible()

		const before = await page.evaluate(() => window.scrollY)
		// The last chapter, so the jump is unambiguous on any article length.
		await sheet.locator('.prime-chapter-rail__chapters-link').last().click()
		await expect(sheet).toBeHidden()
		await expect
			.poll(() => page.evaluate(() => window.scrollY), {
				message: 'choosing a chapter must actually move the reader down the article',
				timeout: 5_000,
			})
			.toBeGreaterThan(before)
	})

	test('the phone article holds the axe WCAG floor — chip closed and sheet open', async ({
		page,
		request,
	}, testInfo) => {
		await openArticleWithChapters(page, request)
		// Closed: the chip is fixed chrome over the prose at every scroll
		// position, so it is scanned as part of the page, not in isolation.
		await expectNoAxeViolations(page, testInfo)

		// Open: the state the desktop scan can never reach. aria-modal, the
		// labelled dialog, the close control and the chapter list all enter the
		// tree here.
		await page.locator(CHIP).click()
		await expect(page.locator(SHEET)).toBeVisible()
		await expectNoAxeViolations(page, testInfo)
	})
})

test.describe('chapter navigation — desktop', () => {
	test.use({ viewport: { width: 1280, height: 720 } })

	test('an article offers the rail, and not the phone chip', async ({ page, request }) => {
		await openArticleWithChapters(page, request)
		await expect(page.locator(RAIL), 'the thread-with-dots rail is the desktop form').toBeVisible()
		await expect(
			page.locator(CHIP),
			'the chip must not sit on the desktop beside the rail it duplicates — if this fails, ' +
				'someone opened .prime-chapter-rail__mobile own 64rem rule instead of the host wrapper',
		).toBeHidden()
	})
})
