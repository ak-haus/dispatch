/**
 * The editorial instrumentation — what actually observes a reader (ADR-0003
 * §Stage 6). Booted once per page from StackLayout.
 *
 * THROTTLED TO MILESTONES, and the throttling is the design, not an
 * optimisation. A scroll handler that captured on every event would emit
 * thousands of events per page and burn the 1M/mo free tier in days, so:
 *
 *   - the scroll listener is passive and coalesced into ONE rAF per frame
 *     (reading layout in the handler itself would also make the page janky —
 *     the same discipline the animation stack follows);
 *   - a frame that crosses no milestone emits NOTHING;
 *   - each milestone fires at most once per page view, tracked in a Set.
 *
 * Upper bound per page view: 1 pageview + 4 depth milestones + 1 read
 * completion + engagement clicks. Nothing here can emit unboundedly.
 */

import { analyticsArmed, initAnalytics, track } from './client'
import { SCROLL_MILESTONES, surfaceFor, type ScrollMilestone, type Surface, type WireAction } from './events'

/** Depth at which a dispatch counts as read, paired with a dwell floor so a
 *  scroll-to-bottom bounce does not register as a read. */
const READ_DEPTH: ScrollMilestone = 90
const READ_DWELL_FLOOR_MS = 20_000

/** Engagement is declared in the markup as `data-analytics="..."`, not matched
 *  by CSS selectors against the design. Selector-matching would silently stop
 *  firing the next time the masthead or the rail is restyled — and a metric
 *  that fails silently is worse than no metric. */
const ENGAGEMENT_ATTR = 'data-analytics'

function scrollDepthPercent(): number {
	const doc = document.documentElement
	const scrollable = doc.scrollHeight - window.innerHeight
	// A page shorter than the viewport is fully read the moment it renders.
	if (scrollable <= 0) return 100
	return Math.round(((window.scrollY || doc.scrollTop) / scrollable) * 100)
}

function observeScrollDepth(surface: Surface, path: string): void {
	const fired = new Set<ScrollMilestone>()
	let readFired = false
	const openedAt = Date.now()
	let queued = false

	const evaluate = () => {
		queued = false
		const depth = scrollDepthPercent()

		for (const milestone of SCROLL_MILESTONES) {
			if (depth >= milestone && !fired.has(milestone)) {
				fired.add(milestone)
				track({ name: 'dispatch_scroll_depth', properties: { surface, path, depth: milestone } })
			}
		}

		// Read completion is a separate editorial claim from "scrolled to the
		// end": it needs the depth AND enough time on the page to have read
		// what was scrolled past.
		const dwell = Date.now() - openedAt
		if (!readFired && depth >= READ_DEPTH && dwell >= READ_DWELL_FLOOR_MS) {
			readFired = true
			track({
				name: 'dispatch_read_complete',
				properties: { surface, path, dwell_seconds: Math.round(dwell / 1000) },
			})
		}

		// Everything is fired and nothing can change: stop listening entirely
		// rather than keep a live handler on the page for the rest of the visit.
		if (fired.size === SCROLL_MILESTONES.length && readFired) {
			window.removeEventListener('scroll', onScroll)
		}
	}

	const onScroll = () => {
		if (queued) return
		queued = true
		requestAnimationFrame(evaluate)
	}

	window.addEventListener('scroll', onScroll, { passive: true })
	// A short page, or one restored mid-scroll, may already satisfy a
	// milestone before the reader touches anything.
	requestAnimationFrame(evaluate)
	// The dwell floor means the read event can come due while the page is
	// perfectly still, with no scroll event left to notice it.
	window.setTimeout(evaluate, READ_DWELL_FLOOR_MS + 500)
}

function observeEngagement(surface: Surface): void {
	// One delegated listener rather than per-element handlers: the wire rail
	// re-renders its entries as the feed polls, and anything bound per element
	// would attach to nodes that no longer exist.
	document.addEventListener(
		'click',
		(event) => {
			const target = event.target
			if (!(target instanceof Element)) return
			const el = target.closest(`[${ENGAGEMENT_ATTR}]`)
			if (!el) return
			const declared = el.getAttribute(ENGAGEMENT_ATTR)
			if (!declared) return

			const [kind, value] = declared.split(':')
			if (kind === 'nav') {
				track({ name: 'nav_engagement', properties: { surface, target: value ?? 'unknown' } })
				return
			}
			if (kind === 'wire') {
				// The pause control reports the state it is moving INTO, which is
				// the readable one: aria-pressed still holds the old value at
				// click time.
				const action: WireAction =
					value === 'pause-toggle'
						? el.getAttribute('aria-pressed') === 'true'
							? 'resume'
							: 'pause'
						: ((value ?? 'entry_open') as WireAction)
				track({ name: 'wire_engagement', properties: { surface, action } })
			}
		},
		{ passive: true },
	)
}

/**
 * Boot the editorial instrumentation for this page. Safe to call when
 * unarmed — it returns before observing anything, so an unkeyed build carries
 * no listeners at all.
 */
export async function bootAnalytics(): Promise<void> {
	if (!analyticsArmed()) return
	await initAnalytics()
	const path = window.location.pathname
	const surface = surfaceFor(path)
	observeScrollDepth(surface, path)
	observeEngagement(surface)
}
