import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps, CSSProperties } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";

/**
 * Storybook 9 stories for the HoverCard primitive (F5 thin Radix wrapper).
 *
 * Prop surface = the exported subcomponents in hover-card.tsx: Root with
 * 280ms open / 100ms close delay defaults (settled hover, per the source
 * header), Trigger, and Content with align="center" / sideOffset={8}
 * defaults. The /ui register carries no variant props (components.md §9.9) —
 * stories compose the source header's stated editorial use: inline-link
 * previews on citizen names / agent IDs / district labels, Wikipedia-style.
 *
 * HoverCardContent declares token-mapped Tailwind utilities (w-72 · p-4 ·
 * border-rail-edge · bg-surface-page · text-text-strong); this Storybook app
 * runs no Tailwind pipeline, so the surface scaffold below mirrors those
 * exact utilities inline via the same semantic tokens — a stand-in, not an
 * invention. Content renders WITHOUT a portal (source), so the open card
 * stays inside the [data-prime-cycle] cascade scope and cycle stories can
 * show it open truthfully.
 */

const contentScaffold: CSSProperties = {
  // Mirrors the source's own utilities: w-72 / p-4 / border-rail-edge /
  // bg-surface-page / text-text-strong (inert without a Tailwind pipeline).
  width: "18rem",
  padding: "1rem",
  background: "var(--surface-page)",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
};

const triggerLinkScaffold: CSSProperties = {
  color: "inherit",
  textDecoration: "underline",
  textUnderlineOffset: "0.2em",
  cursor: "pointer",
};

function CitizenPreview() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3rem 1fr",
        gap: "0.75rem",
        alignItems: "start",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: "3rem",
          height: "3rem",
          display: "grid",
          placeItems: "center",
          background: "var(--reflect)",
          fontSize: "0.875rem",
          fontWeight: 700,
        }}
      >
        LM
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <strong style={{ fontSize: "0.875rem" }}>Lena Marchetti</strong>
        {/* Lane chip: editorial pigment — writing-track author preview (Rule 2: lane accents are semantic, justified inline) */}
        <span
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--lane-editorial)",
          }}
        >
          Editorial lane
        </span>
        <span
          style={{
            fontSize: "0.8125rem",
            lineHeight: 1.5,
            color: "var(--text-muted)",
          }}
        >
          Staff writer covering the Editorial District; signs the weekly field
          dispatch.
        </span>
      </div>
    </div>
  );
}

function PreviewComposition(props: ComponentProps<typeof HoverCard>) {
  return (
    <p style={{ maxWidth: "32rem", margin: 0, lineHeight: 1.6 }}>
      The week-three field dispatch was drafted by Conductor and signed by{" "}
      <HoverCard {...props}>
        <HoverCardTrigger asChild>
          <a href="/citizens/lena-marchetti" style={triggerLinkScaffold}>
            Lena Marchetti
          </a>
        </HoverCardTrigger>
        <HoverCardContent style={contentScaffold}>
          <CitizenPreview />
        </HoverCardContent>
      </HoverCard>{" "}
      after the Records Office appended its provenance line.
    </p>
  );
}

const meta: Meta<typeof HoverCard> = {
  title: "Primitives / HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Thin Radix HoverCard wrapper (F5) for inline-link previews on citizen names, agent IDs, and district labels — hover surfaces a card without navigating away (hover-card.tsx header). Source defaults: 280ms open delay (settled hover), 100ms close delay; Content aligns center at sideOffset 8.",
      },
    },
  },
  argTypes: {
    openDelay: { control: { type: "number", min: 0, step: 20 } },
    closeDelay: { control: { type: "number", min: 0, step: 20 } },
    defaultOpen: { control: { type: "boolean" } },
  },
  args: {
    openDelay: 280,
    closeDelay: 100,
    defaultOpen: true,
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: (args) => <PreviewComposition {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Citizen-name preview open in place: avatar block + name + lane chip + bio, anchored to the inline link — the Wikipedia-style preview pop the source header names.",
      },
    },
  },
};

export const SettledHover: Story = {
  args: { defaultOpen: false },
  render: (args) => <PreviewComposition {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Resting state with the source's delay defaults: the card opens only after 280ms of settled hover (or keyboard focus) and lingers 100ms on exit — casual pointer travel across the prose never flashes a card.",
      },
    },
  },
};

export const InstantDelayTuning: Story = {
  args: { defaultOpen: false, openDelay: 0, closeDelay: 0 },
  render: (args) => <PreviewComposition {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Delay props tuned to zero via the Root pass-through — the wrapper's only own opinion is the delay defaults, and both remain overridable per composition.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: (args) => <PreviewComposition {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the open card re-resolves in place — warm-cream ink on the walnut page surface, rail-edge hairline settled into the shadow, the editorial lane chip carrying its lit-ember dusk value through the cascade (Rule 5: no component-authored variants).",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: (args) => <PreviewComposition {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: the preview card reads as a restrained HUD panel — near-white ink, ember-and-gold accents — every token re-resolved by the data-prime-cycle cascade (Rule 5).",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  render: (args) => <PreviewComposition {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Content authors data-state fade surfaces (animate-in / animate-out); under prefers-reduced-motion every vector clamps to static or an opacity-only crossfade within the ratified 200ms cap (motion.reduced-motion.max-duration — RATIFIED STRUCTURAL LOCK).",
      },
    },
  },
};
