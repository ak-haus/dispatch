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
 *   - Real cover imagery using /banners/ assets cycled by index
 */

'use client'

import { motion } from 'motion/react'
import { PALETTE } from './shared/palette'
import { LANE_COLORS } from './shared/lane-colors'
import type { StoryArticle } from '../StoryCardCluster'

/* Cover banner for the next-edition placeholder. Refreshed when AK drops a
 * new asset into /public/banners/. Currently dispatch-07.png. */
const NEXT_EDITION_BANNER = '/banners/dispatch-07.png'

const BANNERS = [
	'/banners/dispatch-02.png',
	'/banners/dispatch-03.png',
	'/banners/Dispatch-04.png',
	'/banners/Dispatch-05.png',
	'/banners/dispatch-06.webp',
] as const

function bannerFor(index: number): string {
	return BANNERS[index % BANNERS.length]!
}

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
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7 }}
					className="flex items-baseline justify-between gap-6 border-b border-body-strong/25 pb-3"
				>
					<div className="flex items-baseline gap-4">
						<span
							className="font-mono text-[12px] font-bold uppercase tracking-[0.42em]"
							style={{ color: PALETTE.copper }}
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
						{rest.length + 1} in the queue
					</span>
				</motion.div>

				{/* Card grid */}
				<ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
					{rest.map((a, i) => {
						const laneColor = LANE_COLORS[a.data.provenance.lane]
						const banner = bannerFor(i)
						const num = String(i + 2).padStart(2, '0')
						return (
							<motion.li
								key={a.id}
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
										{/* Number folio — top-left badge */}
										<span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[2px] border border-white/22 bg-black/45 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.26em] text-white/90 backdrop-blur-sm">
											<span aria-hidden="true">№</span>
											{num}
										</span>
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

					{/* Next-edition placeholder — always fills the next slot.
					    Homepage only (DLDSSpread isn't used elsewhere). */}
					<NextEditionCard slot={rest.length + 2} />
				</ol>
			</div>
		</section>
	)
}

/* ── NextEditionCard — placeholder for tomorrow's dispatch ──────────────
 * Visually distinct from the article cards: copper accents, dashed border,
 * sunrise glyph centered in the cover area. Not a navigable article — it's
 * a queue indicator telling readers the next story is in production.
 * ──────────────────────────────────────────────────────────────────────── */

function NextEditionCard({ slot }: { slot: number }) {
	const num = String(slot).padStart(2, '0')
	const copper = PALETTE.copper
	const copperDeep = PALETTE.copperDeep

	return (
		<motion.li
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1], delay: 0.4 }}
		>
			<div
				className="group relative flex h-full flex-col overflow-hidden rounded-[3px] border-2 border-dashed bg-sky-low transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.30),0_8px_16px_-8px_rgba(0,0,0,0.12)]"
				style={{
					borderColor: `color-mix(in oklch, ${copper} 45%, transparent)`,
				}}
			>
				{/* Cover banner — real artwork from /banners/ with a copper
				    desaturated treatment so it reads as "preview, not yet
				    published." Subtle film grain + "NEXT EDITION" badge
				    overlaid; on hover the banner saturates back up. */}
				<div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden">
					<img
						src={NEXT_EDITION_BANNER}
						alt=""
						aria-hidden="true"
						className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
						style={{
							filter: 'saturate(0.72) brightness(0.96)',
						}}
						draggable={false}
					/>
					{/* Hover state — restore full saturation */}
					<div
						aria-hidden="true"
						className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
					>
						<img
							src={NEXT_EDITION_BANNER}
							alt=""
							className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
							draggable={false}
						/>
					</div>

					{/* Copper veil — preview tint */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-50"
						style={{
							background: `linear-gradient(165deg, color-mix(in oklch, ${copper} 28%, transparent) 0%, color-mix(in oklch, ${copperDeep} 18%, transparent) 60%, transparent 100%)`,
						}}
					/>

					{/* Centered "NEXT EDITION" pill — the visual cue that this
					    isn't a published article. */}
					<motion.div
						className="relative z-10 flex flex-col items-center gap-2"
						animate={{ y: [0, -2, 0] }}
						transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
					>
						<span
							className="inline-flex items-center gap-2 rounded-full border-2 bg-sky-low/92 px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.32em] backdrop-blur-md"
							style={{
								borderColor: copper,
								color: copperDeep,
								boxShadow: `0 10px 28px -10px color-mix(in oklch, ${copperDeep} 70%, transparent)`,
							}}
						>
							<span
								aria-hidden="true"
								className="relative inline-flex h-1.5 w-1.5 rounded-full"
								style={{ backgroundColor: copper }}
							>
								<span
									className="absolute inset-0 animate-ping rounded-full"
									style={{ backgroundColor: copper, opacity: 0.55 }}
								/>
							</span>
							Next edition
						</span>
					</motion.div>

					{/* Number folio — top-left */}
					<span
						className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[2px] border bg-window-warm/85 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.26em] backdrop-blur-sm"
						style={{
							borderColor: `color-mix(in oklch, ${copper} 35%, transparent)`,
							color: copperDeep,
						}}
					>
						<span aria-hidden="true">№</span>
						{num}
					</span>

					{/* Lane stripe — copper, grows on hover */}
					<span
						aria-hidden="true"
						className="absolute bottom-0 left-0 h-1.5 transition-all duration-300 group-hover:h-2"
						style={{ backgroundColor: copper, width: '38%' }}
					/>
				</div>

				<div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
					<div className="flex items-center justify-between gap-3">
						<span
							className="flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.28em]"
							style={{ color: copperDeep }}
						>
							<span
								aria-hidden="true"
								className="block size-1.5 rounded-full"
								style={{ backgroundColor: copper }}
							/>
							In production
						</span>
						<span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
							Tomorrow
						</span>
					</div>

					<h3
						className="font-narrative font-bold leading-[1.08] tracking-[-0.018em] text-body-strong"
						style={{ fontSize: 'clamp(1.25rem, 1.6vw, 1.625rem)' }}
					>
						The next dispatch, drafting now
					</h3>

					<p className="line-clamp-3 font-narrative text-[14.5px] leading-[1.5] text-body-muted">
						Every day, one story. The next edition is being drafted from inside the work and
						will land at sunrise. Subscribe to read it before the page updates.
					</p>

					<div className="mt-auto flex items-center justify-between border-t border-body-strong/10 pt-3">
						<span className="font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
							At sunrise
						</span>
						<a
							href="#subscribe"
							className="flex items-center gap-1.5 font-nav text-[12px] font-extrabold uppercase tracking-[0.22em] transition-all duration-200 hover:gap-2.5"
							style={{ color: copperDeep }}
						>
							Subscribe
							<span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</div>
		</motion.li>
	)
}
