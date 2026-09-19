/**
 * The dispatch feed (Golden Board B18) — /rss.xml, RSS 2.0.
 *
 * A summary feed: each item carries the contract's title, dek, date and
 * byline and links to the dispatch, whose scroll-told page is the product.
 * The byline goes in `dc:creator`, never `<author>`: RSS 2.0 requires an
 * e-mail address there, and the contract holds a name. `atom:link rel=self`
 * is the W3C validator's recommendation for a feed that names its own URL.
 */

import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { SITE_DESCRIPTION, SITE_NAME, canonicalUrl, escapeXml, feedUrl } from '@/lib/share/share'

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error('[share] astro.config `site` is required for the feed')
	const entries = await getCollection('dispatch')
	// Newest first; same-day dispatches in reverse id order, so the order is stable.
	entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id))

	return rss({
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		site,
		trailingSlash: false,
		xmlns: {
			atom: 'http://www.w3.org/2005/Atom',
			dc: 'http://purl.org/dc/elements/1.1/',
		},
		customData: `<atom:link href="${escapeXml(feedUrl(site))}" rel="self" type="application/rss+xml"/>`,
		items: entries.map((entry) => ({
			title: entry.data.title,
			description: entry.data.dek,
			pubDate: entry.data.date,
			link: canonicalUrl(site, `/dispatch/${entry.id}`),
			customData: `<dc:creator>${escapeXml(entry.data.author.name)}</dc:creator>`,
		})),
	})
}
