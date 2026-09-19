// Prime DISpatch — state primitives
//
// F2 (state) per Stream 1 Vertical Floor Plan 2026-05-11.
// Cross-app state primitives. No app imports them (F41).

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
