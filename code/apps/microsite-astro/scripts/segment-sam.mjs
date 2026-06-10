/**
 * segment-sam.mjs — Meta SAM segmentation via Replicate API.
 *
 * Alternative to scripts/segment-cartography.mjs (which uses pure-JS color
 * predicates). SAM detects object boundaries semantically rather than by
 * color, so it works better for:
 *   - Photographic illustrations (where colors are continuous, not flat)
 *   - Cartographic images where buildings have subtle edge transitions
 *   - Cases where you want EVERY distinct region segmented (not just
 *     red/blue), then color-classified after the fact
 *
 * Pipeline:
 *   1. Submit district.png to yyjim/segment-anything-everything on Replicate
 *   2. Receive array of mask PNG URLs (typically 50-300 masks)
 *   3. For each mask: download → find pixels → compute centroid → sample
 *      color from original image at centroid → classify → polygon (convex hull)
 *   4. Filter by size + classified category → write generated-zones.ts
 *
 * Cost: ~$0.02 per run (more than color-based which is free).
 * Time:  30-90 seconds (SAM is heavy + masks download in parallel).
 *
 * Run:
 *   pnpm cartography:segment:sam
 *
 * Tune CLASSIFIERS below for different illustration palettes.
 */

import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

let Replicate
try {
	Replicate = (await import('replicate')).default
} catch {
	console.error('✗ replicate package not installed.  pnpm add -D replicate')
	process.exit(1)
}

const token = process.env.REPLICATE_TOKEN || process.env.REPLICATE_API_TOKEN
if (!token) {
	console.error(
		'✗ REPLICATE_TOKEN not set. Use the wrapper: pnpm cartography:segment:sam',
	)
	process.exit(1)
}

function findDefaultImage() {
	const cartoDir = path.join(projectRoot, 'public/cartography')
	for (const name of ['district.png', 'district.jpg', 'district.jpeg']) {
		const p = path.join(cartoDir, name)
		if (fs.existsSync(p)) return p
	}
	return null
}

const IMAGE_PATH = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : findDefaultImage()
const OUTPUT_PATH = process.argv[3]
	? path.resolve(process.cwd(), process.argv[3])
	: path.join(projectRoot, 'src/lib/generated-zones.ts')

if (!IMAGE_PATH || !fs.existsSync(IMAGE_PATH)) {
	console.error('✗ Source image not found.')
	process.exit(1)
}

const MAP_WIDTH = 1200

/* ============================================================================
 * Color classifiers — applied to SAM masks after segmentation.
 *
 * SAM doesn't label regions semantically (it just finds boundaries).
 * We sample the original image color at each mask's centroid and classify.
 * ========================================================================== */

const CLASSIFIERS = [
	{
		id: 'dispatch',
		label: 'DISpatch HQ',
		description: 'Editorial District anchor — featured dispatches publish here',
		href: '/article',
		match: (r, g, b) => r > 110 && r > g + 30 && r > b + 30,
		minPixels: 80,
	},
	{
		id: 'water',
		label: 'Civic Waterway',
		description: 'Bayou / lake / reservoir — natural district boundary',
		href: null,
		match: (r, g, b) => b > 90 && b > r + 15 && b - g > -25 && r < 160,
		minPixels: 1500,
	},
]

/* ============================================================================
 * Decode the source image (for color sampling at mask centroids)
 * ========================================================================== */

const ext = path.extname(IMAGE_PATH).toLowerCase()
const raw = fs.readFileSync(IMAGE_PATH)
let srcData, srcWidth, srcHeight
if (ext === '.png') {
	const png = PNG.sync.read(raw)
	srcData = png.data
	srcWidth = png.width
	srcHeight = png.height
} else if (ext === '.jpg' || ext === '.jpeg') {
	const j = jpeg.decode(raw, { useTArray: true, maxMemoryUsageInMB: 1024 })
	srcData = j.data
	srcWidth = j.width
	srcHeight = j.height
} else {
	console.error(`✗ Unsupported format: ${ext}`)
	process.exit(1)
}
console.log(`▸ Source: ${path.relative(projectRoot, IMAGE_PATH)} (${srcWidth}×${srcHeight})`)

function sampleSrcColor(x, y) {
	const xi = Math.max(0, Math.min(srcWidth - 1, Math.round(x)))
	const yi = Math.max(0, Math.min(srcHeight - 1, Math.round(y)))
	const i = (yi * srcWidth + xi) * 4
	return [srcData[i], srcData[i + 1], srcData[i + 2]]
}

