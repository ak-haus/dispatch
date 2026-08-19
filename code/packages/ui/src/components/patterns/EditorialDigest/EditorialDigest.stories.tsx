import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialDigest, type EditorialDigestSection } from "./EditorialDigest";

/**
 * Storybook 9 stories for EditorialDigest (CD4 spec Field 8 contract).
 *
 * The story matrix is bounded by the CD4 spec Field 2 table
 * (things-to-read / coming-soon / compact-mobile) and the shipped prop
 * surface (sections of entries with lane + status + dateline). The Field 8
 * MetroMapMarker and meta-section stories are W3-gated and not shipped in
 * the prop surface, so they are deliberately absent. Cycle stories drive
 * the canon [data-prime-cycle] cascade via globals.cycle.
 */

/** Field 2 `things-to-read`: published entries across all three lanes. */
const thingsToRead: EditorialDigestSection = {
  heading: "Things to read today",
  entries: [
    {
      slug: "the-charter-ledger",
      title: "The Charter Ledger",
      description:
        "How Prime's constitution turns governance prose into an execution path.",
      lane: "institutional",
      publishedAt: "2026-08-12",
      status: "published",
    },
    {
      slug: "walking-the-editorial-district",
      title: "Walking the Editorial District",
      description:
        "A reader's tour of the cartographic substrate beneath the magazine.",
      lane: "editorial",
      publishedAt: "2026-08-14",
      status: "published",
    },
    {
      slug: "live-wire-week-33",
      title: "Live Wire: Week 33 on the rail",
      lane: "dispatch",
      publishedAt: "2026-08-16",
      status: "published",
    },
  ],
};

/** Field 2 `coming-soon`: forthcoming entries rendered without an anchor. */
const comingSoon: EditorialDigestSection = {
  heading: "Coming soon",
  entries: [
    {
      slug: "hiring-a-citizen",
      title: "Hiring a Citizen: Character meets Position",
      description:
        "Inside the employment model that makes an agent an employee, not a task.",
      lane: "institutional",
      publishedAt: "2026-08-24",
      status: "coming-soon",
    },
    {
      slug: "the-cartographers-desk",
      title: "The Cartographer's Desk",
      lane: "editorial",
      publishedAt: "2026-08-28",
      status: "coming-soon",
    },
  ],
};

const meta: Meta<typeof EditorialDigest> = {
  title: "Patterns / EditorialDigest",
  component: EditorialDigest,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Things-to-read + coming-soon homepage digest — reception-only magazine-glossary structure per CD4 spec Field 1 (New Yorker glossary precedent, CD1 Concept 7), with lane indicators doing cosmology-and-register wayfinding at a glance (CD1 Concept 3). Published entries anchor to their article; coming-soon entries render as non-anchor placeholders.",
      },
    },
  },
  argTypes: {
    ariaLabel: { control: { type: "text" } },
    sections: { control: { type: "object" } },
  },
  args: {
    ariaLabel: "Editorial digest",
    sections: [thingsToRead, comingSoon],
  },
};

export default meta;
type Story = StoryObj<typeof EditorialDigest>;

export const BothSubregions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Field 8 `BothSubregions` — the full magazine-glossary frame: the things-to-read section (published, anchored entries across all three lanes) above the coming-soon section (placeholder entries, no anchor). This is the homepage composition the spec scaffolds.",
      },
    },
  },
};

export const ThingsToRead: Story = {
  args: { sections: [thingsToRead] },
  parameters: {
    docs: {
      description: {
        story:
          "Field 2 `things-to-read` — the active editorial list: every entry is published, wrapped in an anchor to its article, with lane indicator, optional standfirst, and ISO dateline as wayfinding chrome.",
      },
    },
  },
};

export const ComingSoon: Story = {
  args: { sections: [comingSoon] },
  parameters: {
    docs: {
      description: {
        story:
          "Field 2 `coming-soon` — forthcoming entries at subdued visual weight. Per the shipped source (verified in the F11 vitest suite), a coming-soon entry renders as a span, never an anchor, so keyboard tabbing skips it (Field 4).",
      },
    },
  },
};

export const CompactMobile: Story = {
  render: (args) => (
    <div style={{ maxWidth: "20rem" }}>
      <EditorialDigest {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Field 2 `compact-mobile` — tighter spacing with lane indicators stacking against headlines at the mobile breakpoint; rendered here inside a narrow column to exercise the stacking behavior.",
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
          "Dusk cycle — the chiaroscuro walnut study: entry titles set in warm-cream ink, lane pigments re-resolve through the token cascade (ONE OKLCH per lane, never per-theme variants), and gilded-copper chrome carries the wayfinding.",
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
          "Night cycle — the true-black void: ember-and-gold lane accents over a restrained HUD register; coming-soon placeholders recede further into the void while published entries hold the reading contrast floor.",
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
          "Field 5 reduced-motion fallback: all digest motion is removed — hover shifts and any lane-indicator pulse become instant state-toggles.",
      },
    },
  },
};
