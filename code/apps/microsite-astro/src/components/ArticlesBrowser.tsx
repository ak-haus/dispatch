/**
 * ArticlesBrowser — DISpatch reading room.
 *
 * The /articles surface. Browsing experience for every dispatch in print.
 * Treats the article catalog like a magazine spread: filter by lane (DLDS),
 * sort by date, browse by media kind. Each card carries its real cover
 * media — image, video, or audio — and previews it in-place via the same
 * MediaSlot players used in Crossfire.
 *
 * Visual identity (DISpatch canon):
 *   - Vellum substrate, terracotta + graphite-blue + accent-prime palette
 *   - Vollkorn for headlines, Inter for body, JetBrains Mono for meta,
 *     Pangram Sans for nav
 *   - Lane pigment dot per article (Human-led / Hybrid / AI-led)
 *   - Cartographic backdrop accent in the hero
 *
 * Stack:
 *   - Filter by lane (Radix-style segmented control, motion layoutId pill)
 *   - Sort by date / reading time
 *   - Card hover lifts via motion (shadow + scale)
 *   - Video card autoplays muted on viewport entry; audio card shows waveform
 */

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { Play, Pause, Image as ImageIcon, Film, Headphones, Filter, Calendar } from 'lucide-react'
import { PALETTE } from './home/shared/palette'

/* ── Types ───────────────────────────────────────────────────────────────── */

export type ArticleListing = {
	id: string
	href: string
	title: string
	kicker: string
	dek: string
	author: { name: string; role: string }
	dateISO: string
	dateLabel: string
	readingTime: string
	lane: 'Human-led' | 'Hybrid' | 'AI-led'
	tags: readonly string[]
	hero?: {
		kind: 'image' | 'video' | 'audio'
		src: string
		poster?: string
		alt?: string
	}
}

type LaneFilter = 'all' | 'Human-led' | 'Hybrid' | 'AI-led'
type MediaFilter = 'all' | 'image' | 'video' | 'audio'
type SortOrder = 'date-desc' | 'date-asc' | 'reading-asc'

const LANE_COLORS: Record<ArticleListing['lane'], string> = {
	'Human-led': 'var(--lane-institutional)',
	'Hybrid': 'var(--platform-accent-prime)',
	'AI-led': 'var(--lane-editorial)',
}

/**
 * Lane pigments in the TEXT role (F53). LANE_COLORS above stays the display
 * register — the card's corner notch and the kicker dot, which are non-text
 * and governed by WCAG 1.4.11 (3:1). The card kicker and the Read affordance
 * are 12px bold, below the large-text threshold, so 1.4.3 (4.5:1) governs and
 * they need the role-scoped AA sibling: the editorial lane read 4.25:1 on the
 * card ground and reads 4.87:1 on the label rung. The other two lanes measured
 * passing in this role and are unchanged.
 */
const LANE_LABEL_COLORS: Record<ArticleListing['lane'], string> = {
	'Human-led': 'var(--lane-institutional)',
	'Hybrid': 'var(--platform-accent-prime)',
	'AI-led': 'var(--lane-editorial-label)',
}

const MEDIA_ICONS = {
	image: ImageIcon,
	video: Film,
	audio: Headphones,
} as const

/* ── Covers: the dispatch's own, or none ─────────────────────────────────── */
/* F61. Cards without a declared `hero` used to be handed one from a rotation
 * by list position — a video of the district map on some, dispatch-02's
 * banner on dispatch-04 and dispatch-01 — badged with a media kind and
 * filterable by it, under copy promising "the real cover media the dispatch
 * was published with". Every dispatch has a real cover the page never used:
 * its banner plate, the image its own page and its share card show. The page
 * now resolves each card's cover by that one rule (src/lib/share,
 * `dispatchCover`) and passes it in as `hero`. A dispatch with neither gets
 * no cover and no media claim — only the district plate as plain ground,
 * which is the page's own substrate, not a cover and never a colored box.
 * (The fourth rotation entry, an MP4 presented as audio, went at Build 32.) */
