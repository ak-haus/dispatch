import { describe, expect, it } from 'vitest'
import {
	CARD,
	SITE_CARD,
	articleJsonLd,
	bylineAuthor,
	canonicalUrl,
	cardImageUrl,
	cardRenditions,
	dispatchCard,
	dispatchCover,
	escapeXml,
	feedUrl,
	serializeJsonLd,
} from './share'

const site = new URL('https://dispatchmag.dev')
const files = (...present: string[]) => (file: string) => present.includes(file)

describe('canonicalUrl — the served, no-trailing-slash form', () => {
	it('keeps the root as the origin with its slash', () => {
		expect(canonicalUrl(site, '/')).toBe('https://dispatchmag.dev/')
		expect(canonicalUrl(site, '')).toBe('https://dispatchmag.dev/')
	})

	it('strips the trailing slash the directory build format adds', () => {
		expect(canonicalUrl(site, '/about/')).toBe('https://dispatchmag.dev/about')
		expect(canonicalUrl(site, '/dispatch/dispatch-01/')).toBe('https://dispatchmag.dev/dispatch/dispatch-01')
	})

	it('leaves an already-clean path alone and folds index.html', () => {
		expect(canonicalUrl(site, '/wire')).toBe('https://dispatchmag.dev/wire')
		expect(canonicalUrl(site, '/sitemap/index.html')).toBe('https://dispatchmag.dev/sitemap')
	})
})

describe('dispatchCard — contract hero, then the plate, then the site card', () => {
	it("uses the dispatch's banner plate, with the page's own alt", () => {
		const card = dispatchCard({ id: 'dispatch-01', title: 'A Title' }, files('banners/dispatch-01.webp'))
		expect(card).toEqual({
			kind: 'rendition',
			slug: 'dispatch-01',
			sourceFile: 'banners/dispatch-01.webp',
			alt: 'Banner illustration for A Title',
		})
	})

	it('probes plates in the layout order: webp, jpg, png', () => {
		const card = dispatchCard(
			{ id: 'dispatch-09', title: 'T' },
			files('banners/dispatch-09.png', 'banners/dispatch-09.jpg'),
		)
		expect(card.kind === 'rendition' && card.sourceFile).toBe('banners/dispatch-09.jpg')
	})

	it('falls back to the site card when a dispatch has no plate — never a placeholder', () => {
		expect(dispatchCard({ id: 'dispatch-99', title: 'T' }, files())).toBe(SITE_CARD)
	})

	it('prefers a local contract hero over the plate, with the contract alt', () => {
		const card = dispatchCard(
			{ id: 'dispatch-01', title: 'T', hero: { src: '/images/cover.jpg', alt: 'The cover' } },
			files('images/cover.jpg', 'banners/dispatch-01.webp'),
		)
		expect(card).toEqual({ kind: 'rendition', slug: 'dispatch-01', sourceFile: 'images/cover.jpg', alt: 'The cover' })
	})

	it('passes a remote contract hero through as given', () => {
		const card = dispatchCard(
			{ id: 'dispatch-01', title: 'T', hero: { src: 'https://cdn.example.com/c.jpg', alt: 'Remote' } },
			files(),
		)
		expect(card).toEqual({ kind: 'remote', url: 'https://cdn.example.com/c.jpg', alt: 'Remote' })
		expect(cardImageUrl(site, card)).toBe('https://cdn.example.com/c.jpg')
	})

	it('fails the build on a local hero that is not a file, rather than ship a dead og:image', () => {
		expect(() =>
			dispatchCard({ id: 'dispatch-01', title: 'T', hero: { src: '/missing.jpg', alt: 'x' } }, files()),
		).toThrow(/hero\.src "\/missing\.jpg" is not a file under public/)
	})

	it("refuses a dispatch id that would overwrite the site card's image", () => {
		expect(() => dispatchCard({ id: 'site', title: 'T' }, files('banners/site.webp'))).toThrow(/collides/)
	})
})

