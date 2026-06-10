import { themeCycler } from "./theme-cycler";

/**
 * FOUC-prevention pattern (per Vercel/shadcn theme-toggle reference).
 *
 * Returns a synchronous JavaScript snippet to inject in the HTML <head>
 * BEFORE body renders. Reads the persisted Zustand cycle from localStorage
 * (key: `prime-cycle`) and applies it as `data-prime-cycle` on the document
 * root SYNCHRONOUSLY — eliminating flash-of-default-cycle.
 *
 * Defensive defaults:
 *   - Falls back to default cycle on any localStorage read / JSON parse
 *     failure (private-browsing, corrupted state, version skew).
 *   - Validates the parsed value against the canonical cycle enum; unknown
 *     values fall back to default.
 *
 * Usage (Astro):
 *   <script set:html={themeCyclerBlockingScript()} />
 *
 * Usage (Next.js RSC):
 *   <script dangerouslySetInnerHTML={{ __html: themeCyclerBlockingScript() }} />
 */
export function themeCyclerBlockingScript(): string {
  const valid = JSON.stringify(themeCycler.CYCLE_ORDER);
  const key = JSON.stringify(themeCycler.STORAGE_KEY);
  const fallback = JSON.stringify(themeCycler.DEFAULT_CYCLE);
  return (
    `(function(){try{` +
    `var raw=localStorage.getItem(${key});` +
    `var parsed=raw?JSON.parse(raw):null;` +
    `var c=parsed&&parsed.state&&parsed.state.cycle;` +
    `if(${valid}.indexOf(c)===-1){c=${fallback};}` +
    `document.documentElement.setAttribute('data-prime-cycle',c);` +
    `}catch(e){` +
    `document.documentElement.setAttribute('data-prime-cycle',${fallback});` +
    `}})();`
  );
}
