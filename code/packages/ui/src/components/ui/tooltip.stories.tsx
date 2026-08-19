import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from "./tooltip";

/**
 * Storybook 9 stories for the Tooltip primitive (F5; thin Radix wrapper).
 *
 * All stories mount inside TooltipProvider (Prime defaults: 300ms
 * delayDuration, 200ms skipDelayDuration) via a meta decorator, matching the
 * provider composition the vitest suite exercises. The `.prime-tooltip__*`
 * class hooks are wired at ROOF — the contentScaffold below is
 * story-scaffolding only (token-only surface so the floating hint is
 * reviewable), not shipped chrome. TooltipPortal is exported but omitted
 * here on purpose: portaled content escapes the preview's
 * [data-prime-cycle] wrapper and would break the cycle stories.
 */

/** Story scaffolding — token-only surface for the ROOF-unstyled content. */
const contentScaffold: CSSProperties = {
  maxWidth: "16rem",
  padding: "0.5rem 0.75rem",
  backgroundColor: "var(--surface-inset)",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
  fontSize: "0.75rem", // 12px — the smallest legible size (DESIGN.md type rule 2)
  lineHeight: 1.5,
};

const meta: Meta<typeof Tooltip> = {
  title: "Primitives / Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Thin Radix Tooltip wrapper. Prime defaults (source header): 300ms delayDuration — time to settle on the hovered element without flashing on transit, mirroring NYT Mag in-text glossary timing; 200ms skipDelayDuration between adjacent triggers. Class hooks `.prime-tooltip__{part}` are wired at ROOF.",
      },
    },
  },
  argTypes: {
    defaultOpen: { control: { type: "boolean" } },
    delayDuration: {
      control: { type: "number", min: 0, max: 2000, step: 50 },
    },
    disableHoverableContent: { control: { type: "boolean" } },
  },
  args: {
    defaultOpen: true,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/** Shared composition: an in-text glossary hint on an editorial term. */
const glossaryHint: Story["render"] = (args) => (
  <Tooltip {...args}>
    <TooltipTrigger>Cell Proof</TooltipTrigger>
    <TooltipContent style={contentScaffold}>
      The governed demonstration that a Prime citizen completes real recurring
      work — the proof the engine passed.
    </TooltipContent>
  </Tooltip>
);

export const Default: Story = {
  render: glossaryHint,
  parameters: {
    docs: {
      description: {
        story:
          "The in-text glossary use that the source's timing comment cites — a wayfinding hint on an editorial term, held open via `defaultOpen` for review.",
      },
    },
  },
};

export const ClosedIdle: Story = {
  args: { defaultOpen: false },
  render: glossaryHint,
  parameters: {
    docs: {
      description: {
        story:
          "Resting state — hover the trigger and settle for the 300ms Prime delay before the hint reveals; adjacent triggers reuse the 200ms skip window.",
      },
    },
  },
};

export const WithArrow: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>Provenance</TooltipTrigger>
      <TooltipContent style={contentScaffold}>
        Editorial · AI-led — every record carries its source and status.
        {/* Arrow fill matches the scaffold surface; shipped fill lands at ROOF. */}
        <TooltipArrow style={{ fill: "var(--surface-inset)" }} />
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The exported TooltipArrow anchors the hint to its trigger — composed inside TooltipContent per the Radix contract.",
      },
    },
  },
};

export const PlacementMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(10rem, 1fr))",
        gap: "5rem",
        padding: "4rem 2rem",
      }}
    >
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} defaultOpen>
          <TooltipTrigger>{side} hint</TooltipTrigger>
          <TooltipContent side={side} style={contentScaffold}>
            Wayfinding hint — {side} placement.
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All four `side` placements from the TooltipContent prop surface, side by side — sideOffset holds the Prime default of 6.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: glossaryHint,
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the hint surface re-resolves to the walnut study's inset — warm-cream ink at whisper scale over lamplit ground, the rail-edge rule holding the boundary.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: glossaryHint,
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: the hint reads as restrained HUD marginalia — a faint rule and an inset barely lifted from the void, ember-and-gold held in reserve.",
      },
    },
  },
};
