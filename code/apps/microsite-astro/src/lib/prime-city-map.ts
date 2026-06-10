/**
 * Prime City / Editorial District — authored civic geometry.
 *
 * Coordinate space: 1200 × 800 (aspect ratio ~3:2).
 * This is the canonical map data for all DISpatch cartography surfaces.
 * The same geometry is rendered at different zoom levels across pages:
 *   district     → homepage hero (full 1200×800 view)
 *   neighborhood → article page atmospheric frame (tight view ~DISpatch building)
 *
 * Civic grammar (per Build Spec Map Generation Phase 1):
 *   - Grand Civic Boulevard: founding diagonal SW→NE, the district's spine
 *   - Civic Spine: later orthogonal N-S grid axis; its intersection with GCB
 *     defines the district's identity node
 *   - Editorial Boundary: near-horizontal E-W boundary road
 *   - Collectors branch with intentional rhythm from these arterials
 *   - Local streets fill blocks with believable grain, more orthogonal away
 *     from the diagonal influence zone
 *   - Contour lines obey believable terrain: elevated NW, lower SE
 *   - DISpatch building occupies the NE corner of the GCB × Civic Spine node —
 *     a founding-institution location in the civic logic
 *
 * Authority: Build Spec §Cartography Doctrine, §Map Generation Spec.
 */

export type Point = [number, number]

export type RoadClass = 'arterial' | 'collector' | 'local'

export type Road = {
	id: string
	class: RoadClass
	points: Point[]
}

export type District = {
	id: string
	name: string
	points: Point[]
}

export type BuildingFootprint = {
	id: string
	type: 'landmark' | 'block'
	points: Point[]
}

export type WaterFeature = {
	id: string
	type: 'canal' | 'pond'
	points: Point[]
	width?: number
}

/* Interactive zones — hot regions over the cartography that respond to
   hover (subtle accent highlight + tooltip) and optional click navigation.
   Coordinates align with the visible landmarks in the illustration base. */
export type InteractiveZone = {
	id: string
	label: string
	description: string
	href?: string
	bounds: Point[]
}

export type MapData = {
	width: number
	height: number
	gridSpacing: number
	roads: Road[]
	districts: District[]
	buildings: BuildingFootprint[]
	contours: Point[][]
	waterFeatures: WaterFeature[]
	/** DISpatch building cluster — main HQ + annexes, grid-aligned. */
	dispatchBuildings: Array<{ id: string; footprint: Point[]; primary?: boolean }>
	dispatchCenter: Point
	compass: {
		center: Point
		radius: number
	}
}

export type MapZoom = 'district' | 'neighborhood'

// ViewBox strings for each zoom level
export const MAP_ZOOMS: Record<MapZoom, string> = {
	district: '0 0 1200 2800', // full Prime City map (homepage scrolls through this)
	neighborhood: '350 470 500 320', // tight neighborhood around DISpatch (article)
}

// DISpatch building cluster — grid-aligned at (500, 590), the heart of the
// Editorial District. Per sample: main HQ + 3 smaller annexes clustered.
const DISPATCH_CENTER: Point = [510, 595]
const DISPATCH_CLUSTER: Array<{ id: string; footprint: Point[]; primary?: boolean }> = [
	{
		id: 'dispatch-hq',
		primary: true,
		footprint: [[470, 555], [550, 555], [550, 615], [470, 615]],
	},
	{
		id: 'dispatch-annex-w',
		footprint: [[435, 575], [465, 575], [465, 610], [435, 610]],
	},
	{
		id: 'dispatch-annex-e',
		footprint: [[555, 580], [590, 580], [590, 615], [555, 615]],
	},
	{
		id: 'dispatch-annex-s',
		footprint: [[490, 625], [535, 625], [535, 655], [490, 655]],
	},
]

