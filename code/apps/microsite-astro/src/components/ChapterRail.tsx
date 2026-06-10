/**
 * DISpatch ChapterRail — production component per spec.md.
 *
 * Authority chain:
 *   1. representation/visual-system/components/ChapterRail/spec.md (CD4 spec)
 *   2. representation/visual-system/color.md (token canon)
 *   3. cd2-color-amendment-proposal.md (Mayor-locked; wins on conflict)
 *
 * Four variants (spec Field 2):
 *   article-default             — fixed left rail (xl+) + mobile chip/sheet (below xl)
 *   article-collapsed           — current chapter name + collapse toggle
 *   article-mobile-bottom-sheet — bottom chip + dialog (standalone mobile)
 *   reception-condensed         — inline compact preview, no scroll tracking
 *
 * Token consumption (spec Field 7 → existing Tailwind utilities):
 *   chrome.text         → text-copper            (--platform-copper)
 *   chrome.text.hover   → text-copper-deep       (--platform-copper-deep)
 *   chrome.text.active  → text-accent-prime-active (--platform-accent-prime-active)
 *   chrome.indicator    → bg-accent-prime-active
 *   atmosphere.sky-low  → bg-sky-low             (--sky-low / --dispatch-vellum-100)
 *   type.nav.500        → font-nav font-extrabold (Nav slot, Pangram Sans 800)
 *   type.nav.400        → font-nav font-medium
 *
 * Scroll (spec Field 5 + launch-state §Critical patterns #6):
 *   Subscribes to window.__lenis when present (single-rAF, no new loop).
 *   Falls back to native passive scroll event on reduced-motion path
 *   (Lenis does not initialize when prefers-reduced-motion is set).
 *
 * Accessibility (spec Field 4):
 *   <nav aria-label="Article chapters"> landmark
 *   aria-current="location" on the in-view chapter link
 *   aria-controls + aria-expanded on collapse toggle
 *   Native <dialog> for mobile sheet: focus trap + aria-modal free from browser
 *   Escape closes sheet via native cancel event (wired in parent ChapterRail)
 *   Backdrop click closes sheet
 */

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

const SCROLL_THRESHOLD = 80 // px — chapter activates when header passes this far above viewport top

/* ============================================================================
 * Public types
 * ========================================================================== */

export type Chapter = {
	slug: string
	text: string
	depth: number
}

export type ChapterRailVariant =
	| 'article-default'
	| 'article-collapsed'
	| 'article-mobile-bottom-sheet'
	| 'reception-condensed'

export type ChapterRailProps = {
	variant?: ChapterRailVariant
	chapters: Chapter[]
	/** Controlled active chapter index (0-based). Overrides scroll detection. For Storybook/testing. */
	currentChapter?: number
	/** Href prefix for reception-condensed mode cross-page links (e.g. '/article'). */
	articleHref?: string
	className?: string
}

/* ============================================================================
 * Minimal Lenis type — window.__lenis is set by StackLayout's <script>.
 * Typed to what ChapterRail needs; avoids importing 'lenis' into client code.
 * ========================================================================== */

type MinimalLenis = {
	on(event: 'scroll', cb: () => void): void
	off(event: 'scroll', cb: () => void): void
	scrollTo(
		target: HTMLElement | number,
		opts?: { duration?: number; offset?: number; easing?: (t: number) => number },
	): void
}

function getLenis(): MinimalLenis | undefined {
	return typeof window !== 'undefined'
		? (window as Window & { __lenis?: MinimalLenis }).__lenis
		: undefined
}

/* ============================================================================
 * ChapterRail — main export
 * ========================================================================== */

