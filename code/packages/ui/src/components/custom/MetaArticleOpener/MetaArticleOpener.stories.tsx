import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetaArticleOpener } from "./MetaArticleOpener";

/**
 * Storybook 9 stories for MetaArticleOpener.
 *
 * Story matrix bound by the CD4 spec (representation/visual-system/components/
 * MetaArticleOpener/spec.md): Field 2 variants (default / dataviz-prominent /
 * change-log / post-mortem / compact-mobile), Field 5 reduced-motion contract,
 * plus the canon cycle articulation (Dawn / Dusk / Night via the `cycle`
 * global — [data-prime-cycle] cascade, DESIGN.md §Cycles).
 *
 * No variant matrix story: the component hardcodes `id="meta-opener-title"`
 * and `role="banner"` at its root, so multi-instance renders would produce
 * duplicate ids + duplicate banner landmarks (axe violations per spec Field 4).
 */

/* Dataviz fixture for the research-return variant — composed token-bound
 * marks, not placeholder media. Series pigment = institutional lane: the
 * fixture belongs to an institutional-lane research return, matching the
 * variant's lane-institutional media accent in MetaArticleOpener.css. */
const researchReturnDataviz = (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    <div
      role="img"
      aria-label="Bar chart: citizen task completions per governance cycle, rising from 41 in cycle one to 88 in cycle six"
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "0.5rem",
        height: "6rem",
        borderBottom: "1px solid var(--grid-line)",
      }}
    >
      {[41, 52, 47, 63, 76, 88].map((value, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${value}%`,
            backgroundColor: "var(--lane-institutional)",
          }}
        />
      ))}
    </div>
    {/* Caption sits on the dataviz variant's --window-warm tinted media
      * frame, where label-size --text-muted is 4.41:1 (axe color-contrast,
      * WCAG 1.4.3). F5 discipline, DESIGN.md §Colors: muted-deep covers
      * tinted panels. */}
    <span
      style={{
        fontFamily: "var(--font-code)",
        fontSize: "0.75rem",
        color: "var(--dispatch-text-body-muted-deep)",
      }}
    >
      Fig. 1 — Citizen task completions per governance cycle, Q2–Q3 2026
    </span>
  </div>
);

const meta: Meta<typeof MetaArticleOpener> = {
  title: "Openers / MetaArticleOpener",
  component: MetaArticleOpener,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "META article header — density-prioritized per CD4 spec Field 1: metadata band prominent (DldsPanel `meta-opener-prominent`), tight headline, utilitarian subhead, optional image-or-dataviz above the headline. Opens articles in the META register (CD1 Concept 5 marriage of registers); substrate-agnostic root per construction Rule 1.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "default",
        "dataviz-prominent",
        "change-log",
        "post-mortem",
        "compact-mobile",
      ],
    },
    title: { control: { type: "text" } },
    subtitle: { control: { type: "text" } },
    lane: {
      control: { type: "radio" },
      options: ["editorial", "institutional", "dispatch"],
    },
    authorship: { control: { type: "object" } },
    date: { control: { type: "text" } },
    readMinutes: { control: { type: "number", min: 1, max: 60 } },
    driftSensitivity: {
      control: { type: "radio" },
      options: ["stable", "monitored", "drift-detected"],
    },
    media: { control: false },
  },
  args: {
    variant: "default",
    title: "The Registry Comes Online: Prime's Citizen Ledger Ships",
    subtitle:
      "Every Character, every Position, every hire — recorded with provenance from the first governed run.",
    lane: "institutional",
    authorship: {
      citizen: "The Registry Desk",
      aiRole: "AI-led-human-supervised",
    },
    date: "2026-08-12",
    readMinutes: 6,
    driftSensitivity: "stable",
  },
};

export default meta;
type Story = StoryObj<typeof MetaArticleOpener>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full composition per spec Field 2: metadata band + tight headline + utilitarian subhead. The dispatch-style entry register — most META articles.",
      },
    },
  },
};

export const DatavizProminent: Story = {
  args: {
    variant: "dataviz-prominent",
    title: "Research Return: Six Cycles of Governed Task Throughput",
    subtitle:
      "What the completion ledger says about citizens working under Position contracts.",
    media: researchReturnDataviz,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Research-return article-type (spec Field 2): the dataviz takes hero position above the headline — the META \"data-forward\" signature, framed by the institutional-lane media accent.",
      },
    },
  },
};

export const ChangeLog: Story = {
  args: {
    variant: "change-log",
    title: "Engine 2.3: Position Contracts Land in the Registry",
    subtitle: "Hiring flow, contract amendments, and tombstone records for retired Positions.",
    readMinutes: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Change-log article-type (spec Field 2): metadata band hyper-prominent, headline tighter, image optional.",
      },
    },
  },
};

export const PostMortem: Story = {
  args: {
    variant: "post-mortem",
    title: "Post-mortem: The Forty-Minute Registry Stall of August 9",
    subtitle:
      "A stuck amendment lock, the citizens it idled, and the gate that now makes the stall impossible.",
    lane: "dispatch",
    driftSensitivity: "monitored",
    readMinutes: 8,
  },
  parameters: {
    /* OQ-5 (FILED at S5, 2026-08-18): the hosted DldsPanel __drift--monitored
     * node paints label-size copper on this variant's --window-warm band —
     * no AA-capable copper rung exists on vellum-300 at dawn (copper 2.55:1,
     * copper-label 3.52:1, copper-deep 4.25:1; contrast.test.mjs documents
     * the missing node as a deliberate non-assertion). Fix is Mayor-gated;
     * a11y runs "todo" (visible, not gating) until the adjudication lands. */
    a11y: { test: "todo" },
    docs: {
      description: {
        story:
          "Post-mortem article-type (spec Field 2): metadata band carries incident context under the dispatch-lane accent; tone-of-voice constraint applied per voice library.",
      },
    },
  },
};

export const CompactMobile: Story = {
  args: { variant: "compact-mobile" },
  parameters: {
    docs: {
      description: {
        story:
          "Mobile breakpoint (spec Field 2): metadata stacks vertically; headline scale compresses while the density-prioritized register holds.",
      },
    },
  },
};

export const DriftDetected: Story = {
  args: { driftSensitivity: "drift-detected" },
  parameters: {
    docs: {
      description: {
        story:
          "Drift-sensitivity state from the prop surface: the DldsPanel meta band surfaces `drift-detected`, flagging content whose source-of-truth has moved since publish.",
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
          "Dusk — the chiaroscuro walnut study. The meta band's monospace chrome reads in gilded copper over the walnut substrate; headline ink resolves to warm cream through the [data-prime-cycle] cascade (components never author theme variants — Rule 5).",
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
          "Night — the true-black void. Ember-and-gold accents on the metadata band; restrained HUD register, never neon. All ink resolves through the cycle cascade.",
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
          "Reduced-motion contract (spec Field 5): all motion removed, instant rendering — META is data-forward, not motion-forward; child components inherit their own reduced-motion contracts.",
      },
    },
  },
};
