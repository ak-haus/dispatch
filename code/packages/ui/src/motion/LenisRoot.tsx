"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Prime LenisRoot — page-shell smooth-scroll mount.
 *
 * Mount ONCE at the root of every surface (PrimeLayout for Astro pages,
 * RootLayout for Next.js pages). Honors prefers-reduced-motion at runtime:
 * if reduced-motion is set, Lenis does not initialize and native scroll
 * is preserved.
 *
 * Editorial-register Lenis defaults:
 *   - duration: 1.2 (long, reading-paced; not app-snappy)
 *   - wheelMultiplier: 0.9 (gentler than default)
 *   - easing: expo-out curve (decisive but smooth)
 *
 * Renders nothing — pure side-effect component.
 */
export function LenisRoot(): null {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return null;
}
