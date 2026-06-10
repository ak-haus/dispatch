import {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  type ScaleLinear,
  type ScaleBand,
  type ScaleOrdinal,
} from "d3-scale";
import { line, curveCatmullRom, type Line } from "d3-shape";
import { contours, type ContourMultiPolygon } from "d3-contour";

/**
 * D3 utility re-exports for cartography substrate layers.
 *
 * Curated set from d3-* sub-packages (NOT the full d3 monolith) so
 * tree-shaking keeps the per-page payload tight. Used by:
 *   - Z-order 5+ lane wash (scaleOrdinal lane → pigment)
 *   - Z-order 6/7 street network (line + curveCatmullRom)
 *   - Z-order 4 contour (contours generator)
 *   - Z-order 13 metro stations (scaleLinear position)
 */
export {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  line,
  curveCatmullRom,
  contours,
};

export type {
  ScaleLinear,
  ScaleBand,
  ScaleOrdinal,
  Line,
  ContourMultiPolygon,
};

/**
 * Editorial District placeholder coordinates per FORMULA §4.1 borough
 * zoom — used by smoke-test fixtures + future child layer components.
 */
export const EDITORIAL_DISTRICT_BOUNDS = {
  x: 240,
  y: 120,
  width: 960,
  height: 660,
} as const;

export const MAGAZINE_CORNER_ANCHOR = {
  x: 1100,
  y: 380,
  radius: 140,
} as const;