const HOUSE_PLATE = '/cartography/district.webp'

/* ── Main component ──────────────────────────────────────────────────────── */

export function ArticlesBrowser({ articles }: { articles: ArticleListing[] }) {
	const [laneFilter, setLaneFilter] = useState<LaneFilter>('all')
	const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all')
	const [sort, setSort] = useState<SortOrder>('date-desc')

	const filtered = useMemo(() => {
		const byLane = laneFilter === 'all' ? articles : articles.filter((a) => a.lane === laneFilter)
		// A card with no cover has no media kind, so no kind filter selects it.
		const byMedia =
			mediaFilter === 'all' ? byLane : byLane.filter((a) => a.hero?.kind === mediaFilter)
		const sorted = [...byMedia].sort((a, b) => {
			if (sort === 'date-desc') return b.dateISO.localeCompare(a.dateISO)
			if (sort === 'date-asc') return a.dateISO.localeCompare(b.dateISO)
			const ar = parseInt(a.readingTime, 10) || 0
			const br = parseInt(b.readingTime, 10) || 0
			return ar - br
		})
		return sorted
	}, [articles, laneFilter, mediaFilter, sort])

	/* Every media kind some card's own cover carries, in canonical order. */
	const mediaOptions = useMemo(() => {
		const present = new Set(articles.flatMap((a) => (a.hero ? [a.hero.kind] : [])))
		const ordered: Array<{ value: MediaFilter; label: string }> = [
			{ value: 'all', label: 'All' },
			{ value: 'image', label: 'Image' },
			{ value: 'video', label: 'Video' },
			{ value: 'audio', label: 'Audio' },
		]
		return ordered.filter((o) => o.value === 'all' || present.has(o.value as 'image' | 'video' | 'audio'))
	}, [articles])

	const counts = useMemo(() => {
		const total = articles.length
		const byLane = articles.reduce(
			(acc, a) => {
				acc[a.lane] = (acc[a.lane] ?? 0) + 1
				return acc
			},
			{ 'Human-led': 0, Hybrid: 0, 'AI-led': 0 } as Record<ArticleListing['lane'], number>,
		)
		return { total, byLane }
	}, [articles])

	return (
		<MotionConfig reducedMotion="user">
			<section
				aria-label="DISpatch articles"
				className="relative w-full"
				style={{ backgroundColor: 'var(--sky-low)' }}
			>
				{/* HERO BAND */}
				<div className="relative overflow-hidden border-b border-body-strong/20">
					{/* Cartographic backdrop accent */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0"
					>
						<img
							src="/cartography/district.webp"
							alt=""
							className="absolute inset-0 h-full w-full object-cover"
							style={{ opacity: 0.15, filter: 'saturate(0.8) blur(0.5px)' }}
						/>
						<div
							className="absolute inset-0"
							style={{
								background:
									'linear-gradient(180deg, color-mix(in oklch, var(--sky-low) 60%, transparent) 0%, color-mix(in oklch, var(--sky-low) 95%, transparent) 100%)',
							}}
						/>
					</div>

					<div className="relative px-4 pt-12 pb-8 sm:px-6 md:px-10 md:pt-20 md:pb-12">
						<div className="mx-auto max-w-[1880px]">
							<div className="flex items-baseline justify-between gap-4 border-b border-body-strong/25 pb-3">
								<div className="flex items-baseline gap-4">
									<span
										className="font-mono text-[12px] font-bold uppercase tracking-[0.42em]"
										style={{ color: 'var(--platform-copper)' }}
									>
										Articles
									</span>
									<span className="font-narrative italic text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[0.98] tracking-[-0.018em] text-body-strong">
										The reading room
									</span>
								</div>
								<span className="hidden items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted md:flex">
									{counts.total} {counts.total === 1 ? 'dispatch' : 'dispatches'} · in print
								</span>
							</div>

							<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:gap-10">
								<h1
									className="font-narrative font-bold leading-[0.96] tracking-[-0.022em] text-body-strong"
									style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}
								>
									Every dispatch issued from{' '}
									<em className="not-italic" style={{ color: 'var(--platform-accent-prime)' }}>
										inside
									</em>{' '}
									Prime City.
								</h1>
								<p
									className="self-end font-narrative text-[clamp(1rem,1.2vw,1.1875rem)] leading-[1.55] text-body-muted"
								>
									Browse the catalog by lane, by media, by reading time. Each card shows the real
									cover media the dispatch was published with — image, video, or audio — playable
									in place. Click any card to step inside the dispatch.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* FILTER BAR */}
				<div className="sticky top-[58px] z-40 border-b border-body-strong/15 backdrop-blur-md md:top-[64px]" style={{ backgroundColor: 'color-mix(in oklch, var(--sky-low) 92%, transparent)' }}>
					<div className="mx-auto flex max-w-[1880px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6 md:px-10">
						<FilterGroup
							icon={Filter}
							label="Lane"
							options={[
								{ value: 'all', label: `All · ${counts.total}` },
								{ value: 'Human-led', label: `Human · ${counts.byLane['Human-led']}` },
								{ value: 'Hybrid', label: `Hybrid · ${counts.byLane.Hybrid}` },
								{ value: 'AI-led', label: `AI · ${counts.byLane['AI-led']}` },
							]}
							value={laneFilter}
							onChange={(v) => setLaneFilter(v as LaneFilter)}
							pillColor="lane"
						/>
						<FilterGroup
							icon={ImageIcon}
							label="Media"
							/* Derived, not declared: the filter may only offer kinds
							 * that some card actually carries, or it advertises an
							 * empty result as a category (F61). */
							options={mediaOptions}
							value={mediaFilter}
							onChange={(v) => setMediaFilter(v as MediaFilter)}
						/>
						<FilterGroup
							icon={Calendar}
							label="Sort"
							options={[
								{ value: 'date-desc', label: 'Newest' },
								{ value: 'date-asc', label: 'Oldest' },
								{ value: 'reading-asc', label: 'Shortest' },
							]}
							value={sort}
							onChange={(v) => setSort(v as SortOrder)}
						/>
						<span className="ml-auto font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted">
							Showing {filtered.length} of {counts.total}
						</span>
					</div>
				</div>

				{/* GRID */}
				<div className="px-4 py-10 sm:px-6 md:px-10 md:py-16">
					<div className="mx-auto max-w-[1880px]">
						{filtered.length === 0 ? (
							<EmptyState />
						) : (
							<motion.ol
								layout
								className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
							>
								<AnimatePresence mode="popLayout">
									{filtered.map((article, i) => (
										<ArticleCard key={article.id} article={article} hero={article.hero} index={i} />
									))}
								</AnimatePresence>
							</motion.ol>
						)}
					</div>
				</div>
			</section>
		</MotionConfig>
	)
}

