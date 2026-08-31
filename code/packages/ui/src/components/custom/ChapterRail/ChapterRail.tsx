"use client";

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import "./ChapterRail.css";

/**
 * ChapterRail — per-article chapter navigation. Thread-with-dots rail
 * (design locked by AK 2026-05-14) + reading-progress copper fill + the
 * mobile chip/sheet pair on a native <dialog>.
 *
 * Canon source: representation/visual-system/components/ChapterRail/spec.md
 *  + CD1 Concept 3 page furniture as civic wayfinding + Concept 7 porous
 *  gradient (reception mirror).
 * Color source: CD2 atmospheric chrome tokens; chrome.text copper arc,
 *  chrome.text.active wine-intermediate on the active chapter, and the
 *  copper progress fill, which IS the bronze reading-progress indicator
 *  (AK 2026-05-14 — spec Field 10's ReadingProgress coupling realized
 *  in-component; no second scroll listener).
 * Typography source: the nav slot for chapter labels (spec Field 7
 *  tokens.type.nav.500/400), the mono slot for the 01/02 markers, the
 *  narrative slot for the sheet/collapsed chapter list.
 *
 * PORTED AT B16 (fork retirement, 2026-08-31 — last of three). The
 * microsite carried the production implementation as a 759-LOC fork; the
 * diff ruled its architecture DELIBERATE end to end:
 *   - Thread-with-dots is the article-default design (AK 2026-05-14): a
 *     1px thread, a copper progress fill growing down it, one dot per
 *     chapter in equal flex slices, the active label always visible,
 *     all labels on rail hover (32px → 280px on hover/focus-within; the
 *     host's centered article column absorbs the expansion).
 *   - Scroll coupling (spec Field 5 + launch-state Critical pattern #6):
 *     subscribes to window.__lenis when the host provides it (single-rAF
 *     discipline — no second loop), falling back to native passive
 *     scroll/resize listeners (Lenis does not initialize under
 *     prefers-reduced-motion). Scrollspy activates the most-recent h2
 *     whose top passed 80px; within 80px of the document bottom the LAST
 *     chapter is forced active (AK 2026-05-14 — short final chapters
 *     otherwise never activate). Reading progress measures against the
 *     host's #dispatch-article region when present.
 *   - Four variants per spec Field 2: article-default (rail + the
 *     chip/sheet pair below the lg breakpoint) · article-collapsed
 *     (current chapter + expand toggle) · article-mobile-bottom-sheet
 *     (standalone chip + sheet) · reception-condensed (the Concept 7
 *     homepage mirror — cross-page links via articleHref, no progress,
 *     no scroll tracking).
 *   - The mobile sheet is a native <dialog> via showModal() (focus trap,
 *     aria-modal, ::backdrop and Escape-cancel from the platform); its
 *     slide-up is @starting-style + allow-discrete, carried VERBATIM
 *     from the host's global.css block into ChapterRail.css (the sheet
 *     styling was host-side only because the fork predated co-located
 *     stylesheets — with the port the component owns its dialog, the
 *     SearchPalette shape).
 *   - The prior library twin was the pre-lock iteration wearing the
 *     name — a scrollama-tracked flat list with staggered entrance,
 *     AutoAnimate reordering, an isVisited state and a text collapse
 *     toggle. That composition retires as drift: usePrimeScrollama loses
 *     its last component consumer (the hook stays in the motion
 *     inventory), and the twin's ChapterRailItem/trackScroll/title API
 *     retires with it. Its stylesheet's REBUILD 2026-05-10 tombstones
 *     remain binding anti-patterns (see ChapterRail.css).
 *
 * Recorded, not ported (drift dropped at the diff):
 *   - className passthrough — unexercised by the shipped host (the
 *     SearchPalette/SiteNav affordance ruling).
 *   - The twin's isVisited dimming, title prop and trackScroll switch —
 *     no spec Field names them and no host exercised them.
 * Recorded findings (host-side, unchanged by this port):
 *   - The host mounts article-default inside a hidden lg:block wrapper,
 *     so the fork's own lg-gated chip/sheet are unreachable at EVERY
 *     viewport on the live article — below lg the whole island is
 *     display:none, at lg+ the mobile pair hides itself. Ported
 *     like-for-like; filed to the board ledger as a product gap, not
 *     repaired here.
 *
 * Story-lifecycle affordances (F19/F20 law — every story state renders
 * deterministically on first paint, no interaction timing in any
 * captured frame; the SearchPalette initialQuery precedent):
 *   - currentChapter — controlled active index (the fork shipped this).
 *   - progress — controlled 0..1 fill (scroll detection is skipped when
 *     either controlled prop is set).
 *   - initialSheetOpen — first-paint open state for the mobile sheet.
 *
 * Accessibility (spec Field 4):
 *   - <nav aria-label="Article chapters"> landmark; explicit <ol>.
 *   - aria-current="location" on the in-view chapter link.
 *   - Collapse toggle: aria-controls="chapter-rail-collapsed" +
 *     aria-expanded.
 *   - Chip: aria-haspopup="dialog" + aria-expanded +
 *     aria-controls="chapter-rail-sheet".
 *   - Sheet: native <dialog> labelled by chapter-rail-sheet-title;
 *     Escape closes via the native cancel event; backdrop click closes.
 */

