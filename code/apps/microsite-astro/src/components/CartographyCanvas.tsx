/**
 * CartographyCanvas — authored civic geometry renderer for Prime City.
 *
 * Visual target (per samples 2026-05-13): warm sepia ink on cream vellum,
 * organic curves not straight polylines, isometric building cross-hatching,
 * traditional compass rose top-left, water features in blue, dense road
 * grid with diagonal arterials, hand-drawn jitter throughout.
 *
 * Library role (per spec §Tool role doctrine):
 *   D3 (d3-shape)      — catmull-rom curve interpolation for organic roads
 *   MapLibre GL        — optional real-world base tiles (decorative substrate)
 *   SVG + filters      — the canonical authored civic truth layer + hand-drawn
 *                        jitter via feDisplacementMap
 *   forwarded ref      — parent components animate viewBox via GSAP for
 *                        scrollytelling reveal sequences
 *
 * Reduced-motion: SVG <animate> disabled via CSS media query in global.css.
 */

import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
	INTERACTIVE_ZONES,
	MAP_ZOOMS,
	PRIME_CITY_MAP,
	PROCEDURAL_BUILDINGS,
	PROCEDURAL_CONTOURS,
	PROCEDURAL_LOCAL_STREETS,
	pointsToPolygon,
	type InteractiveZone,
	type MapZoom,
	type Point,
} from '@/lib/prime-city-map'
import { GENERATED_ZONES } from '@/lib/generated-zones'

// Use auto-generated zones (from pnpm cartography:segment) when they exist;
// fall back to hand-coded INTERACTIVE_ZONES otherwise.
const ACTIVE_ZONES: InteractiveZone[] =
	GENERATED_ZONES.length > 0 ? GENERATED_ZONES : INTERACTIVE_ZONES

export type CartographyCanvasProps = {
	zoom?: MapZoom
	showMarker?: boolean
	mapboxToken?: string
	backgroundImage?: string
	/** Depth map (e.g. /cartography/district.depth.png from Depth Anything).
	 *  When provided, a second copy of backgroundImage is rendered with the
	 *  depth map as a CSS luminance mask; foreground (bright depth) pixels
	 *  parallax on scroll for a 3D feel. */
	depthImage?: string
	/** When backgroundImage is set, override the SVG viewBox aspect to match
	 *  the image (so marker + interactive zones land in the right visual spot).
	 *  Width stays 1200; height is computed as 1200 / imageAspect. */
	imageAspect?: number
	opacity?: number
	className?: string
	'aria-hidden'?: boolean
}

// Catmull-rom-to-bezier curve generator. Converts a polyline of points into
// a smooth SVG path using cubic Bezier segments. This replaces D3's
// curveCatmullRom with an inline implementation (zero deps, same math).
// Alpha 0.5 = centripetal catmull-rom (no overshoot, gentle curvature).
function smoothPath(points: Point[]): string {
	if (points.length === 0) return ''
	if (points.length === 1) return `M${points[0][0]},${points[0][1]}`
	if (points.length === 2) {
		return `M${points[0][0]},${points[0][1]} L${points[1][0]},${points[1][1]}`
	}

	let d = `M${points[0][0]},${points[0][1]}`
	for (let i = 0; i < points.length - 1; i++) {
		const p0 = points[i - 1] ?? points[i]
		const p1 = points[i]
		const p2 = points[i + 1]
		const p3 = points[i + 2] ?? p2

		// Catmull-rom → cubic bezier control points (alpha = 0.5 scaling)
		const cp1x = p1[0] + (p2[0] - p0[0]) / 6
		const cp1y = p1[1] + (p2[1] - p0[1]) / 6
		const cp2x = p2[0] - (p3[0] - p1[0]) / 6
		const cp2y = p2[1] - (p3[1] - p1[1]) / 6

		d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
	}
	return d
}

const HOUSTON_CENTER: [number, number] = [-95.3698, 29.7604]
const MAP_ZOOM_LEVELS: Record<MapZoom, number> = {
	district: 13,
	neighborhood: 16,
}

