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
    browser: {
      enabled: true,
      provider: "playwright",
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});
