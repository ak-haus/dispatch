import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReceptionHero } from "./ReceptionHero";

/**
 * Storybook 9 stories for ReceptionHero.
 *
 * Prop surface = ReceptionHeroProps (ReceptionHero.tsx): slug / title / deck /
 * lane / publishedAt / author / image? / kicker? / className. Spec Field 2
 * coverage: `default-narrative` = Default; `image-prominent` maps to the
 * shipped `image` prop (figure renders below kicker, above title per source);
 * `meta-feature` and `compact-mobile` exist in spec.md only — no shipped prop
 * drives them, so no story (no invented variants, DESIGN.md §Don'ts). The
 * lane union gets one story per pigment plus a side-by-side matrix. Kicker
 * default is formatKicker(publishedAt, lane) — "LANE · YYYY-MM-DD" —
 * corroborated by the f11-components vitest suite.
 */

const meta: Meta<typeof ReceptionHero> = {
  title: "Patterns / ReceptionHero",
  component: ReceptionHero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Feature-story hero at the DISpatch homepage reception (spec.md Field 1; CD1 Concept 7 walking-metaphor + the Mayor's New Yorker glossary-top precedent): a single `<a>`-wrapped preview — kicker eyebrow, optional figure, `<h2>` headline, deck, byline — in the NARRATIVE-prominent register (Title + Body), with the lane driving the kicker pigment.",
      },
    },
  },
  argTypes: {
    lane: {
      control: { type: "radio" },
      options: ["editorial", "institutional", "dispatch"],
    },
    slug: { control: { type: "text" } },
    title: { control: { type: "text" } },
    deck: { control: { type: "text" } },
    author: { control: { type: "text" } },
    publishedAt: { control: { type: "text" } },
    kicker: { control: { type: "text" } },
  },
  args: {
    slug: "cell-proof-first-week",
    title: "The Cell Proof: Prime's First Citizens Clock In",
    deck: "Inside the governed civic layer's first working week — how a Character, a Position, and a constitution add up to an employee you can trust with real work.",
    lane: "editorial",
    publishedAt: "2026-08-12",
    author: "AK ALMoumen",
  },
};

export default meta;
type Story = StoryObj<typeof ReceptionHero>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Spec Field 2 `default-narrative`: kicker eyebrow auto-formatted from publishedAt + lane, headline as `<h2>` (the homepage `<h1>` belongs to the masthead — spec.md Field 1), deck, byline — the front-of-magazine slot.",
      },
    },
  },
};

export const InstitutionalLane: Story = {
  args: {
    slug: "charter-amendment-two",
    title: "Charter Amendment Two Passes the Records Office",
    deck: "The five-verb data law gains its tombstone registry — what the amendment changes for every record filed in Prime.",
    lane: "institutional",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Institutional lane — the graphite-blue channel for institutional content and cosmology-position markers. Lane pigments are semantically distinct, never interchangeable (Rule 2).",
      },
    },
  },
};

export const DispatchLane: Story = {
  args: {
    slug: "dispatch-week-3",
    title: "Dispatch · Week 3: The Cartography Substrate Goes Live",
    deck: "The map beneath the magazine — how the Editorial District came to sit under the prose without ever shouting over it.",
    lane: "dispatch",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dispatch lane — the wine channel, wordmark/dispatch-precious. It marks dispatch-typed content only; wine as chrome wallpaper is the named failure mode (Rule 2).",
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    image: {
      src: "/banners/dispatch-02.webp",
      alt: "Dispatch 02 banner — the editorial district cartography rendered on warm vellum",
      caption: "The Editorial District, as drawn for Dispatch 02.",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "The shipped image slot (spec Field 2 `image-prominent` lineage): a `<figure>` with alt text and optional caption renders below the kicker, above the headline. Real asset from the microsite public tree — placeholder media is banned on launch-ready code (DESIGN.md §Don'ts).",
      },
    },
  },
};

export const KickerOverride: Story = {
  args: {
    kicker: "SPECIAL DISPATCH · CHARTER WEEK",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `kicker` prop replaces the formatted lane-dateline eyebrow for special editions; the lane still drives the kicker pigment.",
      },
    },
  },
};

export const LaneMatrix: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {(["editorial", "institutional", "dispatch"] as const).map((lane) => (
        <ReceptionHero
          {...args}
          key={lane}
          lane={lane}
          slug={`${args.slug}-${lane}`}
          // Each hero is a <section aria-labelledby> region landmark named by
          // its title; three landmarks sharing one accessible name violate
          // axe landmark-unique. The lane suffix keeps each region's name
          // unique via the existing title prop (matrix restructure, not a
          // component change).
          title={`${args.title} — ${lane} lane`}
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The three lane pigments side-by-side on near-identical content — isolating the semantic channel: terracotta editorial, graphite-blue institutional, wine dispatch. ONE OKLCH per lane, applied as a local accent, never a page gradient (color.md §4 Decision 5). Each hero's title carries a lane suffix so the three region landmarks keep unique accessible names (axe landmark-unique).",
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
          "Dusk — the chiaroscuro walnut study: warm-cream ink over the darkened substrate, the lane kicker re-resolving to its lit-ember articulation through the [data-prime-cycle] cascade. The component authors no theme variant (Rule 5).",
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
          "Night — the true-black void: headline and deck read near-white in the restrained HUD register, ember-and-gold accents held for the lane mark. Tokens re-resolve at bridge level; the component stays cycle-blind (Rule 5).",
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
          "Spec Field 5 reduced-motion contract: hero hover reveal and any image scale removed — instant rendering. The shipped composition is static markup; the contract clamps whatever hover motion the CSS layer adds.",
      },
    },
  },
};