const mapboxStyleUrl = (token: string) =>
	`https://api.mapbox.com/styles/v1/mapbox/light-v11?access_token=${token}`

export const CartographyCanvas = forwardRef<SVGSVGElement, CartographyCanvasProps>(
	function CartographyCanvas(
		{
			zoom = 'district',
			showMarker = true,
			mapboxToken,
			backgroundImage,
			depthImage,
			imageAspect,
			opacity = 1,
			className,
			'aria-hidden': ariaHidden = true,
		},
		ref,
	) {
		const uid = useId().replace(/:/g, '')
		const mapContainerRef = useRef<HTMLDivElement>(null)
		const wrapperRef = useRef<HTMLDivElement>(null)
		const depthLayerRef = useRef<HTMLDivElement>(null)
		const [hoveredZone, setHoveredZone] = useState<InteractiveZone | null>(null)
		const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
		const map = PRIME_CITY_MAP
		// When an image is supplied with a custom aspect, override the viewBox
		// so SVG coords land in the right visual position over the illustration.
		// Width stays 1200; height = 1200 / imageAspect.
		const initialViewBox =
			backgroundImage && imageAspect
				? `0 0 ${map.width} ${Math.round(map.width / imageAspect)}`
				: MAP_ZOOMS[zoom]

		const drawnFilterId = `drawn-${uid}`
		const drawnHeavyId = `drawn-heavy-${uid}`
		const grainFilterId = `grain-${uid}`
		const dropShadowId = `shadow-${uid}`
		const hatchPatternId = `hatch-${uid}`
		const markerGlowId = `marker-glow-${uid}`
		const compassClipId = `compass-clip-${uid}`

		const STROKE = {
			arterial: { width: 2.6, opacity: 0.78 },
			collector: { width: 1.55, opacity: 0.6 },
			local: { width: 0.75, opacity: 0.4 },
		}

		const allLocalStreets = [
			...map.roads.filter((r) => r.class === 'local'),
			...PROCEDURAL_LOCAL_STREETS,
		]
		const allBuildings = [...map.buildings, ...PROCEDURAL_BUILDINGS]
		const allContours = [...map.contours, ...PROCEDURAL_CONTOURS]

		// Depth-driven parallax — translates the foreground (depth-masked) image
		// copy upward as the user scrolls. The depth layer's transform is updated
		// via rAF for smooth 60fps, no React re-renders needed.
		useEffect(() => {
			if (!depthImage || !depthLayerRef.current || !wrapperRef.current) return
			let raf = 0
			let lastY = -1
			const update = () => {
				if (!depthLayerRef.current || !wrapperRef.current) return
				const rect = wrapperRef.current.getBoundingClientRect()
				// progress: 0 when wrapper top hits viewport top, 1 when bottom hits
				const viewportH = window.innerHeight
				const progress = -rect.top / (rect.height - viewportH || 1)
				const clamped = Math.max(0, Math.min(1, progress))
				// Parallax range: -40px (start) → 40px (end). Foreground rises slowly.
				const offset = (clamped - 0.5) * -80
				if (Math.round(offset) !== lastY) {
					lastY = Math.round(offset)
					depthLayerRef.current.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.03)`
				}
				raf = requestAnimationFrame(update)
			}
			raf = requestAnimationFrame(update)
			return () => cancelAnimationFrame(raf)
		}, [depthImage])

		useEffect(() => {
			if (!mapboxToken || !mapContainerRef.current) return
			let mapInstance: import('maplibre-gl').Map | null = null

			import('maplibre-gl').then(({ Map }) => {
				if (!mapContainerRef.current) return
				mapInstance = new Map({
					container: mapContainerRef.current,
					style: mapboxStyleUrl(mapboxToken),
					center: HOUSTON_CENTER,
					zoom: MAP_ZOOM_LEVELS[zoom],
					interactive: false,
					attributionControl: { compact: true },
				})

				mapInstance.on('load', () => {
					if (!mapInstance) return
					const style = mapInstance.getStyle()
					style.layers.forEach((layer) => {
						if (layer.type === 'symbol') {
							mapInstance!.setLayoutProperty(layer.id, 'visibility', 'none')
						}
					})
				})
			})

			return () => {
				mapInstance?.remove()
			}
		}, [mapboxToken, zoom])

		// Compass rose points (rotated diamond shapes)
		const compass = map.compass
		const compassPoints = (size: number) => {
			const c = compass.center
			return {
				n: `${c[0]},${c[1] - size}`,
				e: `${c[0] + size},${c[1]}`,
				s: `${c[0]},${c[1] + size}`,
				w: `${c[0] - size},${c[1]}`,
				ne: `${c[0] + size * 0.35},${c[1] - size * 0.35}`,
				se: `${c[0] + size * 0.35},${c[1] + size * 0.35}`,
				sw: `${c[0] - size * 0.35},${c[1] + size * 0.35}`,
				nw: `${c[0] - size * 0.35},${c[1] - size * 0.35}`,
			}
		}

		const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!wrapperRef.current) return
			const rect = wrapperRef.current.getBoundingClientRect()
			setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
		}

		return (
			<div
				ref={wrapperRef}
				className={className}
				aria-hidden={ariaHidden}
				onMouseMove={handleMouseMove}
				onMouseLeave={() => setHoveredZone(null)}
				style={{ position: 'relative', width: '100%', height: '100%' }}
			>
				{/* MapLibre real-world base tiles — desaturated, low opacity */}
				<div
					ref={mapContainerRef}
					style={{
						position: 'absolute',
						inset: 0,
						opacity: mapboxToken ? 0.18 : 0,
						filter: 'saturate(0.3) sepia(0.35) brightness(1.05)',
					}}
				/>

				{/* Optional commissioned illustration base.
				    backgroundSize: 100% auto = fill width, preserve natural aspect.
				    Image sits at the top of the tall container; below it the page
				    background (sky-low) shows through. Square-ish illustrations
				    cover the upper third of the map; the rest is cream paper. */}
				{backgroundImage && (
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundImage: `url(${backgroundImage})`,
							backgroundSize: '100% auto',
							backgroundPosition: 'top center',
							backgroundRepeat: 'no-repeat',
							opacity: 1,
						}}
					/>
				)}

				{/* Depth-driven parallax layer.
				    A second copy of the illustration, masked by district.depth.png
				    (white = foreground, black = background). Bright depth pixels —
				    the buildings — show through; dark pixels (water, distance) are
				    masked out. The whole layer translates vertically with scroll
				    (managed via rAF in the useEffect above) so foreground buildings
				    appear to lift away from the static base layer below.
				    Slight scale(1.03) ensures the parallax doesn't reveal edges. */}
				{backgroundImage && depthImage && (
					<div
						ref={depthLayerRef}
						aria-hidden="true"
						style={{
							position: 'absolute',
							inset: 0,
							backgroundImage: `url(${backgroundImage})`,
							backgroundSize: '100% auto',
							backgroundPosition: 'top center',
							backgroundRepeat: 'no-repeat',
							// CSS mask — depth.png luminance drives visibility
							WebkitMaskImage: `url(${depthImage})`,
							maskImage: `url(${depthImage})`,
							WebkitMaskSize: '100% auto',
							maskSize: '100% auto',
							WebkitMaskPosition: 'top center',
							maskPosition: 'top center',
							WebkitMaskRepeat: 'no-repeat',
							maskRepeat: 'no-repeat',
							maskMode: 'luminance',
							// Initial transform — updated via rAF on scroll
							transform: 'translate3d(0, 0, 0) scale(1.03)',
							willChange: 'transform',
							pointerEvents: 'none',
							// Subtle highlight on foreground to enhance depth feel
							filter: 'brightness(1.04) contrast(1.02)',
						}}
					/>
				)}

				{/* SVG civic geometry */}
				<svg
					ref={ref}
					viewBox={initialViewBox}
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid slice"
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						opacity,
						display: 'block',
						pointerEvents: 'none',
					}}
				>
					<defs>
						{/* Hand-drawn jitter — feDisplacementMap on low-frequency noise.
						    Scale 1.4 = subtle wobble for roads + contours. */}
						<filter id={drawnFilterId} x="-2%" y="-2%" width="104%" height="104%">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.025"
								numOctaves="2"
								seed="9"
								result="turbulence"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="turbulence"
								scale="1.4"
								xChannelSelector="R"
								yChannelSelector="G"
							/>
						</filter>

						{/* Stronger hand-drawn for contours — feels more weathered */}
						<filter id={drawnHeavyId} x="-3%" y="-3%" width="106%" height="106%">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.018"
								numOctaves="3"
								seed="23"
								result="turbulence"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="turbulence"
								scale="2.2"
								xChannelSelector="R"
								yChannelSelector="G"
							/>
						</filter>

						{/* Paper grain — multi-octave fractal noise, slow drift */}
						<filter id={grainFilterId} x="-5%" y="-5%" width="110%" height="110%">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.85 0.7"
								numOctaves="4"
								seed="17"
								result="noise"
							>
								<animate
									attributeName="baseFrequency"
									values="0.85 0.7;0.865 0.715;0.85 0.7"
									dur="60s"
									repeatCount="indefinite"
								/>
							</feTurbulence>
							<feColorMatrix type="saturate" values="0" in="noise" result="grey" />
							<feComposite in="grey" in2="SourceGraphic" operator="in" result="masked" />
							<feBlend in="SourceGraphic" in2="masked" mode="multiply" />
						</filter>

						{/* Soft drop shadow for landmark buildings */}
						<filter id={dropShadowId} x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur in="SourceAlpha" stdDeviation="0.9" />
							<feOffset dx="0.7" dy="1.0" result="offsetBlur" />
							<feComponentTransfer>
								<feFuncA type="linear" slope="0.4" />
							</feComponentTransfer>
							<feMerge>
								<feMergeNode />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>

						{/* Cross-hatch pattern — architectural drawing fill */}
						<pattern
							id={hatchPatternId}
							x="0"
							y="0"
							width="3.5"
							height="3.5"
							patternUnits="userSpaceOnUse"
							patternTransform="rotate(45)"
						>
							<line
								x1="0"
								y1="0"
								x2="0"
								y2="3.5"
								stroke="var(--dispatch-lane-editorial-strong)"
								strokeWidth="0.55"
								opacity="0.5"
							/>
						</pattern>

						{/* Marker glow gradient */}
						<radialGradient id={markerGlowId} cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="var(--platform-accent-prime)" stopOpacity="0.28" />
							<stop offset="100%" stopColor="var(--platform-accent-prime)" stopOpacity="0" />
						</radialGradient>

						<clipPath id={compassClipId}>
							<circle cx={compass.center[0]} cy={compass.center[1]} r={compass.radius} />
						</clipPath>
					</defs>

					{/* Vellum substrate — only when no MapLibre/image base layer */}
					{!mapboxToken && !backgroundImage && (
						<rect
							x="0"
							y="0"
							width={map.width}
							height={map.height}
							fill="var(--sky-low)"
						/>
					)}

					{/* All SVG cartography is suppressed when a backgroundImage is
					    present — the illustration carries the cartography truth.
					    Only the live marker pulse + paper grain remain (below). */}
					{!backgroundImage && <>
					{/* District base fills — subtle warm wash */}
					<g opacity="0.05">
						{map.districts.map((d) => (
							<path
								key={d.id}
								d={pointsToPolygon(d.points)}
								fill="var(--dispatch-lane-editorial-strong)"
								stroke="none"
							/>
						))}
					</g>

					{/* Orthogonal civic grid — visible at gridSpacing intervals.
					    The grid IS the city's bones; buildings sit on its intersections.
					    Drawn behind roads + buildings but above district fills. */}
					<g
						stroke="var(--dispatch-lane-editorial-strong)"
						strokeWidth="0.4"
						opacity="0.18"
					>
						{Array.from({ length: Math.floor(map.width / map.gridSpacing) }, (_, i) => {
							const x = (i + 1) * map.gridSpacing
							return (
								<line
									key={`grid-v-${i}`}
									x1={x}
									y1={0}
									x2={x}
									y2={map.height}
								/>
							)
						})}
						{Array.from({ length: Math.floor(map.height / map.gridSpacing) }, (_, i) => {
							const y = (i + 1) * map.gridSpacing
							return (
								<line
									key={`grid-h-${i}`}
									x1={0}
									y1={y}
									x2={map.width}
									y2={y}
								/>
							)
						})}
					</g>

					{/* Water features — blue tint, organic curves */}
					<g>
						{map.waterFeatures.map((wf) => {
							if (wf.type === 'pond') {
								return (
									<path
										key={wf.id}
										d={pointsToPolygon(wf.points)}
										fill="var(--dispatch-lane-institutional-strong)"
										fillOpacity="0.22"
										stroke="var(--dispatch-lane-institutional-strong)"
										strokeWidth="0.5"
										strokeOpacity="0.45"
									/>
								)
							}
							return (
								<g key={wf.id}>
									<path
										d={smoothPath(wf.points)}
										fill="none"
										stroke="var(--dispatch-lane-institutional-strong)"
										strokeWidth={wf.width ?? 4}
										strokeOpacity="0.22"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d={smoothPath(wf.points)}
										fill="none"
										stroke="var(--dispatch-lane-institutional-strong)"
										strokeWidth={(wf.width ?? 4) * 0.45}
										strokeOpacity="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
							)
						})}
					</g>

					{/* Topographic contours — heavy hand-drawn filter, organic curves */}
					<g
						filter={`url(#${drawnHeavyId})`}
						stroke="var(--dispatch-lane-editorial-strong)"
						strokeWidth="0.55"
						fill="none"
						opacity="0.34"
					>
						{allContours.map((points, i) => (
							<path key={`contour-${i}`} d={smoothPath(points)} />
						))}
					</g>

					{/* Road network: local → collector → arterial.
					    All wrapped in hand-drawn filter + catmull-rom curves. */}
					<g filter={`url(#${drawnFilterId})`}>
						{/* Local streets — finest stroke */}
						<g
							stroke="var(--dispatch-lane-editorial-strong)"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							{allLocalStreets.map((r) => (
								<path
									key={r.id}
									d={smoothPath(r.points)}
									strokeWidth={STROKE.local.width}
									opacity={STROKE.local.opacity}
								/>
							))}
						</g>

						{/* Collectors */}
						<g
							stroke="var(--dispatch-lane-editorial-strong)"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							{map.roads
								.filter((r) => r.class === 'collector')
								.map((r) => (
									<path
										key={r.id}
										d={smoothPath(r.points)}
										strokeWidth={STROKE.collector.width}
										opacity={STROKE.collector.opacity}
									/>
								))}
						</g>

						{/* Arterials — bold founding axes */}
						<g
							stroke="var(--dispatch-lane-editorial-strong)"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							{map.roads
								.filter((r) => r.class === 'arterial')
								.map((r) => (
									<path
										key={r.id}
										d={smoothPath(r.points)}
										strokeWidth={STROKE.arterial.width}
										opacity={STROKE.arterial.opacity}
									/>
								))}
						</g>
					</g>

					{/* Buildings — each gets a ground shadow + cross-hatched footprint.
					    The shadow is an offset polygon below the building, giving
					    visible depth like the sample's architectural-drawing feel. */}
					<g>
						{/* Block shadows — pass 1 */}
						<g opacity="0.18">
							{allBuildings
								.filter((b) => b.type === 'block')
								.map((b) => (
									<path
										key={`${b.id}-shadow`}
										d={pointsToPolygon(
											b.points.map((p) => [p[0] + 1.2, p[1] + 1.6] as Point),
										)}
										fill="var(--platform-text-body-strong)"
										stroke="none"
									/>
								))}
						</g>
						{/* Block footprints — pass 2 */}
						{allBuildings
							.filter((b) => b.type === 'block')
							.map((b) => (
								<path
									key={b.id}
									d={pointsToPolygon(b.points)}
									fill={`url(#${hatchPatternId})`}
									stroke="var(--dispatch-lane-editorial-strong)"
									strokeWidth="0.6"
									strokeOpacity="0.7"
								/>
							))}

						{/* Landmarks — heavier stroke, dropShadow filter */}
						<g filter={`url(#${dropShadowId})`}>
							{allBuildings
								.filter((b) => b.type === 'landmark')
								.map((b) => (
									<path
										key={b.id}
										d={pointsToPolygon(b.points)}
										fill={`url(#${hatchPatternId})`}
										stroke="var(--dispatch-lane-editorial-strong)"
										strokeWidth="1.0"
										strokeOpacity="0.88"
									/>
								))}
						</g>
					</g>

					{/* DISpatch building cluster — isometric extrusion for 3D effect.
					    Per sample: red buildings visibly lift off the page with
					    side faces and shadows. Each building gets:
					      1. Shadow polygon offset down-right (low opacity dark)
					      2. Side face polygon (darker red, slightly offset)
					      3. Top face (the canonical footprint at full red)
					    The "height" is ~5-6 units in the SE direction (45° offset). */}
					<g>
						{/* Pass 1: ground shadows */}
						{map.dispatchBuildings.map((b) => (
							<path
								key={`${b.id}-shadow`}
								d={pointsToPolygon(
									b.footprint.map((p) => [p[0] + 4, p[1] + 5] as Point),
								)}
								fill="var(--platform-text-body-strong)"
								opacity="0.32"
								stroke="none"
							/>
						))}
						{/* Pass 2: side face — connects rear footprint to front via
						    quadrilateral. Drawn for east + south faces of each building. */}
						{map.dispatchBuildings.map((b) => {
							const offset = b.primary ? 6 : 4
							// b.footprint is [TL, TR, BR, BL] (clockwise from top-left)
							const [tl, tr, br, bl] = b.footprint
							// East face: front edge (br→tr) connects to offset rear edge
							const eastFace: Point[] = [
								tr,
								[tr[0] + offset, tr[1] - offset * 0.5],
								[br[0] + offset, br[1] - offset * 0.5],
								br,
							]
							// South face: front edge (bl→br) connects to offset rear edge
							const southFace: Point[] = [
								bl,
								br,
								[br[0] + offset, br[1] - offset * 0.5],
								[bl[0] + offset, bl[1] - offset * 0.5],
							]
							return (
								<g key={`${b.id}-faces`}>
									<path
										d={pointsToPolygon(eastFace)}
										fill="var(--platform-accent-prime-active)"
										fillOpacity="0.82"
										stroke="var(--platform-accent-prime-active)"
										strokeWidth="0.5"
										strokeOpacity="0.9"
									/>
									<path
										d={pointsToPolygon(southFace)}
										fill="var(--platform-accent-prime-active)"
										fillOpacity="0.66"
										stroke="var(--platform-accent-prime-active)"
										strokeWidth="0.5"
										strokeOpacity="0.85"
									/>
								</g>
							)
						})}
						{/* Pass 3: top faces — the visible roofs */}
						{map.dispatchBuildings.map((b) => (
							<path
								key={b.id}
								d={pointsToPolygon(b.footprint)}
								fill="var(--platform-accent-prime)"
								fillOpacity={b.primary ? 0.98 : 0.92}
								stroke="var(--platform-accent-prime-active)"
								strokeWidth={b.primary ? 1.3 : 1.0}
								strokeOpacity="1"
							/>
						))}
					</g>

					{/* Surveyor annotations — small dots + leader ticks scattered
					    around the DISpatch cluster and other landmarks. Mimics the
					    sample's notation marks. Suppressed when illustration is base. */}
					<g
						stroke="var(--platform-accent-prime)"
						fill="var(--platform-accent-prime)"
						opacity="0.55"
					>
						{/* Dots near DISpatch cluster */}
						<circle cx={map.dispatchCenter[0] - 60} cy={map.dispatchCenter[1] - 30} r="0.9" />
						<circle cx={map.dispatchCenter[0] + 88} cy={map.dispatchCenter[1] + 12} r="0.7" />
						<circle cx={map.dispatchCenter[0] - 40} cy={map.dispatchCenter[1] + 80} r="0.8" />
						<circle cx={map.dispatchCenter[0] + 110} cy={map.dispatchCenter[1] - 60} r="0.6" />
						<circle cx={map.dispatchCenter[0] + 30} cy={map.dispatchCenter[1] - 95} r="0.7" />
						{/* Scattered dots across map for texture */}
						<circle cx={290} cy={1450} r="0.8" opacity="0.5" />
						<circle cx={780} cy={1620} r="0.7" opacity="0.45" />
						<circle cx={420} cy={2100} r="0.9" opacity="0.5" />
						<circle cx={920} cy={2380} r="0.7" opacity="0.4" />
						<circle cx={180} cy={950} r="0.6" opacity="0.45" />
						<circle cx={1060} cy={1780} r="0.7" opacity="0.4" />
					</g>

					{/* Leader ticks — short thin lines extending from key buildings. */}
					<g
						stroke="var(--platform-accent-prime)"
						strokeWidth="0.35"
						opacity="0.5"
						strokeLinecap="round"
					>
						<line
							x1={map.dispatchCenter[0] - 80}
							y1={map.dispatchCenter[1] - 80}
							x2={map.dispatchCenter[0] - 50}
							y2={map.dispatchCenter[1] - 35}
						/>
						<line
							x1={map.dispatchCenter[0] + 110}
							y1={map.dispatchCenter[1] + 50}
							x2={map.dispatchCenter[0] + 75}
							y2={map.dispatchCenter[1] + 20}
						/>
					</g>

					</>}
					{/* ── End of suppressed-when-image cartography ─────────────── */}

					{/* DISpatch marker pulse — centered on the cluster.
					    Renders ALWAYS, even over the illustration, since it's the
					    live editorial signal pointing at the DISpatch HQ building. */}
					{showMarker && (
						<g>
							<circle
								cx={map.dispatchCenter[0]}
								cy={map.dispatchCenter[1]}
								r="46"
								fill={`url(#${markerGlowId})`}
							/>
							<circle
								cx={map.dispatchCenter[0]}
								cy={map.dispatchCenter[1]}
								r="18"
								fill="none"
								stroke="var(--platform-accent-prime)"
								strokeWidth="1.3"
								opacity="0.55"
							>
								<animate
									attributeName="r"
									values="18;38;18"
									dur="3.8s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="opacity"
									values="0.55;0;0.55"
									dur="3.8s"
									repeatCount="indefinite"
								/>
							</circle>
							<circle
								cx={map.dispatchCenter[0]}
								cy={map.dispatchCenter[1]}
								r="12"
								fill="none"
								stroke="var(--platform-accent-prime)"
								strokeWidth="1.4"
								opacity="0.5"
							>
								<animate
									attributeName="opacity"
									values="0.5;0.82;0.5"
									dur="5.2s"
									repeatCount="indefinite"
								/>
							</circle>
						</g>
					)}

					{/* Compass rose — suppressed when an illustration is present
					    (illustrations typically have their own compass or don't need one). */}
					{!backgroundImage && (
						<>
							<g
								stroke="var(--dispatch-lane-editorial-strong)"
								strokeWidth="0.7"
								strokeOpacity="0.7"
								fill="none"
							>
								<circle cx={compass.center[0]} cy={compass.center[1]} r={compass.radius} />
								<circle
									cx={compass.center[0]}
									cy={compass.center[1]}
									r={compass.radius * 0.65}
									strokeOpacity="0.4"
								/>
								<path
									d={`M${compass.center[0]},${compass.center[1] - compass.radius * 0.92} L${compass.center[0] - compass.radius * 0.18},${compass.center[1]} L${compass.center[0]},${compass.center[1] + compass.radius * 0.92} L${compass.center[0] + compass.radius * 0.18},${compass.center[1]} Z`}
									fill="var(--dispatch-lane-editorial-strong)"
									fillOpacity="0.18"
								/>
								<path
									d={`M${compass.center[0] - compass.radius * 0.92},${compass.center[1]} L${compass.center[0]},${compass.center[1] - compass.radius * 0.18} L${compass.center[0] + compass.radius * 0.92},${compass.center[1]} L${compass.center[0]},${compass.center[1] + compass.radius * 0.18} Z`}
									fillOpacity="0.08"
									fill="var(--dispatch-lane-editorial-strong)"
								/>
								<path
									d={`M${compass.center[0]},${compass.center[1] - compass.radius * 0.92} L${compass.center[0] - compass.radius * 0.1},${compass.center[1] - compass.radius * 0.5} L${compass.center[0] + compass.radius * 0.1},${compass.center[1] - compass.radius * 0.5} Z`}
									fill="var(--platform-accent-prime)"
									fillOpacity="0.85"
									stroke="none"
								/>
							</g>
							<text
								x={compass.center[0]}
								y={compass.center[1] - compass.radius - 4}
								textAnchor="middle"
								fontSize="6"
								fontWeight="700"
								fill="var(--dispatch-lane-editorial-strong)"
								opacity="0.8"
								style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
							>
								N
							</text>
						</>
					)}

					{/* Paper grain overlay — strengthened */}
					<rect
						x="0"
						y="0"
						width={map.width}
						height={map.height}
						fill="var(--dispatch-vellum-200)"
						opacity="0.09"
						filter={`url(#${grainFilterId})`}
					/>

					{/* ── Interactive hot zones — top of stack, pointer-events enabled.
					    Transparent paths that respond to hover (subtle accent fill +
					    stroke) and optional click (navigate via <a>). Aligned with
					    landmarks in the illustration. */}
					<g style={{ pointerEvents: 'auto' }} className="cartography-zones">
						{ACTIVE_ZONES.map((zone) => {
							const path = pointsToPolygon(zone.bounds)
							const isHovered = hoveredZone?.id === zone.id
							const inner = (
								<path
									d={path}
									fill="var(--platform-accent-prime)"
									fillOpacity={isHovered ? 0.14 : 0}
									stroke="var(--platform-accent-prime)"
									strokeWidth={isHovered ? 1.4 : 0}
									strokeOpacity={isHovered ? 0.7 : 0}
									strokeDasharray="6 4"
									style={{
										transition:
											'fill-opacity 200ms ease-out, stroke-opacity 200ms ease-out, stroke-width 200ms ease-out',
										cursor: zone.href ? 'pointer' : 'help',
									}}
									onMouseEnter={() => setHoveredZone(zone)}
									onFocus={() => setHoveredZone(zone)}
									tabIndex={zone.href ? 0 : -1}
									role={zone.href ? 'link' : 'img'}
									aria-label={`${zone.label} — ${zone.description}`}
								/>
							)
							return zone.href ? (
								<a key={zone.id} href={zone.href}>
									{inner}
								</a>
							) : (
								<g key={zone.id}>{inner}</g>
							)
						})}
					</g>
				</svg>

				{/* HTML tooltip overlay — positioned at mouse cursor. Floats above
				    the SVG, follows pointer, fades on hover state change. */}
				<AnimatePresence>
					{hoveredZone && (
						<motion.div
							key={hoveredZone.id}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 8 }}
							transition={{ duration: 0.18, ease: 'easeOut' }}
							className="pointer-events-none absolute z-30 max-w-xs rounded-md border border-accent-prime/35 bg-window-warm/95 px-3 py-2 shadow-lg shadow-lane-institutional-strong/20 backdrop-blur-sm"
							style={{
								left: `${tooltipPos.x + 18}px`,
								top: `${tooltipPos.y + 18}px`,
							}}
						>
							<p className="font-nav text-[12px] font-extrabold uppercase tracking-[0.12em] text-accent-prime">
								{hoveredZone.label}
							</p>
							<p className="mt-1 font-body text-[12px] leading-snug text-body-strong">
								{hoveredZone.description}
							</p>
							{hoveredZone.href && (
								<p className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-body-faint">
									Click to read →
								</p>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		)
	},
)
