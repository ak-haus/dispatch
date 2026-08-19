import type { Meta, StoryObj } from "@storybook/react-vite";
import { AgentTraceCallout } from "./AgentTraceCallout";

/**
 * Storybook 9 stories for AgentTraceCallout.
 *
 * Prop surface = the exported AgentTraceCalloutProps interface in
 * AgentTraceCallout.tsx (no CD4 spec exists; the source interface is the
 * variant authority). Cycle stories use the canon cycle global
 * (dawn / dusk / night via [data-prime-cycle]).
 */

const meta: Meta<typeof AgentTraceCallout> = {
  title: "Article / AgentTraceCallout",
  component: AgentTraceCallout,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "META-register inline block disclosing agentic authorship at a specific moment in the article — an inverse ink surface carrying component-locked monospace content, the CD1 Concept 1 'peer behind the curtain' marriage made structural. The left border is a lane-semantic accent (construction Rule 2 — lanes are never interchangeable), and the block enters with a small slide+fade so it reads as the system speaking rather than paragraph flow.",
      },
    },
  },
  argTypes: {
    lane: {
      control: { type: "radio" },
      options: ["editorial", "institutional", "dispatch"],
    },
    agent: { control: { type: "text" } },
    model: { control: { type: "text" } },
    invocation: { control: { type: "text" } },
  },
  args: {
    agent: "Conductor agent",
    lane: "dispatch",
    children:
      "The precinct ledger closed at zero discrepancies. I flagged the two amended records for the Mayor's morning review — both amendments carry provenance, and neither touches canon.",
  },
};

export default meta;
type Story = StoryObj<typeof AgentTraceCallout>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dispatch lane (the source default) — agent activity speaking in the trace register, badge naming the acting agent.",
      },
    },
  },
};

export const WithModelAttribution: Story = {
  args: { model: "claude-opus-4-7[1m]" },
  parameters: {
    docs: {
      description: {
        story:
          "Optional `model` attribution string rendered beside the agent badge in the monospace meta voice.",
      },
    },
  },
};

export const WithInvocation: Story = {
  args: {
    model: "claude-opus-4-7[1m]",
    invocation: "tool: ledger.verify",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Optional `invocation` summary — the tool call the trace discloses — tracked-out uppercase after the model string.",
      },
    },
  },
};

export const EditorialLane: Story = {
  args: {
    lane: "editorial",
    agent: "Mayor (human)",
    children:
      "I struck the closing paragraph. The piece earns its ending two beats earlier — let the district records speak for themselves.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Editorial lane accent — writing-track provenance for a human decision surfaced in the trace record.",
      },
    },
  },
};

export const InstitutionalLane: Story = {
  args: {
    lane: "institutional",
    agent: "Debugger agent",
    children:
      "Observed state drift between the published census table and the records office source. Amendment filed; the article body now reads from the amended record.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Institutional lane accent — system observations about institutional content and records.",
      },
    },
  },
};

export const WithInlineCode: Story = {
  args: {
    children: (
      <>
        The bridge emits cycles at the root — <code>data-prime-cycle</code>{" "}
        drives the cascade, and components stay substrate-agnostic. No component
        authors its own theme variant.
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Inline `code` inside the trace content picks up the translucent inset treatment defined on the content slot.",
      },
    },
  },
};

export const LaneMatrix: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <AgentTraceCallout {...args} lane="dispatch" agent="Conductor agent" />
      <AgentTraceCallout {...args} lane="institutional" agent="Debugger agent" />
      <AgentTraceCallout {...args} lane="editorial" agent="Mayor (human)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The three lane accents side-by-side. Lanes are semantic channels — dispatch for agent activity, institutional for records, editorial for the writing track — never interchangeable (Rule 2).",
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
          "Chiaroscuro walnut study: the inverse META surface re-resolves through the semantic tokens — warm-cream ink and lit-ember lane accents against the walnut substrate. The component authors no theme variants; the cascade does the work (Rule 5).",
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
          "True-black void: ember-and-gold accents in the restrained HUD register. The trace block's surface and lane pigments re-resolve at bridge level via the data-prime-cycle cascade — ONE OKLCH per lane.",
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
          "Simulates prefers-reduced-motion via the toolbar global — the verification surface for the ratified reduced-motion floor: the slide+fade entrance must clamp to static or an opacity-only crossfade.",
      },
    },
  },
};
