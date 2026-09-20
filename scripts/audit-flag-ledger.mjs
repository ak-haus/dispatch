/**
 * The Golden Board's flag ledger, made checkable (F25's machine-checkable half,
 * scoped to what is reachable).
 *
 * WHY THIS EXISTS. F25 root-caused the ledger's drift past its symptom: the
 * ledger lives OUTSIDE this repo — the board is an operator-held Artifact — so
 * no CI gate can read it, "prose asks, gates enforce" has nothing to bind to,
 * and every reconciliation has been an act of memory by whichever session
 * happened to notice. Nine instances are on record.
 *
 * WHAT DRIFTS IS THE TALLY, not the rows. Measured 2026-09-20 at the Build 27
 * close: all 48 flags had a ledger row — none was missing — while the header
 * tally read `47 filed · 33 settled · 14 open` against an actual 48 · 31 · 17.
 * Every one of those numbers is hand-written prose asserting a count that
 * nothing derives, so it can only ever be right by luck.
 *
 * TWO THINGS MADE IT UNCOUNTABLE EVEN BY HAND:
 *   1. The status chip's CSS class does not encode state. `std` carries both
 *      F2 "closed" (settled) and F7 "≈ Sep 1" (open, AK's budget call), so a
 *      class-based count is wrong before it starts.
 *   2. The `ord` cell carries a status GLYPH — `F30 ✓`, `F33 ⚑` — so a detector
 *      matching `>F30<` exactly finds nothing and reports a missing row. That
 *      is not hypothetical: it is how the Build 27 close manufactured a false
 *      "four rows are missing" finding and published it. A detector that can
 *      report absence must be tested against a row it should find.
 *
 * THE FIX, therefore, is not a tidier hand-count. Every ledger row carries
 * `data-flag` and `data-state`, this script derives the tally from them, and it
 * FAILS when the header disagrees — so the number cannot be asserted by hand
 * any more, only regenerated.
 *
 * WHAT THIS DOES NOT DO, stated rather than implied: it cannot run in CI. The
 * board is a private Artifact and a workflow cannot fetch it. This is a close-
 * ritual command, run by the session that is about to republish, against the
 * saved copy it already has in hand. That converts "an act of memory" into "a
 * command that fails" — it does not convert it into a gate. The in-repo ledger
 * with the board as its presentation layer remains F25's real repair.
 *
 * USAGE
 *   node scripts/audit-flag-ledger.mjs <board.html>
 *
 * Exit 0 and print the derived tally line, or exit non-zero naming every
 * problem. Run it BEFORE republishing the board, and paste what it prints.
 */

import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
	console.error('usage: node scripts/audit-flag-ledger.mjs <board.html>')
	console.error('  <board.html> is the saved copy of the Golden Board artifact.')
	process.exit(2)
}
if (!fs.existsSync(file)) {
	console.error(`audit-flag-ledger: ${file} does not exist`)
	process.exit(2)
}

const html = fs.readFileSync(file, 'utf8')
const problems = []

/* ── the ledger section is the authoritative list ──────────────────────── */

const LEDGER_HEADING = '<h2>Flags — filed, not chased</h2>'
const start = html.indexOf(LEDGER_HEADING)
if (start < 0) {
	console.error(
		`audit-flag-ledger: no ledger section — expected the heading ${LEDGER_HEADING}.\n` +
			'If the board was restructured, this script must be re-pointed rather than deleted.',
	)
	process.exit(1)
}
const ledger = html.slice(start, html.indexOf('</section>', start))

/* ── every row must declare what it is and where it stands ─────────────── */

const VALID_STATES = new Set(['open', 'settled'])
const rows = []
const seen = new Map()

for (const m of ledger.matchAll(/<li\b([^>]*)>([\s\S]*?)<\/li>/g)) {
	const attrs = m[1]
	const id = (attrs.match(/data-flag="([^"]+)"/) || [])[1]
	const state = (attrs.match(/data-state="([^"]+)"/) || [])[1]
	// The ord cell is how a human finds the row; quote it when the machine
	// attributes are what is missing, or the failure names nothing actionable.
	const ord = (m[2].match(/<span class="ord">([^<]*)<\/span>/) || [, '(no ord cell)'])[1].trim()

	if (!id) {
		problems.push(`row "${ord}" has no data-flag — every ledger row declares its ID`)
		continue
	}
	if (!state) {
		problems.push(`${id} has no data-state — expected one of: ${[...VALID_STATES].join(' | ')}`)
		continue
	}
	if (!VALID_STATES.has(state)) {
		problems.push(`${id} has data-state="${state}" — expected one of: ${[...VALID_STATES].join(' | ')}`)
		continue
	}
	if (seen.has(id)) problems.push(`${id} has two ledger rows (ord cells "${seen.get(id)}" and "${ord}")`)
	seen.set(id, ord)
	rows.push({ id, state, ord })
}

if (rows.length === 0) problems.push('the ledger section has no rows carrying data-flag at all')

/* ── nothing may be discussed on the board without a row ───────────────── */

const mentioned = new Set([...html.matchAll(/\bF(\d{1,3})\b/g)].map((m) => `F${m[1]}`))
for (const f of [...mentioned].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))) {
	if (!seen.has(f)) problems.push(`${f} is discussed on the board but has no ledger row`)
}

/* ── derive the tally, and hold the header to it ───────────────────────── */

const flags = rows.filter((r) => /^F\d+$/.test(r.id))
const settled = flags.filter((r) => r.state === 'settled').length
const open = flags.filter((r) => r.state === 'open').length
const filed = flags.length

const claimed = html.match(/<span>Flags <b>(\d+)<\/b> \((\d+) settled, (\d+) open/)
if (!claimed) {
	problems.push('the header tally span was not found — it is what this script exists to hold honest')
} else {
	const [, cFiled, cSettled, cOpen] = claimed.map(Number)
	if (cFiled !== filed || cSettled !== settled || cOpen !== open) {
		problems.push(
			`the header tally says ${cFiled} filed / ${cSettled} settled / ${cOpen} open, ` +
				`but the rows say ${filed} / ${settled} / ${open}`,
		)
	}
}

/* ── report ────────────────────────────────────────────────────────────── */

const openIds = flags
	.filter((r) => r.state === 'open')
	.map((r) => r.id)
	.sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))

if (problems.length > 0) {
	console.error(`::error title=Flag ledger drift::the board no longer counts itself`)
	console.error(`flag ledger: ${problems.length} problem(s)\n`)
	for (const p of problems) console.error(`  · ${p}`)
	console.error(`\nDerived from the rows: ${filed} filed · ${settled} settled · ${open} open`)
	console.error(`Open: ${openIds.join(' ')}`)
	console.error(`\nPaste this into the header tally span:`)
	console.error(`  Flags <b>${filed}</b> (${settled} settled, ${open} open`)
	process.exit(1)
}

console.log(`flag ledger: ${rows.length} rows, every one attributed; the header agrees with them.`)
console.log(`  ${filed} filed · ${settled} settled · ${open} open`)
console.log(`  open: ${openIds.join(' ')}`)
