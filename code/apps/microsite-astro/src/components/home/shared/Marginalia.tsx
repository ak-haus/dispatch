/**
 * Vertical-caps marginalia — the spine of the magazine.
 *
 * Behavior (locked by AK 2026-05-14): mimics `position: sticky; top: 0`
 * placed under the cover hero, but implemented with `position: fixed` +
 * a JS-driven `top` value to avoid adding document-flow height.
 *
 * Why not pure CSS sticky: a sticky element with `height: 100vh` adds 100vh
 * of vertical document space, which shifts every section below it. That
 * broke the Crossfire's GSAP ScrollTrigger pin — the pin start point
 * moved 100vh down from where ScrollTrigger calculated it, so the section
 * appeared to "skip past" the pin and jump into view abruptly. Fixed
 * positioning + JS-tracked offset gives identical visual behavior with
 * zero document-flow impact.
 *
 *   - Cover fully visible: rail's top = cover.bottom = ~viewport height
 *     (rail sits BELOW the viewport, invisible).
 *   - User scrolls past cover: rail's top decreases as cover scrolls up;
 *     the rail naturally enters the viewport from the bottom.
 *   - Cover fully scrolled past: rail's top = 0 (sticks to viewport top).
 *   - User scrolls back up: rail's top increases again, returns to its
 *     "below viewport" position. Stops at the cover's bottom edge.
 *
 * Uses `requestAnimationFrame` to throttle scroll updates and a Lenis
 * subscription so it stays in sync with smooth scroll.
 */

'use client'

import { useEffect, useRef } from 'react'

export function Marginalia({
	issueLabel,
	dateLabel,
}: {
	issueLabel: string
	dateLabel: string
}) {
	const railRef = useRef<HTMLElement>(null)

	useEffect(() => {
		let rafId: number | null = null

		const update = () => {
			rafId = null
			const rail = railRef.current
			if (!rail) return
			const cover = document.querySelector('[aria-label*="Volume 01 cover"]')
			if (!cover) {
				// No cover element on this page — pin to top of viewport.
				rail.style.top = '0px'
				return
			}
			const rect = cover.getBoundingClientRect()
			// max(0, cover.bottom) gives the perfect "stick under cover" curve:
			//   cover fully in view → top ≈ viewport height (rail below viewport)
			//   cover scrolled half way → top = ~50vh (rail partway up)
			//   cover scrolled fully past → top = 0 (rail sticks to viewport top)
			//   user scrolls back → top grows again, rail returns
			const top = Math.max(0, rect.bottom)
			rail.style.top = `${top}px`
		}

		const onScroll = () => {
			if (rafId !== null) return
			rafId = requestAnimationFrame(update)
		}

		// Initial position
		update()

		// Lenis bridge — subscribe so updates stay in sync with smooth scroll
		type LenisLite = {
			on: (e: 'scroll', cb: () => void) => void
			off?: (e: 'scroll', cb: () => void) => void
		}
		const lenis = (window as Window & { __lenis?: LenisLite }).__lenis
		if (lenis && typeof lenis.on === 'function') {
			lenis.on('scroll', onScroll)
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', onScroll, { passive: true })

		return () => {
			if (rafId !== null) cancelAnimationFrame(rafId)
			if (lenis && typeof lenis.off === 'function') lenis.off('scroll', onScroll)
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onScroll)
		}
	}, [])

	return (
		<aside
			ref={railRef}
			className="pointer-events-none fixed left-0 z-40 hidden w-10 justify-center pt-6 md:flex"
			aria-hidden="true"
			style={{ top: '100vh' }} /* initial — below viewport, before JS engages */
		>
			{/* No h-screen, no items-center — the rail is auto-height (just the
			    text). pt-6 gives the text a small breathing margin from the top.
			    With this setup, the text's vertical position equals the rail's
			    `top` value, which equals the cover/article border position. */}
			<p
				className="font-mono text-[12px] font-bold uppercase tracking-[0.5em] text-body-strong"
				style={{
					writingMode: 'vertical-rl',
					transform: 'rotate(180deg)',
					textShadow:
						'0 1px 0 color-mix(in oklch, var(--sky-low) 75%, transparent), 0 -1px 0 color-mix(in oklch, var(--platform-text-body-strong) 8%, transparent)',
				}}
			>
				DISpatch · {issueLabel} · {dateLabel}
			</p>
		</aside>
	)
}
