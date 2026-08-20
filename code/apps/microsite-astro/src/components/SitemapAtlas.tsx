/**
 * SitemapAtlas — DISpatch's sitemap rendered as a cartographic atlas.
 *
 * Locked 2026-05-14:
 *   - Map: cartographic backdrop only. NO polygon zone fills. Zones are
 *     pulsing red lights (markers) placed ON the existing red buildings of
 *     the district image. The lights pulse like dispatch markers; the
 *     active light grows + adds an outer ring + label callout.
 *   - Right rail: three card surfaces matching the DLDS card visual
 *     language — banner-quality focused zone, lane-coded zone index with
 *     hover lift, recent-dispatch mini cards.
 *   - Motion-driven across hover, focus, and viewport-entry.
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { Compass, Map as MapIcon, FileText, MessageSquareText, Landmark, Newspaper, ArrowRight } from 'lucide-react'
import { PALETTE } from './home/shared/palette'

/* ── Atlas zone definitions ──────────────────────────────────────────────── */

type ZoneLane = 'editorial' | 'institutional' | 'dispatch' | 'civic'

type AtlasZone = {
	id: string
	name: string
	role: string
	href: string
	lane: ZoneLane
	icon: typeof Compass
	/** Marker position in 0–100 viewport-relative space, placed ON one of
	 *  the red building footprints in /cartography/district.webp. */
	anchor: { x: number; y: number }
	description: string
	entries?: { label: string; href: string; meta?: string }[]
}

/* Marker positions sit on the red building cluster of district.webp.
 * Eyeballed against the rendered image; tuned so each light lands on a
 * distinct red footprint rather than empty grid space. */
const ZONES: AtlasZone[] = [
	{
		id: 'editorial',
		name: 'Editorial District',
		role: 'Where the dispatches live',
		href: '/dispatch',
		lane: 'editorial',
		icon: Newspaper,
		anchor: { x: 48, y: 42 },
		description:
			'The reading sanctuary. Long-form dispatches issued from inside Prime City as the building goes up. Each story shipped here is the spine of one editorial cycle.',
		entries: [
			{ label: 'All articles', href: '/article', meta: 'browse' },
			{ label: 'Latest dispatch', href: '/dispatch/dispatch-01', meta: 'today' },
		],
	},
	{
		id: 'home',
		name: 'Reception',
		role: 'The cover, every day',
		href: '/',
		lane: 'dispatch',
		icon: Compass,
		anchor: { x: 52, y: 26 },
		description:
			"The front door. The cover wordmark, today's featured dispatch, the live ticker, and the Crossfire — one story across all six surfaces it gets published to.",
		entries: [{ label: 'Reception (home)', href: '/', meta: 'cover' }],
	},
	{
		id: 'atlas',
		name: 'Atlas',
		role: 'You are here',
		href: '/sitemap',
		lane: 'civic',
		icon: MapIcon,
		anchor: { x: 24, y: 56 },
		description:
			'The map you are standing on. Every public page in DISpatch as a zone in the Editorial District. Hover a marker to read its register; click to step inside.',
		entries: [{ label: 'Atlas', href: '/sitemap', meta: 'this page' }],
	},
	{
		id: 'about',
		name: 'About',
		role: 'Why DISpatch exists',
		href: '/about',
		lane: 'institutional',
		icon: Landmark,
		anchor: { x: 36, y: 72 },
		description:
			"The publication's reason and the editor behind it. What Prime City is. Why this dev diary is shipped daily. Where the work sits in the larger arc.",
		entries: [{ label: 'About DISpatch', href: '/about' }],
	},
	{
		id: 'crossfire',
		name: 'Crossfire',
		role: 'One story · six surfaces',
		href: '/#crossfire',
		lane: 'dispatch',
		icon: MessageSquareText,
		anchor: { x: 70, y: 44 },
		description:
			"Today's dispatch as it appears across DISpatch, Newsletter, LinkedIn, Hashnode, Dev.to, and Instagram. Same story; six platform shapes; one folder of asset cards.",
		entries: [
			{ label: 'View on home', href: '/#crossfire', meta: 'embedded' },
			{ label: 'Newsletter archive', href: '/newsletter', meta: 'soon' },
		],
	},
	{
		id: 'build',
		name: 'Build Ticker',
		role: 'The work as it lands',
		href: '/#build-ticker',
		lane: 'institutional',
		icon: FileText,
		anchor: { x: 64, y: 70 },
		description:
			'Live commit log from the Prime City repo. Hover the marquee to pause and read what shipped. Each row is a commit on `main` from inside the construction.',
		entries: [{ label: 'View on home', href: '/#build-ticker', meta: 'embedded' }],
	},
]