/* ── FilterGroup — segmented control ────────────────────────────────────── */

function FilterGroup({
	icon: Icon,
	label,
	options,
	value,
	onChange,
	pillColor,
}: {
	icon: typeof Filter
	label: string
	options: { value: string; label: string }[]
	value: string
	onChange: (v: string) => void
	pillColor?: 'lane'
}) {
	return (
		/* F59 — WCAG 1.4.10 Reflow. The outer bar wrapped but each group did
		 * not, and this one's intrinsic width is 368px: `/article` measured
		 * scrollWidth 368 against innerWidth 320, broken from 320 to 367 and
		 * clean from 368. A row of filter pills is not one of SC 1.4.10's
		 * two-dimensional exceptions (maps, data tables, toolbars-in-view), so
		 * it reflows rather than scrolling sideways. */
		<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
			<span className="flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.28em] text-body-muted">
				<Icon className="size-3" strokeWidth={2} />
				{label}
			</span>
			<div className="flex flex-wrap gap-px rounded-full border border-body-strong/15 bg-window-warm/50 p-0.5">
				{options.map((opt) => {
					const active = opt.value === value
					return (
						<button
							key={opt.value}
							type="button"
							onClick={() => onChange(opt.value)}
							className={`relative rounded-full px-3 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.18em] transition-colors duration-200 ${
								active ? 'text-body-strong' : 'text-body-muted hover:text-body-strong'
							}`}
						>
							{active && (
								<motion.span
									layoutId={`filter-pill-${label}`}
									aria-hidden="true"
									className="absolute inset-0 rounded-full"
									style={{
										backgroundColor:
											pillColor === 'lane'
												? 'color-mix(in oklch, var(--platform-accent-prime) 14%, transparent)'
												: 'color-mix(in oklch, var(--platform-copper) 14%, transparent)',
										border: `1px solid color-mix(in oklch, ${
											pillColor === 'lane'
												? 'var(--platform-accent-prime)'
												: 'var(--platform-copper)'
										} 32%, transparent)`,
									}}
									transition={{ type: 'spring', stiffness: 380, damping: 32 }}
								/>
							)}
							<span className="relative z-10">{opt.label}</span>
						</button>
					)
				})}
			</div>
		</div>
	)
}

