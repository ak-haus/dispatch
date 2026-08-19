import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveTicker, type LiveTickerEntry } from "./LiveTicker";

/**
 * Storybook 9 stories for LiveTicker — the reception offices-window
 * (spec.md Field 1; CD1 Concept 7 "what's happening in the offices").
 *
 * Variant matrix covers EXACTLY the shipped source union
 * (compact | expanded | marquee — LiveTicker.tsx). State stories come
 * from the shipped prop surface: `limit` (stream slicing) and per-entry
 * `href` (anchor rendering). Cycle stories use the canon cycle global
 * (dawn / dusk / night via the [data-prime-cycle] cascade).
 */

const now = Date.now();
const minutesAgo = (minutes: number): Date => new Date(now - minutes * 60_000);

/** Realistic offices-feed fixture — most-recent-first per the prop contract. */
const officesFeed: LiveTickerEntry[] = [
  {
    id: "lt-01",
    kind: "commit",
    text: "feat(cartography): landmark hints replace district polygons",
    at: minutesAgo(4),
  },
  {
    id: "lt-02",
    kind: "deploy",
    text: "dispatchmag.dev production deploy — token drift gate green",
    at: minutesAgo(19),
  },
  {
    id: "lt-03",
    kind: "dispatch",
    text: "Dispatch · Week 3 filed from the Editorial District",
    at: minutesAgo(47),
  },
  {
    id: "lt-04",
    kind: "signal",
    text: "Signal 004 — reception window opens onto the atlas corner",
    at: minutesAgo(112),
  },
  {
    id: "lt-05",
    kind: "agent",
    text: "Agent-of-record reconciled the register ledger",
    at: minutesAgo(178),
  },
  {
    id: "lt-06",
    kind: "commit",
    text: "chore(tokens): re-point chrome slots per the S5 census",
    at: minutesAgo(260),
  },
];

const linkedHrefs = ["/dispatch/week-3", "/signals/004", "/atlas"];
const linkedFeed: LiveTickerEntry[] = officesFeed
  .slice(0, 3)
  .map((entry, index) => ({ ...entry, href: linkedHrefs[index] }));

const meta: Meta<typeof LiveTicker> = {
  title: "Chrome / LiveTicker",
  component: LiveTicker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reception offices-window — a META-register live stream of commit, deploy, dispatch, signal, and agent activity (spec.md Field 1; CD1 Concept 7). The root is a substrate-agnostic `aria-live=\"polite\"` region announcing additions only (spec Field 4; construction Rule 1), with AutoAnimate entry transitions guarded by the reduced-motion contract.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["compact", "expanded", "marquee"],
    },
    ariaLabel: { control: { type: "text" } },
    limit: { control: { type: "number", min: 1, max: 12 } },
    entries: { control: { type: "object" } },
  },
  args: {
    variant: "compact",
    ariaLabel: "Live updates from Prime",
    entries: officesFeed,
  },
};

export default meta;
type Story = StoryObj<typeof LiveTicker>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dawn default on the vellum drafting-paper substrate — the compact offices-window as the homepage reception renders it.",
      },
    },
  },
};

export const Expanded: Story = {
  args: { variant: "expanded" },
};

export const Marquee: Story = {
  args: { variant: "marquee" },
};

export const LimitedStream: Story = {
  args: { limit: 3 },
  parameters: {
    docs: {
      description: {
        story:
          "`limit` slices the most-recent-first stream — three visible entries from the six-entry feed.",
      },
    },
  },
};

export const LinkedEntries: Story = {
  args: { entries: linkedFeed },
  parameters: {
    docs: {
      description: {
        story:
          "Entries carrying `href` render as anchors — enter on an entry navigates to its expanded detail surface (spec Field 3 keyboard contract).",
      },
    },
  },
};

export const VariantLadder: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <LiveTicker {...args} variant="compact" ariaLabel="Live updates — compact" />
      <LiveTicker {...args} variant="expanded" ariaLabel="Live updates — expanded" />
      <LiveTicker {...args} variant="marquee" ariaLabel="Live updates — marquee" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The three shipped variants side-by-side — compact, expanded, marquee — each labeled distinctly so the region landmarks stay unique.",
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
          "Dusk — the chiaroscuro walnut study: META kind-labels take gilded copper, entry prose reads as warm-cream ink, and lit-ember accents stay whisper-quiet. The offices-window is a window, never a spectacle.",
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
          "Night — the true-black void: the stream reads as restrained HUD telemetry in ember-and-gold, additions arriving without ceremony against the void.",
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
          "Reduced-motion contract (spec Field 4): new entries appear instantly with no flicker — the AutoAnimate guard in usePrimeAutoAnimate disables entry-add easing under prefers-reduced-motion.",
      },
    },
  },
};
