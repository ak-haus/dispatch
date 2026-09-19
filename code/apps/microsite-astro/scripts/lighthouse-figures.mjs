// The Lighthouse ratchet's figures, printed on every run (F40).
//
// lhci asserts on the most optimistic of the three runs (the lowest value for
// a ceiling, the highest for a score) and prints nothing when every assertion
// passes, so CI's readings were invisible unless a gate failed. This prints
// them per surface: the median of each metric, the min–max range lhci's
// assertion draws on, and the LCP element. Output goes to the job log and,
// in Actions, to the step summary, so CI's numbers can sit beside
// production's.
//
// It also fails when a run measured the page without the licensed faces. The
// job hydrates the PP rail before it builds (fetch:fonts, as the visual lanes
// have since S1). Without the faces the article shifted by 0.2326 in CI while
// production shifted by 0.0000: a page no reader sees. Every page preloads
// both PP faces (StackLayout), so each run must show them served with a 200.
//
// Usage: node scripts/lighthouse-figures.mjs [dir]   (default: .lighthouseci)

import { appendFileSync, existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** The licensed faces on the private rail (the FONTS list in fetch-fonts.mjs). */
export const PP_FACE = /\/fonts\/PP[^/]*\.woff2$/

const METRICS = [
	{ id: 'largest-contentful-paint', label: 'LCP (ms)', format: (v) => Math.round(v) },
	{ id: 'first-contentful-paint', label: 'FCP (ms)', format: (v) => Math.round(v) },
	{ id: 'cumulative-layout-shift', label: 'CLS', format: (v) => v.toFixed(4) },
	{ id: 'total-blocking-time', label: 'TBT (ms)', format: (v) => Math.round(v) },
	{ id: 'total-byte-weight', label: 'KB', format: (v) => Math.round(v / 1024) },
]

export function median(values) {
	const sorted = [...values].sort((a, b) => a - b)
	const mid = Math.floor((sorted.length - 1) / 2)
	return sorted.length % 2 ? sorted[mid] : (sorted[mid] + sorted[mid + 1]) / 2
}

/** The path lhci matched its assertion patterns against. */
function surfaceOf(lhr) {
	return new URL(lhr.requestedUrl ?? lhr.finalDisplayedUrl).pathname
}

/** The PP face requests in one run, each with its HTTP status. */
export function ppFaceRequests(lhr) {
	const items = lhr.audits?.['network-requests']?.details?.items ?? []
	return items
		.filter((item) => PP_FACE.test(new URL(item.url).pathname))
		.map((item) => ({ url: item.url, status: item.statusCode }))
}

/** Runs that did not load the PP faces: none requested, or any not a 200. */
export function fontlessRuns(lhrs) {
	return lhrs
		.map((lhr) => ({ surface: surfaceOf(lhr), faces: ppFaceRequests(lhr) }))
		.filter(({ faces }) => faces.length === 0 || faces.some((face) => face.status !== 200))
}

function lcpElement(lhr) {
	const node = lhr.audits?.['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node
	if (!node) return '—'
	const tag = node.snippet?.match(/^<([a-z0-9-]+)/i)?.[1] ?? '?'
	// An image names itself by its source; text by its opening words.
	const src = tag === 'img' ? node.snippet.match(/\ssrc="([^"]+)"/)?.[1] : undefined
	const label = (src ?? node.nodeLabel ?? '').replace(/\s+/g, ' ').slice(0, 48).replace(/\|/g, '/')
	return `\`${tag}\` ${label}`
}

/** One markdown table: a row per surface, median (min–max) per metric. */
export function figuresTable(lhrs) {
	const bySurface = new Map()
	for (const lhr of lhrs) {
		const surface = surfaceOf(lhr)
		bySurface.set(surface, [...(bySurface.get(surface) ?? []), lhr])
	}
	const header = ['surface', 'runs', 'perf', ...METRICS.map((m) => m.label), 'LCP element (median run)']
	const rows = [...bySurface.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([surface, runs]) => {
			const cell = (values, format) => {
				const lo = format(Math.min(...values))
				const hi = format(Math.max(...values))
				const mid = format(median(values))
				return lo === hi ? `${mid}` : `${mid} (${lo}–${hi})`
			}
			const perf = cell(
				runs.map((lhr) => lhr.categories.performance.score * 100),
				(v) => Math.round(v),
			)
			const metrics = METRICS.map((m) => cell(runs.map((lhr) => lhr.audits[m.id].numericValue), m.format))
			const lcps = runs.map((lhr) => lhr.audits['largest-contentful-paint'].numericValue)
			const medianRun = runs[lcps.indexOf([...lcps].sort((a, b) => a - b)[Math.floor((lcps.length - 1) / 2)])]
			return [surface, runs.length, perf, ...metrics, lcpElement(medianRun)]
		})
	const line = (cells) => `| ${cells.join(' | ')} |`
	return [line(header), line(header.map(() => '---')), ...rows.map(line)].join('\n')
}

export function loadReports(dir) {
	if (!existsSync(dir)) return []
	return readdirSync(dir)
		.filter((name) => /^lhr-\d+\.json$/.test(name))
		.map((name) => JSON.parse(readFileSync(path.join(dir, name), 'utf8')))
}

function main() {
	const dir = process.argv[2] ?? '.lighthouseci'
	const lhrs = loadReports(dir)
	if (lhrs.length === 0) {
		console.error(`lighthouse-figures: no Lighthouse reports in ${dir}`)
		process.exitCode = 1
		return
	}
	const first = lhrs[0]
	const chrome = first.environment?.hostUserAgent?.match(/Chrome\/[\d.]+/)?.[0] ?? 'Chrome ?'
	const settings = first.configSettings ?? {}
	const fontless = fontlessRuns(lhrs)
	const report = [
		'### Lighthouse ratchet — CI figures (F40)',
		'',
		`Lighthouse ${first.lighthouseVersion} · ${chrome} · ${settings.formFactor ?? '?'} · ${settings.throttlingMethod ?? '?'} throttling. ` +
			'Each cell is the median of the runs, with the min–max range; lhci asserts on the most optimistic run.',
		'',
		figuresTable(lhrs),
		'',
		fontless.length === 0
			? `PP faces: served (200) in all ${lhrs.length} runs.`
			: `**PP faces MISSING in ${fontless.length} of ${lhrs.length} runs** (${[...new Set(fontless.map((run) => run.surface))].join(', ')}): ` +
				'these runs measured a page no reader sees. Hydrate the rail (fetch:fonts) before the build.',
	].join('\n')
	console.log(report)
	if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`)
	if (fontless.length > 0) process.exitCode = 1
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