const LANE_COLORS: Record<ZoneLane, string> = {
	editorial: 'var(--lane-editorial)',
	institutional: 'var(--lane-institutional)',
	dispatch: 'var(--platform-accent-prime)',
	civic: 'var(--platform-copper)',
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function SitemapAtlas({ articles }: { articles: ArticleEntry[] }) {
	const [hoveredId, setHoveredId] = useState<string | null>(null)
	const [tappedId, setTappedId] = useState<string | null>(null)
	const reducedMotion = useReducedMotion()

	const focusId = hoveredId ?? tappedId ?? 'editorial'
	const focusedZone = ZONES.find((z) => z.id === focusId) ?? ZONES[0]

	return (
		<MotionConfig reducedMotion="user">
			<section
				aria-label="DISpatch atlas"
				className="relative w-full"
				style={{ backgroundColor: 'var(--sky-low)' }}
			>
				{/* Hero band */}
				<div className="px-4 pt-12 pb-6 sm:px-6 md:px-10 md:pt-16 md:pb-10">
					<div className="mx-auto flex max-w-[1880px] items-baseline justify-between gap-4 border-b border-body-strong/25 pb-3">
						<div className="flex items-baseline gap-4">
							<span
								className="font-mono text-[12px] font-bold uppercase tracking-[0.42em]"
								style={{ color: 'var(--platform-copper)' }}
							>
								Atlas
							</span>
							<span className="font-narrative italic text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[0.98] tracking-[-0.018em] text-body-strong">
								The Editorial District, mapped
							</span>
						</div>
						<span className="hidden items-center gap-2 font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted md:flex">
							<span
								aria-hidden="true"
								className="inline-flex h-1.5 w-1.5 rounded-full"
								style={{ backgroundColor: 'var(--platform-accent-prime)' }}
							/>
							{ZONES.length} markers · 1 atlas
						</span>
					</div>
					<p className="mt-5 max-w-[68ch] font-narrative text-[clamp(0.9375rem,1.1vw,1.0625rem)] leading-[1.55] text-body-muted">
						Every page in DISpatch is a building in the same district. Each pulsing red light
						below is a destination. Hover to read its register; click to step inside.
					</p>
				</div>

				{/* Atlas viewport */}
				<div className="grid grid-cols-1 gap-6 px-4 pb-16 sm:px-6 md:px-10 md:pb-24 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
					{/* LEFT — cartographic map with pulsing dot markers */}
					<div
						className="relative overflow-hidden rounded-[3px] border border-body-strong/15"
						style={{
							aspectRatio: '4 / 3',
							backgroundColor: PALETTE.cartographyPaper,
							boxShadow:
								'0 30px 80px -30px rgba(0,0,0,0.30), 0 8px 20px -8px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.04)',
						}}
					>
						{/* Cartographic backdrop — full opacity now since no polygons compete */}
						<img
							src="/cartography/district.webp"
							alt=""
							aria-hidden="true"
							className="absolute inset-0 h-full w-full object-cover"
							style={{ opacity: 0.88, filter: 'saturate(0.95) contrast(1.04)' }}
							draggable={false}
						/>

						{/* Subtle vellum wash for caption legibility */}
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0"
							style={{
								background:
									'radial-gradient(80% 60% at 50% 55%, transparent 0%, color-mix(in oklch, var(--sky-low) 8%, transparent) 100%)',
							}}
						/>

						{/* Compass rose — top-right */}
						<svg
							aria-hidden="true"
							className="absolute right-4 top-4 size-12 opacity-70 md:size-14"
							viewBox="0 0 100 100"
						>
							<circle
								cx="50"
								cy="50"
								r="46"
								fill="color-mix(in oklch, var(--sky-low) 90%, transparent)"
								stroke="var(--platform-text-body-strong)"
								strokeWidth="1.5"
							/>
							<polygon
								points="50,8 56,50 50,46 44,50"
								fill="var(--platform-accent-prime)"
								stroke="var(--platform-text-body-strong)"
								strokeWidth="0.8"
							/>
							<polygon
								points="50,92 56,50 50,54 44,50"
								fill="var(--platform-text-body-strong)"
								opacity="0.4"
							/>
							<text
								x="50"
								y="6"
								textAnchor="middle"
								fontSize="8"
								fontFamily="JetBrains Mono"
								fontWeight="700"
								fill="var(--platform-text-body-strong)"
							>
								N
							</text>
						</svg>

						{/* Scale bar — bottom-left */}
						<div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.32em] text-body-strong">
							<svg width="60" height="8" viewBox="0 0 60 8" aria-hidden="true">
								<line x1="2" y1="4" x2="58" y2="4" stroke="currentColor" strokeWidth="1.2" />
								<line x1="2" y1="1" x2="2" y2="7" stroke="currentColor" strokeWidth="1.2" />
								<line x1="30" y1="2" x2="30" y2="6" stroke="currentColor" strokeWidth="1" />
								<line x1="58" y1="1" x2="58" y2="7" stroke="currentColor" strokeWidth="1.2" />
							</svg>
							<span>1 dispatch ≈ 1 day</span>
						</div>

						{/* Markers — pulsing dots ON red buildings, no polygons */}
						{ZONES.map((zone) => (
							<MapMarker
								key={zone.id}
								zone={zone}
								isFocused={zone.id === focusId}
								onEnter={() => setHoveredId(zone.id)}
								onLeave={() => setHoveredId(null)}
								onTap={() => setTappedId(zone.id)}
								reducedMotion={!!reducedMotion}
							/>
						))}

						{/* Reading hint — bottom-right */}
						<div className="absolute bottom-4 right-4 font-mono text-[12px] uppercase tracking-[0.32em] text-body-strong/80">
							hover · click to step inside
						</div>
					</div>

					{/* RIGHT — three premium card surfaces */}
					<div className="flex flex-col gap-5">
						<FocusedZoneCard zone={focusedZone} />
						<ZoneIndexCard zones={ZONES} focusId={focusId} setHoveredId={setHoveredId} />
						{articles.length > 0 && <RecentDispatchesCard articles={articles} />}
					</div>
				</div>
			</section>
		</MotionConfig>
	)
}

