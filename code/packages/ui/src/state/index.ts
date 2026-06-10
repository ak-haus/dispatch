// Prime DISpatch — state primitives
//
// F2 (state) per Stream 1 Vertical Floor Plan 2026-05-11.
// Cross-app state primitives consumed by both microsite-astro + microsite-next.

export {
  useThemeCyclerStore,
  themeCycler,
  type PrimeCycle,
} from "./theme-cycler";

export {
  useThemeCycler,
  useThemeCyclerDomBinding,
} from "./use-theme-cycler";

export { themeCyclerBlockingScript } from "./theme-cycler-blocking-script";
