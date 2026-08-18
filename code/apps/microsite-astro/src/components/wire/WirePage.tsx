/**
 * WirePage — the /wire surface: full 50-entry history (ADR-0001 Addendum).
 *
 * Day-grouped feed, platform filter pills, anchor permalinks (/wire#{id}),
 * "updated Xm ago", Guardian-style "N new publishes" toast when scrolled
 * below the fold, and APG feed-pattern keyboard traversal (PageDown/PageUp
 * between cards; Ctrl+Home/End escapes to the ends of the wire). 30s poll
 * per the kickoff-gate cadence decision. Silent paused-state (gate Q6):
 * timestamps carry the truth, no cadence commentary.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react'
import { PALETTE } from '../home/shared/palette'
import type { WireEntry } from '../../lib/wire/contract'
import { WireCard } from './WireCard'
import { platformLabel, useWireFeed } from './useWireFeed'
import { dayLabel, updatedAgo } from './relative-time'

const WIRE_INTERVAL_MS = 30_000
const TOAST_SCROLL_THRESHOLD = 600

interface DayGroup {
	day: string
	entries: Array<{ entry: WireEntry; posinset: number }>
}

export function WirePage() {
	const { state, displayed, paused, togglePause, pendingCount, announcements } =
		useWireFeed(WIRE_INTERVAL_MS)
	const [filter, setFilter] = useState<string | null>(null)
	const [toastCount, setToastCount] = useState(0)
	const feedRef = useRef<HTMLDivElement>(null)
	const topRef = useRef<HTMLParagraphElement>(null)
	const endRef = useRef<HTMLParagraphElement>(null)
	const prevIdsRef = useRef<Set<string>>(new Set(displayed.entries.map((e) => e.id)))
	const reducedMotion = useReducedMotion()
	const now = state.lastFetched ?? Date.now()

	// Guardian toast: count entries that arrived while the reader is deep in
	// the page; clicking returns to the top of the wire and clears it.
	useEffect(() => {
		const prev = prevIdsRef.current
		const fresh = displayed.entries.filter((e) => !prev.has(e.id))
		prevIdsRef.current = new Set(displayed.entries.map((e) => e.id))
		if (fresh.length > 0 && window.scrollY > TOAST_SCROLL_THRESHOLD) {
			setToastCount((c) => c + fresh.length)
		}
	}, [displayed.entries])

	const platforms = useMemo(
		() => [...new Set(displayed.entries.map((e) => e.platform))],
		[displayed.entries],
	)
	const filtered = useMemo(
		() => (filter ? displayed.entries.filter((e) => e.platform === filter) : displayed.entries),
		[displayed.entries, filter],
	)
	const groups = useMemo<DayGroup[]>(() => {
		const out: DayGroup[] = []
		filtered.forEach((entry, i) => {
			const day = dayLabel(entry.ts)
			const last = out[out.length - 1]
			const item = { entry, posinset: i + 1 }
			if (last && last.day === day) last.entries.push(item)
			else out.push({ day, entries: [item] })
		})
		return out
	}, [filtered])

	// APG feed pattern: PageDown/PageUp move between cards, Ctrl+Home/End
	// escape to the wire's ends.
	const onFeedKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const cards = feedRef.current?.querySelectorAll<HTMLElement>('article[tabindex]')
		if (!cards || cards.length === 0) return
		if (e.ctrlKey && e.key === 'Home') {
			e.preventDefault()
			topRef.current?.focus()
			return
		}
		if (e.ctrlKey && e.key === 'End') {
			e.preventDefault()
			endRef.current?.focus()
			return
		}
		if (e.key !== 'PageDown' && e.key !== 'PageUp') return
		e.preventDefault()
		const list = [...cards]
		const active = document.activeElement
		const idx = list.findIndex((c) => c === active || c.contains(active))
		const next = e.key === 'PageDown' ? Math.min(list.length - 1, idx + 1) : Math.max(0, idx - 1)
		list[next]?.focus()
	}

	const freshness = updatedAgo(state.lastFetched, Date.now())

	return (
		<MotionConfig reducedMotion="user">
			<div className="mx-auto max-w-[900px]">
				{/* Status row */}
				<p
					ref={topRef}
					tabIndex={-1}
					suppressHydrationWarning
					className="dispatch-emboss flex flex-wrap items-baseline gap-x-4 gap-y-2 font-mono text-[12px] uppercase tracking-[0.32em]"
				>
					<span style={{ color: PALETTE.copperLabel }}>Crossfire publish wire</span>
					{state.status === 'reconnecting' && <span role="status">reconnecting</span>}
					{freshness ? <span>{freshness}</span> : <span>build snapshot</span>}
				</p>

				{/* Controls: filter pills + pause */}
				<div className="mt-5 flex flex-wrap items-center gap-2">
					<FilterPill label="All" active={filter === null} onClick={() => setFilter(null)} />
					{platforms.map((p) => (
						<FilterPill
							key={p}
							label={platformLabel(p)}
							active={filter === p}
							onClick={() => setFilter(filter === p ? null : p)}
						/>
					))}
					<span className="mx-1 hidden text-body-faint md:inline" aria-hidden="true">·</span>
					<button
						type="button"
						aria-pressed={paused}
						onClick={togglePause}
						className="min-h-6 rounded-sm border border-body-strong/30 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.22em] text-body-muted transition-colors hover:border-body-strong/60"
					>
						{paused ? `Resume${pendingCount > 0 ? ` · ${pendingCount} new` : ''}` : 'Pause updates'}
					</button>
				</div>

				{/* The wire */}
				{filtered.length === 0 ? (
					<p className="mt-12 font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted">
						{displayed.entries.length === 0 ? 'Nothing on the wire yet.' : 'No publishes on this platform yet.'}
					</p>
				) : (
					<div
						ref={feedRef}
						role="feed"
						aria-label="Crossfire publish wire"
						onKeyDown={onFeedKeyDown}
						className="mt-10"
					>
						{groups.map((group) => (
							<div key={group.day} className="mb-10">
								<p className="dispatch-emboss border-b border-body-strong/20 pb-2 font-mono text-[12px] uppercase tracking-[0.42em]">
									{group.day}
								</p>
								<motion.div
									initial="hidden"
									whileInView="shown"
									viewport={{ once: true, amount: 0.1 }}
									transition={{ staggerChildren: 0.07 }}
									className="mt-4 grid gap-2"
								>
									{group.entries.map(({ entry, posinset }) => (
										<div key={entry.id} className="scroll-mt-24">
											<WireCard entry={entry} posinset={posinset} setsize={filtered.length} now={now} />
										</div>
									))}
								</motion.div>
							</div>
						))}
					</div>
				)}

				{/* End line — Ctrl+End target */}
				<p
					ref={endRef}
					tabIndex={-1}
					className="mt-4 border-t border-body-strong/20 pt-4 font-mono text-[12px] uppercase tracking-[0.32em] text-body-faint"
				>
					End of the wire · rolling 50 publishes / 30 days · posted automatically by Crossfire
				</p>

				{/* Polite announcer */}
				<div aria-live="polite" aria-relevant="additions" aria-atomic="false" className="sr-only">
					{announcements.map((a, i) => (
						<p key={`${i}-${a}`}>{a}</p>
					))}
				</div>

				{/* New-publishes toast (Guardian pattern) */}
				<AnimatePresence>
					{toastCount > 0 && (
						<motion.button
							type="button"
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 16 }}
							transition={{ duration: 0.3 }}
							onClick={() => {
								setToastCount(0)
								window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
							}}
							className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-body-strong/40 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.22em] shadow-lg backdrop-blur"
							style={{ backgroundColor: PALETTE.wheat, color: 'oklch(0.18 0.02 60)' }}
						>
							{toastCount} new {toastCount === 1 ? 'publish' : 'publishes'} ↑
						</motion.button>
					)}
				</AnimatePresence>
			</div>
		</MotionConfig>
	)
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
	return (
		<button
			type="button"
			aria-pressed={active}
			onClick={onClick}
			className="min-h-6 rounded-full border px-3 py-1 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors"
			style={
				active
					? { backgroundColor: PALETTE.copperLabel, borderColor: PALETTE.copperLabel, color: PALETTE.onCopper }
					: { borderColor: 'color-mix(in oklch, var(--color-body-strong, currentColor) 30%, transparent)' }
			}
		>
			{label}
		</button>
	)
}