const SCROLL_THRESHOLD = 80; // px — chapter activates when its heading passes this far above viewport top

/* ============================================================================
 * Public types
 * ========================================================================== */

export type Chapter = {
  slug: string;
  text: string;
  depth: number;
};

export type ChapterRailVariant =
  | "article-default"
  | "article-collapsed"
  | "article-mobile-bottom-sheet"
  | "reception-condensed";

export type ChapterRailProps = {
  variant?: ChapterRailVariant;
  chapters: Chapter[];
  /** Controlled active chapter index (0-based). Overrides scroll detection.
   *  Story/testing affordance (F19/F20 deterministic first paint). */
  currentChapter?: number;
  /** Controlled reading progress (0..1). Overrides scroll detection.
   *  Story/testing affordance (F19/F20 deterministic first paint). */
  progress?: number;
  /** Href prefix for reception-condensed cross-page links (e.g. '/article'). */
  articleHref?: string;
  /** Mobile sheet open on first paint. Story/testing affordance. */
  initialSheetOpen?: boolean;
};

/* ============================================================================
 * Minimal Lenis type — window.__lenis is set by the host's layout script.
 * Typed to what ChapterRail needs; avoids importing 'lenis' into library code.
 * ========================================================================== */

type MinimalLenis = {
  on(event: "scroll", cb: () => void): void;
  off(event: "scroll", cb: () => void): void;
  scrollTo(
    target: HTMLElement | number,
    opts?: { duration?: number; offset?: number; easing?: (t: number) => number },
  ): void;
};

function getLenis(): MinimalLenis | undefined {
  return typeof window !== "undefined"
    ? (window as Window & { __lenis?: MinimalLenis }).__lenis
    : undefined;
}

/* ============================================================================
 * ChapterRail — main export
 * ========================================================================== */