export const PRIME_CITY_MAP: MapData = {
	width: 1200,
	height: 2800,
	gridSpacing: 100,

	roads: [
		// ── Arterials ───────────────────────────────────────────────────────────
		// Grand Civic Boulevard — the founding diagonal (SW → NE).
		// Slope: approx -0.64 (drops ~640px over 1000px horizontal).
		// The district's primary identity axis. All other roads refer to it.
		{
			id: 'grand-civic-blvd',
			class: 'arterial',
			points: [
				[0, 800],
				[140, 706],
				[290, 602],
				[492, 468],
				[660, 360],
				[830, 252],
				[1010, 138],
				[1200, 14],
			],
		},
		// Civic Spine — the later orthogonal N-S grid axis (slight E-lean toward S).
		// Extends from north city limit through Editorial District (where it
		// meets the DISpatch building cluster) and continues south through the
		// industrial quarter and bayou. The city's vertical backbone.
		{
			id: 'civic-spine',
			class: 'arterial',
			points: [
				[500, 0],
				[500, 200],
				[500, 400],
				[510, 590],
				[520, 800],
				[540, 1100],
				[555, 1400],
				[565, 1700],
				[570, 2000],
				[575, 2300],
				[580, 2600],
				[582, 2800],
			],
		},
		// Editorial Boundary — near-horizontal E-W district boundary.
		// Slight northward drift toward E (older civic roads rarely stay perfectly level).
		{
			id: 'editorial-boundary',
			class: 'arterial',
			points: [
				[0, 504],
				[200, 497],
				[459, 490],
				[700, 484],
				[1000, 480],
				[1200, 478],
			],
		},

		// ── Collectors ──────────────────────────────────────────────────────────
		// Press Row — horizontal collector in the district's middle band.
		// Named for the press-house institutions that historically lined it.
		{
			id: 'press-row',
			class: 'collector',
			points: [
				[0, 568],
				[180, 560],
				[370, 553],
				[459, 549],
				[640, 544],
				[900, 540],
			],
		},
		// Archive Road — diagonal collector, shallower angle than GCB.
		// Creates the interesting irregular block geometry between the two diagonals.
		{
			id: 'archive-road',
			class: 'collector',
			points: [
				[160, 740],
				[310, 696],
				[459, 648],
				[580, 612],
				[720, 574],
				[900, 533],
			],
		},
		// Foundry Lane — shorter E-W collector north of Editorial Boundary.
		{
			id: 'foundry-lane',
			class: 'collector',
			points: [
				[210, 447],
				[340, 442],
				[459, 437],
				[590, 433],
				[720, 430],
			],
		},
		// Canal Path — curves S, suggesting an infrastructure or waterway trace.
		// The slight southward curve near the W edge implies drainage logic.
		{
			id: 'canal-path',
			class: 'collector',
			points: [
				[0, 660],
				[100, 648],
				[240, 638],
				[370, 633],
				[459, 630],
			],
		},
		// North Quarter Road — horizontal collector in the upper district.
		{
			id: 'north-quarter',
			class: 'collector',
			points: [
				[230, 302],
				[360, 298],
				[459, 294],
				[610, 290],
				[800, 287],
				[1000, 285],
			],
		},
		// Publication Cross — NE collector branching from Civic Spine toward N.
		{
			id: 'publication-cross',
			class: 'collector',
			points: [
				[459, 202],
				[610, 216],
				[770, 231],
				[950, 248],
			],
		},
		// Institute Road — E-side vertical connector in the eastern district.
		{
			id: 'institute-road',
			class: 'collector',
			points: [
				[734, 414],
				[744, 490],
				[758, 572],
				[775, 660],
				[795, 760],
			],
		},

		// ── Extended arterials / lower city zone (y=800-2800) ───────────────────
		// Industrial Boulevard — east-west arterial defining the Industrial Quarter
		{
			id: 'industrial-blvd',
			class: 'arterial',
			points: [
				[0, 1180],
				[200, 1190],
				[540, 1200],
				[800, 1205],
				[1200, 1210],
			],
		},
		// Harbor Road — east-west arterial near the bayou/wetlands
		{
			id: 'harbor-road',
			class: 'arterial',
			points: [
				[0, 2010],
				[300, 2020],
				[570, 2025],
				[850, 2030],
				[1200, 2035],
			],
		},
		// Industrial Spine West — N-S arterial in the lower west
		{
			id: 'industrial-spine-w',
			class: 'arterial',
			points: [
				[210, 800],
				[208, 1180],
				[206, 1500],
				[202, 1800],
				[200, 2050],
			],
		},
		// Eastern Concourse — N-S arterial in lower east
		{
			id: 'eastern-concourse',
			class: 'arterial',
			points: [
				[900, 800],
				[902, 1180],
				[908, 1500],
				[915, 1800],
				[920, 2050],
				[925, 2400],
			],
		},
		// Bayou Crossing — diagonal lower arterial
		{
			id: 'bayou-crossing',
			class: 'arterial',
			points: [
				[0, 2400],
				[260, 2350],
				[560, 2300],
				[850, 2240],
				[1200, 2180],
			],
		},
		// Lower industrial collectors
		{
			id: 'mill-row',
			class: 'collector',
			points: [
				[0, 1400],
				[200, 1405],
				[560, 1410],
				[900, 1415],
				[1200, 1420],
			],
		},
		{
			id: 'foundry-cross',
			class: 'collector',
			points: [
				[0, 1620],
				[250, 1625],
				[560, 1635],
				[920, 1640],
				[1200, 1645],
			],
		},
		{
			id: 'quarry-line',
			class: 'collector',
			points: [
				[100, 900],
				[160, 1100],
				[195, 1300],
				[200, 1500],
			],
		},
		{
			id: 'rail-trace',
			class: 'collector',
			points: [
				[1000, 900],
				[990, 1180],
				[975, 1450],
				[960, 1720],
				[945, 1980],
			],
		},
		{
			id: 'south-distributor',
			class: 'collector',
			points: [
				[0, 1820],
				[200, 1815],
				[500, 1805],
				[700, 1800],
				[1100, 1790],
			],
		},
		{
			id: 'wetlands-arc',
			class: 'collector',
			points: [
				[60, 2200],
				[200, 2210],
				[400, 2230],
				[640, 2250],
				[900, 2240],
				[1140, 2225],
			],
		},
		{
			id: 'shoreline-trace',
			class: 'collector',
			points: [
				[0, 2570],
				[180, 2560],
				[400, 2555],
				[640, 2565],
				[900, 2580],
				[1200, 2600],
			],
		},
		{
			id: 'outskirts-spine',
			class: 'collector',
			points: [
				[420, 2080],
				[440, 2300],
				[460, 2500],
				[475, 2700],
				[480, 2800],
			],
		},

		// ── Local streets ────────────────────────────────────────────────────────
		// North-of-GCB zone: slight rotation following the diagonal's influence.
		{ id: 'local-n1', class: 'local', points: [[255, 426], [360, 423], [459, 419]] },
		{ id: 'local-n2', class: 'local', points: [[262, 378], [368, 375], [459, 371]] },
		{ id: 'local-n3', class: 'local', points: [[272, 330], [376, 327], [459, 323]] },
		{ id: 'local-n4', class: 'local', points: [[284, 254], [383, 251], [459, 248]] },
		// NW block grain — between GCB diagonal and Foundry Lane
		{ id: 'local-nw1', class: 'local', points: [[188, 480], [278, 475], [368, 470]] },
		{ id: 'local-nw2', class: 'local', points: [[145, 530], [244, 525], [355, 520]] },
		{ id: 'local-nw3', class: 'local', points: [[195, 303], [278, 299], [372, 296]] },
		// South-of-Editorial-Boundary zone: more orthogonal grid
		{ id: 'local-s1', class: 'local', points: [[216, 526], [338, 522], [459, 518]] },
		{ id: 'local-s2', class: 'local', points: [[196, 586], [306, 583], [416, 580]] },
		{ id: 'local-s3', class: 'local', points: [[186, 616], [296, 614], [406, 612]] },
		// N-S cross connectors (short segments between horizontals)
		{ id: 'local-c1', class: 'local', points: [[370, 419], [372, 490], [374, 552]] },
		{ id: 'local-c2', class: 'local', points: [[308, 442], [310, 492], [312, 552]] },
		{ id: 'local-c3', class: 'local', points: [[404, 376], [406, 419], [408, 490]] },
		{ id: 'local-c4', class: 'local', points: [[208, 566], [210, 610], [213, 643]] },
		// Eastern district (more regular grid, away from diagonal influence)
		{ id: 'local-e1', class: 'local', points: [[562, 486], [564, 546], [567, 612]] },
		{ id: 'local-e2', class: 'local', points: [[642, 484], [645, 542], [648, 607]] },
		{ id: 'local-e3', class: 'local', points: [[534, 414], [536, 486]] },
		{ id: 'local-e4', class: 'local', points: [[603, 414], [605, 486]] },
		// North district additional grain
		{ id: 'local-ne1', class: 'local', points: [[604, 294], [607, 358], [610, 414]] },
		{ id: 'local-ne2', class: 'local', points: [[684, 292], [687, 354], [690, 414]] },
	],

	districts: [
		// Editorial District core — bounded by arterials, extending S and W
		{
			id: 'editorial-district',
			name: 'Editorial District',
			points: [
				[160, 740],
				[0, 800],
				[0, 488],
				[200, 483],
				[459, 477],
				[760, 472],
				[920, 532],
				[880, 710],
				[610, 762],
				[370, 772],
			],
		},
		// Publishing Quarter — north of Editorial Boundary
		{
			id: 'publishing-quarter',
			name: 'Publishing Quarter',
			points: [
				[220, 294],
				[459, 286],
				[780, 281],
				[780, 482],
				[459, 488],
				[200, 494],
			],
		},
	],

	buildings: [
		// Press House — institutional landmark on Press Row
		{ id: 'press-house', type: 'landmark', points: [[322, 552], [394, 552], [394, 581], [322, 581]] },
		// The Archive — eastern institutional anchor
		{ id: 'the-archive', type: 'landmark', points: [[648, 486], [720, 486], [720, 528], [648, 528]] },
		// Anonymous block clusters filling the district fabric
		{ id: 'block-a', type: 'block', points: [[268, 424], [308, 424], [308, 444], [268, 444]] },
		{ id: 'block-b', type: 'block', points: [[266, 378], [306, 378], [306, 420], [266, 420]] },
		{ id: 'block-c', type: 'block', points: [[374, 426], [457, 426], [457, 445], [374, 445]] },
		{ id: 'block-d', type: 'block', points: [[406, 378], [456, 378], [456, 418], [406, 418]] },
		{ id: 'block-e', type: 'block', points: [[218, 553], [308, 553], [308, 585], [218, 585]] },
		{ id: 'block-f', type: 'block', points: [[564, 490], [638, 490], [638, 544], [564, 544]] },
		{ id: 'block-g', type: 'block', points: [[604, 416], [638, 416], [638, 486], [604, 486]] },
		{ id: 'block-h', type: 'block', points: [[534, 416], [600, 416], [600, 486], [534, 486]] },
		{ id: 'block-i', type: 'block', points: [[380, 294], [456, 294], [456, 322], [380, 322]] },
		{ id: 'block-j', type: 'block', points: [[276, 332], [368, 332], [368, 376], [276, 376]] },
		{ id: 'block-k', type: 'block', points: [[380, 447], [456, 447], [456, 488], [380, 488]] },
	],

	// Terrain contour lines.
	// Logic: elevated ground NW (institutional high quarter) → lower SE (editorial lowlands).
	// Contours bend around the built form — they compress near road corridors
	// and spread in the open voids between districts.
	contours: [
		[[0, 346], [200, 328], [420, 306], [720, 286], [1020, 276], [1200, 272]],
		[[0, 234], [260, 220], [560, 210], [920, 204], [1200, 201]],
		[[0, 148], [320, 140], [720, 134], [1200, 130]],
	],

	dispatchBuildings: DISPATCH_CLUSTER,
	dispatchCenter: DISPATCH_CENTER,

	// Water features — bayou/canal traces, expanded for the lower bayou zone.
	// Echoes the canal-path road logic and adds blue-tinted relief to the
	// otherwise warm sepia palette (matches sample 1's water motif).
	waterFeatures: [
		{
			id: 'canal-main',
			type: 'canal',
			width: 6,
			points: [
				[0, 690],
				[60, 678],
				[140, 666],
				[230, 660],
				[310, 658],
				[372, 660],
				[420, 668],
				[440, 690],
				[438, 730],
				[420, 770],
				[400, 800],
			],
		},
		{
			id: 'canal-branch',
			type: 'canal',
			width: 3.5,
			points: [
				[140, 666],
				[120, 700],
				[100, 740],
				[88, 780],
				[80, 800],
			],
		},
		{
			id: 'pond-sw',
			type: 'pond',
			points: [
				[18, 562],
				[64, 558],
				[92, 568],
				[100, 590],
				[88, 612],
				[58, 618],
				[24, 608],
				[10, 588],
			],
		},
		// Bayou — major water feature winding through lower city
		{
			id: 'bayou-main',
			type: 'canal',
			width: 9,
			points: [
				[1200, 1900],
				[1080, 1920],
				[960, 1965],
				[820, 2020],
				[680, 2090],
				[540, 2155],
				[400, 2200],
				[260, 2240],
				[120, 2260],
				[0, 2270],
			],
		},
		// Bayou tributary east
		{
			id: 'bayou-east',
			type: 'canal',
			width: 4.5,
			points: [
				[1200, 2350],
				[1060, 2380],
				[920, 2410],
				[800, 2430],
				[700, 2440],
			],
		},
		// Bayou inlet — pond/marsh in the SE
		{
			id: 'marsh-se',
			type: 'pond',
			points: [
				[940, 2510],
				[1080, 2495],
				[1180, 2515],
				[1200, 2560],
				[1160, 2600],
				[1080, 2620],
				[1000, 2615],
				[940, 2585],
				[920, 2550],
			],
		},
		// Northern pond — quarry water
		{
			id: 'quarry-pond',
			type: 'pond',
			points: [
				[90, 1280],
				[170, 1270],
				[230, 1290],
				[245, 1340],
				[225, 1380],
				[155, 1395],
				[95, 1380],
				[70, 1340],
			],
		},
	],

	// Compass rose — top-left corner, traditional cartographic placement
	compass: {
		center: [72, 78],
		radius: 36,
	},
}

