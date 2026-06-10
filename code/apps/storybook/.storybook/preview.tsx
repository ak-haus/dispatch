import type { Preview } from "@storybook/react-vite";
import React from "react";

/**
 * Prime DISpatch Storybook 9 — preview config.
 *
 * Loads @prime-dispatch/tokens CSS globally so every story renders against the
 * canonical post-amendment CD2 state + three-theme variants (light / dusk /
 * black per Mayor 2026-05-10 articulation + Cycle 2 Sepia substitution per
 * cc-ledger/diffs/W3-S-A/cycle-2/agent-4-blueprint-wine-verdict.md).
 *
 * The decorator PAINTS the page substrate per active theme + LAYERS the
 * atmospheric texture overlay (Cycle 2 Sub-pass 5.1) via `::before` pseudo-
 * element. Texture lives on the HOST substrate, NOT inside components (Rule 1
 * honored).
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
    // Backgrounds remain available as toolbar override for explicit per-story
    // background testing. Default is `theme` — the active theme paints
    // --surface-page via the decorator below.
    backgrounds: {
      default: "theme",
      values: [
        { name: "theme", value: "transparent" },
        { name: "white", value: "#ffffff" },
        { name: "drafting-paper", value: "#fafaf7" },
        { name: "sepia-dusk", value: "#3a2a1c" },
        { name: "video-game-black", value: "#0c0a08" },
      ],
    },
    a11y: {
      element: "#storybook-root",
      manual: false,
    },
    layout: "centered",
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    theme: {
      description:
        "Theme variant per Mayor 2026-05-10 three-theme articulation + Cycle 2 Sepia substitution. Light = city-engineer map / drafting paper. Dusk = aged paper / illuminated manuscript (sepia). Black = video-game menu / cosmology HUD.",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light (city-engineer)" },
          { value: "dusk", title: "Dusk (sepia / aged paper)" },
          { value: "black", title: "Black (video-game)" },
        ],
        dynamicTitle: true,
      },
    },
    reducedMotion: {
      description: "prefers-reduced-motion media query simulation",
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
      const { theme, reducedMotion } = context.globals as {
        theme?: string;
        reducedMotion?: string;
      };
      // Backward-compat: any leftover "blueprint" story-globals resolve to "dusk"
      const themeKey = theme === "blueprint" ? "dusk" : (theme ?? "light");
      const motionKey = reducedMotion ?? "no-preference";
      return (
        <div
          data-prime-theme={themeKey}
          data-prime-reduced-motion={motionKey}
          style={{
            position: "relative",
            backgroundColor: "var(--surface-page)",
            color: "var(--text-strong)",
            minHeight: "320px",
            padding: "3rem",
            transition: "background-color 200ms ease-out, color 200ms ease-out",
            // Texture overlay (Cycle 2 Sub-pass 5.1) — applied via background-image
            // on the wrapper itself; texture-overlay variable resolves per theme
            // (paper-grain / parchment / HUD-grid). Sits behind story content
            // because pseudo-elements + transform-stacking get tricky in
            // Storybook's iframe; using background-image on the wrapper is the
            // robust deployment surface.
            backgroundImage: "var(--texture-overlay)",
            backgroundBlendMode: "multiply",
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
