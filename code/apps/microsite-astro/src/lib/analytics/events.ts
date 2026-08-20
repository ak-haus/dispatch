/**
 * The editorial event contract (ADR-0003 §Stage 6: "editorial events only —
 * scroll-depth milestones, dispatch read-completion, nav/Live-Wire
 * engagement").
 *
 * A closed union, not a string parameter. The point is not type comfort: the
 * weekly loop queries these names in HogQL, so an event invented at a call
 * site is a silent hole in the analysis — it lands in PostHog, nothing queries
 * it, and the finding it would have supported never appears. Adding an event
 * means adding it here, which is where the HogQL has to change too.
 *
 * No property on any event may identify a reader. The posture enforces that
 * twice over (`person_profiles: 'never'` + the before_send drop), so these
 * shapes carry only what a page can say about itself: which surface, how far,
 * how long.
 */

/** Depth milestones, in percent. Deliberately coarse: the budget is 1M
 *  events/mo and the editorial question is "did they get through it?", not a
 *  continuous scroll trace. A per-frame or per-percent capture would answer
 *  the same question at ~100× the cost. */
export const SCROLL_MILESTONES = [25, 50, 75, 90] as const
export type ScrollMilestone = (typeof SCROLL_MILESTONES)[number]

/** Surfaces, named as the editorial product names them rather than by route,
 *  so a URL change does not break a year of history. */
export type Surface = 'home' | 'dispatch' | 'wire' | 'sitemap' | 'other'

export type EditorialEvent =
	| { name: 'dispatch_scroll_depth'; properties: { surface: Surface; path: string; depth: ScrollMilestone } }
	| {
			name: 'dispatch_read_complete'
			properties: { surface: Surface; path: string; dwell_seconds: number; words?: number }
	  }
	| { name: 'nav_engagement'; properties: { surface: Surface; target: string } }
	| { name: 'wire_engagement'; properties: { surface: Surface; action: WireAction } }

export type WireAction = 'pause' | 'resume' | 'filter' | 'entry_open'

export type EditorialEventName = EditorialEvent['name']

/** Every event name the instrumentation may emit — the list the weekly loop's
 *  HogQL is written against. Exported so a test can assert the two agree. */
export const EDITORIAL_EVENT_NAMES = [
	'dispatch_scroll_depth',
	'dispatch_read_complete',
	'nav_engagement',
	'wire_engagement',
] as const satisfies readonly EditorialEventName[]

/** Route → surface. Kept here rather than at the call site so every event
 *  agrees on what it is looking at. */
export function surfaceFor(pathname: string): Surface {
	if (pathname === '/') return 'home'
	if (pathname.startsWith('/dispatch/')) return 'dispatch'
	if (pathname.startsWith('/wire')) return 'wire'
	if (pathname.startsWith('/sitemap')) return 'sitemap'
	return 'other'
}
