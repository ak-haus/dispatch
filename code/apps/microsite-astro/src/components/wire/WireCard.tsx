/**
 * WireCard — one publish event, per the ADR-0001 Addendum D3 card spec.
 *
 * Anatomy (design-system consensus: Primer Timeline / SLDS / M3):
 * accent rail → platform badge (text label — no fake brand icons; lucide
 * lacks most of these marks) → verb line → title (the card's single real
 * link) → optional excerpt → timestamp → provenance chip.
 *
 * <article> carries the feed-item ARIA (posinset/setsize/labelledby/
 * describedby) and the entry id, which makes /wire#{id} anchor permalinks
 * work for free. All text ≥12px (house floor). div/article only — the
 * global.css tag cascade binds to semantic header/section tags.
 */

import { motion, type Variants } from 'motion/react'
import { PALETTE } from '../home/shared/palette'
import type { WireEntry } from '../../lib/wire/contract'
import { platformLabel } from './useWireFeed'
import { absoluteTime, relativeTime } from './relative-time'

export const cardEntrance: Variants = {
	hidden: { opacity: 0, y: 12 },
	shown: { opacity: 1, y: 0 },
}

export function WireCard({
	entry,
	posinset,
	setsize,
	now,
}: {
	entry: WireEntry
	posinset: number
	setsize: number
	now: number
}) {
	const titleId = `${entry.id}-title`
	const metaId = `${entry.id}-meta`
	const label = platformLabel(entry.platform)

	return (
		<motion.article
			id={entry.id}
			tabIndex={0}
			aria-posinset={posinset}
			aria-setsize={setsize}
			aria-labelledby={titleId}
			aria-describedby={metaId}
			variants={cardEntrance}
			transition={{ duration: 0.4, ease: 'easeOut' }}
			className="relative border-l-2 py-3 pl-5 pr-2 outline-offset-4"
			style={{ borderColor: 'color-mix(in oklch, var(--platform-copper) 55%, transparent)' }}
		>
			{/* Verb line — 12px caps letterpress, platform named in visible text
			    (color is reinforcement only, never the sole indicator) */}
			<p className="dispatch-emboss flex items-baseline gap-2 font-mono text-[12px] uppercase tracking-[0.32em]">
				<span
					aria-hidden="true"
					className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full"
					style={{ backgroundColor: PALETTE.copper }}
				/>
				<span>Published to {label}</span>
			</p>

			{/* Title — the single real link; platform context via describedby, not
			    repeated in the link text */}
			<p id={titleId} className="mt-1.5 font-narrative text-[clamp(1.05rem,2vw,1.35rem)] leading-snug text-body-strong">
				<a
					href={entry.url}
					rel="noopener"
					target="_blank"
					className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
					style={{ color: 'inherit' }}
				>
					{entry.title}
				</a>
			</p>

			{entry.excerpt && (
				<p className="mt-1 line-clamp-2 max-w-[62ch] text-[13px] leading-relaxed text-body-muted">
					{entry.excerpt}
				</p>
			)}

			<p id={metaId} className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[12px] tracking-[0.08em] text-body-muted">
				<time dateTime={entry.ts} title={absoluteTime(entry.ts)} suppressHydrationWarning className="tabular-nums">
					{relativeTime(entry.ts, now)}
				</time>
				<span aria-hidden="true" className="text-body-faint">·</span>
				<span>via Crossfire{entry.pipeline_run ? ` · ${entry.pipeline_run}` : ''}</span>
			</p>
		</motion.article>
	)
}
