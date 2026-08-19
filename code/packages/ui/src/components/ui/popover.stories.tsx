import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
} from "./popover";

/**
 * Storybook 9 stories for the Popover primitive (F5 thin Radix wrapper).
 *
 * Prop surface = the exported subcomponents in popover.tsx (Radix
 * pass-through props + the `.prime-popover__content` class hook, wired at
 * ROOF; Content defaults align="center" / sideOffset={6}), corroborated by
 * primitives.test.tsx §Popover — whose provenance-disclosure composition
 * these stories reuse. The /ui register carries no variant props
 * (components.md §9.9); stories cover the exported subcomponents composed
 * realistically.
 *
 * Scaffold styling is story-local stand-in surface (the ROOF-wired class
 * hook ships no CSS yet): rem layout + semantic tokens — --surface-inset for
 * the contained floating slot (Rule 1), --rail-edge for its hairline; no
 * radii (no ratified radius scale).
 *
 * Known limitation: PopoverContent hard-wraps Radix Portal, so the open
 * layer mounts on document.body — outside the preview decorator's
 * [data-prime-cycle] wrapper. Cycle stories render the popover closed and
 * exercise the anchored trigger chrome, which re-resolves correctly.
 */

const triggerScaffold: CSSProperties = {
  padding: "0.5rem 1rem",
  fontSize: "0.875rem",
  background: "transparent",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
  cursor: "pointer",
};

const contentScaffold: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  maxWidth: "20rem",
  padding: "0.75rem 1rem",
  background: "var(--surface-inset)",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
};

const headingScaffold: CSSProperties = {
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const bodyScaffold: CSSProperties = {
  margin: 0,
  fontSize: "0.875rem",
  lineHeight: 1.5,
};

const closeScaffold: CSSProperties = {
  alignSelf: "flex-start",
  padding: "0.375rem 0.75rem",
  fontSize: "0.75rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  background: "transparent",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
  cursor: "pointer",
};

function ProvenanceContent({ sideLabel }: { sideLabel?: string }) {
  return (
    <>
      <strong style={headingScaffold}>
        {sideLabel ? `Provenance · ${sideLabel}` : "Provenance"}
      </strong>
      <p style={bodyScaffold}>
        Editorial · AI-led — drafted by Conductor, reviewed and signed by Lena
        Marchetti. DLDS record appended 2026-08-18.
      </p>
      <PopoverClose style={closeScaffold}>Close</PopoverClose>
    </>
  );
}

const meta: Meta<typeof Popover> = {
  title: "Primitives / Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Thin Radix Popover wrapper (F5): click-anchored disclosure with ARIA dialog semantics and focus return; surface styling arrives via the `.prime-popover__content` class hook wired at ROOF — the /ui register ships behavior, not chrome (components.md §9.9; popover.tsx header). Content portals with align center / sideOffset 6 source defaults.",
      },
    },
  },
  argTypes: {
    defaultOpen: { control: { type: "boolean" } },
    modal: { control: { type: "boolean" } },
  },
  args: {
    defaultOpen: true,
    modal: false,
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger style={triggerScaffold}>Provenance</PopoverTrigger>
      <PopoverContent aria-label="Article provenance" style={contentScaffold}>
        <ProvenanceContent />
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The provenance-disclosure composition from the vitest suite (primitives.test.tsx §Popover): trigger + labeled dialog content + a PopoverClose that returns focus to the trigger.",
      },
    },
  },
};

export const ClosedUntilInvoked: Story = {
  args: { defaultOpen: false },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger style={triggerScaffold}>Provenance</PopoverTrigger>
      <PopoverContent aria-label="Article provenance" style={contentScaffold}>
        <ProvenanceContent />
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Resting state: opens on click / Enter / Space, dismisses on Escape or outside press — the Radix behavior contract, untouched by the wrapper.",
      },
    },
  },
};

export const DetachedAnchor: Story = {
  render: (args) => (
    <Popover {...args}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <PopoverAnchor asChild>
          <p style={{ ...bodyScaffold, letterSpacing: "0.04em" }}>
            EDITORIAL · Lena Marchetti · 2026-08-18
          </p>
        </PopoverAnchor>
        <PopoverTrigger style={triggerScaffold}>Details</PopoverTrigger>
      </div>
      <PopoverContent aria-label="Dateline provenance" style={contentScaffold}>
        <ProvenanceContent />
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "PopoverAnchor detaches positioning from the trigger: the disclosure anchors to the dateline row itself while a separate control opens it — the export's purpose in editorial chrome.",
      },
    },
  },
};

export const PlacementMatrix: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8rem 10rem",
        padding: "6rem 4rem",
      }}
    >
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side} {...args} defaultOpen>
          <PopoverTrigger style={triggerScaffold}>{side}</PopoverTrigger>
          <PopoverContent
            side={side}
            aria-label={`Provenance, ${side} placement`}
            style={contentScaffold}
          >
            <ProvenanceContent sideLabel={side} />
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Radix `side` pass-through at the source's sideOffset 6 — all four placements open side-by-side; collision handling may flip a side near the viewport edge, which is the primitive working as shipped.",
      },
    },
  },
};

export const DuskCycle: Story = {
  args: { defaultOpen: false },
  globals: { cycle: "dusk" },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger style={triggerScaffold}>Provenance</PopoverTrigger>
      <PopoverContent aria-label="Article provenance" style={contentScaffold}>
        <ProvenanceContent />
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the trigger's ink lifts to warm cream and its rail-edge hairline settles into the walnut substrate via the data-prime-cycle cascade — no component-authored variants (Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  args: { defaultOpen: false },
  globals: { cycle: "night" },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger style={triggerScaffold}>Provenance</PopoverTrigger>
      <PopoverContent aria-label="Article provenance" style={contentScaffold}>
        <ProvenanceContent />
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: near-white ink in the restrained HUD register, every semantic token re-resolved through the cascade (Rule 5).",
      },
    },
  },
};
