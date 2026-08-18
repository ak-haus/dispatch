/**
 * WireTicker — the homepage Live Wire strip (ADR-0001, both-surfaces decision).
 *
 * A static stacked feed of the latest publishes — NEVER a marquee (NN/g
 * auto-motion cost + WCAG 2.2.2; the kinetic tape idiom belongs to
 * BuildTicker's commit log alone). One-shot staggered entrance on
 * scroll-into-view, transform+opacity only. Cadence: 60s base poll per the
 * kickoff-gate decision; pause/stop/hide via the visible Pause control.
 *
 * Paused-state honesty (gate Q6): no cadence commentary anywhere — the feed
 * carries real timestamps and a "updated Xm ago" line, nothing else.
 */

import { motion } from 'motion/react'
import { PALETTE } from '../home/shared/palette'
import { WireCard } from './WireCard'
import { useWireFeed } from './useWireFeed'
import { updatedAgo } from './relative-time'

const TICKER_INTERVAL_MS = 60_000
const TICKER_COUNT = 4

export function WireTicker() {
	const { state, displayed, paused, togglePause, pendingCount, announcements } =
		useWireFeed(TICKER_INTERVAL_MS)
	const entries = displayed.entries.slice(0, TICKER_COUNT)
	const now = state.lastFetched ?? Date.now()
	const freshness =
		state.status === 'live' || state.lastFetched !== null
			? updatedAgo(state.lastFetched, Date.now())
			: 'build snapshot'

	return (
		<div className="relative border-t border-body-strong/15">
			<div className="mx-auto max-w-[1880px] px-6 py-12 md:px-16 md:py-16">
				{/* Strip header */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7 }}
					className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b border-body-strong/25 pb-3"
				>
					<div className="flex items-baseline gap-4">
						<span
							id="wire-ticker-label"
							className="font-mono text-[12px] uppercase tracking-[0.42em]"
							style={{ color: PALETTE.copperLabel }}
						>
							Live Wire
						</span>
						<span className="font-narrative italic text-[clamp(1.5rem,4vw,3rem)] leading-[0.95] tracking-[-0.018em] text-body-strong">
							Publishes, as they fire
						</span>
					</div>
					<div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted">
						{state.status === 'reconnecting' && (
							<span className="dispatch-emboss" role="status">reconnecting</span>
						)}
						{freshness && <span suppressHydrationWarning>{freshness}</span>}
						<button
							type="button"
							aria-pressed={paused}
							onClick={togglePause}
							className="min-h-6 rounded-sm border border-body-strong/30 px-3 py-1 uppercase tracking-[0.22em] transition-colors hover:border-body-strong/60"
						>
							{paused ? `Resume${pendingCount > 0 ? ` · ${pendingCount} new` : ''}` : 'Pause updates'}
						</button>
					</div>
				</motion.div>

				{/* The feed — static stack, one-shot stagger */}
				{entries.length === 0 ? (
					<p className="mt-8 font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted">
						Nothing on the wire yet.
					</p>
				) : (
					<motion.div
						role="feed"
						aria-labelledby="wire-ticker-label"
						initial="hidden"
						whileInView="shown"
						viewport={{ once: true, amount: 0.15 }}
						transition={{ staggerChildren: 0.08 }}
						className="mt-6 grid gap-1 md:grid-cols-2 md:gap-x-12"
					>
						{entries.map((entry, i) => (
							<WireCard
								key={entry.id}
								entry={entry}
								posinset={i + 1}
								setsize={entries.length}
								now={now}
							/>
						))}
					</motion.div>
				)}

				{/* Polite announcer — additions only, never timestamp ticks */}
				<div aria-live="polite" aria-relevant="additions" aria-atomic="false" className="sr-only">
					{announcements.map((a, i) => (
						<p key={`${i}-${a}`}>{a}</p>
					))}
				</div>

				{/* Tape line to the full wire */}
				<p className="mt-6 flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted">
					<a href="/wire" className="transition-colors hover:text-body-strong" style={{ color: PALETTE.copperLabel }}>
						The full wire →
					</a>
					<span className="hidden md:inline">Success-only · sanitized at the source · posted automatically by Crossfire</span>
				</p>
			</div>
		</div>
	)
}
