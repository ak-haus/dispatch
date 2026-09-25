/**
 * DLDSSpread — Dispatch / Lane / Document index.
 *
 * The "more dispatches" surface on the homepage. Renders the non-featured
 * dispatches as an editorial card grid: each card carries a banner cover,
 * lane pigment marker, kicker, title, dek, and meta. Asymmetric responsive
 * grid (1 / 2 / 3 columns) with motion lift on hover.
 *
 * Locked 2026-05-14 by AK:
 *   - Title: "More dispatches" (NOT "Other dispatches in print")
 *   - Visually appealing card grid, not a tabular index
 *   - Real cover imagery from /banners/
 *
 * F61 — every card now describes the dispatch it links to. The banners were
 * cycled by index, which put dispatch-02's plate on dispatch-03's card once
 * each dispatch had its own plate (the one its page and its share card show);
 * the folio was the card's position, so dispatch-03 read "№ 02" here and
 * "Dispatch 03" on its own page; and a seventh card announced "№ 07 · In
 * production · Tomorrow · Every day, one story… at sunrise", which no field in
 * the contract supplies and the newest dispatch — months old — contradicts.
 * Cover and number come from the dispatch (src/lib/share, src/lib/dispatch);
 * where one has neither, the card shows the absence.
 */

'use client'

import { motion } from 'motion/react'
import { PALETTE } from './shared/palette'
import { LANE_COLORS } from './shared/lane-colors'
import type { StoryArticle } from '../StoryCardCluster'

/* The district plate — the page's own substrate, shown as ground (never as a
 * cover) for a dispatch that has no cover of its own. Decorative either way:
 * the card's link is named by its text. */
const HOUSE_PLATE = '/cartography/district.webp'

export function DLDSSpread({ rest }: { rest: StoryArticle[] }) {
	if (rest.length === 0) return null

	return (
		<section
			aria-label="DLDS — more dispatches"
			className="relative border-t border-body-strong/15"
			style={{ backgroundColor: 'var(--sky-low)' }}
		>
			<div className="mx-auto max-w-[1880px] px-6 py-20 md:px-12 md:py-28">
				{/* Section header */}
				<motion.div
					data-ssr-reveal
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7 }}
					className="flex items-baseline justify-between gap-6 border-b border-body-strong/25 pb-3"
				>
					<div className="flex items-baseline gap-4">
						<span
							className="font-mono text-[12px] font-bold uppercase tracking-[0.42em]"
							style={{ color: PALETTE.copperLabel }}
						>
							DLDS
						</span>
						<span className="font-narrative italic text-[clamp(1.5rem,4vw,3rem)] leading-[0.95] tracking-[-0.018em] text-body-strong">
							More dispatches
						</span>
					</div>
					<span className="hidden items-center gap-2 font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted md:flex">
						<span
							aria-hidden="true"
							className="inline-flex h-1.5 w-1.5 rounded-full"
							style={{ backgroundColor: PALETTE.accent }}
						/>
						{/* The cards below, counted — "+ 1" counted the invented
						    next edition, and "queue" was its promise (F61). */}
						{rest.length} in print
					</span>
				</motion.div>

				{/* Card grid */}
				<ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
					{rest.map((a, i) => {
						const laneColor = LANE_COLORS[a.data.provenance.lane]
						const banner = a.data.cover?.src ?? HOUSE_PLATE
						const num = a.data.number
						return (
							<motion.li
								key={a.id}
								data-ssr-reveal
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.25 }}
								transition={{
									duration: 0.55,
									ease: [0.2, 0.7, 0.2, 1],
									delay: Math.min(i, 6) * 0.06,
								}}
							>
								<a
									href={a.href}
									className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-body-strong/12 bg-sky-low outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-body-strong/25 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.30),0_8px_16px_-8px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low"
								>
									{/* Cover banner */}
									<div className="relative aspect-[16/10] overflow-hidden bg-window-warm">
										<img
											loading="lazy"
											src={banner}
											alt=""
											aria-hidden="true"
											className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
											draggable={false}
										/>
										{/* Bottom vignette so the lane bar reads cleanly */}
										<div
											aria-hidden="true"
											className="pointer-events-none absolute inset-0"
											style={{
												background:
													'linear-gradient(to top, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.04) 35%, transparent 60%)',
											}}
										/>
										{/* Number folio — top-left badge: the dispatch's own number,
										    or no folio at all (F61). */}
										{num && (
											<span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[2px] border border-white/22 bg-black/45 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.26em] text-white/90 backdrop-blur-sm">
												<span aria-hidden="true">№</span>
												{num}
											</span>
										)}
										{/* Lane pigment bar — bottom-left, grows on hover */}
										<span
											aria-hidden="true"
											className="absolute bottom-0 left-0 h-1.5 transition-all duration-300 group-hover:h-2"
											style={{ backgroundColor: laneColor, width: '38%' }}
										/>
									</div>

									{/* Body */}
									<div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
										<div className="flex items-center justify-between gap-3">
											<span
												className="flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.28em]"
												style={{ color: laneColor }}
											>
												<span
													aria-hidden="true"
													className="block size-1.5 rounded-full"
													style={{ backgroundColor: laneColor }}
												/>
												{a.data.kicker}
											</span>
											<span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
												{a.data.dateLabel}
											</span>
										</div>

										<h3
											className="font-narrative font-bold leading-[1.08] tracking-[-0.018em] text-body-strong transition-colors duration-200 group-hover:text-accent-prime-active"
											style={{ fontSize: 'clamp(1.25rem, 1.6vw, 1.625rem)' }}
										>
											{a.data.title}
										</h3>

										<p className="line-clamp-3 font-narrative text-[14.5px] leading-[1.5] text-body-muted">
											{a.data.dek}
										</p>

										<div className="mt-auto flex items-center justify-between border-t border-body-strong/10 pt-3">
											<span className="font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
												{a.data.readingTime}
											</span>
											<span
												className="flex items-center gap-1.5 font-nav text-[12px] font-extrabold uppercase tracking-[0.22em] transition-all duration-200 group-hover:gap-2.5"
												style={{ color: laneColor }}
											>
												Read
												<span aria-hidden="true">→</span>
											</span>
										</div>
									</div>
								</a>
							</motion.li>
						)
					})}
				</ol>
			</div>
		</section>
	)
}