export function ChapterRail({
	variant = 'article-default',
	chapters,
	currentChapter,
	articleHref = '',
	className,
}: ChapterRailProps) {
	const reducedMotion = useReducedMotion()
	const isControlled = currentChapter !== undefined
	const [activeIndex, setActiveIndex] = useState(currentChapter ?? 0)
	const [progress, setProgress] = useState(0) // 0..1 — copper fill height
	const [sheetOpen, setSheetOpen] = useState(false)
	const [expanded, setExpanded] = useState(false)
	const dialogRef = useRef<HTMLDialogElement>(null)

	// Sync controlled prop (Storybook / testing)
	useEffect(() => {
		if (isControlled) setActiveIndex(currentChapter!)
	}, [currentChapter, isControlled])

	// Scroll-linked detection: active chapter + reading progress.
	//
	// Viewport-aware tracking (per AK 2026-05-14): when the reader has
	// scrolled to within 80px of the document bottom, force the LAST chapter
	// active — even if its heading hasn't passed the SCROLL_THRESHOLD. This
	// handles the edge case where the last two chapters are short and visible
	// together at the bottom of the page; without this rule the rail would
	// stick on the penultimate chapter forever.
	useEffect(() => {
		if (variant === 'reception-condensed') return
		if (isControlled) return

		const detect = () => {
			const scrollY = window.scrollY
			const docHeight = document.documentElement.scrollHeight
			const viewHeight = window.innerHeight

			// Reading progress — relative to the article body when present,
			// otherwise to the whole document.
			const article = document.getElementById('dispatch-article')
			if (article) {
				const articleTop = article.getBoundingClientRect().top + scrollY
				const articleScrollable = Math.max(1, article.offsetHeight - viewHeight * 0.5)
				const p = Math.max(0, Math.min(1, (scrollY - articleTop + viewHeight * 0.3) / articleScrollable))
				setProgress(p)
			} else {
				setProgress(Math.max(0, Math.min(1, scrollY / Math.max(1, docHeight - viewHeight))))
			}

			// Edge case: at the bottom of the page → last chapter wins.
			if (scrollY + viewHeight >= docHeight - 80) {
				setActiveIndex(chapters.length - 1)
				return
			}

			// Standard scrollspy — most-recent heading whose top has passed
			// the SCROLL_THRESHOLD from the viewport top.
			let idx = 0
			for (let i = 0; i < chapters.length; i++) {
				const el = document.getElementById(chapters[i].slug)
				if (!el) continue
				const top = el.getBoundingClientRect().top + scrollY
				if (scrollY + SCROLL_THRESHOLD >= top) idx = i
			}
			setActiveIndex(idx)
		}

		const lenis = getLenis()
		if (lenis) {
			lenis.on('scroll', detect)
			detect()
			return () => lenis.off('scroll', detect)
		}

		window.addEventListener('scroll', detect, { passive: true })
		window.addEventListener('resize', detect, { passive: true })
		detect()
		return () => {
			window.removeEventListener('scroll', detect)
			window.removeEventListener('resize', detect)
		}
	}, [chapters, variant, isControlled])

	// Dialog open/close via showModal/close
	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return
		if (sheetOpen) {
			dialog.showModal()
		} else if (dialog.open) {
			dialog.close()
		}
	}, [sheetOpen])

	// Escape key via native cancel event
	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return
		const onCancel = () => setSheetOpen(false)
		dialog.addEventListener('cancel', onCancel)
		return () => dialog.removeEventListener('cancel', onCancel)
	}, [])

	const handleChapterJump = useCallback(
		(e: React.MouseEvent, slug: string, onAfter?: () => void) => {
			e.preventDefault()
			const target = document.getElementById(slug)
			if (!target) return
			onAfter?.()
			const lenis = getLenis()
			if (lenis && !reducedMotion) {
				lenis.scrollTo(target, {
					duration: 0.4,
					offset: -SCROLL_THRESHOLD,
					easing: (t) => t * (2 - t),
				})
			} else {
				target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })
			}
		},
		[reducedMotion],
	)

	if (variant === 'reception-condensed') {
		return (
			<ReceptionCondensed
				chapters={chapters}
				articleHref={articleHref}
				className={className}
			/>
		)
	}

	if (variant === 'article-collapsed') {
		return (
			<MotionConfig reducedMotion="user">
				<ArticleCollapsed
					chapters={chapters}
					activeIndex={activeIndex}
					expanded={expanded}
					onToggle={() => setExpanded((v) => !v)}
					onChapterJump={handleChapterJump}
					className={className}
				/>
			</MotionConfig>
		)
	}

	if (variant === 'article-mobile-bottom-sheet') {
		return (
			<>
				<MobileChip
					chapters={chapters}
					activeIndex={activeIndex}
					sheetOpen={sheetOpen}
					onOpen={() => setSheetOpen(true)}
					className={className}
				/>
				<MobileSheet
					ref={dialogRef}
					chapters={chapters}
					activeIndex={activeIndex}
					onClose={() => setSheetOpen(false)}
					onChapterJump={handleChapterJump}
				/>
			</>
		)
	}

	// article-default — thread-with-dots design (locked by AK 2026-05-14).
	//
	// Visual: a thin vertical thread runs the height of the rail. A copper
	// fill grows down the thread as the reader scrolls (= reading progress).
	// One dot per chapter, evenly spaced along the thread. The active
	// chapter's label is ALWAYS visible (anchored to the right of its dot).
	// Hovering the rail reveals every chapter's label.
	//
	// Layout: sticky inside parent (DispatchArticleLayout grid).
	//   collapsed — 32px wide; just the thread + dots + active label.
	//   expanded  — 280px wide on hover; all labels visible.
	// The article body's `mx-auto max-w-[72ch]` absorbs the expansion so the
	// reading column doesn't shift.

	return (
		<MotionConfig reducedMotion="user">
			<nav
				aria-label="Article chapters"
				id="chapter-rail"
				className={[
					'group',
					'hidden lg:block',
					/* Sticky inside its parent wrapper (DispatchArticleLayout
					   grid). top-24 = 6rem from viewport top; max-h leaves room
					   for the masthead. */
					'sticky top-24',
					'h-[min(70vh,520px)]',
					'w-[32px] hover:w-[280px] focus-within:w-[280px]',
					'transition-[width] duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
					className ?? '',
				]
					.filter(Boolean)
					.join(' ')}
			>
				{/* ── Thread (background) ─────────────────────────────────
				    1px vertical hairline running the full rail height. */}
				<div
					aria-hidden="true"
					className="absolute left-[15px] top-0 h-full w-px bg-body-strong/15"
				/>

				{/* ── Copper progress fill ────────────────────────────────
				    Grows from top with reading progress. This IS the bronze
				    reading-progress indicator (AK 2026-05-14). */}
				<motion.div
					aria-hidden="true"
					className="absolute left-[15px] top-0 w-px"
					style={{
						background:
							'linear-gradient(to bottom, var(--platform-copper) 0%, var(--platform-copper-deep) 100%)',
						boxShadow:
							'0 0 6px color-mix(in oklch, var(--platform-copper) 60%, transparent)',
					}}
					animate={{ height: `${progress * 100}%` }}
					transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.5 }}
				/>

				{/* ── Dots + labels ───────────────────────────────────────
				    Each chapter occupies an equal vertical slice of the rail.
				    Dots are absolutely centered within their slice; labels
				    sit to the right of the dot, fading in for the active
				    chapter (always) or on rail hover (all chapters). */}
				<ol className="relative flex h-full flex-col">
					{chapters.map((ch, i) => {
						const isActive = i === activeIndex
						const slicePos = (i + 0.5) / chapters.length // 0..1 normalized center
						return (
							<li
								key={ch.slug}
								className="relative flex-1"
							>
								<a
									href={`#${ch.slug}`}
									aria-current={isActive ? 'location' : undefined}
									onClick={(e) => handleChapterJump(e, ch.slug)}
									className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low rounded-sm pr-2 py-1"
								>
									{/* Dot */}
									<motion.span
										aria-hidden="true"
										className="relative block shrink-0 rounded-full"
										style={{
											marginLeft: '11px', // centers an 8px dot on the 15px-offset thread
										}}
										animate={{
											width: isActive ? 10 : 6,
											height: isActive ? 10 : 6,
											backgroundColor: isActive
												? 'var(--platform-accent-prime-active)'
												: 'var(--platform-copper)',
											boxShadow: isActive
												? '0 0 0 3px color-mix(in oklch, var(--platform-accent-prime) 22%, transparent), 0 0 12px color-mix(in oklch, var(--platform-accent-prime) 50%, transparent)'
												: '0 0 0 0px transparent',
										}}
										transition={{ type: 'spring', stiffness: 320, damping: 22 }}
									>
										{/* Pulsing ring on active dot */}
										{isActive && (
											<span
												aria-hidden="true"
												className="absolute inset-0 animate-ping rounded-full bg-accent-prime opacity-50"
											/>
										)}
									</motion.span>

									{/* Label — anchored beside the dot. Active label always
									    visible; others fade in on rail hover. */}
									<motion.span
										className="flex items-baseline gap-2 whitespace-nowrap font-nav text-[12px] uppercase tracking-[0.18em] leading-none"
										initial={false}
										animate={{
											opacity: isActive ? 1 : 0,
											x: isActive ? 0 : -4,
										}}
										style={{
											color: isActive
												? 'var(--platform-accent-prime-active)'
												: 'var(--platform-copper-deep)',
										}}
										transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
									>
										<span className="font-mono font-bold tabular-nums">
											{String(i + 1).padStart(2, '0')}
										</span>
										<span className="font-extrabold">/</span>
										<span className="font-extrabold">{ch.text}</span>
									</motion.span>

									{/* Hover-only label — for non-active chapters, fades in
									    when the user moves the cursor over the rail. Sits in
									    the same slot but with hover-controlled opacity. */}
									{!isActive && (
										<span className="pointer-events-none absolute left-[24px] top-1/2 -translate-y-1/2 flex items-baseline gap-2 whitespace-nowrap font-nav text-[12px] uppercase tracking-[0.18em] leading-none text-body-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
											<span className="font-mono font-bold tabular-nums text-body-faint">
												{String(i + 1).padStart(2, '0')}
											</span>
											<span className="text-body-faint">/</span>
											<span className="font-medium">{ch.text}</span>
										</span>
									)}
								</a>
							</li>
						)
					})}
				</ol>
			</nav>

			{/* Mobile chip + sheet — hidden at lg+ */}
			<div className="lg:hidden">
				<MobileChip
					chapters={chapters}
					activeIndex={activeIndex}
					sheetOpen={sheetOpen}
					onOpen={() => setSheetOpen(true)}
				/>
				<MobileSheet
					ref={dialogRef}
					chapters={chapters}
					activeIndex={activeIndex}
					onClose={() => setSheetOpen(false)}
					onChapterJump={handleChapterJump}
				/>
			</div>
		</MotionConfig>
	)
}