/* ============================================================================
 * Interactive zones — hover/click regions positioned over the illustration.
 *
 * Bounds are in 1200×2800 map coordinates, aligned approximately with the
 * landmarks visible in 0-terra/cartography/district.jpg. They render as
 * transparent paths in the SVG; CSS hover styles + a React tooltip overlay
 * provide the interactive feel without obscuring the illustration.
 * ========================================================================== */

export const INTERACTIVE_ZONES: InteractiveZone[] = [
	{
		id: 'dispatch-hq',
		label: 'DISpatch HQ',
		description: 'Editorial District anchor — featured dispatches publish from here',
		href: '/article',
		bounds: [[420, 530], [615, 530], [615, 680], [420, 680]],
	},
	{
		id: 'press-house',
		label: 'Press House',
		description: 'Institutional press operations on Press Row',
		bounds: [[270, 700], [410, 700], [410, 790], [270, 790]],
	},
	{
		id: 'the-archive',
		label: 'The Archive',
		description: 'Eastern institutional anchor — lineage + records',
		bounds: [[650, 630], [810, 630], [810, 720], [650, 720]],
	},
	{
		id: 'editorial-district',
		label: 'The Editorial District',
		description: 'Founding district of Prime City — publishing quarter + civic core',
		bounds: [[150, 380], [880, 380], [880, 900], [150, 900]],
	},
]

