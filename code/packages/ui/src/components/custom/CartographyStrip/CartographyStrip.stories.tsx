import type { Meta, StoryObj } from "@storybook/react-vite";
import { CartographyStrip } from "./CartographyStrip";

/**
 * Storybook 9 stories for CartographyStrip.
 *
 * No CD4 spec exists for this component — the exported CartographyStripProps
 * interface is the only variant authority; no invented variants (DESIGN.md
 * §Don'ts). Imagery is the real cartographic asset shipped at
 * public/cartography/district.webp (never placeholder media). Cycle stories
 * are cycle-native via globals.cycle (data-prime-cycle cascade — Rule 5);
 * the Motion v12 whileInView entrance earns the ReducedMotion story.
 */

const districtAlt =
  "Hand-drawn map of the Editorial District — ink on warm vellum, cross-hatched building footprints, the DISpatch building anchored left of center.";

const meta: Meta<typeof CartographyStrip> = {
  title: "Chrome / CartographyStrip",
  component: CartographyStrip,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Atmospheric editorial divider — a cinemascope slice of the cartographic substrate breathing beneath editorial content (component doc, dispatch-brief.md aesthetic rule). Motion v12 whileInView entrance animates transform + opacity only; the optional district badge renders in the asset-locked Civic slot.",
      },
    },
  },
  argTypes: {
    imageUrl: { control: { type: "text" } },
    alt: { control: { type: "text" } },
    ratio: { control: { type: "number", min: 1, max: 4, step: 0.1 } },
    caption: { control: { type: "text" } },
    district: { control: { type: "text" } },
  },
  args: {
    imageUrl: "/cartography/district.webp",
    alt: districtAlt,
    ratio: 21 / 9,
    caption:
      "The Editorial District at low-mid dial — felt beneath the reading, present when the reader looks up.",
    district: "Editorial District",
  },
};

export default meta;
type Story = StoryObj<typeof CartographyStrip>;

export const Default: Story = {};

export const WithoutDistrictBadge: Story = {
  args: { district: undefined },
  parameters: {
    docs: {
      description: {
        story:
          "`district` is optional on the prop surface: with it absent, the strip carries no badge overlay — the cartography excerpt reads uninterrupted.",
      },
    },
  },
};

export const WithoutCaption: Story = {
  args: { caption: undefined },
  parameters: {
    docs: {
      description: {
        story:
          "`caption` is optional on the prop surface: with it absent, the figure renders as a bare divider with no figcaption row.",
      },
    },
  },
};

export const RatioLadder: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {(
        [
          { ratio: 21 / 9, label: "21:9 — cinemascope divider (default)" },
          { ratio: 16 / 9, label: "16:9 — neighborhood frame" },
          { ratio: 3 / 1, label: "3:1 — narrow horizontal slice" },
        ] as const
      ).map(({ ratio, label }) => (
        <div
          key={label}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
            }}
          >
            {label}
          </span>
          <CartographyStrip
            {...args}
            ratio={ratio}
            caption={undefined}
            district={undefined}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `ratio` prop tunes the excerpt's aspect from the cinemascope default down to narrower horizontal slices — the same substrate, dialed per surface.",
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
          "Chiaroscuro walnut study: the strip reads as a lamplit map excerpt — the inset slot deepens to walnut, the district badge's Civic label prints in warm-cream ink, and chrome wayfinding turns gilded copper.",
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
          "True-black void: the cartography excerpt carries the only texture against the void — restrained HUD register, with ember-and-gold accents confined to markers, never the strip's chrome.",
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
          "Audit surface for the ratified reduced-motion floor (motion.reduced-motion.max-duration): under prefers-reduced-motion, the whileInView entrance must clamp to static or an opacity-only crossfade of at most 200ms.",
      },
    },
  },
};