/* ============================================================================
 * ChapterList — shared ordered list of chapter anchor links
 * ========================================================================== */

type ChapterListProps = {
	chapters: Chapter[]
	activeIndex: number
	onChapterJump: (e: React.MouseEvent, slug: string, onAfter?: () => void) => void
	articleHref?: string
}

function ChapterList({ chapters, activeIndex, onChapterJump, articleHref = '' }: ChapterListProps) {
	return (
		<ol className="ml-6 space-y-2">
			{chapters.map((ch, i) => {
				const isActive = i === activeIndex
				return (
					<li key={ch.slug}>
						<a
							href={`${articleHref}#${ch.slug}`}
							aria-current={isActive ? 'location' : undefined}
							onClick={(e) => onChapterJump(e, ch.slug)}
							className={[
								'relative flex items-baseline gap-3 rounded-sm py-2 pr-2 outline-none',
								'font-narrative leading-[1.25] tracking-[-0.012em]',
								'transition-all duration-200 ease-out',
								'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
								isActive
									? 'text-accent-prime-active font-bold'
									: 'text-body-muted hover:text-body-strong hover:translate-x-1',
							].join(' ')}
						>
							<span
								aria-hidden="true"
								className={[
									'font-mono text-[12px] uppercase tracking-[0.18em] shrink-0',
									isActive ? 'text-accent-prime' : 'text-body-faint',
								].join(' ')}
							>
								{String(i + 1).padStart(2, '0')}
							</span>
							<span className="text-[0.9375rem] text-wrap whitespace-normal">
								{ch.text}
							</span>
						</a>
					</li>
				)
			})}
		</ol>
	)
}

