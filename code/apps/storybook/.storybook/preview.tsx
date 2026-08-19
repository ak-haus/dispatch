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
// Shared @font-face surface (S1 pre-step): the SAME declarations global.css
// ships, imported across the workspace boundary so stories render the shipped
// faces — /fonts/** URLs resolve via main.ts staticDirs (microsite public/).
// It must ride preview.tsx, not a preview-head.html: BOTH the dev/build HTML
// and the vitest rail read preview annotations; a head file misses the rail.
import "../../microsite-astro/src/styles/fonts.css";
import "./preview.css";

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
      // No explicit context: the addon's default targets the story root in
      // BOTH environments — #storybook-root exists only in the Storybook
      // iframe, not in the vitest browser-mode DOM (axe throws "No elements
      // found for include" there if pinned to it).
      // Story-test rail (addon-vitest): a11y violations FAIL the story test.
      // "a11y green" is the S5 acceptance criterion, mechanical not aspirational.
      test: "error",
    },
    layout: "centered",
    docs: {
      toc: true,
    },
  },
  // SB9 portable-stories path (addon-vitest) merges story-level `globals`
  // over initialGlobals — globalTypes.defaultValue alone is toolbar-only and
  // leaves story globals unapplied in the test rail (probe 2026-08-18:
  // DuskCycle rendered the dawn palette without this).
  initialGlobals: {
    cycle: "dawn",
    reducedMotion: "no-preference",
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
      // The cycle attribute MUST live on <html>, exactly like the shipped
      // microsite (tokens.css: "Selectors: html[data-prime-cycle=…]").
      // Spatial aliases (--window-warm, --surface-page, …) are declared at
      // :root, so they resolve their var() chains AT the html element and
      // descendants inherit the RESOLVED value — a wrapper-div attribute can
      // override the numeric tokens but never re-resolves the aliases
      // (probe 2026-08-18: dusk ink over a dawn --window-warm band).
      React.useEffect(() => {
        const el = document.documentElement;
        if (cycleKey === "dawn") delete el.dataset.primeCycle;
        else el.dataset.primeCycle = cycleKey;
        el.dataset.primeReducedMotion = motionKey;
        return () => {
          delete el.dataset.primeCycle;
          delete el.dataset.primeReducedMotion;
        };
      }, [cycleKey, motionKey]);
      return (
        <div
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
