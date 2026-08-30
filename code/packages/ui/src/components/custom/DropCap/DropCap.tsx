import { type ReactNode } from "react";
import { clsx } from "clsx";

import "./DropCap.css";

/**
 * DropCap — first-letter editorial flourish for article openers.
 *
 * The first character renders ~5 lines tall, floated left, in the platform
 * accent ink; the remainder of the paragraph wraps around it. Editorial-
 * register commitment: applies to the opening paragraph of every
 * NarrativeArticleOpener. (The Vollkorn Display first-letter face named at
 * authorship reached for the unregistered `--font-title` slot and has never
 * rendered — restoring it is F29, a token-contract call.)
 *
 * Pure CSS — no hooks; safe in server components.
 */

export interface DropCapProps {
  children: ReactNode;
  className?: string;
}

export function DropCap({ children, className }: DropCapProps) {
  return <p className={clsx("prime-drop-cap", className)}>{children}</p>;
}
