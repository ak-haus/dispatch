import { format, parseISO } from "date-fns";
import { clsx } from "clsx";

import "./ArticleDateline.css";

/**
 * ArticleDateline — minimal editorial dateline above the article title.
 *
 * Format: [lane-dot] TYPE · AUTHOR · DATE
 * No box, no chrome. Sits on top of the headline like a magazine dateline.
 * (The lane dot's paint reached for the unregistered lane slots and has
 * never rendered — restoring it is F29; the lane modifier class is the
 * declared seam.)
 *
 * The full DLDS provenance (AI role, drift sensitivity, C2PA, multi-author
 * credits) lives separately in the AuthorByline below the standfirst and
 * (future) an expandable provenance panel. The dateline is the SIGNATURE;
 * the deep DLDS is available on demand.
 */

export interface ArticleDatelineProps {
  lane: "editorial" | "institutional" | "dispatch";
  author: string;
  date: string | Date;
  className?: string;
}

const LANE_LABEL = {
  editorial: "Editorial",
  institutional: "Institutional",
  dispatch: "Dispatch",
} as const;

export function ArticleDateline({
  lane,
  author,
  date,
  className,
}: ArticleDatelineProps) {
  // Parse date-only portion (ignore time-of-day + timezone) so the dateline
  // shows the editorial publish date as authored, regardless of viewer TZ.
  const raw = typeof date === "string" ? date : date.toISOString();
  const dateOnly = raw.split("T")[0] ?? raw;
  const formatted = format(parseISO(dateOnly), "MMMM d, yyyy").toUpperCase();

  return (
    <p
      className={clsx(
        "prime-article-dateline",
        `prime-article-dateline--${lane}`,
        className,
      )}
    >
      <span aria-hidden="true" className="prime-article-dateline__dot" />
      <span className="prime-article-dateline__type">{LANE_LABEL[lane]}</span>
      <span aria-hidden="true">·</span>
      <span>{author}</span>
      <span aria-hidden="true">·</span>
      <span>{formatted}</span>
    </p>
  );
}
