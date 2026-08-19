/**
 * Storybook story-test rail (ADR-0003 §Stage 5): @storybook/addon-vitest turns
 * every CSF3 story into a real browser render test + a11y check (addon-a11y
 * annotations run inside each story test; preview sets a11y.test = "error" so
 * violations FAIL, not warn — "a11y green" is mechanical, not aspirational).
 *
 * Version alignment verified at wiring time (the ADR's stated precondition):
 * Vitest 3.2.7 (≥3) + Playwright Chromium (repo standard since Build 1).
 * Runs headless Chromium via Vitest browser mode; CI installs the browser
 * with `pnpm exec playwright install chromium --with-deps`.
 */
import path from "node:path";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: path.join(import.meta.dirname, ".storybook"),
    }),
  ],
  test: {
    name: "storybook",
    // Serial file execution: on the 2-core CI runner, parallel per-file
    // browser contexts saturate the vite server during cold optimize and
    // every import fails with "Failed to fetch dynamically imported module"
    // before any test runs (observed on the first gate run, 2026-08-18).
    // Serial is deterministic on small runners; coverage is identical.
    fileParallelism: false,
    testTimeout: 30_000,
    browser: {
      enabled: true,
      provider: "playwright",
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});
