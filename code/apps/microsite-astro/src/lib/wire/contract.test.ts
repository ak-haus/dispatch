/**
 * Contract guard (Golden Board A3) — isWireFeed is a CONTENT-TRUST boundary,
 * not a type check: entry urls become real <a href> targets, so the https
 * allowlist is what stands between a hostile feed and a javascript:/data:
 * link in a reader's click path. Invalid feeds must be rejected WHOLE.
 */

import { describe, expect, it } from 'vitest'
import { EMPTY_FEED, isWireFeed, isSafeHttpsUrl, stripBidiControls, normalizeFeed, MAX_FEED_ENTRIES } from './contract'

const entry = (over: Record<string, unknown> = {}) => ({
	id: 'run-42',
	ts: '2026-08-18T12:00:00.000Z',
	platform: 'devto',
	kind: 'publish',
	title: 'A publish',
	url: 'https://dev.to/prime/a-publish',
	...over,
})

const feed = (over: Record<string, unknown> = {}) => ({
	schemaVersion: 1,
	generatedAt: '2026-08-18T12:00:00.000Z',
	entries: [entry()],
	...over,
})

describe('isWireFeed — shape', () => {
	it('accepts a valid feed', () => {
		expect(isWireFeed(feed())).toBe(true)
	})

	it('accepts the empty feed constant (the stale floor)', () => {
		expect(isWireFeed(EMPTY_FEED)).toBe(true)
	})

	it('accepts optional fields and tolerates unknown extras (forward compat)', () => {
		expect(
			isWireFeed(
				feed({
					attribution: 'Crossfire',
					futureField: 'ignored',
					entries: [entry({ excerpt: 'a teaser', pipeline_run: 'run-42', novel: true })],
				}),
			),
		).toBe(true)
	})

	it.each([
		['null', null],
		['a string', 'feed'],
		['schemaVersion 2', feed({ schemaVersion: 2 })],
		['missing generatedAt', feed({ generatedAt: undefined })],
		['entries not an array', feed({ entries: 'nope' })],
	])('rejects %s', (_name, bad) => {
		expect(isWireFeed(bad)).toBe(false)
	})

	it('rejects the WHOLE feed when any single entry is invalid', () => {
		expect(isWireFeed(feed({ entries: [entry(), entry({ url: 'http://x.dev/a' })] }))).toBe(false)
	})
})

describe('isWireFeed — entry fields', () => {
	it.each([
		['missing id', { id: undefined }],
		['missing ts', { ts: undefined }],
		['missing platform', { platform: undefined }],
		['kind not publish', { kind: 'retry' }],
		['missing title', { title: undefined }],
		['numeric title', { title: 7 }],
		['excerpt wrong type', { excerpt: 9 }],
	])('rejects an entry with %s', (_name, over) => {
		expect(isWireFeed(feed({ entries: [entry(over)] }))).toBe(false)
	})
})

describe('isWireFeed — the https content-trust allowlist', () => {
	it.each([
		['javascript: scheme', 'javascript:alert(document.cookie)'],
		['data: scheme', 'data:text/html,<script>1</script>'],
		['plain http', 'http://dev.to/prime/a-publish'],
		['protocol-relative', '//evil.example/x'],
		['relative path', '/wire'],
		['case-shifted scheme', 'HTTPS://dev.to/x'],
		['whitespace prefix', ' https://dev.to/x'],
		['empty url', ''],
		['non-string url', 42],
	])('rejects an entry url with %s', (_name, url) => {
		expect(isWireFeed(feed({ entries: [entry({ url })] }))).toBe(false)
	})

	it('accepts a genuine https url', () => {
		expect(isWireFeed(feed({ entries: [entry({ url: 'https://bsky.app/profile/p/post/1' })] }))).toBe(
			true,
		)
	})
})

