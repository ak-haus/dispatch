"use client";

import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reactive boolean: true when the user has requested reduced motion via
 * OS-level accessibility settings. Updates live if the user toggles the
 * preference at runtime.
 *
 * Per CD5 §1 + WCAG 2.1 SC 2.3.3 + FORMULA §1.5: ALL Prime animations
 * must be wrapped behind this hook OR equivalent media query. The
 * `prefers-reduced-motion: no-preference` floor is non-negotiable.
 *
 * SSR-safe: returns `false` (no-preference) on server; updates on client
 * mount. Components rendering motion should check the value AFTER mount
 * to avoid hydration mismatch.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    setReduced(mql.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}
