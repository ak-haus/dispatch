import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMagnetic } from "./useMagnetic";
import "./SiteNav.css";

/**
 * SiteNav — the masthead's nav cluster: primary links (center slot) +
 * affordances (SearchPalette trigger + theme-cycler, right slot).
 *
 * Canon source: representation/visual-system/components/SiteNav/spec.md
 *  + CD1 Concept 3 page furniture as civic wayfinding.
 * Color source: CD2 §4.3 + W2-S-F Decision 8 nav state arc (copper-label
 *  default → copper-deep hover → accent-prime-active active; wine focus
 *  ring is the ONLY wine usage in the nav). Nav links sit under the WCAG
 *  large-text threshold, so the AA label role --platform-copper-label is
 *  the canon idle binding (F5 size-scoped copper discipline).
 *
 * PORTED AT B16 (fork retirement, 2026-08-31 — second of three). The
 * microsite carried the production implementation as a 492-LOC fork; the
 * diff ruled its architecture DELIBERATE:
 *   - The HOST owns the band. Spec Field 1's three-slot band is realized
 *     at the Masthead composition level ("wordmark-adjacent positioning
 *     per layout") — the sticky/scroll-aware <header>, the wordmark and
 *     the mobile Dialog sheet are the microsite Masthead's; SiteNav is
 *     the cluster inside it. The prior library twin's self-owned band
 *     (wordmark slot + border hairline + CSS hamburger menu, whose
 *     aria-controls named an id that existed nowhere) was the W2/W3-era
 *     interpretation and retires as drift.
 *   - Variants per spec Field 2: reception / article / mobile. `mobile`
 *     is the contents of the host's Dialog sheet (spec's compact-mobile,
 *     realized host-side); the host closes the sheet via onNavigate.
 *     Per AK 2026-05-14 every live surface ships `reception` — `article`
 *     stays per spec (sanctuary: search trigger hidden, CD1 Concept 7).
 *   - Motion is the product (JS-first): magnetic nav links (useMagnetic,
 *     strength 0.32 / lockY / 8px cap) and the layoutId indicator that
 *     travels between links on hover-preview. Reduced-motion: the hook
 *     zeroes translation; the host's MotionConfig damps the springs.
 *   - ThemeCycler is HOSTED here per spec Field 6 — segmented three-way
 *     control (dawn / dusk / night, aria-pressed), persisting the RAW
 *     string 'prime-cycle' + html[data-prime-cycle] (+ .dark mirror on
 *     night). Deliberately NOT wired to state/theme-cycler: that zustand
 *     store persists JSON under the same key — a different protocol than
 *     the microsite's blocking FOUC script reads. Converging the two is
 *     its own adjudication (filed to the board ledger at B16).
 *
 * Accessibility (spec Field 4):
 *   - <nav aria-label="Primary navigation"> wraps the link list; the
 *     affordances sit outside the landmark (wayfinding-tight semantics).
 *   - One <a aria-current="page"> at a time, derived from currentPath.
 *   - SearchPalette trigger: aria-haspopup="dialog" + aria-expanded, and
 *     aria-controls="dispatch-search-palette" only while open (the A13
 *     ruling: a closed <dialog> is display:none, so the reference target
 *     is unperceivable to AT — the library palette keeps that id for
 *     exactly this seam).
 *   - Theme-cycler: real <button> per cycle, aria-pressed on the active
 *     one.
 *   - data-analytics on every nav link: the editorial instrumentation
 *     contract (declared in markup so restyling cannot silently stop the
 *     metric).
 */

export type SiteNavVariant = "reception" | "article" | "mobile";
type PrimeCycle = "dawn" | "dusk" | "night";

export type SiteNavLink = {
  /** Display label rendered inside the link */
  label: string;
  /** Destination href */
  href: string;
};

export interface SiteNavProps {
  /** Current pathname — aria-current derives from it (exact or trailing
   *  slash match). The host passes it; the component owns the matching. */
  currentPath: string;
  /** Variant per spec Field 2 (default reception). */
  variant?: SiteNavVariant;
  /** Primary nav-link set (defaults to the DISpatch navPages). The
   *  article variant is self-contained per spec Field 2 and ignores it. */
  links?: readonly SiteNavLink[];
  /** Mobile variant: called on link activation so the host can close its
   *  sheet. */
  onNavigate?: () => void;
  /** Palette state — owned by the host so cmd-K can fire globally. */
  paletteOpen?: boolean;
  onPaletteOpen?: () => void;
}

/** The DISpatch primary nav-link set (the shipped content default). */
export const navPages: readonly SiteNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/article", label: "Articles" },
  { href: "/sitemap", label: "Atlas" },
  { href: "/about", label: "About" },
] as const;

