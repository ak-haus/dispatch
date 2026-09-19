/**
 * Share metadata (Golden Board B18 · F36).
 *
 * Pins the head every scraper reads — description, canonical, the Open
 * Graph + Twitter card, the feed link, and on dispatches the article fields
 * and Article JSON-LD — plus the feed and the card images themselves.
 *
 * The oracle is the page itself, not the share module: a dispatch's head
 * must say what its visible page says (h1 = title, the dek under it, the
 * <time> in the meta row, the banner's alt), and the feed must agree with
 * both. Every one of those renders from the editorial contract, so a head
 * that drifts from the contract breaks at least one equality here.
 *
 * Scrapers run no JS, so every tag is asserted on the static HTML.
 */

import type { APIRequestContext, Page } from '@playwright/test'
import { expect, test } from './helpers/fixtures'

const ORIGIN = 'https://dispatchmag.dev'

/** The site routes and the one URL each is served at in production (vercel.json trailingSlash: false). */
const SITE_ROUTES: Record<string, string> = {
	'/': `${ORIGIN}/`,
	'/about/': `${ORIGIN}/about`,
	'/article/': `${ORIGIN}/article`,
	'/wire/': `${ORIGIN}/wire`,
	'/sitemap/': `${ORIGIN}/sitemap`,
}

const CARD_WIDTH = 1200
const CARD_HEIGHT = 630
/** WhatsApp's practical ceiling; its documented one is 600 KB. */
const CARD_MAX_BYTES = 300 * 1024

async function dispatchPaths(request: APIRequestContext): Promise<string[]> {
	const res = await request.get('/sitemap-0.xml')
	expect(res.ok()).toBe(true)
	const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
		.map((m) => new URL(m[1]).pathname)
		.filter((p) => p.startsWith('/dispatch/'))
	expect(paths.length, 'sitemap must list the dispatches').toBeGreaterThan(0)
	return paths
}

async function meta(page: Page, key: string): Promise<string | null> {
	const attr = key.startsWith('og:') || key.startsWith('article:') ? 'property' : 'name'
	const el = page.locator(`head meta[${attr}="${key}"]`)
	await expect(el, `exactly one ${key}`).toHaveCount(1)
	return el.getAttribute('content')
}

async function canonical(page: Page): Promise<string | null> {
	const links = page.locator('head link[rel="canonical"]')
	const count = await links.count()
	expect(count, 'at most one canonical').toBeLessThanOrEqual(1)
	return count === 0 ? null : links.first().getAttribute('href')
}

/** A local path for an absolute production URL — the e2e network law keeps every request on localhost. */
function local(url: string): string {
	expect(url.startsWith(`${ORIGIN}/`), `${url} is absolute on the production origin`).toBe(true)
	return url.slice(ORIGIN.length)
}

/** Width × height from a baseline or progressive JPEG's SOF marker. */
function jpegSize(bytes: Buffer): { width: number; height: number } {
	expect(bytes.subarray(0, 2).toString('hex'), 'JPEG SOI marker').toBe('ffd8')
	let i = 2
	while (i < bytes.length) {
		if (bytes[i] !== 0xff) {
			i++
			continue
		}
		const marker = bytes[i + 1]
		if (marker >= 0xc0 && marker <= 0xc2) return { height: bytes.readUInt16BE(i + 5), width: bytes.readUInt16BE(i + 7) }
		i += 2 + bytes.readUInt16BE(i + 2)
	}
	throw new Error('no SOF marker')
}

/** The card and feed link every route carries, checked the same way everywhere. */
async function expectCard(page: Page, request: APIRequestContext, title: string, description: string) {
	expect(await meta(page, 'description')).toBe(description)
	expect(await meta(page, 'og:site_name')).toBe('DISpatch')
	expect(await meta(page, 'og:title')).toBe(title)
	expect(await meta(page, 'og:description')).toBe(description)
	expect(await meta(page, 'twitter:card')).toBe('summary_large_image')
	expect(await meta(page, 'twitter:title')).toBe(title)
	expect(await meta(page, 'twitter:description')).toBe(description)

	const image = (await meta(page, 'og:image')) ?? ''
	expect(await meta(page, 'twitter:image')).toBe(image)
	expect(await meta(page, 'og:image:type')).toBe('image/jpeg')
	expect(await meta(page, 'og:image:width')).toBe(String(CARD_WIDTH))
	expect(await meta(page, 'og:image:height')).toBe(String(CARD_HEIGHT))
	const alt = await meta(page, 'og:image:alt')
	expect(alt).toBeTruthy()
	expect(await meta(page, 'twitter:image:alt')).toBe(alt)

	// The image the tags name is really there.
	const res = await request.get(local(image))
	expect(res.status(), `${image} is served`).toBe(200)

	const feed = page.locator('head link[rel="alternate"][type="application/rss+xml"]')
	await expect(feed).toHaveCount(1)
	expect(await feed.getAttribute('href')).toBe(`${ORIGIN}/rss.xml`)
	return { image, alt }
}