export function ChapterRail({
  variant = "article-default",
  chapters,
  currentChapter,
  progress: controlledProgress,
  articleHref = "",
  initialSheetOpen = false,
}: ChapterRailProps) {
  const reducedMotion = useReducedMotion();
  const isControlled = currentChapter !== undefined;
  const [activeIndex, setActiveIndex] = useState(currentChapter ?? 0);
  const [progress, setProgress] = useState(controlledProgress ?? 0); // 0..1 — copper fill height
  const [sheetOpen, setSheetOpen] = useState(initialSheetOpen);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync controlled props (Storybook / testing)
  useEffect(() => {
    if (isControlled) setActiveIndex(currentChapter!);
  }, [currentChapter, isControlled]);
  useEffect(() => {
    if (controlledProgress !== undefined) setProgress(controlledProgress);
  }, [controlledProgress]);

  // Scroll-linked detection: active chapter + reading progress.
  //
  // Viewport-aware tracking (per AK 2026-05-14): when the reader has
  // scrolled to within 80px of the document bottom, force the LAST chapter
  // active — even if its heading hasn't passed the SCROLL_THRESHOLD. This
  // handles the edge case where the last two chapters are short and visible
  // together at the bottom of the page; without this rule the rail would
  // stick on the penultimate chapter forever.
  useEffect(() => {
    if (variant === "reception-condensed") return;
    if (isControlled || controlledProgress !== undefined) return;

    const detect = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;

      // Reading progress — relative to the article body when present,
      // otherwise to the whole document.
      const article = document.getElementById("dispatch-article");
      if (article) {
        const articleTop = article.getBoundingClientRect().top + scrollY;
        const articleScrollable = Math.max(1, article.offsetHeight - viewHeight * 0.5);
        const p = Math.max(0, Math.min(1, (scrollY - articleTop + viewHeight * 0.3) / articleScrollable));
        setProgress(p);
      } else {
        setProgress(Math.max(0, Math.min(1, scrollY / Math.max(1, docHeight - viewHeight))));
      }

      // Edge case: at the bottom of the page → last chapter wins.
      if (scrollY + viewHeight >= docHeight - 80) {
        setActiveIndex(chapters.length - 1);
        return;
      }

      // Standard scrollspy — most-recent heading whose top has passed
      // the SCROLL_THRESHOLD from the viewport top.
      let idx = 0;
      for (let i = 0; i < chapters.length; i++) {
        const ch = chapters[i];
        if (!ch) continue;
        const el = document.getElementById(ch.slug);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY + SCROLL_THRESHOLD >= top) idx = i;
      }
      setActiveIndex(idx);
    };

    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", detect);
      detect();
      return () => lenis.off("scroll", detect);
    }

    window.addEventListener("scroll", detect, { passive: true });
    window.addEventListener("resize", detect, { passive: true });
    detect();
    return () => {
      window.removeEventListener("scroll", detect);
      window.removeEventListener("resize", detect);
    };
  }, [chapters, variant, isControlled, controlledProgress]);

  // Dialog open/close via showModal/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (sheetOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [sheetOpen]);

  // Escape key via native cancel event
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = () => setSheetOpen(false);
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, []);

  const handleChapterJump = useCallback(
    (e: React.MouseEvent, slug: string, onAfter?: () => void) => {
      e.preventDefault();
      const target = document.getElementById(slug);
      if (!target) return;
      onAfter?.();
      const lenis = getLenis();
      if (lenis && !reducedMotion) {
        lenis.scrollTo(target, {
          duration: 0.4,
          offset: -SCROLL_THRESHOLD,
          easing: (t) => t * (2 - t),
        });
      } else {
        target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
      }
    },
    [reducedMotion],
  );

  if (variant === "reception-condensed") {
    return <ReceptionCondensed chapters={chapters} articleHref={articleHref} />;
  }

  if (variant === "article-collapsed") {
    return (
      <MotionConfig reducedMotion="user">
        <ArticleCollapsed
          chapters={chapters}
          activeIndex={activeIndex}
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          onChapterJump={handleChapterJump}
        />
      </MotionConfig>
    );
  }

  if (variant === "article-mobile-bottom-sheet") {
    return (
      <>
        <MobileChip
          chapters={chapters}
          activeIndex={activeIndex}
          sheetOpen={sheetOpen}
          onOpen={() => setSheetOpen(true)}
        />
        <MobileSheet
          ref={dialogRef}
          chapters={chapters}
          activeIndex={activeIndex}
          onClose={() => setSheetOpen(false)}
          onChapterJump={handleChapterJump}
        />
      </>
    );
  }

  // article-default — thread-with-dots design (locked by AK 2026-05-14).
  //
  // Visual: a thin vertical thread runs the height of the rail. A copper
  // fill grows down the thread as the reader scrolls (= reading progress).
  // One dot per chapter, evenly spaced along the thread. The active
  // chapter's label is ALWAYS visible (anchored to the right of its dot).
  // Hovering the rail reveals every chapter's label.
  //
  // Layout: sticky inside parent (the host's article grid).
  //   collapsed — 32px wide; just the thread + dots + active label.
  //   expanded  — 280px wide on hover; all labels visible.
  // The host article column's mx-auto max-width absorbs the expansion so
  // the reading column doesn't shift.

  return (
    <MotionConfig reducedMotion="user">
      <nav aria-label="Article chapters" id="chapter-rail" className="prime-chapter-rail">
        {/* ── Thread (background) ─────────────────────────────────
            1px vertical hairline running the full rail height. */}
        <div aria-hidden="true" className="prime-chapter-rail__thread" />

        {/* ── Copper progress fill ────────────────────────────────
            Grows from top with reading progress. This IS the bronze
            reading-progress indicator (AK 2026-05-14). */}
        <motion.div
          aria-hidden="true"
          className="prime-chapter-rail__progress"
          style={{
            background:
              "linear-gradient(to bottom, var(--platform-copper) 0%, var(--platform-copper-deep) 100%)",
            boxShadow:
              "0 0 6px color-mix(in oklch, var(--platform-copper) 60%, transparent)",
          }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.5 }}
        />

        {/* ── Dots + labels ───────────────────────────────────────
            Each chapter occupies an equal vertical slice of the rail.
            Dots are absolutely centered within their slice; labels
            sit to the right of the dot, fading in for the active
            chapter (always) or on rail hover (all chapters). */}
        <ol className="prime-chapter-rail__list">
          {chapters.map((ch, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={ch.slug} className="prime-chapter-rail__item">
                <a
                  href={`#${ch.slug}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => handleChapterJump(e, ch.slug)}
                  className="prime-chapter-rail__link"
                >
                  {/* Dot */}
                  <motion.span
                    aria-hidden="true"
                    className="prime-chapter-rail__dot"
                    style={{
                      marginLeft: "11px", // centers an 8px dot on the 15px-offset thread
                    }}
                    animate={{
                      width: isActive ? 10 : 6,
                      height: isActive ? 10 : 6,
                      backgroundColor: isActive
                        ? "var(--platform-accent-prime-active)"
                        : "var(--platform-copper)",
                      boxShadow: isActive
                        ? "0 0 0 3px color-mix(in oklch, var(--platform-accent-prime) 22%, transparent), 0 0 12px color-mix(in oklch, var(--platform-accent-prime) 50%, transparent)"
                        : "0 0 0 0px transparent",
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    {/* Pulsing ring on active dot */}
                    {isActive && (
                      <span aria-hidden="true" className="prime-chapter-rail__ping" />
                    )}
                  </motion.span>

                  {/* Label — anchored beside the dot. Active label always
                      visible; others fade in on rail hover. */}
                  <motion.span
                    className="prime-chapter-rail__label"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : -4,
                    }}
                    style={{
                      color: isActive
                        ? "var(--platform-accent-prime-active)"
                        : "var(--platform-copper-deep)",
                    }}
                    transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <span className="prime-chapter-rail__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="prime-chapter-rail__strong">/</span>
                    <span className="prime-chapter-rail__strong">{ch.text}</span>
                  </motion.span>

                  {/* Hover-only label — for non-active chapters, fades in
                      when the user moves the cursor over the rail. Sits in
                      the same slot but with hover-controlled opacity. */}
                  {!isActive && (
                    <span className="prime-chapter-rail__hover-label">
                      <span className="prime-chapter-rail__hover-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="prime-chapter-rail__hover-sep">/</span>
                      <span className="prime-chapter-rail__hover-text">{ch.text}</span>
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile chip + sheet — hidden at lg+ */}
      <div className="prime-chapter-rail__mobile">
        <MobileChip
          chapters={chapters}
          activeIndex={activeIndex}
          sheetOpen={sheetOpen}
          onOpen={() => setSheetOpen(true)}
        />
        <MobileSheet
          ref={dialogRef}
          chapters={chapters}
          activeIndex={activeIndex}
          onClose={() => setSheetOpen(false)}
          onChapterJump={handleChapterJump}
        />
      </div>
    </MotionConfig>
  );
}

/* ============================================================================
 * ChapterList — shared ordered list of chapter anchor links
 * ========================================================================== */

type ChapterListProps = {
  chapters: Chapter[];
  activeIndex: number;
  onChapterJump: (e: React.MouseEvent, slug: string, onAfter?: () => void) => void;
  articleHref?: string;
};

function ChapterList({ chapters, activeIndex, onChapterJump, articleHref = "" }: ChapterListProps) {
  return (
    <ol className="prime-chapter-rail__chapters">
      {chapters.map((ch, i) => {
        const isActive = i === activeIndex;
        return (
          <li key={ch.slug}>
            <a
              href={`${articleHref}#${ch.slug}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(e) => onChapterJump(e, ch.slug)}
              className={
                isActive
                  ? "prime-chapter-rail__chapters-link is-active"
                  : "prime-chapter-rail__chapters-link"
              }
            >
              <span
                aria-hidden="true"
                className={
                  isActive
                    ? "prime-chapter-rail__chapters-num is-active"
                    : "prime-chapter-rail__chapters-num"
                }
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="prime-chapter-rail__chapters-text">{ch.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/* ============================================================================
 * ArticleCollapsed — current chapter name + animated expand toggle
 * ========================================================================== */

function ArticleCollapsed({
  chapters,
  activeIndex,
  expanded,
  onToggle,
  onChapterJump,
}: {
  chapters: Chapter[];
  activeIndex: number;
  expanded: boolean;
  onToggle: () => void;
  onChapterJump: (e: React.MouseEvent, slug: string, onAfter?: () => void) => void;
}) {
  const currentLabel = chapters[activeIndex]?.text ?? "Chapters";

  return (
    <div className="prime-chapter-rail__collapsed">
      <button
        type="button"
        aria-controls="chapter-rail-collapsed"
        aria-expanded={expanded}
        onClick={onToggle}
        className="prime-chapter-rail__collapsed-toggle"
      >
        <span className="prime-chapter-rail__collapsed-current">
          <span aria-hidden="true" className="prime-chapter-rail__collapsed-dot" />
          <span className="prime-chapter-rail__collapsed-label">{currentLabel}</span>
        </span>
        <span aria-hidden="true" className="prime-chapter-rail__collapsed-caret">
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id="chapter-rail-collapsed"
            key="chapter-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <nav aria-label="Article chapters" className="prime-chapter-rail__collapsed-panel">
              <ChapterList
                chapters={chapters}
                activeIndex={activeIndex}
                onChapterJump={(e, slug) => {
                  onChapterJump(e, slug, () => onToggle());
                }}
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================================
 * MobileChip — fixed bottom-right pill showing current chapter
 * ========================================================================== */

function MobileChip({
  chapters,
  activeIndex,
  sheetOpen,
  onOpen,
}: {
  chapters: Chapter[];
  activeIndex: number;
  sheetOpen: boolean;
  onOpen: () => void;
}) {
  const label = chapters[activeIndex]?.text ?? "Chapters";

  return (
    <div className="prime-chapter-rail__chip-wrap">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={sheetOpen}
        aria-controls="chapter-rail-sheet"
        aria-label={`Chapters — currently: ${label}. Open chapter list.`}
        onClick={onOpen}
        className="prime-chapter-rail__chip"
      >
        <span aria-hidden="true" className="prime-chapter-rail__chip-dot" />
        <span className="prime-chapter-rail__chip-label">{label}</span>
        {/* Chevron up — indicates sheet opens upward */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="prime-chapter-rail__chip-caret"
          aria-hidden="true"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}

/* ============================================================================
 * MobileSheet — native <dialog> bottom sheet
 *
 * showModal() grants: focus trap, aria-modal, ::backdrop, Escape → cancel
 * event. Animation: CSS @starting-style + transition-behavior:
 * allow-discrete (the prime-chapter-rail__sheet block in ChapterRail.css,
 * carried verbatim from the host's global.css at the B16 port).
 * Backdrop click: fires on dialog element itself (content is in a child div).
 * ========================================================================== */

type MobileSheetProps = {
  chapters: Chapter[];
  activeIndex: number;
  onClose: () => void;
  onChapterJump: (e: React.MouseEvent, slug: string, onAfter?: () => void) => void;
};

const MobileSheet = forwardRef<HTMLDialogElement, MobileSheetProps>(
  function MobileSheet({ chapters, activeIndex, onClose, onChapterJump }, ref) {
    return (
      <dialog
        ref={ref}
        id="chapter-rail-sheet"
        aria-labelledby="chapter-rail-sheet-title"
        aria-modal="true"
        className="prime-chapter-rail__sheet"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="prime-chapter-rail__sheet-body">
          {/* Sheet header */}
          <div className="prime-chapter-rail__sheet-head">
            <p id="chapter-rail-sheet-title" className="prime-chapter-rail__sheet-title">
              Chapters
            </p>
            <button
              type="button"
              aria-label="Close chapter list"
              onClick={onClose}
              className="prime-chapter-rail__sheet-close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="prime-chapter-rail__sheet-close-glyph"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Chapter list */}
          <nav aria-label="Article chapters">
            <ChapterList
              chapters={chapters}
              activeIndex={activeIndex}
              onChapterJump={(e, slug) => onChapterJump(e, slug, onClose)}
            />
          </nav>

          {/* Keyboard hint */}
          <p className="prime-chapter-rail__sheet-hint">
            Press <kbd className="prime-chapter-rail__sheet-kbd">Esc</kbd> to close
          </p>
        </div>
      </dialog>
    );
  },
);

/* ============================================================================
 * ReceptionCondensed — homepage "what's inside" chapter preview
 *
 * No scroll tracking. Links use articleHref prefix for cross-page navigation.
 * No progress coupling (spec Field 2: reception mode has no progress indicator).
 * ========================================================================== */

function ReceptionCondensed({
  chapters,
  articleHref = "",
}: {
  chapters: Chapter[];
  articleHref?: string;
}) {
  return (
    <nav aria-label="Article chapters" className="prime-chapter-rail__reception">
      <p aria-hidden="true" className="prime-chapter-rail__reception-title">
        Contents
      </p>
      <ol className="prime-chapter-rail__reception-list">
        {chapters.map((ch) => (
          <li key={ch.slug}>
            <a href={`${articleHref}#${ch.slug}`} className="prime-chapter-rail__reception-link">
              <span aria-hidden="true" className="prime-chapter-rail__reception-dot" />
              <span className="prime-chapter-rail__reception-text">{ch.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
