"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import type { HTMLAttributes, ReactElement } from "react";
import "./ChapterRail.css";
import { usePrimeAutoAnimate } from "../../../motion/use-prime-auto-animate";
import { usePrimeScrollama } from "../../../motion/use-prime-scrollama";

/**
 * ChapterRail — per-article chapter navigation.
 *
 * Applied tools (visible behavior):
 *   - scrollama → tracks which chapter is in view; auto-updates active state
 *   - Motion v12 → staggered reveal of chapter links on mount
 *   - AutoAnimate → list re-orders / additions animate smoothly
 *
 * Honors reduced-motion via scrollama hook (no IntersectionObserver under
 * reduced-motion; initial state set once).
 *
 * Spec: representation/visual-system/components/ChapterRail/spec.md
 */

export type ChapterRailItem = {
  id: string;
  label: string;
  isCurrent?: boolean;
  isVisited?: boolean;
};

type ChapterRailVariant =
  | "article-default"
  | "article-collapsed"
  | "article-mobile-bottom-sheet"
  | "reception-condensed";

export type ChapterRailProps = {
  variant?: ChapterRailVariant;
  title?: string;
  chapters: ChapterRailItem[];
  /** Enable scrollama active-state tracking. Defaults to true. */
  trackScroll?: boolean;
  /** CSS selector matching the section elements (each chapter's anchor target). */
  trackStepSelector?: string;
  onToggleCollapse?: () => void;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children" | "title">;

const VARIANT_CLASS: Record<ChapterRailVariant, string> = {
  "article-default": "",
  "article-collapsed": "prime-chapter-rail--collapsed",
  "article-mobile-bottom-sheet": "prime-chapter-rail--mobile-bottom-sheet",
  "reception-condensed": "prime-chapter-rail--reception-condensed",
};

export function ChapterRail(props: ChapterRailProps): ReactElement {
  const {
    variant = "article-default",
    title,
    chapters,
    trackScroll = true,
    trackStepSelector = "[data-chapter-step]",
    onToggleCollapse,
    className,
    ...rest
  } = props;

  const isCollapsed = variant === "article-collapsed";
  const isReceptionCondensed = variant === "reception-condensed";

  const [autoActive, setAutoActive] = useState<string | null>(null);
  const [listRef] = usePrimeAutoAnimate<HTMLOListElement>();

  // scrollama: track which chapter step is currently in view
  usePrimeScrollama(
    {
      step: trackStepSelector,
      offset: 0.3,
      threshold: 4,
    },
    {
      onStepEnter: ({ element }) => {
        const id = element.id || element.dataset.chapterId;
        if (id) setAutoActive(id);
      },
    },
    [trackStepSelector],
  );

  const resolvedTitle =
    title ?? (isReceptionCondensed ? "What's inside" : "Chapters");

  const effectiveCurrent = trackScroll
    ? autoActive ?? chapters.find((c) => c.isCurrent)?.id ?? chapters[0]?.id
    : chapters.find((c) => c.isCurrent)?.id;

  const current = chapters.find((c) => c.id === effectiveCurrent);

  const cls = clsx("prime-chapter-rail", VARIANT_CLASS[variant], className);

  return (
    <nav
      className={cls}
      role="navigation"
      aria-label={isReceptionCondensed ? "Feature story chapters" : "Article chapters"}
      {...rest}
    >
      {resolvedTitle ? (
        <p className="prime-chapter-rail__title font-nav text-[0.625rem] uppercase tracking-[0.18em] text-text-muted">
          {resolvedTitle}
        </p>
      ) : null}

      {isCollapsed && current ? (
        <p className="prime-chapter-rail__current-only">{current.label}</p>
      ) : null}

      <ol ref={listRef} className="prime-chapter-rail__list space-y-2 mt-3">
        {chapters.map((ch, i) => {
          const isCurrent = ch.id === effectiveCurrent;
          return (
            <motion.li
              key={ch.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={clsx(
                "prime-chapter-rail__item",
                ch.isVisited && "is-visited",
              )}
            >
              <a
                href={`#${ch.id}`}
                className={clsx(
                  "prime-chapter-rail__link",
                  "group flex items-center gap-2 py-1 font-nav text-xs uppercase tracking-[0.12em] transition-colors",
                  isCurrent
                    ? "is-current text-accent-prime"
                    : "text-text-muted hover:text-text-strong",
                )}
                aria-current={isCurrent ? "location" : undefined}
              >
                <motion.span
                  className="prime-chapter-rail__indicator block h-px bg-current"
                  animate={{ width: isCurrent ? 24 : 12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
                <span className="prime-chapter-rail__label">{ch.label}</span>
              </a>
            </motion.li>
          );
        })}
      </ol>

      {(isCollapsed || variant === "article-default") && onToggleCollapse ? (
        <button
          type="button"
          className="prime-chapter-rail__toggle mt-4 font-nav text-[0.625rem] uppercase tracking-[0.14em] text-text-muted hover:text-text-strong"
          aria-expanded={!isCollapsed}
          onClick={onToggleCollapse}
        >
          {isCollapsed ? "Show all chapters" : "Hide chapters"}
        </button>
      ) : null}
    </nav>
  );
}