// Convert point array to SVG path string
export function pointsToPath(points: Point[]): string {
	return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
}

// Convert point array to closed SVG path string (polygon)
export function pointsToPolygon(points: Point[]): string {
	return pointsToPath(points) + ' Z'
}

/* ============================================================================
 * Procedural generation — civic grammar at density.
 *
 * The authored arterials/collectors/landmarks above establish the civic
 * grammar. The procedural generators below fill in the urban fabric at
 * shipping density: ~80-100 building footprints, ~30 local streets, ~15
 * topographic contours. All deterministic (seeded), so map renders identically
 * every build.
 * ========================================================================== */

// Linear congruential generator — small, deterministic, no deps
function makeSeededRandom(seed: number) {
	let s = seed >>> 0
	return () => {
		s = (s * 1664525 + 1013904223) >>> 0
		return s / 4294967296
	}
}

// Distance from point to line segment — used to skip building cells near roads
function distanceToSegment(px: number, py: number, a: Point, b: Point): number {
	const dx = b[0] - a[0]
	const dy = b[1] - a[1]
	const lengthSq = dx * dx + dy * dy
	if (lengthSq === 0) return Math.hypot(px - a[0], py - a[1])
	let t = ((px - a[0]) * dx + (py - a[1]) * dy) / lengthSq
	t = Math.max(0, Math.min(1, t))
	return Math.hypot(px - (a[0] + t * dx), py - (a[1] + t * dy))
}

