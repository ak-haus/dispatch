/**
 * segment-cartography.mjs — pure-JS color-based segmentation pipeline.
 *
 * Reads public/cartography/district.jpg, finds connected regions matching each
 * configured color category (red highlighted buildings, blue water, etc.), and
 * writes src/lib/generated-zones.ts with hot-zone polygons aligned to the
 * 1200-wide map coordinate system used by CartographyCanvas.
 *
 * Architecture:
 *   jpeg-js   → decode JPG to raw RGBA Uint8Array (pure JS, no native binds)
 *   floodFill → connected component analysis on color-predicate masks
 *   convex hull (Andrew's monotone chain) → polygon outline per region
 *   scaling   → image-pixel coords → map coords (1200 wide)
 *   TS output → InteractiveZone[] array drop-in for CartographyCanvas
 *
 * Run:
 *   pnpm cartography:segment
 *   (or:  node scripts/segment-cartography.mjs path/to/image.jpg output.ts)
 *
 * Tune CATEGORIES below for different illustration palettes.
 */

import jpeg from 'jpeg-js'
import { PNG } from 'pngjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

function findDefaultImage() {
	const cartoDir = path.join(projectRoot, 'public/cartography')
	for (const name of ['district.png', 'district.jpg', 'district.jpeg']) {
		const p = path.join(cartoDir, name)
		if (fs.existsSync(p)) return p
	}
	return path.join(cartoDir, 'district.png') // default for error message
}

const IMAGE_PATH = process.argv[2]
	? path.resolve(process.cwd(), process.argv[2])
	: findDefaultImage()
const OUTPUT_PATH = process.argv[3]
	? path.resolve(process.cwd(), process.argv[3])
	: path.join(projectRoot, 'src/lib/generated-zones.ts')

const MAP_WIDTH = 1200 // matches PRIME_CITY_MAP.width

/* ============================================================================
 * Color category configuration.
 *
 * Each category defines:
 *   id           → stable identifier (zones named `${id}-1`, `${id}-2`...)
 *   label        → human-readable zone label
 *   description  → tooltip body text
 *   href         → click target (null = info-only zone)
 *   match(r,g,b) → boolean predicate for "is this pixel in the category"
 *   minPixels    → smaller regions filtered as noise
 *   maxRegions   → keep only the N largest regions per category
 *
 * Tune the predicates for your illustration's palette. The defaults match
 * a typical sepia-toned cartographic illustration with red highlight buildings
 * and blue water features.
 * ========================================================================== */

const CATEGORIES = [
	{
		id: 'dispatch',
		label: 'DISpatch HQ',
		description: 'Editorial District anchor — featured dispatches publish here',
		href: '/article',
		// Red dominant: R noticeably higher than both G and B
		match: (r, g, b) => r > 110 && r > g + 30 && r > b + 30,
		minPixels: 60,
		maxRegions: 8,
	},
	{
		id: 'water',
		label: 'Civic Waterway',
		description: 'Bayou / lake / reservoir — the district\'s natural boundary',
		href: null,
		// Blue dominant: B clearly above R, not too saturated to avoid catching grays
		match: (r, g, b) => b > 90 && b > r + 15 && b - g > -25 && r < 160,
		minPixels: 800,
		maxRegions: 3,
	},
]

/* ============================================================================
 * Decode image
 * ========================================================================== */

console.log(`▸ Reading ${path.relative(projectRoot, IMAGE_PATH)}`)
if (!fs.existsSync(IMAGE_PATH)) {
	console.error(`✗ Image not found: ${IMAGE_PATH}`)
	process.exit(1)
}

const raw = fs.readFileSync(IMAGE_PATH)
const ext = path.extname(IMAGE_PATH).toLowerCase()

let data, width, height
if (ext === '.png') {
	const png = PNG.sync.read(raw)
	data = png.data
	width = png.width
	height = png.height
	console.log(`▸ ${width}×${height} (${(raw.length / 1024).toFixed(0)}KB PNG)`)
} else if (ext === '.jpg' || ext === '.jpeg') {
	const decoded = jpeg.decode(raw, { useTArray: true, maxMemoryUsageInMB: 1024 })
	data = decoded.data
	width = decoded.width
	height = decoded.height
	console.log(`▸ ${width}×${height} (${(raw.length / 1024).toFixed(0)}KB JPG)`)
} else {
	console.error(`✗ Unsupported image format: ${ext}. Use .png, .jpg, or .jpeg`)
	process.exit(1)
}

/* ============================================================================
 * Flood-fill connected component analysis
 * ========================================================================== */

