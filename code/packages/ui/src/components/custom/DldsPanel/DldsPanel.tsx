import { clsx } from "clsx";
import type { HTMLAttributes, ReactElement } from "react";
import "./DldsPanel.css";

/**
 * DldsPanel — Disclosed-Lane Drift-Sensing panel.
 *
 * Canon source: representation/visual-system/components/DldsPanel/spec.md
 *
 * Visual archetype (spec Field 1): metadata band carrying lane indicator
 * (color swatch + lane name) + authorship attribution + optional drift-
 * sensitivity + optional C2PA badge + disclosure-toggle for expanded
 * provenance. Reads in META register through Meta-code typography per CD1
 * Concept 1 component-locked containment.
 *
 * Canon discipline: lane taxonomy lives in voice/lane-schema.md (main canon
 * authority); CD4 spec inherits. v0 here renders the minimum-viable shape
 * for the three canon lanes (editorial / institutional / dispatch).
 */

export type DldsLane = "editorial" | "institutional" | "dispatch";

export type DldsAuthorship = {
  citizen: string;
  /** Per voice/lane-schema.md ai_role taxonomy */
  aiRole?: "human-only" | "human-led-AI-assisted" | "AI-led-human-supervised" | "system-generated";
};

type DldsPanelVariant =
  | "inline-disclosure"
  | "expanded-provenance"
  | "meta-opener-prominent"
  | "narrative-opener-restrained";

export type DldsPanelProps = {
  variant?: DldsPanelVariant;
  lane: DldsLane;
  authorship: DldsAuthorship;
  /** Optional drift-sensitivity flag */
  driftSensitivity?: "stable" | "monitored" | "drift-detected";
  /** C2PA content credentials attached */
  c2paAttached?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

const VARIANT_CLASS: Record<DldsPanelVariant, string> = {
  "inline-disclosure": "",
  "expanded-provenance": "prime-dlds-panel--expanded",
  "meta-opener-prominent": "prime-dlds-panel--meta-prominent",
  "narrative-opener-restrained": "prime-dlds-panel--narrative-restrained",
};

const LANE_LABEL: Record<DldsLane, string> = {
  editorial: "Editorial",
  institutional: "Institutional",
  dispatch: "Dispatch",
};

const AI_ROLE_LABEL: Record<NonNullable<DldsAuthorship["aiRole"]>, string> = {
  "human-only": "Human only",
  "human-led-AI-assisted": "Human-led · AI-assisted",
  "AI-led-human-supervised": "AI-led · Human-supervised",
  "system-generated": "System-generated",
};

export function DldsPanel(props: DldsPanelProps): ReactElement {
  const {
    variant = "inline-disclosure",
    lane,
    authorship,
    driftSensitivity,
    c2paAttached = false,
    className,
    ...rest
  } = props;

  const isRestrained = variant === "narrative-opener-restrained";
  const isExpanded = variant === "expanded-provenance";

  const cls = clsx(
    "prime-dlds-panel",
    `prime-dlds-panel--lane-${lane}`,
    VARIANT_CLASS[variant],
    className
  );

  return (
    <aside
      className={cls}
      role="complementary"
      aria-label={`Disclosed lane: ${LANE_LABEL[lane]}`}
      {...rest}
    >
      <span className="prime-dlds-panel__swatch" aria-hidden="true" />
      <span className="prime-dlds-panel__lane">{LANE_LABEL[lane]}</span>
      <span className="prime-dlds-panel__sep" aria-hidden="true">·</span>
      <span className="prime-dlds-panel__authorship">
        <span className="prime-dlds-panel__citizen">{authorship.citizen}</span>
        {authorship.aiRole ? (
          <>
            <span className="prime-dlds-panel__sep" aria-hidden="true">·</span>
            <span className="prime-dlds-panel__ai-role">
              {AI_ROLE_LABEL[authorship.aiRole]}
            </span>
          </>
        ) : null}
      </span>
      {!isRestrained && driftSensitivity ? (
        <>
          <span className="prime-dlds-panel__sep" aria-hidden="true">·</span>
          <span
            className={clsx(
              "prime-dlds-panel__drift",
              `prime-dlds-panel__drift--${driftSensitivity}`
            )}
            aria-label={`Drift sensitivity: ${driftSensitivity}`}
          >
            {driftSensitivity}
          </span>
        </>
      ) : null}
      {!isRestrained && c2paAttached ? (
        <>
          <span className="prime-dlds-panel__sep" aria-hidden="true">·</span>
          <span
            className="prime-dlds-panel__c2pa"
            // role="img" is load-bearing, not decoration: aria-label is
            // PROHIBITED on a bare <span> (no role → no naming permitted),
            // and axe reports the pair as aria-prohibited-attr. The badge
            // still needs the expanded name the CD4 spec Field 4 prescribes
            // ("Content credentials available"), so give it a role that
            // permits naming. Surfaced 2026-08-19 by ImageWithCaption, the
            // first surface to render the badge; attribute-only, no visual
            // change.
            role="img"
            aria-label="Content credentials available"
          >
            C2PA
          </span>
        </>
      ) : null}
      {isExpanded ? (
        <div className="prime-dlds-panel__detail">
          <p>
            Expanded provenance — lane <strong>{LANE_LABEL[lane]}</strong>;
            authored by <strong>{authorship.citizen}</strong>
            {authorship.aiRole ? <> in <strong>{AI_ROLE_LABEL[authorship.aiRole]}</strong> mode</> : null}.
            {driftSensitivity ? <> Drift status: <strong>{driftSensitivity}</strong>.</> : null}
            {c2paAttached ? <> C2PA content credentials attached.</> : null}
          </p>
        </div>
      ) : null}
    </aside>
  );
}
