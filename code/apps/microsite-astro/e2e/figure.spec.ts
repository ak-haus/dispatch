/**
 * The figure proving ground (/preview/figure) — the S4 design-intent-to-code
 * lane's render surface (ADR-0003 §Stage 3).
 *
 * The pixel locks for this page live in visual.spec.ts (one pixel floor, one
 * snapshot directory, one baseline factory). What lives here is everything a
 * screenshot cannot assert: that the route actually serves, that the canon
 * variants render the canon SLOTS (a font regression is invisible to a
 * baseline generated after the regression), that the DLDS band's landmark
 * stays uniquely named, and that a shipped route holds the axe WCAG floor
 * like every other.
 */

import { expect, test } from './helpers/fixtures'
import { expectNoAxeViolations, settleMotion } from './helpers/axe'

const PATH = '/preview/figure/'

test('the proving ground serves and renders every canon variant', async ({ page }) => {
	const response = await page.goto(PATH)
	expect(response?.status()).toBe(200)
	for (const kase of ['default', 'meta-terminal', 'cartography-frame', 'photograph']) {
		await expect(page.locator(`[data-figure-case="${kase}"] .prime-figure`)).toBeVisible()
	}
})

test('the proving ground is not advertised to crawlers', async ({ page }) => {
	await page.goto(PATH)
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
		'content',
		'noindex, nofollow',
	)
})

test('each variant renders its canon typography slot', async ({ page }) => {
	await page.goto(PATH)
	await settleMotion(page)
	await page.evaluate(() => document.fonts.ready)

	// The families the four variants are contracted to (CD7 §3.4 + DESIGN.md
	// §Typography). Asserting the FIRST family of the resolved stack catches
	// the failure a pixel baseline cannot: a token that stopped resolving and
	// silently fell through to the next entry.
	const expected: Record<string, string> = {
		default: 'Crimson Pro',
		'meta-terminal': 'JetBrains Mono',
		'cartography-frame': 'IM Fell English',
		photograph: 'Crimson Pro',
	}

	for (const [kase, family] of Object.entries(expected)) {
		const resolved = await page
			.locator(`[data-figure-case="${kase}"] .prime-figure__caption`)
			.evaluate((el) => getComputedStyle(el).fontFamily)
		expect(resolved.split(',')[0].replace(/["']/g, ''), `${kase} caption slot`).toBe(family)
		// And the face must actually be loaded, not merely named — the same
		// shipped-faces law the pixel floor enforces.
		expect(
			await page.evaluate((f) => document.fonts.check(`1em "${f}"`), family),
			`${family} must be loaded, not substituted`,
		).toBe(true)
	}
})

test('the cartography caption takes the page-owned letterpress', async ({ page }) => {
	await page.goto(PATH)
	const caption = page.locator('[data-figure-case="cartography-frame"] .prime-figure__caption')
	await expect(caption).toHaveClass(/dispatch-emboss/)
	// The class is only a promise until the page defines it — global.css is
	// what supplies the rule, and this route must be inside that cascade.
	await expect(caption).toHaveCSS('mix-blend-mode', 'multiply')
})

test('the provenance band keeps a unique landmark name', async ({ page }) => {
	await page.goto(PATH)
	const band = page.locator('[data-figure-case="photograph"] .prime-dlds-panel')
	await expect(band).toHaveAttribute(
		'aria-label',
		'Provenance for Dispatch 02 banner illustration: editorial lane',
	)
})

test('the proving ground holds the axe WCAG floor', async ({ page }, testInfo) => {
	await page.goto(PATH)
	await settleMotion(page)
	await expectNoAxeViolations(page, testInfo)
})
