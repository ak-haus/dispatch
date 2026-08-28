/**
 * `pnpm test:e2e` — one command, one meaning on every OS (F24, rides B4).
 *
 * The defect this kills: on macOS, Playwright compares against baselines
 * suffixed for the HOST platform, so a Mac run silently generated and then
 * matched its own `-darwin` files — always green, gating nothing — while the
 * same command was real signal on Linux. The repo already refuses to track
 * darwin baselines (.gitignore); this makes the local run refuse to produce
 * them at all.
 *
 * How: the suite runs inside the pinned Playwright Linux container
 * (mcr.microsoft.com/playwright:v<pin>-noble, derived from the exact-pinned
 * @playwright/test by playwright-container-image.mjs — the two cannot drift).
 * CI's e2e jobs run in the same image via the workflows' `container:` key, so
 * "inside the image" is the ONLY environment the suite executes in:
 *
 *   - already inside the image (CI, or a recursed local run) → run natively.
 *   - anywhere else → re-run this script inside the image via docker. There
 *     is NO native fallback: without docker this fails loudly, because a
 *     native darwin run is precisely the false pass being removed.
 *
 * The docker path copies the TRACKED work tree into a named volume (never a
 * bind of the host tree: a Linux `pnpm install` over macOS node_modules would
 * clobber the host's native binaries, and an untracked `.env.local` must not
 * reach the e2e build — the never-prod law). node_modules are relinked in the
 * volume each run from a persistent store volume, so repeat runs stay warm.
 * Reports land back on the host via bind mounts. Baselines do NOT: a
 * `--update-snapshots` run writes into the volume only — the sanctioned
 * baseline factory stays the update-visual-baselines CI job (e2e.yml).
 */

import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { playwrightContainerImage } from './playwright-container-image.mjs'

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(appDir, '..', '..', '..')
const extraArgs = process.argv.slice(2)

// The work volume is per-checkout (two clones must not wipe each other's
// tree mid-run); the store volume is shared — pnpm's store is content-
// addressed and append-only, so sharing it is what keeps repeat runs warm.
const checkoutKey = createHash('sha256').update(repoRoot).digest('hex').slice(0, 12)
const WORK_VOLUME = `prime-dispatch-e2e-work-${checkoutKey}`
const STORE_VOLUME = 'prime-dispatch-e2e-store'
const WORK = '/work'

function run(cmd, args, opts = {}) {
	const result = spawnSync(cmd, args, { stdio: 'inherit', ...opts })
	if (result.error) throw result.error
	return result.status ?? 1
}

function fail(message) {
	process.stderr.write(`${message}\n`)
	process.exit(1)
}

const insideImage =
	process.platform === 'linux' &&
	(process.env.PLAYWRIGHT_BROWSERS_PATH === '/ms-playwright' || existsSync('/ms-playwright'))

if (insideImage) {
	// Native path — the browsers are baked into the image at /ms-playwright,
	// matching the pinned @playwright/test by construction.
	const build = run('pnpm', ['e2e:build'], { cwd: appDir })
	if (build !== 0) process.exit(build)
	process.exit(run('pnpm', ['exec', 'playwright', 'test', ...extraArgs], { cwd: appDir }))
}

const image = playwrightContainerImage()

const docker = spawnSync('docker', ['info'], { stdio: 'ignore' })
if (docker.error || docker.status !== 0) {
	fail(
		`test:e2e runs inside ${image} on every host — Docker is required and not reachable here.\n` +
			'Start Docker and re-run. There is deliberately no native fallback: a native run on this\n' +
			'host would compare (or invent) baselines for the wrong platform, which is the F24 defect.',
	)
}

if (extraArgs.includes('--update-snapshots')) {
	process.stderr.write(
		'note: --update-snapshots inside the container writes to the container work volume, NOT the\n' +
			'repo. Baselines are regenerated only through the update-visual-baselines job (e2e.yml) —\n' +
			'the sanctioned factory — and committed deliberately.\n',
	)
}

process.stderr.write(`test:e2e → ${image} (work volume: ${WORK_VOLUME})\n`)

// Sync the tracked tree into the work volume. Tracked files only — gitignored
// PP fonts are re-fetched inside (fetch:fonts), and .env.local must never
// reach an e2e build. The volume is wiped first so deletions propagate.
const sync = spawnSync(
	'bash',
	[
		'-c',
		// pipefail: a git or tar failure otherwise yields an empty archive that
		// extracts cleanly — exit 0 over a just-wiped, now-empty work tree.
		`set -o pipefail; git -C "$0" ls-files -z | tar -C "$0" -cf - --null -T - | ` +
			`docker run --rm -i -v ${WORK_VOLUME}:${WORK} ${image} ` +
			`bash -c 'rm -rf ${WORK}/* ${WORK}/.[!.]* && tar -xf - -C ${WORK}'`,
		repoRoot,
	],
	{ stdio: ['ignore', 'inherit', 'inherit'] },
)
if (sync.error || sync.status !== 0) fail('test:e2e: syncing the tracked tree into the work volume failed.')

const hostReports = join(appDir, 'playwright-report')
const hostResults = join(appDir, 'test-results')
mkdirSync(hostReports, { recursive: true })
mkdirSync(hostResults, { recursive: true })

const quoted = extraArgs.map((a) => `'${a.replaceAll("'", `'\\''`)}'`).join(' ')
const inner =
	'corepack enable pnpm >/dev/null 2>&1; ' +
	'pnpm install --frozen-lockfile && ' +
	'pnpm --fail-if-no-match --filter microsite-astro fetch:fonts && ' +
	`pnpm --fail-if-no-match --filter microsite-astro exec node scripts/run-e2e.mjs ${quoted}`

process.exit(
	run('docker', [
		'run',
		'--rm',
		'--init',
		'--ipc=host',
		'-v',
		`${WORK_VOLUME}:${WORK}`,
		'-v',
		`${STORE_VOLUME}:/pnpm-store`,
		'-v',
		`${hostResults}:${WORK}/code/apps/microsite-astro/test-results`,
		'-v',
		`${hostReports}:${WORK}/code/apps/microsite-astro/playwright-report`,
		'-e',
		'npm_config_store_dir=/pnpm-store',
		'-e',
		'COREPACK_ENABLE_DOWNLOAD_PROMPT=0',
		'-w',
		`${WORK}/code`,
		image,
		'bash',
		'-c',
		inner,
	]),
)
