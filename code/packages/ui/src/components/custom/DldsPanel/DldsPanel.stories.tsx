import type { Meta, StoryObj } from "@storybook/react-vite";
import { DldsPanel } from "./DldsPanel";

/**
 * Storybook 9 stories for DldsPanel — Disclosed-Lane Drift-Sensing panel.
 *
 * Matrix bounded by the CD4 spec (representation/visual-system/components/
 * DldsPanel/spec.md Fields 2–4 + Field 8) and the exported prop surface in
 * DldsPanel.tsx (variant / lane / authorship / driftSensitivity /
 * c2paAttached). Cycle stories drive the canon [data-prime-cycle] cascade
 * via the `cycle` toolbar global (dawn / dusk / night). The spec's
 * `c2pa-attached` variant row is implemented in source as the `c2paAttached`
 * boolean; the C2paAttached story keeps the spec Field 8 name while driving
 * the shipped prop.
 */

const meta: Meta<typeof DldsPanel> = {
  title: "Chrome / DldsPanel",
  component: DldsPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Disclosed-Lane Drift-Sensing metadata band: lane swatch + lane name, authorship attribution per the voice/lane-schema ai_role taxonomy, optional drift-sensitivity flag and C2PA badge (CD4 spec Fields 1–2). Reads in the Meta-code register per CD1 Concept 1 typeface containment; substrate-agnostic root per construction Rule 1.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "inline-disclosure",
        "expanded-provenance",
        "meta-opener-prominent",
        "narrative-opener-restrained",
      ],
    },
    lane: {
      control: { type: "radio" },
      options: ["editorial", "institutional", "dispatch"],
    },
    driftSensitivity: {
      control: { type: "radio" },
      options: ["stable", "monitored", "drift-detected"],
    },
    c2paAttached: { control: { type: "boolean" } },
    authorship: { control: { type: "object" } },
  },
  args: {
    variant: "inline-disclosure",
    lane: "editorial",
    authorship: { citizen: "Imogen Hartley", aiRole: "human-led-AI-assisted" },
    driftSensitivity: "stable",
    c2paAttached: false,
  },
};

export default meta;
type Story = StoryObj<typeof DldsPanel>;

export const InlineDisclosure: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default variant (spec Field 2): lane + authorship inline; the band renders on every article's metadata band.",
      },
    },
  },
};

export const ExpandedProvenance: Story = {
  args: { variant: "expanded-provenance", c2paAttached: true },
  parameters: {
    docs: {
      description: {
        story:
          "Full provenance visible inline (spec Field 2: user-toggled or article opt-in for full transparency). The detail block shifts to the Body slot below the Meta-code band — the CD1 Concept 5 META × NARRATIVE register marriage in one component.",
      },
    },
  },
};

export const C2paAttached: Story = {
  args: { c2paAttached: true },
  parameters: {
    docs: {
      description: {
        story:
          "C2PA content credentials present (spec Field 2 `c2pa-attached` row, shipped as the `c2paAttached` prop): the badge joins the band with its own accessible label per spec Field 4.",
      },
    },
  },
};

export const MetaOpenerProminent: Story = {
  args: { variant: "meta-opener-prominent", c2paAttached: true },
  parameters: {
    docs: {
      description: {
        story:
          "Rendered inside MetaArticleOpener (spec Field 2): the full panel steps up in scale for the META opener's metadata band.",
      },
    },
  },
};

export const NarrativeOpenerRestrained: Story = {
  args: {
    variant: "narrative-opener-restrained",
    driftSensitivity: "monitored",
    c2paAttached: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Rendered inside NarrativeArticleOpener (spec Field 2): minimal lane indicator + authorship only. Drift-sensitivity and C2PA are passed here to demonstrate the suppression — provenance details defer to the article-end footer per spec §5.2.",
      },
    },
  },
};

export const LaneEditorial: Story = {
  args: { lane: "editorial" },
  parameters: {
    docs: {
      description: {
        story:
          "Editorial lane — terracotta pigment swatch (`--lane-editorial`); writing-track content per the DESIGN.md lane table.",
      },
    },
  },
};

export const LaneInstitutional: Story = {
  args: {
    lane: "institutional",
    authorship: { citizen: "T. Okonkwo", aiRole: "AI-led-human-supervised" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Institutional lane — graphite-blue pigment swatch (`--lane-institutional`); institutional content and cosmology-position markers per the DESIGN.md lane table.",
      },
    },
  },
};

export const LaneDispatch: Story = {
  args: {
    lane: "dispatch",
    authorship: { citizen: "R. Calloway", aiRole: "human-only" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dispatch lane — the wine accent swatch (`--lane-dispatch` → `--accent-prime`); dispatch-typed markers only, wordmark-precious per construction Rule 2.",
      },
    },
  },
};

export const LaneMatrix: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DldsPanel {...args} lane="editorial" />
      <DldsPanel {...args} lane="institutional" />
      <DldsPanel {...args} lane="dispatch" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The three canon lanes side-by-side — ONE pigment per lane, semantically distinct and never interchangeable (construction Rule 2; DESIGN.md §Colors).",
      },
    },
  },
};

export const DriftLadder: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DldsPanel {...args} driftSensitivity="stable" />
      <DldsPanel {...args} driftSensitivity="monitored" />
      <DldsPanel {...args} driftSensitivity="drift-detected" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Drift-sensitivity ordinal from the prop surface: stable rests in muted meta ink, monitored steps up to copper wayfinding, drift-detected escalates to the dispatch accent.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  args: { driftSensitivity: "monitored", c2paAttached: true },
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the band's meta ink re-resolves to warm cream, lane pigments read as lit-ember accents, and the monitored drift flag picks up gilded copper — all through the [data-prime-cycle] cascade. The component authors no theme variants (construction Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  args: { driftSensitivity: "drift-detected", c2paAttached: true },
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: the metadata band reads as restrained HUD — ember-and-gold accents over the void, lane pigments and drift ink at their night resolutions via the cascade.",
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
          "Spec Field 4 reduced-motion contract: disclosure expand/collapse becomes an instant appearance-toggle. The v0 band renders statically; this story holds the flag so no transition sneaks in when the disclosure motion lands.",
      },
    },
  },
};
