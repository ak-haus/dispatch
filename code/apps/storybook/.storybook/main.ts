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
