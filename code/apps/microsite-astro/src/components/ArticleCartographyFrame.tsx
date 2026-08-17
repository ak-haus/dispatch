/**
 * ArticleCartographyFrame — article-page atmospheric backdrop.
 *
 * Renders the SAME hero cartographic illustration as the homepage cover,
 * faded behind the article reading surface. Replaces the previous
 * procedural SVG variant (which drew interactive district zones with
 * popovers). Per locked spec 2026-05-13:
 *
 *   "Replace the faded svg map in the 5th picture with new hero map
 *    faded behind and remove the district popover."
 *
 * Design:
 *   - district.mp4 plays muted/looped in the background (same source as
 *     the homepage hero), rotated -90deg so the portrait frame fills
 *     a landscape viewport.
 *   - A radial vellum wash concentrates over the reading column so body
 *     copy stays on a clean cream substrate; the EDGES of the viewport
 *     show the map at full strength.
 *   - Fixed-position, full-page; persists during scroll.
 *   - No interactive zones, no popovers, no JS scroll handler.
 *
 * Reduced motion: the video element honors the `playsInline + autoplay`
 * attributes; browsers in prefers-reduced-motion mode will pause it
 * automatically per OS-level user-agent policy.
 */

export type ArticleCartographyFrameProps = {
	/** Optional override — defaults to /cartography/district.mp4 (poster: district.webp) */
	videoSrc?: string
	/** Poster image while the video loads (and fallback for no-video UAs). */
	posterSrc?: string
	/** Override opacity of the video layer. Default 0.32. */
	opacity?: number
	className?: string
}

export function ArticleCartographyFrame({
	videoSrc = '/cartography/district.mp4',
	posterSrc = '/cartography/district.webp',
	opacity = 0.32,
	className,
}: ArticleCartographyFrameProps) {
	return (
		<div
			aria-hidden="true"
			className={['pointer-events-none', className ?? ''].filter(Boolean).join(' ')}
			style={{ position: 'fixed', inset: 0, zIndex: 0 }}
		>
			{/* Video layer — rotated portrait illustration covering the viewport */}
			<video
				src={videoSrc}
				autoPlay
				muted
				loop
				playsInline
				poster={posterSrc}
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					minHeight: '220vmax',
					minWidth: '220vmax',
					height: 'auto',
					width: 'auto',
					transform: 'translate(-50%, -50%) rotate(-90deg) scale(1.4)',
					opacity,
					filter: 'saturate(0.85) contrast(1.0)',
				}}
			/>
			{/* Reading-column wash — concentrates vellum over the center 60ch
			    so body copy reads on a clean substrate; edges stay visible. */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(48% 60% at 50% 45%, color-mix(in oklch, var(--sky-low) 92%, transparent) 0%, color-mix(in oklch, var(--sky-low) 70%, transparent) 60%, color-mix(in oklch, var(--sky-low) 20%, transparent) 100%)',
				}}
			/>
		</div>
	)
}
