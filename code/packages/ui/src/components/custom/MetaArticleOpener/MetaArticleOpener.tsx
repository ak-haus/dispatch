import { clsx } from "clsx";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { DldsPanel, type DldsAuthorship, type DldsLane } from "../DldsPanel";
import "./MetaArticleOpener.css";

/**
 * MetaArticleOpener — META article header.
 *
 * Canon source: representation/visual-system/components/MetaArticleOpener/spec.md
 *
 * Visual archetype (spec Field 1): density-prioritized; metadata band
 * prominent; headline tight; subhead utilitarian; optional image-or-dataviz
 * above headline. Opens articles in META register through Meta-code
 * typography (component-locked per CD1 Concept 1). Per CD1 Concept 5:
 * NARRATIVE × META marriage — this is where META register opens an article.
 *
 * Use cases per catalogue §5.1: dispatch-style entries / research returns /
 * infrastructure-decision posts / change-log entries / post-mortem write-ups.
 */

type MetaArticleOpenerVariant =
  | "default"
  | "dataviz-prominent"
  | "change-log"
  | "post-mortem"
  | "compact-mobile";

export type MetaArticleOpenerProps = {
  variant?: MetaArticleOpenerVariant;
  /** Article headline */
  title: string;
  /** Article subhead/dek */
  subtitle?: string;
  /** Article lane per voice/lane-schema.md */
  lane: DldsLane;
  /** Authorship per DLDS taxonomy */
  authorship: DldsAuthorship;
  /** Publish date (ISO string or formatted) */
  date: string;
  /** Read time in minutes */
  readMinutes?: number;
  /** Optional image or dataviz node (rendered above headline) */
  media?: ReactNode;
  /** Drift sensitivity per DLDS */
  driftSensitivity?: "stable" | "monitored" | "drift-detected";
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

const VARIANT_CLASS: Record<MetaArticleOpenerVariant, string> = {
  "default": "",
  "dataviz-prominent": "prime-meta-opener--dataviz",
  "change-log": "prime-meta-opener--change-log",
  "post-mortem": "prime-meta-opener--post-mortem",
  "compact-mobile": "prime-meta-opener--compact",
};

export function MetaArticleOpener(props: MetaArticleOpenerProps): ReactElement {
  const {
    variant = "default",
    title,
    subtitle,
    lane,
    authorship,
    date,
    readMinutes,
    media,
    driftSensitivity,
    className,
    ...rest
  } = props;

  const cls = clsx("prime-meta-opener", VARIANT_CLASS[variant], className);

  return (
    <header className={cls} role="banner" aria-labelledby="meta-opener-title" {...rest}>
      {media ? (
        <figure className="prime-meta-opener__media">{media}</figure>
      ) : null}

      <div className="prime-meta-opener__meta-band">
        <DldsPanel
          variant="meta-opener-prominent"
          lane={lane}
          authorship={authorship}
          driftSensitivity={driftSensitivity}
        />
        {readMinutes ? (
          <span className="prime-meta-opener__read-time">
            {readMinutes} min read
          </span>
        ) : null}
      </div>

      <h1 id="meta-opener-title" className="prime-meta-opener__title">
        {title}
      </h1>

      {subtitle ? (
        <p className="prime-meta-opener__subtitle">{subtitle}</p>
      ) : null}

      <p className="prime-meta-opener__byline">
        <time dateTime={date}>{date}</time>
      </p>
    </header>
  );
}
