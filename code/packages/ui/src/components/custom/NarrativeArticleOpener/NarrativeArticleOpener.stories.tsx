import type { Meta, StoryObj } from "@storybook/react-vite";
import { NarrativeArticleOpener } from "./NarrativeArticleOpener";

/**
 * Storybook 9 stories for NarrativeArticleOpener.
 *
 * Story matrix bound by the CD4 spec (representation/visual-system/components/
 * NarrativeArticleOpener/spec.md): Field 2 variants (default /
 * epigraph-prominent / drop-cap / image-absent / compact-mobile), Field 5
 * reduced-motion contract, plus the canon cycle articulation (Dawn / Dusk /
 * Night via the `cycle` global — [data-prime-cycle] cascade, DESIGN.md
 * §Cycles).
 *
 * No variant matrix story: the component hardcodes
 * `id="narrative-opener-title"` and `role="banner"` at its root, so
 * multi-instance renders would produce duplicate ids + duplicate banner
 * landmarks (axe violations per spec Field 4).
 */

const meta: Meta<typeof NarrativeArticleOpener> = {
  title: "Openers / NarrativeArticleOpener",
  component: NarrativeArticleOpener,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "NARRATIVE article header — whitespace-prioritized per CD4 spec Field 1: optional epigraph above a spacious headline, italicized standfirst, media below-or-absent, restrained chrome BELOW the standfirst (CD1 Concept 7 article-as-sanctuary — the opener does not perform; the reader arrives). Substrate-agnostic root per construction Rule 1.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "default",
        "epigraph-prominent",
        "drop-cap",
        "image-absent",
        "compact-mobile",
      ],
    },
    epigraph: { control: { type: "text" } },
    title: { control: { type: "text" } },
    standfirst: { control: { type: "text" } },
    lane: {
      control: { type: "radio" },
      options: ["editorial", "institutional", "dispatch"],
    },
    authorship: { control: { type: "object" } },
    date: { control: { type: "text" } },
    media: { control: false },
  },
  args: {
    variant: "default",
    title: "The Week the Registry Learned to Forget",
    standfirst:
      "On tombstones, purges, and why a city that remembers everything can never be trusted with anything.",
    lane: "editorial",
    authorship: {
      citizen: "M. Halloran",
      aiRole: "human-led-AI-assisted",
    },
    date: "2026-08-14",
  },
};

export default meta;
type Story = StoryObj<typeof NarrativeArticleOpener>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full composition per spec Field 2: spacious headline + italicized standfirst + restrained chrome below the standfirst. The developer-diary register — most NARRATIVE articles; epigraph and image both optional.",
      },
    },
  },
};

export const EpigraphProminent: Story = {
  args: {
    variant: "epigraph-prominent",
    epigraph:
      "“The ledger is the city's memory; the citizen is its will.” — Founding Charter of Prime, Article I",
    title: "What a Charter Owes Its Citizens",
    standfirst:
      "A register-statement on the promises Prime writes down before it hires anyone to keep them.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Literary citation as opening (spec Field 2): the epigraph renders prominently above the headline at enlarged scale, setting reader-mood before the title lands.",
      },
    },
  },
};

export const DropCap: Story = {
  args: { variant: "drop-cap" },
  parameters: {
    docs: {
      description: {
        story:
          "Literary opening (spec Field 2): the standfirst's first letter renders as a drop-cap in the Title slot at display scale, per article preference.",
      },
    },
  },
};

export const ImageAbsent: Story = {
  args: { variant: "image-absent" },
  parameters: {
    docs: {
      description: {
        story:
          "Pure-prose articles (spec Field 2 — most developer-diary entries): no image; the opener is purely typographic.",
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
          "Mobile breakpoint (spec Field 2): the spacious scale compresses slightly while whitespace priority holds within the constraint.",
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
          "Dusk — the chiaroscuro walnut study. Headline and standfirst ink resolve to warm cream over the walnut substrate; the restrained chrome's copper wayfinding reads gilded through the [data-prime-cycle] cascade (components never author theme variants — Rule 5).",
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
          "Night — the true-black void. Ember-and-gold accents on restrained chrome; the sanctuary register stays printed-feeling, never screen-lit spectacle.",
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
          "Reduced-motion contract (spec Field 5): all motion removed. The NARRATIVE opener performs no entrance animation in any case — article-as-sanctuary; the reader arrives at the opener, the opener does not perform.",
      },
    },
  },
};
