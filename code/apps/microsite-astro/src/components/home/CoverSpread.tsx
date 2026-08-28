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
 */

'use client'

import { motion } from 'motion/react'

export function CoverSpread({
	issueLabel,
	dateLabel,
	dispatchCount,
	reducedMotion,
	featuredTitle,
}: {
	issueLabel: string
	dateLabel: string
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
			<motion.div
				initial={{ opacity: 0, y: -8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
				className="relative z-20 border-b border-body-strong/25"
				style={{
					backgroundColor: 'color-mix(in oklch, var(--sky-low) 84%, transparent)',
					backdropFilter: 'blur(8px)',
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
						{/* data-live wraps ONLY the wall-clock date (see WireCard) —
						    the issue label stays in the Chromatic diff. */}
						{issueLabel} · <span data-live="timestamp">{dateLabel}</span>
					</span>
				</div>
			</motion.div>

			{/* MAIN COVER — wordmark group fills upper portion (flex-1 + center),
			    dek + Turn the page anchored together at the bottom. */}
			<div className="relative z-10 flex flex-1 flex-col px-6 md:px-16">
				{/* Upper: Volume + Wordmark (+ Live) */}
				<div className="flex flex-1 flex-col items-center justify-center">
					{/* Volume label — letterpress text, no box */}
					<motion.p
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
						className="dispatch-emboss font-mono text-[13px] font-bold uppercase tracking-[0.36em] text-body-strong"
					>
						<span className="text-accent-prime-active">Vol.&nbsp;01</span>
						<span aria-hidden="true" className="mx-3 text-body-muted">·</span>
						{dispatchCount === 1 ? '1 dispatch' : `${dispatchCount} dispatches`}
						<span aria-hidden="true" className="mx-2 text-body-muted">·</span>
						in print
					</motion.p>

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
									<motion.span
										key={`dis-${i}`}
										initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
										animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
										transition={{
											duration: 0.85,
											ease: [0.2, 0.7, 0.2, 1],
											delay: 0.55 + i * 0.07,
										}}
										className="text-wordmark-dis inline-block"
									>
										{c}
									</motion.span>
								))}
							</span>
							<span
								className="inline-flex"
								style={{ fontSize: '1.06em', marginLeft: '-0.02em' }}
								aria-hidden="true"
							>
								{patch.map((c, i) => (
									<motion.span
										key={`patch-${i}`}
										initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
										animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
										transition={{
											duration: 0.85,
											ease: [0.2, 0.7, 0.2, 1],
											delay: 1.05 + i * 0.06,
										}}
										className="text-wordmark-patch inline-block"
									>
										{c}
									</motion.span>
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
						<motion.div
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 2.0, duration: 0.7 }}
							className="mt-16 flex items-baseline gap-3"
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
						</motion.div>
					)}
				</div>

				{/* Bottom: dek paragraph + Turn the page (grouped together) */}
				<div className="flex flex-col items-center gap-6 pb-10 text-center">
					<motion.p
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.7, duration: 0.7, ease: 'easeOut' }}
						className="dispatch-emboss max-w-[42ch] font-narrative font-medium text-[1.0625rem] leading-[1.55] text-body-strong md:text-[1.1875rem]"
					>
						A dev-diary magazine on the construction of Prime City — dispatches issued from the Editorial District.
					</motion.p>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 2.4, duration: 0.8 }}
						className="pointer-events-none flex flex-col items-center gap-2"
					>
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
					</motion.div>
				</div>
			</div>
		</section>
	)
}
