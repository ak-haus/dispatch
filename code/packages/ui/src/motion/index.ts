// Prime DISpatch — motion primitives
//
// F6 (animation) per Stream 1 Vertical Floor Plan 2026-05-11.
// All animation primitives wrap their underlying library with a
// reduced-motion floor per CD5 §1 + WCAG 2.1 SC 2.3.3.

export { useReducedMotion } from "./use-reduced-motion";
export { PrimeMotionConfig, PRIME_DEFAULT_TRANSITION } from "./motion-config";
export { usePrimeGsap } from "./use-prime-gsap";
export { usePrimeLenis } from "./use-prime-lenis";
export { usePrimeAutoAnimate } from "./use-prime-auto-animate";
export { usePrimeScrollama } from "./use-prime-scrollama";
export { LenisRoot } from "./LenisRoot";

// Re-export Motion v12 primitives so apps consume from one place.
export { motion, AnimatePresence, useAnimate, useInView } from "motion/react";
