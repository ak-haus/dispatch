import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReadingProgress } from "./ReadingProgress";

const meta: Meta<typeof ReadingProgress> = {
  title: "Chrome / ReadingProgress",
  component: ReadingProgress,
  tags: ["autodocs"],
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

export const DawnCycle: Story = {
  globals: { cycle: "dawn" },
  args: { progress: 60 },
  parameters: {
    docs: {
      description: {
        story:
          "Dawn cycle (DESIGN.md §Cycles): the vellum drafting-paper default — the dispatch-wine fill reads as a pigment slice over the vellum page. Anchor: Medium / Substack reading-progress conventions.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  args: { progress: 60 },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk cycle (DESIGN.md §Cycles): the chiaroscuro walnut study — the dispatch-lane fill reads as a lit-ember slice over the walnut substrate; the transparent track keeps the chrome receded.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  args: { progress: 60 },
  parameters: {
    docs: {
      description: {
        story:
          "Night cycle (DESIGN.md §Cycles): the true-black void — the dispatch-lane fill reads as an ember slice against the void, held to HUD restraint.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  args: { progress: 30 },
};
