"use client";

import {
  useEffect,
  useRef,
  type DependencyList,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * GSAP context hook with reduced-motion guard + automatic cleanup.
 *
 * Pattern: callers receive a `gsap` instance scoped to a container ref.
 * On unmount, all tweens / timelines / scrollTriggers in the context
 * are reverted via `gsap.context().revert()`.
 *
 * If `prefers-reduced-motion: reduce`: the callback STILL runs (so any
 * non-animation side effects fire) but timelines created via the passed
 * `gsap` instance respect the reduced-motion floor by setting
 * `gsap.defaults({ duration: 0 })` for the context lifetime.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   usePrimeGsap(ref, (g) => {
 *     g.from(".card", { opacity: 0, y: 20, stagger: 0.1 });
 *   });
 */
export function usePrimeGsap<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: (g: typeof gsap) => void,
  deps: DependencyList = [],
): void {
  const reduced = useReducedMotion();
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.defaults({ duration: 0 });
      }
      cbRef.current(gsap);
    }, ref.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
}
