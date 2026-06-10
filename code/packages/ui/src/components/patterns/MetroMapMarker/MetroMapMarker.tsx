import type { ReactElement } from "react";
import { clsx } from "clsx";

/**
 * MetroMapMarker — graphics-only "you are here + neighbors + next-stops" marker.
 *
 * Canon: representation/visual-system/components/MetroMapMarker/spec.md
 *  + CD4 §3.1 #8 + CD1 Concept 3 metro-map wayfinding (NOT pyramid; Mayor
 *  closes DP-Q2 in this direction).
 *
 * Rendered as SVG groups inside a CartographyCanvas parent. Receives x/y
 * canvas coordinates + station name + optional neighbor list. Per CD3 §6
 * cosmology surfacing: stations are institutional-blue (Above vector);
 * Inferno markers (separate component, deferred) are wine-red.
 */

export type MetroMapMarkerProps = {
  /** SVG x coordinate (in CartographyCanvas viewBox space, 0-1440) */
  x: number;
  /** SVG y coordinate (in CartographyCanvas viewBox space, 0-900) */
  y: number;
  /** Station name (rendered as label) */
  name: string;
  /** Whether this marker is the active "you are here" */
  isCurrent?: boolean;
  /** Marker variant per spec.md Field 2 */
  variant?: "station" | "interchange" | "terminus";
  /** Optional accessible description */
  ariaLabel?: string;
  /** Class hook */
  className?: string;
  /** Optional click handler (for interactive sitemap surface) */
  onActivate?: () => void;
};

const RADIUS_BY_VARIANT: Record<NonNullable<MetroMapMarkerProps["variant"]>, number> = {
  station: 6,
  interchange: 8,
  terminus: 10,
};

export function MetroMapMarker(props: MetroMapMarkerProps): ReactElement {
  const {
    x,
    y,
    name,
    isCurrent = false,
    variant = "station",
    ariaLabel,
    className,
    onActivate,
  } = props;

  const r = RADIUS_BY_VARIANT[variant];
  const isInteractive = Boolean(onActivate);

  return (
    <g
      className={clsx(
        "prime-metro-marker",
        `prime-metro-marker--${variant}`,
        isCurrent && "prime-metro-marker--current",
        isInteractive && "prime-metro-marker--interactive",
        className,
      )}
      role={isInteractive ? "button" : "img"}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel ?? `${name} station`}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onActivate?.();
        }
      }}
    >
      <circle
        cx={x}
        cy={y}
        r={r + 1.5}
        className="prime-metro-marker__outer"
        fill="var(--sky-low, #f4f0e6)"
        stroke="var(--lane-institutional, #5a6770)"
        strokeWidth={1.5}
      />
      <circle
        cx={x}
        cy={y}
        r={r * 0.45}
        className="prime-metro-marker__core"
        fill="var(--lane-institutional, #5a6770)"
      />
      <text
        x={x + r + 6}
        y={y + 4}
        className="prime-metro-marker__label"
        fontFamily="var(--font-civic, 'IM Fell English', serif)"
        fontSize={12}
        fill="var(--text-primary, #2a261e)"
      >
        {name}
      </text>
    </g>
  );
}
