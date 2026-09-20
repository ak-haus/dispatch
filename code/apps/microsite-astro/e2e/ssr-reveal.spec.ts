/**
 * The SSR reveal fallback — F63 · F66, one root and both triggers.
 *
 * Motion server-renders `initial={{ opacity: 0 }}` as an inline style and only
 * hydration clears it. F63 reaches that state by a FAILED shared chunk (one
 * 404 leaves 16 elements on `/` in the DOM and invisible, `innerText.length`
 * unchanged, no `pageerror`, so Sentry sees nothing); F66 reaches it by a SLOW
 * one, needing no failure at all. `global.css` rescues both with a keyframe,
 * because the animation origin outranks the inline `style` attribute in the
 * cascade — the only mechanism that survives the thing that broke.
 *
 * These pins were watched FAILING against the unfixed build before the
 * fallback landed, and none of them can pass vacuously: each asserts it found
 * marked elements at all, and the chunk-404 case asserts the 404 actually
 * happened.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { expect, test } from './helpers/fixtures'

const DIST = join(process.cwd(), 'dist')
const REVEAL_DEADLINE_MS = 2000

function htmlFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
		e.isDirectory()
			? htmlFiles(join(dir, e.name))
			: e.name.endsWith('.html')
				? [join(dir, e.name)]
				: [],
	)
}

/** Every element whose inline style sets EXACTLY `opacity:0` (never `0.55`). */
function ssrHiddenTags(html: string): string[] {
	const out: string[] = []
	for (const m of html.matchAll(/<([a-zA-Z][\w-]*)\b([^>]*)>/g)) {
		const style = /style="([^"]*)"/.exec(m[2])
		if (!style) continue
		if (!style[1].split(';').some((d) => d.trim() === 'opacity:0')) continue
		out.push(m[0])
	}
	return out
}

/**
 * The completeness guard, mechanical rather than asserted: a new motion island
 * cannot ship server-rendered-invisible without declaring which it is. Every
 * such element either takes the rescue (`data-ssr-reveal`) or opts out by name
 * (`data-ssr-hidden` — ChapterRail's inactive labels, hidden by design and
 * revealed on rail hover). ADR-0004: allowances are named, never blanket.
 */
test('every server-rendered opacity:0 element declares itself', () => {
	const offenders: string[] = []
	let examined = 0
	for (const file of htmlFiles(DIST)) {
		for (const tag of ssrHiddenTags(readFileSync(file, 'utf8'))) {
			examined++
			if (tag.includes('data-ssr-reveal') || tag.includes('data-ssr-hidden')) continue
			offenders.push(`${relative(DIST, file)} :: ${tag.slice(0, 140)}`)
		}
	}
	// Cannot pass vacuously: if the build stops server-rendering hidden state
	// at all, this guard has nothing to guard and should be re-grounded.
	expect(examined).toBeGreaterThan(50)
	expect(offenders).toEqual([])
})

test('both rescues are keyed to the same deadline the cancel uses', () => {
	const css = readFileSync(join(process.cwd(), 'src/styles/global.css'), 'utf8')
	const ts = readFileSync(join(process.cwd(), 'src/lib/motion-ready.ts'), 'utf8')

	// Two rescues read this delay — the SSR reveal and the hero masthead's
	// custom-property route through `!important`. They must not drift apart.
	const delays = [...css.matchAll(/--ssr-reveal-delay,\s*([\d.]+)s\)/g)].map((m) => Number(m[1]))
	expect(delays.length, 'global.css declares the rescue delays').toBe(2)
	expect(new Set(delays).size, 'both rescues share one delay').toBe(1)

	const tsDelay = /SSR_REVEAL_DELAY_MS\s*=\s*(\d+)/.exec(ts)
	expect(tsDelay, 'motion-ready.ts declares the cancel deadline').not.toBeNull()
	// A cancel deadline LONGER than the keyframe delay could remove the
	// animation after it had already revealed content, snapping it back to
	// hidden in front of the reader. They must match.
	expect(Number(tsDelay![1])).toBe(delays[0] * 1000)
	expect(Number(tsDelay![1])).toBe(REVEAL_DEADLINE_MS)
})

