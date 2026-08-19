import type { Meta, StoryObj } from "@storybook/react-vite";
import { DistrictMap } from "./DistrictMap";
import { MetroMapMarker } from "../MetroMapMarker";

/**
 * Storybook 9 stories for DistrictMap.
 *
 * Prop surface = DistrictMapProps (DistrictMap.tsx): CartographyCanvasProps
 * minus `surface` (locked to "homepage" — reception-only per spec.md
 * mode-crossing) — district / dial / ariaLabel / ariaDescription / children /
 * className. Spec Field 2 coverage: `default` = Default; `static` (the
 * reduced-motion fallback) = ReducedMotion; `interactive-zoom` is W3-deferred
 * and `compact-mobile` is breakpoint behavior — neither exists on the shipped
 * prop surface, so neither gets a story (no invented variants, DESIGN.md
 * §Don'ts). Children composition per FORMULA §8.2 is corroborated by the
 * f11-components vitest suite.
 */

const meta: Meta<typeof DistrictMap> = {
  title: "Patterns / DistrictMap",
  component: DistrictMap,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Homepage district-map / building-layout cartography surface (spec.md Field 1; CD1 Concept 7 reception) — a reception-only specialization of CartographyCanvas locked to the homepage surface at the LOW presence dial, rendered as an SVG landmark with title + desc (spec.md Field 4). Children compose additional cartography layers (MetroMapMarker etc.) per FORMULA §8.2.",
      },
    },
  },
  decorators: [
    // Layout scaffolding only: the canvas is a 1440x900-viewBox SVG with
    // preserveAspectRatio slice — it needs a sized frame to fill.
    (Story) => (
      <div style={{ width: "100%", height: "32rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    district: {
      control: { type: "radio" },
      options: ["editorial", "civic", "art"],
    },
    dial: {
      control: { type: "radio" },
      options: ["low", "mid", "high"],
    },
    ariaLabel: { control: { type: "text" } },
    ariaDescription: { control: { type: "text" } },
  },
  args: {
    district: "editorial",
    dial: "low",
    ariaLabel: "Editorial District map — homepage navigation",
  },
};

export default meta;
type Story = StoryObj<typeof DistrictMap>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Spec Field 2 `default`: the Editorial District at the homepage LOW dial — felt, not navigated (cartography.md §2.6 presence-dial). Paper-grain and contour-warm substrate inherit from CartographyCanvas.",
      },
    },
  },
};

export const CivicDistrict: Story = {
  args: {
    district: "civic",
    ariaLabel: "Civic District map — homepage navigation",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Neighbor-district focus via the `district` prop (CD3 §3 districts-not-blocks). Forward-pointed neighbors render with diminished weight per CD1 Concept 7 V1 ship scope — anticipatory, not missing.",
      },
    },
  },
};

export const ArtDistrict: Story = {
  args: {
    district: "art",
    ariaLabel: "Art District map — homepage navigation",
  },
};

export const DialLadder: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
        height: "100%",
      }}
    >
      {(["low", "mid", "high"] as const).map((dial) => (
        <figure
          key={dial}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            margin: 0,
            minHeight: "14rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <DistrictMap
              {...args}
              dial={dial}
              ariaLabel={`Editorial District map — ${dial} dial`}
            />
          </div>
          <figcaption
            style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
          >
            dial={dial}
          </figcaption>
        </figure>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The presence dial side-by-side — intensity per surface at fixed zoom, not different cartographies (cartography.md §2.6). Homepage ships LOW; article surfaces run MID; the atlas runs HIGH where the map IS the page.",
      },
    },
  },
};

export const ComposedMarkers: Story = {
  render: (args) => (
    <DistrictMap {...args}>
      {/* FORMULA §8.2 child-layer composition — stations are
          institutional-blue (Above vector) per CD3 §6, painted inside
          MetroMapMarker itself; no accent is introduced here. */}
      <MetroMapMarker
        x={1080}
        y={380}
        name="Reception"
        variant="interchange"
        isCurrent
      />
      <MetroMapMarker x={880} y={520} name="Letterpress" variant="station" />
      <MetroMapMarker x={1180} y={560} name="Archive" variant="terminus" />
    </DistrictMap>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Children compose cartography layers inside the canvas per FORMULA §8.2 — here MetroMapMarker stations over the DISpatch building layout, with Reception as the current interchange (verified composition path in the f11-components vitest suite).",
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
          "Dusk — the chiaroscuro walnut study: the vellum substrate deepens to warm walnut, cartographic atmosphere re-resolving through the [data-prime-cycle] cascade with lit-ember accents held for markers. The component authors no theme variant (Rule 5).",
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
          "Night — the true-black void: the map reads as a restrained HUD, ember-and-gold reserved for wayfinding marks over the darkened substrate. Tokens re-resolve at bridge level; the component stays cycle-blind (Rule 5).",
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
          "Spec Field 2 `static` / Field 5 reduced-motion contract: all pulse, flicker, and zoom motion removed — static rendering. The substrate is static at scroll cadence in every mode; only marker pulses are motion-gated (formula.md §7.1–§7.2).",
      },
    },
  },
};
