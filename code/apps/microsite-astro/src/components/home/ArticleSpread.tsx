/**
 * ArticleSpread — featured dispatch rendered as a magazine article opening.
 *
 * Two-column on lg+, stacked below. The recto column carries the actual
 * article preview (kicker, headline, drop-cap dek, CTA pill). The verso
 * column carries a pull-quote in a wheat block, meta dl, and an editor's
 * note with a green border.
 *
 * Two OKLCH marginalia blocks (wheat square + blue stripe) drift on
 * scroll via useScroll → useTransform, reading as magazine sidebar
 * callouts at the edges of the section.
 */

'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { PALETTE, laneTint } from './shared/palette'
import { LANE_COLORS } from './shared/lane-colors'
import type { StoryArticle } from '../StoryCardCluster'

export function ArticleSpread({
	featured,
	dateLabel,
}: {
	featured?: StoryArticle
	dateLabel: string
}) {
	const sectionRef = useRef<HTMLElement>(null)

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	})
	const blockY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

	if (!featured) return null

	return (
		<section
			ref={sectionRef}
			aria-label="Featured article opening"
			className="relative isolate overflow-hidden border-t border-body-strong/15"
			style={{ backgroundColor: 'var(--sky-low)' }}
		>
			<motion.div
				className="pointer-events-none absolute left-0 top-[18%] hidden h-44 w-44 rounded-sm lg:block"
				style={{ backgroundColor: PALETTE.wheat, y: blockY, opacity: 0.92 }}
				aria-hidden="true"
			/>
			<motion.div
				className="pointer-events-none absolute right-[4%] top-[52%] hidden h-24 w-1 lg:block"
				style={{ backgroundColor: PALETTE.copper, y: blockY }}
				aria-hidden="true"
			/>

			<div className="relative mx-auto max-w-[1360px] 2xl:max-w-[1600px] min-[2200px]:max-w-[1880px] px-6 py-20 md:px-16 md:py-32 lg:py-40">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7 }}
					className="flex items-baseline justify-between gap-6 border-b border-body-strong/25 pb-3"
				>
					<div className="flex items-baseline gap-4">
						<span
							className="font-mono text-[12px] uppercase tracking-[0.42em]"
							style={{ color: PALETTE.copperLabel }}
						>
							Article I.
						</span>
						<span className="font-narrative italic text-[clamp(1.5rem,4vw,3rem)] leading-[0.95] tracking-[-0.018em] text-body-strong">
							The Featured Dispatch
						</span>
					</div>
					<span className="hidden font-mono text-[12px] uppercase tracking-[0.32em] text-body-faint md:inline">
						Opened · {dateLabel}
					</span>
				</motion.div>

				<div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
					{/* ── Recto: the article opening proper ──────────────────── */}
					<motion.article
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.9 }}
					>
						<div className="flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.3em]">
							<span
								aria-hidden="true"
								className="block h-1.5 w-1.5 rounded-full"
								style={{ backgroundColor: LANE_COLORS[featured.data.provenance.lane] }}
							/>
							<span style={{ color: PALETTE.copperLabel }}>{featured.data.kicker}</span>
							<span className="text-body-faint">·</span>
							<span className="text-body-faint">{featured.data.dateLabel}</span>
							<span className="text-body-faint">·</span>
							<span className="text-body-faint">{featured.data.readingTime}</span>
						</div>

						<h2
							className="mt-4 font-narrative font-bold leading-[1.02] tracking-[-0.022em] text-body-strong"
							style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
						>
							{featured.data.title}
						</h2>

						<p className="mt-8 max-w-[60ch] font-narrative text-[1.0625rem] leading-[1.65] text-body-muted md:text-[1.1875rem]">
							<span
								className="float-left mr-3 mt-1 font-wordmark font-bold leading-[0.85] tracking-[-0.04em]"
								style={{
									fontSize: 'clamp(3.5rem, 6.5vw, 6rem)',
									color: PALETTE.accent,
								}}
							>
								{featured.data.dek.charAt(0)}
							</span>
							{featured.data.dek.slice(1)}
						</p>

						{/* SITE RULE: pills are wireframe-embossed copper outlines
						    (see DispatchArticleLayout's BACK TO DISPATCH for the
						    canonical pattern). Hover fills the pill so the call-
						    to-action animates from "engraved on page" to "lifted
						    off the page." */}
						<a
							href={featured.href}
							className="group mt-10 inline-flex items-center gap-3 rounded-full border-2 border-copper bg-transparent px-6 py-3 font-nav text-[13px] font-extrabold uppercase tracking-[0.22em] text-copper-label transition-all duration-200 hover:bg-copper-label hover:text-sky-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low"
							style={{
								boxShadow:
									'inset 0 1px 0 color-mix(in oklch, var(--platform-copper) 40%, transparent), inset 0 -1px 0 color-mix(in oklch, var(--platform-copper) 22%, transparent), 0 1px 0 color-mix(in oklch, var(--platform-copper) 18%, transparent)',
								textShadow:
									'0 1px 0 color-mix(in oklch, var(--sky-low) 65%, transparent)',
							}}
						>
							Read the dispatch
							<span className="transition-transform duration-200 group-hover:translate-x-1">
								→
							</span>
						</a>
					</motion.article>

					{/* ── Verso: pull-quote + meta in OKLCH callouts ─────────── */}
					<motion.aside
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.9, delay: 0.1 }}
						className="lg:pt-10"
					>
						<div
							className="rounded-sm p-6 md:p-8"
							style={{ backgroundColor: PALETTE.wheat }}
						>
							<p
								className="font-mono text-[12px] font-bold uppercase tracking-[0.36em]"
								style={{
									color: 'oklch(0.18 0.02 60)',
									textShadow: '0 1px 0 color-mix(in oklch, oklch(0.99 0.005 75) 60%, transparent)',
								}}
							>
								From the dispatch
							</p>
							<p
								className="mt-4 font-narrative italic leading-[1.18] tracking-[-0.012em]"
								style={{
									fontSize: 'clamp(1.375rem, 2.4vw, 1.875rem)',
									color: 'oklch(0.18 0.02 60)',
								}}
							>
								“<span className="text-wordmark-dis font-bold not-italic">DIS</span><span className="not-italic" style={{ color: 'oklch(0.18 0.02 60)' }}>patch</span> publishes as a magazine, reads as a notebook, and behaves as a website.”
							</p>
						</div>

						<dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-body-strong/15 pt-6 font-mono text-[12px] uppercase tracking-[0.22em]">
							<dt className="text-body-faint">Lane</dt>
							<dd className="font-nav font-bold text-body-strong">
								{featured.data.provenance.lane}
							</dd>
							<dt className="text-body-faint">Issued</dt>
							<dd className="text-body-strong">{featured.data.dateLabel}</dd>
							<dt className="text-body-faint">Length</dt>
							<dd className="text-body-strong">{featured.data.readingTime}</dd>
							<dt className="text-body-faint">Series</dt>
							<dd className="text-body-strong">Dispatch No. 06</dd>
						</dl>

						<div
							className="mt-8 rounded-sm border-l-[3px] p-5"
							style={{
								borderLeftColor: laneTint(featured.data.provenance.lane),
								backgroundColor: 'color-mix(in oklch, var(--sky-low) 30%, transparent)',
							}}
						>
							<p
								className="font-mono text-[12px] font-bold uppercase tracking-[0.32em]"
								style={{ color: laneTint(featured.data.provenance.lane) }}
							>
								Editor's note · {featured.data.provenance.lane}
							</p>
							<p className="mt-2 font-narrative italic text-[0.9375rem] leading-snug text-body-muted">
								The first dispatch from the Mayor — a charter for what DISpatch is and how it intends to behave.
							</p>
						</div>
					</motion.aside>
				</div>
			</div>
		</section>
	)
}
