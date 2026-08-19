/**
 * Project-annotation bridge for the story-test rail: every story test renders
 * with the SAME preview context the Storybook app uses (tokens.css import,
 * cycle decorator, a11y parameters) — the test is the story, not a parallel
 * fixture (Storybook AI guidance: verify stories with story tests).
 */
import { beforeAll } from "vitest";
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