test.describe('site routes', () => {
	for (const [path, url] of Object.entries(SITE_ROUTES)) {
		test(`${path} carries description, a self-canonical and a card`, async ({ page, request }) => {
			const response = await page.goto(path)
			expect(response?.status()).toBe(200)

			// og:title is the page's own title without the brand suffix the <title> adds.
			const title = (await page.title()).replace(/ — DISpatch$/, '')
			const description = (await meta(page, 'description')) ?? ''
			expect(description.length, 'an authored description').toBeGreaterThan(0)

			expect(await canonical(page)).toBe(url)
			expect(await meta(page, 'og:url')).toBe(url)
			expect(await meta(page, 'og:type')).toBe('website')
			await expect(page.locator('head meta[property="article:published_time"]')).toHaveCount(0)
			await expect(page.locator('head script[type="application/ld+json"]')).toHaveCount(0)

			const { image } = await expectCard(page, request, title, description)
			expect(image).toBe(`${ORIGIN}/og/site.jpg`)
		})
	}
})

test('every dispatch says in its head what its page says', async ({ page, request }) => {
	for (const path of await dispatchPaths(request)) {
		const response = await page.goto(path)
		expect(response?.status()).toBe(200)
		const id = path.split('/').filter(Boolean).pop()
		const url = `${ORIGIN}/dispatch/${id}`

		// The visible page, rendered from the contract.
		const title = ((await page.locator('h1').first().textContent()) ?? '').trim()
		const dek = ((await page.locator('h1 + p').first().textContent()) ?? '').trim()
		const published = await page.locator('time[datetime]').first().getAttribute('datetime')
		expect(title.length).toBeGreaterThan(0)
		expect(dek.length).toBeGreaterThan(0)

		expect(await canonical(page), path).toBe(url)
		expect(await meta(page, 'og:url')).toBe(url)
		expect(await meta(page, 'og:type')).toBe('article')
		expect(await meta(page, 'article:published_time')).toBe(published)

		const { image, alt } = await expectCard(page, request, title, dek)
		expect(image).toBe(`${ORIGIN}/og/${id}.jpg`)
		// The card's alt is the one the page gives the same plate.
		expect(await page.locator('aside img').first().getAttribute('alt')).toBe(alt)

		const ld = page.locator('head script[type="application/ld+json"]')
		await expect(ld).toHaveCount(1)
		const data = JSON.parse((await ld.textContent()) ?? '{}')
		expect(data).toEqual({
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: title,
			description: dek,
			datePublished: published,
			image: [image],
			url,
		})
	}
})

test('pages without an address of their own name no canonical', async ({ page }) => {
	// The 404 is served at every unknown address: no canonical, no og:url, but still a card.
	const notFound = await page.goto('/this-dispatch-does-not-exist/')
	expect(notFound?.status()).toBe(404)
	expect(await canonical(page)).toBeNull()
	await expect(page.locator('head meta[property="og:url"]')).toHaveCount(0)
	expect(await meta(page, 'og:title')).toBe('Not in print')
	expect(await meta(page, 'og:image')).toBe(`${ORIGIN}/og/site.jpg`)

	// noindex proving grounds: a canonical beside noindex is a mixed signal.
	for (const path of ['/preview/figure/', '/preview/tokens/']) {
		await page.goto(path)
		expect(await meta(page, 'robots')).toBe('noindex, nofollow')
		expect(await canonical(page), path).toBeNull()
		expect(await meta(page, 'description')).toBeTruthy()
		expect(await meta(page, 'og:image')).toBe(`${ORIGIN}/og/site.jpg`)
	}
})

test('every card is a 1200×630 JPEG under 300 KB', async ({ request }) => {
	const slugs = ['site', ...(await dispatchPaths(request)).map((p) => p.split('/').filter(Boolean).pop())]
	for (const slug of slugs) {
		const res = await request.get(`/og/${slug}.jpg`)
		expect(res.status(), slug).toBe(200)
		const bytes = await res.body()
		expect(jpegSize(bytes), slug).toEqual({ width: CARD_WIDTH, height: CARD_HEIGHT })
		expect(bytes.length, `${slug} bytes`).toBeLessThan(CARD_MAX_BYTES)
	}
})

test('the feed lists every dispatch, newest first, as the pages describe them', async ({ page, request }) => {
	const res = await request.get('/rss.xml')
	expect(res.status()).toBe(200)
	const xml = await res.text()
	expect(xml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/)
	expect(xml).toContain('<rss version="2.0"')
	expect(xml).toContain('xmlns:dc="http://purl.org/dc/elements/1.1/"')
	expect(xml).toContain(`<atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml"/>`)
	// RSS 2.0 <author> must be an e-mail address; the byline rides dc:creator instead.
	expect(xml).not.toContain('<author>')

	const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
		const field = (tag: string) => m[1].match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))?.[1] ?? ''
		return {
			title: field('title'),
			link: field('link'),
			description: field('description'),
			pubDate: field('pubDate'),
			creator: field('dc:creator'),
		}
	})
	const paths = await dispatchPaths(request)
	expect(items.length).toBe(paths.length)

	const dates = items.map((item) => Date.parse(item.pubDate))
	expect(dates).toEqual([...dates].sort((a, b) => b - a))

	const unescape = (s: string) =>
		s.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
	for (const item of items) {
		expect(item.link).toMatch(/^https:\/\/dispatchmag\.dev\/dispatch\/[^/]+$/)
		expect(item.creator.length).toBeGreaterThan(0)
		await page.goto(local(item.link))
		expect(unescape(item.title)).toBe(await meta(page, 'og:title'))
		expect(unescape(item.description)).toBe(await meta(page, 'description'))
		expect(new Date(item.pubDate).toISOString()).toBe(await meta(page, 'article:published_time'))
	}
})