function distanceToRoads(x: number, y: number, roads: Road[]): number {
	let min = Infinity
	for (const road of roads) {
		for (let i = 0; i < road.points.length - 1; i++) {
			const d = distanceToSegment(x, y, road.points[i], road.points[i + 1])
			if (d < min) min = d
			if (min < 4) return min
		}
	}
	return min
}

// Procedural block footprints — sparser, with size tiers for visual variety.
// Per sample: buildings vary dramatically in size, not all packed densely.
// Skip rate ~78% gives ~30-45 buildings total instead of 100+. Three size
// tiers (small/med/large) match the architectural-drawing aesthetic.
function generateBuildings(
	roads: Road[],
	extent: { width: number; height: number },
	seed: number,
): BuildingFootprint[] {
	const rng = makeSeededRandom(seed)
	const buildings: BuildingFootprint[] = []

	const gridStep = 48 // sparser cell grid (was 30)
	const buffer = 11

	for (let cx = 60; cx < extent.width - 50; cx += gridStep) {
		for (let cy = 60; cy < extent.height - 50; cy += gridStep) {
			// 22% placement rate (skip 78% of cells) — much sparser composition
			if (rng() > 0.22) continue

			if (distanceToRoads(cx, cy, roads) < buffer) continue

			// Size tiers: 55% small, 32% medium, 13% large
			const sizeRoll = rng()
			let w: number, h: number
			if (sizeRoll < 0.55) {
				// Small block: 10-18 units
				w = 10 + rng() * 8
				h = 9 + rng() * 9
			} else if (sizeRoll < 0.87) {
				// Medium block: 18-32 units
				w = 18 + rng() * 14
				h = 16 + rng() * 14
			} else {
				// Large block: 32-52 units
				w = 32 + rng() * 20
				h = 28 + rng() * 22
			}

			const jx = (rng() - 0.5) * 6
			const jy = (rng() - 0.5) * 6

			const x = cx + jx - w / 2
			const y = cy + jy - h / 2

			buildings.push({
				id: `gen-blk-${Math.round(cx)}-${Math.round(cy)}`,
				type: 'block',
				points: [
					[x, y],
					[x + w, y],
					[x + w, y + h],
					[x, y + h],
				],
			})
		}
	}

	return buildings
}

