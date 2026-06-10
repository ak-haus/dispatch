import type { ReactElement, ReactNode } from "react";
import { clsx } from "clsx";
import { formatKicker } from "../../../utils";

/**
 * ReceptionHero — feature-story hero on DISpatch homepage reception.
 *
 * Canon: representation/visual-system/components/ReceptionHero/spec.md
 *  + CD4 §3.1 #13 + CD1 Concept 7 reception → magazine-glossary.
 *
 * NYT/New Yorker glossary precedent: feature article gets the prominent
 * front-of-magazine slot. NARRATIVE-prominent typography (Title + Body).
 */

export type ReceptionHeroProps = {
  /** Article slug for the canonical link */
  slug: string;
  /** Canonical title (rendered as h2 inside section) */
  title: string;
  /** Subhead / standfirst */
  deck: string;
  /** Lane (drives kicker pigment) */
  lane: "editorial" | "institutional" | "dispatch";
  /** Publication date */
  publishedAt: Date | string;
  /** Author display string */
  author: string;
  /** Optional hero image (renders below kicker, above title) */
  image?: { src: string; alt: string; caption?: string };
  /** Optional eyebrow text override (defaults to formatted kicker) */
  kicker?: string;
  className?: string;
};

export function ReceptionHero(props: ReceptionHeroProps): ReactElement {
  const {
    slug,
    title,
    deck,
    lane,
    publishedAt,
    author,
    image,
    kicker,
    className,
  } = props;

  const eyebrow = kicker ?? formatKicker(publishedAt, lane);

  return (
    <section
      className={clsx(
        "prime-reception-hero",
        `prime-reception-hero--lane-${lane}`,
        className,
      )}
      aria-labelledby={`hero-${slug}`}
    >
      <a
        className="prime-reception-hero__link"
        href={`/articles/${slug}`}
        aria-label={`Read ${title}`}
      >
        <p className="prime-reception-hero__kicker">{eyebrow}</p>
        {image ? (
          <figure className="prime-reception-hero__figure">
            <img
              src={image.src}
              alt={image.alt}
              className="prime-reception-hero__image"
              loading="eager"
            />
            {image.caption ? (
              <figcaption className="prime-reception-hero__caption">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
        <h2 id={`hero-${slug}`} className="prime-reception-hero__title">
          {title}
        </h2>
        <p className="prime-reception-hero__deck">{deck}</p>
        <p className="prime-reception-hero__byline">By {author}</p>
      </a>
    </section>
  );
}
