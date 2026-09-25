/**
 * CoverSpread — first section of the homepage.
 *
 * Hierarchy (locked by AK 2026-05-14):
 *   1. Centered: "Vol. 01 · N dispatches · in print" (letterpress text, no box)
 *   2. Centered: DISpatch wordmark — RIGHT-SIZED (clamp 3.5rem → 11rem)
 *   3. Underneath wordmark, indented to align with the D:
 *        "● Live — {real article title}"  (NEVER a placeholder string;
 *        if no featured article exists, the ticker hides entirely)
 *   4. Anchored near the bottom (above Turn the page):
 *        Centered dek paragraph
 *   5. Bottom: "Turn the page" + animated cue
 *
 * Backdrop: cartography muted to opacity 0.55 + brightness 0.93 so type
 * reads cleanly. Vellum wash concentrates over the type column.
 *
 * Entrance (B12, 2026-09-19): the wordmark keeps its blur-rise load entry
 * (CD5 §3.5, `.wordmark-enter`); every other line is PAINTED from the first
 * frame and settles into place on its designed timing (`.cover-settle`).
 * Both live in global.css as CSS, so they run from first paint instead of
 * waiting for this island to hydrate.
 *
 * Nothing here may fade in from opacity 0 again. The dek is this page's LCP
 * element, LCP ignores paints at opacity 0 (Chrome M86), and under Motion
 * the whole cover waited for hydration: production Lighthouse read LCP
 * 12.5–13.9s, and a phone on 4G showed an empty map for five seconds.
 * e2e/home.spec.ts fails if the largest paint stops landing with the first.
 */

'use client'

import type { CSSProperties } from 'react'
import { motion } from 'motion/react'

/** A line's settle — the `.cover-settle` rule in global.css. Motion's own
 *  defaults when the cover named no curve: easeOut, and easeInOut. */
const EASE_OUT = 'cubic-bezier(0, 0, 0.58, 1)'
const EASE_IN_OUT = 'cubic-bezier(0.42, 0, 0.58, 1)'

const settle = ({
	delay,
	duration,
	from,
	ease,
}: {
	delay: number
	duration: number
	from: number
	ease?: string
}): CSSProperties =>
	({
		'--settle-delay': `${delay}s`,
		'--settle-dur': `${duration}s`,
		'--settle-from': `${from}px`,
		...(ease !== undefined && { '--settle-ease': ease }),
	}) as CSSProperties