// Procedural local street grid — fills between authored arterials/collectors
// with a denser network. Counts scale with extent height so density stays
// consistent across map sizes. Each street has slight jitter for hand-drawn feel.
function generateLocalStreets(extent: { width: number; height: number }, seed: number): Road[] {
	const rng = makeSeededRandom(seed)
	const streets: Road[] = []

	// Horizontal (E-W) — spacing ~55 units, count scales with height
	const hCount = Math.floor(extent.height / 55)
	for (let i = 0; i < hCount; i++) {
		const baseY = 60 + i * 55 + (rng() - 0.5) * 22
		if (baseY > extent.height - 40) continue
		const startX = 40 + rng() * 120
		const endX = extent.width - 40 - rng() * 120
		const segments = 7
		const points: Point[] = []
		for (let s = 0; s <= segments; s++) {
			const x = startX + (s / segments) * (endX - startX)
			points.push([x, baseY + (rng() - 0.5) * 4])
		}
		streets.push({ id: `gen-local-h-${i}`, class: 'local', points })
	}

	// Vertical (N-S) — spacing ~95 units across width
	const vCount = Math.floor(extent.width / 95)
	for (let i = 0; i < vCount; i++) {
		const baseX = 80 + i * 95 + (rng() - 0.5) * 30
		if (baseX > extent.width - 40) continue
		const startY = 50 + rng() * 100
		const endY = extent.height - 50 - rng() * 100
		const segments = Math.max(6, Math.floor(extent.height / 200))
		const points: Point[] = []
		for (let s = 0; s <= segments; s++) {
			const y = startY + (s / segments) * (endY - startY)
			points.push([baseX + (rng() - 0.5) * 4, y])
		}
		streets.push({ id: `gen-local-v-${i}`, class: 'local', points })
	}

	return streets
}

// Procedural topographic contours — diagonal lines following the NW-high → SE-low
// terrain gradient established in the spec. Wavy + jittered for hand-drawn quality.
function generateContours(extent: { width: number; height: number }, seed: number): Point[][] {
	const rng = makeSeededRandom(seed)
	const contours: Point[][] = []
	// Count scales with map height — denser contours = richer topography
	const count = Math.max(18, Math.floor(extent.height / 60))

	for (let i = 0; i < count; i++) {
		const t = i / count
		const baseY = -150 + t * (extent.height + 300)
		const segments = 14
		const points: Point[] = []
		for (let s = 0; s <= segments; s++) {
			const x = (s / segments) * extent.width
			// Diagonal tilt — contours rise toward NE, fall toward SW
			const tilt = (x / extent.width) * 80 - 40
			// Wave variation per contour line
			const wave = Math.sin(x * 0.0085 + i * 0.83) * (8 + rng() * 7)
			// Jitter for organic feel
			const jitter = (rng() - 0.5) * 5
			points.push([x, baseY + tilt + wave + jitter])
		}
		contours.push(points)
	}

	return contours.filter((c) => c.some((p) => p[1] >= -40 && p[1] <= extent.height + 40))
}

