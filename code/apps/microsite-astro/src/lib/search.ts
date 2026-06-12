/**
 * DISpatch search — client + server safe.
 *
 * Pure types + pure functions for querying a pre-built index. No
 * `astro:content` imports here so React islands can consume safely.
 *
 * The index BUILDER (which reads the content collection at server-render
 * time) lives in `./search-index.ts`. That file imports `astro:content`
 * and is therefore server-only; it must NOT be imported from React
 * islands or Vite will bundle `astro:content` into the client and crash.
 */

export type SearchRecordType = 'article' | 'district' | 'building' | 'footnote' | 'DLDS'
export type DldsLane = 'Human-led' | 'Hybrid' | 'AI-led'

export interface SearchRecord {
	id: string
	type: SearchRecordType
	title: string
	snippet: string
	href: string
	lane?: DldsLane
	kicker?: string
	tags?: readonly string[]
}

/**
 * Pure-function query helper. Deterministic given (index, query).
 *
 * Match strategy V1: case-insensitive substring against title, snippet,
 * tags, kicker. Ranked by where the match occurs. Caps at 8 results.
 */
export function searchIndex(index: readonly SearchRecord[], query: string): SearchRecord[] {
	const q = query.trim().toLowerCase()
	if (!q) return []

	const scored: Array<{ record: SearchRecord; score: number }> = []

	for (const record of index) {
		let score = 0
		const title = record.title.toLowerCase()
		const snippet = record.snippet.toLowerCase()
		const kicker = (record.kicker ?? '').toLowerCase()
		const tagsJoined = (record.tags ?? []).join(' ').toLowerCase()

		if (title.includes(q)) score += 100
		if (title.startsWith(q)) score += 50
		if (kicker.includes(q)) score += 30
		if (tagsJoined.includes(q)) score += 20
		if (snippet.includes(q)) score += 10

		if (score > 0) scored.push({ record, score })
	}

	scored.sort((a, b) => b.score - a.score)
	return scored.slice(0, 8).map((s) => s.record)
}

/**
 * Highlight query occurrences in a string. Returns an array of segments
 * tagged with `match: boolean` so the renderer can wrap matches in <mark>.
 *
 * Case-insensitive but preserves original casing in output.
 */
export function highlightMatches(
	text: string,
	query: string
): Array<{ text: string; match: boolean }> {
	const q = query.trim()
	if (!q) return [{ text, match: false }]

	const segments: Array<{ text: string; match: boolean }> = []
	const lower = text.toLowerCase()
	const lowerQ = q.toLowerCase()

	let cursor = 0
	let next = lower.indexOf(lowerQ, cursor)
	while (next !== -1) {
		if (next > cursor) segments.push({ text: text.slice(cursor, next), match: false })
		segments.push({ text: text.slice(next, next + q.length), match: true })
		cursor = next + q.length
		next = lower.indexOf(lowerQ, cursor)
	}
	if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false })

	return segments
}