export function CoverSpread({
	issueLabel,
	dateLabel,
	dispatchCount,
	reducedMotion,
	featuredTitle,
}: {
	issueLabel: string
	/** The issue's dateline (the newest dispatch's date); absent when nothing is in print. */
	dateLabel?: string
	dispatchCount: number
	reducedMotion: boolean
	/** Title of the most recent dispatch — surfaced in the LIVE marker.
	 *  When undefined (no published dispatches yet), the live ticker is
	 *  hidden entirely. NO placeholder string is ever rendered. */
	featuredTitle?: string
}) {
	const dis = 'DIS'.split('')
	const patch = 'patch'.split('')

	return (
		<section
			aria-label="DISpatch — Volume 01 cover"
			className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
			style={{ backgroundColor: 'var(--sky-low)' }}
		>
			{/* Cartographic backdrop — MUTED for legibility. */}
			<div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
				<img
					src="/cartography/district.webp"
					alt=""
					className="absolute left-[36%] top-1/2 h-auto w-auto min-h-[120vmax] min-w-[120vmax]"
					style={{
						transform: 'translate(-50%, -50%) rotate(-90deg) scale(0.92)',
						opacity: 0.55,
						filter: 'saturate(0.85) contrast(0.95) brightness(0.93)',
					}}
				/>
				<div className="cover-vellum-wash absolute inset-0" aria-hidden="true" />
			</div>

			{/* Paper grain */}
			<div
				className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-multiply"
				aria-hidden="true"
				style={{
					backgroundImage:
						'radial-gradient(circle at 25% 30%, rgba(0,0,0,0.5) 0px, transparent 1px), radial-gradient(circle at 75% 70%, rgba(0,0,0,0.3) 0px, transparent 1px)',
					backgroundSize: '3px 3px, 5px 5px',
				}}
			/>

			{/* Top eyebrow bar — slim, 12px caps */}
			<div
				className="cover-settle relative z-20 border-b border-body-strong/25"
				style={{
					backgroundColor: 'color-mix(in oklch, var(--sky-low) 84%, transparent)',
					backdropFilter: 'blur(8px)',
					...settle({ delay: 0.1, duration: 0.7, from: -8 }),
				}}
			>
				<div className="flex items-baseline justify-between gap-4 px-6 py-3.5 md:px-12">
					<span className="font-mono text-[12px] font-semibold uppercase tracking-[0.26em] text-body-strong">
						<span className="text-wordmark-dis font-bold">DIS</span>
						<span className="text-wordmark-patch">patch</span>
						<span aria-hidden="true"> · </span>A Prime City Publication
					</span>
					<span className="hidden font-mono text-[12px] font-semibold uppercase tracking-[0.26em] text-body-strong md:inline">
						Editorial District · Recto
					</span>
					<span className="font-mono text-[12px] font-semibold uppercase tracking-[0.26em] text-body-strong">
						{/* The issue's own date (F61) — static, so it is diffed like
						    the rest of the label rather than declared live. */}
						{issueLabel}
						{dateLabel && ` · ${dateLabel}`}
					</span>
				</div>
			</div>

			{/* MAIN COVER — wordmark group fills upper portion (flex-1 + center),
			    dek + Turn the page anchored together at the bottom. */}
			<div className="relative z-10 flex flex-1 flex-col px-6 md:px-16">
				{/* Upper: Volume + Wordmark (+ Live) */}
				<div className="flex flex-1 flex-col items-center justify-center">
					{/* Volume label — letterpress text, no box */}
					<p
						className="cover-settle dispatch-emboss font-mono text-[13px] font-bold uppercase tracking-[0.36em] text-body-strong"
						style={settle({ delay: 0.4, duration: 0.6, from: 6 })}
					>
						<span className="text-accent-prime-active">Vol.&nbsp;01</span>
						<span aria-hidden="true" className="mx-3 text-body-muted">·</span>
						{dispatchCount === 1 ? '1 dispatch' : `${dispatchCount} dispatches`}
						<span aria-hidden="true" className="mx-2 text-body-muted">·</span>
						in print
					</p>

					<div
						className="mt-5 mb-3 h-px w-12 md:w-20"
						aria-hidden="true"
						style={{
							backgroundColor:
								'color-mix(in oklch, var(--platform-text-body-strong) 60%, transparent)',
						}}
					/>

					{/* The wordmark stands ALONE (AK, 2026-08-19).
					    It and the LIVE ticker below are independent components.
					    They were bound together in an early build by an inference
					    error — a wrapper that left-aligned the ticker to the D and
					    let whichever was wider size the pair. What was actually
					    being tuned was VERTICAL: enough distance that the cover
					    reads as composed rather than broken. Proximity, not
					    alignment. Nothing here may couple their horizontal
					    positions again; the vertical gap is the only relationship.

					    The coupling also caused the defect this change repairs: a
					    featured title longer than the wordmark made the ticker the
					    widest child, so the centred pair grew and the left-aligned
					    wordmark slid left by half the excess — 168px at 1280w, and
					    worse with every longer headline.

					    OPTICAL CENTRING: the wordmark centres on its own box, then
					    steps left so the "in print" hairline above lands over the
					    black half of the word, centred on the "a" of patch. The
					    "a" sits 301/507 of the way across the wordmark, so the box
					    moves left by (0.5 − 301/507) = 0.0937 of its width; at
					    4.40× its own font-size that is 0.412em, which scales with
					    the type at every width. e2e/cover.spec.ts asserts the
					    relationship rather than this number. */}
					<h1
						className="dispatch-burnin font-wordmark font-bold leading-[0.86] tracking-[-0.025em] text-body-strong"
						style={{
							fontSize: 'clamp(3.5rem, 9vw, 11rem)',
							// em resolves against this element's own font-size, so the
							// optical step scales with the type automatically.
							transform: 'translateX(-0.412em)',
						}}
						aria-label="DISpatch"
					>
							<span className="inline-flex" aria-hidden="true">
								{dis.map((c, i) => (
									<span
										key={`dis-${i}`}
										className="wordmark-enter text-wordmark-dis inline-block"
										style={{ animationDelay: `${(0.55 + i * 0.07).toFixed(2)}s` }}
									>
										{c}
									</span>
								))}
							</span>
							<span
								className="inline-flex"
								style={{ fontSize: '1.06em', marginLeft: '-0.02em' }}
								aria-hidden="true"
							>
								{patch.map((c, i) => (
									<span
										key={`patch-${i}`}
										className="wordmark-enter text-wordmark-patch inline-block"
										style={{ animationDelay: `${(1.05 + i * 0.06).toFixed(2)}s` }}
									>
										{c}
									</span>
								))}
						</span>
					</h1>

					{/* LIVE ticker — an INDEPENDENT component, not a satellite of
					    the wordmark. It shares the cover's centre line with the
					    volume label and the hairline; the only relationship it has
					    to the wordmark is the vertical gap. mt-16 = 64px, the
					    distance that makes the composition read as composed.
					    Mirrors Vol. 01 styling above: mono, bold, 0.36em tracking,
					    letterpress. */}
					{featuredTitle && (
						<div
							className="cover-settle mt-16 flex items-baseline gap-3"
							style={settle({ delay: 2.0, duration: 0.7, from: 6, ease: EASE_IN_OUT })}
						>
							<span
								className="relative inline-flex size-2 shrink-0 translate-y-[-2px] rounded-full bg-accent-prime-active"
								aria-hidden="true"
							>
								<span className="absolute inset-0 animate-ping rounded-full bg-accent-prime-active opacity-65" />
							</span>
							<p
								className="dispatch-emboss min-w-0 font-mono text-[13px] font-bold uppercase tracking-[0.36em] leading-[1.4] text-body-strong"
								style={{ textWrap: 'balance' as const }}
							>
								<span className="text-accent-prime-active">Live</span>
								<span aria-hidden="true" className="mx-3 text-body-muted">—</span>
								<span>{featuredTitle}</span>
							</p>
						</div>
					)}
				</div>

				{/* Bottom: dek paragraph + Turn the page (grouped together) */}
				<div className="flex flex-col items-center gap-6 pb-10 text-center">
					<p
						className="cover-settle dispatch-emboss max-w-[42ch] font-narrative font-medium text-[1.0625rem] leading-[1.55] text-body-strong md:text-[1.1875rem]"
						style={settle({ delay: 1.7, duration: 0.7, from: 12, ease: EASE_OUT })}
					>
						A dev-diary magazine on the construction of Prime City — dispatches issued from the Editorial District.
					</p>

					{/* No settle: this group's entrance was a fade and nothing else,
					    and a fade is the one property the metric cannot see through.
					    Inventing a rise for it would be a design change, not a repair. */}
					<div className="pointer-events-none flex flex-col items-center gap-2">
						<p className="dispatch-emboss font-mono text-[12px] font-bold uppercase tracking-[0.36em] text-body-strong">
							Turn the page
						</p>
						{/* data-live: an infinite pulse never comes to rest, so the
						    visual archive neither waits for it nor diffs it
						    (e2e/helpers/archive.ts). */}
						<motion.div
							data-live="pulse"
							animate={
								reducedMotion ? undefined : { y: [0, 8, 0], opacity: [0.55, 1, 0.55] }
							}
							transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
							className="h-7 w-px bg-body-strong/55"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
