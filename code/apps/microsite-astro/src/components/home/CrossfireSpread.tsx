/**
 * CrossfireSpread — full-viewport stacked dossier deck.
 *
 * SPEC (locked by AK 2026-05-13):
 *   1. Section fills the viewport — no cropping.
 *   2. A rolling collection of cards meant to look like a REAL-WORLD
 *      asset folder. As you scroll, you see one card fully each scroll.
 *   3. Other cards visible BEHIND like a stepped folder stack.
 *   4. Each card is split-view:
 *        LEFT  — beautiful content piece: real image / video / audio media
 *                with proper media players (poster + controls / waveform).
 *        RIGHT — full thumbnail of THAT SAME content in the SHAPE of
 *                the platform it was posted on (LinkedIn-shaped card,
 *                Instagram-shaped square, Hashnode/Dev article cards, etc.)
 *   5. Bottom caption — names the story and lists the platforms it's on.
 *   6. ONE story per day → published across:
 *        - DISpatch (the site)
 *        - Newsletter
 *        - LinkedIn
 *        - Hashnode
 *        - Dev.to
 *        - Instagram
 *      (NOT X or Bluesky.)
 *
 * DATA SHAPE (locked 2026-05-14, spec 2026-05-13):
 *   The editor owns Crossfire entirely from MDX frontmatter on the featured
 *   dispatch. The parent (EditorialDistrictMapHero) passes `story` and
 *   `surfaces` — this component renders dynamically. No fixtures live here.
 *   Visual identity (kicker descriptors, platform tints, labels) is locked
 *   per platform and applied via the SURFACE_PRESENTATION map; only the
 *   story + per-surface data (url, engagement, media, etc.) varies.
 *
 * Stack mechanics retained from the prior cycle: GSAP ScrollTrigger pin +
 * scrub through (N-1) viewport heights, paper-flip ease, clip-path mask
 * wipe on each card's exit, Lenis ↔ ScrollTrigger bridge.
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
	Mail,
	Heart,
	MessageCircle,
	MessageSquare,
	Repeat2,
	Send,
	Bookmark,
	ThumbsUp,
} from 'lucide-react'
import { PALETTE } from './shared/palette'

/* ─── Types ─────────────────────────────────────────────────────────────── */

type Platform = 'dispatch' | 'newsletter' | 'linkedin' | 'hashnode' | 'dev' | 'instagram'

type MediaKind = 'image' | 'video' | 'audio'

export type CrossfireMedia = {
	kind: MediaKind
	src: string
	poster?: string
	alt?: string
	caption?: string
}

export type CrossfireEngagement = {
	likes?: number
	comments?: number
	reposts?: number
	bookmarks?: number
	reactions?: number
}

/** The shape that comes off MDX frontmatter (one entry per platform card). */
export type CrossfireSurface = {
	kind: Platform
	url?: string
	handle?: string
	excerpt?: string
	caption?: string
	tags?: string[]
	issueNumber?: number
	subject?: string
	sentTo?: number
	engagement?: CrossfireEngagement
	media: CrossfireMedia
}

/** Story metadata used by every platform thumbnail. Built by the parent
 *  from the featured dispatch's frontmatter. */
export type CrossfireStory = {
	title: string
	dek: string
	author: string
	authorHandle: string
	authorRole: string
	date: string
	dateLabel: string
	readingTime: string
	siteUrl: string
}

/** Internal slot type — surface + presentation values resolved from
 *  SURFACE_PRESENTATION. Built once per render. */
type CrossfireSlot = CrossfireSurface & {
	kicker: string
	platformLabel: string
	tint: string
}

/* ─── Per-platform presentation (locked) ────────────────────────────────
 * Visual identity per surface kind. NOT editor-controllable — the
 * descriptor, tint, and label are brand canon. Editor only controls
 * which surfaces appear, their order, and what story content / media /
 * engagement each carries. */

const KICKER_DESCRIPTOR: Record<Platform, string> = {
	dispatch: 'The site',
	newsletter: 'The newsletter',
	linkedin: 'The LinkedIn post',
	hashnode: 'The Hashnode article',
	dev: 'The Dev.to article',
	instagram: 'The Instagram post',
}

const PLATFORM_LABEL: Record<Platform, string> = {
	dispatch: 'DISpatch',
	newsletter: 'Newsletter',
	linkedin: 'LinkedIn',
	hashnode: 'Hashnode',
	dev: 'Dev.to',
	instagram: 'Instagram',
}