/* ── ArticleCard — one dispatch in the grid ─────────────────────────────── */

function ArticleCard({
	article,
	hero,
	index,
}: {
	article: ArticleListing
	/** The dispatch's own cover, or `undefined` when it has none. */
	hero: ArticleListing['hero']
	index: number
}) {
	const MediaIcon = hero ? MEDIA_ICONS[hero.kind] : null
	const laneColor = LANE_COLORS[article.lane]
	const laneLabelColor = LANE_LABEL_COLORS[article.lane]

	return (
		<motion.li
			layout
			data-ssr-reveal
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -8 }}
			transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: Math.min(index, 8) * 0.05 }}
			className="group"
		>
			<a
				href={article.href}
				className="flex h-full flex-col overflow-hidden rounded-[3px] border border-body-strong/15 bg-window-warm/30 outline-none transition-all duration-300 hover:-translate-y-1 hover:border-body-strong/30 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.30),0_8px_16px_-8px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low"
			>
				{/* Cover media — the dispatch's own, in a real player; or, with
				    no cover, the district plate as ground and no media claim. */}
				<div className="relative aspect-[16/10] overflow-hidden">
					{!hero ? (
						<HoverImage src={HOUSE_PLATE} alt="" />
					) : hero.kind === 'video' ? (
						<HoverVideo src={hero.src} poster={hero.poster} alt={hero.alt} />
					) : hero.kind === 'audio' ? (
						<MiniWaveform src={hero.src} />
					) : (
						<HoverImage src={hero.src} alt={hero.alt ?? ''} />
					)}

					{/* Media kind badge — only for a cover that has a kind */}
					{hero && MediaIcon && (
						<span
							className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[2px] border border-white/22 bg-black/45 px-2 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.26em] text-white/90 backdrop-blur-sm"
						>
							<MediaIcon className="size-3" strokeWidth={2.2} />
							{hero.kind}
						</span>
					)}

					{/* Lane pigment notch — bottom-left corner */}
					<span
						aria-hidden="true"
						className="absolute bottom-0 left-0 h-1.5 transition-all duration-300 group-hover:h-2"
						style={{ backgroundColor: laneColor, width: '38%' }}
					/>
				</div>

				{/* Body */}
				<div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
					<div className="flex items-baseline justify-between gap-3">
						<span
							className="flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.28em]"
							style={{ color: laneLabelColor }}
						>
							<span
								aria-hidden="true"
								className="block size-1.5 rounded-full"
								style={{ backgroundColor: laneColor }}
							/>
							{article.kicker}
						</span>
						<span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
							{article.dateLabel}
						</span>
					</div>

					<h3
						className="font-narrative font-bold leading-[1.08] tracking-[-0.018em] text-body-strong transition-colors duration-200 group-hover:text-accent-prime-active"
						style={{ fontSize: 'clamp(1.25rem, 1.6vw, 1.625rem)' }}
					>
						{article.title}
					</h3>

					<p className="line-clamp-3 font-narrative text-[14.5px] leading-[1.5] text-body-muted">
						{article.dek}
					</p>

					{article.tags && article.tags.length > 0 && (
						<div className="mt-1 flex flex-wrap gap-1.5">
							{article.tags.slice(0, 4).map((t) => (
								<span
									key={t}
									className="rounded-[2px] border border-body-strong/15 bg-sky-low/60 px-2 py-0.5 font-mono text-[12px] uppercase tracking-[0.18em] text-body-muted"
								>
									#{t}
								</span>
							))}
						</div>
					)}

					<div className="mt-auto flex items-center justify-between border-t border-body-strong/10 pt-3">
						<span className="font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
							{article.author.name} · {article.readingTime}
						</span>
						<span
							className="flex items-center gap-1.5 font-nav text-[12px] font-extrabold uppercase tracking-[0.22em] transition-all duration-200 group-hover:gap-2.5"
							style={{ color: laneLabelColor }}
						>
							Read
							<span aria-hidden="true">→</span>
						</span>
					</div>
				</div>
			</a>
		</motion.li>
	)
}