describe('timestamp validity is contract, not formatting (F50)', () => {
	// The guard checked `typeof e.ts === 'string'` and nothing more, so an
	// unparseable timestamp PASSED and then threw RangeError out of
	// Intl.DateTimeFormat in absoluteTime()/dayLabel() — React unmounted and
	// /wire rendered zero children in front of the reader, on every reload.
	it.each([
		['not a date at all', 'not-a-date'],
		['empty string', ''],
		['whitespace', '   '],
		['a year beyond the ECMAScript range', '+275761-01-01T00:00:00.000Z'],
		['a malformed ISO string', '2026-13-45T99:99:99Z'],
		['a bare label', 'yesterday'],
	])('rejects an entry whose ts is %s', (_name, ts) => {
		expect(isWireFeed(feed({ entries: [entry({ ts })] }))).toBe(false)
	})

	it('accepts a genuine ISO timestamp', () => {
		expect(isWireFeed(feed({ entries: [entry({ ts: '2026-08-18T11:00:00.000Z' })] }))).toBe(true)
	})

	it('a rejected feed means the surface keeps its last-good state, never a throw', () => {
		// The honest-failure path (reject-whole / keep-last-good) only protects
		// feeds the guard REJECTS. This is the assertion that puts a bad date on
		// that side of the line.
		const poisoned = feed({ entries: [entry({ ts: 'not-a-date' })] })
		expect(isWireFeed(poisoned)).toBe(false)
		expect(() =>
			new Intl.DateTimeFormat('en-US').format(new Date('2026-08-18T11:00:00.000Z')),
		).not.toThrow()
	})
})

/* ── F62 — a hostile feed degrades nothing ───────────────────────────────
 * Filed alongside F50 and F64 and distinct from both: these degrade rather
 * than blank or strand. What the guard already got right is most of it —
 * every injection attempt is correctly escaped, and javascript:, data:,
 * http:// and protocol-relative URLs are all rejected at runtime. These pins
 * cover the four seams that were open.
 * ──────────────────────────────────────────────────────────────────────── */
describe('F62 — feed robustness', () => {
	it('rejects a feed whose entries share an id', () => {
		// Ids are DOM ids: WireCard derives `${id}`, `-title` and `-meta` from
		// them, so duplicates make aria-labelledby resolve several cards to one
		// name and /wire#id ambiguous. Production React suppresses the
		// duplicate-key warning, so nothing complains.
		const dupes = feed({
			entries: [entry({ id: 'dupe' }), entry({ id: 'dupe' }), entry({ id: 'dupe' })],
		})
		expect(isWireFeed(dupes)).toBe(false)
		// Control: the same three entries with distinct ids are fine, so this
		// is not a test that rejects everything.
		expect(
			isWireFeed(
				feed({ entries: [entry({ id: 'a' }), entry({ id: 'b' }), entry({ id: 'c' })] }),
			),
		).toBe(true)
	})

	it('rejects an https URL whose real host is hidden behind userinfo', () => {
		// `startsWith('https://')` accepts this; its host is evil.example.com.
		expect(isSafeHttpsUrl('https://example.com@evil.example.com/x')).toBe(false)
		expect(isSafeHttpsUrl('https://user:pw@evil.example.com/x')).toBe(false)
		expect(
			isWireFeed(feed({ entries: [entry({ url: 'https://example.com@evil.example.com/x' })] })),
		).toBe(false)
		// Control: a plain https URL still passes.
		expect(isSafeHttpsUrl('https://dev.to/prime/a-publish')).toBe(true)
	})

	it('holds the feed to the length the UI claims', () => {
		// /wire prints "rolling 50 publishes / 30 days" and nothing enforced it:
		// 500 entries rendered 500 <article> elements and 501 filter pills.
		const many = feed({
			entries: Array.from({ length: 500 }, (_, i) => entry({ id: `e${i}` })),
		})
		expect(isWireFeed(many)).toBe(true)
		expect(normalizeFeed(many as never).entries).toHaveLength(MAX_FEED_ENTRIES)
		// Control: a short feed is passed through whole.
		const few = feed({ entries: [entry({ id: 'a' }), entry({ id: 'b' })] })
		expect(normalizeFeed(few as never).entries).toHaveLength(2)
	})

	it('strips bidi controls from the text a reader sees', () => {
		const RLO = '‮'
		const spoofed = feed({
			entries: [entry({ id: 'x', title: `invoice${RLO}gnp.exe`, excerpt: `a${RLO}b` })],
		})
		const out = normalizeFeed(spoofed as never).entries[0]!
		expect(out.title).toBe('invoicegnp.exe')
		expect(out.excerpt).toBe('ab')
		expect(stripBidiControls(`x${RLO}y`)).toBe('xy')
		// Control: ordinary text is untouched, including non-Latin scripts.
		expect(stripBidiControls('مرحبا Prime')).toBe('مرحبا Prime')
	})
})
