import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

/**
 * Storybook 9 stories for the Accordion primitive (F5 thin Radix wrapper).
 *
 * The primitive carries no variant props — it is a className-composable
 * surface exposing `.prime-accordion__*` class hooks (chrome wired at ROOF).
 * The matrix therefore covers the exported subcomponents composed
 * realistically across the Radix prop surface: single-collapsible, multiple,
 * default-open, and disabled-item states (interaction contract corroborated
 * by primitives.test.tsx "expands item via trigger; ARIA expanded state
 * flips").
 */

const meta: Meta<typeof Accordion> = {
  title: "Primitives / Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Thin Radix Accordion wrapper (F5) — Root re-export plus Item / Trigger / Content parts carrying `.prime-accordion__*` class hooks; visual chrome is wired at ROOF, so the primitive stays substrate-agnostic (construction rule 1) and composes via className.",
      },
    },
  },
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["single", "multiple"],
    },
    collapsible: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
  },
  args: {
    type: "single",
    collapsible: true,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/** Editorial sample items grounded in DESIGN.md §Overview + §Colors prose. */
const charterItems = (
  <>
    <AccordionItem value="masthead">
      <AccordionTrigger>What is DISpatch?</AccordionTrigger>
      <AccordionContent>
        DISpatch is the magazine of Prime — editorial scrollytelling over the
        cartographic substrate, live at dispatchmag.dev.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="lanes">
      <AccordionTrigger>The three lanes</AccordionTrigger>
      <AccordionContent>
        Editorial, institutional, and dispatch are semantic channels applied as
        local accents — one pigment per lane, never page gradients.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="cartography">
      <AccordionTrigger>The cartographic substrate</AccordionTrigger>
      <AccordionContent>
        The subtle hero beneath the writing — forgettable while reading,
        present and alive when the reader looks up.
      </AccordionContent>
    </AccordionItem>
  </>
);

const renderCharter = (args: ComponentProps<typeof Accordion>) => (
  <div style={{ maxWidth: "36rem" }}>
    <Accordion {...args}>{charterItems}</Accordion>
  </div>
);

export const Default: Story = {
  render: renderCharter,
  parameters: {
    docs: {
      description: {
        story:
          "Single-collapsible mode — one panel open at a time, and the open panel can close itself (the configuration exercised by the shared vitest suite).",
      },
    },
  },
};

export const DefaultOpen: Story = {
  args: { defaultValue: "masthead" },
  render: renderCharter,
  parameters: {
    docs: {
      description: {
        story:
          "Uncontrolled open state via `defaultValue` — the masthead item mounts expanded (aria-expanded true on its trigger).",
      },
    },
  },
};

export const Multiple: Story = {
  args: { type: "multiple", defaultValue: ["masthead", "lanes"] },
  render: renderCharter,
  parameters: {
    docs: {
      description: {
        story:
          "`type=\"multiple\"` — independent panels; `defaultValue` takes an array and two items mount expanded.",
      },
    },
  },
};

export const DisabledItem: Story = {
  render: (args) => (
    <div style={{ maxWidth: "36rem" }}>
      <Accordion {...args}>
        <AccordionItem value="editions">
          <AccordionTrigger>Current editions</AccordionTrigger>
          <AccordionContent>
            Weekly dispatches from the Editorial District, indexed by lane.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tombstoned" disabled>
          <AccordionTrigger>Chiseled history (sealed)</AccordionTrigger>
          <AccordionContent>
            Tombstoned records live out-of-band in git and ledgers, never on
            the live surface.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Per-item `disabled` from the Radix Item surface — the sealed record's trigger is non-interactive and excluded from keyboard traversal.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  args: { defaultValue: "masthead" },
  render: renderCharter,
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: warm-cream ink and lit-ember accents re-resolve through the [data-prime-cycle] cascade; the primitive ships zero theme variants (construction rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  args: { defaultValue: "masthead" },
  render: renderCharter,
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: ember-and-gold accents in the restrained HUD register; the same semantic tokens re-resolve at bridge level, the component authors nothing (construction rule 5).",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  args: { defaultValue: "lanes" },
  render: renderCharter,
  parameters: {
    docs: {
      description: {
        story:
          "Under prefers-reduced-motion the expand/collapse vector clamps to static or an opacity-only crossfade at most the ratified 200ms cap (DESIGN.md §Ratified motion gates).",
      },
    },
  },
};
