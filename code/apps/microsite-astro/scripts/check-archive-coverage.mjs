/**
 * The Chromatic e2e lane's coverage contract (F19, ADR-0003 §Stage 4).
 *
 * The archive lane's failure mode was never "too little coverage" — it was
 * coverage nobody chose: the @chromatic-com/playwright fixture archived all 39
 * tests' final DOM, 21 of them nondeterministically, so the lane drew changes
 * on every commit and its red meant nothing. Coverage is now an explicit list
 * (archiveSnapshot() calls in the specs) and this script is what keeps the list
 * honest in both directions:
 *
 *   - a DELETED archiveSnapshot() silently drops a surface out of AK's review
 *     lane, which is how a lane rots into decoration;
 *   - a re-enabled `disableAutoSnapshot` silently restores all 39, which is
 *     how the wolf comes back.
 *
 * Both fail here, loudly, in the same CI job that ran the suite. Deliberately
 * NOT a new required context: this is the e2e gate's own invariant, so it
 * rides inside `e2e (playwright + axe)` rather than adding a ruleset seat.
 *
 * Changing EXPECTED is a real decision — the snapshot names are Chromatic
 * baseline identities, so renaming one drops its baseline and manufactures the
 * change-noise this whole mechanism exists to remove.
 */

import fs from 'node:fs'
import path from 'node:path'

/** snapshot name -> how many times it must appear (one per viewport). */
const EXPECTED = new Map([
	['home-cover', 2], // cover.spec.ts, desktop + mobile — the pixel floor excludes home
	['article', 1],
	['wire', 1],
	['not-found', 1],
	['figure-proving-ground', 1],
])

const ARCHIVE_DIR = path.join(process.cwd(), 'test-results', 'chromatic-archives')

if (!fs.existsSync(ARCHIVE_DIR)) {
	console.error(
		`archive coverage: ${ARCHIVE_DIR} does not exist — the e2e suite did not run, or the Chromatic fixture is no longer wired into e2e/helpers/fixtures.ts`,
	)
	process.exit(1)
}

const found = new Map()
for (const file of fs.readdirSync(ARCHIVE_DIR).filter((f) => f.endsWith('.stories.json'))) {
	const { stories } = JSON.parse(fs.readFileSync(path.join(ARCHIVE_DIR, file), 'utf8'))
	for (const story of stories) found.set(story.name, (found.get(story.name) ?? 0) + 1)
}

const problems = []
for (const [name, count] of EXPECTED) {
	const actual = found.get(name) ?? 0
	if (actual !== count) problems.push(`  ${name}: expected ${count} snapshot(s), found ${actual}`)
}
for (const [name, count] of found) {
	if (!EXPECTED.has(name)) problems.push(`  ${name}: ${count} unexpected snapshot(s) — not in the coverage contract`)
}

const total = [...found.values()].reduce((a, b) => a + b, 0)
const expectedTotal = [...EXPECTED.values()].reduce((a, b) => a + b, 0)

if (problems.length > 0) {
	console.error(`::error title=Archive coverage drift::the Chromatic e2e lane no longer matches its contract`)
	console.error(`archive coverage: ${total} snapshot(s) archived, contract expects ${expectedTotal}`)
	console.error(problems.join('\n'))
	console.error(
		'\nIf this change is intended, update EXPECTED in scripts/check-archive-coverage.mjs — and note that a renamed snapshot drops its Chromatic baseline.',
	)
	process.exit(1)
}

console.log(`archive coverage: ${total}/${expectedTotal} snapshots, contract holds (${[...EXPECTED.keys()].join(', ')})`)
