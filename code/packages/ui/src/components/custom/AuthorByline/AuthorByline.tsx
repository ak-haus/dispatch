"use client";

import { clsx } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";

import "./AuthorByline.css";

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
    <div className={clsx("prime-author-byline", className)}>
      {authors.map((author, i) => (
        <div key={author.id} className="prime-author-byline__author">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button type="button" className="prime-author-byline__trigger">
                <Avatar className="prime-author-byline__avatar">
                  {author.avatarSrc ? (
                    <AvatarImage src={author.avatarSrc} alt={author.name} />
                  ) : null}
                  <AvatarFallback>{initials(author.name)}</AvatarFallback>
                </Avatar>
                <span className="prime-author-byline__name">{author.name}</span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="prime-author-byline__card-header">
                <Avatar className="prime-author-byline__card-avatar">
                  {author.avatarSrc ? (
                    <AvatarImage src={author.avatarSrc} alt={author.name} />
                  ) : null}
                  <AvatarFallback>{initials(author.name)}</AvatarFallback>
                </Avatar>
                <div className="prime-author-byline__card-identity">
                  <p className="prime-author-byline__card-name">
                    {author.name}
                  </p>
                  <p className="prime-author-byline__card-role">
                    {author.role}
                  </p>
                </div>
              </div>
              {author.bio ? (
                <p className="prime-author-byline__card-bio">{author.bio}</p>
              ) : null}
              <div className="prime-author-byline__card-footer">
                <Badge variant={author.lane} size="sm">
                  {author.lane}
                </Badge>
                {author.modelAttribution ? (
                  <span className="prime-author-byline__model">
                    {author.modelAttribution}
                  </span>
                ) : null}
              </div>
            </HoverCardContent>
          </HoverCard>
          {i < authors.length - 1 ? <span aria-hidden="true">·</span> : null}
        </div>
      ))}
    </div>
  );
}
