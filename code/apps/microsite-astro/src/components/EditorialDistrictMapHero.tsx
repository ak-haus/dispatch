/**
 * EditorialDistrictMapHero — DISpatch homepage composition.
 *
 * This file owns *only* the top-level layout: order of spreads, shared
 * state (issue label, date label, scroll-driven body classes), and the
 * MotionConfig wrapper for the whole hero island. Each spread lives in
 * its own file under `./home/` so individual sections can be committed,
 * reverted, or swapped without touching the others.
 *
 * Spread order (locked 2026-05-13 amend):
 *   1. CoverSpread       cartographic video + wordmark stagger reveal
 *   2. ArticleSpread     featured dispatch as a magazine article opening
 *   3. DLDSSpread        other dispatches in print (sibling discovery)
 *   4. CrossfireSpread   GSAP-driven 3-panel staging slots (next session
 *                        wires real article excerpts in)
 *   5. BuildTicker       recent commits in a Shadcn-style code panel
 *   6. SpheresSpread     a way forward — Prime cosmology overview
 *   7. Colophon          publisher details + editors' epigraph
 *
 * Add a new spread: create a file under `./home/`, import it here, drop
 * it in the JSX. Remove a spread: delete its file + its import + its JSX
 * usage (3 lines total) — clean `git revert` of one feature.
 */

'use client'

import { useEffect, useState } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'
import type { StoryArticle } from './StoryCardCluster'
import { Marginalia } from './home/shared/Marginalia'
import { CoverSpread } from './home/CoverSpread'
import { ArticleSpread } from './home/ArticleSpread'
import { BuildTicker } from './home/BuildTicker'
import { CrossfireSpread } from './home/CrossfireSpread'
import { DLDSSpread } from './home/DLDSSpread'
import { Colophon } from './home/Colophon'

export type EditorialDistrictMapHeroProps = {
	articles: StoryArticle[]
	/** Build-time date label (en-US long form, UTC) baked by index.astro.
	 *  Used verbatim for the server render + first client render so static
	 *  HTML and hydration agree; an effect swaps in the live date after
	 *  mount. Computing `new Date()` during render caused a React #418
	 *  hydration mismatch on every stale static deploy (fixed 2026-08-17). */
	initialDateLabel: string
	/** Crossfire deck source. May be the same as articles[0] (when the
	 *  featured/newest dispatch has crossfire data) OR an older dispatch
	 *  (when the newest is a draft without surfaces wired). Decoupled
	 *  from `articles` so the cover + article spread always reflect the
	 *  newest story even when its crossfire block hasn't landed yet. */
	crossfireArticle?: StoryArticle
	dispatchCount: number
	/** Reserved for CartographyCanvas variants — currently unused since
	 *  the map is rendered as a video backdrop inside CoverSpread. Keeping
	 *  the prop in the signature so index.astro doesn't need an edit when
	 *  we wire SAM zone overlays back in. */
	mapboxToken?: string
	backgroundImage?: string
	depthImage?: string
	imageAspect?: number
}

