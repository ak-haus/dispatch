"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { cn } from "../../../utils/cn";

/**
 * AuthorByline — citizen/agent attribution with HoverCard preview.
 *
 * Surfaces every contributor (human citizen + agentic staff) inline-flow
 * with hover-card popping their full bio + lane chip + role. The DLDS-co-
 * authored editorial commitment made visible per contributor.
 *
 * Floating UI under Radix HoverCard handles collision-aware positioning.
 */

export interface AuthorBylineAuthor {
  id: string;
  name: string;
  /** Lane provenance for THIS contribution */
  lane: "editorial" | "institutional" | "dispatch";
  /** Human role title (Editor-in-Chief / Conductor agent / Debugger agent / etc.) */
  role: string;
  /** Optional avatar src; falls back to initials */
  avatarSrc?: string;
  /** Short bio for the hover-card preview */
  bio?: string;
  /** Optional model attribution for AI agents (e.g., "claude-opus-4-7[1m]") */
  modelAttribution?: string;
}

export interface AuthorBylineProps {
  authors: AuthorBylineAuthor[];
  className?: string;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AuthorByline({ authors, className }: AuthorBylineProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {authors.map((author, i) => (
        <div key={author.id} className="flex items-center gap-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-1 focus-visible:ring-offset-surface-page"
              >
                <Avatar className="h-6 w-6">
                  {author.avatarSrc ? (
                    <AvatarImage src={author.avatarSrc} alt={author.name} />
                  ) : null}
                  <AvatarFallback>{initials(author.name)}</AvatarFallback>
                </Avatar>
                <span className="font-nav text-xs uppercase tracking-[0.12em] text-text-strong hover:text-accent-prime">
                  {author.name}
                </span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  {author.avatarSrc ? (
                    <AvatarImage src={author.avatarSrc} alt={author.name} />
                  ) : null}
                  <AvatarFallback>{initials(author.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-title text-base font-bold leading-tight text-text-strong">
                    {author.name}
                  </p>
                  <p className="mt-0.5 font-nav text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">
                    {author.role}
                  </p>
                </div>
              </div>
              {author.bio ? (
                <p className="mt-3 font-body text-sm leading-relaxed text-text-muted">
                  {author.bio}
                </p>
              ) : null}
              <div className="mt-3 flex items-center gap-2">
                <Badge variant={author.lane} size="sm">
                  {author.lane}
                </Badge>
                {author.modelAttribution ? (
                  <span className="font-code text-[0.625rem] text-text-muted">
                    {author.modelAttribution}
                  </span>
                ) : null}
              </div>
            </HoverCardContent>
          </HoverCard>
          {i < authors.length - 1 ? (
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
