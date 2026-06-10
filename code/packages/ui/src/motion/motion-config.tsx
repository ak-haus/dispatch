"use client";

import { MotionConfig, type Transition } from "motion/react";
import type { ReactNode } from "react";

/**
 * Prime Motion v12 default transition (per CD5 §3.1 substrate-breathing).
 *
 * 320ms ease-out: long enough to feel deliberate; short enough not to
 * delay reading flow. Used as the implicit default for any `motion.*`
 * component inside <PrimeMotionConfig>.
 */
export const PRIME_DEFAULT_TRANSITION: Transition = {
  type: "tween",
  duration: 0.32,
  ease: [0.16, 1, 0.3, 1], // ease-out cubic-bezier — Prime motion-curve
};

/**
 * Wraps children in a Motion v12 `MotionConfig` with Prime defaults.
 *
 * Critical: passes `reducedMotion="user"` so Motion v12 respects the
 * OS-level prefers-reduced-motion preference automatically — no per-
 * component reduced-motion guarding required for `motion.*` components.
 *
 * Mount once at the app shell level (outside the per-page tree).
 */
export function PrimeMotionConfig({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={PRIME_DEFAULT_TRANSITION}
    >
      {children}
    </MotionConfig>
  );
}
