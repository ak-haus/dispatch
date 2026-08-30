"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import type { HTMLAttributes, ReactElement } from "react";
import "./ReadingProgress.css";
import { useReducedMotion } from "../../../motion/use-reduced-motion";

/**
 * ReadingProgress — hairline reading-progress chrome.
 *
 * Self-driving via GSAP ScrollTrigger when `autoTrack` is true (default).
 * Pass an explicit `progress` to override; useful in Storybook.
 *
 * Honors prefers-reduced-motion: ScrollTrigger does NOT initialize when set;
 * the bar stays at progress=0 (or controlled value).
 *
 * Spec: representation/visual-system/components/ReadingProgress/spec.md
 */

type ReadingProgressVariant = "linear-bar" | "typographic-percentage" | "hidden";

export type ReadingProgressProps = {
  variant?: ReadingProgressVariant;
  /** Controlled override. If omitted and autoTrack=true, drives from scroll. */
  progress?: number;
  /** Drive progress from scroll using GSAP ScrollTrigger. Defaults to true. */
  autoTrack?: boolean;
  /** Selector for the element to track progress against. Defaults to document.body. */
  trackSelector?: string;
  /** Inline rendering (Storybook / debug). */
  inline?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "children">;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

let scrollTriggerRegistered = false;

export function ReadingProgress(props: ReadingProgressProps): ReactElement | null {
  const {
    variant = "linear-bar",
    progress: controlledProgress,
    autoTrack = true,
    trackSelector,
    inline = false,
    className,
    ...rest
  } = props;

  const reduced = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledProgress != null) return; // controlled mode wins
    if (!autoTrack) return;
    if (reduced) return; // honor reduced-motion floor
    if (typeof window === "undefined") return;

    if (!scrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRegistered = true;
    }

    const trigger = ScrollTrigger.create({
      trigger: trackSelector ?? "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(Math.round(self.progress * 100));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [controlledProgress, autoTrack, trackSelector, reduced]);

  if (variant === "hidden") return null;

  const effective = controlledProgress != null ? controlledProgress : scrollProgress;
  const clamped = clamp(Math.round(effective), 0, 100);

  const cls = clsx(
    "prime-reading-progress",
    variant === "typographic-percentage" && "prime-reading-progress--typographic",
    inline && "prime-reading-progress--inline",
    className,
  );

  return (
    <div
      ref={barRef}
      className={cls}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      {...rest}
    >
      <span
        className="prime-reading-progress__fill"
        style={{ width: `${clamped}%` }}
      />
      {variant === "typographic-percentage" ? (
        <span className="prime-reading-progress__label">{clamped}%</span>
      ) : null}
    </div>
  );
}
