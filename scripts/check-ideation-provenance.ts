#!/usr/bin/env bun
/**
 * check-ideation-provenance — the provenance law, as a gate.
 *
 * ADR-0003 §Stage 1 makes one rule load-bearing for the ideation stage: "every
 * kept artifact is committed with one-line provenance (prompt, model, date) or
 * discarded … without the commit-or-discard rule this stage produces orphan
 * mocks." A rule written only in a README decays. This file is that rule as
 * mechanism, wired to the `ideation` CI gate and fail-closed.
 *
 * Three assertions:
 *
 *   1. PROVENANCE — every artifact under design/ideation/<run>/ is declared in
 *      that run's provenance.json, with prompt + model + date, and a SHA-256
 *      that still matches the bytes on disk. An undeclared file is an orphan
 *      mock by definition, so an unknown file type fails rather than passes.
 *
 *   2. QUARANTINE — nothing under code/ may reference design/ideation/. The
 *      landing zone is not an asset rail: promoting a plate into
 *      public/banners/ is a deliberate copy under AK's content review. This is
 *      also what keeps v0-class ideation output out of src/ (ADR-0003
 *      §Stage 1: "quarantined on ideation branches, never src/").
 *
 *   3. SHAPE — the record itself parses and carries the fields a later reader
 *      needs to reproduce or discard the run.
 *
 * Run: bun scripts/check-ideation-provenance.ts
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const LANDING_ZONE = join(REPO_ROOT, 'design', 'ideation')

/* Zone-level documentation, not generated output — these need no provenance. */
const ZONE_FILES = new Set(['README.md', 'house-register.md'])

const failures: string[] = []
const notes: string[] = []

function record(runPath: string, message: string): void {
	failures.push(`${relative(REPO_ROOT, runPath)}: ${message}`)
}

/* ── 1 + 3. Provenance and shape ──────────────────────────────────────── */

interface Provenance {
	run?: unknown
	need?: unknown
	generated?: unknown
	model?: unknown
	prompt?: unknown
	costUsdPerImage?: unknown
	costUsdTotal?: unknown
	contract?: { sha256?: unknown }
	artifacts?: Array<{ file?: unknown; sha256?: unknown }>
	rejected?: Array<{ file?: unknown; reason?: unknown }>
	promotedTo?: unknown
}

