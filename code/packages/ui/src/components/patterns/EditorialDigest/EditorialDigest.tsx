import type { ReactElement } from "react";
import { clsx } from "clsx";
import { formatDateline } from "../../../utils";

/**
 * EditorialDigest — "things to read today" + "coming-soon" homepage digest.
 *
 * Canon: representation/visual-system/components/EditorialDigest/spec.md
 *  + CD4 §3.1 #14 + CD1 Concept 7 reception (magazine-glossary structure).
 *
 * New Yorker glossary precedent: a structured digest of recent + upcoming
 * articles framing the homepage's offices-window.
 */

export type EditorialDigestEntry = {
  slug: string;
  title: string;
  description?: string;
  lane: "editorial" | "institutional" | "dispatch";
  publishedAt: Date | string;
  /** Whether the article is published (anchor) or coming soon (no link) */
  status?: "published" | "coming-soon";
};

export type EditorialDigestSection = {
  heading: string;
  entries: EditorialDigestEntry[];
};

export type EditorialDigestProps = {
  /** Sectioned list of entries (e.g., "Latest", "Coming soon") */
  sections: EditorialDigestSection[];
  /** Optional aria-label override */
  ariaLabel?: string;
  className?: string;
};

export function EditorialDigest(props: EditorialDigestProps): ReactElement {
  const { sections, ariaLabel = "Editorial digest", className } = props;

  return (
    <section
      className={clsx("prime-editorial-digest", className)}
      aria-label={ariaLabel}
    >
      {sections.map((section) => (
        <div key={section.heading} className="prime-editorial-digest__section">
          <h3 className="prime-editorial-digest__heading">{section.heading}</h3>
          <ul className="prime-editorial-digest__list">
            {section.entries.map((entry) => {
              const isComingSoon = entry.status === "coming-soon";
              const dateline = formatDateline(entry.publishedAt);
              const inner = (
                <>
                  <span
                    className={clsx(
                      "prime-editorial-digest__lane",
                      `prime-editorial-digest__lane--${entry.lane}`,
                    )}
                  >
                    {entry.lane.toUpperCase()}
                  </span>
                  <span className="prime-editorial-digest__title">
                    {entry.title}
                  </span>
                  {entry.description ? (
                    <span className="prime-editorial-digest__description">
                      {entry.description}
                    </span>
                  ) : null}
                  <time
                    className="prime-editorial-digest__date"
                    dateTime={dateline}
                  >
                    {dateline}
                  </time>
                </>
              );
              return (
                <li
                  key={entry.slug}
                  className={clsx(
                    "prime-editorial-digest__item",
                    isComingSoon && "prime-editorial-digest__item--coming-soon",
                  )}
                >
                  {isComingSoon ? (
                    <span className="prime-editorial-digest__entry">
                      {inner}
                    </span>
                  ) : (
                    <a
                      className="prime-editorial-digest__entry"
                      href={`/articles/${entry.slug}`}
                    >
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
