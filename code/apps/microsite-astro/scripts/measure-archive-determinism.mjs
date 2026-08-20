/**
 * The evidence behind the F19 repair — re-runnable, so the claim is checkable
 * rather than quotable (ADR-0003 §Stage 4 flake law).
 *
 * The archive lane's defect was nondeterminism: Chromatic replays each archived
 * DOM in its own cloud browser, so anything captured mid-motion diffs on replay
 * and the lane draws changes on every commit. That is measurable without
 * Chromatic at all — archive the same commit twice and compare.
 *
 * This script does the comparison half. Run the suite twice, keeping each
 * archive, then point it at both:
 *
 *   pnpm test:e2e && cp -R test-results/chromatic-archives /tmp/a
 *   pnpm exec playwright test && cp -R test-results/chromatic-archives /tmp/b
 *   node scripts/measure-archive-determinism.mjs /tmp/a /tmp/b
 *
 * It walks the serialised DOM of every archived snapshot and classifies each
 * differing node by whether it sits inside a `data-live` region. Those are
 * excluded from Chromatic's diff by `ignoreSelectors` (playwright.config.ts),
 * so they cost nothing; anything OUTSIDE one is a change AK would be asked to
 * review on a commit that changed nothing. That number must be zero.
 *
 * Measured on this repo, 2026-08-19:
 *   before — 39 snapshots archived, 21 differed, all outside data-live;
 *   after  —  6 snapshots archived,  3 differed, every differing node inside
 *             data-live, i.e. zero review-visible change.
 */

import fs from 'node:fs'
import path from 'node:path'

const [dirA, dirB] = process.argv.slice(2)
if (!dirA || !dirB) {
	console.error('usage: node scripts/measure-archive-determinism.mjs <archive-dir-a> <archive-dir-b>')
	process.exit(2)
}

/** Yield [path, key, value, insideLiveRegion] for every text node and attribute. */
function* walk(node, at = '', live = false) {
	if (!node || typeof node !== 'object') return
	const attrs = node.attributes ?? {}
	const inside = live || 'data-live' in attrs
	const here = node.tagName ? `${at}/${node.tagName}` : at
	if (node.type === 3) yield [here, '#text', node.textContent, inside]
	for (const [k, v] of Object.entries(attrs)) yield [here, `@${k}`, v, inside]
	for (const [i, child] of (node.childNodes ?? []).entries()) yield* walk(child, `${here}[${i}]`, inside)
}

const snapshots = (dir) =>
	fs
		.readdirSync(path.join(dir, 'archive'))
		.filter((f) => f.endsWith('.snapshot.json'))
		.sort()

const listA = snapshots(dirA)
let totalOutside = 0
let flaky = 0

for (const file of listA) {
	const other = path.join(dirB, 'archive', file)
	if (!fs.existsSync(other)) {
		console.log(`  MISSING in b: ${file}`)
		continue
	}
	const a = [...walk(JSON.parse(fs.readFileSync(path.join(dirA, 'archive', file), 'utf8')).snapshot)]
	const b = [...walk(JSON.parse(fs.readFileSync(other, 'utf8')).snapshot)]
	const diffs = a.filter(([, , v], i) => b[i] && v !== b[i][2])
	if (diffs.length === 0) continue
	flaky++
	const outside = diffs.filter(([, , , inside]) => !inside)
	totalOutside += outside.length
	const name = file.split('.w')[0]
	console.log(`\n${name}`)
	console.log(`  ${diffs.length} differing node(s) — ${diffs.length - outside.length} inside data-live, ${outside.length} outside`)
	for (const [p, k, v, ,] of outside.slice(0, 5)) {
		const i = a.findIndex((e) => e[0] === p && e[1] === k)
		console.log(`    OUTSIDE ${p.split('/').pop()} ${k}: ${String(v).slice(0, 60)} -> ${String(b[i]?.[2]).slice(0, 60)}`)
	}
}

console.log(
	`\n${listA.length} snapshot(s) archived | ${flaky} differ between runs | ${totalOutside} differing node(s) OUTSIDE data-live`,
)
if (totalOutside > 0) {
	console.error('\nA node outside data-live changed with no code change — Chromatic will report this as a review-visible diff.')
	process.exit(1)
}
console.log('Every difference sits inside a declared-live region, which ignoreSelectors excludes from the diff.')
