import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

/**
 * Storybook 9 stories for the Tabs primitive (F5; thin Radix wrapper).
 *
 * The package ships behavior + class hooks only (`.prime-tabs__{part}`,
 * wired at ROOF per the source header) — the triggers render with native
 * button chrome here by design. Story wrappers add layout scaffolding only
 * (flex/grid, rem units); no surface CSS is invented.
 */

const meta: Meta<typeof Tabs> = {
  title: "Primitives / Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Thin Radix Tabs wrapper — class hooks `.prime-tabs__{part}` are wired at ROOF, so the package ships behavior and ARIA only (source header; form-after-function discipline per the ui/ barrel). Sample content mirrors the register pair the primitives suite exercises: NARRATIVE and META.",
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: { type: "radio" },
      options: ["narrative", "meta"],
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    activationMode: {
      control: { type: "radio" },
      options: ["automatic", "manual"],
    },
  },
  args: {
    defaultValue: "narrative",
    orientation: "horizontal",
    activationMode: "automatic",
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/** Shared composition: the two-register article view from the vitest suite. */
const registerTabs: Story["render"] = (args) => (
  <Tabs {...args}>
    <TabsList
      aria-label="Article registers"
      style={{ display: "flex", gap: "0.75rem" }}
    >
      <TabsTrigger value="narrative">NARRATIVE</TabsTrigger>
      <TabsTrigger value="meta">META</TabsTrigger>
    </TabsList>
    <TabsContent
      value="narrative"
      style={{ paddingTop: "1rem", maxWidth: "32rem" }}
    >
      <p style={{ margin: 0 }}>
        The literary-civic register — NYT-Magazine and New-Yorker lineage,
        carried by the Title and Body serifs. Stately prose that reads like a
        magazine, not a dashboard.
      </p>
    </TabsContent>
    <TabsContent value="meta" style={{ paddingTop: "1rem", maxWidth: "32rem" }}>
      <p style={{ margin: 0 }}>
        The rip-through-the-screen register — component-locked monospace
        expressed as beautifully composed boxes, never effects. Old-Wired
        hacker energy under editorial governance.
      </p>
    </TabsContent>
  </Tabs>
);

export const Default: Story = {
  render: registerTabs,
};

export const MetaActive: Story = {
  args: { defaultValue: "meta" },
  render: registerTabs,
  parameters: {
    docs: {
      description: {
        story:
          "The META panel selected via `defaultValue` — the uncontrolled active-state surface from the Radix prop contract.",
      },
    },
  },
};

export const VerticalOrientation: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Tabs {...args} style={{ display: "flex", gap: "1.5rem" }}>
      <TabsList
        aria-label="Article registers"
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <TabsTrigger value="narrative">NARRATIVE</TabsTrigger>
        <TabsTrigger value="meta">META</TabsTrigger>
      </TabsList>
      <TabsContent value="narrative" style={{ maxWidth: "28rem" }}>
        <p style={{ margin: 0 }}>
          The literary-civic register — Title and Body serifs carrying stately
          magazine prose.
        </p>
      </TabsContent>
      <TabsContent value="meta" style={{ maxWidth: "28rem" }}>
        <p style={{ margin: 0 }}>
          The monospace META register — composed boxes, never effects.
        </p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`orientation=\"vertical\"` — Radix flips arrow-key navigation to Up/Down and sets aria-orientation; the wrapper only re-flows layout.",
      },
    },
  },
};

export const ManualActivation: Story = {
  args: { activationMode: "manual" },
  render: registerTabs,
  parameters: {
    docs: {
      description: {
        story:
          "`activationMode=\"manual\"` — arrow keys move focus without selecting; Enter/Space commits. The deliberate-selection keyboard state from the Radix prop surface.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: registerTabs,
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: panel prose re-resolves to warm-cream ink over the walnut substrate. Gilded-copper wayfinding stays reserved for chrome; the register shift itself carries the boundary.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: registerTabs,
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: the register panels read as restrained HUD panes over the void — ember-and-gold accents held back, semantic tokens re-resolving per the cycle cascade.",
      },
    },
  },
};
