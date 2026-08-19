import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetroMapMarker } from "./MetroMapMarker";

/**
 * Storybook 9 stories for MetroMapMarker.
 *
 * Prop surface = MetroMapMarkerProps (component source), corroborated by the
 * F11 vitest suite (circle pair + Civic label; role flips img → button with
 * tabIndex 0 when onActivate is provided). The shipped variant enum is
 * station | interchange | terminus — the CD4 spec Field 2 scaffold rows
 * (article-default / cosmology-layer-*) are W3-deferred and NOT in the prop
 * surface, so no stories are invented for them (DESIGN.md §Don'ts).
 *
 * The component renders an SVG `<g>` and must live inside an SVG parent
 * (CartographyCanvas in production — spec Field 1). The decorator below is a
 * layout-scaffolding stand-in: a plain `<svg>` cropping a window of the
 * 0-1440 × 0-900 canvas coordinate space for legibility.
 */

const meta: Meta<typeof MetroMapMarker> = {
  title: "Patterns / MetroMapMarker",
  component: MetroMapMarker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Graphics-only metro-map wayfinding marker — the \"you are here + neighbors + next-stops\" asset at the article level (CD4 spec Field 1; CD1 Concept 3 metro-map, not pyramid, per DP-Q2 closure). Renders as an SVG group inside a CartographyCanvas parent; the station label carries the asset-locked Civic slot.",
      },
    },
  },
  decorators: [
    (Story) => (
      <svg
        viewBox="0 0 480 192"
        style={{ width: "100%", maxWidth: "30rem" }}
      >
        <Story />
      </svg>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["station", "interchange", "terminus"],
    },
    isCurrent: { control: { type: "boolean" } },
    x: { control: { type: "number" } },
    y: { control: { type: "number" } },
    name: { control: { type: "text" } },
    ariaLabel: { control: { type: "text" } },
    className: { control: false },
    onActivate: { control: false },
  },
  args: {
    x: 96,
    y: 96,
    name: "Buildings Terrace",
    variant: "station",
    isCurrent: false,
  },
};

export default meta;
type Story = StoryObj<typeof MetroMapMarker>;

export const Station: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default `station` variant — the base wayfinding node: institutional-lane ring with sky-low fill and a Civic-slot label (stations are institutional-blue per the CD3 §6 cosmology surfacing noted in the source).",
      },
    },
  },
};

export const Interchange: Story = {
  args: { variant: "interchange", name: "Editorial District" },
  parameters: {
    docs: {
      description: {
        story:
          "`interchange` variant — a step up the ratified radius ladder (8 vs the station's 6), marking a node where lines meet.",
      },
    },
  },
};

export const Terminus: Story = {
  args: { variant: "terminus", name: "Empyrean Terminus" },
  parameters: {
    docs: {
      description: {
        story:
          "`terminus` variant — the largest ring on the radius ladder (10), marking the end of a line.",
      },
    },
  },
};

export const CurrentStation: Story = {
  args: { isCurrent: true, name: "The Letterpress Ledger" },
  parameters: {
    docs: {
      description: {
        story:
          "The active \"you are here\" node — `isCurrent` applies the `--current` state class (spec Field 5 assigns this node the ambient current-node treatment; the marker itself stays page furniture, not spectacle).",
      },
    },
  },
};

export const InteractiveStation: Story = {
  args: {
    onActivate: () => undefined,
    name: "Cartography Substrate",
    ariaLabel:
      "Article: The Cartography Substrate; cosmology: Purgatorio; district: Editorial",
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `onActivate` the group flips role img → button with tabIndex 0 (vitest-verified); Enter/Space activate. The `ariaLabel` arg follows the spec Field 4 per-node link format — article title + cosmology + district — so the a11y run exercises the full announcement contract.",
      },
    },
  },
};

export const VariantMatrix: Story = {
  render: (args) => (
    <>
      <MetroMapMarker
        {...args}
        variant="station"
        x={96}
        y={40}
        name="Letterpress Row"
      />
      <MetroMapMarker
        {...args}
        variant="interchange"
        x={96}
        y={96}
        name="Editorial District"
      />
      <MetroMapMarker
        {...args}
        variant="terminus"
        x={96}
        y={152}
        name="Empyrean Terminus"
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The three ratified variants side-by-side on one canvas — the radius ladder (6 / 8 / 10) reads as the wayfinding hierarchy.",
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
          "Chiaroscuro walnut study: the graphite-blue institutional lane pigment lifts for the dark, the station ring floats on lit-ember substrate warmth, and the Civic label reads as warm-cream ink.",
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
          "True-black void: ember-and-gold restraint — the lane pigment brightens against the void and the marker reads as quiet HUD wayfinding, never neon.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  args: { isCurrent: true },
  parameters: {
    docs: {
      description: {
        story:
          "Spec Field 5 reduced-motion contract: current-node pulse and any inherited cartography flicker are removed — instant state toggles only, inside the ratified reduced-motion structural lock.",
      },
    },
  },
};
