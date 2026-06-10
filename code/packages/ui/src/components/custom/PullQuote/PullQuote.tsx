"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { cn } from "../../../utils/cn";

/**
 * PullQuote — Vollkorn Display oversized editorial quote, lane em-rule.
 *
 * Editorial register: NO quote marks (Pentagram type-specimen restraint).
 * The lane em-rule above the quote encodes provenance — defaults to
 * editorial; switch to institutional / dispatch when the surrounding
 * article warrants.
 *
 * Motion: reveals in on viewport intersection with a subtle y-offset.
 */

export interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
  lane?: "editorial" | "institutional" | "dispatch";
  className?: string;
}

const LANE_BAR: Record<NonNullable<PullQuoteProps["lane"]>, string> = {
  editorial: "bg-lane-editorial",
  institutional: "bg-lane-institutional",
  dispatch: "bg-lane-dispatch",
};

export function PullQuote({
  children,
  attribution,
  lane = "editorial",
  className,
}: PullQuoteProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("not-prose my-16 md:my-20 max-w-[55ch]", className)}
    >
      <span
        aria-hidden="true"
        className={cn("mb-5 block h-[2px] w-12", LANE_BAR[lane])}
      />
      <blockquote className="font-title font-bold text-2xl md:text-3xl lg:text-4xl leading-[1.2] tracking-tight text-text-strong">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 font-nav text-xs uppercase tracking-[0.18em] text-text-muted">
          — {attribution}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
