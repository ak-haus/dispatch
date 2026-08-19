import type { Meta, StoryObj } from "@storybook/react-vite";
import { PullQuote } from "./PullQuote";

/**
 * Storybook 9 stories for PullQuote.
 *
 * No CD4 spec exists for this component — the exported TypeScript interface
 * in PullQuote.tsx is the sole variant authority: the three ratified lanes
 * (editorial / institutional / dispatch) plus the optional attribution.
 * Cycle stories exercise the [data-prime-cycle] cascade only (Rule 5).
 */

const meta: Meta<typeof PullQuote> = {
  title: "Article / PullQuote",
  component: PullQuote,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Oversized Title-serif editorial quote with a lane em-rule above it encoding provenance — editorial by default, institutional or dispatch when the surrounding article warrants (PullQuote.tsx source contract; construction-rules.md Rule 2: lane accents are semantic channels, never interchangeable). Renders no quotation marks by register and reveals on viewport intersection with a subtle y-offset (Motion v12).",
      },
    },
  },
  argTypes: {
    lane: {
      control: { type: "radio" },
      options: ["editorial", "institutional", "dispatch"],
    },
    attribution: { control: { type: "text" } },
    children: { control: { type: "text" } },
  },
  args: {
    lane: "editorial",
    attribution: "Charter Notes, Dispatch 02",
    children:
      "A city is a promise kept in public — every ordinance a sentence, every ledger line a paragraph, every district a chapter someone agreed to govern.",
  },
};

export default meta;
type Story = StoryObj<typeof PullQuote>;

export const Default: Story = {};

export const InstitutionalLane: Story = {
  args: {
    lane: "institutional",
    attribution: "Prime Constitution, commentary",
    children:
      "Authority that cannot be audited is not authority; it is weather.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Institutional provenance — the graphite-blue lane em-rule marks constitution-adjacent and governance content (Rule 2 lane semantics).",
      },
    },
  },
};

export const DispatchLane: Story = {
  args: {
    lane: "dispatch",
    attribution: "Masthead note",
    children:
      "The magazine is not coverage of the city. It is the city, filing its own record.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dispatch provenance — the wine lane em-rule is dispatch-precious (the named failure mode is wine as chrome wallpaper); deploy only for dispatch-typed content.",
      },
    },
  },
};

export const WithoutAttribution: Story = {
  args: {
    attribution: undefined,
    children:
      "Every hire is a public act; every public act is a page in the record.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Attribution is optional on the source interface — the figcaption is omitted entirely when absent.",
      },
    },
  },
};

export const LaneMatrix: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <PullQuote {...args} lane="editorial" attribution="Editorial desk" />
      <PullQuote
        {...args}
        lane="institutional"
        attribution="Institutional record"
      />
      <PullQuote {...args} lane="dispatch" attribution="Dispatch wire" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All three ratified lanes side-by-side — one OKLCH per lane, semantically distinct, never interchangeable (Rule 2).",
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
          "Dusk — the chiaroscuro walnut study: warm-cream ink for the quote body, the lane em-rule re-resolving to its lit-ember articulation over the darkened substrate. The component authors no theme variants; tokens re-resolve via the [data-prime-cycle] cascade (Rule 5).",
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
          "Night — the true-black void: ember-and-gold accents in the restrained HUD register, near-white quote ink. Cycle articulation lives entirely at bridge level (Rule 5).",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  parameters: {
    docs: {
      description: {
        story:
          "Reduced-motion simulation: under prefers-reduced-motion the viewport reveal must clamp to static or an opacity-only crossfade of at most the ratified 200ms cap (motion.reduced-motion.max-duration, RATIFIED STRUCTURAL LOCK).",
      },
    },
  },
};
