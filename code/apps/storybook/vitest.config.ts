/**
 * Storybook story-test rail (ADR-0003 §Stage 5): @storybook/addon-vitest turns
 * every CSF3 story into a real browser render test + a11y check (addon-a11y
 * annotations run inside each story test; preview sets a11y.test = "error" so
 * violations FAIL, not warn — "a11y green" is mechanical, not aspirational).
 *
 * Version alignment verified at wiring time (the ADR's stated precondition):
 * Vitest 4 (Storybook 10's addon-vitest requires ≥4) + Playwright Chromium (repo
 * standard since Build 1).
 * Runs headless Chromium via Vitest browser mode; CI runs it inside the
 * pinned Playwright container, which ships the browser and its system
 * libraries (.github/workflows/storybook.yml).
 */
import path from "node:path";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.join(import.meta.dirname, ".storybook"),
    }),
  ],
  // The story files compile with React's dev JSX runtime, which the dep
  // scanner does not see up front. Discovered mid-run, it triggers a re-optimize
  // and a page reload, and Vitest 4's browser runner does not survive the reload:
  // every file then fails with "Vitest failed to find the runner". Declaring it
  // here is Vitest's own documented remedy for that warning.
  optimizeDeps: {
    include: ["react/jsx-dev-runtime"],
  },
  test: {
    name: "storybook",
    // Rail shape for the 2-core CI runner (both observed 2026-08-18):
    // - fileParallelism false: unbounded per-file browser contexts saturate
    //   the vite server during cold optimize and every import dies with
    //   "Failed to fetch dynamically imported module" before any test runs.
    // - isolate false: with isolation on, EACH file pays a fresh context +
    //   full module-graph fetch (~28s/file accumulated prepare even locally
    //   — a 60-min-plus gate in CI). One shared context, files still serial,
    //   assertions identical; stories unmount between tests and the cycle
    //   decorator cleans its html attributes in its effect cleanup.
    fileParallelism: false,
    isolate: false,
    testTimeout: 30_000,
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});
