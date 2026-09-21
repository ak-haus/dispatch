/**
 * DISpatch masthead — composition + global keyboard hub.
 *
 * Hosts:
 *   - Sticky <header> chrome with scroll-aware response
 *   - Wordmark + SiteNav (variant-aware: reception / article / mobile)
 *   - SearchPalette state (cmd-K shortcut + trigger button click)
 *   - Mobile Dialog menu
 *
 * Per SearchPalette spec.md §10: cmd-K is a global affordance that works
 * even on article surfaces (sanctuary discipline hides the visual trigger
 * but preserves the keyboard shortcut for power users).
 */

import { motion, MotionConfig, AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Wordmark } from './Wordmark'
import { markMotionReady } from '@/lib/motion-ready'
// SUBPATH imports, never the barrel (B16 fork retirement — the library owns
// the palette and the nav cluster; the barrel would drag the whole component
// graph into the island chunk). useMagnetic rides the SiteNav subpath: the
// hook moved into the library with the nav port (one copy, no fork).
import { SearchPalette } from '@prime-dispatch/ui/custom/SearchPalette'
import type { SearchRecord } from '@prime-dispatch/ui/custom/SearchPalette'
import {
	SiteNav,
	useMagnetic,
	type SiteNavVariant,
} from '@prime-dispatch/ui/custom/SiteNav'

interface Props {
	theme?: 'neutral' | 'vellum'
	currentPath: string
	variant?: 'reception' | 'article'
	searchIndex?: readonly SearchRecord[]
}

