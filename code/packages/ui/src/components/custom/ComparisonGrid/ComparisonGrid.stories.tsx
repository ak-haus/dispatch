import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComparisonGrid, type ComparisonGridItem } from "./ComparisonGrid";

/**
 * Storybook 9 stories for ComparisonGrid.
 *
 * No CD4 spec exists for this component — the exported TypeScript interfaces
 * in ComparisonGrid.tsx are the sole variant authority: per-item variant is
 * editorial / institutional / dispatch / default / muted (the Badge + lane
 * top-bar key off the same value). Cycle stories exercise the
 * [data-prime-cycle] cascade only (Rule 5).
 */

const defaultItems: ComparisonGridItem[] = [
  {
    id: "keep-ledger",
    verb: "KEEP",
    variant: "institutional",
    title: "The civic ledger",
    description:
      "Every position, hire, and ruling stays on the append-only record — the audit trail is the constitution's enforcement arm.",
  },
  {
    id: "retire-cron",
    verb: "RETIRE",
    variant: "muted",
    title: "Task-shaped automations",
    description:
      "Standalone task runners leave the register; occupations replace automations district by district.",
  },
  {
    id: "replace-gateway",
    verb: "REPLACE",
    variant: "editorial",
    title: "The single relay desk",
    description:
      "One gateway yields to lane-routed desks, so editorial, institutional, and dispatch traffic each carry their own provenance.",
  },
];

const meta: Meta<typeof ComparisonGrid> = {
  title: "Article / ComparisonGrid",
  component: ComparisonGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "3-up (or N-up) editorial card grid for stating shape — default usage is KEEP / RETIRE / REPLACE topology inventories in infrastructure dispatches (ComparisonGrid.tsx source contract). Each card carries a lane-semantic top-bar and verb Badge keyed to the item's variant (construction-rules.md Rule 2), with a staggered reveal on viewport intersection (Motion v12).",
      },
    },
  },
  argTypes: {
    items: { control: { type: "object" } },
  },
  args: {
    items: defaultItems,
  },
};

export default meta;
type Story = StoryObj<typeof ComparisonGrid>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The canonical KEEP / RETIRE / REPLACE inventory — one verb card per topology decision, lane variants encoding each item's provenance.",
      },
    },
  },
};

export const VariantMatrix: Story = {
  args: {
    items: [
      {
        id: "variant-editorial",
        verb: "EDITORIAL",
        variant: "editorial",
        title: "Writing-track marker",
        description: "Terracotta lane — editorial-register content.",
      },
      {
        id: "variant-institutional",
        verb: "INSTITUTIONAL",
        variant: "institutional",
        title: "Governance marker",
        description: "Graphite-blue lane — institutional content.",
      },
      {
        id: "variant-dispatch",
        verb: "DISPATCH",
        variant: "dispatch",
        title: "Dispatch-typed marker",
        description: "Wine lane — dispatch-precious, never wallpaper.",
      },
      {
        id: "variant-default",
        verb: "DEFAULT",
        variant: "default",
        title: "Ink-neutral card",
        description: "Strong-ink bar for lane-unaffiliated items.",
      },
      {
        id: "variant-muted",
        verb: "MUTED",
        variant: "muted",
        title: "Recessive card",
        description: "Rail-edge bar for retired or de-emphasized items.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "All five ratified item variants side-by-side — the three semantic lanes plus the ink-neutral default and the recessive muted articulation (the exact union on ComparisonGridItem).",
      },
    },
  },
};

export const WithBodyContent: Story = {
  args: {
    items: [
      {
        id: "keep-ledger-detail",
        verb: "KEEP",
        variant: "institutional",
        title: "The civic ledger",
        description: "The append-only record stays.",
        children: (
          <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.6 }}>
            <li>Every ruling carries provenance</li>
            <li>History lives out-of-band, never inline</li>
          </ul>
        ),
      },
      {
        id: "replace-gateway-detail",
        verb: "REPLACE",
        variant: "editorial",
        title: "The single relay desk",
        description: "Lane-routed desks take over.",
        children: (
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            Migration runs district by district; the old relay is tombstoned
            once the last desk goes live.
          </p>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Items may carry an optional children slot rendered into the card content area (ComparisonGridItem.children on the source interface).",
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
          "Dusk — the chiaroscuro walnut study: warm-cream card ink and lit-ember lane bars over the darkened substrate, copper wayfinding gilded. The component authors no theme variants; the [data-prime-cycle] cascade re-resolves every token (Rule 5).",
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
          "Night — the true-black void: ember-and-gold lane bars in the restrained HUD register, near-white ink. Cycle articulation lives entirely at bridge level (Rule 5).",
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
          "Reduced-motion simulation: under prefers-reduced-motion the staggered reveal must clamp to static or an opacity-only crossfade of at most the ratified 200ms cap (motion.reduced-motion.max-duration, RATIFIED STRUCTURAL LOCK).",
      },
    },
  },
};
