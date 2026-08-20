/* eslint-disable no-restricted-syntax --
 * Sanctioned tokens-lint exemption (ADR-0003 §Stage 5 gate): this ticker
 * DEPICTS a terminal — the same idiom, and the same reasoning, as the macOS
 * window chrome in SpheresSpread. Its palette is a dark terminal register that
 * holds across all three cycles by design: canon color tokens CYCLE
 * (--platform-accent-prime is #8e2532 in dawn, oklch(0.63 0.185 25) in dusk),
 * so re-pointing these at tokens would make the terminal change color with the
 * page, which is a design change to locked canon (CD1-5), not a governance fix.
 *
 * What the exemption is FOR: every value below is named once, in one block, at
 * the top of the file. Before 2026-08-20 these fifteen literals were scattered
 * through the JSX, which is what let the astro app drift outside the oklch band
 * unnoticed (R1). The band now covers this app; a fixed value must be declared
 * here or in shared/palette.ts, never inline.
 */
/**
 * BuildTicker — recent commits as a true horizontal marquee.
 *
 * Pattern: fourmula.ai + feedagency.co marquee. The commit log scrolls
 * continuously right-to-left as a "live news ticker." The animation is
 * GSAP-driven with a seamless loop (commits duplicated so the marquee
 * never shows an edge). Pause-on-hover so the reader can stop and read
 * any individual commit without losing the kinetic feel.
 *
 * Data honesty: commits come from this repo's own `git log`, captured at
 * BUILD time by scripts/generate-commits.mjs into src/data/commits.json
 * and imported here. No fetch, no seed data, no fabrication — the ticker
 * is the actual construction record of ak-haus/dispatch.
 *
 * Accessibility:
 *   - prefers-reduced-motion: ticker freezes (no infinite scroll).
 *     Reader can still scroll the section horizontally with the wheel.
 *   - Each commit is a focusable, semantic <li> with its full metadata
 *     readable in DOM order (screen readers see the real commits exactly
 *     once — the duplicates carry aria-hidden).
 *
 * Why GSAP not CSS: GSAP gives us pause/resume on hover with frame-perfect
 * timing, plus the option to slow/speed up via the timeline's timeScale
 * (used by the ticker chrome to react to user interaction).
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { PALETTE } from './shared/palette'
import commitsData from '../../data/commits.json'

type Commit = {
	hash: string
	type: 'feat' | 'fix' | 'chore' | 'docs' | 'refactor' | 'style'
	scope: string
	subject: string
	date: string
	author: string
	filesChanged?: number
	insertions?: number
	deletions?: number
}

/**
 * The terminal register — every fixed color this depiction uses, named once.
 * See the file-level exemption above for why these are literals and not tokens.
 */
const TICKER = {
	/** Marquee panel ground, and the color the edge fades resolve toward. */
	panel: 'oklch(0.20 0.02 60)',
	/** Title bar + status footer — one step darker than the panel. */
	chrome: 'oklch(0.16 0.02 60)',
	/** Title-bar status text ("▶ streaming · main · HEAD"). */
	chromeText: 'oklch(0.65 0.02 60)',
	/** Status-footer text. */
	footerText: 'oklch(0.62 0.02 60)',
	/** Commit scope, the brightest of the muted metadata tiers. */
	scope: 'oklch(0.70 0.02 60)',
	/** Commit subject — the one near-white in the register. */
	subject: 'oklch(0.92 0.02 90)',
	/** Diff counts and dates. */
	meta: 'oklch(0.55 0.02 60)',
	/** The dot between commits in the marquee. */
	separator: 'oklch(0.42 0.02 60)',
	/** Red for removal — both the `fix` commit type and deletion counts. */
	removal: 'oklch(0.58 0.18 28)',
	/** Muted warm tone for housekeeping commits. */
	chore: 'oklch(0.55 0.05 60)',
} as const

const TYPE_COLORS: Record<Commit['type'], string> = {
	feat: PALETTE.accent,
	fix: TICKER.removal,
	chore: TICKER.chore,
	docs: PALETTE.copper,
	refactor: PALETTE.copperDeep,
	style: PALETTE.wheat,
}

/** Real commits from this repo's git log, captured at build time by
 *  scripts/generate-commits.mjs. See the data-honesty note above. */
