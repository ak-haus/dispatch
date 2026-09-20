/**
 * The reduced-motion floor — F47 · F55, one surface and five breaches.
 *
 * CD5 §2 marks this floor LAUNCH-NON-NEGOTIABLE and WCAG 2.1 SC 2.3.3 is the
 * standard behind it: motion animation triggered by interaction — scrolling
 * included — must be disablable, and W3C WAI's `prefers-reduced-motion`
 * guidance is to remove or replace the motion while KEEPING the content.
 * That last clause is the whole design of these pins: the deck under reduce
 * must still show all six dossiers, and the figure must still be readable.
 *
 * Every pin here carries a CONTROL asserting the same probe finds the
 * animation or behaviour WITHOUT reduce, so none can pass vacuously — a
 * selector that matched nothing would fail the control first. Each was
 * watched FAILING against the unfixed build:
 *   F55(1) 4 of 4 figures at opacity 0 · F47 8 infinite pings on `/` ·
 *   F55(3) 2 on a dispatch route · F55(2) a 5400px pin with rotateX 28° ·
 *   F55(4) hover playing a looping video.
 */

import type { Page } from '@playwright/test'
import { expect, test } from './helpers/fixtures'

/** Past the 2s SSR-reveal deadline, so a healthy load has fully settled. */
const SETTLED_MS = 3000

/**
 * Turn reduced motion ON for this page, and PROVE it took.
 *
 * `test.use({ reducedMotion: 'reduce' })` does NOT reach the page in this
 * suite: the custom `page` fixture layered over `@chromatic-com/playwright`'s
 * base resolves before the option is applied, so the page renders with motion
 * allowed and every assertion below would pass for the wrong reason. Measured
 * 2026-09-20 — the F55(1) pin passed green against a build whose figures were
 * provably at `opacity: 0`. `emulateMedia` is per-page and unambiguous, and
 * the assertion here is what makes a silent regression impossible.
 */
async function gotoReduced(page: Page, route: string): Promise<void> {
	await page.emulateMedia({ reducedMotion: 'reduce' })
	await page.goto(route)
	const on = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
	expect(on, 'reduced-motion emulation must actually reach the page').toBe(true)
}

/** Every running infinite animation, named. Decorative or not. */
async function infiniteAnimations(page: Page): Promise<string[]> {
	return page.evaluate(() => {
		const out: string[] = []
		for (const el of document.querySelectorAll('*')) {
			const cs = getComputedStyle(el)
			if (cs.animationName === 'none') continue
			const names = cs.animationName.split(',').map((s) => s.trim())
			const counts = cs.animationIterationCount.split(',').map((s) => s.trim())
			const durs = cs.animationDuration.split(',').map((s) => s.trim())
			names.forEach((n, i) => {
				if (counts[i % counts.length] === 'infinite' && parseFloat(durs[i % durs.length]) > 0) {
					out.push(n)
				}
			})
		}
		return out
	})
}

async function scrollThrough(page: Page): Promise<void> {
	await page.evaluate(async () => {
		const step = window.innerHeight * 0.8
		for (let y = 0; y < document.body.scrollHeight; y += step) {
			window.scrollTo(0, y)
			await new Promise((r) => setTimeout(r, 60))
		}
		window.scrollTo(0, 0)
	})
}

/* ── F55(1) — content loss: the figure never comes back ──────────────────
 * `ImageWithCaption` server-renders `initial={{opacity:0}}` because
 * `useReducedMotion()` is false on the server; on the client under reduce
 * `initial={false}` tells Motion to treat the DOM as-is, so nothing ever
 * restores it. Build 31's keyframe rescues the FAILED-chunk path only — a
 * healthy hydration cancels it, which is exactly the path measured here.
 * ──────────────────────────────────────────────────────────────────────── */
test.describe('F55(1) — figures survive reduced motion', () => {
	test('every prime-figure is visible on a healthy load under reduce', async ({ page }) => {
		await gotoReduced(page, '/preview/figure')
		await scrollThrough(page)
		await page.waitForTimeout(SETTLED_MS)

		// The rescue must have been CANCELLED — otherwise this could pass for
		// the wrong reason (the keyframe revealing it, not the component).
		const ready = await page.evaluate(() =>
			document.documentElement.hasAttribute('data-motion-ready'),
		)
		expect(ready).toBe(true)

		const figures = await page.evaluate(() =>
			[...document.querySelectorAll('figure.prime-figure')].map(
				(f) => getComputedStyle(f).opacity,
			),
		)
		expect(figures.length).toBeGreaterThan(0) // cannot pass vacuously
		expect(figures.filter((o) => parseFloat(o) < 0.99)).toEqual([])
	})
})

test('F55(1) control — figures are visible with motion allowed', async ({ page }) => {
	await page.goto('/preview/figure')
	await scrollThrough(page)
	await page.waitForTimeout(SETTLED_MS)
	const figures = await page.evaluate(() =>
		[...document.querySelectorAll('figure.prime-figure')].map((f) => getComputedStyle(f).opacity),
	)
	expect(figures.length).toBeGreaterThan(0)
	expect(figures.filter((o) => parseFloat(o) < 0.99)).toEqual([])
})

