/**
 * Share metadata (Golden Board B18): the one module every head tag, card
 * image, feed item and JSON-LD block derives from, so no two of them can
 * disagree about a URL, a title or an image.
 *
 * Sourcing law. Every editorial value comes from the zod contract in
 * src/content.config.ts (title · dek · author · date · the optional hero) or
 * from a page's own authored props. A field the contract lacks is AK's to
 * add; it is never inferred here. The byline's kind is read from the
 * contract's own disclosure field, `provenance.lane` (OQ-9, ruled
 * 2026-09-19): a Human-led or Hybrid byline is the person who led the work
 * and is typed Person; an AI-led byline is an agent and gets no author claim.
 *
 * Pure: no astro:* or node:* imports, so the unit suite runs it directly.
 * File-system lookups are injected (see ./public-files.ts).
 */

export const SITE_NAME = 'DISpatch'

/** The home page's authored description; also the feed channel's. */
export const SITE_DESCRIPTION =
	"A dev-diary magazine — the first Building in Prime City's Editorial District. Construction dispatches from inside the work."

export const FEED_PATH = '/rss.xml'

/**
 * Card renditions are 1200×630 (1.91:1), the Open Graph large-image size;
 * X centre-crops summary_large_image to 2:1 from it with little loss.
 */
export const CARD = { width: 1200, height: 630 } as const

/** Where a card's pixels come from. */
export type CardSource =
	/** A 1200×630 JPEG built at /og/<slug>.jpg from a file under public/. */
	| { kind: 'rendition'; slug: string; sourceFile: string; alt: string }
	/** A contract `hero.src` that is already an absolute URL; used as given. */
	| { kind: 'remote'; url: string; alt: string }

export type CardRendition = Extract<CardSource, { kind: 'rendition' }>

/**
 * The card for every route that is not a dispatch: the district plate, the
 * homepage cover's own map, with an alt that names what it depicts.
 */
export const SITE_CARD: CardRendition = {
	kind: 'rendition',
	slug: 'site',
	sourceFile: 'cartography/district.webp',
	alt: 'Editorial District',
}

/** The fields of a dispatch entry a card is resolved from. */
export interface CardEntry {
	id: string
	title: string
	hero?: { src: string; alt: string }
}

/** Same probe order as DispatchArticleLayout's banner lookup. */
const PLATE_EXTENSIONS = ['webp', 'jpg', 'png'] as const

const ABSOLUTE_URL = /^https?:\/\//i

/** A dispatch's own cover image, as a page can put it in an `<img>`. */
export interface DispatchCover {
	/** Root-relative path for a file under public/, or the contract's absolute URL. */
	src: string
	alt: string
	/** The file under public/ it came from; absent for a remote hero. */
	file?: string
}

/**
 * A dispatch's own cover: the contract `hero` when set, else the dispatch's
 * banner plate (public/banners/<id>.*, the image its page shows), else
 * NOTHING. It never falls back to someone else's art — the card below may use
 * the site's plate for a link preview, but a page that shows `undefined` here
 * must show the absence, not borrow a cover (F61: the reading room assigned
 * covers by index, so dispatch-04 wore dispatch-02's banner). A local file
 * that does not exist throws, so the build fails rather than ship a 404.
 */
export function dispatchCover(
	entry: CardEntry,
	publicFileExists: (file: string) => boolean,
): DispatchCover | undefined {
	if (entry.hero) {
		if (ABSOLUTE_URL.test(entry.hero.src)) return { src: entry.hero.src, alt: entry.hero.alt }
		const file = entry.hero.src.replace(/^\/+/, '')
		if (!publicFileExists(file)) {
			throw new Error(`[share] ${entry.id}: hero.src "${entry.hero.src}" is not a file under public/`)
		}
		return { src: `/${file}`, alt: entry.hero.alt, file }
	}
	const plate = PLATE_EXTENSIONS.map((ext) => `banners/${entry.id}.${ext}`).find(publicFileExists)
	return plate ? { src: `/${plate}`, alt: `Banner illustration for ${entry.title}`, file: plate } : undefined
}

/**
 * A dispatch's card: its own cover (above) when it has one, else the site
 * card. A link preview must carry an image, which is why this — and only
 * this — falls back to the site's plate.
 */
export function dispatchCard(entry: CardEntry, publicFileExists: (file: string) => boolean): CardSource {
	if (entry.id === SITE_CARD.slug) {
		throw new Error(`[share] dispatch id "${entry.id}" collides with the site card's slug`)
	}
	const cover = dispatchCover(entry, publicFileExists)
	if (!cover) return SITE_CARD
	if (cover.file === undefined) return { kind: 'remote', url: cover.src, alt: cover.alt }
	return { kind: 'rendition', slug: entry.id, sourceFile: cover.file, alt: cover.alt }
}

/** Every rendition the /og/ endpoint must build: the site card plus each dispatch's own. */
export function cardRenditions(
	entries: CardEntry[],
	publicFileExists: (file: string) => boolean,
): CardRendition[] {
	const bySlug = new Map<string, CardRendition>([[SITE_CARD.slug, SITE_CARD]])
	for (const entry of entries) {
		const card = dispatchCard(entry, publicFileExists)
		if (card.kind === 'rendition') bySlug.set(card.slug, card)
	}
	return [...bySlug.values()]
}

/** The absolute image URL a card is published at. */
export function cardImageUrl(site: URL, card: CardSource): string {
	return card.kind === 'remote' ? card.url : new URL(`/og/${card.slug}.jpg`, site).href
}

/**
 * The URL a page is served at. Production serves the no-trailing-slash form
 * (vercel.json `trailingSlash: false`; /foo/ answers 308 → /foo), while the
 * build sees /foo/ (`build.format: 'directory'`), so the slash is stripped
 * everywhere but the root.
 */
export function canonicalUrl(site: URL, pathname: string): string {
	const trimmed = pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '')
	return new URL(trimmed === '' ? '/' : trimmed, site).href
}

export function feedUrl(site: URL): string {
	return new URL(FEED_PATH, site).href
}

/** The contract's provenance lanes (DLDS). */
export type ProvenanceLane = 'Human-led' | 'Hybrid' | 'AI-led'

/**
 * The byline as a schema.org author, or nothing (OQ-9). schema.org types an
 * author as a Person or an Organization; an agent is neither. The lane says
 * who led: Human-led and Hybrid (the canon's human-led-AI-assisted) put a
 * person on the byline, so it is typed Person. AI-led puts the agent there,
 * and Google's guidance on AI content advises against giving AI an author
 * byline, so no author is claimed. The page still discloses the lane.
 */
export function bylineAuthor(name: string, lane: ProvenanceLane): { '@type': 'Person'; name: string } | undefined {
	return lane === 'AI-led' ? undefined : { '@type': 'Person', name }
}

/** The Article JSON-LD for a dispatch. Every value is a contract field or derived from one. */
export function articleJsonLd(input: {
	title: string
	dek: string
	date: Date
	url: string
	image: string
	author: { name: string }
	lane: ProvenanceLane
}): Record<string, unknown> {
	const author = bylineAuthor(input.author.name, input.lane)
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: input.title,
		description: input.dek,
		datePublished: input.date.toISOString(),
		image: [input.image],
		url: input.url,
		...(author ? { author: [author] } : {}),
	}
}

/**
 * JSON for an inline <script type="application/ld+json">. `<` is escaped so
 * no string value can close the script element or open a comment.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
	return JSON.stringify(data).replace(/</g, '\\u003c')
}

/** Text for an XML element body (RSS customData is parsed as XML). */
export function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}
