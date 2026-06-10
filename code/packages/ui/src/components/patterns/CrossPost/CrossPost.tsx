import type { ReactElement } from "react";
import { clsx } from "clsx";
import { ExternalLink } from "../../../utils";

/**
 * CrossPost — cross-platform syndication surface.
 *
 * Canon: representation/visual-system/components/CrossPost/spec.md
 *  + CD4 §3.1 #17 + master plan §1.5 distribution from V0.
 *
 * Lists the platforms an article is syndicated to + their status. Anchor
 * to the syndicated copy (canonical_url discipline preserved on each
 * destination per master plan §1.5).
 *
 * Positionally-controlled: rendered at article foot (sanctuary register),
 * never mid-article (CD4 §3.1 #17 sanctuary-preserving discipline).
 */

export type CrossPostPlatform =
  | "hashnode"
  | "dev-to"
  | "medium"
  | "substack"
  | "beehiiv"
  | "linkedin"
  | "x"
  | "bluesky"
  | "mastodon"
  | "threads"
  | "hacker-news"
  | "daily-dev";

export type CrossPostEntry = {
  platform: CrossPostPlatform;
  /** URL of the syndicated copy on that platform */
  url: string;
  /** Optional engagement count (renders as quiet metadata) */
  engagement?: { kind: "reactions" | "claps" | "likes" | "stars"; count: number };
  /** Whether the syndication has been published (false = pending) */
  published?: boolean;
};

const PLATFORM_LABEL: Record<CrossPostPlatform, string> = {
  hashnode: "Hashnode",
  "dev-to": "DEV.to",
  medium: "Medium",
  substack: "Substack",
  beehiiv: "Beehiiv",
  linkedin: "LinkedIn",
  x: "X",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  threads: "Threads",
  "hacker-news": "Hacker News",
  "daily-dev": "daily.dev",
};

export type CrossPostProps = {
  /** Syndication entries (typically derived from a query against the article's distribution metadata) */
  entries: CrossPostEntry[];
  /** Optional heading override */
  heading?: string;
  className?: string;
};

export function CrossPost(props: CrossPostProps): ReactElement {
  const {
    entries,
    heading = "Read this elsewhere",
    className,
  } = props;

  return (
    <aside
      className={clsx("prime-cross-post", className)}
      aria-label={heading}
    >
      <h3 className="prime-cross-post__heading">{heading}</h3>
      <ul className="prime-cross-post__list">
        {entries.map((entry) => (
          <li
            key={entry.platform}
            className={clsx(
              "prime-cross-post__item",
              entry.published === false && "prime-cross-post__item--pending",
            )}
          >
            <a
              href={entry.url}
              className="prime-cross-post__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="prime-cross-post__platform">
                {PLATFORM_LABEL[entry.platform]}
              </span>
              {entry.engagement ? (
                <span className="prime-cross-post__engagement">
                  {entry.engagement.count} {entry.engagement.kind}
                </span>
              ) : null}
              <ExternalLink
                size={14}
                strokeWidth={1.5}
                className="prime-cross-post__icon"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
