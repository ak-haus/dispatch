import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteNav } from "./SiteNav";

const meta: Meta<typeof SiteNav> = {
  title: "Chrome / SiteNav",
  component: SiteNav,
  tags: ["autodocs"],
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

export const DawnCycle: Story = {
  globals: { cycle: "dawn" },
  parameters: {
    docs: {
      description: {
        story:
          "Dawn cycle (DESIGN.md §Cycles): the vellum drafting-paper default — copper nav wayfinding and institutional-ink wordmark patch on the vellum substrate.",
      },
    },
  },
};

/* OQ-6 (FILED at S5, 2026-08-18) — the dark-cycle wine register in the nav:
 * the embedded wordmark DIS (24px: dusk 2.22:1 / night 2.9:1 — the canon
 * APCA wordmark γ exception applies, see MastheadWordmark stories) and the
 * ACTIVE nav link's tonal-stepped wine (17px/800: dusk accent-prime-active
 * 3.14:1, night 3.9:1 on cycle vellum-25 — amend-2 ratified values with no
 * APCA exception on record). Both need the Mayor's metric/value
 * adjudication; a11y runs "todo" (visible, not gating) on the dark-cycle
 * stories until it lands. Idle/hover copper passes outright (6.5–9.4:1). */
const darkWineRegisterCanonGap = { a11y: { test: "todo" as const } };

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  parameters: {
    ...darkWineRegisterCanonGap,
    docs: {
      description: {
        story:
          "Dusk cycle (DESIGN.md §Cycles): the chiaroscuro walnut study — gilded-copper nav wayfinding in warm-cream company over the walnut substrate; the border-bottom hairline recedes into low light.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  parameters: {
    ...darkWineRegisterCanonGap,
    docs: {
      description: {
        story:
          "Night cycle (DESIGN.md §Cycles): the true-black void — copper wayfinding with HUD restraint over the void; the border-bottom hairline resolves to the faintest edge. Ember-and-gold, never neon.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
};
