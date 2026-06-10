// Prime DISpatch — cartography primitives
//
// F7 (cartography) per Stream 1 Vertical Floor Plan 2026-05-11.
// W3-S-C miss closed structurally: D3 + P5 + SVG canon honored.
//
// Source canon: FORMULA.md §8 component architecture; CD3 5 expression-
// layers; CD2 lane pigment cosmology vectors.

export { CartographyCanvas } from "./cartography-canvas";
export { SubstrateLayer } from "./substrate-layer";
export {
  type Surface,
  type Dial,
  type DistrictName,
  type CartographyCanvasProps,
  SURFACE_TO_DIAL,
  VIEWBOX_WIDTH,
  VIEWBOX_HEIGHT,
} from "./types";
export {
  scaleLinear,
  scaleBand,
  scaleOrdinal,
  line,
  curveCatmullRom,
  contours,
  EDITORIAL_DISTRICT_BOUNDS,
  MAGAZINE_CORNER_ANCHOR,
} from "./d3-utils";