export function EditorialDistrictMapHero({
	articles,
	crossfireArticle,
	dispatchCount,
	initialDateLabel,
}: EditorialDistrictMapHeroProps) {
	const reducedMotion = useReducedMotion()
	const featured = articles[0]
	const rest = articles.slice(1)

	const [dateLabel, setDateLabel] = useState(initialDateLabel)
	useEffect(() => {
		setDateLabel(
			new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				timeZone: 'UTC',
			}).format(new Date()),
		)
	}, [])
	const issueLabel = `Vol. 01 · No. ${String(dispatchCount).padStart(2, '0')}`

	// Masthead hide/reveal — Lenis-velocity + top-edge hover.
	//
	// SSR sets `dispatch-hero` in StackLayout so the masthead is hidden
	// before first paint. Three triggers reveal it:
	//   1. Lenis scroll velocity > 0.01 (instant on first wheel/touch)
	//   2. Scroll position > 40px (after the velocity fires once)
	//   3. Mouse pointer enters the top 80px of the viewport — even
	//      without scrolling. This lets readers summon the nav by
	//      reaching for it.
	useEffect(() => {
		document.body.classList.add('dispatch-hero')

		type LenisLite = {
			on: (e: 'scroll', cb: (l: { scroll: number; velocity: number }) => void) => void
			off: (e: 'scroll', cb: (l: { scroll: number; velocity: number }) => void) => void
		}
		const lenis = (window as Window & { __lenis?: LenisLite }).__lenis

		// Track who's holding the reveal: scroll or pointer. Pointer
		// holds while mouse is in the top edge zone; scroll holds while
		// scrollY > 40. The masthead is visible if EITHER is true.
		let scrollWantsReveal = false
		let pointerWantsReveal = false

		const apply = () => {
			document.body.classList.toggle('past-hero', scrollWantsReveal || pointerWantsReveal)
		}

		const onLenis = (l: { scroll: number; velocity: number }) => {
			scrollWantsReveal = l.scroll > 40 || Math.abs(l.velocity) > 0.01
			apply()
		}

		const onNative = () => {
			scrollWantsReveal = window.scrollY > 40
			apply()
		}

		const onPointerMove = (e: PointerEvent) => {
			// 80px hot zone at the top of the viewport.
			pointerWantsReveal = e.clientY <= 80
			apply()
		}

		const onPointerLeave = () => {
			pointerWantsReveal = false
			apply()
		}

		if (lenis) {
			lenis.on('scroll', onLenis)
		} else {
			window.addEventListener('scroll', onNative, { passive: true })
			onNative()
		}
		window.addEventListener('pointermove', onPointerMove, { passive: true })
		document.addEventListener('pointerleave', onPointerLeave, { passive: true })

		return () => {
			document.body.classList.remove('dispatch-hero', 'past-hero')
			if (lenis) lenis.off('scroll', onLenis)
			else window.removeEventListener('scroll', onNative)
			window.removeEventListener('pointermove', onPointerMove)
			document.removeEventListener('pointerleave', onPointerLeave)
		}
	}, [])

	return (
		<MotionConfig reducedMotion="user">
			{/* Marginalia is `position: fixed` with a JS-tracked `top` value
			    derived from the cover's bottom edge — DOM order is irrelevant. */}
			<Marginalia issueLabel={issueLabel} dateLabel={dateLabel} />
			<CoverSpread
				issueLabel={issueLabel}
				dateLabel={dateLabel}
				dispatchCount={dispatchCount}
				reducedMotion={!!reducedMotion}
				featuredTitle={featured?.data.title}
			/>
			<ArticleSpread featured={featured} dateLabel={dateLabel} />
			<DLDSSpread rest={rest} />
			{crossfireArticle && (
				<CrossfireSpread
					story={{
						title: crossfireArticle.data.title,
						dek: crossfireArticle.data.dek,
						author: crossfireArticle.data.author.name,
						authorHandle: crossfireArticle.data.author.handle ?? '@dispatch_prime',
						authorRole: crossfireArticle.data.author.role,
						date: crossfireArticle.data.dateLabel,
						dateLabel: crossfireArticle.data.dateLabel,
						readingTime: crossfireArticle.data.readingTime,
						siteUrl: `dispatch.prime${crossfireArticle.href}`,
					}}
					surfaces={crossfireArticle.data.crossfire?.surfaces ?? []}
					dateLabel={dateLabel}
				/>
			)}
			<Colophon issueLabel={issueLabel} dateLabel={dateLabel} />
			{/* Build ticker last — sits at the very bottom of the page like a
			    stock-ticker tape under the colophon. SpheresSpread (Prime
			    cosmology) moved to /about per AK 2026-05-14. */}
			<BuildTicker />
		</MotionConfig>
	)
}