// Run procedural generation once at module load (deterministic seeds).
// These constants are exported alongside the authored data.
export const PROCEDURAL_BUILDINGS: BuildingFootprint[] = generateBuildings(
	PRIME_CITY_MAP.roads,
	{ width: PRIME_CITY_MAP.width, height: PRIME_CITY_MAP.height },
	0x4d15,
)

export const PROCEDURAL_LOCAL_STREETS: Road[] = generateLocalStreets(
	{ width: PRIME_CITY_MAP.width, height: PRIME_CITY_MAP.height },
	0x2c89,
)

export const PROCEDURAL_CONTOURS: Point[][] = generateContours(
	{ width: PRIME_CITY_MAP.width, height: PRIME_CITY_MAP.height },
	0x7f31,
)

/* ============================================================================
 * Snapshot SVG export — produces a standalone SVG string from PRIME_CITY_MAP.
 *
 * Used by /api/cartography.svg endpoint. The exported SVG has all CSS-token
 * references resolved to hex values (since standalone SVG has no CSS context).
 * Output is ready for:
 *   - Direct download / Illustrator / Figma import
 *   - Adobe Firefly / Midjourney image-to-image texturizing
 *   - Vectorizer.ai re-vectorization
 *   - Then dropped back into 0-terra/cartography/district.svg as the base layer
 * ========================================================================== */

// Dawn-cycle hex resolutions of the design tokens used in the snapshot.
const SNAPSHOT_COLORS = {
	skyLow: '#f4ede2',
	editorialInk: '#c66b3a',
	institutionalInk: '#4f5466',
	bodyStrong: '#2a2622',
	bodyFaint: '#7a7568',
	accentPrime: '#8e2532',
	accentPrimeActive: '#6b2520',
	vellum200: '#e9deca',
} as const

