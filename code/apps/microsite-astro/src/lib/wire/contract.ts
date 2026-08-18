/**
 * Live Wire v1 feed contract — ADR-0001 Addendum (docs/adr/0001-crossfire-live-activity.md).
 *
 * ONE contract, N surfaces: WireTicker (homepage) and WirePage (/wire) both
 * consume this shape; Crossfire's feed-export writes it. The poll URL is a
 * single constant (env-backed) so the rail can move without touching
 * consumers. Entries are success-only, sanitized by Crossfire before write —
 * presence = success, no status field.
 */

export interface WireEntry {
	id: string
	ts: string
	platform: string
	kind: 'publish'
	title: string
	url: string
	excerpt?: string
	pipeline_run?: string
}

export interface WireFeed {
	schemaVersion: 1
	generatedAt: string
	attribution?: string
	entries: WireEntry[]
}

/** The single poll constant. Empty string = no live rail configured yet —
 *  surfaces render the build snapshot and stay in their stale state. */
export const WIRE_FEED_URL: string = import.meta.env.PUBLIC_WIRE_FEED_URL ?? ''

export const EMPTY_FEED: WireFeed = {
	schemaVersion: 1,
	generatedAt: '1970-01-01T00:00:00.000Z',
	entries: [],
}

function isEntry(x: unknown): x is WireEntry {
	if (typeof x !== 'object' || x === null) return false
	const e = x as Record<string, unknown>
	return (
		typeof e.id === 'string' &&
		typeof e.ts === 'string' &&
		typeof e.platform === 'string' &&
		e.kind === 'publish' &&
		typeof e.title === 'string' &&
		// Content-trust boundary, not just a type check: entry urls become real
		// <a href> targets, so only https may pass — a hostile feed can never
		// smuggle javascript:/data: schemes into a card link.
		typeof e.url === 'string' &&
		e.url.startsWith('https://') &&
		(e.excerpt === undefined || typeof e.excerpt === 'string')
	)
}

/** Runtime guard for polled JSON — tolerant of extra fields (forward compat),
 *  strict on the load-bearing ones. Invalid feeds are rejected whole: the
 *  surfaces keep their last-good state rather than render a half-parsed feed. */
export function isWireFeed(x: unknown): x is WireFeed {
	if (typeof x !== 'object' || x === null) return false
	const f = x as Record<string, unknown>
	return (
		f.schemaVersion === 1 &&
		typeof f.generatedAt === 'string' &&
		Array.isArray(f.entries) &&
		f.entries.every(isEntry)
	)
}
