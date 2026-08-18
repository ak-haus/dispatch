/**
 * Snapshot script failure modes (Golden Board A3). The ADR-0001 D2 floor:
 * whatever happens to the rail — unconfigured, unreachable, erroring, or
 * serving garbage — the script must KEEP the previous snapshot and exit 0
 * so a build never breaks on the rail. Each case runs the real script in a
 * throwaway sandbox (its paths resolve relative to its own location), so
 * the repo's actual snapshot is never touched.
 */

import { execFile } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createServer, type Server } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const execFileAsync = promisify(execFile)
const SCRIPT_SRC = join(__dirname, 'generate-wire-snapshot.mjs')

const VALID_FEED = {
	schemaVersion: 1,
	generatedAt: '2026-08-18T12:00:00.000Z',
	entries: [],
}
const EXISTING = JSON.stringify({ ...VALID_FEED, generatedAt: '2020-01-01T00:00:00.000Z' })

let sandbox: string
let servers: Server[]

beforeEach(() => {
	sandbox = mkdtempSync(join(tmpdir(), 'wire-snapshot-'))
	mkdirSync(join(sandbox, 'scripts'))
	copyFileSync(SCRIPT_SRC, join(sandbox, 'scripts', 'generate-wire-snapshot.mjs'))
	servers = []
})

afterEach(async () => {
	for (const s of servers) await new Promise((r) => s.close(r))
	rmSync(sandbox, { recursive: true, force: true })
})

const outPath = () => join(sandbox, 'src', 'data', 'wire-snapshot.json')

function seedExisting(): void {
	mkdirSync(join(sandbox, 'src', 'data'), { recursive: true })
	writeFileSync(outPath(), EXISTING)
}

async function run(env: Record<string, string> = {}) {
	const clean = { ...process.env }
	delete clean.PUBLIC_WIRE_FEED_URL
	return execFileAsync(process.execPath, [join(sandbox, 'scripts', 'generate-wire-snapshot.mjs')], {
		env: { ...clean, ...env },
		// Belt to the script's own __dirname-relative resolution: even a
		// cwd-resolution regression in the script stays inside the sandbox.
		cwd: sandbox,
	})
}

async function serve(handler: (res: import('node:http').ServerResponse) => void): Promise<string> {
	const server = createServer((_req, res) => handler(res))
	servers.push(server)
	await new Promise<void>((r) => server.listen(0, '127.0.0.1', r))
	const address = server.address()
	if (address === null || typeof address === 'string') throw new Error('no port')
	return `http://127.0.0.1:${address.port}/feed.json`
}

