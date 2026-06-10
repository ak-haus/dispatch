/**
 * GET /api/cartography.svg
 *
 * Returns the live procedural Prime City cartography as a standalone SVG file.
 * Use this as the entry point to the raster-to-vector AI pipeline:
 *
 *   1. curl http://localhost:4321/api/cartography.svg > base.svg
 *      (or open in browser and save)
 *   2. Convert to PNG via Illustrator / online converter / `rsvg-convert`
 *   3. Send through Adobe Firefly / Midjourney image-to-image with a style prompt
 *      ("rough ink sketch on aged parchment, hand-drawn cartography, sepia")
 *   4. Pass the AI output through Vectorizer.ai (or keep raster)
 *   5. Save the result to 0-terra/cartography/district.{svg,webp,png}
 *   6. Reload the page — Astro probe picks it up automatically as the base layer
 *
 * Query params:
 *   ?download=1  → forces Content-Disposition: attachment (else renders inline)
 */

import type { APIRoute } from 'astro'
import { generateSnapshotSvg } from '@/lib/prime-city-map'

export const GET: APIRoute = ({ url }) => {
	const svg = generateSnapshotSvg()
	const forceDownload = url.searchParams.get('download') === '1'

	const headers: Record<string, string> = {
		'Content-Type': 'image/svg+xml; charset=utf-8',
		'Cache-Control': 'no-store',
	}
	if (forceDownload) {
		headers['Content-Disposition'] = 'attachment; filename="prime-city-cartography.svg"'
	}

	return new Response(svg, { status: 200, headers })
}
