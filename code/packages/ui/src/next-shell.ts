/**
 * Next.js / RSC-friendly surface — Lenis mount + blocking theme script only.
 * Keeps dependency graph minimal vs importing the full motion barrel.
 */
export { LenisRoot } from "./motion/LenisRoot";
export { themeCyclerBlockingScript } from "./state/theme-cycler-blocking-script";
