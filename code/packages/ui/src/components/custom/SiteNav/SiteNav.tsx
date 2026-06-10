import { clsx } from "clsx";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { MastheadWordmark } from "../MastheadWordmark";
import "./SiteNav.css";

/**
 * SiteNav — top-level navigation chrome.
 *
 * Visual archetype: horizontal BAND with three slots (left = wordmark /
 * center = primary links / right = affordances). No background substrate —
 * substrate is page-surface owned (Rule 1). Boundary signal is a single
 * border-bottom hairline whose color resolves per theme (--rail-edge).
 *
 * Per W2-S-F's Mayor-locked render: copper-default nav with wine-intermediate
 * active state. Per CD1 Concept 7: article surfaces hide the SearchPalette
 * trigger to preserve sanctuary register.
 *
 * Spec: representation/visual-system/components/SiteNav/spec.md
 */

export type SiteNavLink = {
  /** Display label rendered inside the link */
  label: string;
  /** Destination href */
  href: string;
  /** Whether this is the current page (gets aria-current="page" + active style) */
  isActive?: boolean;
  /** Disabled state (pointer-events disabled + low opacity) */
  isDisabled?: boolean;
};

type SiteNavVariant = "reception" | "article" | "compact-mobile";

export type SiteNavProps = {
  /** Variant per spec.md Field 2 */
  variant?: SiteNavVariant;
  /** Primary nav-link set (center slot). On article variant, host should
   *  pass the compressed "back to DISpatch" set. */
  links?: SiteNavLink[];
  /** Whether the mobile menu is open (Field 3 lifecycle state) */
  mobileMenuOpen?: boolean;
  /** Whether SearchPalette is currently open (drives aria-expanded on trigger) */
  paletteOpen?: boolean;
  /** Whether the search affordance has been clicked — host passes a handler */
  onPaletteTriggerClick?: () => void;
  /** Whether the hamburger has been clicked — host passes a handler */
  onMobileToggleClick?: () => void;
  /** Custom wordmark slot override (defaults to <MastheadWordmark scale="header" />) */
  wordmark?: ReactNode;
  /** Optional right-slot extras (theme-cycler, auth, etc.) */
  affordances?: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

const DEFAULT_LINKS: SiteNavLink[] = [
  { label: "Articles", href: "/articles" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Subscribe", href: "/subscribe" },
];

export function SiteNav(props: SiteNavProps): ReactElement {
  const {
    variant = "reception",
    links = DEFAULT_LINKS,
    mobileMenuOpen = false,
    paletteOpen = false,
    onPaletteTriggerClick,
    onMobileToggleClick,
    wordmark,
    affordances,
    className,
    ...rest
  } = props;

  const showSearch = variant === "reception";

  const navClass = clsx(
    "prime-site-nav",
    variant === "article" && "prime-site-nav--article",
    variant === "compact-mobile" && "prime-site-nav--compact",
    mobileMenuOpen && "prime-site-nav--mobile-menu-open",
    className
  );

  return (
    <nav
      className={navClass}
      role="navigation"
      aria-label="Primary navigation"
      {...rest}
    >
      <div className="prime-site-nav__left">
        {wordmark ?? <MastheadWordmark scale="header" href="/" />}
      </div>

      <div className="prime-site-nav__center">
        <ul className="prime-site-nav__list">
          {links.map((link) => {
            const linkClass = clsx(
              "prime-site-nav__link",
              link.isActive && "is-active",
              link.isDisabled && "is-disabled"
            );
            return (
              <li key={`${link.href}-${link.label}`}>
                <a
                  className={linkClass}
                  href={link.href}
                  aria-current={link.isActive ? "page" : undefined}
                  aria-disabled={link.isDisabled ? true : undefined}
                  tabIndex={link.isDisabled ? -1 : 0}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="prime-site-nav__right">
        {showSearch ? (
          <button
            type="button"
            className="prime-site-nav__affordance"
            aria-haspopup="dialog"
            aria-expanded={paletteOpen}
            onClick={onPaletteTriggerClick}
          >
            {/* Cycle 2 — hairline magnifier glyph + small-caps "SEARCH" per
             * NYT Magazine 2024 + Geist typographic-affordance register */}
            <svg
              className="prime-site-nav__affordance-glyph"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <circle cx="7" cy="7" r="4.5" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" />
            </svg>
            <span>Search</span>
          </button>
        ) : null}
        {affordances}
        <button
          type="button"
          className="prime-site-nav__hamburger"
          aria-controls="prime-site-nav-mobile-menu"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={onMobileToggleClick}
        >
          {/* Three-bar hamburger; SVG keeps the chrome typographic-rather-than-iconographic */}
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
            <rect width="18" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
