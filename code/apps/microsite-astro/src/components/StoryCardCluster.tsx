/**
 * StoryCardCluster — homepage article-entry overlay system.
 *
 * Replaces conventional side-by-side article rails with an editorially
 * positioned cluster that floats over the cartographic substrate.
 * Cards are placed in compositional safe zones — they do not cover the
 * DISpatch building marker (~41% left, ~52% top in the hero).
 *
 * Per spec §Homepage Ticket:
 *   "Story cards should feel placed into a world, not pasted onto a flat canvas."
 *   "Hover interactions should add editorial tactility, not product-dashboard flash."
 *
 * Token consumption:
 *   Substrate: --window-warm (elevated surface, warmer than sky-low)
 *   Text:      existing dispatch text role tokens
 *   Lane:      lane pigment dots per DLDS provenance
 *   Border:    lane-institutional-strong at 12% opacity
 */

import { motion } from 'motion/react'

import type { CrossfireSurface } from './home/CrossfireSpread'

export type StoryArticle = {
	id: string
	href: string
	data: {
		title: string
		kicker: string
		dek: string
		readingTime: string
		/** Pre-formatted date string from server (e.g. "2026-05-12"). */
		dateLabel: string
		provenance: {
			lane: 'Human-led' | 'Hybrid' | 'AI-led'
		}
		author: {
			name: string
			role: string
			handle?: string
		}
		/** Crossfire surfaces — optional. When present, the homepage renders
		 *  the Crossfire deck for this dispatch. When absent, the deck hides. */
		crossfire?: {
			surfaces: CrossfireSurface[]
		}
	}
}

export type StoryCardClusterProps = {
	articles: StoryArticle[]
}

const LANE_COLORS: Record<string, string> = {
	'Human-led': 'var(--dispatch-lane-institutional-strong)',
	Hybrid: 'var(--platform-accent-prime)',
	'AI-led': 'var(--dispatch-lane-editorial-strong)',
}

function LaneDot({ lane }: { lane: string }) {
	return (
		<span
			aria-hidden="true"
			style={{
				display: 'inline-block',
				width: '7px',
				height: '7px',
				borderRadius: '50%',
				backgroundColor: LANE_COLORS[lane] ?? 'var(--dispatch-lane-institutional-strong)',
				flexShrink: 0,
			}}
		/>
	)
}

function StoryCard({ article, featured }: { article: StoryArticle; featured: boolean }) {
	const { data, href } = article
	const { dateLabel } = data

	return (
		<motion.a
			href={href}
			whileHover={{ y: -3, transition: { duration: 0.18, ease: 'easeOut' } }}
			whileFocus={{ y: -2, transition: { duration: 0.18, ease: 'easeOut' } }}
			className={[
				'group block rounded-md outline-none',
				'bg-window-warm/90 backdrop-blur-sm',
				'border border-lane-institutional-strong/12',
				'transition-shadow duration-200',
				'hover:shadow-md hover:shadow-lane-institutional-strong/10',
				'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
				featured ? 'p-6' : 'p-4',
			].join(' ')}
			style={{ textDecoration: 'none' }}
		>
			{/* Kicker + lane */}
			<div className="mb-2.5 flex items-center gap-2">
				<LaneDot lane={data.provenance.lane} />
				<p className="font-nav text-[12px] font-extrabold uppercase tracking-[0.08em] text-accent-prime">
					{data.kicker}
				</p>
			</div>

			{/* Title */}
			<h2
				className={[
					'font-narrative font-bold leading-snug text-body-strong',
					'group-hover:text-accent-prime-active transition-colors duration-200',
					featured ? 'text-[1.1875rem] max-w-[26ch]' : 'text-[1rem] max-w-[22ch]',
				].join(' ')}
				style={{ letterSpacing: '-0.015em' }}
			>
				{data.title}
			</h2>

			{/* Dek — featured card only */}
			{featured && (
				<p className="mt-2 font-body text-sm leading-relaxed text-body-muted line-clamp-3 max-w-[38ch]">
					{data.dek}
				</p>
			)}

			{/* Meta row */}
			<div className="mt-3 flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-body-faint">
				<span>{dateLabel}</span>
				<span aria-hidden="true">·</span>
				<span>{data.readingTime}</span>
			</div>
		</motion.a>
	)
}

export function StoryCardCluster({ articles }: StoryCardClusterProps) {
	const featured = articles[0]
	const secondary = articles.slice(1)

	if (!featured) return null

	return (
		<div className="flex flex-col gap-3 w-full">
			<StoryCard article={featured} featured={true} />
			{secondary.map((article) => (
				<StoryCard key={article.id} article={article} featured={false} />
			))}
		</div>
	)
}
