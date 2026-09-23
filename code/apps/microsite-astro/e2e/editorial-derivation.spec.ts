/**
 * No component invents what the editorial contract supplies — F61 (Build 33).
 *
 * One defect class, five surfaces: a component rendering a literal, a list
 * position, the reader's clock or a made-up default where the dispatch itself
 * supplies — or can be read for — the real value. Measured against the unfixed
 * build before anything changed:
 *
 *   - the home featured dispatch-02 while the site's own feed named dispatch-06
 *     the newest (the home sorted by date alone; five dispatches share a day);
 *   - that featured spread quoted dispatch-01's opening sentence, carried an
 *     Editor's note describing dispatch-01, and read "Dispatch No. 06";
 *   - "More dispatches" numbered cards by position (dispatch-03 = "№ 02") and
 *     assigned banners by index (dispatch-03 wore dispatch-02's plate);
 *   - the reading room synthesised covers — a map video on dispatch-02 — and
 *     put dispatch-02's plate on dispatch-04 and dispatch-01;
 *   - six "LIVE" beacons, six "Posted today", a daily-publication card, an
 *     invented sender and blog domain, "AK" avatars beside the byline "Claude";
 *   - a masthead dated by the reader's clock, so the issue re-dated itself daily;
 *   - one datum in two date formats, and a colophon crediting 2 of 6 faces.
 *
 * Every pin reads its truth from where the reader would — the dispatch's own
 * page, the feed, the token source — never from the helpers under test, and
 * every pin first proves its detector can see something, so none passes on a
 * page that simply rendered nothing (F70: assert the precondition inside the
 * pin).
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Page } from '@playwright/test'
import { expect, test } from './helpers/fixtures'

type FeedItem = { path: string; pubDate: Date }

async function readFeed(page: Page): Promise<FeedItem[]> {
	const xml = await (await page.request.get('/rss.xml')).text()
	return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
		path: new URL(/<link>([^<]+)<\/link>/.exec(item!)![1]!).pathname,
		pubDate: new Date(/<pubDate>([^<]+)<\/pubDate>/.exec(item!)![1]!),
	}))
}

/** What a dispatch's own page says about it — the reference every other
 *  surface must agree with. */
async function ownPage(page: Page, path: string) {
	await page.goto(path)
	return page.evaluate(() => {
		const volume = [...document.querySelectorAll('p')].map((p) => p.textContent?.trim() ?? '').find((t) => t.startsWith('Vol. 1 ·'))
		return {
			number: volume ? /Dispatch (\d+)/.exec(volume)?.[1] : undefined,
			date: document.querySelector('time')?.textContent?.trim(),
			banner: document.querySelector('aside[aria-label="Article banner illustration"] img')?.getAttribute('src') ?? null,
			pullQuote: document.querySelector('.prose-dispatch blockquote')?.textContent?.trim(),
		}
	})
}

async function scrollThrough(page: Page): Promise<void> {
	await page.evaluate(async () => {
		for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.8) {
			window.scrollTo(0, y)
			await new Promise((r) => setTimeout(r, 40))
		}
		window.scrollTo(0, 0)
	})
}

const FEATURED = 'section[aria-label="Featured article opening"]'
const MORE = 'section[aria-label="DLDS — more dispatches"]'

test('the home features the newest dispatch — the one its own feed lists first', async ({ page }) => {
	const feed = await readFeed(page)
	// Precondition: the tie the defect lived in actually exists in the content,
	// so this cannot pass merely because every dispatch has its own day.
	const days = feed.map((i) => i.pubDate.toISOString().slice(0, 10))
	expect(new Set(days).size, 'the feed must hold same-day dispatches for the order to matter').toBeLessThan(days.length)

	await page.goto('/')
	const featured = await page.locator(`${FEATURED} a`, { hasText: 'Read the dispatch' }).getAttribute('href')
	expect(featured).toBe(feed[0]!.path)

	// The atlas names a "Latest dispatch" too (it was hardcoded to dispatch-01,
	// the oldest, and dated "today").
	await page.goto('/sitemap')
	const latest = page.locator('li a', { hasText: 'Latest dispatch' })
	await expect(latest).toHaveCount(1)
	expect(await latest.getAttribute('href')).toBe(feed[0]!.path)
})

