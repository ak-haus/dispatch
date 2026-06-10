import { type ReactNode } from "react";
import { cn } from "../../../utils/cn";

/**
 * DropCap — first-letter editorial flourish for article openers.
 *
 * The first character renders in Vollkorn Display, ~5 lines tall, floated
 * left. The remainder of the paragraph wraps around it. Editorial-register
 * commitment: applies to the opening paragraph of every NarrativeArticleOpener.
 *
 * Pure CSS — no hooks; safe in server components.
 */

export interface DropCapProps {
  children: ReactNode;
  className?: string;
}

export function DropCap({ children, className }: DropCapProps) {
  return (
    <p
      className={cn(
        "font-body text-lg leading-relaxed text-text-strong",
        "[&::first-letter]:font-title [&::first-letter]:font-bold",
        "[&::first-letter]:float-left [&::first-letter]:text-[5.5rem]",
        "[&::first-letter]:leading-[0.85] [&::first-letter]:mr-3 [&::first-letter]:mt-1",
        "[&::first-letter]:text-accent-prime",
        className,
      )}
    >
      {children}
    </p>
  );
}
