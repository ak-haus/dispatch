import type { Preview } from "@storybook/react-vite";
import React from "react";

/**
 * Prime DISpatch Storybook 9 — preview config.
 *
 * Loads @prime-dispatch/tokens CSS globally so every story renders against the
 * shipped token truth (S2 engine output — the same tokens.css the microsite
 * ships). The cycle toolbar speaks the CANON cycle language: Dawn / Dusk /
 * Night via [data-prime-cycle] (Light/Blueprint/Black naming is tombstoned —
 * DESIGN.md §Don'ts). The decorator paints the page substrate per active
 * cycle via --surface-page (OQ-4 semantic slot, CD2 §10 Decision 13) —
 * substrate is page-owned, components stay substrate-agnostic (Rule 1).
 */
import "@prime-dispatch/tokens/css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Backgrounds remain available as a toolbar override for explicit
    // per-story background testing. Default is `cycle` — the active cycle
    // paints --surface-page via the decorator below.
    backgrounds: {
      default: "cycle",
      values: [
        { name: "cycle", value: "transparent" },
        { name: "white", value: "#ffffff" },
      ],
    },
    a11y: {
      element: "#storybook-root",
      manual: false,
      // Story-test rail (addon-vitest): a11y violations FAIL the story test.
      // "a11y green" is the S5 acceptance criterion, mechanical not aspirational.
      test: "error",
    },
    layout: "centered",
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    cycle: {
      description:
        "Theme cycle per canon (DESIGN.md §Cycles): Dawn = default vellum substrate. Dusk = chiaroscuro walnut study. Night = true-black void, ember accents.",
      defaultValue: "dawn",
      toolbar: {
        title: "Cycle",
        icon: "circlehollow",
        items: [
          { value: "dawn", title: "Dawn (vellum)" },
          { value: "dusk", title: "Dusk (walnut)" },
          { value: "night", title: "Night (void)" },
        ],
        dynamicTitle: true,
      },
    },
    reducedMotion: {
      description: "prefers-reduced-motion simulation flag",
      defaultValue: "no-preference",
      toolbar: {
        title: "Motion",
        icon: "play",
        items: [
          { value: "no-preference", title: "No preference" },
          { value: "reduce", title: "Reduce" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { cycle, reducedMotion } = context.globals as {
        cycle?: string;
        reducedMotion?: string;
      };
      // Backward-compat: legacy theme globals resolve to canon cycles
      // (light→dawn, blueprint→dusk, black→night) until every story is
      // cycle-native; new stories use globals: { cycle } only.
      const legacy = (context.globals as { theme?: string }).theme;
      const legacyMap: Record<string, string> = {
        light: "dawn",
        blueprint: "dusk",
        dusk: "dusk",
        black: "night",
      };
      const cycleKey = cycle ?? (legacy ? (legacyMap[legacy] ?? "dawn") : "dawn");
      const motionKey = reducedMotion ?? "no-preference";
      return (
        <div
          // Dawn is the :root default — the attribute is only set for
          // dusk/night, matching how the microsite drives the cascade.
          {...(cycleKey === "dawn" ? {} : { "data-prime-cycle": cycleKey })}
          data-prime-reduced-motion={motionKey}
          style={{
            position: "relative",
            backgroundColor: "var(--surface-page)",
            color: "var(--text-strong)",
            minHeight: "320px",
            padding: "3rem",
            transition: "background-color 200ms ease-out, color 200ms ease-out",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