function findRegions(predicate, minPixels) {
	const visited = new Uint8Array(width * height)
	const regions = []

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const vIdx = y * width + x
			if (visited[vIdx]) continue

			const dIdx = vIdx * 4
			if (!predicate(data[dIdx], data[dIdx + 1], data[dIdx + 2])) continue

			// Flood fill from (x, y) — iterative stack to avoid recursion limit
			const stack = [x, y]
			const pixels = []
			let minX = x,
				maxX = x,
				minY = y,
				maxY = y

			while (stack.length) {
				const py = stack.pop()
				const px = stack.pop()
				if (px < 0 || py < 0 || px >= width || py >= height) continue

				const pV = py * width + px
				if (visited[pV]) continue
				const pD = pV * 4
				if (!predicate(data[pD], data[pD + 1], data[pD + 2])) continue

				visited[pV] = 1
				pixels.push(px, py) // flat-pack for memory efficiency

				if (px < minX) minX = px
				if (px > maxX) maxX = px
				if (py < minY) minY = py
				if (py > maxY) maxY = py

				stack.push(px + 1, py, px - 1, py, px, py + 1, px, py - 1)
			}

			if (pixels.length / 2 >= minPixels) {
				regions.push({ pixels, minX, maxX, minY, maxY, area: pixels.length / 2 })
			}
		}
	}
	return regions
}

/* ============================================================================
 * Convex hull via Andrew's monotone chain
 * Input: array of [x,y] points
 * Output: convex hull polygon (CCW order, no duplicate endpoint)
 * ========================================================================== */

function convexHull(points) {
	const pts = points.slice().sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
	if (pts.length < 3) return pts

	const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

	const lower = []
	for (const p of pts) {
		while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
			lower.pop()
		}
		lower.push(p)
	}

	const upper = []
	for (let i = pts.length - 1; i >= 0; i--) {
		const p = pts[i]
		while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
			upper.pop()
		}
		upper.push(p)
	}

	lower.pop()
	upper.pop()
	return lower.concat(upper)
}

/* ============================================================================
 * Sample boundary pixels (every Nth pixel of a region for hull computation)
 * Full pixel list is too dense; sampling speeds up hull while preserving shape.
 * ========================================================================== */

function sampleBoundary(region, step = 4) {
	const points = []
	const { pixels } = region
	for (let i = 0; i < pixels.length; i += step * 2) {
		points.push([pixels[i], pixels[i + 1]])
	}
	return points
}

/* ============================================================================
 * Scale pixel coords to map coords (1200-wide map)
 * ========================================================================== */

const scale = MAP_WIDTH / width
const px2map = (x, y) => [
	Math.round(x * scale * 10) / 10,
	Math.round(y * scale * 10) / 10,
]

/* ============================================================================
 * Run segmentation per category
 * ========================================================================== */

const zones = []
const summaryRows = []

for (const cat of CATEGORIES) {
	console.log(`\n▸ Segmenting "${cat.id}"...`)
	const regions = findRegions(cat.match, cat.minPixels)
	console.log(`  found ${regions.length} candidate region(s) ≥ ${cat.minPixels}px`)

	regions.sort((a, b) => b.area - a.area)
	const kept = regions.slice(0, cat.maxRegions)

	for (let i = 0; i < kept.length; i++) {
		const r = kept[i]
		const sampled = sampleBoundary(r, 6)
		const hull = convexHull(sampled)
		const polygon = hull.map(([x, y]) => px2map(x, y))

		const zone = {
			id: kept.length === 1 ? cat.id : `${cat.id}-${i + 1}`,
			label: cat.label + (kept.length > 1 ? ` (${i + 1})` : ''),
			description: cat.description,
			...(cat.href ? { href: cat.href } : {}),
			bounds: polygon,
		}
		zones.push(zone)
		summaryRows.push(
			`    [${zone.id}] area=${r.area}px polygon-vertices=${polygon.length}`,
		)
	}
}

console.log('\n▸ Summary:')
summaryRows.forEach((s) => console.log(s))

/* ============================================================================
 * Write generated-zones.ts
 * ========================================================================== */

const out = `/**
 * AUTO-GENERATED by scripts/segment-cartography.mjs — do not edit by hand.
 *
 * Source:           ${path.relative(projectRoot, IMAGE_PATH).replace(/\\\\/g, '/')}
 * Image dimensions: ${width}×${height}
 * Map width:        ${MAP_WIDTH}
 * Generated:        ${new Date().toISOString()}
 * Zone count:       ${zones.length}
 *
 * Run \`pnpm cartography:segment\` to regenerate.
 * Tune color predicates in scripts/segment-cartography.mjs CATEGORIES.
 */

import type { InteractiveZone } from './prime-city-map'

export const GENERATED_ZONES: InteractiveZone[] = ${JSON.stringify(zones, null, 2)}

export const GENERATED_ZONES_META = ${JSON.stringify(
	{
		sourceImage: path.relative(projectRoot, IMAGE_PATH).replace(/\\/g, '/'),
		imageDimensions: { width, height },
		mapWidth: MAP_WIDTH,
		generatedAt: new Date().toISOString(),
		zoneCount: zones.length,
	},
	null,
	2,
)} as const
`

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
fs.writeFileSync(OUTPUT_PATH, out)
console.log(`\n✓ Wrote ${zones.length} zone(s) → ${path.relative(projectRoot, OUTPUT_PATH).replace(/\\/g, '/')}`)
