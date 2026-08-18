/**
 * generate-wire-snapshot.mjs — build-time snapshot of the Live Wire feed.
 *
 * Fetches the Crossfire activity ledger (PUBLIC_WIRE_FEED_URL) and writes
 * src/data/wire-snapshot.json, which both wire surfaces prerender — the
 * SEO/failure floor from ADR-0001 Addendum D2: real first-paint HTML, a
 * non-empty page with JS off, honest content when the feed is unreachable.
 *
 * Failure mode (mirrors generate-commits.mjs): no URL configured, fetch
 * error, or invalid shape → keep the previously generated/committed
 * snapshot in place and exit 0 so the build never breaks on the rail.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)))
const OUT = join(__dirname, '..', 'src', 'data', 'wire-snapshot.json')

/** Minimal .env reader — the script runs before astro, so PUBLIC_ vars in
 *  .env/.env.local aren't in process.env yet. No dependency, KEY=VALUE only. */
function envFromFiles(key) {
	for (const file of ['.env.local', '.env']) {
		const path = join(__dirname, '..', file)
		if (!existsSync(path)) continue
		for (const line of readFileSync(path, 'utf8').split('\n')) {
			const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"#\n]*)"?\s*(#.*)?$/)
			if (m && m[1] === key && m[2].trim()) return m[2].trim()
		}
	}
	return undefined
}

const url = process.env.PUBLIC_WIRE_FEED_URL || envFromFiles('PUBLIC_WIRE_FEED_URL')

function keepExisting(reason) {
	if (existsSync(OUT)) {
		console.log(`[wire-snapshot] ${reason} — keeping existing snapshot`)
	} else {
		mkdirSync(dirname(OUT), { recursive: true })
		writeFileSync(
			OUT,
			JSON.stringify(
				{ schemaVersion: 1, generatedAt: '1970-01-01T00:00:00.000Z', entries: [] },
				null,
				2,
			),
		)
		console.log(`[wire-snapshot] ${reason} — wrote empty snapshot`)
	}
	process.exit(0)
}

if (!url) keepExisting('PUBLIC_WIRE_FEED_URL not configured')

try {
	const res = await fetch(url, { signal: AbortSignal.timeout(10_000) })
	if (!res.ok) keepExisting(`feed responded ${res.status}`)
	const feed = await res.json()
	const valid =
		feed !== null &&
		typeof feed === 'object' &&
		feed.schemaVersion === 1 &&
		typeof feed.generatedAt === 'string' &&
		Array.isArray(feed.entries)
	if (!valid) keepExisting('feed shape invalid')
	mkdirSync(dirname(OUT), { recursive: true })
	writeFileSync(OUT, JSON.stringify(feed, null, 2))
	console.log(`[wire-snapshot] captured ${feed.entries.length} entries → src/data/wire-snapshot.json`)
} catch (err) {
	keepExisting(`fetch failed (${err?.name ?? 'error'})`)
}