/* ─── MapMarker — pulsing red light placed on a red building ─────────────── */

function MapMarker({
	zone,
	isFocused,
	onEnter,
	onLeave,
	onTap,
	reducedMotion,
}: {
	zone: AtlasZone
	isFocused: boolean
	onEnter: () => void
	onLeave: () => void
	onTap: () => void
	reducedMotion: boolean
}) {
	const color = LANE_COLORS[zone.lane]
	return (
		<button
			type="button"
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onClick={() => {
				onTap()
				window.location.href = zone.href
			}}
			onFocus={onEnter}
			onBlur={onLeave}
			aria-label={`${zone.name} — ${zone.role}`}
			className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
			style={{ left: `${zone.anchor.x}%`, top: `${zone.anchor.y}%`, zIndex: isFocused ? 20 : 10 }}
		>
			{/* Outer pulse ring (animation) */}
			{!reducedMotion && (
				<motion.span
					aria-hidden="true"
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
					style={{ backgroundColor: color }}
					animate={{
						scale: [1, isFocused ? 4 : 3, 1],
						opacity: [isFocused ? 0.55 : 0.35, 0],
					}}
					transition={{
						duration: isFocused ? 1.4 : 2.2,
						repeat: Infinity,
						ease: 'easeOut',
					}}
				>
					<span
						className="block"
						style={{ width: isFocused ? 14 : 10, height: isFocused ? 14 : 10 }}
					/>
				</motion.span>
			)}

			{/* Static halo when focused */}
			{isFocused && (
				<motion.span
					aria-hidden="true"
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
					initial={{ scale: 0.6, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.25 }}
					style={{
						width: 28,
						height: 28,
						border: `1.5px solid ${color}`,
						boxShadow: `0 0 18px color-mix(in oklch, ${color} 60%, transparent)`,
					}}
				/>
			)}

			{/* Core dot */}
			<motion.span
				aria-hidden="true"
				className="relative block rounded-full"
				style={{ backgroundColor: color }}
				animate={{
					width: isFocused ? 14 : 10,
					height: isFocused ? 14 : 10,
					boxShadow: isFocused
						? `0 0 14px color-mix(in oklch, ${color} 70%, transparent), 0 0 0 2px color-mix(in oklch, var(--sky-low) 80%, transparent)`
						: `0 0 8px color-mix(in oklch, ${color} 50%, transparent), 0 0 0 1.5px color-mix(in oklch, var(--sky-low) 60%, transparent)`,
				}}
				transition={{ type: 'spring', stiffness: 320, damping: 22 }}
			/>

			{/* Label callout — only when focused */}
			<AnimatePresence>
				{isFocused && (
					<motion.span
						initial={{ opacity: 0, x: -4 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -4 }}
						transition={{ duration: 0.2 }}
						className="pointer-events-none absolute left-[20px] top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-[2px] border bg-window-warm/95 px-2.5 py-1 backdrop-blur-sm whitespace-nowrap"
						style={{
							borderColor: `color-mix(in oklch, ${color} 50%, transparent)`,
							boxShadow: '0 6px 16px -6px rgba(0,0,0,0.25)',
						}}
					>
						<span className="font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-body-strong">
							{zone.name}
						</span>
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	)
}

/* ─── FocusedZoneCard — premium card matching DLDS aesthetic ─────────────── */

function FocusedZoneCard({ zone }: { zone: AtlasZone }) {
	const color = LANE_COLORS[zone.lane]
	const Icon = zone.icon

	return (
		<AnimatePresence mode="wait">
			<motion.article
				key={zone.id}
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -8 }}
				transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
				className="group flex flex-col overflow-hidden rounded-[3px] border bg-sky-low shadow-[0_30px_60px_-30px_rgba(0,0,0,0.30),0_8px_16px_-8px_rgba(0,0,0,0.12)]"
				style={{ borderColor: `color-mix(in oklch, ${color} 35%, var(--reflect))` }}
			>
				{/* Top banner — colored block with icon, mirrors DLDS card cover area */}
				<div
					className="relative flex h-32 items-center justify-center overflow-hidden md:h-36"
					style={{
						background: `radial-gradient(140% 80% at 0% 0%, color-mix(in oklch, ${color} 55%, transparent) 0%, color-mix(in oklch, ${color} 18%, var(--window-warm)) 70%, var(--window-warm) 100%)`,
					}}
				>
					{/* Engineering grid */}
					<svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-15">
						<defs>
							<pattern id={`grid-${zone.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
								<path
									d="M 24 0 L 0 0 0 24"
									fill="none"
									stroke="var(--platform-text-body-strong)"
									strokeWidth="0.5"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill={`url(#grid-${zone.id})`} />
					</svg>

					{/* Icon centerpiece */}
					<motion.div
						initial={{ scale: 0.7, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
						className="relative z-10 flex size-16 items-center justify-center rounded-full bg-sky-low/90 backdrop-blur-sm"
						style={{
							border: `1.5px solid ${color}`,
							boxShadow: `0 12px 30px -10px color-mix(in oklch, ${color} 50%, transparent)`,
						}}
					>
						<Icon className="size-7" style={{ color }} strokeWidth={1.6} />
					</motion.div>

					{/* Lane pigment strip — bottom-left */}
					<span
						aria-hidden="true"
						className="absolute bottom-0 left-0 h-1.5 transition-all duration-300 group-hover:h-2"
						style={{ backgroundColor: color, width: '38%' }}
					/>
				</div>

				{/* Body */}
				<div className="flex flex-col gap-3 p-5 md:p-6">
					<div className="flex items-baseline justify-between gap-3">
						<span
							className="flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.28em]"
							style={{ color }}
						>
							<span
								aria-hidden="true"
								className="block size-1.5 rounded-full"
								style={{ backgroundColor: color }}
							/>
							{zone.role}
						</span>
					</div>

					<h3
						className="font-narrative font-bold leading-[1.05] tracking-[-0.018em] text-body-strong"
						style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}
					>
						{zone.name}
					</h3>

					<p className="font-narrative text-[15px] leading-[1.55] text-body-strong">
						{zone.description}
					</p>

					{zone.entries && zone.entries.length > 0 && (
						<ul className="flex flex-col border-t border-body-strong/15 pt-3 mt-1">
							{zone.entries.map((entry) => (
								<li key={entry.href}>
									<a
										href={entry.href}
										className="group/entry flex items-baseline justify-between gap-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low rounded-sm"
									>
										<span
											className="font-narrative text-[15px] font-medium leading-tight text-body-strong transition-colors duration-150 group-hover/entry:text-accent-prime-active"
										>
											{entry.label}
										</span>
										<span className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
											{entry.meta && <span>{entry.meta}</span>}
											<motion.span
												aria-hidden="true"
												style={{ color }}
												className="inline-block"
												whileHover={{ x: 3 }}
											>
												→
											</motion.span>
										</span>
									</a>
								</li>
							))}
						</ul>
					)}

					<a
						href={zone.href}
						className="mt-2 inline-flex items-center gap-2 font-nav text-[12px] font-extrabold uppercase tracking-[0.22em] transition-all duration-200 hover:gap-3"
						style={{ color }}
					>
						Step inside the {zone.name.toLowerCase()}
						<ArrowRight className="size-3.5" strokeWidth={2.4} />
					</a>
				</div>
			</motion.article>
		</AnimatePresence>
	)
}

/* ─── ZoneIndexCard — interactive list with hover lift ─────────────────── */

function ZoneIndexCard({
	zones,
	focusId,
	setHoveredId,
}: {
	zones: AtlasZone[]
	focusId: string
	setHoveredId: (id: string | null) => void
}) {
	return (
		<div className="rounded-[3px] border border-body-strong/15 bg-sky-low p-4 md:p-5">
			<div className="flex items-baseline justify-between border-b border-body-strong/15 pb-2.5">
				<span
					className="font-mono text-[12px] font-bold uppercase tracking-[0.32em]"
					style={{ color: 'var(--platform-copper)' }}
				>
					All zones
				</span>
				<span className="font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
					Index · {zones.length}
				</span>
			</div>
			<ol className="mt-2 flex flex-col">
				{zones.map((zone, i) => {
					const isFocused = zone.id === focusId
					const color = LANE_COLORS[zone.lane]
					const Icon = zone.icon
					return (
						<li key={zone.id}>
							<motion.button
								type="button"
								onMouseEnter={() => setHoveredId(zone.id)}
								onMouseLeave={() => setHoveredId(null)}
								onFocus={() => setHoveredId(zone.id)}
								onBlur={() => setHoveredId(null)}
								onClick={() => {
									window.location.href = zone.href
								}}
								className="group/index grid w-full grid-cols-[2.25rem_auto_minmax(0,1fr)_auto] items-center gap-3 rounded-sm py-2.5 px-2 text-left outline-none transition-colors"
								animate={{
									backgroundColor: isFocused
										? `color-mix(in oklch, ${color} 10%, transparent)`
										: 'rgba(0,0,0,0)',
								}}
								whileHover={{ x: 3 }}
								transition={{ type: 'spring', stiffness: 300, damping: 24 }}
							>
								<span className="font-narrative italic text-[16px] leading-none text-body-muted">
									{(i + 1).toString().padStart(2, '0')}.
								</span>
								<div
									className="flex size-7 items-center justify-center rounded-full transition-all duration-200"
									style={{
										backgroundColor: isFocused
											? `color-mix(in oklch, ${color} 18%, transparent)`
											: 'transparent',
										border: `1px solid color-mix(in oklch, ${color} 40%, transparent)`,
									}}
								>
									<Icon className="size-3.5" style={{ color }} strokeWidth={1.8} />
								</div>
								<div className="min-w-0">
									<span
										className="block truncate font-narrative text-[15px] font-bold leading-tight"
										style={{
											color: isFocused
												? color
												: 'var(--platform-text-body-strong)',
											transition: 'color 0.2s',
										}}
									>
										{zone.name}
									</span>
									<p className="mt-0.5 truncate font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
										{zone.role}
									</p>
								</div>
								<motion.span
									aria-hidden="true"
									className="font-mono text-[12px] uppercase tracking-[0.22em]"
									style={{ color }}
									animate={{ x: isFocused ? 4 : 0 }}
									transition={{ type: 'spring', stiffness: 300, damping: 22 }}
								>
									→
								</motion.span>
							</motion.button>
						</li>
					)
				})}
			</ol>
		</div>
	)
}

/* ─── RecentDispatchesCard — mini card stack ─────────────────────────────── */

function RecentDispatchesCard({ articles }: { articles: ArticleEntry[] }) {
	return (
		<div className="rounded-[3px] border border-body-strong/15 bg-sky-low p-4 md:p-5">
			<div className="flex items-baseline justify-between border-b border-body-strong/15 pb-2.5">
				<span
					className="font-mono text-[12px] font-bold uppercase tracking-[0.32em]"
					style={{ color: 'var(--platform-copper)' }}
				>
					Recent dispatches
				</span>
				<a
					href="/article"
					className="font-nav text-[12px] font-extrabold uppercase tracking-[0.22em] text-accent-prime-active transition-all hover:gap-3 inline-flex items-center gap-2"
				>
					View all
					<ArrowRight className="size-3" strokeWidth={2.4} />
				</a>
			</div>
			<ul className="mt-2 flex flex-col divide-y divide-body-strong/10">
				{articles.slice(0, 4).map((a, i) => (
					<motion.li
						key={a.href}
						initial={{ opacity: 0, x: -4 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.3, delay: i * 0.04 }}
					>
						<motion.a
							href={a.href}
							className="group/recent flex items-baseline justify-between gap-3 py-3"
							whileHover={{ x: 3 }}
							transition={{ type: 'spring', stiffness: 320, damping: 24 }}
						>
							<div className="min-w-0">
								<p className="truncate font-narrative text-[14.5px] font-bold leading-tight text-body-strong group-hover/recent:text-accent-prime-active transition-colors">
									{a.title}
								</p>
								<p className="mt-0.5 truncate font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
									{a.kicker} · {a.dateLabel}
								</p>
							</div>
							<span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
								{a.readingTime}
							</span>
						</motion.a>
					</motion.li>
				))}
			</ul>
		</div>
	)
}

export type ArticleEntry = {
	href: string
	title: string
	kicker: string
	dek: string
	dateLabel: string
	readingTime: string
	lane: 'Human-led' | 'Hybrid' | 'AI-led'
}