function checkRun(runDir: string, runName: string): void {
	const recordPath = join(runDir, 'provenance.json')

	// Anything that is not the record and not a note is a generated artifact.
	// Unknown file types land here deliberately: the law is commit-with-
	// provenance or discard, so "I don't recognise this" must fail.
	const artifactFiles = readdirSync(runDir).filter(
		(name) => name !== 'provenance.json' && !name.endsWith('.md'),
	)

	if (!existsSync(recordPath)) {
		record(
			runDir,
			`no provenance.json, but carries ${artifactFiles.length} artifact(s): ${artifactFiles.join(', ') || '(none)'}. ` +
				'Commit the run with its prompt, model and date, or delete it.',
		)
		return
	}

	let provenance: Provenance
	try {
		provenance = JSON.parse(readFileSync(recordPath, 'utf8')) as Provenance
	} catch (error) {
		record(runDir, `provenance.json does not parse: ${(error as Error).message}`)
		return
	}

	/* Shape — the fields a later reader needs to reproduce or discard the run. */
	const required: Array<[key: string, value: unknown, rule: (v: unknown) => boolean, why: string]> = [
		['run', provenance.run, (v) => v === runName, `must equal the directory name "${runName}"`],
		['need', provenance.need, (v) => typeof v === 'string' && v.length > 0, 'must name the real need this run served'],
		['generated', provenance.generated, (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v), 'must be a YYYY-MM-DD date'],
		['model', provenance.model, (v) => typeof v === 'string' && v.length > 0, 'must name the pinned model id'],
		['prompt', provenance.prompt, (v) => typeof v === 'string' && v.length > 0, 'must carry the prompt as sent'],
		['costUsdTotal', provenance.costUsdTotal, (v) => typeof v === 'number' && v >= 0, 'must record what the run cost (the $10/month ceiling is checked against these)'],
		['contract.sha256', provenance.contract?.sha256, (v) => typeof v === 'string' && /^[a-f0-9]{64}$/.test(v), 'must pin the DESIGN.md the prompt was built from'],
	]

	for (const [key, value, rule, why] of required) {
		if (!rule(value)) record(runDir, `provenance.json → ${key} ${why}`)
	}

	if (!Array.isArray(provenance.artifacts)) {
		record(runDir, 'provenance.json → artifacts must be an array')
		return
	}

	/* Declared-vs-present, both directions. */
	const declared = new Map<string, string>()
	for (const entry of provenance.artifacts) {
		if (typeof entry?.file !== 'string' || typeof entry?.sha256 !== 'string') {
			record(runDir, 'provenance.json → every artifacts[] entry needs a file and a sha256')
			continue
		}
		declared.set(entry.file, entry.sha256)
	}

	for (const name of artifactFiles) {
		const expected = declared.get(name)
		if (!expected) {
			record(runDir, `${name} is present but undeclared in provenance.json — an orphan mock`)
			continue
		}
		const actual = new Bun.CryptoHasher('sha256').update(readFileSync(join(runDir, name))).digest('hex')
		if (actual !== expected) {
			record(runDir, `${name} has drifted from its record (sha256 ${actual.slice(0, 12)}… ≠ declared ${expected.slice(0, 12)}…)`)
		}
	}

	for (const name of declared.keys()) {
		if (!artifactFiles.includes(name)) {
			record(runDir, `provenance.json declares ${name}, which is not in the run directory`)
		}
	}

	/* A discarded plate is a tombstone: the record survives, the bytes do not.
	 * A rejected file still sitting in the run directory means the discard never
	 * happened, which is the orphan-mock failure wearing a rejection notice. */
	if (Array.isArray(provenance.rejected)) {
		for (const entry of provenance.rejected) {
			if (typeof entry?.file !== 'string' || typeof entry?.reason !== 'string') {
				record(runDir, 'provenance.json → every rejected[] entry needs a file and a reason')
				continue
			}
			if (artifactFiles.includes(entry.file)) {
				record(runDir, `${entry.file} is recorded as rejected but is still present — discard means delete`)
			}
		}
	}

	/* Promotion is a record, not a permission — but a claimed promotion must be true. */
	if (typeof provenance.promotedTo === 'string') {
		if (!existsSync(join(REPO_ROOT, provenance.promotedTo))) {
			record(runDir, `provenance.json → promotedTo points at ${provenance.promotedTo}, which does not exist`)
		} else {
			notes.push(`${runName} → promoted to ${provenance.promotedTo}`)
		}
	}
}

function scanZone(): number {
	if (!existsSync(LANDING_ZONE)) return 0

	let runs = 0
	for (const name of readdirSync(LANDING_ZONE)) {
		const entryPath = join(LANDING_ZONE, name)
		if (statSync(entryPath).isDirectory()) {
			runs++
			checkRun(entryPath, name)
			continue
		}
		if (!ZONE_FILES.has(name)) {
			failures.push(
				`design/ideation/${name}: loose file at the zone root. Artifacts belong in a run directory ` +
					'beside their provenance.json.',
			)
		}
	}
	return runs
}

/* ── 2. Quarantine ────────────────────────────────────────────────────── */

async function checkQuarantine(): Promise<void> {
	// Tracked files only — this is a rule about what the repo commits, and
	// git's index is exactly that set.
	const grep = Bun.spawnSync(['git', 'grep', '-l', '-F', 'design/ideation', '--', 'code/'], {
		cwd: REPO_ROOT,
	})

	// git grep: 0 = matches found, 1 = clean, >1 = real error.
	if (grep.exitCode > 1) {
		failures.push(`quarantine scan failed to run: ${new TextDecoder().decode(grep.stderr).trim()}`)
		return
	}
	if (grep.exitCode === 1) return

	for (const file of new TextDecoder().decode(grep.stdout).trim().split('\n').filter(Boolean)) {
		failures.push(
			`${file} references design/ideation — the landing zone is quarantined from shipped code. ` +
				'Promote the asset into public/ deliberately instead of pointing at the ideation zone.',
		)
	}
}

/* ── Report ───────────────────────────────────────────────────────────── */

const runCount = scanZone()
await checkQuarantine()

if (failures.length > 0) {
	console.error('ideation provenance law — FAILED\n')
	for (const failure of failures) console.error(`  ✗ ${failure}`)
	console.error(
		'\nThe law (ADR-0003 §Stage 1): every kept artifact commits with its prompt, model and date,',
	)
	console.error('or it is discarded. There is no third state.')
	process.exit(1)
}

console.log(`ideation provenance law — OK (${runCount} run${runCount === 1 ? '' : 's'} checked, quarantine clean)`)
for (const note of notes) console.log(`  · ${note}`)
