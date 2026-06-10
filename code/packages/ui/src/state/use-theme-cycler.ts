"use client";

import { useEffect } from "react";
import { useThemeCyclerStore, type PrimeCycle } from "./theme-cycler";

/**
 * React hook providing typed theme-cycler state + actions.
 * Subscribes only to the cycle slice; setCycle/cycleNext are stable references.
 */
export function useThemeCycler(): {
  cycle: PrimeCycle;
  setCycle: (cycle: PrimeCycle) => void;
  cycleNext: () => void;
} {
  const cycle = useThemeCyclerStore((s) => s.cycle);
  const setCycle = useThemeCyclerStore((s) => s.setCycle);
  const cycleNext = useThemeCyclerStore((s) => s.cycleNext);
  return { cycle, setCycle, cycleNext };
}

/**
 * Side-effect hook that binds the current cycle to the document root's
 * `data-prime-cycle` attribute. Mount once at the app shell level.
 *
 * SSR-safe (no-op on server). On client, complements
 * `themeCyclerBlockingScript()` (which sets the initial value pre-hydration
 * to prevent FOUC) by keeping the attribute synced after user-driven cycle
 * changes.
 */
export function useThemeCyclerDomBinding(): void {
  const cycle = useThemeCyclerStore((s) => s.cycle);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-prime-cycle", cycle);
  }, [cycle]);
}
