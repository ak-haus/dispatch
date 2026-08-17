/**
 * depth-cartography.mjs — Depth Anything v2 via Replicate API.
 *
 * Generates a per-pixel depth map for public/cartography/district.{png,jpg}
 * and saves it to public/cartography/district.depth.png. The depth map is
 * grayscale where white = near foreground, black = far background.
 *
 * Downstream uses:
 *   - CSS mask-image for scroll-driven vertical translation (parallax)
 *   - SVG feDisplacementMap filter (cheap pseudo-3D)
 *   - Three.js displacement shader on a textured plane (real 3D depth)
 *
 * Setup (one-time):
 *   1. Sign up at replicate.com (~10 seconds)
 *   2. Get API token: https://replicate.com/account/api-tokens
 *   3. Add to Doppler: `doppler secrets set REPLICATE_API_TOKEN <your-token>`
 *      OR add to .env: REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxx
 *   4. Install SDK: `pnpm add -D replicate`
 *
 * Run:
 *   pnpm cartography:depth
 *   (or: node scripts/depth-cartography.mjs public/cartography/district.png)
 *
 * Cost: ~$0.001 per image (Depth Anything v2 on Replicate, mid-2024 pricing)
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

// Lazy-import replicate so the script fails with a friendly error if not installed
let Replicate
try {
	Replicate = (await import('replicate')).default
} catch {
	console.error(
		'✗ replicate package not installed.\n' +
			'  Install: pnpm add -D replicate\n' +
			'  Then re-run: pnpm cartography:depth',
	)
	process.exit(1)
}

// Read from either REPLICATE_TOKEN (current Doppler name) or
// REPLICATE_API_TOKEN (the Replicate SDK's documented default).
const token = process.env.REPLICATE_TOKEN || process.env.REPLICATE_API_TOKEN
if (!token) {
	console.error(
		'✗ REPLICATE_TOKEN not set.\n' +
			'  Doppler is already configured (doppler.yaml present).\n' +
			'  Run via the wrapper: pnpm cartography:depth (uses `doppler run`)\n' +
			'  Or inject manually: doppler run -- node scripts/depth-cartography.mjs',
	)
	process.exit(1)
}

function findDefaultImage() {
	const cartoDir = path.join(projectRoot, '../../../representation/cartography-sources')
	for (const name of ['district.png', 'district.jpg', 'district.jpeg']) {
		const p = path.join(cartoDir, name)
		if (fs.existsSync(p)) return p
	}
	return null
}

const IMAGE_PATH = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : findDefaultImage()
if (!IMAGE_PATH || !fs.existsSync(IMAGE_PATH)) {
	console.error('✗ Source image not found. Drop one in public/cartography/district.{png,jpg}')
	process.exit(1)
}

const OUTPUT_PATH = path.join(
	path.dirname(IMAGE_PATH),
	'district.depth.png',
)

console.log(`▸ Source: ${path.relative(projectRoot, IMAGE_PATH)}`)
console.log(`▸ Output: ${path.relative(projectRoot, OUTPUT_PATH)}`)

const replicate = new Replicate({ auth: token })

// Depth Anything on Replicate (cjwbw/depth-anything). Verified slug as of
// 2026-05. v2 isn't published on Replicate by any major maintainer; v1 with
// the large ViT encoder produces nearly identical depth quality for our
// cartographic-illustration use case.
// Latest version hash pinned for stability:
//   https://replicate.com/cjwbw/depth-anything
const MODEL =
	'cjwbw/depth-anything:e5b0454205013708df48492a13a8ee4b3c412173362fc56c6b5558eb54e527e5'

console.log(`▸ Submitting to ${MODEL.split(':')[0]}...`)

const imageBuffer = fs.readFileSync(IMAGE_PATH)
const imageDataUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`

let output
try {
	output = await replicate.run(MODEL, {
		input: { image: imageDataUrl, encoder: 'vitl' },
	})
} catch (err) {
	console.error(`✗ Replicate API call failed: ${err.message}`)
	console.error('  If the model slug is outdated, update MODEL in this script.')
	console.error('  Search: https://replicate.com/explore?query=depth+anything')
	process.exit(1)
}

// Output can be: a URL string, a ReadableStream, or an object with .url()
let depthUrl
if (typeof output === 'string') depthUrl = output
else if (output?.url) depthUrl = typeof output.url === 'function' ? output.url() : output.url
else if (Array.isArray(output)) depthUrl = output[0]
else {
	console.error('✗ Unexpected Replicate response shape:', output)
	process.exit(1)
}

console.log(`▸ Depth map ready: ${depthUrl}`)
console.log('▸ Downloading...')

const res = await fetch(depthUrl)
if (!res.ok) {
	console.error(`✗ Download failed: ${res.status} ${res.statusText}`)
	process.exit(1)
}
const buf = Buffer.from(await res.arrayBuffer())
fs.writeFileSync(OUTPUT_PATH, buf)

console.log(`\n✓ Depth map saved → ${path.relative(projectRoot, OUTPUT_PATH)} (${(buf.length / 1024).toFixed(0)}KB)`)
console.log('\nNext: wire the depth map into CartographyCanvas (see PIPELINE.md §3).')