export function Masthead({
	theme = 'neutral',
	currentPath,
	variant = 'reception',
	searchIndex = [],
}: Props) {
	const isVellum = theme === 'vellum'
	const [scrolled, setScrolled] = useState(false)
	/** True when the user is actively scrolling DOWN past the reveal threshold.
	 *  ordrhealth + fourmula pattern: hide chrome on down, show on up.
	 *  Always visible at top-of-page (regardless of direction). */
	const [hidden, setHidden] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [paletteOpen, setPaletteOpen] = useState(false)

	/**
	 * The mobile menu is a NATIVE <dialog> driven by showModal(), not a Radix
	 * Dialog (F54). Radix marks the background `aria-hidden` via aria-hidden's
	 * `hideOthers` and never sets `inert`, so every focusable node behind the
	 * sheet stays in the tab order as far as static analysis can tell, and axe
	 * answers `aria-hidden-focus` INCOMPLETE on five nodes — three background
	 * containers plus Radix's own two `tabindex="0"` focus guards. axe reads the
	 * DOM, not the runtime trap, so no amount of correct JS resolves it.
	 *
	 * showModal() moves the question to the platform: per the HTML standard,
	 * while a modal dialog is open "every node that is connected to document,
	 * with the exception of the subject element and its flat tree descendants,
	 * must become inert", and inert nodes "cannot be focused" and are not
	 * exposed "to accessibility APIs or assistive technologies". The focus trap,
	 * Escape-cancel and aria-modal all come from the UA, the guards disappear,
	 * and axe returns fully determinate. Same pattern as SearchPalette and
	 * ChapterRail, which already scan clean with their sheets open.
	 */
	const menuRef = useRef<HTMLDialogElement | null>(null)

	// React is alive: cancel the no-JS SSR reveal fallback so Motion owns the
	// choreography again (F63 · F66). This island is `client:load` on every
	// route, so it is the earliest honest proof the bundle arrived. The call
	// refuses itself past the deadline — see src/lib/motion-ready.ts.
	useEffect(() => {
		markMotionReady()
	}, [])

	useEffect(() => {
		const dlg = menuRef.current
		if (!dlg) return
		if (mobileMenuOpen && !dlg.open) dlg.showModal()
	}, [mobileMenuOpen])

	// Escape arrives as the dialog's native `cancel` event. Prevent the default
	// close so the exit animation runs; AnimatePresence calls close() after it.
	useEffect(() => {
		const dlg = menuRef.current
		if (!dlg) return
		const onCancel = (e: Event) => {
			e.preventDefault()
			setMobileMenuOpen(false)
		}
		dlg.addEventListener('cancel', onCancel)
		return () => dlg.removeEventListener('cancel', onCancel)
	}, [])

	const openPalette = useCallback(() => setPaletteOpen(true), [])
	const closePalette = useCallback(() => setPaletteOpen(false), [])

	// Scroll-aware response — compression + hide-on-down direction.
	useEffect(() => {
		const SCROLL_THRESHOLD = 80      // when to enter "scrolled" compressed state
		const HIDE_THRESHOLD = 140       // floor before hide-on-down can engage
		const DIR_DELTA = 6              // px of scroll movement before flipping direction
		let lastScroll = 0

		const handleScroll = (scrollY: number) => {
			setScrolled(scrollY > SCROLL_THRESHOLD)

			// Hide-on-scroll-down logic
			const delta = scrollY - lastScroll
			if (scrollY < HIDE_THRESHOLD) {
				setHidden(false)                          // always visible near top
			} else if (delta > DIR_DELTA) {
				setHidden(true)                           // scrolling down → hide
			} else if (delta < -DIR_DELTA) {
				setHidden(false)                          // scrolling up → reveal
			}
			lastScroll = scrollY
		}

		const lenis = (window as Window & {
			__lenis?: {
				on: (e: string, cb: (e: { scroll: number }) => void) => void
				off?: (e: string, cb: (e: { scroll: number }) => void) => void
			}
		}).__lenis

		if (lenis && typeof lenis.on === 'function') {
			const cb = (e: { scroll: number }) => handleScroll(e.scroll)
			lenis.on('scroll', cb)
			handleScroll(window.scrollY)
			return () => {
				if (typeof lenis.off === 'function') lenis.off('scroll', cb)
			}
		}

		const nativeCb = () => handleScroll(window.scrollY)
		window.addEventListener('scroll', nativeCb, { passive: true })
		handleScroll(window.scrollY)
		return () => window.removeEventListener('scroll', nativeCb)
	}, [])

	// Mobile menu open OR cmd-K palette open should force the masthead visible
	// — otherwise the chrome can hide while a sheet is open and feel orphaned.
	useEffect(() => {
		if (mobileMenuOpen || paletteOpen) setHidden(false)
	}, [mobileMenuOpen, paletteOpen])

	// Global cmd-K / ctrl-K opens SearchPalette (works on all surfaces per
	// SearchPalette spec §10 — sanctuary hides the visual trigger but the
	// shortcut remains active for power users).
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const isCmdK =
				(e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey
			if (isCmdK) {
				e.preventDefault()
				setPaletteOpen((v) => !v)
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	const mobileVariant: SiteNavVariant = 'mobile'

	// Magnetic hover on the wordmark — subtle pull (strength 0.22, capped 6px)
	// so the editorial chrome feels alive without distracting from the mark.
	const wordmarkMagnetic = useMagnetic<HTMLDivElement>({ strength: 0.22, maxOffset: 6 })

	return (
		<>
			<MotionConfig reducedMotion="user">
				<motion.header
					data-hidden={hidden ? 'true' : 'false'}
					data-scrolled={scrolled ? 'true' : 'false'}
					data-ssr-reveal
					initial={{ opacity: 0, y: -4 }}
					animate={{
						opacity: 1,
						/* Hide-on-scroll-down: translate fully out of frame.
						   The CSS rule for `body.dispatch-hero header` already uses
						   transform/opacity for the homepage hero hide; we layer
						   this on top via data-hidden + framer animate. */
						y: hidden ? '-110%' : 0,
					}}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					className={[
						'sticky top-0 z-50 border-b will-change-transform',
						'transition-[border-color,background-color,box-shadow,padding] duration-300',
						isVellum
							? scrolled
								? 'border-lane-institutional-strong/35 bg-sky-low/96 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] backdrop-blur-md'
								: 'border-lane-institutional-strong/12 bg-sky-low'
							: scrolled
								? 'border-border bg-background/95 shadow-sm backdrop-blur-sm'
								: 'border-border bg-background',
					].join(' ')}
				>
					<div
						className={[
							'flex w-full items-center justify-between',
							'transition-[padding] duration-300 ease-out',
							scrolled
								? 'px-4 py-2 sm:items-baseline sm:px-6 sm:py-2.5 md:px-9'
								: 'px-4 py-3 sm:items-baseline sm:px-6 sm:py-3.5 md:px-10',
						].join(' ')}
					>
						<motion.div
							ref={wordmarkMagnetic.ref}
							onMouseMove={wordmarkMagnetic.onMouseMove}
							onMouseLeave={wordmarkMagnetic.onMouseLeave}
							data-ssr-reveal
							initial={{ opacity: 0, y: 2 }}
							animate={{
								opacity: 1,
								x: wordmarkMagnetic.x,
								y: wordmarkMagnetic.y,
								scale: scrolled ? 0.93 : 1,
							}}
							transition={{
								/* spring stiffness/damping tuned so the mark pulls smoothly
								   without overshoot; scale uses the cubic easing for the
								   scroll-compress beat. */
								type: 'spring',
								stiffness: 240,
								damping: 22,
								mass: 0.45,
							}}
							whileHover={{ opacity: 0.82 }}
							className="leading-none"
						>
							<Wordmark
								as="a"
								href="/"
								ariaLabel="DISpatch — home"
								size="masthead"
								className="transition-opacity"
							/>
						</motion.div>

						<SiteNav
							currentPath={currentPath}
							variant={variant}
							paletteOpen={paletteOpen}
							onPaletteOpen={openPalette}
						/>

						<>
							{/* Trigger — plain button; the sheet below is a native <dialog>. */}
								<button
									type="button"
									onClick={() => setMobileMenuOpen((v) => !v)}
									aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
									aria-expanded={mobileMenuOpen}
									aria-controls="dispatch-mobile-menu"
									className={[
										'inline-flex h-10 w-10 items-center justify-center rounded-md outline-none md:hidden',
										'transition-colors duration-200',
										'focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2',
										isVellum
											? 'text-body-strong hover:bg-lane-institutional-strong/8 focus-visible:ring-offset-sky-low'
											: 'text-foreground hover:bg-accent focus-visible:ring-offset-background',
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
										className="size-5"
										aria-hidden="true"
									>
										{mobileMenuOpen ? (
											<>
												<line x1="18" y1="6" x2="6" y2="18" />
												<line x1="6" y1="6" x2="18" y2="18" />
											</>
										) : (
											<>
												<line x1="3" y1="7" x2="21" y2="7" />
												<line x1="3" y1="12" x2="21" y2="12" />
												<line x1="3" y1="17" x2="21" y2="17" />
											</>
										)}
									</svg>
								</button>

							{/* The sheet. A native <dialog> is always mounted so the ref is
							    stable; showModal() puts it in the top layer and makes the rest
							    of the document inert (HTML standard). The backdrop is the
							    ::backdrop pseudo-element, not a sibling overlay node. */}
							<dialog
								ref={menuRef}
								id="dispatch-mobile-menu"
								aria-label="Primary navigation"
								onClick={(e) => {
									// A click landing on the dialog itself is a backdrop click;
									// clicks inside the sheet stop at the sheet.
									if (e.target === e.currentTarget) setMobileMenuOpen(false)
								}}
								className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 outline-none backdrop:bg-body-strong/30 backdrop:backdrop-blur-sm"
							>
							<AnimatePresence onExitComplete={() => menuRef.current?.close()}>
								{mobileMenuOpen && (
									<>
										<>
											<motion.div
												initial={{ x: '100%' }}
												animate={{ x: 0 }}
												exit={{ x: '100%' }}
												transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
												className={[
													/* F58 — the panel is `fixed`, so it sits OUTSIDE the
													   dialog's scroll flow and the dialog's own
													   `overflow-y: auto` can never reach it: measured
													   `scrollHeight === clientHeight === 375` while four
													   controls sat at bottom 386-390 on a landscape phone,
													   unreachable by wheel, touch or Tab. The scroller has
													   to be this panel. `overscroll-contain` keeps the
													   gesture from chaining to the page behind it (F52). */
													'fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col',
													'overflow-y-auto overscroll-contain',
													'border-l border-lane-institutional-strong/20',
													isVellum ? 'bg-sky-low' : 'bg-background',
													'shadow-2xl outline-none',
												].join(' ')}
											>
												<div className="flex items-center justify-between border-b border-lane-institutional-strong/15 px-6 py-5">
													<Wordmark size="sheet" />
													<>
														<button
															type="button"
															onClick={() => setMobileMenuOpen(false)}
															aria-label="Close menu"
															className="inline-flex h-10 w-10 items-center justify-center rounded-md text-body-strong outline-none transition-colors hover:bg-lane-institutional-strong/8 focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
																className="size-5"
																aria-hidden="true"
															>
																<line x1="18" y1="6" x2="6" y2="18" />
																<line x1="6" y1="6" x2="18" y2="18" />
															</svg>
														</button>
													</>
												</div>

												<h2 className="sr-only">DISpatch navigation</h2>
												<p className="sr-only">
													Primary navigation menu for the DISpatch publication.
												</p>

												<SiteNav
													currentPath={currentPath}
													variant={mobileVariant}
													onNavigate={() => setMobileMenuOpen(false)}
													paletteOpen={paletteOpen}
													onPaletteOpen={() => {
														setMobileMenuOpen(false)
														openPalette()
													}}
												/>

												<div className="border-t border-lane-institutional-strong/15 px-6 py-4 font-mono text-[12px] text-body-muted">
													DISpatch · &copy; 2026
												</div>
											</motion.div>
										</>
									</>
								)}
							</AnimatePresence>
							</dialog>
						</>
					</div>
				</motion.header>
			</MotionConfig>

			{/* SearchPalette — global cmd-K palette, lives outside <header>
			    so it renders above sticky chrome via native <dialog> top layer. */}
			<SearchPalette open={paletteOpen} onClose={closePalette} index={searchIndex} />
		</>
	)
}
