/**
 * The pinned Playwright container image, derived — never typed (F24, rides B4).
 *
 * `pnpm test:e2e` runs inside mcr.microsoft.com/playwright everywhere it is
 * not already Linux-in-that-image, and CI's e2e jobs run inside the same
 * image. The image tag is a FUNCTION of the `@playwright/test` devDependency,
 * which must be an exact pin: with a caret range the resolved version and the
 * image tag drift apart independently, and the container then makes local
 * signal *differently* wrong rather than right (the F24 precision, recorded
 * at lifecycle/checkpoints/2026-08-22-phase-b-promotion.md). So a range is a
 * hard failure here, not a warning — this script is the drift gate.
 *
 * Consumers: scripts/run-e2e.mjs (the test:e2e dispatcher) and the
 * `playwright-image` derive jobs in .github/workflows/{e2e,uptime}.yml.
 */

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const EXACT_VERSION = /^\d+\.\d+\.\d+$/

export function pinnedPlaywrightVersion() {
	const pkgPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json')
	const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
	const spec = pkg.devDependencies?.['@playwright/test']
	if (!spec) {
		throw new Error(`@playwright/test is not a devDependency in ${pkgPath}`)
	}
	if (!EXACT_VERSION.test(spec)) {
		throw new Error(
			`@playwright/test must be an EXACT pin, found "${spec}" (${pkgPath}). ` +
				'The container image tag is derived from this value; a range lets the ' +
				'resolved version and the image drift apart (F24).',
		)
	}
	return spec
}

export function playwrightContainerImage() {
	return `mcr.microsoft.com/playwright:v${pinnedPlaywrightVersion()}-noble`
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	process.stdout.write(`${playwrightContainerImage()}\n`)
}
