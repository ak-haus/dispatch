import { clsx } from "clsx";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { DldsPanel, type DldsAuthorship, type DldsLane } from "../DldsPanel";
import "./NarrativeArticleOpener.css";

/**
 * NarrativeArticleOpener — NARRATIVE article header.
 *
 * Canon source: representation/visual-system/components/NarrativeArticleOpener/spec.md
 *
 * Visual archetype (spec Field 1): whitespace-prioritized; spacious scale +
 * long leading; voice-driven. Optional epigraph above headline; italicized
 * standfirst below; restrained chrome BELOW the standfirst (not in metadata
 * band) per CD1 Concept 7 article-as-sanctuary. Per CD1 Concept 5: NARRATIVE
 * register reads in NYT Magazine / New Yorker / Paris Review / Baffler
 * calibration through Title + Body (DISpatch-locked).
 *
 * Use cases per catalogue §5.2: developer-diary entries / philosophical
 * posts / register-statement posts / Mayor-direction posts.
 */

type NarrativeArticleOpenerVariant =
  | "default"
  | "epigraph-prominent"
  | "drop-cap"
  | "image-absent"
  | "compact-mobile";

export type NarrativeArticleOpenerProps = {
  variant?: NarrativeArticleOpenerVariant;
  /** Optional epigraph (literary citation set ABOVE headline) */
  epigraph?: ReactNode;
  /** Article headline */
  title: string;
  /** Italicized standfirst BELOW headline */
  standfirst?: string;
  /** Optional image/illustration node BELOW headline (absent for pure prose) */
  media?: ReactNode;
  /** Article lane per voice/lane-schema.md */
  lane: DldsLane;
  /** Authorship per DLDS taxonomy */
  authorship: DldsAuthorship;
  /** Publish date (ISO or formatted) */
  date: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children" | "title">;

const VARIANT_CLASS: Record<NarrativeArticleOpenerVariant, string> = {
  "default": "",
  "epigraph-prominent": "prime-narrative-opener--epigraph",
  "drop-cap": "prime-narrative-opener--drop-cap",
  "image-absent": "prime-narrative-opener--image-absent",
  "compact-mobile": "prime-narrative-opener--compact",
};

export function NarrativeArticleOpener(props: NarrativeArticleOpenerProps): ReactElement {
  const {
    variant = "default",
    epigraph,
    title,
    standfirst,
    media,
    lane,
    authorship,
    date,
    className,
    ...rest
  } = props;

  const cls = clsx("prime-narrative-opener", VARIANT_CLASS[variant], className);

  return (
    <header className={cls} role="banner" aria-labelledby="narrative-opener-title" {...rest}>
      {epigraph ? (
        <blockquote className="prime-narrative-opener__epigraph">
          {epigraph}
        </blockquote>
      ) : null}

      <h1 id="narrative-opener-title" className="prime-narrative-opener__title">
        {title}
      </h1>

      {standfirst ? (
        <p className="prime-narrative-opener__standfirst">{standfirst}</p>
      ) : null}

      {media && variant !== "image-absent" ? (
        <figure className="prime-narrative-opener__media">{media}</figure>
      ) : null}

      <div className="prime-narrative-opener__restrained-chrome">
        <DldsPanel
          variant="narrative-opener-restrained"
          lane={lane}
          authorship={authorship}
        />
        <span className="prime-narrative-opener__sep" aria-hidden="true">·</span>
        <time className="prime-narrative-opener__date" dateTime={date}>{date}</time>
      </div>
    </header>
  );
}
