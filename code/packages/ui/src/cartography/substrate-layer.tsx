import type { ReactElement } from "react";

/**
 * Z-order 1+2 substrate per FORMULA §5 layer architecture.
 *
 * Two atmospheric primitives composed:
 *   1. Paper-grain texture via SVG `feTurbulence` filter — server-renderable
 *      noise with octaves-tuned register (matches the visual character of
 *      P5 perlin noise but doesn't require client-side canvas)
 *   2. Contour-warm radial gradient — focuses attention on active region
 *      (magazine-corner anchor for editorial surfaces)
 *
 * P5 procgen is reserved for runtime-only layers (Inferno marker pulse;
 * ambient flicker — per CD3 §1.3 Layer 4 motion-coupling).
 *
 * Tokens consumed via CSS custom properties; ROOF-floor wires the tokens.
 */
export function SubstrateLayer({
  focusX = 1100,
  focusY = 380,
  focusRadius = 320,
}: {
  focusX?: number;
  focusY?: number;
  focusRadius?: number;
}): ReactElement {
  return (
    <g className="prime-cartography__substrate" aria-hidden="true">
      <defs>
        <filter id="prime-paper-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={3}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.42  0 0 0 0 0.36  0 0 0 0 0.28  0 0 0 0.07 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <radialGradient
          id="prime-contour-warm"
          cx={focusX}
          cy={focusY}
          r={focusRadius}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--window-warm, #e7dec9)" stopOpacity="0.42" />
          <stop offset="55%" stopColor="var(--reflect, #efe9da)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--sky-low, #f4f0e6)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        x={0}
        y={0}
        width={1440}
        height={900}
        fill="var(--sky-low, #f4f0e6)"
      />
      <rect
        x={0}
        y={0}
        width={1440}
        height={900}
        fill="url(#prime-contour-warm)"
      />
      <rect
        x={0}
        y={0}
        width={1440}
        height={900}
        fill="var(--sky-high, #fcfaf4)"
        filter="url(#prime-paper-grain)"
        opacity={0.85}
      />
    </g>
  );
}