export function SiteNav({
  currentPath,
  variant = "reception",
  links = navPages,
  onNavigate,
  paletteOpen = false,
  onPaletteOpen,
}: SiteNavProps) {
  if (variant === "mobile") {
    return (
      <MobileNav
        currentPath={currentPath}
        links={links}
        onNavigate={onNavigate}
        paletteOpen={paletteOpen}
        onPaletteOpen={onPaletteOpen}
      />
    );
  }
  if (variant === "article") {
    return <ArticleNav />;
  }
  return (
    <ReceptionNav
      currentPath={currentPath}
      links={links}
      paletteOpen={paletteOpen}
      onPaletteOpen={onPaletteOpen}
    />
  );
}

/* ============================================================================
 * Reception variant — full nav + affordances cluster
 * ========================================================================== */

function ReceptionNav({
  currentPath,
  links,
  paletteOpen,
  onPaletteOpen,
}: {
  currentPath: string;
  links: readonly SiteNavLink[];
  paletteOpen?: boolean;
  onPaletteOpen?: () => void;
}) {
  const [previewHref, setPreviewHref] = useState<string | null>(null);
  const indicatorTargetHref =
    previewHref ?? links.find((p) => isCurrent(p.href, currentPath))?.href ?? null;

  return (
    <div className="prime-site-nav">
      <nav
        aria-label="Primary navigation"
        className="prime-site-nav__nav"
        onMouseLeave={() => setPreviewHref(null)}
      >
        <ul className="prime-site-nav__list" role="list">
          {links.map((p) => {
            const isActive = isCurrent(p.href, currentPath);
            const isIndicatorTarget = indicatorTargetHref === p.href;
            return (
              <li key={p.href} role="listitem">
                <MagneticNavLink
                  href={p.href}
                  label={p.label}
                  isActive={isActive}
                  isIndicatorTarget={isIndicatorTarget}
                  isPreviewTone={!(isActive && previewHref === null)}
                  onPreview={(v) => setPreviewHref(v ? p.href : null)}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="prime-site-nav__affordances">
        <SearchTrigger paletteOpen={paletteOpen} onOpen={onPaletteOpen} />
        <ThemeCycler />
      </div>
    </div>
  );
}

/* ============================================================================
 * Article variant — sanctuary mode: compressed nav, no SearchPalette
 * ========================================================================== */

function ArticleNav() {
  return (
    <div className="prime-site-nav prime-site-nav--article">
      <nav aria-label="Primary navigation" className="prime-site-nav__nav">
        <a href="/" className="prime-site-nav__back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prime-site-nav__back-glyph"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to DISpatch
        </a>
      </nav>
      <ThemeCycler />
    </div>
  );
}

/* ============================================================================
 * Mobile variant — the contents of the host's Dialog sheet
 * ========================================================================== */

function MobileNav({
  currentPath,
  links,
  onNavigate,
  paletteOpen,
  onPaletteOpen,
}: {
  currentPath: string;
  links: readonly SiteNavLink[];
  onNavigate?: () => void;
  paletteOpen?: boolean;
  onPaletteOpen?: () => void;
}) {
  return (
    <>
      <nav aria-label="Primary navigation" className="prime-site-nav__mobile-nav">
        <ul role="list" className="prime-site-nav__mobile-list">
          {links.map((p) => {
            const isActive = isCurrent(p.href, currentPath);
            return (
              <li key={p.href} role="listitem">
                <a
                  href={p.href}
                  data-analytics={`nav:${p.href}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={onNavigate}
                  className="prime-site-nav__mobile-link"
                >
                  {isActive && (
                    <span aria-hidden="true" className="prime-site-nav__mobile-marker" />
                  )}
                  <span>{p.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="prime-site-nav__mobile-footer">
        <SearchTrigger paletteOpen={paletteOpen} onOpen={onPaletteOpen} />
        <ThemeCycler />
      </div>
    </>
  );
}

/* ============================================================================
 * SearchPalette trigger — icon button, host-owned dialog state
 *
 * Per spec.md Field 1: SiteNav hosts the SearchPalette trigger.
 * Per spec.md Field 4: aria-haspopup="dialog", aria-expanded.
 * On article surfaces this component is not rendered (sanctuary
 * preservation, CD1 Concept 7).
 * ========================================================================== */

function SearchTrigger({
  paletteOpen = false,
  onOpen,
}: {
  paletteOpen?: boolean;
  onOpen?: () => void;
}) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={paletteOpen}
      /* aria-controls only while the palette is open: a closed <dialog> is
         display:none, so the reference target is unperceivable to AT (and
         axe marks the pair undeterminable — A13 incomplete assertion). */
      aria-controls={paletteOpen ? "dispatch-search-palette" : undefined}
      aria-label="Search DISpatch (press Ctrl+K or Cmd+K)"
      onClick={() => onOpen?.()}
      className="prime-site-nav__search"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="prime-site-nav__search-glyph"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button>
  );
}

/* ============================================================================
 * ThemeCycler — segmented control showing all 3 cycles side-by-side.
 *
 * Why segmented (not a single cycling button): most users only flip
 * between two states (day / night) and never discover that a third
 * exists. Showing dawn · dusk · night as three discoverable affordances
 * makes the third state visible without requiring exploration. The
 * active cycle reads as filled; the other two read as outlined.
 *
 * Per spec.md Field 6: SiteNav hosts the theme-cycler affordance.
 * Per spec.md Field 4: real <button> per cycle, aria-pressed=true on the
 * active state so screen readers announce "X, pressed; Y, not pressed".
 *
 * State lives in localStorage 'prime-cycle' (RAW string — the protocol
 * the microsite's blocking FOUC script in StackLayout reads) +
 * html[data-prime-cycle], with the .dark class mirrored on night for
 * legacy shadcn compatibility.
 * ========================================================================== */

const CYCLE_ORDER: readonly PrimeCycle[] = ["dawn", "dusk", "night"] as const;

function ThemeCycler() {
  const [cycle, setCycle] = useState<PrimeCycle>("dawn");

  useEffect(() => {
    const initial = (document.documentElement.getAttribute("data-prime-cycle") ||
      "dawn") as PrimeCycle;
    setCycle(initial);
  }, []);

  const cycleTo = (next: PrimeCycle) => {
    const html = document.documentElement;
    html.setAttribute("data-prime-cycle", next);
    html.classList.toggle("dark", next === "night");
    try {
      localStorage.setItem("prime-cycle", next);
    } catch (_) {
      /* localStorage unavailable; cycle still applies for this session */
    }
    setCycle(next);
  };

  return (
    <div
      role="group"
      aria-label="Cycle theme — dawn, dusk, or night"
      className="prime-site-nav__cycler"
    >
      {CYCLE_ORDER.map((c) => {
        const active = c === cycle;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={active}
            aria-label={`${c.charAt(0).toUpperCase()}${c.slice(1)} cycle${active ? " (active)" : ""}`}
            onClick={() => cycleTo(c)}
            className="prime-site-nav__cycle"
          >
            <CycleGlyph cycle={c} />
          </button>
        );
      })}
    </div>
  );
}

function CycleGlyph({ cycle }: { cycle: PrimeCycle }) {
  const shared = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor" as const,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "prime-site-nav__cycle-glyph",
    "aria-hidden": true,
  };
  if (cycle === "dawn") {
    return (
      <svg {...shared}>
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </svg>
    );
  }
  if (cycle === "dusk") {
    return (
      <svg {...shared}>
        <path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 0 0 9.79 9.79z" opacity="0.4" />
        <circle cx="9" cy="13" r="4" />
        <line x1="9" y1="6" x2="9" y2="7" />
        <line x1="3" y1="13" x2="4" y2="13" />
        <line x1="14" y1="13" x2="15" y2="13" />
      </svg>
    );
  }
  // night
  return (
    <svg {...shared}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ============================================================================
 * MagneticNavLink — nav link with cursor-attracted micro-translate.
 *
 * Pattern from ouro-labs / feedagency: link follows cursor with damped
 * motion (strength 0.32, capped at 8px). lockY=true preserves the baseline
 * so adjacent links stay visually aligned. Spring stiffness 280 / damping 22
 * gives a smooth pull without jitter on rapid mouse movement.
 *
 * The active-page indicator (motion.span layoutId) renders inside the
 * magnetic wrapper so it travels WITH the link — the underline stays
 * attached as the link slides under the cursor. Indicator tone: wine
 * (accent-prime-active) at rest on the active link; copper-deep while a
 * hover/focus preview retargets it.
 * ========================================================================== */

function MagneticNavLink({
  href,
  label,
  isActive,
  isIndicatorTarget,
  isPreviewTone,
  onPreview,
}: {
  href: string;
  label: string;
  isActive: boolean;
  isIndicatorTarget: boolean;
  isPreviewTone: boolean;
  onPreview: (active: boolean) => void;
}) {
  const m = useMagnetic<HTMLAnchorElement>({ strength: 0.32, lockY: true, maxOffset: 8 });

  return (
    <motion.a
      ref={m.ref}
      href={href}
      /* data-analytics: declares this as an engagement point for the
         editorial instrumentation (the microsite's analytics boot).
         Declared in the markup rather than matched by selector, so
         restyling the nav cannot silently stop the metric. */
      data-analytics={`nav:${href}`}
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={() => onPreview(true)}
      onMouseMove={m.onMouseMove}
      onMouseLeave={() => {
        m.onMouseLeave();
        onPreview(false);
      }}
      onFocus={() => onPreview(true)}
      onBlur={() => onPreview(false)}
      animate={{ x: m.x, y: m.y }}
      transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.4 }}
      className="prime-site-nav__link"
    >
      {label}
      {isIndicatorTarget && (
        <motion.span
          layoutId="masthead-indicator"
          aria-hidden="true"
          className={
            "prime-site-nav__indicator" +
            (isPreviewTone ? " prime-site-nav__indicator--preview" : "")
          }
          transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
        />
      )}
    </motion.a>
  );
}

/* ============================================================================
 * Helpers
 * ========================================================================== */

function isCurrent(href: string, currentPath: string): boolean {
  return currentPath === href || currentPath === href + "/";
}