const COMMITS: Commit[] = commitsData as Commit[]

export function BuildTicker() {
	const commits = COMMITS
	const [paused, setPaused] = useState(false)
	const reducedMotion = useReducedMotion()

	const trackRef = useRef<HTMLUListElement>(null)
	const tweenRef = useRef<{ pause: () => void; resume: () => void } | null>(null)

	// GSAP marquee — continuous right-to-left scroll. Duplicated content
	// guarantees a seamless loop: when track has scrolled half its width,
	// the timeline restarts at 0 and the duplicate is now where the original
	// was, so visual continuity is preserved.
	useEffect(() => {
		if (reducedMotion) return
		let cancelled = false
		;(async () => {
			const { default: gsap } = await import('gsap')
			if (cancelled || !trackRef.current) return
			const track = trackRef.current
			// Total scroll distance = full width of one cycle (half the duplicated set)
			const distance = track.scrollWidth / 2

			const tween = gsap.to(track, {
				x: -distance,
				duration: distance / 60, // ~60px/sec — feels like a calm news crawl
				ease: 'none',
				repeat: -1,
				modifiers: {
					// Use modulo so the scroll position seamlessly wraps without jump
					x: (x) => `${parseFloat(x) % distance}px`,
				},
			})
			tweenRef.current = tween
		})()
		return () => {
			cancelled = true
			tweenRef.current?.pause()
			tweenRef.current = null
		}
	}, [commits, reducedMotion])

	// Hover pause/resume
	useEffect(() => {
		if (!tweenRef.current) return
		if (paused) tweenRef.current.pause()
		else tweenRef.current.resume()
	}, [paused])

	// Duplicate the commit list for seamless looping. The duplicate is
	// aria-hidden so screen readers don't read commits twice.
	const loopCommits = [...commits, ...commits]

	return (
		<section
			aria-label="Build ticker — recent commits"
			className="relative border-t border-body-strong/15"
			style={{ backgroundColor: 'var(--sky-low)' }}
		>
			<div className="mx-auto max-w-[1880px] px-6 py-12 md:px-16 md:py-16">
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
							className="font-mono text-[12px] uppercase tracking-[0.42em]"
							style={{ color: PALETTE.copperLabel }}
						>
							Build Ticker
						</span>
						<span className="font-narrative italic text-[clamp(1.5rem,4vw,3rem)] leading-[0.95] tracking-[-0.018em] text-body-strong">
							The work as it lands
						</span>
					</div>
					<span className="hidden items-center gap-2 font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted md:flex">
						<span
							className="inline-flex h-1.5 w-1.5 rounded-full"
							style={{
								backgroundColor: PALETTE.accent,
								boxShadow:
									'0 0 8px color-mix(in oklch, var(--platform-accent-prime) 60%, transparent)',
							}}
						/>
						Build snapshot · main
					</span>
				</motion.div>

				{/* Marquee panel — terminal chrome wraps the moving track */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.9 }}
					className="relative mt-8 overflow-hidden rounded-md border-2 border-body-strong/85 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35),0_8px_16px_-8px_rgba(0,0,0,0.15)]"
					style={{ backgroundColor: TICKER.panel }}
				>
					{/* Window chrome — matches the prior code panel idiom */}
					<div
						className="flex items-center justify-between border-b border-white/10 px-5 py-2.5"
						style={{ backgroundColor: TICKER.chrome }}
					>
						<div className="flex items-center gap-2">
							<span className="block h-2.5 w-2.5 rounded-full bg-white/15" />
							<span className="block h-2.5 w-2.5 rounded-full bg-white/15" />
							<span className="block h-2.5 w-2.5 rounded-full bg-white/15" />
							<span
								className="ml-4 font-mono text-[12px] uppercase tracking-[0.22em]"
								style={{ color: PALETTE.wheat }}
							>
								ak-haus/dispatch · git log --oneline
							</span>
						</div>
						<span
							className="hidden font-mono text-[12px] uppercase tracking-[0.22em] sm:inline"
							style={{ color: TICKER.chromeText }}
						>
							{paused ? '⏸ paused' : '▶ streaming'} · main · HEAD
						</span>
					</div>

					{/* Marquee viewport */}
					<div
						className="relative overflow-hidden"
						onMouseEnter={() => setPaused(true)}
						onMouseLeave={() => setPaused(false)}
						onFocus={() => setPaused(true)}
						onBlur={() => setPaused(false)}
					>
						{/* Edge fades — let commits enter/exit smoothly */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
							style={{
								background:
									`linear-gradient(to right, ${TICKER.panel} 0%, transparent 100%)`,
							}}
						/>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
							style={{
								background:
									`linear-gradient(to left, ${TICKER.panel} 0%, transparent 100%)`,
							}}
						/>

						{/* data-live: a continuous GSAP marquee — it is never at rest by
						    design, so the visual archive neither waits for it nor
						    diffs it (e2e/helpers/archive.ts). */}
						<ul
							ref={trackRef}
							data-live="marquee"
							className="flex items-center gap-0 whitespace-nowrap py-4"
							style={{ willChange: 'transform' }}
						>
							{loopCommits.map((c, i) => (
								<TickerItem
									key={`${c.hash}-${i}`}
									commit={c}
									duplicate={i >= commits.length}
								/>
							))}
						</ul>
					</div>

					{/* Status footer */}
					<div
						className="flex items-center justify-between border-t border-white/10 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.22em]"
						style={{
							backgroundColor: TICKER.chrome,
							color: TICKER.footerText,
						}}
					>
						<span>
							{commits.length} commits · last update {commits[0]?.date}
						</span>
						<span style={{ color: PALETTE.copperDeep }}>
							recorded at build · HEAD {commits[0]?.hash}
						</span>
					</div>
				</motion.div>

				{/* Caption — single line, full horizontal spread under the ticker.
				    Reads as a tape-machine annotation rather than a paragraph. */}
				<p className="mt-5 flex w-full items-baseline justify-between gap-6 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted">
					<span>
						<span className="text-body-strong font-bold">Log</span>
						<span aria-hidden="true" className="mx-3 text-body-faint">·</span>
						The work as it lands on{' '}
						<span className="font-bold" style={{ color: PALETTE.copperLabel }}>
							main
						</span>
					</span>
					<span className="hidden md:inline">
						Hover to pause
						<span aria-hidden="true" className="mx-3 text-body-faint">·</span>
						Construction record from inside Prime City
					</span>
					<span className="text-body-faint">DISpatch</span>
				</p>
			</div>
		</section>
	)
}

