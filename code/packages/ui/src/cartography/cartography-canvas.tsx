import { useId, type ReactElement } from "react";
import { clsx } from "clsx";
import {
  SURFACE_TO_DIAL,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  type CartographyCanvasProps,
  type Dial,
} from "./types";
import { SubstrateLayer } from "./substrate-layer";

/**
 * CartographyCanvas — F7 cartography substrate parent component.
 *
 * Source canon:
 *   - representation/visual-system/cartography-concepts/concept-01/FORMULA.md §8.1
 *   - CD3 cartography 5 expression-layers + dial principle
 *
 * Per Mayor 2026-05-11 (W3-S-C miss closure):
 *   D3 + P5 + SVG canon — this shell composes child layers (per §8.2).
 *   Tokens via CSS custom properties (ROOF wires; F7 leaves placeholder
 *   var() with safe-fallback hex). Atmospheric chrome static at scroll
 *   cadence per CD5 §3.1.
 *
 * a11y: role="img" with labelledby + describedby (FORMULA §8.1 Field 4).
 *
 * Children: additional cartography child components per FORMULA §8.2
 * (StreetNetwork, DistrictPolygon, MetroLine, InfernoMarker, etc. —
 * land at F11 component build).
 */
export function CartographyCanvas({
  surface = "homepage",
  district = "editorial",
  dial,
  ariaLabel = "Editorial District cartography",
  ariaDescription,
  children,
  className,
}: CartographyCanvasProps): ReactElement {
  const titleId = useId();
  const descId = useId();
  const resolvedDial: Dial = dial ?? SURFACE_TO_DIAL[surface];
  const description =
    ariaDescription ??
    `Cartography substrate for the ${district} district at ${surface} surface (dial=${resolvedDial}).`;

  return (
    <svg
      role="img"
      aria-labelledby={titleId}
      aria-describedby={descId}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={clsx(
        "prime-cartography",
        `prime-cartography--surface-${surface}`,
        `prime-cartography--district-${district}`,
        `prime-cartography--dial-${resolvedDial}`,
        className,
      )}
      data-prime-surface={surface}
      data-prime-district={district}
      data-prime-dial={resolvedDial}
    >
      <title id={titleId}>{ariaLabel}</title>
      <desc id={descId}>{description}</desc>
      <SubstrateLayer />
      {children}
    </svg>
  );
}
