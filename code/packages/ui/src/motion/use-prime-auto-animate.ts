"use client";

import { useEffect, useRef } from "react";
import autoAnimate, { type AutoAnimateOptions } from "@formkit/auto-animate";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * AutoAnimate hook with reduced-motion guard.
 *
 * Pattern (mirrors @formkit/auto-animate/react's `useAutoAnimate`):
 *   const [parent] = usePrimeAutoAnimate<HTMLUListElement>();
 *   return <ul ref={parent}>{items.map(...)}</ul>;
 *
 * If `prefers-reduced-motion: reduce`: AutoAnimate is configured with
 * `disrespectUserMotionPreference: false` (the default). It will NOT
 * animate — children swap instantly. This is the desired behavior for
 * reduced-motion: preserve the layout transitions but skip the easing.
 */
export function usePrimeAutoAnimate<T extends HTMLElement>(
  options?: Partial<AutoAnimateOptions>,
): [React.RefObject<T | null>, (enabled: boolean) => void] {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const controllerRef = useRef<{ enable: () => void; disable: () => void } | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const controller = autoAnimate(ref.current, {
      duration: 250,
      easing: "ease-out",
      disrespectUserMotionPreference: false,
      ...options,
    });
    controllerRef.current = controller;
    if (reduced) controller.disable();
    return () => {
      controllerRef.current = null;
    };
  }, [reduced, options]);

  const setEnabled = (enabled: boolean) => {
    if (enabled) controllerRef.current?.enable();
    else controllerRef.current?.disable();
  };

  return [ref, setEnabled];
}
