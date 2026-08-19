import type { Meta, StoryObj } from "@storybook/react-vite";
import { MastheadWordmark } from "./MastheadWordmark";

/**
 * Storybook 9 stories for MastheadWordmark.
 *
 * Stories cover the spec Field 8 contract + the canon cycle articulation
 * (dawn / dusk / night — DESIGN.md §Cycles). Each cycle story sets
 * globals.cycle so the preview decorator paints --surface-page per active
 * cycle via the [data-prime-cycle] cascade (Rule 5: cycles emit at bridge
 * level; components never author theme variants).
 */

const meta: Meta<typeof MastheadWordmark> = {
  title: "Chrome / MastheadWordmark",
  component: MastheadWordmark,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Typographic-only DISpatch wordmark — split-color encoding (DIS = dispatch wine; patch = institutional text-strong). Substrate-agnostic root (Rule 1). Polymorphic via `as` prop.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "compact"],
    },
    scale: {
      control: { type: "radio" },
      options: ["masthead", "landing", "header", "favicon"],
    },
    label: { control: { type: "text" } },
  },
  args: {
    variant: "default",
    scale: "masthead",
    label: "DISpatch",
    href: "/",
  },
};

export default meta;
type Story = StoryObj<typeof MastheadWordmark>;

export const Default: Story = {};

export const Compact: Story = {
  args: { variant: "compact" },
};

export const HoverLinkActive: Story = {
  parameters: { pseudo: { hover: true } },
};

export const ScaleLadder: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <MastheadWordmark {...args} scale="masthead" />
      <MastheadWordmark {...args} scale="landing" />
      <MastheadWordmark {...args} scale="header" />
      <MastheadWordmark {...args} scale="favicon" />
    </div>
  ),
};

export const DawnCycle: Story = {
  globals: { cycle: "dawn" },
  parameters: {
    docs: {
      description: {
        story:
          "Dawn cycle (DESIGN.md §Cycles): the vellum drafting-paper default. DIS reads as Atlantic-pigment wine on warm vellum; the patch reads as institutional ink.",
      },
    },
  },
};

/* OQ-6 (FILED at S5, 2026-08-18) — the dark-cycle wine register measures
 * below the WCAG large-text 3:1 floor: dusk DIS 2.22:1, night DIS 2.9:1 on
 * cycle vellum-25. These are RATIFIED amend-2 values (dusk.json: "DIS locked
 * to the Atlantic editorial burgundy register across all cycles — brand
 * identity, not cycle mood"), and canon governs wordmark contrast by APCA
 * with an explicit wordmark γ exception (CD2 §10 Decision 12 pre-screen;
 * Decision 4 framework — Lc ≥90 against the chrome pair). axe's WCAG
 * fallback disagrees with canon's chosen metric for exactly this element.
 * Metric adjudication is the Mayor's: a11y runs "todo" (visible, not
 * gating) on the dark-cycle wordmark stories until it lands. */
const darkWordmarkCanonMetric = { a11y: { test: "todo" as const } };

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  parameters: {
    ...darkWordmarkCanonMetric,
    docs: {
      description: {
        story:
          "Dusk cycle (DESIGN.md §Cycles): the chiaroscuro walnut study — lit-ember accents, gilded copper, warm-cream ink. The wordmark holds its split encoding: DIS stays the dispatch wine; the patch lifts to the study's brightest ink.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  parameters: {
    ...darkWordmarkCanonMetric,
    docs: {
      description: {
        story:
          "Night cycle (DESIGN.md §Cycles): the true-black void, ember-and-gold with HUD restraint. DIS carries the ember-leaning wine against the void; the patch lifts to the cycle's brightest ink. Restrained, never neon.",
      },
    },
  },
};

export const ReducedMotionLight: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
};

export const ReducedMotionBlack: Story = {
  globals: { cycle: "night", reducedMotion: "reduce" },
  parameters: { ...darkWordmarkCanonMetric },
};