test("the featured spread's quote, note and number are the featured dispatch's own", async ({ page }) => {
	await page.goto('/')
	await scrollThrough(page)
	const home = await page.evaluate((sel) => {
		const s = document.querySelector(sel)!
		const label = [...s.querySelectorAll('*')].find((e) => e.children.length === 0 && e.textContent?.trim() === 'From the dispatch')
		const note = [...s.querySelectorAll('p')].find((p) => /^Editor's note/i.test(p.textContent?.trim() ?? ''))
		const series = [...s.querySelectorAll('dt')].find((dt) => dt.textContent?.trim() === 'Series')
		return {
			href: s.querySelector('article a')?.getAttribute('href') ?? '',
			quote: label?.nextElementSibling?.textContent?.trim().replace(/^[“"]|[”"]$/g, ''),
			note: note?.nextElementSibling?.textContent?.trim(),
			series: series?.nextElementSibling?.textContent?.trim(),
		}
	}, FEATURED)
	expect(home.href, 'the spread must link its featured dispatch').toMatch(/^\/dispatch\//)

	const own = await ownPage(page, home.href)
	// Detector: the dispatch really pulls a quote and numbers itself, so the
	// comparisons below are between two real values.
	expect(own.pullQuote, 'the featured dispatch must pull a quote on its own page').toBeTruthy()
	expect(own.number).toBeTruthy()
	expect(home.quote).toBe(own.pullQuote)
	expect(home.series).toBe(`Dispatch No. ${own.number}`)

	// The note is the provenance its page discloses (the DLDS hover card). The
	// trigger hydrates `client:idle`, so re-enter it until the card opens.
	const trigger = page.getByRole('button', { name: /^DLDS provenance:/ })
	const disclosure = page.locator('[data-radix-popper-content-wrapper] p').last()
	await expect(async () => {
		await page.mouse.move(0, 0)
		await trigger.hover()
		await expect(disclosure).toBeVisible({ timeout: 1000 })
	}).toPass({ timeout: 15_000 })
	const summary = (await disclosure.textContent())?.trim()
	expect(summary, 'the page must disclose a provenance summary').toBeTruthy()
	expect(home.note).toBe(summary)
})

test('every "More dispatches" card carries its own dispatch\'s number and cover', async ({ page }) => {
	const feed = await readFeed(page)
	await page.goto('/')
	await scrollThrough(page)
	const cards = await page.evaluate((sel) =>
		[...document.querySelectorAll(`${sel} ol > li`)].map((li) => ({
			href: li.querySelector('a')?.getAttribute('href') ?? null,
			folio: li.querySelector('span.absolute.left-3.top-3')?.textContent?.replace(/\s+/g, ' ').trim() ?? null,
			img: li.querySelector('img')?.getAttribute('src') ?? null,
		})),
	MORE)

	// Every dispatch but the featured one, and nothing else — no card for an
	// edition the contract does not hold, and every card leads somewhere.
	expect(cards.length, 'the grid must list the rest of the feed').toBe(feed.length - 1)
	for (const card of cards) {
		expect(card.href, 'a card with no destination describes no dispatch').toBeTruthy()
		const own = await ownPage(page, card.href!)
		expect(own.banner, `${card.href} must have a cover of its own for this to compare`).toBeTruthy()
		expect(card.img, `${card.href}'s card`).toBe(own.banner)
		// The badge's gap is CSS, so its text reads "№05"; compare the characters.
		expect(card.folio?.replace(/\s+/g, ''), `${card.href}'s folio`).toBe(`№${own.number}`)
	}
})

test('every reading-room card shows its own dispatch\'s cover, and claims no media it lacks', async ({ page }) => {
	await page.goto('/article')
	await page.waitForTimeout(1200)
	const cards = await page.evaluate(() =>
		[...document.querySelectorAll('main ol > li')].map((li) => ({
			href: li.querySelector('a')?.getAttribute('href') ?? '',
			img: li.querySelector('img')?.getAttribute('src') ?? null,
			video: li.querySelectorAll('video').length,
			badge: li.querySelector('span.absolute.left-3.top-3')?.textContent?.trim().toLowerCase() ?? null,
		})),
	)
	expect(cards.length, 'the reading room must list dispatches').toBeGreaterThan(0)
	for (const card of cards) {
		const own = await ownPage(page, card.href)
		expect(own.banner, `${card.href} must have a cover of its own for this to compare`).toBeTruthy()
		expect(card.img, `${card.href}'s card`).toBe(own.banner)
		expect(card.video, `${card.href} declares no video`).toBe(0)
		expect(card.badge, `${card.href}'s media badge`).toBe('image')
	}
})

test('nothing on the home claims a liveness, a cadence or an address the contract lacks', async ({ page }) => {
	const html = await (await page.request.get('/')).text()
	await page.goto('/')
	await scrollThrough(page)
	const found = await page.evaluate(() => {
		const deck = document.querySelector('section[aria-label^="Crossfire"]')
		const deckText = (deck as HTMLElement | null)?.innerText ?? ''
		const liveBadges = deck
			? [...deck.querySelectorAll('*')].filter((e) => e.children.length === 0 && /^live$/i.test((e as HTMLElement).innerText?.trim() ?? '')).length
			: -1
		return { deckText, liveBadges, bodyText: document.body.innerText }
	})
	// Detector: the deck rendered and the probe reads its text.
	expect(found.deckText, 'the Crossfire deck must render for this to judge it').toMatch(/One story/i)

	expect(found.liveBadges, 'no surface state is recorded, so no dossier may claim one').toBe(0)
	expect(found.deckText).not.toMatch(/\btoday\b/i)
	for (const invented of [/every day, one story/i, /at sunrise/i, /\btomorrow\b/i, /next edition/i, /in the queue/i, /daily dispatch/i]) {
		expect(found.bodyText, `the home must not promise ${invented}`).not.toMatch(invented)
	}
	// ('@dispatch_prime' is NOT here: it was the invented fallback for authors
	// with no handle, but it is also dispatch-01's real, authored handle.)
	for (const address of ['dispatches@prime.city', 'primecity.hashnode.dev', 'dispatch.prime/dispatch']) {
		expect(html, `nothing may ship the invented "${address}"`).not.toContain(address)
	}
})

test('every depicted avatar is the monogram of the name beside it', async ({ page }) => {
	await page.goto('/')
	await scrollThrough(page)
	const pairs = await page.evaluate(() =>
		[...document.querySelectorAll('.dossier-card .rounded-full')]
			.filter((e) => e.children.length === 0 && /^[\p{Lu}\p{N}]{1,2}$/u.test(e.textContent?.trim() ?? ''))
			.map((avatar) => {
				let anchor: Element | null = avatar
				while (anchor && !anchor.nextElementSibling?.querySelector('p')) anchor = anchor.parentElement
				return { monogram: avatar.textContent!.trim(), name: anchor?.nextElementSibling?.querySelector('p')?.textContent?.trim() ?? '' }
			}),
	)
	expect(pairs.length, 'the deck must depict avatars to judge').toBeGreaterThan(0)
	for (const { monogram, name } of pairs) {
		const expected = name
			.split(/[^\p{L}\p{N}]+/u)
			.filter(Boolean)
			.slice(0, 2)
			.map((w) => w[0]!.toUpperCase())
			.join('')
		expect(monogram, `the avatar beside "${name}"`).toBe(expected)
	}
})

test("the issue is dated by its newest dispatch, not the reader's clock", async ({ page }) => {
	const feed = await readFeed(page)
	const reader = new Date('2031-01-01T12:00:00Z')
	await page.clock.setFixedTime(reader)
	await page.goto('/')
	await page.waitForTimeout(1500)
	// Precondition: the page really runs on the reader's (emulated) clock.
	expect(await page.evaluate(() => new Date().getUTCFullYear())).toBe(2031)

	const long = (d: Date) =>
		new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d)
	const text = await page.evaluate(() => document.body.innerText)
	const cover = await page.locator('section[aria-label^="DISpatch — Volume"]').innerText()
	expect(cover.toLowerCase()).toContain(long(feed[0]!.pubDate).toLowerCase())
	expect(text.toLowerCase(), 'the reader\'s date must appear nowhere').not.toContain(long(reader).toLowerCase())
})

test('a dispatch reads the same date wherever it is listed', async ({ page }) => {
	const feed = await readFeed(page)
	const own = new Map<string, string>()
	for (const { path } of feed) own.set(path, (await ownPage(page, path)).date ?? '')
	expect([...own.values()].every(Boolean), 'every dispatch page must print its date').toBe(true)

	for (const route of ['/', '/article', '/sitemap']) {
		await page.goto(route)
		await scrollThrough(page)
		const listed = await page.evaluate(() =>
			// List entries only: a listing prints its dispatch's date; a call to
			// action (the featured spread's "Read the dispatch") does not.
			[...document.querySelectorAll('li a[href^="/dispatch/"]')].map((a) => ({
				href: a.getAttribute('href')!,
				text: a.closest('li')!.textContent ?? '',
			})),
		)
		const judged = listed.filter((l) => own.has(l.href))
		expect(judged.length, `${route} must list dispatches to judge`).toBeGreaterThan(0)
		for (const { href, text } of judged) expect(text, `${href} on ${route}`).toContain(own.get(href)!)
	}
})

test('the colophon credits every face the type system declares', async ({ page }) => {
	// The DTCG source itself, by its place in the monorepo (the unit suite pins
	// the package export the colophon imports it through).
	const typography = JSON.parse(readFileSync(join(process.cwd(), '../../packages/tokens/src/typography.json'), 'utf8'))
	const faces = [...new Set(Object.values(typography.font.family as Record<string, { $value: string[] }>).map((s) => s.$value[0]!))]
	expect(faces.length, 'the token source must declare faces').toBeGreaterThan(1)

	await page.goto('/')
	const colophon = await page.locator('section[aria-label="Colophon"]').innerText()
	for (const face of faces) expect(colophon, `the colophon must credit ${face}`).toContain(face)
})
