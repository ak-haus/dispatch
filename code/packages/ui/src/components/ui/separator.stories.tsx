import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { Separator } from "./separator";

/**
 * Storybook 9 stories for the Separator primitive (F5; thin Radix wrapper).
 *
 * NOTE (Storybook-app quirk): the Storybook app has no Tailwind pipeline —
 * `@prime-dispatch/tokens/css` ships custom properties only — so the
 * primitive's own `bg-rail-edge h-px w-full` utilities are inert here. The
 * inline style below MIRRORS those shipped classes token-for-token
 * (rail-edge hairline, 1px). It invents nothing; the microsite's Tailwind
 * compile is the styling source of truth.
 */

const hairlineStyle = (
  orientation: "horizontal" | "vertical" | undefined,
): CSSProperties =>
  orientation === "vertical"
    ? {
        width: "1px",
        alignSelf: "stretch",
        minHeight: "1rem",
        backgroundColor: "var(--rail-edge)",
      }
    : { height: "1px", width: "100%", backgroundColor: "var(--rail-edge)" };

const meta: Meta<typeof Separator> = {
  title: "Primitives / Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "1px hairline in rail-edge tone (theme-cycle responsive) — the same micro-grid hairline family as the body's 10px + 40px hairlines per inspo/dispatch-brief.md (source header). Thin Radix wrapper; decorative by default (role=none), semantic via `decorative={false}`.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    decorative: { control: { type: "boolean" } },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

/** Shared editorial composition: a section break between prose paragraphs. */
const editorialBreak: Story["render"] = (args) => (
  <div
    style={{
      width: "24rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}
  >
    <p style={{ margin: 0 }}>
      The Cell Proof closed its loop: a citizen filed real recurring work, and
      the ledger held.
    </p>
    <Separator {...args} style={hairlineStyle(args.orientation)} />
    <p style={{ margin: 0 }}>
      Next edition: how the Position, not the prompt, carries the mandate.
    </p>
  </div>
);

export const Default: Story = {
  render: editorialBreak,
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span>Editorial Desk</span>
      <Separator {...args} style={hairlineStyle("vertical")} />
      <span>Prime · Cell Proof</span>
      <Separator {...args} style={hairlineStyle("vertical")} />
      <span>18 Aug 2026</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dateline metadata row — vertical hairlines segment sibling metadata inline, the same rail-edge family rotated.",
      },
    },
  },
};

export const Semantic: Story = {
  args: { decorative: false },
  render: editorialBreak,
  parameters: {
    docs: {
      description: {
        story:
          "`decorative={false}` — Radix exposes role=separator with aria-orientation to assistive tech instead of the default role=none. Use when the break carries document structure, not just visual rhythm.",
      },
    },
  },
};

export const HairlineFamily: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "24rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span>Horizontal — section break</span>
        <Separator {...args} orientation="horizontal" style={hairlineStyle("horizontal")} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span>Vertical — inline segmenting</span>
        <Separator {...args} orientation="vertical" style={hairlineStyle("vertical")} />
        <span>same rail-edge tone</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Both orientations side by side — one hairline family, one token (rail-edge), per the micro-grid pattern the source header cites.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: editorialBreak,
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: warm-cream ink over the deep walnut substrate, the rail-edge hairline re-resolving as a pressed rule under lamplight. Lit-ember and gilded-copper accents belong to wayfinding — never to rules.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: editorialBreak,
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: the hairline holds as the quietest line in the restrained HUD register. Ember-and-gold stays reserved — a rule is a boundary signal, not an accent.",
      },
    },
  },
};
