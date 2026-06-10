import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteNav } from "./SiteNav";

const meta: Meta<typeof SiteNav> = {
  title: "Chrome / SiteNav",
  component: SiteNav,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top-of-page chrome BAND. Substrate-agnostic — host paints the page bg. Border-bottom hairline + horizontal slot layout carry the structure. Copper-default nav per W2-S-F Mayor-locked smoke-test (cc-ledger/diffs/W2-S-F/smoke-test/index.html).",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["reception", "article", "compact-mobile"],
    },
    mobileMenuOpen: { control: { type: "boolean" } },
    paletteOpen: { control: { type: "boolean" } },
  },
  args: {
    variant: "reception",
    mobileMenuOpen: false,
    paletteOpen: false,
    links: [
      { label: "Articles", href: "/articles", isActive: true },
      { label: "Archive", href: "/archive" },
      { label: "About", href: "/about" },
      { label: "Subscribe", href: "/subscribe" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SiteNav>;

export const Reception: Story = {};

export const Article: Story = {
  args: {
    variant: "article",
    links: [{ label: "Back to DISpatch", href: "/" }],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Article-mode hides the SearchPalette trigger per CD1 Concept 7 (article-as-sanctuary). Nav-link set compresses to a single back-link.",
      },
    },
  },
};

export const CompactMobile: Story = {
  args: { variant: "compact-mobile" },
};

export const MobileMenuExpanded: Story = {
  args: { variant: "compact-mobile", mobileMenuOpen: true },
};

export const PaletteOpen: Story = {
  args: { paletteOpen: true },
};

export const LightTheme: Story = {
  globals: { theme: "light" },
  parameters: {
    docs: {
      description: {
        story:
          "Light/city-engineer register: copper nav + dark wordmark patch on drafting-paper substrate. Validated against Sanborn map / NYC City-Planning visual identity register.",
      },
    },
  },
};

export const DuskTheme: Story = {
  globals: { theme: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk / sepia register (Cycle 2 substitution per Phase A verdict). Warm copper nav (candlelight gilt) on aged-paper substrate; wine-tinted masthead-band rule on top. Anchor: illuminated manuscript marginalia + Vatican-archive reading room atmosphere.",
      },
    },
  },
};

export const BlackTheme: Story = {
  globals: { theme: "black" },
  parameters: {
    docs: {
      description: {
        story:
          "Video-game-menu register: muted copper on deep near-black; subtle border-bottom (rail-edge resolves to a dark grid line). Restrained tech, not cyberpunk-neon.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { theme: "light", reducedMotion: "reduce" },
};