function detectInvisibleContent(): string[] {
	const out: string[] = []
	for (const el of Array.from(document.querySelectorAll('body *'))) {
		if (parseFloat(getComputedStyle(el).opacity) > 0.01) continue
		// Count the OUTERMOST hidden node: a zero-opacity ancestor already
		// accounts for everything beneath it.
		let anc = el.parentElement
		let inherited = false
		while (anc && anc !== document.body) {
			if (parseFloat(getComputedStyle(anc).opacity) <= 0.01) {
				inherited = true
				break
			}
			anc = anc.parentElement
		}
		if (inherited) continue
		const text = ((el as HTMLElement).innerText || '').trim().replace(/\s+/g, ' ')
		if (!text) continue
		out.push(`${el.tagName.toLowerCase()}|${text.slice(0, 60)}`)
	}
	return out
}

type Page = import('@playwright/test').Page

async function scrollToBottom(page: Page) {
	await page.evaluate(async () => {
		const step = Math.floor(window.innerHeight * 0.8)
		for (let y = 0; y < document.body.scrollHeight; y += step) {
			window.scrollTo(0, y)
			await new Promise((r) => setTimeout(r, 100))
		}
		window.scrollTo(0, document.body.scrollHeight)
	})
}

/** Invisible-content keys after a full read of the page, detector proven. */
async function invisibleAfterReading(page: Page, route: string, settleMs: number) {
	await page.goto(route, { waitUntil: 'commit' })
	await page.waitForTimeout(settleMs)
	await scrollToBottom(page)
	await page.waitForTimeout(700)

	const found = await page.evaluate(detectInvisibleContent)

	// Detector proof, on THIS run: a real zero-opacity element must be seen.
	await page.evaluate(() => {
		const d = document.createElement('div')
		d.id = '__ssr_canary'
		d.style.opacity = '0'
		d.textContent = 'SSR REVEAL DETECTOR CANARY'
		document.body.appendChild(d)
	})
	const withCanary = await page.evaluate(detectInvisibleContent)
	await page.evaluate(() => document.getElementById('__ssr_canary')?.remove())
	expect(withCanary.length, 'the detector sees a planted invisible element').toBe(found.length + 1)

	return found
}

for (const route of ['/', '/about', '/article', '/wire', '/no-such-page']) {
	test(`F63 — a failed shared chunk leaves no content invisible on ${route}`, async ({ page }) => {
		const control = await invisibleAfterReading(page, route, REVEAL_DEADLINE_MS + 800)

		let blocked = 0
		await page.route('**/_astro/react*.js', async (r) => {
			blocked++
			await r.fulfill({ status: 404, contentType: 'text/plain', body: 'Not Found' })
		})
		const treatment = await invisibleAfterReading(page, route, REVEAL_DEADLINE_MS + 800)

		expect(blocked, 'the shared react chunk was actually 404ed').toBeGreaterThan(0)
		const lost = treatment.filter((k) => !control.includes(k))
		expect(lost, 'content the chunk failure made unreadable').toEqual([])
	})
}

test('F66 — content skimmed past before a slow hydration is still readable', async ({ page }) => {
	// Same root, different trigger: the chunk is merely SLOW. The control
	// performs the identical scroll choreography with no throttling.
	const control = await invisibleAfterReading(page, '/', REVEAL_DEADLINE_MS + 800)

	const HOLD_MS = REVEAL_DEADLINE_MS + 3000
	await page.route('**/_astro/react*.js', async (r) => {
		await new Promise((res) => setTimeout(res, HOLD_MS))
		await r.continue().catch(() => {})
	})
	const treatment = await invisibleAfterReading(page, '/', REVEAL_DEADLINE_MS + 600)

	// The measurement really happened inside the pre-hydration window.
	expect(
		await page.evaluate(() => document.documentElement.hasAttribute('data-motion-ready')),
		'the probe is measuring the pre-hydration window',
	).toBe(false)
	const lost = treatment.filter((k) => !control.includes(k))
	expect(lost, 'content a skimming reader left blank').toEqual([])
})

test('a healthy load cancels the fallback so Motion owns the reveal', async ({ page }) => {
	await page.goto('/')
	await expect
		.poll(() => page.evaluate(() => document.documentElement.hasAttribute('data-motion-ready')), {
			timeout: REVEAL_DEADLINE_MS,
		})
		.toBe(true)
	// The rescue is inert on a healthy load: no marked element is being driven
	// by the fallback keyframe, so the designed choreography is untouched.
	const running = await page.$$eval('[data-ssr-reveal]', (els) =>
		els.filter((el) => getComputedStyle(el).animationName === 'ssr-reveal').length,
	)
	expect(running).toBe(0)
})