describe('generate-wire-snapshot failure modes', () => {
	it('no URL + no snapshot → writes the empty snapshot and exits 0', async () => {
		const { stdout } = await run()
		expect(stdout).toContain('wrote empty snapshot')
		expect(JSON.parse(readFileSync(outPath(), 'utf8'))).toEqual({
			schemaVersion: 1,
			generatedAt: '1970-01-01T00:00:00.000Z',
			entries: [],
		})
	})

	it('no URL + existing snapshot → keeps it byte-identical', async () => {
		seedExisting()
		const { stdout } = await run()
		expect(stdout).toContain('keeping existing snapshot')
		expect(readFileSync(outPath(), 'utf8')).toBe(EXISTING)
	})

	it('rail responds 500 → keeps existing, exit 0', async () => {
		seedExisting()
		const url = await serve((res) => {
			res.statusCode = 500
			res.end('boom')
		})
		const { stdout } = await run({ PUBLIC_WIRE_FEED_URL: url })
		expect(stdout).toContain('feed responded 500')
		expect(readFileSync(outPath(), 'utf8')).toBe(EXISTING)
	})

	it('rail serves an invalid shape → keeps existing, exit 0', async () => {
		seedExisting()
		const url = await serve((res) => {
			res.setHeader('content-type', 'application/json')
			res.end(JSON.stringify({ schemaVersion: 2, entries: 'nope' }))
		})
		const { stdout } = await run({ PUBLIC_WIRE_FEED_URL: url })
		expect(stdout).toContain('feed shape invalid')
		expect(readFileSync(outPath(), 'utf8')).toBe(EXISTING)
	})

	it('rail serves a non-https entry url → keeps existing (content-trust at the build boundary)', async () => {
		seedExisting()
		const entry = {
			id: '2026-08-01-dev-to-x-deadbeef',
			ts: '2026-08-01T12:00:00.000Z',
			platform: 'dev-to',
			kind: 'publish',
			title: 'X',
			url: 'javascript:alert(1)',
		}
		const url = await serve((res) => {
			res.setHeader('content-type', 'application/json')
			res.end(JSON.stringify({ ...VALID_FEED, entries: [entry] }))
		})
		const { stdout } = await run({ PUBLIC_WIRE_FEED_URL: url })
		expect(stdout).toContain('feed shape invalid')
		expect(readFileSync(outPath(), 'utf8')).toBe(EXISTING)
	})

	it('rail serves a non-publish entry kind → keeps existing', async () => {
		seedExisting()
		const entry = {
			id: '2026-08-01-dev-to-x-deadbeef',
			ts: '2026-08-01T12:00:00.000Z',
			platform: 'dev-to',
			kind: 'failure',
			title: 'X',
			url: 'https://dev.to/u/x',
		}
		const url = await serve((res) => {
			res.setHeader('content-type', 'application/json')
			res.end(JSON.stringify({ ...VALID_FEED, entries: [entry] }))
		})
		const { stdout } = await run({ PUBLIC_WIRE_FEED_URL: url })
		expect(stdout).toContain('feed shape invalid')
		expect(readFileSync(outPath(), 'utf8')).toBe(EXISTING)
	})

	it('healthy rail with a contract-valid entry → captured, not over-rejected', async () => {
		seedExisting()
		const entry = {
			id: '2026-08-01-dev-to-a-fine-post-deadbeef',
			ts: '2026-08-01T12:00:00.000Z',
			platform: 'dev-to',
			kind: 'publish',
			title: 'A Fine Post',
			url: 'https://dev.to/u/post-4242',
			excerpt: 'The body.',
			pipeline_run: 'run-abcdef012345',
		}
		const live = { ...VALID_FEED, generatedAt: '2026-08-18T15:00:00.000Z', entries: [entry] }
		const url = await serve((res) => {
			res.setHeader('content-type', 'application/json')
			res.end(JSON.stringify(live))
		})
		const { stdout } = await run({ PUBLIC_WIRE_FEED_URL: url })
		expect(stdout).toContain('captured 1 entries')
		expect(JSON.parse(readFileSync(outPath(), 'utf8'))).toEqual(live)
	})

	it('rail serves non-JSON → keeps existing, exit 0', async () => {
		seedExisting()
		const url = await serve((res) => {
			res.end('<html>maintenance</html>')
		})
		const { stdout } = await run({ PUBLIC_WIRE_FEED_URL: url })
		expect(stdout).toContain('fetch failed')
		expect(readFileSync(outPath(), 'utf8')).toBe(EXISTING)
	})

	it('rail unreachable → keeps existing, exit 0', async () => {
		seedExisting()
		// A port nothing listens on: bind a server, note the port, close it.
		const url = await serve(() => {})
		await new Promise((r) => servers.pop()!.close(r))
		const { stdout } = await run({ PUBLIC_WIRE_FEED_URL: url })
		expect(stdout).toContain('fetch failed')
		expect(readFileSync(outPath(), 'utf8')).toBe(EXISTING)
	})

	it('healthy rail → captures the feed', async () => {
		seedExisting()
		const live = { ...VALID_FEED, generatedAt: '2026-08-18T13:00:00.000Z' }
		const url = await serve((res) => {
			res.setHeader('content-type', 'application/json')
			res.end(JSON.stringify(live))
		})
		const { stdout } = await run({ PUBLIC_WIRE_FEED_URL: url })
		expect(stdout).toContain('captured 0 entries')
		expect(JSON.parse(readFileSync(outPath(), 'utf8'))).toEqual(live)
	})

	it('reads PUBLIC_WIRE_FEED_URL from a .env file when the process env lacks it', async () => {
		const live = { ...VALID_FEED, generatedAt: '2026-08-18T14:00:00.000Z' }
		const url = await serve((res) => {
			res.setHeader('content-type', 'application/json')
			res.end(JSON.stringify(live))
		})
		writeFileSync(join(sandbox, '.env'), `PUBLIC_WIRE_FEED_URL=${url}\n`)
		const { stdout } = await run()
		expect(stdout).toContain('captured 0 entries')
		expect(existsSync(outPath())).toBe(true)
		expect(JSON.parse(readFileSync(outPath(), 'utf8'))).toEqual(live)
	})
})
