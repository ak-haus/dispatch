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
import { Dialog } from 'radix-ui'
import { useCallback, useEffect, useState } from 'react'
import { Wordmark } from './Wordmark'
import { SiteNav, type SiteNavVariant } from './SiteNav'
// SUBPATH import, never the barrel (B16 fork retirement — the library owns
// the palette; the barrel would drag the whole component graph into the
// island chunk).
import { SearchPalette } from '@prime-dispatch/ui/custom/SearchPalette'
import type { SearchRecord } from '@prime-dispatch/ui/custom/SearchPalette'
import { useMagnetic } from '@/lib/useMagnetic'

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

						<Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
							<Dialog.Trigger asChild>
								<button
									type="button"
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
							</Dialog.Trigger>

							<AnimatePresence>
								{mobileMenuOpen && (
									<Dialog.Portal forceMount>
										<Dialog.Overlay asChild>
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.2 }}
												className="fixed inset-0 z-50 bg-body-strong/30 backdrop-blur-sm"
											/>
										</Dialog.Overlay>
										<Dialog.Content
											asChild
											id="dispatch-mobile-menu"
											aria-label="Primary navigation"
										>
											<motion.div
												initial={{ x: '100%' }}
												animate={{ x: 0 }}
												exit={{ x: '100%' }}
												transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
												className={[
													'fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col',
													'border-l border-lane-institutional-strong/20',
													isVellum ? 'bg-sky-low' : 'bg-background',
													'shadow-2xl outline-none',
												].join(' ')}
											>
												<div className="flex items-center justify-between border-b border-lane-institutional-strong/15 px-6 py-5">
													<Wordmark size="sheet" />
													<Dialog.Close asChild>
														<button
															type="button"
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
													</Dialog.Close>
												</div>

												<Dialog.Title className="sr-only">
													DISpatch navigation
												</Dialog.Title>
												<Dialog.Description className="sr-only">
													Primary navigation menu for the DISpatch publication.
												</Dialog.Description>

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
										</Dialog.Content>
									</Dialog.Portal>
								)}
							</AnimatePresence>
						</Dialog.Root>
					</div>
				</motion.header>
			</MotionConfig>

			{/* SearchPalette — global cmd-K palette, lives outside <header>
			    so it renders above sticky chrome via native <dialog> top layer. */}
			<SearchPalette open={paletteOpen} onClose={closePalette} index={searchIndex} />
		</>
	)
}
