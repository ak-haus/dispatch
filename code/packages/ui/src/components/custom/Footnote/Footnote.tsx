"use client";

import { useState, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { clsx } from "clsx";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";
import "./Footnote.css";

/**
 * Footnote — in-text marker + popover/endnote container.
 *
 * Applied tools (visible behavior):
 *   - Radix Popover (via shadcn wrapper) → collision-aware inline popover
 *     on marker click
 *   - Floating UI middleware (Radix internal) → flip + shift near viewport edges
 *   - Motion v12 AnimatePresence → smooth open/close transition
 *
 * Variants:
 *   - popover (NEW default for inline use): marker is a Radix Popover trigger;
 *     the prose appears as a popover on click. Best for browse-read mode.
 *   - endnote: rendered in the article's endnotes section at the bottom.
 *   - sidebar-popover / mobile-bottom-sheet / inline-aside: preserved legacy
 *     variants for spec compliance.
 *
 * Anchor: Tufte CSS sidenote pattern + NYT-Magazine in-text glossary.
 */

type FootnoteVariant =
  | "popover"
  | "sidebar-popover"
  | "mobile-bottom-sheet"
  | "endnote"
  | "inline-aside";

export type FootnoteProps = {
  variant?: FootnoteVariant;
  markerNumber: number;
  children: ReactNode;
  /** Controlled open state (popover variant only). Omit for self-managed. */
  open?: boolean;
  backLinkHash?: string;
  backLinkLabel?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

const VARIANT_CLASS: Record<FootnoteVariant, string> = {
  popover: "prime-footnote--popover",
  "sidebar-popover": "prime-footnote--sidebar-popover",
  "mobile-bottom-sheet": "prime-footnote--mobile-bottom-sheet",
  endnote: "prime-footnote--endnote",
  "inline-aside": "prime-footnote--inline-aside",
};

export function Footnote(props: FootnoteProps): ReactElement {
  const {
    variant = "popover",
    markerNumber,
    children,
    open,
    backLinkHash,
    backLinkLabel = "Return to text",
    className,
    ...rest
  } = props;

  if (variant === "popover") {
    return (
      <Popover open={open}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="prime-footnote-marker inline-flex font-code text-[0.65em] text-accent-prime hover:text-copper-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-1 focus-visible:ring-offset-surface-page"
            role="doc-noteref"
            id={`footnote-ref-${markerNumber}`}
            aria-describedby={`footnote-${markerNumber}`}
          >
            <sup>{markerNumber}</sup>
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="center"
          sideOffset={6}
          className={clsx(
            "z-50 w-80 border border-rail-edge bg-surface-page p-4 text-text-strong outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className,
          )}
          id={`footnote-${markerNumber}`}
          role="doc-footnote"
          {...rest}
        >
          <div className="flex items-baseline gap-2">
            <span className="font-code text-[0.625rem] text-text-muted">
              {String(markerNumber).padStart(2, "0")}
            </span>
            <div className="font-body text-sm leading-relaxed text-text-strong">
              {children}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Endnote / inline-aside / legacy popover-style: render in-flow.
  const hash = backLinkHash ?? `#footnote-ref-${markerNumber}`;
  const cls = clsx("prime-footnote", VARIANT_CLASS[variant], className);
  const hidden =
    (variant === "sidebar-popover" || variant === "mobile-bottom-sheet") &&
    open === false;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.aside
          key={`footnote-${markerNumber}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className={cls}
          role="doc-footnote"
          id={`footnote-${markerNumber}`}
          aria-labelledby={`footnote-ref-${markerNumber}`}
          {...(rest as HTMLMotionProps<"aside">)}
        >
          <span className="prime-footnote__label font-code text-[0.625rem] text-text-muted">
            {String(markerNumber).padStart(2, "0")}
          </span>
          <div className="prime-footnote__prose font-body text-sm leading-relaxed text-text-strong">
            {children}
          </div>
          <a
            className="prime-footnote__back-link font-nav text-[0.625rem] uppercase tracking-[0.14em] text-text-muted hover:text-accent-prime"
            href={hash}
          >
            {backLinkLabel}
          </a>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */

export type FootnoteMarkerProps = {
  markerNumber: number;
  open?: boolean;
  onClick?: () => void;
  className?: string;
};

/**
 * FootnoteMarker — inline citation reference (anchor-only variant).
 *
 * Use the `Footnote` component with variant="popover" for inline popovers.
 * This marker is kept for hosts that want to handle open/close themselves
 * (e.g., Astro MDX hosts that don't use the Popover wrapper).
 */
export function FootnoteMarker(props: FootnoteMarkerProps): ReactElement {
  const { markerNumber, open = false, onClick, className } = props;
  return (
    <a
      className={clsx(
        "prime-footnote-marker inline-flex font-code text-[0.65em] text-accent-prime hover:text-copper-deep",
        className,
      )}
      href={`#footnote-${markerNumber}`}
      role="doc-noteref"
      id={`footnote-ref-${markerNumber}`}
      aria-describedby={`footnote-${markerNumber}`}
      aria-expanded={open}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <sup>{markerNumber}</sup>
    </a>
  );
}
