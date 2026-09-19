/**
 * Share-card images (Golden Board B18) — /og/<slug>.jpg, built at build time.
 *
 * Each card is a 1200×630 JPEG rendition of a real plate: a dispatch's own
 * banner (or its contract `hero`), and the district map for every other
 * route. Renditions rather than the raw plates because the plates run from
 * 0.75 to 1.78 aspect and platforms centre-crop to 1.91:1 or 2:1 — a centre
 * crop cuts dispatch-06's cover wordmark in half. `attention` crops to the
 * most salient region instead, so every platform shows the same frame. JPEG
 * because every scraper reads it; mozjpeg q82 keeps every card well under
 * WhatsApp's 600 KB ceiling (the e2e suite pins < 300 KB).
 *
 * `sharp` is called directly: the plates live in public/, which
 * astro:assets does not process.
 */

import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import sharp from 'sharp'
import { CARD, cardRenditions } from '@/lib/share/share'
import { publicFileExists, publicFilePath } from '@/lib/share/public-files'

export const getStaticPaths = (async () => {
	const entries = await getCollection('dispatch')
	const cards = cardRenditions(
		entries.map((entry) => ({ id: entry.id, title: entry.data.title, hero: entry.data.hero })),
		publicFileExists,
	)
	return cards.map((card) => ({ params: { card: card.slug }, props: { sourceFile: card.sourceFile } }))
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
	const jpeg = await sharp(publicFilePath(props.sourceFile as string))
		.resize(CARD.width, CARD.height, { fit: 'cover', position: sharp.strategy.attention })
		.jpeg({ quality: 82, mozjpeg: true })
		.toBuffer()
	return new Response(new Uint8Array(jpeg), { headers: { 'Content-Type': 'image/jpeg' } })
}