/* ── TickerItem ──────────────────────────────────────────────────────────── */

function TickerItem({ commit, duplicate }: { commit: Commit; duplicate: boolean }) {
	return (
		<li
			className="group flex shrink-0 items-baseline gap-3 px-6 font-mono text-[12.5px] leading-none"
			aria-hidden={duplicate ? 'true' : undefined}
		>
			{/* Hash */}
			<span className="tabular-nums" style={{ color: PALETTE.wheat }}>
				{commit.hash}
			</span>

			{/* Type badge */}
			<span
				className="rounded-sm border px-2 py-[2px] text-[12px] uppercase tracking-[0.18em]"
				style={{
					color: TYPE_COLORS[commit.type],
					borderColor: 'color-mix(in oklch, currentColor 50%, transparent)',
				}}
			>
				{commit.type}
			</span>

			{/* Scope */}
			<span style={{ color: TICKER.scope }}>({commit.scope}):</span>

			{/* Subject */}
			<span style={{ color: TICKER.subject }}>{commit.subject}</span>

			{/* Diff stats */}
			{commit.insertions !== undefined && (
				<span
					className="text-[12px] tabular-nums"
					style={{ color: TICKER.meta }}
				>
					<span style={{ color: PALETTE.copperDeep }}>+{commit.insertions}</span>
					<span className="mx-1">/</span>
					<span style={{ color: TICKER.removal }}>-{commit.deletions ?? 0}</span>
				</span>
			)}

			{/* Date */}
			<span className="text-[12px] tabular-nums" style={{ color: TICKER.meta }}>
				{commit.date}
			</span>

			{/* Separator dot — marks the boundary between commits in the marquee */}
			<span
				aria-hidden="true"
				className="mx-2 inline-block h-1 w-1 rounded-full"
				style={{ backgroundColor: TICKER.separator }}
			/>
		</li>
	)
}