/* ============================================================================
 * Submit to SAM
 * ========================================================================== */

const replicate = new Replicate({ auth: token })

// yyjim/segment-anything-everything — automatic mask generation, no prompts.
// Latest version pinned for stability.
const MODEL = 'yyjim/segment-anything-everything:b28e02c3844df2c44dcb2cb96ba2496435681bf88878e3bd0ab6b401a971d79e'

console.log(`▸ Submitting to ${MODEL.split(':')[0]}...`)
console.log('  (SAM is heavy — 30-90 seconds typical)')

const imageDataUrl = `data:image/png;base64,${raw.toString('base64')}`

let maskUrls
try {
	maskUrls = await replicate.run(MODEL, {
		input: {
			image: imageDataUrl,
			points_per_side: 32, // higher = finer-grained masks
			pred_iou_thresh: 0.88,
			stability_score_thresh: 0.95,
			min_mask_region_area: 100,
		},
	})
} catch (err) {
	console.error(`✗ Replicate call failed: ${err.message}`)
	process.exit(1)
}

if (!Array.isArray(maskUrls)) {
	console.error('✗ Unexpected output shape (expected array of mask URLs):', typeof maskUrls)
	process.exit(1)
}

console.log(`▸ Received ${maskUrls.length} masks. Downloading + processing in parallel...`)

/* ============================================================================
 * Process masks — download, find pixels, compute centroid, sample color
 * ========================================================================== */

async function processMask(url, idx) {
	// Retry once on ECONNRESET — Replicate's CDN occasionally closes
	// connections under burst load. Silent skip on second failure so a
	// single bad mask doesn't kill the whole run.
	let res
	for (let attempt = 0; attempt < 2; attempt++) {
		try {
			res = await fetch(url)
			if (res.ok) break
			res = null
		} catch (err) {
			if (attempt === 1) {
				console.warn(`  ↯ mask ${idx} failed (${err.code || err.message}); skipping`)
				return null
			}
			// brief backoff between retries
			await new Promise((r) => setTimeout(r, 250))
		}
	}
	if (!res) return null
	const buf = Buffer.from(await res.arrayBuffer())
	const png = PNG.sync.read(buf)

	// Collect mask pixels (white pixels = inside mask). Most SAM mask PNGs
	// are grayscale with alpha; we check both alpha and red channel.
	const pixels = []
	let minX = png.width,
		maxX = 0,
		minY = png.height,
		maxY = 0
	let sumX = 0,
		sumY = 0

	for (let y = 0; y < png.height; y++) {
		for (let x = 0; x < png.width; x++) {
			const i = (y * png.width + x) * 4
			const r = png.data[i]
			const a = png.data[i + 3]
			// Mask pixel = alpha > 0 AND brightness > threshold
			if (a > 32 && r > 96) {
				pixels.push(x, y)
				if (x < minX) minX = x
				if (x > maxX) maxX = x
				if (y < minY) minY = y
				if (y > maxY) maxY = y
				sumX += x
				sumY += y
			}
		}
	}

	const pixelCount = pixels.length / 2
	if (pixelCount < 50) return null

	const cx = sumX / pixelCount
	const cy = sumY / pixelCount

	// Mask resolution may differ from source resolution; scale centroid
	const scaleX = srcWidth / png.width
	const scaleY = srcHeight / png.height
	const srcCx = cx * scaleX
	const srcCy = cy * scaleY

	const [r, g, b] = sampleSrcColor(srcCx, srcCy)

	return {
		idx,
		pixels,
		pixelCount,
		bbox: { minX, maxX, minY, maxY },
		centroid: [cx, cy],
		srcCentroid: [srcCx, srcCy],
		centroidColor: [r, g, b],
		maskWidth: png.width,
		maskHeight: png.height,
	}
}

// Batched parallel processing — Replicate's CDN closes connections under
// burst load (ECONNRESET). 20 concurrent fetches keeps under that threshold
// while still being fast (~30 batches × 0.5s each = ~15s for 600 masks).
const BATCH_SIZE = 20
const processed = []
for (let i = 0; i < maskUrls.length; i += BATCH_SIZE) {
	const batch = maskUrls.slice(i, i + BATCH_SIZE)
	const results = await Promise.all(
		batch.map((url, j) => processMask(url, i + j)),
	)
	for (const r of results) if (r) processed.push(r)
	if ((i + BATCH_SIZE) % 100 < BATCH_SIZE) {
		process.stdout.write(`\r  processed ${Math.min(i + BATCH_SIZE, maskUrls.length)}/${maskUrls.length}`)
	}
}
process.stdout.write('\n')
console.log(`▸ ${processed.length} masks ≥ 50 px after filtering`)