/* ── F47 + F55(3) — infinite pings ───────────────────────────────────────
 * Eight on `/` (cover + crossfire + DLDS LIVE dots), two on every dispatch
 * route (the article layout's dot and ChapterRail's `__ping`). An endless
 * pulsing ring is neither a static state nor a ≤200ms crossfade.
 * ──────────────────────────────────────────────────────────────────────── */
for (const route of ['/', '/dispatch/dispatch-01']) {
	test.describe(`F47 · F55(3) — no infinite animation under reduce on ${route}`, () => {
		test('nothing loops forever', async ({ page }) => {
			await gotoReduced(page, route)
			await page.waitForTimeout(SETTLED_MS)
			expect(await infiniteAnimations(page)).toEqual([])
		})
	})

	test(`F47 · F55(3) control — ${route} runs infinite animation without reduce`, async ({
		page,
	}) => {
		await page.goto(route)
		await page.waitForTimeout(SETTLED_MS)
		// Proves the probe can see them at all; without this the pin above
		// would pass on a page that simply has no pings left.
		expect((await infiniteAnimations(page)).length).toBeGreaterThan(0)
	})
}

/* ── F55(2) — the GSAP pin and the 3D card flip ──────────────────────────
 * A 5400px pin-spacer — six viewport heights of hijacked scroll — with a
 * rotateX(-28deg) scrub. Under reduce the timeline must not run; and because
 * the six dossiers are absolutely stacked, NOT running it must not bury five
 * of them. Content is kept; only the motion goes.
 * ──────────────────────────────────────────────────────────────────────── */
test.describe('F55(2) — the crossfire deck under reduce', () => {
	test('no pin, no 3D scrub, and all six dossiers readable', async ({ page }) => {
		await gotoReduced(page, '/')
		await scrollThrough(page)
		await page.waitForTimeout(SETTLED_MS)

		const n = await page.locator('.dossier-card').count()
		expect(n).toBeGreaterThan(1) // cannot pass vacuously

		// No ScrollTrigger pin.
		expect(await page.locator('.pin-spacer').count()).toBe(0)

		const boxes = await page.evaluate(() =>
			[...document.querySelectorAll('.dossier-card')].map((c) => {
				const r = c.getBoundingClientRect()
				return {
					h: Math.round(r.height),
					opacity: parseFloat(getComputedStyle(c).opacity),
					is3d: getComputedStyle(c).transform.startsWith('matrix3d'),
				}
			}),
		)
		expect(boxes.filter((b) => b.h < 40)).toEqual([])
		expect(boxes.filter((b) => b.opacity < 0.99)).toEqual([])
		expect(boxes.filter((b) => b.is3d)).toEqual([])

		// The six cards must not all sit on top of each other.
		const tops = await page.evaluate(() =>
			[...document.querySelectorAll('.dossier-card')].map((c) =>
				Math.round(c.getBoundingClientRect().top + window.scrollY),
			),
		)
		expect(new Set(tops).size).toBe(tops.length)
	})
})

test('F55(2) control — the deck DOES pin and flip without reduce', async ({ page }) => {
	await page.goto('/')
	await page.waitForTimeout(1500)
	const pinTop = await page.evaluate(() => {
		const ps = document.querySelector('.pin-spacer')
		return ps ? Math.round(ps.getBoundingClientRect().top + window.scrollY) : null
	})
	expect(pinTop).not.toBeNull()
	const maxRot = await page.evaluate(async (top: number) => {
		let max = 0
		for (let k = 0; k <= 10; k++) {
			window.scrollTo(0, top + k * window.innerHeight * 0.45)
			await new Promise((r) => setTimeout(r, 200))
			for (const c of document.querySelectorAll('.dossier-card')) {
				const t = getComputedStyle(c).transform
				if (!t.startsWith('matrix3d')) continue
				const m = t.slice(9, -1).split(',').map(Number)
				max = Math.max(max, Math.abs((Math.atan2(m[6], m[5]) * 180) / Math.PI))
			}
		}
		return Math.round(max)
	}, pinTop as number)
	expect(maxRot).toBeGreaterThan(20)
})

/* ── F55(4) — hover starts an infinitely looping video ───────────────────── */
test.describe('F55(4) — hover video under reduce', () => {
	test('hovering a card does not start playback', async ({ page }) => {
		await gotoReduced(page, '/article')
		await page.waitForTimeout(1500)
		const videos = page.locator('video')
		const n = await videos.count()
		expect(n).toBeGreaterThan(0) // cannot pass vacuously
		for (let i = 0; i < n; i++) {
			const v = videos.nth(i)
			await v.scrollIntoViewIfNeeded()
			await v.hover({ force: true })
			await page.waitForTimeout(600)
			expect(await v.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)
		}
	})
})

test('F55(4) control — hover DOES start playback without reduce', async ({ page }) => {
	await page.goto('/article')
	await page.waitForTimeout(1500)
	const v = page.locator('video').first()
	await v.scrollIntoViewIfNeeded()
	await v.hover({ force: true })
	await page.waitForTimeout(600)
	expect(await v.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false)
})
