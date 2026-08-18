/**
 * React wiring over the wire store (ADR-0001 Addendum D2).
 *
 * Owns the WCAG 2.2.2 pause semantics: "Pause updates" freezes the DISPLAYED
 * feed while the store keeps polling underneath; resume jumps to CURRENT
 * state — never replays the backlog. New-entry announcements are one plain
 * sentence per publish for the polite live region, never timestamp re-ticks.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSyncExternalStore } from 'react'
import type { WireFeed } from '../../lib/wire/contract'
import {
	configureWireInterval,
	getServerSnapshot,
	getSnapshot,
	subscribe,
	type WireState,
} from '../../lib/wire/store'

const MAX_ANNOUNCEMENTS = 3

export interface WireFeedHandle {
	/** Store state — status + lastFetched always current, even while paused. */
	state: WireState
	/** The feed the surface should render (frozen while paused). */
	displayed: WireFeed
	paused: boolean
	togglePause: () => void
	/** Entries waiting behind the pause (0 while live). */
	pendingCount: number
	/** aria-live sentences, newest last. */
	announcements: string[]
}

function platformLabel(platform: string): string {
	const map: Record<string, string> = {
		bluesky: 'Bluesky',
		devto: 'Dev.to',
		hashnode: 'Hashnode',
		linkedin: 'LinkedIn',
		threads: 'Threads',
		mastodon: 'Mastodon',
		beehiiv: 'Beehiiv',
		substack: 'Substack',
		x: 'X',
	}
	return map[platform] ?? platform.charAt(0).toUpperCase() + platform.slice(1)
}

export { platformLabel }

export function useWireFeed(intervalMs: number): WireFeedHandle {
	configureWireInterval(intervalMs)
	const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
	const [displayed, setDisplayed] = useState<WireFeed>(state.feed)
	const [paused, setPaused] = useState(false)
	const [announcements, setAnnouncements] = useState<string[]>([])
	const displayedRef = useRef(displayed)
	displayedRef.current = displayed

	const syncToCurrent = useCallback((feed: WireFeed) => {
		const known = new Set(displayedRef.current.entries.map((e) => e.id))
		const fresh = feed.entries.filter((e) => !known.has(e.id))
		if (fresh.length > 0) {
			setAnnouncements((prev) =>
				[
					...prev,
					...fresh.map((e) => `Published to ${platformLabel(e.platform)}: ${e.title}`),
				].slice(-MAX_ANNOUNCEMENTS),
			)
		}
		setDisplayed(feed)
	}, [])

	// Follow the store while unpaused; hold the frame while paused.
	useEffect(() => {
		if (!paused && state.feed !== displayedRef.current) syncToCurrent(state.feed)
	}, [state.feed, paused, syncToCurrent])

	const togglePause = useCallback(() => {
		setPaused((was) => {
			if (was) syncToCurrent(getSnapshot().feed) // resume = jump to CURRENT
			return !was
		})
	}, [syncToCurrent])

	const knownIds = new Set(displayed.entries.map((e) => e.id))
	const pendingCount = paused
		? state.feed.entries.filter((e) => !knownIds.has(e.id)).length
		: 0

	return { state, displayed, paused, togglePause, pendingCount, announcements }
}
