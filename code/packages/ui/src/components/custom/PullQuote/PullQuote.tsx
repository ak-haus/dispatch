"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { clsx } from "clsx";

import "./PullQuote.css";

/**
 * PullQuote — oversized editorial quote, lane em-rule.
 *
 * Editorial register: NO quote marks (Pentagram type-specimen restraint).
 * The lane em-rule above the quote encodes provenance — defaults to
 * editorial; switch to institutional / dispatch when the surrounding
 * article warrants. (The lane paint and the Vollkorn Display quote face
 * reached for unregistered token slots and have never rendered — restoring
 * them is F28; the lane modifier classes below are the declared seam.)
 *
 * Motion: reveals in on viewport intersection with a subtle y-offset.
 */

export interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
  lane?: "editorial" | "institutional" | "dispatch";
  className?: string;
}

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
      className={clsx("prime-pull-quote", `prime-pull-quote--${lane}`, className)}
    >
      <span aria-hidden="true" className="prime-pull-quote__rule" />
      <blockquote className="prime-pull-quote__quote">{children}</blockquote>
      {attribution ? (
        <figcaption className="prime-pull-quote__attribution">
          — {attribution}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