const PLATFORM_TINT: Record<Platform, string> = {
	dispatch: PALETTE.accent,
	newsletter: PALETTE.copper,
	linkedin: 'oklch(0.42 0.10 245)',
	hashnode: 'oklch(0.50 0.15 256)',
	dev: 'oklch(0.18 0.02 60)',
	instagram: 'oklch(0.62 0.20 18)',
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

/* ─── Engagement honesty — metrics render ONLY from real frontmatter
 *     data. There are no render defaults: a surface without engagement
 *     shows its platform chrome without numbers. Fabricated metrics are
 *     forbidden (revival repair, 2026-06-11). */

function toSlot(surface: CrossfireSurface, index: number): CrossfireSlot {
	return {
		...surface,
		kicker: `${ROMAN[index] ?? String(index + 1)} · ${KICKER_DESCRIPTOR[surface.kind]}`,
		platformLabel: PLATFORM_LABEL[surface.kind],
		tint: PLATFORM_TINT[surface.kind],
	}
}

/* ═══════════════════════════════════════════════════════════════════════
 * CrossfireSpread — section composition + GSAP scroll timeline.
 * ═══════════════════════════════════════════════════════════════════════ */

export function CrossfireSpread({
	story,
	surfaces,
	dateLabel,
}: {
	story: CrossfireStory
	surfaces: CrossfireSurface[]
	dateLabel?: string
}) {
	const sectionRef = useRef<HTMLElement>(null)
	const pinRef = useRef<HTMLDivElement>(null)
	const counterRef = useRef<HTMLSpanElement>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	const slots: CrossfireSlot[] = surfaces.map(toSlot)
	const allPlatformLabels = slots.map((s) => s.platformLabel)

	useEffect(() => {
		let cancelled = false
		type LenisLite = {
			on: (e: 'scroll', cb: (l: { velocity: number; scroll: number }) => void) => void
			off?: (e: 'scroll', cb: (l: { velocity: number; scroll: number }) => void) => void
			raf?: (time: number) => void
		}
		type GsapContext = { revert: () => void }
		let ctx: GsapContext | null = null
		let lenisCb: ((l: { velocity: number; scroll: number }) => void) | null = null

		;(async () => {
			const [{ default: gsap }, { ScrollTrigger }, { CustomEase }] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger'),
				import('gsap/CustomEase'),
			])
			if (cancelled || !pinRef.current) return

			gsap.registerPlugin(ScrollTrigger, CustomEase)
			const flipEase = CustomEase.create('flip', 'M0,0 C0.34,0.06 0.5,1 1,1')

			const lenis = (window as Window & { __lenis?: LenisLite }).__lenis
			if (lenis) {
				lenisCb = () => ScrollTrigger.update()
				lenis.on('scroll', lenisCb)
				const lenisRaf = lenis.raf
				if (typeof lenisRaf === 'function') {
					gsap.ticker.add((time: number) => {
						lenisRaf.call(lenis, time * 1000)
					})
					gsap.ticker.lagSmoothing(0)
				}
			}

			ctx = gsap.context(() => {
				const cards = gsap.utils.toArray<HTMLElement>('.dossier-card')
				const N = cards.length
				if (N === 0) return

				gsap.set(cards, { clipPath: 'inset(0% 0% 0% 0%)' })

				/* Pin ONLY the deck container — title sits above, scrolls past
				   naturally before pin engages. start: 'top top' means the deck's
				   top edge meets the viewport's top edge, at which point pinning
				   starts and the card flip-away timeline begins. */
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: pinRef.current,
						start: 'top top',
						end: () => `+=${(N - 1) * window.innerHeight}`,
						pin: pinRef.current,
						pinSpacing: true,
						scrub: 0.8,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onUpdate: (self) => {
							const idx = Math.min(N - 1, Math.max(0, Math.round(self.progress * (N - 1))))
							if (counterRef.current) {
								counterRef.current.textContent = String(idx + 1).padStart(2, '0')
							}
							setActiveIndex(idx)
						},
					},
				})

				/* Dwell ratio — each card gets 45% of its scroll-unit as pure
				   breathing room before the flip starts. Lets fat-finger scrollers
				   land on a card without it instantly peeling away.
				   Per-card budget: 0–0.45 dwell, 0.45–1.0 flip animation. */
				const dwell = 0.45
				const flipDuration = 1 - dwell
				for (let i = 0; i < N - 1; i++) {
					tl.to(
						cards[i],
						{
							yPercent: -120,
							rotateX: -28,
							opacity: 0,
							clipPath: 'inset(0% 0% 100% 0%)',
							ease: flipEase,
							duration: flipDuration,
						},
						i + dwell,
					)
				}
			}, sectionRef)
		})()

		return () => {
			cancelled = true
			const lenis = (window as Window & { __lenis?: LenisLite }).__lenis
			if (lenis && lenisCb && lenis.off) lenis.off('scroll', lenisCb)
			ctx?.revert()
		}
	}, [])

	/* Empty-surfaces guard — if the featured dispatch hasn't declared a
	   crossfire block, the entire section hides. No placeholder, no faux
	   cards, no fixtures. The page composes around the absence. */
	if (slots.length === 0) return null

	const headline = story.title

	return (
		<section
			ref={sectionRef}
			aria-label="Crossfire — today's dispatch across surfaces"
			className="relative w-full border-t border-body-strong/15"
			style={{ backgroundColor: 'var(--sky-low)' }}
		>
			{/* TITLE BAND — normal flow ABOVE the pin area, scrolls past
			    naturally as the deck pins. NOT a <header> element to avoid the
			    global `body.dispatch-hero header { position: fixed }` rule that
			    pins the masthead chrome on the homepage hero. */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
				className="px-4 pt-12 pb-6 sm:px-6 md:px-10 md:pt-16 md:pb-8"
			>
				<div className="mx-auto flex max-w-[1880px] items-baseline justify-between gap-4 border-b border-body-strong/25 pb-3">
					<div className="flex items-baseline gap-4">
						<span
							className="font-mono text-[12px] font-bold uppercase tracking-[0.42em]"
							style={{ color: PALETTE.copper }}
						>
							Crossfire
						</span>
						<span className="font-narrative italic text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[0.98] tracking-[-0.018em] text-body-strong">
							One story · {slots.length === 1 ? 'one surface' : `${slots.length} surfaces`}
						</span>
					</div>
					<span className="hidden items-center gap-3 font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted md:flex">
						<span ref={counterRef} className="font-bold text-body-strong">
							01
						</span>
						<span>/</span>
						<span>{String(slots.length).padStart(2, '0')}</span>
						<span>·</span>
						<span>{dateLabel ?? story.dateLabel}</span>
					</span>
				</div>
			</motion.div>

			{/* PIN AREA — viewport-height container that holds the deck.
			    Pin engages when its top edge meets the viewport top; releases
			    after the timeline completes (N-1 viewport heights of scroll).
			    NO bottom rail — the per-card LIVE marker carries that signal. */}
			<div
				ref={pinRef}
				className="relative w-full overflow-hidden"
				style={{ height: '100svh', perspective: '1800px' }}
			>
				{/* DECK STACK — full-bleed: cards fill the pin area edge-to-edge,
				    every viewport size. No padding, no max-width, no aspect ratio
				    constraint. Media inside uses object-cover so it always covers
				    without distortion. */}
				<div className="absolute inset-0 z-10">
					<div className="relative h-full w-full">
						{slots.map((slot, i) => (
							<DossierCard
								key={`${slot.kind}-${i}`}
								slot={slot}
								index={i}
								total={slots.length}
								headline={headline}
								story={story}
								allPlatformLabels={allPlatformLabels}
								isActive={i === activeIndex}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

/* ═══════════════════════════════════════════════════════════════════════
 * DossierCard — folder card with split-view body and full caption.
 * ═══════════════════════════════════════════════════════════════════════ */

function DossierCard({
	slot,
	index,
	total,
	headline,
	story,
	allPlatformLabels,
	isActive,
}: {
	slot: CrossfireSlot
	index: number
	total: number
	headline: string
	story: CrossfireStory
	allPlatformLabels: string[]
	isActive: boolean
}) {
	const stackOffset = 22 // px per card behind — bigger so all 6 tab rows are visible
	const yShift = -(total - 1 - index) * stackOffset

	const viewOnHref = slot.url ?? `#${slot.kind}`

	return (
		<article
			className="dossier-card absolute inset-0 flex flex-col overflow-hidden rounded-[3px]"
			style={{
				transform: `translateY(${yShift}px)`,
				transformOrigin: '50% 0%',
				transformStyle: 'preserve-3d',
				zIndex: total - index,
				/* Paper substrate matches the masthead — sky-low (vellum-100). The
				   tab row and footer sit on this paper; the body is a full-bleed
				   banner image with the platform thumbnail overlaid on top. */
				backgroundImage: `
					repeating-linear-gradient(0deg, transparent 0px, transparent 2px, color-mix(in oklch, var(--platform-text-body-strong) 1.5%, transparent) 2px, color-mix(in oklch, var(--platform-text-body-strong) 1.5%, transparent) 3px),
					radial-gradient(140% 90% at 0% 0%, color-mix(in oklch, ${slot.tint} 8%, var(--sky-low)) 0%, var(--sky-low) 50%, color-mix(in oklch, ${slot.tint} 6%, var(--sky-low)) 100%)
				`,
				backgroundColor: 'var(--sky-low)',
				boxShadow:
					'0 50px 120px -32px rgba(0,0,0,0.50), 0 14px 32px -10px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
			}}
		>
			{/* TAB ROW — folder tab + per-card LIVE marker + dossier ID.
			    shrink-0 so it never collapses. The LIVE marker (red pulsing dot
			    + "LIVE" caps) is now per-card; the global bottom rail was
			    redundant and got removed. */}
			<div className="relative z-30 flex h-9 shrink-0 items-stretch">
				<div
					className="flex shrink-0 items-center pl-5 pr-7"
					style={{
						backgroundColor: slot.tint,
						clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0 100%)',
						boxShadow: '0 4px 12px -4px rgba(0,0,0,0.32)',
					}}
				>
					<span
						className="font-mono text-[12px] font-bold uppercase tracking-[0.3em]"
						style={{ color: 'oklch(0.99 0.005 75)', textShadow: '0 1px 0 rgba(0,0,0,0.22)' }}
					>
						{slot.kicker}
					</span>
				</div>
				<div
					className="ml-2 flex-1 self-end border-b"
					style={{
						borderColor: `color-mix(in oklch, ${slot.tint} 28%, var(--reflect))`,
					}}
				/>
				<div className="flex shrink-0 items-center gap-3 self-end pb-1.5 pr-5">
					{/* Per-card LIVE marker — pulsing dot + caps */}
					<span className="flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.28em] text-body-strong">
						<span
							className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-prime-active"
							aria-hidden="true"
							style={{
								boxShadow:
									'0 0 0 2px color-mix(in oklch, var(--platform-accent-prime) 25%, transparent), 0 0 8px color-mix(in oklch, var(--platform-accent-prime) 55%, transparent)',
							}}
						>
							<span className="absolute inset-0 animate-ping rounded-full bg-accent-prime-active opacity-65" />
						</span>
						<span style={{ color: 'var(--platform-accent-prime-active)' }}>Live</span>
					</span>
					<span
						aria-hidden="true"
						className="block h-3 w-px"
						style={{ backgroundColor: 'color-mix(in oklch, var(--platform-text-body-strong) 25%, transparent)' }}
					/>
					<span className="font-mono text-[12px] font-bold uppercase tracking-[0.28em] text-body-strong">
						Dossier № {String(index + 1).padStart(2, '0')}
					</span>
					<span
						className="font-mono text-[12px] uppercase tracking-[0.22em]"
						style={{ color: slot.tint }}
					>
						{slot.platformLabel}
					</span>
				</div>
			</div>

			{/* BODY — full-bleed banner background with the platform thumbnail
			    overlaid on the right portion. The banner extends edge-to-edge;
			    the thumbnail floats over a slice of it. Caption strip below
			    sits on the sky-low paper substrate. */}
			<div className="relative flex flex-1 min-h-0 overflow-hidden">
				{/* Banner — full-bleed background */}
				<img
					src={slot.media.src}
					alt={slot.media.alt ?? ''}
					className="absolute inset-0 h-full w-full object-cover"
					draggable={false}
				/>

				{/* Right-side vignette so the thumbnail reads cleanly on top */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0"
					style={{
						background:
							'linear-gradient(to right, transparent 0%, transparent 35%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.32) 100%)',
					}}
				/>

				{/* Banner caption — bottom-left badge so the asset is identified */}
				{slot.media.caption && (
					<span className="absolute bottom-3 left-4 z-10 inline-flex items-center gap-2 rounded-[2px] border border-white/22 bg-black/45 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.26em] text-white/85 backdrop-blur-sm">
						{slot.media.caption}
					</span>
				)}

				{/* Overlay: platform thumbnail floats over the right portion of
				    the banner. Sized to ~38% of card width on lg+, smaller on md
				    so it doesn't crowd the banner art. */}
				<div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center px-4 md:px-8 lg:px-12">
					<div className="pointer-events-auto w-[clamp(280px,32vw,440px)]">
						<PlatformThumbnail
							slot={slot}
							headline={headline}
							story={story}
							isActive={isActive}
						/>
					</div>
				</div>
			</div>

			{/* CAPTION — story name + platform list. Footer paper matches the
			    masthead substrate (sky-low) so the dossier edges read as the
			    same paper stock as the site chrome. */}
			<footer
				className="relative z-20 shrink-0 border-t-2 border-dashed px-6 py-4 md:px-8"
				style={{
					borderColor: `color-mix(in oklch, ${slot.tint} 38%, transparent)`,
					backgroundColor: 'var(--sky-low)',
				}}
			>
				<div className="flex items-center justify-between gap-4">
					<div className="min-w-0 flex-1">
						<p
							className="font-narrative font-bold leading-[1.08] tracking-[-0.018em] text-body-strong"
							style={{ fontSize: 'clamp(1rem, 1.4vw, 1.375rem)' }}
						>
							{headline}
						</p>
						<p className="mt-1 truncate font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
							Posted today on{' '}
							{allPlatformLabels.map((p, idx) => (
								<span key={p}>
									<span
										style={{
											color:
												p === slot.platformLabel
													? slot.tint
													: 'var(--dispatch-text-body-muted)',
											fontWeight: p === slot.platformLabel ? 700 : 400,
										}}
									>
										{p}
									</span>
									{idx < allPlatformLabels.length - 1 && ' · '}
								</span>
							))}
						</p>
					</div>
					<a
						href={viewOnHref}
						className="group hidden shrink-0 items-center gap-2 font-nav text-[12px] font-extrabold uppercase tracking-[0.22em] transition-all duration-200 hover:gap-3 sm:inline-flex"
						style={{ color: slot.tint }}
					>
						View on {slot.platformLabel}
						<span className="transition-transform duration-200 group-hover:translate-x-0.5">
							→
						</span>
					</a>
				</div>
			</footer>
		</article>
	)
}

/* ═══════════════════════════════════════════════════════════════════════
 * PlatformThumbnail — full thumbnail in the SHAPE of the destination
 * platform. One variant per surface. Reads engagement + per-surface data
 * from the slot prop. Metrics render only when the frontmatter carries
 * real numbers; when engagement is absent the card keeps its platform
 * chrome and simply shows no metrics. No fabricated defaults.
 * ═══════════════════════════════════════════════════════════════════════ */

type PlatformProps = {
	slot: CrossfireSlot
	headline: string
	story: CrossfireStory
	isActive: boolean
}

function PlatformThumbnail(p: PlatformProps) {
	switch (p.slot.kind) {
		case 'dispatch':
			return <DispatchCard {...p} />
		case 'newsletter':
			return <NewsletterCard {...p} />
		case 'linkedin':
			return <LinkedInCard {...p} />
		case 'hashnode':
			return <HashnodeCard {...p} />
		case 'dev':
			return <DevCard {...p} />
		case 'instagram':
			return <InstagramCard {...p} />
	}
}

/* ── DispatchCard — magazine cover style ──────────────────────────────── */

function DispatchCard({ headline, story, slot }: PlatformProps) {
	return (
		<article
			className="flex h-full max-h-[460px] w-full max-w-[440px] flex-col overflow-hidden rounded-[2px] bg-sky-low shadow-[0_18px_50px_-20px_rgba(0,0,0,0.32)]"
			style={{ border: '1px solid color-mix(in oklch, var(--platform-text-body-strong) 12%, transparent)' }}
		>
			<div className="flex items-baseline justify-between border-b border-body-strong/15 px-4 py-2.5">
				<span className="font-mono text-[12px] font-semibold uppercase tracking-[0.32em] text-body-strong">
					<span className="text-wordmark-dis">DIS</span>
					<span className="text-wordmark-patch">patch</span>
					<span className="text-body-muted"> · {story.dateLabel}</span>
				</span>
				<span className="font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted">
					Vol.&nbsp;01
				</span>
			</div>
			<div className="relative aspect-[16/9] overflow-hidden">
				<img
					src={slot.media.poster ?? slot.media.src}
					alt=""
					className="absolute inset-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
			</div>
			<div className="flex flex-1 flex-col gap-2 p-4">
				<span
					className="font-mono text-[12px] font-bold uppercase tracking-[0.32em]"
					style={{ color: PALETTE.accent }}
				>
					Editorial District · today
				</span>
				<h3
					className="font-narrative font-bold leading-[1.08] tracking-[-0.018em] text-body-strong"
					style={{ fontSize: 'clamp(1.0625rem, 1.4vw, 1.375rem)' }}
				>
					{headline}
				</h3>
				<p className="line-clamp-3 font-narrative text-[12.5px] leading-[1.5] text-body-muted">
					<span
						className="float-left mr-1 mt-1 font-narrative text-[28px] font-bold leading-[0.85]"
						style={{ color: PALETTE.accent }}
					>
						{story.dek.charAt(0)}
					</span>
					{story.dek.slice(1)}
				</p>
				<div className="mt-auto flex items-center justify-between border-t border-body-strong/10 pt-2">
					<span className="font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
						{story.author} · {story.readingTime}
					</span>
					<span
						className="font-nav text-[12px] font-extrabold uppercase tracking-[0.22em]"
						style={{ color: PALETTE.accent }}
					>
						Read →
					</span>
				</div>
			</div>
		</article>
	)
}

/* ── NewsletterCard — email envelope style ────────────────────────────── */

function NewsletterCard({ headline, story, slot }: PlatformProps) {
	const subject = slot.subject ?? headline
	const sentTo = slot.sentTo
	const sentToLabel = sentTo
		? `you · ${(sentTo / 1000).toFixed(sentTo % 1000 === 0 ? 0 : 1)}k subscribers`
		: 'you'
	return (
		<article
			className="flex h-full max-h-[480px] w-full max-w-[400px] flex-col overflow-hidden rounded-[6px] bg-sky-low shadow-[0_18px_50px_-20px_rgba(0,0,0,0.32)]"
			style={{ border: '1px solid color-mix(in oklch, var(--platform-text-body-strong) 12%, transparent)' }}
		>
			{/* Mail header */}
			<div className="border-b border-body-strong/12 bg-window-warm/40 px-4 py-2.5">
				<div className="flex items-center gap-2">
					<Mail className="size-3.5 shrink-0" style={{ color: PALETTE.copper }} strokeWidth={2.2} />
					<span className="truncate font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-body-strong">
						DISpatch · daily dispatch
					</span>
				</div>
				<div className="mt-1.5 grid grid-cols-[44px_1fr] gap-x-2 font-mono text-[12px] text-body-muted">
					<span>From</span>
					<span className="truncate text-body-strong">dispatches@prime.city</span>
					<span>To</span>
					<span className="truncate">{sentToLabel}</span>
					<span>Subj</span>
					<span className="truncate font-semibold text-body-strong">{subject}</span>
				</div>
			</div>
			{/* Hero image */}
			<div className="relative aspect-[16/9] overflow-hidden">
				<img src={slot.media.poster ?? slot.media.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
			</div>
			{/* Body */}
			<div className="flex flex-1 flex-col gap-2 p-4">
				<h3 className="font-narrative font-bold leading-[1.1] tracking-[-0.018em] text-body-strong" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}>
					{headline}
				</h3>
				<p className="line-clamp-3 font-body text-[12.5px] leading-[1.5] text-body-muted">{story.dek}</p>
				<a
					href={slot.url ?? '#read'}
					className="mt-auto inline-flex w-fit items-center gap-2 rounded-[3px] px-3 py-2 font-nav text-[12px] font-extrabold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90"
					style={{ backgroundColor: PALETTE.copperDeep }}
				>
					Read the dispatch
					<span aria-hidden="true">→</span>
				</a>
				<div className="flex items-center justify-between pt-1 font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
					<span>{story.dateLabel}</span>
					<span>Unsubscribe</span>
				</div>
			</div>
		</article>
	)
}

/* ── LinkedInCard — exact LinkedIn post shape ─────────────────────────── */

function LinkedInCard({ headline, story, slot }: PlatformProps) {
	const linkedinBlue = 'oklch(0.42 0.10 245)'
	const e = slot.engagement
	const excerpt = slot.excerpt ?? story.dek
	return (
		<article
			className="flex h-full max-h-[520px] w-full max-w-[440px] flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.32)]"
			style={{ border: '1px solid #e0e0e0', color: '#1d1d1d' }}
		>
			<div className="flex items-center gap-3 px-4 pt-3">
				<div
					className="flex size-12 shrink-0 items-center justify-center rounded-full font-bold text-white"
					style={{
						background: `linear-gradient(135deg, ${linkedinBlue} 0%, var(--platform-accent-prime) 100%)`,
					}}
				>
					AK
				</div>
				<div className="min-w-0 flex-1">
					<p className="truncate text-[14px] font-semibold leading-tight">{story.author}</p>
					<p className="truncate text-[12px] leading-tight text-[#666]">{story.authorRole}</p>
					<p className="truncate text-[12px] leading-tight text-[#666]">today · 🌐</p>
				</div>
				<button className="rounded-[3px] px-3 py-1 text-[13px] font-semibold" style={{ color: linkedinBlue, border: `1px solid ${linkedinBlue}` }}>
					+ Follow
				</button>
			</div>
			<p className="line-clamp-3 px-4 pt-3 text-[14px] leading-[1.4] text-[#1d1d1d]">
				{headline} — {excerpt}
			</p>
			<div className="relative mt-3 aspect-[16/9] overflow-hidden">
				<img src={slot.media.poster ?? slot.media.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
			</div>
			{e && (
				<div className="flex items-center justify-between border-y border-[#e0e0e0] bg-[#f3f2ef] px-4 py-1.5 text-[12px] text-[#666]">
					<span className="flex items-center gap-1">
						<span className="inline-flex size-4 items-center justify-center rounded-full bg-[#0a66c2] text-[8px] text-white">
							👍
						</span>
						{typeof e.likes === 'number' && (
							<span>{story.author} and {e.likes} others</span>
						)}
					</span>
					<span>
						{typeof e.comments === 'number' && `${e.comments} comments`}
						{typeof e.comments === 'number' && typeof e.reposts === 'number' && ' · '}
						{typeof e.reposts === 'number' && `${e.reposts} reposts`}
					</span>
				</div>
			)}
			<div className="grid grid-cols-4 px-2 py-1.5">
				{[
					{ icon: ThumbsUp, label: 'Like' },
					{ icon: MessageSquare, label: 'Comment' },
					{ icon: Repeat2, label: 'Repost' },
					{ icon: Send, label: 'Send' },
				].map(({ icon: Icon, label }) => (
					<button
						key={label}
						type="button"
						className="flex items-center justify-center gap-1.5 rounded-[3px] py-2 text-[12px] font-semibold text-[#5e5e5e] transition-colors hover:bg-[#f3f2ef]"
					>
						<Icon className="size-4" strokeWidth={1.8} />
						{label}
					</button>
				))}
			</div>
		</article>
	)
}

/* ── HashnodeCard — Hashnode article card shape ───────────────────────── */

function HashnodeCard({ headline, story, slot }: PlatformProps) {
	const hashnodeBlue = 'oklch(0.55 0.16 256)'
	const e = slot.engagement
	const tags = slot.tags ?? ['prime-city', 'dev-diary', 'construction']
	return (
		<article
			className="flex h-full max-h-[510px] w-full max-w-[420px] flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.32)]"
			style={{ border: '1px solid #e6e8eb', color: '#1a1a1a' }}
		>
			<div className="relative aspect-[16/9] overflow-hidden bg-[#f4f5f7]">
				<img src={slot.media.poster ?? slot.media.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
			</div>
			<div className="flex flex-1 flex-col gap-3 p-5">
				<div className="flex items-center gap-2">
					<div
						className="flex size-8 items-center justify-center rounded-full text-[12px] font-bold text-white"
						style={{ backgroundColor: hashnodeBlue }}
					>
						AK
					</div>
					<div className="min-w-0 flex-1 leading-tight">
						<p className="truncate text-[13px] font-semibold text-[#1a1a1a]">
							{story.author}
						</p>
						<p className="truncate text-[12px] text-[#677182]">primecity.hashnode.dev · {story.dateLabel}</p>
					</div>
				</div>
				<h3 className="font-narrative text-[20px] font-bold leading-[1.15] tracking-[-0.01em]">
					{headline}
				</h3>
				<p className="line-clamp-2 text-[13.5px] leading-[1.5] text-[#677182]">{story.dek}</p>
				<div className="flex flex-wrap gap-1.5">
					{tags.slice(0, 3).map((t) => (
						<span
							key={t}
							className="rounded-full px-2.5 py-1 text-[12px]"
							style={{ backgroundColor: '#f4f5f7', color: hashnodeBlue }}
						>
							#{t}
						</span>
					))}
				</div>
				<div className="mt-auto flex items-center gap-4 border-t border-[#e6e8eb] pt-3 text-[12px] text-[#677182]">
					{typeof e?.likes === 'number' && (
						<span className="flex items-center gap-1">
							<Heart className="size-4" strokeWidth={2} /> {e.likes}
						</span>
					)}
					{typeof e?.comments === 'number' && (
						<span className="flex items-center gap-1">
							<MessageCircle className="size-4" strokeWidth={2} /> {e.comments}
						</span>
					)}
					{typeof e?.bookmarks === 'number' && (
						<span className="flex items-center gap-1">
							<Bookmark className="size-4" strokeWidth={2} /> {e.bookmarks}
						</span>
					)}
					<span className="ml-auto">{story.readingTime}</span>
				</div>
			</div>
		</article>
	)
}

/* ── DevCard — Dev.to article card shape ──────────────────────────────── */

function DevCard({ headline, story, slot }: PlatformProps) {
	const devBlack = '#0a0a0a'
	const e = slot.engagement
	const tags = slot.tags ?? ['devjournal', 'primecity', 'construction', 'scrollytelling']
	return (
		<article
			className="flex h-full max-h-[520px] w-full max-w-[420px] flex-col overflow-hidden rounded-[6px] bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.32)]"
			style={{ border: '1px solid #e7e7e7', color: devBlack }}
		>
			<div className="relative aspect-[1000/420] overflow-hidden">
				<img src={slot.media.poster ?? slot.media.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
			</div>
			<div className="flex flex-1 flex-col gap-2 p-5">
				<div className="flex items-center gap-2">
					<div
						className="flex size-8 items-center justify-center rounded-full text-[12px] font-bold text-white"
						style={{ background: 'linear-gradient(135deg, var(--platform-accent-prime) 0%, var(--platform-copper) 100%)' }}
					>
						AK
					</div>
					<div className="leading-tight">
						<p className="text-[13px] font-medium text-[#3d3d3d]">{story.author}</p>
						<p className="text-[12px] text-[#717171]">Posted on {story.dateLabel.toLowerCase()}</p>
					</div>
				</div>
				<h3 className="font-narrative text-[22px] font-bold leading-[1.12] tracking-[-0.01em] text-[#0a0a0a]">
					{headline}
				</h3>
				<div className="flex flex-wrap gap-1">
					{tags.slice(0, 4).map((t) => (
						<span key={t} className="rounded-md px-2 py-0.5 text-[12px] text-[#3d3d3d] hover:bg-[#f1f1f1]">
							#{t}
						</span>
					))}
				</div>
				<div className="mt-auto flex items-center justify-between pt-2 text-[12px] text-[#717171]">
					<div className="flex items-center gap-3">
						{typeof e?.reactions === 'number' && (
							<span className="flex items-center gap-1">
								<Heart className="size-4" strokeWidth={1.8} /> {e.reactions} reactions
							</span>
						)}
						{typeof e?.comments === 'number' && (
							<span className="flex items-center gap-1">
								<MessageCircle className="size-4" strokeWidth={1.8} /> {e.comments}
							</span>
						)}
					</div>
					<div className="flex items-center gap-3">
						<span>{story.readingTime}</span>
						<Bookmark className="size-4" strokeWidth={1.8} />
					</div>
				</div>
			</div>
		</article>
	)
}

/* ── InstagramCard — square IG post shape ─────────────────────────────── */

function InstagramCard({ headline, story, slot }: PlatformProps) {
	const e = slot.engagement
	const igHandle = slot.handle ?? 'dispatch.prime'
	const igCaption = slot.caption ?? headline
	return (
		<article
			className="flex h-full max-h-[560px] w-full max-w-[400px] flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.32)]"
			style={{ border: '1px solid #dbdbdb', color: '#262626' }}
		>
			{/* Header */}
			<div className="flex items-center gap-3 px-3 py-2.5">
				<div
					className="rounded-full p-[2px]"
					style={{
						background:
							'conic-gradient(from 180deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #f09433)',
					}}
				>
					<div className="flex size-8 items-center justify-center rounded-full bg-white">
						<div
							className="flex size-7 items-center justify-center rounded-full text-[12px] font-bold text-white"
							style={{ background: 'linear-gradient(135deg, #c13584 0%, #f56040 100%)' }}
						>
							DP
						</div>
					</div>
				</div>
				<div className="flex-1 leading-tight">
					<p className="text-[13.5px] font-semibold">{igHandle}</p>
					<p className="text-[12px] text-[#737373]">Editorial District · Prime City</p>
				</div>
				<button className="text-[18px] leading-none text-[#262626]" aria-label="More">
					⋯
				</button>
			</div>
			{/* Square media — IG-shaped 1:1 */}
			<div className="relative aspect-square overflow-hidden bg-black">
				{slot.media.kind === 'video' ? (
					<>
						<video
							src={slot.media.src}
							poster={slot.media.poster}
							autoPlay
							loop
							muted
							playsInline
							className="absolute inset-0 h-full w-full object-cover"
						/>
						<span className="absolute right-2.5 top-2.5 rounded-md bg-black/55 px-1.5 py-0.5 font-mono text-[12px] font-bold uppercase tracking-wider text-white">
							Reel
						</span>
					</>
				) : (
					<img src={slot.media.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
				)}
			</div>
			{/* Action row */}
			<div className="flex items-center gap-3 px-3 pt-2">
				<Heart className="size-6 cursor-pointer transition-colors hover:text-[#737373]" strokeWidth={1.8} />
				<MessageCircle className="size-6 cursor-pointer" strokeWidth={1.8} />
				<Send className="size-6 cursor-pointer -rotate-15" strokeWidth={1.8} />
				<Bookmark className="ml-auto size-6 cursor-pointer" strokeWidth={1.8} />
			</div>
			{/* Likes + caption */}
			<div className="px-3 pb-3 pt-1">
				{e && typeof e.likes === 'number' && (
					<p className="text-[13px] font-semibold">{e.likes.toLocaleString('en-US')} likes</p>
				)}
				<p className="mt-1 line-clamp-2 text-[13px] leading-[1.4]">
					<span className="font-semibold">{igHandle}</span> {igCaption} {story.dek.slice(0, 80)}…
				</p>
				<p className="mt-1 text-[12px] uppercase text-[#737373]">{story.dateLabel}</p>
			</div>
		</article>
	)
}
