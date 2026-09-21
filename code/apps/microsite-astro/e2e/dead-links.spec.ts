/**
 * No fabricated destinations — F57.
 *
 * Two shapes of the same defect: a route that does not exist, and an in-page
 * anchor whose target id does not exist. Both were shipped as real-looking
 * affordances — the Atlas's primary call to action ("Step inside the editorial
 * district") pointed at `/dispatch`, which 404s, and the home page carried
 * seven dead anchors reading "VIEW ON LINKEDIN →", "SUBSCRIBE →" and the like.
 *
 * This contradicts the authoring contract in `src/content.config.ts` — "never
 * invent placeholder URLs" — by turning "no URL" into a dead link. The repair
 * is the HTML standard's own answer: an `<a>` with no `href` "represents a
 * placeholder for where a link might otherwise have been placed". It keeps the
 * label, drops the navigation, and leaves the tab order.
 *
 * Measured against the unfixed build, and the counts here are the measurement,
 * not the filing: `/dispatch` 404, and 7 dead anchors on `/` of which 7 — not
 * the 2 originally filed — were tabbable.
 *
 * The sweep cannot pass vacuously: it asserts it found links to check at all,
 * and it proves the 200-detector by checking a route that is known to exist.
 */

import { expect, test } from './helpers/fixtures'

const ROUTES = ['/', '/about', '/article', '/wire', '/sitemap', '/dispatch/dispatch-01', '/404']

test('every in-page anchor resolves to an element that exists', async ({ page }) => {
	const offenders: Array<{ route: string; href: string; text: string }> = []
	let checked = 0

	for (const route of ROUTES) {
		await page.goto(route)
		await page.waitForTimeout(1200)
		const found = await page.evaluate(() => {
			const anchors = [...document.querySelectorAll('a[href^="#"]')]
			return anchors
				.map((a) => ({ href: a.getAttribute('href') ?? '', text: (a.textContent ?? '').trim() }))
				.filter((a) => a.href && a.href !== '#')
				.map((a) => ({ ...a, alive: !!document.getElementById(a.href.slice(1)) }))
		})
		checked += found.length
		for (const f of found) {
			if (!f.alive) offenders.push({ route, href: f.href, text: f.text.slice(0, 40) })
		}
	}

	expect(checked, 'the sweep must find in-page anchors at all').toBeGreaterThan(0)
	expect(offenders).toEqual([])
})

test('no element is a tab stop that navigates nowhere', async ({ page }) => {
	await page.goto('/')
	await page.waitForTimeout(1500)
	const tabbableDead = await page.evaluate(() =>
		[...document.querySelectorAll('a[href^="#"]')]
			.filter((a) => {
				const h = a.getAttribute('href')
				return h && h !== '#' && !document.getElementById(h.slice(1))
			})
			.filter((a) => (a as HTMLElement).tabIndex >= 0)
			.map((a) => ({ href: a.getAttribute('href'), text: (a.textContent ?? '').trim().slice(0, 40) })),
	)
	expect(tabbableDead).toEqual([])
})

test('every local route linked from the site returns 200', async ({ page }) => {
	const targets = new Set<string>()
	for (const route of ROUTES) {
		await page.goto(route)
		await page.waitForTimeout(1200)
		for (const href of await page.evaluate(() =>
			[...document.querySelectorAll('[href]')].map((e) => e.getAttribute('href') ?? ''),
		)) {
			if (href.startsWith('/') && !href.startsWith('//')) targets.add(href.split('#')[0] || '/')
		}
	}
	expect(targets.size, 'the sweep must find local targets at all').toBeGreaterThan(5)

	// Prove the detector: a route that exists must read 200, so a suite-wide
	// failure to reach the server cannot masquerade as "everything passes".
	expect((await page.request.get('/about')).status()).toBe(200)

	const broken: Array<[string, number]> = []
	for (const t of [...targets].sort()) {
		const status = (await page.request.get(t)).status()
		if (status !== 200) broken.push([t, status])
	}
	expect(broken).toEqual([])
})

/*
 * The Atlas zone data itself, checked at the source. Its markers navigate by
 * `window.location.href = zone.href`, so a broken zone href never appears as
 * an <a> for the sweep above to catch — the CTA and the marker are the same
 * defect and only one of them is a link.
 */
test('every Atlas zone and entry destination exists', async ({ page }) => {
	await page.goto('/sitemap')
	await page.waitForTimeout(1500)

	const hrefs = await page.evaluate(() =>
		[...document.querySelectorAll('[data-atlas-href]')].map((e) =>
			e.getAttribute('data-atlas-href'),
		),
	)
	expect(hrefs.length, 'the Atlas must expose its destinations to be checkable').toBeGreaterThan(0)

	const broken: Array<[string, number]> = []
	for (const h of hrefs) {
		if (!h || !h.startsWith('/')) continue
		const path = h.split('#')[0] || '/'
		const status = (await page.request.get(path)).status()
		if (status !== 200) broken.push([h, status])
	}
	expect(broken).toEqual([])
})