/* ── Media players ──────────────────────────────────────────────────────── */

function HoverImage({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="absolute inset-0 overflow-hidden">
			{/* Lazy: the grid sits below the hero band, and each card now
			    carries its own full plate rather than one shared image (F61). */}
			<img
				src={src}
				alt={alt}
				loading="lazy"
				decoding="async"
				className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
				draggable={false}
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						'linear-gradient(to top, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.08) 35%, transparent 60%)',
				}}
			/>
		</div>
	)
}

function HoverVideo({ src, poster }: { src: string; poster?: string; alt?: string }) {
	const videoRef = useRef<HTMLVideoElement>(null)
	/* The reduced-motion floor (F55 item 4, CD5 §2). Hovering started an
	 * infinitely looping video with no gate — the plainest case of WCAG 2.1
	 * SC 2.3.3, motion animation triggered by interaction. The poster frame
	 * stays, so the card still shows its cover art. */
	const reduceMotion = useReducedMotion()

	const onEnter = () => {
		if (reduceMotion) return
		const v = videoRef.current
		if (!v) return
		v.play().catch(() => undefined)
	}
	const onLeave = () => {
		const v = videoRef.current
		if (!v) return
		v.pause()
		v.currentTime = 0
	}

	return (
		<div
			className="absolute inset-0 overflow-hidden bg-black"
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
		>
			{/* Decorative cover art, removed from the accessibility tree (F54).
			    This player is hardcoded `muted` and loops a silent cartographic
			    texture behind a link that already carries its own name from the
			    card's kicker, title and dek — there is no audio content, so WCAG
			    1.2.2 (Captions, Prerecorded), which governs "prerecorded audio
			    content in synchronized media", does not apply. axe cannot detect
			    the absence of an audio track and so answers `video-caption`
			    INCOMPLETE on every <video> lacking a caption track; marking the
			    element decorative is what makes it determinate, and it is also
			    the honest description — captioning silence would add noise to
			    the link's name rather than information. `alt` is retained on the
			    prop for the image and audio branches, which do surface it. */}
			<video
				ref={videoRef}
				src={src}
				poster={poster}
				muted
				loop
				playsInline
				/* F65 — `preload="metadata"` cost the route two full 3.8MB
				 * transfers on load: Chrome opens a `bytes=0-` range for the
				 * metadata and the server answers with the whole file, which is
				 * ~167 seconds at Slow 3G's 51.2 KB/s on a primary nav
				 * destination ("Articles" lands here). Nothing needs the media
				 * before a hover, and the poster is already on the page — so
				 * load none of it until the hover that plays it. Under reduce we
				 * never play at all, so nothing is fetched there either. */
				preload="none"
				aria-hidden="true"
				className="absolute inset-0 h-full w-full object-cover"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						'linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.1) 35%, transparent 60%)',
				}}
			/>
			<div className="pointer-events-none absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-black/45 text-white/90 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
				<Play className="size-4 translate-x-[1px]" strokeWidth={2.2} fill="currentColor" />
			</div>
		</div>
	)
}

