import type { ReactElement, ReactNode } from "react";
import { clsx } from "clsx";
import {
  CartographyCanvas,
  type CartographyCanvasProps,
} from "../../../cartography";

/**
 * DistrictMap — homepage district-map + building-layout cartography surface.
 *
 * Canon: representation/visual-system/components/DistrictMap/spec.md
 *  + CD4 §3.1 #16 + CD1 Concept 7 reception + CD3-CD4 boundary.
 *
 * Specialization of CartographyCanvas at homepage-zoom register. Renders
 * the Editorial District + neighbor districts (Civic + Art forward-pointed)
 * as a navigation surface. Children compose additional cartography layers
 * (MetroMapMarker, InfernoMarker, etc.) per FORMULA §8.2.
 */

export type DistrictMapProps = Omit<
  CartographyCanvasProps,
  "surface" | "ariaLabel"
> & {
  /** Aria label override (default: "Editorial District map") */
  ariaLabel?: string;
  /** Children = composed cartography child components per FORMULA §8.2 */
  children?: ReactNode;
};

export function DistrictMap(props: DistrictMapProps): ReactElement {
  const {
    district = "editorial",
    dial = "low",
    ariaLabel = "Editorial District map — homepage navigation",
    ariaDescription,
    children,
    className,
  } = props;

  return (
    <CartographyCanvas
      surface="homepage"
      district={district}
      dial={dial}
      ariaLabel={ariaLabel}
      ariaDescription={ariaDescription}
      className={clsx("prime-district-map", className)}
    >
      {children}
    </CartographyCanvas>
  );
}
