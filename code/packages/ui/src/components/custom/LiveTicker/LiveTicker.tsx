import { clsx } from "clsx";
import type { HTMLAttributes, ReactElement } from "react";
import { usePrimeAutoAnimate } from "../../../motion";
import { formatRelative } from "../../../utils";
import "./LiveTicker.css";

/**
 * LiveTicker — reception offices-window for live updates.
 *
 * Canon: representation/visual-system/components/LiveTicker/spec.md
 *  + CD4 §3.1 #15 + CD1 Concept 7 reception ↔ offices ↔ missives.
 *
 * Renders a META-register stream of live entries (commit log, dispatch
 * pings, agent activity). Uses AutoAnimate (with reduced-motion guard)
 * for entry-add transitions; static substrate at scroll cadence per CD5.
 */

export type LiveTickerEntry = {
  id: string;
  /** Activity kind drives the META label rendered alongside */
  kind: "commit" | "deploy" | "dispatch" | "signal" | "agent";
  /** One-line entry text */
  text: string;
  /** Timestamp; rendered via formatRelative */
  at: Date | string;
  /** Optional anchor href */
  href?: string;
};

const KIND_LABEL: Record<LiveTickerEntry["kind"], string> = {
  commit: "COMMIT",
  deploy: "DEPLOY",
  dispatch: "DISPATCH",
  signal: "SIGNAL",
  agent: "AGENT",
};

type LiveTickerVariant = "compact" | "expanded" | "marquee";

export type LiveTickerProps = {
  variant?: LiveTickerVariant;
  /** Live entries; ordered most-recent-first */
  entries: LiveTickerEntry[];
  /** Optional aria-label override */
  ariaLabel?: string;
  /** Optional max entries to render (slices entries) */
  limit?: number;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function LiveTicker(props: LiveTickerProps): ReactElement {
  const {
    variant = "compact",
    entries,
    ariaLabel = "Live updates from Prime",
    limit,
    className,
    ...rest
  } = props;

  const [listRef] = usePrimeAutoAnimate<HTMLOListElement>();
  const visible = limit ? entries.slice(0, limit) : entries;

  return (
    <aside
      className={clsx(
        "prime-live-ticker",
        `prime-live-ticker--${variant}`,
        className,
      )}
      role="region"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-relevant="additions"
      {...rest}
    >
      <ol className="prime-live-ticker__list" ref={listRef}>
        {visible.map((entry) => {
          const inner = (
            <>
              <span
                className={clsx(
                  "prime-live-ticker__kind",
                  `prime-live-ticker__kind--${entry.kind}`,
                )}
                aria-hidden="true"
              >
                {KIND_LABEL[entry.kind]}
              </span>
              <span className="prime-live-ticker__text">{entry.text}</span>
              <time
                className="prime-live-ticker__time"
                dateTime={
                  typeof entry.at === "string"
                    ? entry.at
                    : entry.at.toISOString()
                }
              >
                {formatRelative(entry.at)}
              </time>
            </>
          );
          return (
            <li key={entry.id} className="prime-live-ticker__item">
              {entry.href ? (
                <a className="prime-live-ticker__link" href={entry.href}>
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
