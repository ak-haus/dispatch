/**
 * BuildTicker — recent commits as a true horizontal marquee.
 *
 * Pattern: fourmula.ai + feedagency.co marquee. The commit log scrolls
 * continuously right-to-left as a "live news ticker." The animation is
 * GSAP-driven with a seamless loop (commits duplicated so the marquee
 * never shows an edge). Pause-on-hover so the reader can stop and read
 * any individual commit without losing the kinetic feel.
 *
 * Accessibility:
 *   - prefers-reduced-motion: ticker freezes (no infinite scroll).
 *     Reader can still scroll the section horizontally with the wheel.
 *   - Each commit is a focusable, semantic <li> with its full metadata
 *     readable in DOM order (screen readers see the SEED commits exactly
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

const TYPE_COLORS: Record<Commit['type'], string> = {
	feat: PALETTE.accent,
	fix: 'oklch(0.58 0.18 28)',
	chore: 'oklch(0.55 0.05 60)',
	docs: PALETTE.copper,
	refactor: PALETTE.copperDeep,
	style: PALETTE.wheat,
}

const SEED_COMMITS: Commit[] = [
	{
		hash: '9e46960',
		type: 'feat',
		scope: 'visual-system/cartography-concepts',
		subject: 'land W3-S-C concept-01 Editorial District render',
		date: '2026-05-13',
		author: 'AK Almoumen',
		filesChanged: 4,
		insertions: 312,
		deletions: 18,
	},
	{
		hash: '91a7934',
		type: 'docs',
		scope: 'cc-ledger/incidents',
		subject: 'land server-observability-state-snapshot post-ClickHouse-CPU-saturation',
		date: '2026-05-13',
		author: 'AK Almoumen',
		filesChanged: 1,
		insertions: 156,
		deletions: 0,
	},
	{
		hash: '5f958b3',
		type: 'chore',
		scope: 'cc-ledger/session-artifacts/2026-05-10-CC7',
		subject: 'land mid-session context capture',
		date: '2026-05-13',
		author: 'AK Almoumen',
		filesChanged: 2,
		insertions: 88,
		deletions: 4,
	},
	{
		hash: '01cb02b',
		type: 'chore',
		scope: 'cc-ledger/doctrine',
		subject: 'land 4 doctrine files from CC7 incident-response amend-1',
		date: '2026-05-12',
		author: 'AK Almoumen',
		filesChanged: 4,
		insertions: 421,
		deletions: 12,
	},
	{
		hash: '4230296',
		type: 'chore',
		scope: 'cc-ledger/Summaries',
		subject: 'land CC7 First Wave Summaries',
		date: '2026-05-12',
		author: 'AK Almoumen',
		filesChanged: 6,
		insertions: 538,
		deletions: 0,
	},
]

export function BuildTicker() {
	const [commits, setCommits] = useState<Commit[]>(SEED_COMMITS)
	const [isLive, setIsLive] = useState(false)
	const [paused, setPaused] = useState(false)
	const reducedMotion = useReducedMotion()

	const trackRef = useRef<HTMLUListElement>(null)
	const tweenRef = useRef<{ pause: () => void; resume: () => void } | null>(null)

	// Optional /api/commits.json fetch (unchanged contract from prior version)
	useEffect(() => {
		let cancelled = false
		fetch('/api/commits.json')
			.then((r) => (r.ok ? r.json() : null))
			.then((data) => {
				if (!cancelled && Array.isArray(data) && data.length > 0) {
					setCommits(data.slice(0, 8))
					setIsLive(true)
				}
			})
			.catch(() => undefined)
		return () => {
			cancelled = true
		}
	}, [])

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
							style={{ color: PALETTE.copper }}
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
								backgroundColor: isLive ? PALETTE.accent : PALETTE.copper,
								boxShadow: isLive
									? '0 0 8px color-mix(in oklch, var(--platform-accent-prime) 60%, transparent)'
									: 'none',
							}}
						/>
						{isLive ? 'Live · main' : 'Seed · main'}
					</span>
				</motion.div>

				{/* Marquee panel — terminal chrome wraps the moving track */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.9 }}
					className="relative mt-8 overflow-hidden rounded-md border-2 border-body-strong/85 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35),0_8px_16px_-8px_rgba(0,0,0,0.15)]"
					style={{ backgroundColor: 'oklch(0.20 0.02 60)' }}
				>
					{/* Window chrome — matches the prior code panel idiom */}
					<div
						className="flex items-center justify-between border-b border-white/10 px-5 py-2.5"
						style={{ backgroundColor: 'oklch(0.16 0.02 60)' }}
					>
						<div className="flex items-center gap-2">
							<span className="block h-2.5 w-2.5 rounded-full bg-white/15" />
							<span className="block h-2.5 w-2.5 rounded-full bg-white/15" />
							<span className="block h-2.5 w-2.5 rounded-full bg-white/15" />
							<span
								className="ml-4 font-mono text-[12px] uppercase tracking-[0.22em]"
								style={{ color: PALETTE.wheat }}
							>
								prime-city-brand-sandbox · git log --oneline · live
							</span>
						</div>
						<span
							className="hidden font-mono text-[12px] uppercase tracking-[0.22em] sm:inline"
							style={{ color: 'oklch(0.65 0.02 60)' }}
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
									'linear-gradient(to right, oklch(0.20 0.02 60) 0%, transparent 100%)',
							}}
						/>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
							style={{
								background:
									'linear-gradient(to left, oklch(0.20 0.02 60) 0%, transparent 100%)',
							}}
						/>

						<ul
							ref={trackRef}
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
							backgroundColor: 'oklch(0.16 0.02 60)',
							color: 'oklch(0.62 0.02 60)',
						}}
					>
						<span>
							{commits.length} commits · last update {commits[0]?.date}
						</span>
						<span style={{ color: PALETTE.copperDeep }}>working tree clean</span>
					</div>
				</motion.div>

				{/* Caption — single line, full horizontal spread under the ticker.
				    Reads as a tape-machine annotation rather than a paragraph. */}
				<p className="mt-5 flex w-full items-baseline justify-between gap-6 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted">
					<span>
						<span className="text-body-strong font-bold">Live</span>
						<span aria-hidden="true" className="mx-3 text-body-faint">·</span>
						The work as it lands on{' '}
						<span className="font-bold" style={{ color: PALETTE.copper }}>
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
			<span style={{ color: 'oklch(0.70 0.02 60)' }}>({commit.scope}):</span>

			{/* Subject */}
			<span style={{ color: 'oklch(0.92 0.02 90)' }}>{commit.subject}</span>

			{/* Diff stats */}
			{commit.insertions !== undefined && (
				<span
					className="text-[12px] tabular-nums"
					style={{ color: 'oklch(0.55 0.02 60)' }}
				>
					<span style={{ color: PALETTE.copperDeep }}>+{commit.insertions}</span>
					<span className="mx-1">/</span>
					<span style={{ color: 'oklch(0.58 0.18 28)' }}>-{commit.deletions ?? 0}</span>
				</span>
			)}

			{/* Date */}
			<span className="text-[12px] tabular-nums" style={{ color: 'oklch(0.55 0.02 60)' }}>
				{commit.date}
			</span>

			{/* Separator dot — marks the boundary between commits in the marquee */}
			<span
				aria-hidden="true"
				className="mx-2 inline-block h-1 w-1 rounded-full"
				style={{ backgroundColor: 'oklch(0.42 0.02 60)' }}
			/>
		</li>
	)
}
