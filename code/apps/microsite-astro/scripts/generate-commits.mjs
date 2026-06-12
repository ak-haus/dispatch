/**
 * generate-commits.mjs — build-time honest commit feed for BuildTicker.
 *
 * Reads the repository's own `git log` (last 8 commits on the current
 * branch) and writes src/data/commits.json, which BuildTicker imports
 * directly. No fetch, no API, no fabricated seed data — the ticker shows
 * the actual construction record of this repo.
 *
 * Conventional-commit subjects (`type(scope): subject`) are parsed into
 * their parts; anything else falls back to type "chore", scope "repo",
 * with the full subject preserved verbatim.
 *
 * Failure mode: if git is unavailable (e.g. an export without .git),
 * the script leaves the previously generated/committed commits.json in
 * place and exits 0 so the build does not break.
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)))
const OUT = join(__dirname, '..', 'src', 'data', 'commits.json')

const TYPES = new Set(['feat', 'fix', 'chore', 'docs', 'refactor', 'style'])
const CONVENTIONAL = /^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/

function git(args) {
	return execFileSync('git', args, { encoding: 'utf8', cwd: __dirname }).trim()
}

function parseShortstat(line) {
	const files = /(\d+) files? changed/.exec(line)
	const ins = /(\d+) insertions?\(\+\)/.exec(line)
	const del = /(\d+) deletions?\(-\)/.exec(line)
	return {
		filesChanged: files ? Number(files[1]) : undefined,
		insertions: ins ? Number(ins[1]) : 0,
		deletions: del ? Number(del[1]) : 0,
	}
}

try {
	const hashes = git(['log', '-n', '8', '--pretty=%h']).split('\n').filter(Boolean)

	const commits = hashes.map((hash) => {
		const raw = git([
			'show',
			'--shortstat',
			'--pretty=format:%h%x09%ad%x09%an%x09%s',
			'--date=short',
			hash,
		])
		const lines = raw.split('\n').filter(Boolean)
		const [h, date, author, subjectRaw] = lines[0].split('\t')
		const stat = parseShortstat(lines[lines.length - 1] ?? '')

		const m = CONVENTIONAL.exec(subjectRaw)
		const type = m && TYPES.has(m[1].toLowerCase()) ? m[1].toLowerCase() : 'chore'
		const scope = m && TYPES.has(m[1].toLowerCase()) ? (m[2] ?? 'repo') : 'repo'
		const subject = m && TYPES.has(m[1].toLowerCase()) ? m[3] : subjectRaw

		return { hash: h, type, scope, subject, date, author, ...stat }
	})

	mkdirSync(dirname(OUT), { recursive: true })
	writeFileSync(OUT, JSON.stringify(commits, null, '\t') + '\n')
	console.log(`[generate-commits] wrote ${commits.length} real commits → src/data/commits.json`)
} catch (err) {
	if (existsSync(OUT)) {
		console.warn(`[generate-commits] git unavailable (${err.message?.split('\n')[0]}); keeping existing commits.json`)
	} else {
		console.error('[generate-commits] git unavailable and no existing commits.json — ticker would be empty')
		throw err
	}
}