/* ============================================================================
 * Classify each mask by sampled centroid color
 * ========================================================================== */

const classified = []
for (const m of processed) {
	const [r, g, b] = m.centroidColor
	const cat = CLASSIFIERS.find((c) => c.match(r, g, b))
	if (!cat) continue
	if (m.pixelCount < cat.minPixels) continue
	classified.push({ ...m, category: cat })
}

console.log(`▸ ${classified.length} masks matched a classifier`)

// Sort largest first per category
classified.sort((a, b) => b.pixelCount - a.pixelCount)

/* ============================================================================
 * Convex hull (Andrew's monotone chain)
 * ========================================================================== */

function convexHull(points) {
	const pts = points.slice().sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
	if (pts.length < 3) return pts
	const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
	const lower = []
	for (const p of pts) {
		while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop()
		lower.push(p)
	}
	const upper = []
	for (let i = pts.length - 1; i >= 0; i--) {
		const p = pts[i]
		while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop()
		upper.push(p)
	}
	lower.pop()
	upper.pop()
	return lower.concat(upper)
}

/* ============================================================================
 * Build zones
 * ========================================================================== */

const counters = {}
const zones = []

for (const m of classified) {
	const cat = m.category
	counters[cat.id] = (counters[cat.id] || 0) + 1
	const idx = counters[cat.id]

	// Sample mask pixels for hull (every 6th to speed it up)
	const sampled = []
	for (let i = 0; i < m.pixels.length; i += 12) {
		sampled.push([m.pixels[i], m.pixels[i + 1]])
	}
	const hull = convexHull(sampled)

	// Scale mask coords → source coords → map coords
	const maskToSrc = srcWidth / m.maskWidth
	const srcToMap = MAP_WIDTH / srcWidth
	const scale = maskToSrc * srcToMap
	const polygon = hull.map(([x, y]) => [
		Math.round(x * scale * 10) / 10,
		Math.round(y * scale * 10) / 10,
	])

	zones.push({
		id: `${cat.id}-${idx}`,
		label: cat.label + (counters[cat.id] > 1 ? ` (${idx})` : ''),
		description: cat.description,
		...(cat.href ? { href: cat.href } : {}),
		bounds: polygon,
	})
}

console.log(`\n▸ Built ${zones.length} zones from SAM masks`)

/* ============================================================================
 * Write output
 * ========================================================================== */

const out = `/**
 * AUTO-GENERATED by scripts/segment-sam.mjs (Meta SAM via Replicate)
 *
 * Source:           ${path.relative(projectRoot, IMAGE_PATH).replace(/\\/g, '/')}
 * Image dimensions: ${srcWidth}×${srcHeight}
 * Map width:        ${MAP_WIDTH}
 * Model:            ${MODEL.split(':')[0]}
 * SAM masks total:  ${maskUrls.length}
 * Classified:       ${classified.length}
 * Output zones:     ${zones.length}
 * Generated:        ${new Date().toISOString()}
 *
 * Run \`pnpm cartography:segment:sam\` to regenerate.
 * Compare with \`pnpm cartography:segment\` (color-based, free, instant).
 */

import type { InteractiveZone } from './prime-city-map'

export const GENERATED_ZONES: InteractiveZone[] = ${JSON.stringify(zones, null, 2)}

export const GENERATED_ZONES_META = ${JSON.stringify(
	{
		sourceImage: path.relative(projectRoot, IMAGE_PATH).replace(/\\/g, '/'),
		imageDimensions: { width: srcWidth, height: srcHeight },
		mapWidth: MAP_WIDTH,
		generatedAt: new Date().toISOString(),
		zoneCount: zones.length,
		samMaskCount: maskUrls.length,
		method: 'sam',
	},
	null,
	2,
)} as const
`

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
fs.writeFileSync(OUTPUT_PATH, out)
console.log(`\n✓ Wrote ${zones.length} zone(s) → ${path.relative(projectRoot, OUTPUT_PATH).replace(/\\/g, '/')}`)
