/**
 * DISpatch SiteNav — production component per spec.md.
 *
 * Authority chain:
 *   1. representation/visual-system/components/SiteNav/spec.md (CD4 spec)
 *   2. representation/visual-system/color.md (token canon)
 *   3. cd2-color-amendment-proposal.md (Mayor-locked color decisions; wins
 *      on conflict with color.md)
 *
 * Three variants (spec Field 2):
 *   - 'reception'      — homepage / index surfaces: full nav-link set +
 *                        SearchPalette trigger + theme-cycler
 *   - 'article'        — article surfaces: compressed nav ("← Back to
 *                        DISpatch") + SearchPalette HIDDEN (Concept 7
 *                        sanctuary preservation) + theme-cycler
 *   - 'compact-mobile' — mobile breakpoint: handled by Masthead's Dialog
 *
 * Tonal-stepping nav state pattern (color.md Decision 8 + amendment §1.3):
 *   default       → --platform-copper             (#b87333)
 *   hover         → --platform-copper-deep        (#8b5224)
 *   active        → --platform-accent-prime-active (#6b2520 wine intermediate)
 *   focus ring    → --platform-accent-prime       (#8e2532 wordmark red)
 *
 * Accessibility (spec Field 4):
 *   - <nav aria-label="Primary navigation"> landmark
 *   - One <a aria-current="page"> at a time
 *   - SearchPalette button: type=button, aria-haspopup=dialog, aria-expanded
 *   - Theme-cycler button: type=button, aria-label reflecting current cycle
 *   - Keyboard tab order: wordmark → nav links → search → theme-cycler
 *   - Reduced-motion: indicator slides degrade to instant via MotionConfig
 *     in parent Masthead
 */

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useMagnetic } from '@/lib/useMagnetic'

export type SiteNavVariant = 'reception' | 'article' | 'mobile'
type PrimeCycle = 'dawn' | 'dusk' | 'night'

interface Props {
	currentPath: string
	variant?: SiteNavVariant
	onNavigate?: () => void
	// Palette state — owned by parent Masthead so cmd-K can fire globally
	paletteOpen?: boolean
	onPaletteOpen?: () => void
}

export const navPages = [
	{ href: '/', label: 'Home' },
	{ href: '/article', label: 'Articles' },
	{ href: '/sitemap', label: 'Atlas' },
	{ href: '/about', label: 'About' },
] as const

export function SiteNav({
	currentPath,
	variant = 'reception',
	onNavigate,
	paletteOpen = false,
	onPaletteOpen,
}: Props) {
	if (variant === 'mobile') {
		return (
			<MobileNav
				currentPath={currentPath}
				onNavigate={onNavigate}
				paletteOpen={paletteOpen}
				onPaletteOpen={onPaletteOpen}
			/>
		)
	}
	if (variant === 'article') {
		return <ArticleNav />
	}
	return (
		<ReceptionNav
			currentPath={currentPath}
			paletteOpen={paletteOpen}
			onPaletteOpen={onPaletteOpen}
		/>
	)
}

/* ============================================================================
 * Reception variant — full nav + affordances slot
 * ========================================================================== */

function ReceptionNav({
	currentPath,
	paletteOpen,
	onPaletteOpen,
}: {
	currentPath: string
	paletteOpen?: boolean
	onPaletteOpen?: () => void
}) {
	const [previewHref, setPreviewHref] = useState<string | null>(null)
	const indicatorTargetHref =
		previewHref ?? navPages.find((p) => isCurrent(p.href, currentPath))?.href ?? null

	return (
		<div className="hidden items-baseline gap-x-6 md:flex">
			<nav
				aria-label="Primary navigation"
				className="flex items-baseline gap-x-8"
				onMouseLeave={() => setPreviewHref(null)}
			>
				<ul className="flex items-baseline gap-x-8" role="list">
					{navPages.map((p) => {
						const isActive = isCurrent(p.href, currentPath)
						const isIndicatorTarget = indicatorTargetHref === p.href
						return (
							<li key={p.href} role="listitem">
								<MagneticNavLink
									href={p.href}
									label={p.label}
									isActive={isActive}
									isIndicatorTarget={isIndicatorTarget}
									indicatorClass={
										isActive && previewHref === null
											? 'bg-accent-prime-active'
											: 'bg-copper-deep'
									}
									onPreview={(v) => setPreviewHref(v ? p.href : null)}
								/>
							</li>
						)
					})}
				</ul>
			</nav>

			<div className="flex items-baseline gap-x-1">
				<SearchTrigger paletteOpen={paletteOpen} onOpen={onPaletteOpen} />
				<ThemeCycler />
			</div>
		</div>
	)
}

/* ============================================================================
 * Article variant — sanctuary mode: compressed nav, no SearchPalette
 * ========================================================================== */

