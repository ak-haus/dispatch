/**
 * Contract guard (Golden Board A3) — isWireFeed is a CONTENT-TRUST boundary,
 * not a type check: entry urls become real <a href> targets, so the https
 * allowlist is what stands between a hostile feed and a javascript:/data:
 * link in a reader's click path. Invalid feeds must be rejected WHOLE.
 */

import { describe, expect, it } from 'vitest'
import { EMPTY_FEED, isWireFeed } from './contract'

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
