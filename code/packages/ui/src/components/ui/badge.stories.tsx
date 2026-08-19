import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

/**
 * Storybook 9 stories for the Badge primitive (F5; shadcn-canonical +
 * DLDS lane-coded).
 *
 * The cva surface defines exactly six variants (default / editorial /
 * institutional / dispatch / outline / muted) and two sizes (default / sm) —
 * the source header maps the lane variants to DLDS provenance semantics
 * (Hybrid / Human-led / AI-led) via the three lane pigments. No further
 * variants exist (DESIGN.md §Don'ts: no invented variants beyond a
 * component's spec).
 */

const meta: Meta<typeof Badge> = {
  title: "Primitives / Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DLDS chip / byline lane marker / small categorical signal (source header). Lane variants consume the three lane pigments as semantically distinct channels — never interchangeable, per construction rule 2.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "default",
        "editorial",
        "institutional",
        "dispatch",
        "outline",
        "muted",
      ],
    },
    size: {
      control: { type: "radio" },
      options: ["default", "sm"],
    },
    children: { control: { type: "text" } },
  },
  args: {
    variant: "default",
    size: "default",
    children: "Hybrid",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default variant — strong-ink fill; here as a DLDS provenance chip (Hybrid).",
      },
    },
  },
};

export const EditorialLane: Story = {
  args: { variant: "editorial", children: "Editorial" },
  parameters: {
    docs: {
      description: {
        story:
          "Editorial lane pigment (terracotta channel) — editorial-register content and writing-track markers.",
      },
    },
  },
};

export const InstitutionalLane: Story = {
  args: { variant: "institutional", children: "Institutional" },
  parameters: {
    docs: {
      description: {
        story:
          "Institutional lane pigment (graphite-blue channel) — institutional content and cosmology-position markers.",
      },
    },
  },
};

export const DispatchLane: Story = {
  args: { variant: "dispatch", children: "Dispatch" },
  parameters: {
    docs: {
      description: {
        story:
          "Dispatch lane pigment — the wine channel is dispatch-precious; deploy only where the semantics are genuinely dispatch-typed (construction rule 2).",
      },
    },
  },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Week 12" },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal-chrome variant: rail-edge hairline, transparent fill, strong ink (construction rule 6 — when in doubt, less chrome).",
      },
    },
  },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Archive" },
  parameters: {
    docs: {
      description: {
        story:
          "Muted variant on the inset surface — low-emphasis categorical signals.",
      },
    },
  },
};

export const SmallSize: Story = {
  args: { size: "sm", children: "AI-led" },
  parameters: {
    docs: {
      description: {
        story: "The compact `sm` size for dense metadata rows.",
      },
    },
  },
};

export const VariantMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
        maxWidth: "28rem",
      }}
    >
      <Badge>Hybrid</Badge>
      <Badge variant="editorial">Editorial</Badge>
      <Badge variant="institutional">Institutional</Badge>
      <Badge variant="dispatch">Dispatch</Badge>
      <Badge variant="outline">Week 12</Badge>
      <Badge variant="muted">Archive</Badge>
      <Badge size="sm">Human-led</Badge>
      <Badge variant="dispatch" size="sm">
        AI-led
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All six ratified variants plus both sizes side by side, labeled as the DLDS provenance chips and lane markers the source header names.",
      },
    },
  },
};

export const DuskCycle: Story = {
  args: { variant: "dispatch", children: "Dispatch" },
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: the lane pigments lift for the darkened ground through the [data-prime-cycle] cascade (one OKLCH per lane; the component authors no theme variants — construction rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  args: { variant: "dispatch", children: "Dispatch" },
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: ember-and-gold accents in the restrained HUD register; the same semantic tokens re-resolve at bridge level (construction rule 5).",
      },
    },
  },
};
