/**
 * Cartography type contracts shared across CartographyCanvas + child layers.
 * Source: representation/visual-system/cartography-concepts/concept-01/FORMULA.md §8.1.
 */

export type Surface = "homepage" | "article" | "sitemap";
export type Dial = "low" | "mid" | "high";
export type DistrictName = "editorial" | "civic" | "art";

export type CartographyCanvasProps = {
  /** Per-surface dial calibration mode (homepage=low, article=mid, sitemap=high) */
  surface?: Surface;
  /** Active focus district per CD3 §3 districts-not-blocks */
  district?: DistrictName;
  /** Override the per-surface dial; defaults to surface's dial */
  dial?: Dial;
  /** Accessible label override */
  ariaLabel?: string;
  /** Accessible description override */
  ariaDescription?: string;
  /** Children = additional cartography child components per FORMULA §8.2 */
  children?: React.ReactNode;
  /** Optional className for downstream chrome composition */
  className?: string;
};

export const SURFACE_TO_DIAL: Record<Surface, Dial> = {
  homepage: "low",
  article: "mid",
  sitemap: "high",
};

export const VIEWBOX_WIDTH = 1440;
export const VIEWBOX_HEIGHT = 900;
