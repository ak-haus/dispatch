"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { clsx } from "clsx";
import { Badge } from "../../ui/badge";

import "./AgentTraceCallout.css";

/**
 * AgentTraceCallout — META-register inline block disclosing agentic
 * authorship at a specific moment in the article.
 *
 * Visual register as authored: dark surface (inverse of NARRATIVE
 * paper-warm) with JetBrains Mono content — the "peer behind the curtain"
 * CD1 Concept 1 marriage made structural. (That register reached for
 * unregistered token slots and has never rendered — the block ships
 * transparent in page ink, left rule in currentColor. Restoring the
 * authored register is F28; the lane modifier classes are the seam.)
 * Used for: a model called this tool with this prompt; an agent surfaced
 * this decision; the system observed this state.
 *
 * Motion: enters with a small slide+fade so it reads as "system speaking"
 * rather than paragraph flow.
 */

export interface AgentTraceCalloutProps {
  /** "Conductor agent" / "Debugger agent" / "Mayor (human)" / model id */
  agent: string;
  /** Optional model attribution string */
  model?: string;
  /** Optional tool invocation summary */
  invocation?: string;
  /** The trace content — typically the speech / message / observation */
  children: ReactNode;
  /** Optional lane badge (defaults to dispatch — Inferno-tier agent activity) */
  lane?: "editorial" | "institutional" | "dispatch";
  className?: string;
}

export function AgentTraceCallout({
  agent,
  model,
  invocation,
  children,
  lane = "dispatch",
  className,
}: AgentTraceCalloutProps) {
  return (
    <motion.aside
      // axe landmark-unique: <aside> maps to the `complementary` landmark
      // role, and an article (or the LaneMatrix story) legitimately carries
      // several trace callouts — landmarks sharing a role must carry distinct
      // accessible names (WAI-ARIA APG, Landmark Regions: label a
      // complementary landmark whenever more than one is present). Name each
      // landmark from the required `agent` prop it discloses; attribute-only
      // change, DOM structure and visuals identical.
      aria-label={`Agent trace: ${agent}`}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "prime-agent-trace",
        `prime-agent-trace--${lane}`,
        className,
      )}
    >
      <header className="prime-agent-trace__header">
        <Badge variant={lane} size="sm">
          {agent}
        </Badge>
        {model ? (
          <span className="prime-agent-trace__model">{model}</span>
        ) : null}
        {invocation ? (
          <span className="prime-agent-trace__invocation">· {invocation}</span>
        ) : null}
      </header>
      <div className="prime-agent-trace__content">{children}</div>
    </motion.aside>
  );
}
