import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlotChart, type PlotChartPoint } from "./PlotChart";

/**
 * Storybook 9 stories for PlotChart.
 *
 * No CD4 spec exists for this component — the exported PlotChartProps
 * interface is the only variant authority. `kind` carries exactly one
 * ratified variant ("line-with-area"); no invented variants (DESIGN.md
 * §Don'ts). Cycle stories are cycle-native via globals.cycle
 * (data-prime-cycle cascade — Rule 5).
 */

/**
 * Deterministic editorial series (no randomness — stable across visual
 * baselines): engine saturation per minute across a Cell Proof run,
 * asymptotically approaching the 95% saturation threshold.
 */
const cellProofSaturation: PlotChartPoint[] = Array.from(
  { length: 25 },
  (_, t) => ({
    t,
    v: Math.round(10 * (96 - 84 * Math.exp(-t / 6) + 3 * Math.sin(t / 2))) / 10,
  }),
);

const meta: Meta<typeof PlotChart> = {
  title: "Article / PlotChart",
  component: PlotChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Observable Plot inline chart for editorial article data — serializable data + a `kind` discriminator so props survive Astro's MDX client-island boundary (component doc). Marks inherit `currentColor`, so the figure re-inks per active cycle; the plot area is a contained `--surface-inset` slot with a `--rail-edge` boundary (construction Rule 1).",
      },
    },
  },
  argTypes: {
    kind: {
      control: { type: "radio" },
      options: ["line-with-area"],
    },
    thresholdY: { control: { type: "number", min: 0, max: 100 } },
    xLabel: { control: { type: "text" } },
    yLabel: { control: { type: "text" } },
    yDomain: { control: { type: "object" } },
    caption: { control: { type: "text" } },
  },
  args: {
    data: cellProofSaturation,
    kind: "line-with-area",
    xLabel: "minute → ",
    yLabel: "↑ saturation %",
    yDomain: [0, 100],
    caption: "Fig. 1 — Engine saturation across the 25-minute Cell Proof run.",
  },
};

export default meta;
type Story = StoryObj<typeof PlotChart>;

export const Default: Story = {};

export const SaturationThreshold: Story = {
  args: {
    thresholdY: 95,
    caption:
      "Fig. 1 — Engine saturation across the Cell Proof run; the dashed rule marks the 95% saturation threshold.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The optional `thresholdY` rule renders as a dashed horizontal reference line at 45% stroke opacity — the editorial 'threshold' annotation from the prop surface.",
      },
    },
  },
};

export const FocusedDomain: Story = {
  args: {
    data: cellProofSaturation.slice(10),
    yDomain: [70, 100],
    thresholdY: 95,
    yLabel: "↑ saturation %",
    caption:
      "Fig. 2 — The final approach: minutes 10–24, y-domain narrowed to the saturation band.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`yDomain` re-scopes the y-axis to a narrower editorial window — here the saturation band — without touching the data contract.",
      },
    },
  },
};

export const Uncaptioned: Story = {
  args: { caption: undefined },
  parameters: {
    docs: {
      description: {
        story:
          "`caption` is optional on the prop surface: with it absent, the figure renders without a figcaption row.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the figure re-inks through currentColor — warm-cream line and area wash over the deepened inset slot, the rail-edge hairline holding the figure boundary against the lamplit substrate.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "True-black void, restrained HUD: the monospace axis labels read as instrument annotation, the chart's warm-cream ink carries the data alone — ember-and-gold accents stay reserved for markers, never the chart chrome.",
      },
    },
  },
};