/* ============================================================================
 * ArticleCollapsed — current chapter name + animated expand toggle
 * ========================================================================== */

function ArticleCollapsed({
	chapters,
	activeIndex,
	expanded,
	onToggle,
	onChapterJump,
	className,
}: {
	chapters: Chapter[]
	activeIndex: number
	expanded: boolean
	onToggle: () => void
	onChapterJump: (e: React.MouseEvent, slug: string, onAfter?: () => void) => void
	className?: string
}) {
	const currentLabel = chapters[activeIndex]?.text ?? 'Chapters'

	return (
		<div className={['w-full', className ?? ''].filter(Boolean).join(' ')}>
			<button
				type="button"
				aria-controls="chapter-rail-collapsed"
				aria-expanded={expanded}
				onClick={onToggle}
				className={[
					'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2',
					'border border-lane-institutional-strong/10 bg-sky-low',
					'font-nav text-[12px] font-extrabold uppercase tracking-[0.06em]',
					'outline-none transition-colors duration-200',
					'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
				].join(' ')}
			>
				<span className="flex min-w-0 items-center gap-2">
					<span
						aria-hidden="true"
						className="block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-prime-active"
					/>
					<span className="truncate text-accent-prime-active">{currentLabel}</span>
				</span>
				<span aria-hidden="true" className="shrink-0 text-[12px] text-body-faint">
					{expanded ? '▲' : '▼'}
				</span>
			</button>

			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						id="chapter-rail-collapsed"
						key="chapter-list"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						style={{ overflow: 'hidden' }}
					>
						<nav
							aria-label="Article chapters"
							className="mt-1 rounded-md border border-lane-institutional-strong/10 bg-sky-low px-3 py-2"
						>
							<ChapterList
								chapters={chapters}
								activeIndex={activeIndex}
								onChapterJump={(e, slug) => {
									onChapterJump(e, slug, () => onToggle())
								}}
							/>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

/* ============================================================================
 * MobileChip — fixed bottom-right pill showing current chapter
 * ========================================================================== */

function MobileChip({
	chapters,
	activeIndex,
	sheetOpen,
	onOpen,
	className,
}: {
	chapters: Chapter[]
	activeIndex: number
	sheetOpen: boolean
	onOpen: () => void
	className?: string
}) {
	const label = chapters[activeIndex]?.text ?? 'Chapters'

	return (
		<div className={['fixed bottom-6 right-4 z-40', className ?? ''].filter(Boolean).join(' ')}>
			<button
				type="button"
				aria-haspopup="dialog"
				aria-expanded={sheetOpen}
				aria-controls="chapter-rail-sheet"
				aria-label={`Chapters — currently: ${label}. Open chapter list.`}
				onClick={onOpen}
				className={[
					'flex items-center gap-2 rounded-full px-4 py-2.5',
					'border border-lane-institutional-strong/15 bg-sky-low shadow-sm',
					'font-nav text-[12px] font-extrabold uppercase tracking-[0.06em] text-accent-prime-active',
					'outline-none transition-colors duration-200',
					'hover:border-lane-institutional-strong/25',
					'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
				].join(' ')}
			>
				<span
					aria-hidden="true"
					className="block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-prime-active"
				/>
				<span className="max-w-[18ch] truncate">{label}</span>
				{/* Chevron up — indicates sheet opens upward */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="size-3 text-body-faint"
					aria-hidden="true"
				>
					<polyline points="18 15 12 9 6 15" />
				</svg>
			</button>
		</div>
	)
}

/* ============================================================================
 * MobileSheet — native <dialog> bottom sheet
 *
 * showModal() grants: focus trap, aria-modal, ::backdrop, Escape → cancel event.
 * Animation: CSS @starting-style + transition-behavior: allow-discrete
 *   (class: .chapter-rail-sheet, defined in global.css @layer components).
 * Backdrop click: fires on dialog element itself (content is in a child div).
 * ========================================================================== */

type MobileSheetProps = {
	chapters: Chapter[]
	activeIndex: number
	onClose: () => void
	onChapterJump: (e: React.MouseEvent, slug: string, onAfter?: () => void) => void
}

const MobileSheet = forwardRef<HTMLDialogElement, MobileSheetProps>(
	function MobileSheet({ chapters, activeIndex, onClose, onChapterJump }, ref) {
		return (
			<dialog
				ref={ref}
				id="chapter-rail-sheet"
				aria-labelledby="chapter-rail-sheet-title"
				aria-modal="true"
				className="chapter-rail-sheet"
				onClick={(e) => {
					if (e.target === e.currentTarget) onClose()
				}}
			>
				<div className="flex flex-col px-6 pb-8 pt-5">
					{/* Sheet header */}
					<div className="mb-4 flex items-center justify-between">
						<p
							id="chapter-rail-sheet-title"
							className="font-nav text-[12px] font-extrabold uppercase tracking-[0.1em] text-body-faint"
						>
							Chapters
						</p>
						<button
							type="button"
							aria-label="Close chapter list"
							onClick={onClose}
							className={[
								'flex h-7 w-7 items-center justify-center rounded-md',
								'text-body-faint hover:text-body-muted',
								'outline-none transition-colors duration-200',
								'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
							].join(' ')}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="size-4"
								aria-hidden="true"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>

					{/* Chapter list */}
					<nav aria-label="Article chapters">
						<ChapterList
							chapters={chapters}
							activeIndex={activeIndex}
							onChapterJump={(e, slug) => onChapterJump(e, slug, onClose)}
						/>
					</nav>

					{/* Keyboard hint */}
					<p className="mt-6 font-mono text-[12px] text-body-faint">
						Press{' '}
						<kbd className="rounded border border-lane-institutional-strong/20 px-1 py-0.5 font-mono text-[12px]">
							Esc
						</kbd>{' '}
						to close
					</p>
				</div>
			</dialog>
		)
	},
)

/* ============================================================================
 * ReceptionCondensed — homepage "what's inside" chapter preview
 *
 * No scroll tracking. Links use articleHref prefix for cross-page navigation.
 * No progress coupling (spec Field 2: reception mode has no progress indicator).
 * ========================================================================== */

function ReceptionCondensed({
	chapters,
	articleHref = '',
	className,
}: {
	chapters: Chapter[]
	articleHref?: string
	className?: string
}) {
	return (
		<nav
			aria-label="Article chapters"
			className={['flex flex-col gap-0.5', className ?? ''].filter(Boolean).join(' ')}
		>
			<p
				aria-hidden="true"
				className="mb-2 font-nav text-[12px] font-extrabold uppercase tracking-[0.1em] text-body-faint"
			>
				Contents
			</p>
			<ol>
				{chapters.map((ch) => (
					<li key={ch.slug}>
						<a
							href={`${articleHref}#${ch.slug}`}
							className={[
								'flex items-center gap-2 rounded-sm py-1 outline-none',
								'font-nav text-[12px] font-medium text-copper',
								'hover:text-copper-deep',
								'transition-colors duration-200',
								'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-1 focus-visible:ring-offset-sky-low',
							].join(' ')}
						>
							<span
								aria-hidden="true"
								className="block h-1 w-1 shrink-0 rounded-full bg-copper/40"
							/>
							<span className="leading-snug">{ch.text}</span>
						</a>
					</li>
				))}
			</ol>
		</nav>
	)
}