describe("dispatchCover — a dispatch's own cover, or nothing", () => {
	it("is the dispatch's plate, at a root-relative src with the page's alt", () => {
		expect(dispatchCover({ id: 'dispatch-03', title: 'C' }, files('banners/dispatch-03.webp'))).toEqual({
			src: '/banners/dispatch-03.webp',
			alt: 'Banner illustration for C',
			file: 'banners/dispatch-03.webp',
		})
	})

	it("never borrows another dispatch's plate or the site's — absence is undefined (F61)", () => {
		// Every other plate is present; this dispatch's is not.
		const others = files('banners/dispatch-02.webp', 'banners/dispatch-04.webp', 'cartography/district.webp')
		expect(dispatchCover({ id: 'dispatch-03', title: 'C' }, others)).toBeUndefined()
	})

	it('prefers the contract hero, local or remote', () => {
		expect(
			dispatchCover(
				{ id: 'dispatch-01', title: 'T', hero: { src: '/images/cover.jpg', alt: 'The cover' } },
				files('images/cover.jpg', 'banners/dispatch-01.webp'),
			),
		).toEqual({ src: '/images/cover.jpg', alt: 'The cover', file: 'images/cover.jpg' })
		expect(
			dispatchCover({ id: 'dispatch-01', title: 'T', hero: { src: 'https://cdn.example.com/c.jpg', alt: 'R' } }, files()),
		).toEqual({ src: 'https://cdn.example.com/c.jpg', alt: 'R' })
	})

	it('agrees with the share card for every dispatch that has a cover', () => {
		const present = files('banners/dispatch-01.webp')
		const entry = { id: 'dispatch-01', title: 'A' }
		const card = dispatchCard(entry, present)
		expect(card.kind === 'rendition' && card.sourceFile).toBe(dispatchCover(entry, present)!.file)
	})
})

describe('cardRenditions — what /og/ builds', () => {
	it('builds the site card plus one rendition per dispatch that has its own source', () => {
		const cards = cardRenditions(
			[
				{ id: 'dispatch-01', title: 'A' },
				{ id: 'dispatch-02', title: 'B' },
				{ id: 'dispatch-03', title: 'C', hero: { src: 'https://cdn.example.com/c.jpg', alt: 'r' } },
			],
			files('banners/dispatch-01.webp'),
		)
		expect(cards.map((c) => c.slug)).toEqual(['site', 'dispatch-01'])
	})

	it('publishes renditions at absolute /og/<slug>.jpg URLs', () => {
		expect(cardImageUrl(site, SITE_CARD)).toBe('https://dispatchmag.dev/og/site.jpg')
		expect(CARD).toEqual({ width: 1200, height: 630 })
	})
})

describe('articleJsonLd — contract fields only', () => {
	const base = {
		title: 'Title',
		dek: 'Dek',
		date: new Date('2026-05-12'),
		url: 'https://dispatchmag.dev/dispatch/dispatch-01',
		image: 'https://dispatchmag.dev/og/dispatch-01.jpg',
		author: { name: 'AK Almoumen' },
	}

	it('maps title, dek, date, url, the card image and a person byline', () => {
		expect(articleJsonLd({ ...base, lane: 'Hybrid' })).toEqual({
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: 'Title',
			description: 'Dek',
			datePublished: '2026-05-12T00:00:00.000Z',
			image: ['https://dispatchmag.dev/og/dispatch-01.jpg'],
			url: 'https://dispatchmag.dev/dispatch/dispatch-01',
			author: [{ '@type': 'Person', name: 'AK Almoumen' }],
		})
	})

	it('types Human-led and Hybrid bylines as a Person — a person led the work (OQ-9)', () => {
		expect(bylineAuthor('A Writer', 'Human-led')).toEqual({ '@type': 'Person', name: 'A Writer' })
		expect(bylineAuthor('A Writer', 'Hybrid')).toEqual({ '@type': 'Person', name: 'A Writer' })
	})

	it('claims no author for an AI-led byline — an agent is neither Person nor Organization (OQ-9)', () => {
		expect(bylineAuthor('Claude', 'AI-led')).toBeUndefined()
		expect(articleJsonLd({ ...base, author: { name: 'Claude' }, lane: 'AI-led' })).not.toHaveProperty('author')
	})
})

describe('serializers', () => {
	it('JSON-LD cannot close its script element or open a comment', () => {
		const out = serializeJsonLd({ headline: '</script><script>alert(1)</script><!--' })
		expect(out).not.toContain('<')
		expect(JSON.parse(out)).toEqual({ headline: '</script><script>alert(1)</script><!--' })
	})

	it('XML text escapes the five predefined entities', () => {
		expect(escapeXml(`AK & "Claude" <'ops'>`)).toBe('AK &amp; &quot;Claude&quot; &lt;&apos;ops&apos;&gt;')
	})

	it('the feed URL is absolute', () => {
		expect(feedUrl(site)).toBe('https://dispatchmag.dev/rss.xml')
	})
})
