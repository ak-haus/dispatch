"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { Badge } from "../../ui/badge";
import { cn } from "../../../utils/cn";

/**
 * AgentTraceCallout — META-register inline block disclosing agentic
 * authorship at a specific moment in the article.
 *
 * Visual register: dark surface (inverse of NARRATIVE paper-warm) with
 * JetBrains Mono content — the "peer behind the curtain" CD1 Concept 1
 * marriage made structural. Used for: a model called this tool with this
 * prompt; an agent surfaced this decision; the system observed this state.
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
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "not-prose my-12 md:my-16 border-l-4 bg-text-strong text-surface-page p-6 md:p-8 max-w-[80ch]",
        lane === "editorial" && "border-lane-editorial",
        lane === "institutional" && "border-lane-institutional",
        lane === "dispatch" && "border-lane-dispatch",
        className,
      )}
    >
      <header className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant={lane} size="sm">
          {agent}
        </Badge>
        {model ? (
          <span className="font-code text-[0.625rem] text-window-warm">
            {model}
          </span>
        ) : null}
        {invocation ? (
          <span className="font-code text-[0.625rem] uppercase tracking-wider text-window-warm">
            · {invocation}
          </span>
        ) : null}
      </header>
      <div className="font-code text-sm leading-relaxed text-surface-page [&_code]:bg-surface-page/15 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm">
        {children}
      </div>
    </motion.aside>
  );
}
