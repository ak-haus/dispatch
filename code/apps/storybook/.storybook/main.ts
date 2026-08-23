import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";

/**
 * Prime DISpatch Storybook 9 — main config.
 *
 * Indexes @prime-dispatch/ui component library across workspace boundary. Story files co-locate
 * with components inside packages/ui/src/components/<layer>/<Name>/<Name>.stories.tsx per
 * per-component-commit discipline (master plan §8.14).
 *
 * Placement rationale: research-derived (c) HYBRID per W3-S-A research.
 *   - Vercel official Turborepo design-system starter precedent
 *   - Storybook RFC #22521 (counter-pattern warning against package-scoped Storybook)
 *   - Future Buildings consume @prime-dispatch/ui via shadcn/ui MCP registry; Storybook is DX
 *     surface, not contract surface (registry JSON has zero Storybook fields)
 */
const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: [
    "../../../packages/ui/src/components/**/*.stories.@(ts|tsx|mdx)",
  ],
  // Real shipped assets (no-placeholder-media law): stories reference the
  // microsite's public/ directly (e.g. /cartography/district.webp).
  staticDirs: ["../../microsite-astro/public"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  /**
   * Story-lane Tailwind compile (A14 — flag F12, the instrument half).
   *
   * Before this, the story lane ran no Tailwind at all: no plugin here, no
   * Tailwind entry in preview.tsx. Components styled with raw utilities
   * rendered bare, and gate #11 baselined the bare render as truth —
   * 18 of 47 story-bearing components, 137 stories (re-verified 2026-08-23).
   *
   * The vocabulary itself is declared in .storybook/tailwind.css; this hook
   * only supplies the engine. The plugin is appended, not prepended: the
   * framework's own React/Vite plugins must resolve the module graph first.
   *
   * This hook is the ONLY place the plugin is declared, and it covers both
   * surfaces. The vitest story-test rail inherits it: addon-vitest builds its
   * Vite config with `presets.apply("viteFinal", {})` and strips only the
   * docgen plugins (`pluginsToIgnore`), so tailwindcss() survives into the
   * rail. Verified 2026-08-23 — 47 files / 354 tests green with no Tailwind
   * plugin in vitest.config.ts. Declaring it there as well would be a second
   * scan per run for no coverage.
   */
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    return config;
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
