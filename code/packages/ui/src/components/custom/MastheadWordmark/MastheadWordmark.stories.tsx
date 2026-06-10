import type { Meta, StoryObj } from "@storybook/react-vite";
import { MastheadWordmark } from "./MastheadWordmark";

/**
 * Storybook 9 stories for MastheadWordmark.
 *
 * Stories cover the spec Field 8 contract + Mayor 2026-05-10 three-theme
 * articulation (light / blueprint / black). Each theme story sets globals.theme
 * so the preview decorator paints --surface-page per theme (Rule 2: real CSS
 * theme variants drive visible visual change).
 */

const meta: Meta<typeof MastheadWordmark> = {
  title: "Chrome / MastheadWordmark",
  component: MastheadWordmark,
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

export const LightTheme: Story = {
  globals: { theme: "light" },
  parameters: {
    docs: {
      description: {
        story:
          "City-engineer / drafting-paper register. DIS reads as Atlantic-pigment wine on warm-white paper; patch reads as institutional ink. Validated against NYC City-Planning / Sanborn map register.",
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
          "Aged-paper / illuminated-manuscript register (Cycle 2 Sepia substitution per Phase A verdict). DIS shifts to tonal-stepped lighter wine (#c4544f) on deep sepia substrate; patch reads as warm cream. Anchor: illuminated manuscript madder-lake + sepia-cuttlefish-ink pigment pair (800+ years editorial precedent).",
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
          "Video-game-menu register. DIS shifts to red-glow (#e0556a) on deep near-black (#0c0a08, Cycle 2 Anthropic-ecosystem-warmer adjustment); patch reads as light gray (not pure white) to avoid harsh contrast. Restrained tech, not cyberpunk-neon.",
      },
    },
  },
};

export const ReducedMotionLight: Story = {
  globals: { theme: "light", reducedMotion: "reduce" },
};

export const ReducedMotionBlack: Story = {
  globals: { theme: "black", reducedMotion: "reduce" },
};
