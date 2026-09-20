/**
 * The hydration half of the SSR reveal fallback (F63 · F66).
 *
 * Motion server-renders `initial={{ opacity: 0 }}` as an inline style and only
 * hydration clears it. `global.css` carries a keyframe that reveals those
 * elements with no JavaScript at all — the one mechanism that survives the
 * failure it is rescuing. This cancels that fallback when React proves it is
 * alive, so the designed choreography still plays on a healthy load.
 *
 * The cancel is DEADLINE-BOUND, and that is the whole safety argument: the
 * keyframe's delay is measured from the element's first style resolution,
 * which is at or after navigation start, so it can never have fired before
 * `performance.now()` reaches the same delay. Cancelling only inside that
 * window therefore cannot re-hide content a reader is already looking at —
 * a late hydration leaves the fallback in force and the page stays readable.
 */

/** Must equal `--ssr-reveal-delay` in global.css. Pinned by ssr-reveal.test.ts. */
export const SSR_REVEAL_DELAY_MS = 2000

export function markMotionReady(): void {
	if (typeof document === 'undefined') return
	// Too late to cancel: the keyframe may already have revealed content, and
	// removing it would snap that content back to the server-rendered
	// `opacity: 0`. Leave the rescue in force — visible beats choreographed.
	if (performance.now() >= SSR_REVEAL_DELAY_MS) return
	document.documentElement.setAttribute('data-motion-ready', '')
}
