import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReadingProgress } from "./ReadingProgress";

const meta: Meta<typeof ReadingProgress> = {
  title: "Chrome / ReadingProgress",
  component: ReadingProgress,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Hairline reading-progress chrome — 3px linear bar with transparent track + dispatch-wine fill. Article-only affordance per CD1 Concept 7 sanctuary. Stories use `inline` mode for in-flow display; production renders fixed at viewport top.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["linear-bar", "typographic-percentage", "hidden"],
    },
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    inline: { control: { type: "boolean" } },
  },
  args: {
    variant: "linear-bar",
    progress: 35,
    inline: true,
  },
};

export default meta;
type Story = StoryObj<typeof ReadingProgress>;

export const LinearBar: Story = {};

export const LinearBarHalfway: Story = {
  args: { progress: 50 },
};

export const LinearBarNearComplete: Story = {
  args: { progress: 92 },
};

export const TypographicPercentage: Story = {
  args: { variant: "typographic-percentage", inline: true, progress: 47 },
};

export const Hidden: Story = {
  args: { variant: "hidden" },
};

export const LightTheme: Story = {
  globals: { theme: "light" },
  args: { progress: 60 },
  parameters: {
    docs: {
      description: {
        story:
          "Drafting-paper register: wine fill reads as cosmology-pigment slice over the page. Anchor: Medium / Substack reading-progress conventions.",
      },
    },
  },
};

export const DuskTheme: Story = {
  globals: { theme: "dusk" },
  args: { progress: 60 },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk / sepia register: dispatch-lane brighter-wine (#c4544f) gradient fill reads as illuminated-pigment slice over aged-paper substrate. Drafting-grid track pattern intentionally restricted to Light theme to avoid texture competition with parchment substrate.",
      },
    },
  },
};

export const BlackTheme: Story = {
  globals: { theme: "black" },
  args: { progress: 60 },
  parameters: {
    docs: {
      description: {
        story:
          "Video-game register: dispatch-lane red-glow (#e0556a) fill reads as HUD progress slice over deep near-black.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { theme: "light", reducedMotion: "reduce" },
  args: { progress: 30 },
};
