import type { Meta, StoryObj } from "@storybook/react-vite";
import { InstitutionalFixture } from "./InstitutionalFixture";

/**
 * Storybook 9 stories for InstitutionalFixture — the Paradiso seed-mandate
 * fixture.
 *
 * Matrix bounded by the CD4 spec (representation/visual-system/components/
 * InstitutionalFixture/spec.md Fields 2–4 + Field 8) and the exported prop
 * surface in InstitutionalFixture.tsx (variant / mandate / charterLinkURL /
 * ariaLabel). Cycle stories drive the canon [data-prime-cycle] cascade via
 * the `cycle` toolbar global (dawn / dusk / night). Mandate strings are
 * placeholder editorial prose — the shipped prose is Mayor-articulated per
 * spec Field 10.
 */

const meta: Meta<typeof InstitutionalFixture> = {
  title: "Chrome / InstitutionalFixture",
  component: InstitutionalFixture,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The Paradiso seed-mandate fixture — a quiet typographic anchor rendered identically on every surface, the still point of the publication (CD4 spec Field 1: mode-crossing is intentional uniformity). Title slot at quiet weight on the warm-paper substrate per CD1 Concepts 4 + 6 — the anchor is the charter mandate, never a founding date.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["seed-mandate", "full-charter"],
    },
    mandate: { control: { type: "text" } },
    charterLinkURL: { control: { type: "text" } },
    ariaLabel: { control: { type: "text" } },
  },
  args: {
    variant: "seed-mandate",
    mandate:
      "DISpatch records the civic life of Prime — a governed city where autonomous citizens hold real positions, and the charter, not the clock, gives the work its authority.",
    charterLinkURL: "/charter",
    ariaLabel: "Institutional mandate",
  },
};

export default meta;
type Story = StoryObj<typeof InstitutionalFixture>;

/* OQ-5 (FILED at S5, 2026-08-18) — label-size copper on --window-warm has NO
 * AA-capable canon rung at dawn: copper 2.55:1, copper-label 3.52:1 (its
 * 4.66:1 rating holds on sky-low, not vellum-300), copper-deep 4.25:1 —
 * contrast.test.mjs documents the missing copper-on-window-warm node as a
 * deliberate non-assertion. Every honest fix is Mayor-gated: a new
 * platform-tier rung (CD2 §10 Decision 1 addition gate) or a register
 * re-point across the Decision 12c copper/wine boundary. The charter-link
 * stories run a11y as "todo" — violation stays VISIBLE in the a11y panel,
 * does not gate — until the adjudication lands; then delete this block and
 * the todos re-arm to error. Dusk/night pass outright (8.7–10.2:1). */
const charterLinkCanonGap = { a11y: { test: "todo" as const } };

export const SeedMandate: Story = {
  parameters: {
    ...charterLinkCanonGap,
    docs: {
      description: {
        story:
          "V1 ship variant (spec Field 2): Mayor-articulated seed-mandate prose with the future-arc charter link (placeholder URL until the Paradiso authoring arc completes).",
      },
    },
  },
};

export const FullCharter: Story = {
  args: {
    variant: "full-charter",
    mandate:
      "Prime's charter binds nine spheres of civic responsibility into one mandate: govern openly, record everything with provenance, and hold every position — human or autonomous — to the same standard of public work.",
  },
  parameters: {
    ...charterLinkCanonGap,
    docs: {
      description: {
        story:
          "Post-V1 placeholder (spec Field 2 + Field 8): activates when the Paradiso authoring arc completes; steps up padding and prose scale. The expansion pattern is a W3+ Mayor adjudication — this story holds the slot.",
      },
    },
  },
};

export const MandateOnly: Story = {
  args: { charterLinkURL: undefined },
  parameters: {
    docs: {
      description: {
        story:
          "Without the future-arc charter link the fixture is pure read-only typography — no tab stops (spec Field 3: the prose itself is non-interactive; only the optional link is focusable).",
      },
    },
  },
};

export const CharterLinkHover: Story = {
  parameters: {
    ...charterLinkCanonGap,
    pseudo: { hover: true },
    docs: {
      description: {
        story:
          "The charter link's hover color shift is the fixture's only motion event (spec Field 5): copper wayfinding deepens per the nav interaction ramp.",
      },
    },
  },
};

export const VariantLadder: Story = {
  render: (args) => (
    /* Two fixture landmarks on one canvas: each carries a distinct ariaLabel
     * via the component's existing prop so the landmarks are distinguishable
     * (axe landmark-unique). */
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <InstitutionalFixture
        {...args}
        variant="seed-mandate"
        ariaLabel="Institutional mandate — seed mandate"
      />
      <InstitutionalFixture
        {...args}
        variant="full-charter"
        ariaLabel="Institutional mandate — full charter"
        mandate="Prime's charter binds nine spheres of civic responsibility into one mandate: govern openly, record everything with provenance, and hold every position — human or autonomous — to the same standard of public work."
      />
    </div>
  ),
  parameters: {
    ...charterLinkCanonGap,
    docs: {
      description: {
        story:
          "Both ratified variants side-by-side: identical typographic treatment, full-charter breathing at the larger padding + prose scale (spec Field 7: generous spacing — the fixture has room to breathe).",
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
          "Chiaroscuro walnut study: mandate prose re-inks in warm cream over the deepened warm-paper substrate; the charter link's copper wayfinding reads gilded. The fixture stays the still point — tokens re-resolve through the [data-prime-cycle] cascade, the composition never changes (spec Field 6).",
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
          "True-black void: the fixture holds its printed-anchor register as restrained HUD — quiet ink and ember-and-gold wayfinding over the deepest substrate step, static across the cycle transition per the atmospheric-chrome-not-animated rule (spec Field 5).",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  parameters: {
    ...charterLinkCanonGap,
    docs: {
      description: {
        story:
          "Spec Field 4: no motion to disable — the fixture is static; the charter link's transition drops via the [data-prime-reduced-motion] hook in InstitutionalFixture.css while the hover color state itself is retained (color is not motion).",
      },
    },
  },
};
