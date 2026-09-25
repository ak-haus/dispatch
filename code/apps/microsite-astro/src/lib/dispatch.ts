/**
 * The editorial derivations (F61): the one place each fact about a dispatch is
 * worked out, so no two surfaces can disagree about it.
 *
 * F61's defect class was never one bad string. It was surfaces inventing data
 * the editorial contract (src/content.config.ts) already supplies, or could be
 * derived from, and every surface doing it its own way. Measured at Build 33:
 * the home featured dispatch-02 while the site's own feed called dispatch-06
 * the newest, the "More dispatches" folios numbered cards by position while
 * each dispatch's page numbered it by id, and one datum rendered in two date
 * formats. Each rule below already existed in ONE place in this codebase and
 * is lifted here so every surface uses that one:
 *
 *   - newestFirst          — rss.xml.ts's order (B18): date, then id.
 *   - dispatchNumber       — DispatchArticleLayout's "Dispatch NN" (from the id).
 *   - formatDispatchDate   — the date as the dispatch's own page prints it.
 *   - formatEditionDate    — the masthead's long dateline, fed an issue date.
 *
 * Pure: no astro:* or node:* imports, so the unit suite runs it directly.
 */

/** The fields of a dispatch entry the order is decided from. */
export interface OrderedEntry {
	id: string
	data: { date: Date }
}

/**
 * Newest first; same-day dispatches in reverse id order, so the order is
 * stable. The contract's `date` is a calendar day, and five of the six
 * dispatches share one, so a date-only sort leaves their order to however the
 * collection happened to be enumerated — which Astro documents as
 * non-deterministic and platform-dependent. The feed has always broken the tie
 * by id; this is that rule, shared.
 */
export function newestFirst(a: OrderedEntry, b: OrderedEntry): number {
	return b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id)
}

const NUMBERED_ID = /^dispatch-?(\d+)$/i

/**
 * A dispatch's number, zero-padded to two digits, as its own page prints it
 * ("Vol. 1 · Dispatch 03"). The number is carried by the id — the filename,
 * which is the route (AGENTS.md) — and nowhere else in the contract, so an id
 * that carries none has no number: `undefined`, and the caller shows nothing
 * rather than a position or a guess.
 */
export function dispatchNumber(id: string): string | undefined {
	const match = NUMBERED_ID.exec(id)
	return match ? match[1]!.padStart(2, '0') : undefined
}

/** A dispatch's date — the calendar day in the contract, printed ISO 8601
 *  (YYYY-MM-DD), the form its own page and the home already used. */
export function formatDispatchDate(date: Date): string {
	return new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone: 'UTC',
	}).format(date)
}

/** The masthead's long dateline ("May 13, 2026"). Fed the ISSUE's date — the
 *  newest dispatch's — never the reader's clock: a dateline that re-dates
 *  itself every day tells the reader an issue is new when it is not. */
export function formatEditionDate(date: Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	}).format(date)
}
