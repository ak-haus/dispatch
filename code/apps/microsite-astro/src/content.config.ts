import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const dlds = z.enum(['Human-led', 'Hybrid', 'AI-led'])

/* ─── Crossfire surface schema ──────────────────────────────────────────
 * One story → N platform surfaces. Each surface block describes how the
 * dispatch shipped to a given destination (the magazine, newsletter, LI,
 * Hashnode, Dev.to, IG). Editor owns this entirely from frontmatter; the
 * CrossfireSpread renders dynamically.
 *
 * Per spec 2026-05-13:
 *   - 1–6 surfaces. Order in array = display order on the deck.
 *   - `media` is required (the asset that shows on the card body).
 *   - `engagement` is optional. If absent, the metrics row is hidden.
 *     If present, missing individual metrics fall back to render defaults
 *     so visual identity is preserved during the data migration.
 *   - `url` is required for external platforms (linkedin/hashnode/dev/
 *     instagram); optional for dispatch (auto-derives from entry id)
 *     and newsletter (renders as email mockup).
 * ───────────────────────────────────────────────────────────────────── */

const mediaKind = z.enum(['image', 'video', 'audio'])

const mediaAsset = z.object({
	kind: mediaKind,
	src: z.string().min(1),
	poster: z.string().optional(),
	alt: z.string().optional(),
	caption: z.string().optional(),
})

const surfaceKind = z.enum([
	'dispatch',
	'newsletter',
	'linkedin',
	'hashnode',
	'dev',
	'instagram',
])

const engagement = z.object({
	likes: z.number().int().nonnegative().optional(),
	comments: z.number().int().nonnegative().optional(),
	reposts: z.number().int().nonnegative().optional(),
	bookmarks: z.number().int().nonnegative().optional(),
	reactions: z.number().int().nonnegative().optional(),
})

const crossfireSurface = z.object({
	kind: surfaceKind,
	url: z.string().optional(),
	handle: z.string().optional(),
	excerpt: z.string().optional(),
	caption: z.string().optional(),
	tags: z.array(z.string()).max(8).optional(),
	issueNumber: z.number().int().positive().optional(),
	subject: z.string().optional(),
	sentTo: z.number().int().nonnegative().optional(),
	engagement: engagement.optional(),
	media: mediaAsset,
})

const dispatch = defineCollection({
	// Accepts .md (prose-only) and .mdx (prose + inline components like
	// <PullQuote />, future <Figure />, <MapReveal />). Schema is format-agnostic.
	// Excludes index.md — the cosmology wiki-tools generate per-folder
	// machine-readable index files that aren't article content.
	loader: glob({ pattern: ['**/*.{md,mdx}', '!**/index.md'], base: './src/content/dispatch' }),
	schema: z.object({
		title: z.string().min(1).max(120),
		kicker: z.string().min(1).max(60),
		dek: z.string().min(1).max(360),
		author: z.object({
			name: z.string().min(1),
			role: z.string().min(1),
			handle: z.string().optional(),
		}),
		date: z.coerce.date(),
		readingTime: z.string().regex(/^\d+\s?min\s?read$/i, {
			message: 'readingTime must look like "4 min read"',
		}),
		provenance: z.object({
			lane: dlds,
			summary: z.string().min(1).max(280),
		}),
		tags: z.array(z.string()).min(1).max(8),
		hero: z
			.object({
				src: z.string(),
				alt: z.string().min(1),
				credit: z.string().optional(),
			})
			.optional(),
		crossfire: z
			.object({
				surfaces: z.array(crossfireSurface).min(1).max(6),
			})
			.optional(),
	}),
})

export const collections = { dispatch }