function MiniWaveform({ src }: { src: string }) {
	const [playing, setPlaying] = useState(false)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	const toggle = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (!audioRef.current) audioRef.current = new Audio(src)
		const a = audioRef.current
		if (a.paused) {
			a.play().catch(() => undefined)
			setPlaying(true)
		} else {
			a.pause()
			setPlaying(false)
		}
	}

	useEffect(() => () => audioRef.current?.pause(), [])

	const bars = Array.from({ length: 56 }, (_, i) => {
		const t = i / 56
		const env = Math.sin(t * Math.PI) * 0.7 + 0.3
		const noise =
			Math.sin(i * 1.7) * 0.15 + Math.sin(i * 2.9) * 0.1 + Math.sin(i * 0.6) * 0.2
		return Math.max(0.08, Math.min(1, env + noise))
	})

	return (
		<div
			className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-6"
			style={{ backgroundColor: PALETTE.warmInk }}
		>
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-30"
				style={{
					background:
						'radial-gradient(60% 50% at 50% 50%, color-mix(in oklch, var(--platform-accent-prime) 60%, transparent) 0%, transparent 80%)',
				}}
			/>
			<button
				type="button"
				onClick={toggle}
				aria-label={playing ? 'Pause audio' : 'Play audio'}
				className="relative z-10 flex size-14 items-center justify-center rounded-full transition-transform hover:scale-105"
				style={{
					backgroundColor: 'var(--platform-accent-prime)',
					boxShadow: '0 8px 24px -6px var(--platform-accent-prime)',
				}}
			>
				{playing ? (
					<Pause className="size-5 text-white" strokeWidth={2.4} fill="white" />
				) : (
					<Play className="size-5 translate-x-[2px] text-white" strokeWidth={2.4} fill="white" />
				)}
			</button>
			<div className="relative z-10 flex h-12 w-full items-center justify-center gap-[2px]">
				{bars.map((h, i) => (
					<span
						key={i}
						className="block w-[3px] rounded-sm transition-all duration-300"
						style={{
							height: `${h * 100}%`,
							backgroundColor:
								i / 56 < 0.42
									? 'var(--platform-accent-prime)'
									: 'rgba(255,255,255,0.22)',
						}}
					/>
				))}
			</div>
			{/* The duration here was the literal string "04:32" on every card
			    regardless of the asset (F61). A real one comes from the media
			    element; until a dispatch declares an audio hero there is none
			    to read, and inventing one is the defect. */}
			<span className="relative z-10 font-mono text-[12px] uppercase tracking-[0.3em] text-white/55">
				Audio dispatch
			</span>
		</div>
	)
}

/* ── Empty state ────────────────────────────────────────────────────────── */

function EmptyState() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 rounded-[3px] border-2 border-dashed border-body-strong/20 bg-window-warm/30 px-6 py-20 text-center">
			<span
				className="font-mono text-[12px] font-bold uppercase tracking-[0.32em]"
				style={{ color: 'var(--platform-copper)' }}
			>
				Nothing in this filter
			</span>
			<p className="max-w-[40ch] font-narrative text-[15px] leading-[1.5] text-body-strong">
				No dispatches match the current lane and media combination. Try a different filter — or
				reset to the full catalog.
			</p>
		</div>
	)
}

