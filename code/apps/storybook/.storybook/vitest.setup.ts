/**
 * Project-annotation bridge for the story-test rail: every story test renders
 * with the SAME preview context the Storybook app uses (tokens.css import,
 * cycle decorator, a11y parameters) — the test is the story, not a parallel
 * fixture (Storybook AI guidance: verify stories with story tests).
 */
import { afterEach, beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react-vite";
import { MotionGlobalConfig } from "motion";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import * as projectAnnotations from "./preview";

/**
 * Settle discipline for the story rail — the Stage-4 flake law, rail edition.
 *
 * Motion entrances (e.g. AgentTraceCallout's whileInView opacity fade) run
 * ~500ms; the a11y addon's axe scan can sample mid-flight, reading ink at
 * partial opacity blended into the substrate — contrast collapses to a
 * value that varies by sampled frame (observed 1.3–1.6:1 with a different
 * hex each run). The e2e axe helper solved this class at S2 with settle
 * probes; the rail's deterministic equivalent is Motion's own test switch:
 * animations jump straight to their final state, so every scan asserts the
 * settled design target. Reduced-motion stories are unaffected — they
 * verify end states, not tweens.
 */
MotionGlobalConfig.skipAnimations = true;

const annotations = setProjectAnnotations([
  a11yAddonAnnotations,
  projectAnnotations,
]);

beforeAll(annotations.beforeAll);

/**
 * Token-stylesheet readiness guard. The rail shares one browser context
 * (isolate: false) and tokens.css arrives as a vite-injected <style>; if a
 * scan ever ran before it applied, every var()-chained paint would resolve
 * transparent and contrast readings would be meaningless. Poll :root until
 * the sheet is live; the loud timeout keeps genuine tokens breakage a
 * FAILURE, never a skip.
 */
beforeAll(async () => {
  const deadline = Date.now() + 10_000;
  while (
    !getComputedStyle(document.documentElement)
      .getPropertyValue("--text-strong")
      .trim()
  ) {
    if (Date.now() > deadline) {
      throw new Error(
        "tokens.css never applied: :root --text-strong unresolved after 10s — the story rail cannot verify paint without the token sheet",
      );
    }
    await new Promise((r) => setTimeout(r, 25));
  }
});

/**
 * Audit-width guard (F33). The rail's render width is NOT vitest's to set:
 * `@storybook/addon-vitest` calls `page.viewport(1200, 900)` before every
 * story from its own `DEFAULT_VIEWPORT_DIMENSIONS`
 * (dist/vitest-plugin/test-utils, `setViewport`), overriding
 * `browser.viewport` at both the top level and per instance — measured
 * 2026-09-19: a configured 500x900 still rendered at 1200. Only a story's
 * own `parameters.viewport.defaultViewport` changes it.
 *
 * That vendor default is the sole reason the library's width-gated ink is
 * audited at all: 11 gated blocks across 7 components (AgentTraceCallout,
 * CartographyStrip, ChapterRail, ComparisonGrid, PlotChart, PullQuote,
 * SiteNav), the widest at 64rem. 1200 clears it, so the desktop rendering
 * is scanned — by accident, not by declaration. If the vendor ever lowers
 * that number the gates shut and the a11y lane keeps reporting green over
 * ink it can no longer see. This turns the accident into an invariant.
 *
 * It runs afterEach, not beforeEach: setViewport is called inside the
 * addon's own test function, so the width is only real once the story ran.
 */
const WIDEST_GATE_PX = 1024; // 64rem — ChapterRail.css, PullQuote.css

afterEach(() => {
  const width = window.innerWidth;
  if (width < WIDEST_GATE_PX) {
    throw new Error(
      `Story rail audit width regressed: rendered at ${width}px, below the library's widest gate (${WIDEST_GATE_PX}px / 64rem). Width-gated component CSS is now display:none during the a11y scan, so this lane's green no longer covers it. Check @storybook/addon-vitest's DEFAULT_VIEWPORT_DIMENSIONS.`,
    );
  }
});
