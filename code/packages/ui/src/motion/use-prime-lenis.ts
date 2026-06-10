"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Lenis scroll-smooth hook with reduced-motion guard.
 *
 * If `prefers-reduced-motion: reduce`: Lenis does NOT initialize; native
 * browser scroll is preserved. Otherwise, Lenis takes over with Prime
 * editorial-register defaults (longer easing, gentler wheel multiplier
 * — calibrated for reading flow, not page-app interactions).
 *
 * Mount once at the page-shell level (typically the article surface).
 *
 * Returns the Lenis instance (or null when reduced-motion) so consumers
 * can invoke `.scrollTo()` programmatically (e.g., chapter rail jumps).
 */
export function usePrimeLenis(options?: ConstructorParameters<typeof Lenis>[0]): void {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) return; // honor reduced-motion floor — no smooth scroll

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9, // gentler than default 1.0; reading register
      ...options,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [reduced, options]);
}
