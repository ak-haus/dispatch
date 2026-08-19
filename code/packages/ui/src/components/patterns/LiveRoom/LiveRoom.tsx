import type { ReactElement, ReactNode } from "react";
import { clsx } from "clsx";
import { formatRelative } from "../../../utils";

/**
 * LiveRoom — live-coworking room (offices-window for active citizens).
 *
 * Canon: representation/visual-system/components/LiveRoom/spec.md
 *  + CD4 §3.1 #20 + CD1 Concept 7 (offices-window) + master plan §11 Q8
 *  production opt-in.
 *
 * Shell-level component: renders presence + recent activity. Real-time
 * subscription (websockets / SSE / Yjs) is app-level wiring; this
 * component receives presence + activity via props.
 *
 * Per-author lane pigment per CD4 §3.1 #20 — each citizen carries a
 * lane indicator that maps to their primary working surface.
 */

export type LiveRoomCitizen = {
  /** Citizen name / handle */
  name: string;
  /** Current activity status */
  status: "active" | "idle" | "away";
  /** Optional lane indicator (drives swatch pigment) */
  lane?: "editorial" | "institutional" | "dispatch";
  /** Optional avatar url; renders initials if absent */
  avatarUrl?: string;
  /** Optional label (e.g., "drafting Dispatch · Week 3") */
  doing?: string;
};

export type LiveRoomActivity = {
  id: string;
  /** Activity kind (commit / dispatch / signal / arrival / departure) */
  kind: "commit" | "dispatch" | "signal" | "arrival" | "departure";
  /** Citizen who originated the activity */
  citizen: string;
  /** Activity body */
  text: ReactNode;
  /** Timestamp */
  at: Date | string;
};

export type LiveRoomProps = {
  /** Currently-present citizens */
  presence: LiveRoomCitizen[];
  /** Recent activity stream */
  activity: LiveRoomActivity[];
  /** Optional max activity entries to render */
  activityLimit?: number;
  /** Optional empty-state */
  emptyMessage?: string;
  /** Optional aria-label */
  ariaLabel?: string;
  className?: string;
};

const STATUS_LABEL: Record<LiveRoomCitizen["status"], string> = {
  active: "Active",
  idle: "Idle",
  away: "Away",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function LiveRoom(props: LiveRoomProps): ReactElement {
  const {
    presence,
    activity,
    activityLimit,
    emptyMessage = "The room is quiet. Check back during dispatch hours.",
    ariaLabel = "Live coworking room",
    className,
  } = props;

  const visibleActivity = activityLimit
    ? activity.slice(0, activityLimit)
    : activity;
  const isQuiet = presence.length === 0 && visibleActivity.length === 0;

  return (
    <section
      className={clsx("prime-live-room", className)}
      aria-label={ariaLabel}
    >
      {isQuiet ? (
        <p className="prime-live-room__empty">{emptyMessage}</p>
      ) : (
        <>
          <header className="prime-live-room__header">
            <h3 className="prime-live-room__heading">In the room</h3>
            <span className="prime-live-room__count">
              {presence.length} present
            </span>
          </header>
          <ul className="prime-live-room__presence" aria-label="Citizens present">
            {presence.map((citizen) => (
              <li
                key={citizen.name}
                className={clsx(
                  "prime-live-room__citizen",
                  `prime-live-room__citizen--${citizen.status}`,
                  citizen.lane &&
                    `prime-live-room__citizen--lane-${citizen.lane}`,
                )}
                aria-label={`${citizen.name} — ${STATUS_LABEL[citizen.status]}`}
              >
                <span
                  className="prime-live-room__avatar"
                  aria-hidden="true"
                >
                  {citizen.avatarUrl ? (
                    <img
                      src={citizen.avatarUrl}
                      alt=""
                      className="prime-live-room__avatar-img"
                    />
                  ) : (
                    <span className="prime-live-room__avatar-initials">
                      {initials(citizen.name)}
                    </span>
                  )}
                </span>
                <span className="prime-live-room__citizen-name">
                  {citizen.name}
                </span>
                {citizen.doing ? (
                  <span className="prime-live-room__citizen-doing">
                    {citizen.doing}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          {/*
            axe aria-allowed-role + listitem: role="log" is not a permitted
            role on <ol> (W3C ARIA-in-HTML), and overriding the native list
            role orphaned the <li> children. Canon (spec.md Field 4)
            prescribes the live-list pattern directly — a native list
            carrying aria-live="polite" + aria-relevant — so the <ol> keeps
            its list role and the live-region attributes announce additions.
          */}
          <ol
            className="prime-live-room__activity"
            aria-label="Recent activity"
            aria-live="polite"
            aria-relevant="additions"
          >
            {visibleActivity.map((event) => (
              <li
                key={event.id}
                className={clsx(
                  "prime-live-room__activity-item",
                  `prime-live-room__activity-item--${event.kind}`,
                )}
              >
                <span className="prime-live-room__activity-kind">
                  {event.kind.toUpperCase()}
                </span>
                <span className="prime-live-room__activity-citizen">
                  {event.citizen}
                </span>
                <span className="prime-live-room__activity-text">
                  {event.text}
                </span>
                <time
                  className="prime-live-room__activity-time"
                  dateTime={
                    typeof event.at === "string"
                      ? event.at
                      : event.at.toISOString()
                  }
                >
                  {formatRelative(event.at)}
                </time>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}
