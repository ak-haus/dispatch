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
		// Not just a type check: ts is handed to Intl.DateTimeFormat by
		// absoluteTime()/dayLabel(), which throw RangeError on an unparseable
		// value. A throw there unmounts the React tree and the surface renders
		// empty in front of the reader, so validity is part of the contract.
		typeof e.ts === 'string' &&
		Number.isFinite(new Date(e.ts).getTime()) &&
		typeof e.platform === 'string' &&
		e.kind === 'publish' &&
		typeof e.title === 'string' &&
		// Content-trust boundary, not just a type check: entry urls become real
		// <a href> targets, so only https may pass — a hostile feed can never
		// smuggle javascript:/data: schemes into a card link.
		typeof e.url === 'string' &&
		isSafeHttpsUrl(e.url) &&
		(e.excerpt === undefined || typeof e.excerpt === 'string')
	)
}

/**
 * The entry cap the UI has always claimed (F62).
 *
 * `/wire` prints "rolling 50 publishes / 30 days" while nothing enforced 50:
 * a 500-entry feed rendered 500 <article> elements and 501 filter pills,
 * 903,777 characters of innerHTML. The cap is here rather than in a render
 * so the ticker and the page cannot disagree about what "the feed" is.
 */
export const MAX_FEED_ENTRIES = 50

/**
 * A scheme check is not a URL check (F62).
 *
 * `startsWith('https://')` accepts `https://example.com@evil.example.com/x`,
 * whose real host is `evil.example.com` — the leading text is userinfo. That
 * is inert while the URL is never displayed and a phishing surface the moment
 * a domain chip is added, which is the kind of latency this contract exists
 * to remove. Parse it, then require https AND no credentials.
 */
export function isSafeHttpsUrl(raw: string): boolean {
	/* The literal prefix stays, and it is not redundant: `new URL()`
	 * NORMALISES before it reports, lowercasing a case-shifted scheme and
	 * trimming leading whitespace — both of which this contract has always
	 * rejected, and both of which a parse-only check silently readmitted.
	 * The existing allowlist tests caught exactly that. Parse second, to
	 * reach what a prefix check cannot see. */
	if (!raw.startsWith('https://')) return false
	let u: URL
	try {
		u = new URL(raw)
	} catch {
		return false
	}
	return u.protocol === 'https:' && u.username === '' && u.password === ''
}

/**
 * Bidi control characters, stripped from display text (F62).
 *
 * A title of `invoice` + U+202E + `gnp.exe` renders as `invoiceexe.png` — display
 * spoofing, inert as code but a lie to the reader. Unicode TR#9's explicit
 * directional formatting characters have no legitimate place in a feed title
 * we render, and removing them is the mitigation the Trojan Source advisory
 * (CVE-2021-42574) recommends for untrusted text.
 */
const BIDI_CONTROLS = /[\u202A-\u202E\u2066-\u2069\u200E\u200F]/g

export function stripBidiControls(text: string): string {
	return text.replace(BIDI_CONTROLS, '')
}

/**
 * Normalise a validated feed for display: strip bidi controls from the text
 * a reader sees, and hold the feed to its stated length. Ids are already
 * known unique — `isWireFeed` rejects a feed with duplicates outright.
 */
export function normalizeFeed(feed: WireFeed): WireFeed {
	return {
		...feed,
		entries: feed.entries.slice(0, MAX_FEED_ENTRIES).map((e) => ({
			...e,
			title: stripBidiControls(e.title),
			excerpt: e.excerpt === undefined ? undefined : stripBidiControls(e.excerpt),
		})),
	}
}

/** Runtime guard for polled JSON — tolerant of extra fields (forward compat),
 *  strict on the load-bearing ones. Invalid feeds are rejected whole: the
 *  surfaces keep their last-good state rather than render a half-parsed feed. */
export function isWireFeed(x: unknown): x is WireFeed {
	if (typeof x !== 'object' || x === null) return false
	const f = x as Record<string, unknown>
	if (
		f.schemaVersion !== 1 ||
		typeof f.generatedAt !== 'string' ||
		!Array.isArray(f.entries) ||
		!f.entries.every(isEntry)
	) {
		return false
	}
	/* Ids are DOM ids: WireCard derives `${id}`, `${id}-title` and
	 * `${id}-meta` from them, so three entries sharing an id emit each one
	 * three times over. `aria-labelledby` then resolves all three cards to one
	 * name and `/wire#dupe` is ambiguous — and production React suppresses the
	 * duplicate-key warning, so it fails silently. Uniqueness is part of the
	 * contract, and a feed that breaks it is rejected whole like any other
	 * invalid feed (F62). */
	const ids = new Set((f.entries as WireEntry[]).map((e) => e.id))
	return ids.size === f.entries.length
}