function ArticleNav() {
	return (
		<div className="hidden items-baseline gap-x-6 md:flex">
			<nav aria-label="Primary navigation" className="flex items-baseline">
				<a
					href="/"
					className={[
						'inline-flex items-baseline gap-2 font-nav text-[13px] font-extrabold uppercase tracking-[0.06em] outline-none',
						'transition-colors duration-200 ease-out',
						'text-copper-label hover:text-copper-deep',
						'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
					].join(' ')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="size-3"
						aria-hidden="true"
					>
						<line x1="19" y1="12" x2="5" y2="12" />
						<polyline points="12 19 5 12 12 5" />
					</svg>
					Back to DISpatch
				</a>
			</nav>
			<ThemeCycler />
		</div>
	)
}

/* ============================================================================
 * Mobile variant — used inside the Radix Dialog sheet
 * ========================================================================== */

function MobileNav({
	currentPath,
	onNavigate,
	paletteOpen,
	onPaletteOpen,
}: {
	currentPath: string
	onNavigate?: () => void
	paletteOpen?: boolean
	onPaletteOpen?: () => void
}) {
	return (
		<>
			<nav aria-label="Primary navigation" className="flex flex-1 flex-col px-2 py-4">
				<ul role="list" className="flex flex-1 flex-col">
					{navPages.map((p) => {
						const isActive = isCurrent(p.href, currentPath)
						return (
							<li key={p.href} role="listitem">
								<a
									href={p.href}
									data-analytics={`nav:${p.href}`}
									aria-current={isActive ? 'page' : undefined}
									onClick={onNavigate}
									className={[
										'group relative flex items-baseline gap-3 px-4 py-4 font-nav text-base font-extrabold uppercase tracking-[0.06em] outline-none',
										'transition-colors duration-200',
										'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
										isActive
											? 'text-accent-prime-active'
											: 'text-copper-label hover:text-copper-deep',
									].join(' ')}
								>
									{isActive && (
										<span
											aria-hidden="true"
											className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-accent-prime-active"
										/>
									)}
									<span>{p.label}</span>
								</a>
							</li>
						)
					})}
				</ul>
			</nav>
			<div className="flex items-center gap-2 border-t border-lane-institutional-strong/15 px-6 py-4">
				<SearchTrigger paletteOpen={paletteOpen} onOpen={onPaletteOpen} />
				<ThemeCycler />
			</div>
		</>
	)
}

/* ============================================================================
 * SearchPalette trigger — placeholder button, real semantics
 *
 * Per spec.md Field 1: hosts the SearchPalette trigger.
 * Per spec.md Field 4: aria-haspopup="dialog", aria-expanded.
 * Per spec.md Field 10: SearchPalette component itself lands separately;
 *   this trigger is a placeholder with correct semantics until then.
 *   On article surfaces, this component is not rendered (sanctuary preservation).
 * ========================================================================== */

function SearchTrigger({
	paletteOpen = false,
	onOpen,
}: {
	paletteOpen?: boolean
	onOpen?: () => void
}) {
	return (
		<button
			type="button"
			aria-haspopup="dialog"
			aria-expanded={paletteOpen}
			/* aria-controls only while the palette is open: a closed <dialog> is
			   display:none, so the reference target is unperceivable to AT (and
			   axe marks the pair undeterminable — A13 incomplete assertion). */
			aria-controls={paletteOpen ? 'dispatch-search-palette' : undefined}
			aria-label="Search DISpatch (press Ctrl+K or Cmd+K)"
			onClick={() => onOpen?.()}
			className={[
				'inline-flex h-9 w-9 items-center justify-center rounded-md outline-none',
				'transition-colors duration-200',
				'text-copper hover:text-copper-deep hover:bg-lane-institutional-strong/8',
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
				className="size-[18px]"
				aria-hidden="true"
			>
				<circle cx="11" cy="11" r="7" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
		</button>
	)
}

/* ============================================================================
 * ThemeCycler — segmented control showing all 3 cycles side-by-side.
 *
 * Why segmented (not a single cycling button): most users only flip
 * between two states (day / night) and never discover that a third
 * exists. Showing dawn · dusk · night as three discoverable affordances
 * makes the third state visible without requiring exploration. The
 * active cycle reads as filled; the other two read as outlined.
 *
 * Per spec.md Field 6: SiteNav hosts the theme-cycler affordance.
 * Per spec.md Field 4: real <button> per cycle, aria-pressed=true on the
 * active state so screen readers announce "X, pressed; Y, not pressed".
 *
 * State lives in localStorage 'prime-cycle' + html[data-prime-cycle].
 * FOUC prevention script in StackLayout reads localStorage and applies
 * the attribute synchronously before <body> renders.
 * ========================================================================== */

const CYCLE_ORDER: readonly PrimeCycle[] = ['dawn', 'dusk', 'night'] as const

function ThemeCycler() {
	const [cycle, setCycle] = useState<PrimeCycle>('dawn')

	useEffect(() => {
		const initial = (document.documentElement.getAttribute('data-prime-cycle') ||
			'dawn') as PrimeCycle
		setCycle(initial)
	}, [])

	const cycleTo = (next: PrimeCycle) => {
		const html = document.documentElement
		html.setAttribute('data-prime-cycle', next)
		html.classList.toggle('dark', next === 'night')
		try {
			localStorage.setItem('prime-cycle', next)
		} catch (_) {
			/* localStorage unavailable; cycle still applies for this session */
		}
		setCycle(next)
	}

	return (
		<div
			role="group"
			aria-label="Cycle theme — dawn, dusk, or night"
			className="inline-flex items-center gap-px rounded-full border border-lane-institutional-strong/20 bg-window-warm/40 p-0.5 backdrop-blur-sm"
		>
			{CYCLE_ORDER.map((c) => {
				const active = c === cycle
				return (
					<button
						key={c}
						type="button"
						aria-pressed={active}
						aria-label={`${c.charAt(0).toUpperCase()}${c.slice(1)} cycle${active ? ' (active)' : ''}`}
						onClick={() => cycleTo(c)}
						className={[
							'inline-flex h-7 w-7 items-center justify-center rounded-full outline-none',
							'transition-colors duration-200',
							active
								? 'bg-accent-prime/12 text-accent-prime-active'
								: 'text-copper hover:bg-lane-institutional-strong/8 hover:text-copper-deep',
							'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
						].join(' ')}
					>
						<CycleGlyph cycle={c} />
					</button>
				)
			})}
		</div>
	)
}

function CycleGlyph({ cycle }: { cycle: PrimeCycle }) {
	const shared = {
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor' as const,
		strokeWidth: 2,
		strokeLinecap: 'round' as const,
		strokeLinejoin: 'round' as const,
		className: 'size-[18px]',
		'aria-hidden': true,
	}
	if (cycle === 'dawn') {
		return (
			<svg {...shared}>
				<circle cx="12" cy="12" r="4" />
				<line x1="12" y1="2" x2="12" y2="4" />
				<line x1="12" y1="20" x2="12" y2="22" />
				<line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
				<line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
				<line x1="2" y1="12" x2="4" y2="12" />
				<line x1="20" y1="12" x2="22" y2="12" />
				<line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
				<line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
			</svg>
		)
	}
	if (cycle === 'dusk') {
		return (
			<svg {...shared}>
				<path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 0 0 9.79 9.79z" opacity="0.4" />
				<circle cx="9" cy="13" r="4" />
				<line x1="9" y1="6" x2="9" y2="7" />
				<line x1="3" y1="13" x2="4" y2="13" />
				<line x1="14" y1="13" x2="15" y2="13" />
			</svg>
		)
	}
	// night
	return (
		<svg {...shared}>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	)
}

/* ============================================================================
 * MagneticNavLink — nav link with cursor-attracted micro-translate.
 *
 * Pattern from ouro-labs / feedagency: link follows cursor with damped
 * motion (strength 0.32, capped at 8px). lockY=true preserves the baseline
 * so adjacent links stay visually aligned. Spring stiffness 280 / damping 22
 * gives a smooth pull without jitter on rapid mouse movement.
 *
 * The active-page indicator (motion.span layoutId) renders inside the
 * magnetic wrapper so it travels WITH the link — the underline stays
 * attached as the link slides under the cursor.
 * ========================================================================== */

function MagneticNavLink({
	href,
	label,
	isActive,
	isIndicatorTarget,
	indicatorClass,
	onPreview,
}: {
	href: string
	label: string
	isActive: boolean
	isIndicatorTarget: boolean
	indicatorClass: string
	onPreview: (active: boolean) => void
}) {
	const m = useMagnetic<HTMLAnchorElement>({ strength: 0.32, lockY: true, maxOffset: 8 })

	return (
		<motion.a
			ref={m.ref}
			href={href}
			/* data-analytics: declares this as an engagement point for the
			   editorial instrumentation (src/lib/analytics/boot.ts). Declared
			   in the markup rather than matched by selector, so restyling the
			   nav cannot silently stop the metric. */
			data-analytics={`nav:${href}`}
			aria-current={isActive ? 'page' : undefined}
			onMouseEnter={() => onPreview(true)}
			onMouseMove={m.onMouseMove}
			onMouseLeave={() => {
				m.onMouseLeave()
				onPreview(false)
			}}
			onFocus={() => onPreview(true)}
			onBlur={() => onPreview(false)}
			animate={{ x: m.x, y: m.y }}
			transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.4 }}
			className={navLinkClass(isActive) + ' inline-block'}
		>
			{label}
			{isIndicatorTarget && (
				<motion.span
					layoutId="masthead-indicator"
					aria-hidden="true"
					className={['absolute -bottom-px left-0 right-0 h-[2px]', indicatorClass].join(' ')}
					transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.6 }}
				/>
			)}
		</motion.a>
	)
}

/* ============================================================================
 * Helpers
 * ========================================================================== */

function isCurrent(href: string, currentPath: string): boolean {
	return currentPath === href || currentPath === href + '/'
}

function navLinkClass(isActive: boolean): string {
	return [
		'relative font-nav text-[13px] font-extrabold uppercase tracking-[0.06em] outline-none pb-1',
		'transition-colors duration-200 ease-out',
		'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low',
		isActive ? 'text-accent-prime-active' : 'text-copper-label hover:text-copper-deep',
		'active:opacity-75 active:transition-[opacity] active:duration-75',
	].join(' ')
}
