"use client";

import { useEffect, useRef } from "react";
import scrollama from "scrollama";
import { useReducedMotion } from "./use-reduced-motion";

/** Offset is normalized to 0..1 in scrollama's strict literal type. */
type DecimalOffset = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
/** Threshold steps in scrollama's intersection-observer model. */
type IntersectionThreshold = 1 | 2 | 3 | 4;

type ScrollamaCallbacks = {
  onStepEnter?: (response: {
    element: HTMLElement;
    index: number;
    direction: "up" | "down";
  }) => void;
  onStepExit?: (response: {
    element: HTMLElement;
    index: number;
    direction: "up" | "down";
  }) => void;
  onStepProgress?: (response: {
    element: HTMLElement;
    index: number;
    progress: number;
  }) => void;
};

type ScrollamaOptions = {
  step: string;
  offset?: DecimalOffset;
  threshold?: IntersectionThreshold;
  progress?: boolean;
  debug?: boolean;
};

/**
 * Prime scrollama hook with reduced-motion guard + cleanup.
 *
 * If `prefers-reduced-motion: reduce`: scrollama is NOT initialized; the
 * page renders without step-driven effects. Callbacks still fire on first
 * mount via static `onStepEnter` to keep state correct.
 *
 * Usage:
 *   usePrimeScrollama(
 *     { step: ".article-chapter", offset: 0.5, progress: true },
 *     {
 *       onStepEnter: ({ element, index }) => setActiveChapter(index),
 *       onStepProgress: ({ progress }) => setProgress(progress),
 *     },
 *   );
 */
export function usePrimeScrollama(
  options: ScrollamaOptions,
  callbacks: ScrollamaCallbacks,
  deps: React.DependencyList = [],
): void {
  const reduced = useReducedMotion();
  const cbRef = useRef(callbacks);
  cbRef.current = callbacks;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) {
      // Reduced-motion: fire onStepEnter once for index 0 so initial state
      // is correct, then no-op.
      const first = document.querySelector<HTMLElement>(options.step);
      if (first && cbRef.current.onStepEnter) {
        cbRef.current.onStepEnter({ element: first, index: 0, direction: "down" });
      }
      return;
    }

    const scroller = scrollama();
    scroller.setup({
      step: options.step,
      offset: (options.offset ?? 0.5) as DecimalOffset,
      threshold: (options.threshold ?? 4) as IntersectionThreshold,
      progress: options.progress ?? false,
      debug: options.debug ?? false,
    });

    if (cbRef.current.onStepEnter) {
      scroller.onStepEnter((response) =>
        cbRef.current.onStepEnter?.(response as never),
      );
    }
    if (cbRef.current.onStepExit) {
      scroller.onStepExit((response) =>
        cbRef.current.onStepExit?.(response as never),
      );
    }
    if (cbRef.current.onStepProgress) {
      scroller.onStepProgress((response) =>
        cbRef.current.onStepProgress?.(response as never),
      );
    }

    const handleResize = () => scroller.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scroller.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, options.step, options.offset, options.threshold, options.progress, ...deps]);
}
