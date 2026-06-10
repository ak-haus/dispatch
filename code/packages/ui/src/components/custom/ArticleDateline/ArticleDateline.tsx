import { format, parseISO } from "date-fns";
import { cn } from "../../../utils/cn";

/**
 * ArticleDateline — minimal editorial dateline above the article title.
 *
 * Format: [lane-dot] TYPE · AUTHOR · DATE
 * No box, no chrome. Sits on top of the headline like a magazine dateline.
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

const LANE_DOT = {
  editorial: "bg-lane-editorial",
  institutional: "bg-lane-institutional",
  dispatch: "bg-lane-dispatch",
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
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 font-nav text-xs uppercase tracking-[0.18em] text-text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("inline-block h-1.5 w-1.5", LANE_DOT[lane])}
      />
      <span className="font-extrabold text-text-strong">
        {LANE_LABEL[lane]}
      </span>
      <span aria-hidden="true" className="text-rail-edge">
        ·
      </span>
      <span className="text-text-strong">{author}</span>
      <span aria-hidden="true" className="text-rail-edge">
        ·
      </span>
      <span>{formatted}</span>
    </p>
  );
}
