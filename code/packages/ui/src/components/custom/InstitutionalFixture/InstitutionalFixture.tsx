import { clsx } from "clsx";
import type { HTMLAttributes, ReactElement } from "react";
import "./InstitutionalFixture.css";

/**
 * InstitutionalFixture — Paradiso 9-charter-spheres seed-mandate fixture.
 *
 * Canon source: representation/visual-system/components/InstitutionalFixture/spec.md
 *
 * Visual archetype (spec Field 1): quiet typographic anchor appearing on
 * EVERY surface (reception + article). Per CD1 Concept 6: NOT a founding
 * date — the institutional anchor IS the charter mandate expressed as a
 * cohesive mission. Per CD1 Concept 4 atmospheric register: rendered on
 * warm-paper substrate (--window-warm); printed-institutional-anchor feel.
 *
 * Distinct from MastheadWordmark (building-name identity at masthead).
 * Distinct from SiteNav (navigation chrome). The fixture is the still
 * point of every surface.
 */

type InstitutionalFixtureVariant = "seed-mandate" | "full-charter";

export type InstitutionalFixtureProps = {
  variant?: InstitutionalFixtureVariant;
  /** Mayor-articulated seed-mandate prose (V1) or full charter (post-V1) */
  mandate: string;
  /** Optional charter link (placeholder URL until Paradiso authored) */
  charterLinkURL?: string;
  /** Optional accessible label override */
  ariaLabel?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function InstitutionalFixture(props: InstitutionalFixtureProps): ReactElement {
  const {
    variant = "seed-mandate",
    mandate,
    charterLinkURL,
    ariaLabel = "Institutional mandate",
    className,
    ...rest
  } = props;

  const cls = clsx(
    "prime-institutional-fixture",
    variant === "full-charter" && "prime-institutional-fixture--full-charter",
    className
  );

  return (
    <aside
      className={cls}
      role="contentinfo"
      aria-label={ariaLabel}
      {...rest}
    >
      <p className="prime-institutional-fixture__mandate">{mandate}</p>
      {charterLinkURL ? (
        <a className="prime-institutional-fixture__charter-link" href={charterLinkURL}>
          Read Prime's charter
        </a>
      ) : null}
    </aside>
  );
}