export function generateSnapshotSvg(): string {
	const map = PRIME_CITY_MAP
	const allLocalStreets = [
		...map.roads.filter((r) => r.class === 'local'),
		...PROCEDURAL_LOCAL_STREETS,
	]
	const allBuildings = [...map.buildings, ...PROCEDURAL_BUILDINGS]
	const allContours = [...map.contours, ...PROCEDURAL_CONTOURS]
	const c = SNAPSHOT_COLORS

	// Helper to render a polyline group
	const renderRoads = (roads: Road[], stroke: number, opacity: number) =>
		roads
			.map(
				(r) =>
					`<path d="${pointsToPath(r.points)}" stroke="${c.editorialInk}" stroke-width="${stroke}" stroke-opacity="${opacity}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
			)
			.join('')

	// Grid lines
	const verticalGrid: string[] = []
	const horizontalGrid: string[] = []
	for (let i = 1; i < map.width / map.gridSpacing; i++) {
		const x = i * map.gridSpacing
		verticalGrid.push(
			`<line x1="${x}" y1="0" x2="${x}" y2="${map.height}" stroke="${c.editorialInk}" stroke-width="0.4" opacity="0.18"/>`,
		)
	}
	for (let i = 1; i < map.height / map.gridSpacing; i++) {
		const y = i * map.gridSpacing
		horizontalGrid.push(
			`<line x1="0" y1="${y}" x2="${map.width}" y2="${y}" stroke="${c.editorialInk}" stroke-width="0.4" opacity="0.18"/>`,
		)
	}

	// District fills
	const districts = map.districts
		.map(
			(d) =>
				`<path d="${pointsToPolygon(d.points)}" fill="${c.editorialInk}" fill-opacity="0.05" stroke="none"/>`,
		)
		.join('')

	// Water features
	const water = map.waterFeatures
		.map((wf) => {
			if (wf.type === 'pond') {
				return `<path d="${pointsToPolygon(wf.points)}" fill="${c.institutionalInk}" fill-opacity="0.22" stroke="${c.institutionalInk}" stroke-width="0.5" stroke-opacity="0.45"/>`
			}
			const w = wf.width ?? 4
			return `<path d="${pointsToPath(wf.points)}" fill="none" stroke="${c.institutionalInk}" stroke-width="${w}" stroke-opacity="0.22" stroke-linecap="round" stroke-linejoin="round"/><path d="${pointsToPath(wf.points)}" fill="none" stroke="${c.institutionalInk}" stroke-width="${w * 0.45}" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>`
		})
		.join('')

	// Contours
	const contours = allContours
		.map(
			(pts) =>
				`<path d="${pointsToPath(pts)}" stroke="${c.editorialInk}" stroke-width="0.55" stroke-opacity="0.34" fill="none"/>`,
		)
		.join('')

	// Buildings
	const blocks = allBuildings
		.filter((b) => b.type === 'block')
		.map(
			(b) =>
				`<path d="${pointsToPolygon(b.points)}" fill="${c.editorialInk}" fill-opacity="0.12" stroke="${c.editorialInk}" stroke-width="0.55" stroke-opacity="0.62"/>`,
		)
		.join('')
	const landmarks = allBuildings
		.filter((b) => b.type === 'landmark')
		.map(
			(b) =>
				`<path d="${pointsToPolygon(b.points)}" fill="${c.editorialInk}" fill-opacity="0.18" stroke="${c.editorialInk}" stroke-width="0.95" stroke-opacity="0.82"/>`,
		)
		.join('')

	// DISpatch cluster (flat top faces for snapshot; AI pipeline texturizer
	// can add depth/shading post-export)
	const dispatchBuildings = map.dispatchBuildings
		.map(
			(b) =>
				`<path d="${pointsToPolygon(b.footprint)}" fill="${c.accentPrime}" fill-opacity="${b.primary ? 0.96 : 0.86}" stroke="${c.accentPrimeActive}" stroke-width="${b.primary ? 1.3 : 1.0}"/>`,
		)
		.join('')

	// Compass rose
	const cx = map.compass.center[0]
	const cy = map.compass.center[1]
	const r = map.compass.radius
	const compass = `
<g stroke="${c.editorialInk}" stroke-width="0.7" stroke-opacity="0.7" fill="none">
<circle cx="${cx}" cy="${cy}" r="${r}"/>
<circle cx="${cx}" cy="${cy}" r="${r * 0.65}" stroke-opacity="0.4"/>
<path d="M${cx},${cy - r * 0.92} L${cx - r * 0.18},${cy} L${cx},${cy + r * 0.92} L${cx + r * 0.18},${cy} Z" fill="${c.editorialInk}" fill-opacity="0.18"/>
<path d="M${cx - r * 0.92},${cy} L${cx},${cy - r * 0.18} L${cx + r * 0.92},${cy} L${cx},${cy + r * 0.18} Z" fill="${c.editorialInk}" fill-opacity="0.08"/>
<path d="M${cx},${cy - r * 0.92} L${cx - r * 0.1},${cy - r * 0.5} L${cx + r * 0.1},${cy - r * 0.5} Z" fill="${c.accentPrime}" fill-opacity="0.85" stroke="none"/>
</g>
<text x="${cx}" y="${cy - r - 4}" text-anchor="middle" font-size="6" font-weight="700" fill="${c.editorialInk}" opacity="0.8" font-family="monospace" letter-spacing="0.1em">N</text>`

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${map.width} ${map.height}" width="${map.width}" height="${map.height}">
<title>Prime City — Editorial District</title>
<desc>Authored civic geometry for DISpatch. Procedurally generated from prime-city-map.ts. Export-ready for AI texturizing pipelines (Firefly, Midjourney) and vectorizers.</desc>
<defs>
<filter id="grain" x="-5%" y="-5%" width="110%" height="110%">
<feTurbulence type="fractalNoise" baseFrequency="0.85 0.7" numOctaves="4" seed="17" result="noise"/>
<feColorMatrix type="saturate" values="0" in="noise" result="grey"/>
<feComposite in="grey" in2="SourceGraphic" operator="in" result="masked"/>
<feBlend in="SourceGraphic" in2="masked" mode="multiply"/>
</filter>
</defs>
<rect x="0" y="0" width="${map.width}" height="${map.height}" fill="${c.skyLow}"/>
<g id="districts">${districts}</g>
<g id="grid">${verticalGrid.join('')}${horizontalGrid.join('')}</g>
<g id="water">${water}</g>
<g id="contours">${contours}</g>
<g id="roads-local">${renderRoads(allLocalStreets, 0.7, 0.4)}</g>
<g id="roads-collector">${renderRoads(map.roads.filter((r) => r.class === 'collector'), 1.5, 0.6)}</g>
<g id="roads-arterial">${renderRoads(map.roads.filter((r) => r.class === 'arterial'), 2.6, 0.78)}</g>
<g id="blocks">${blocks}</g>
<g id="landmarks">${landmarks}</g>
<g id="dispatch-cluster">${dispatchBuildings}</g>
<g id="compass">${compass}</g>
<rect x="0" y="0" width="${map.width}" height="${map.height}" fill="${c.vellum200}" opacity="0.09" filter="url(#grain)"/>
</svg>`
}
