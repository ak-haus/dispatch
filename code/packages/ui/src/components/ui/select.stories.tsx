import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "./select";

/**
 * Storybook 9 stories for the Select primitive (F5 thin Radix wrapper).
 *
 * Prop surface = the exported subcomponents in select.tsx (Radix
 * pass-through props + the `.prime-select__*` class hooks, wired at ROOF;
 * Content defaults to position="popper" and wraps children in a Viewport;
 * Trigger appends an aria-hidden chevron slot). Select has no coverage in
 * primitives.test.tsx — the source exports are the sole variant authority.
 * The /ui register carries no variant props (components.md §9.9); stories
 * cover the exported subcomponents composed realistically.
 *
 * Scaffold styling is story-local stand-in surface (the ROOF-wired class
 * hooks ship no CSS yet — including the `.prime-select__chevron` glyph,
 * which stays invisible until surface CSS lands): rem layout + semantic
 * tokens — --surface-inset for the contained listbox slot (Rule 1),
 * --rail-edge for hairlines; no radii (no ratified radius scale).
 *
 * Known limitation: SelectContent hard-wraps Radix Portal, so the open
 * listbox mounts on document.body — outside the preview decorator's
 * [data-prime-cycle] wrapper. Cycle stories render the select closed and
 * exercise the trigger chrome, which re-resolves correctly.
 */

const triggerScaffold: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  minWidth: "14rem",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  background: "transparent",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
  cursor: "pointer",
};

const contentScaffold: CSSProperties = {
  minWidth: "14rem",
  padding: "0.375rem",
  background: "var(--surface-inset)",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
};

const itemScaffold: CSSProperties = {
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  lineHeight: 1.4,
  cursor: "default",
};

const labelScaffold: CSSProperties = {
  padding: "0.5rem 0.75rem 0.25rem",
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
};

const separatorScaffold: CSSProperties = {
  height: "1px",
  margin: "0.25rem 0",
  background: "var(--rail-edge)",
};

const meta: Meta<typeof Select> = {
  title: "Primitives / Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Thin Radix Select wrapper (F5): full listbox keyboard semantics and typeahead pass through untouched; surface styling arrives via the `.prime-select__*` class hooks wired at ROOF — the /ui register ships behavior, not chrome (components.md §9.9; select.tsx header). Content positions popper-style and scrolls inside a Viewport per the source.",
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: { type: "radio" },
      options: ["editorial", "institutional", "dispatch"],
    },
    defaultOpen: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    required: { control: { type: "boolean" } },
    dir: { control: { type: "radio" }, options: ["ltr", "rtl"] },
  },
  args: {
    defaultValue: "editorial",
    defaultOpen: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

function LaneItems() {
  return (
    <>
      <SelectItem value="editorial" style={itemScaffold}>
        Editorial
      </SelectItem>
      <SelectItem value="institutional" style={itemScaffold}>
        Institutional
      </SelectItem>
      <SelectItem value="dispatch" style={itemScaffold}>
        Dispatch
      </SelectItem>
    </>
  );
}

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-label="Filter dispatches by lane" style={triggerScaffold}>
        <SelectValue placeholder="All lanes" />
      </SelectTrigger>
      <SelectContent style={contentScaffold}>
        <LaneItems />
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Lane filter at rest with a selected value: the trigger carries an explicit accessible name plus SelectValue, and the source's aria-hidden chevron slot awaits its ROOF glyph.",
      },
    },
  },
};

export const PlaceholderEmpty: Story = {
  args: { defaultValue: undefined },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-label="Filter dispatches by lane" style={triggerScaffold}>
        <SelectValue placeholder="All lanes" />
      </SelectTrigger>
      <SelectContent style={contentScaffold}>
        <LaneItems />
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "No value selected: SelectValue falls back to its placeholder — the unfiltered resting state of the lane filter.",
      },
    },
  },
};

export const OpenListbox: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Select {...args}>
      {/* tabIndex -1: this story pins the listbox open (defaultOpen), and an
          open Radix Select aria-hides everything outside its portal while
          trapping focus in the content — a tabbable button inside that
          aria-hidden tree fails axe aria-hidden-focus. Removing the pinned
          fixture's background trigger from the tab order matches the inert
          background the ARIA state declares (APG modal pattern). Closed-state
          stories keep the natural tab order. */}
      <SelectTrigger
        aria-label="Filter dispatches by lane"
        tabIndex={-1}
        style={triggerScaffold}
      >
        <SelectValue placeholder="All lanes" />
      </SelectTrigger>
      <SelectContent style={contentScaffold}>
        <LaneItems />
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Listbox open over the trigger: the checked item is announced as selected, and arrow keys plus typeahead navigate — the Radix contract, untouched by the wrapper.",
      },
    },
  },
};

export const GroupedWithSeparator: Story = {
  args: { defaultOpen: true, defaultValue: undefined },
  render: (args) => (
    <Select {...args}>
      {/* tabIndex -1: pinned-open fixture — see OpenListbox's scaffolding
          note (axe aria-hidden-focus). */}
      <SelectTrigger
        aria-label="Browse the dispatch archive"
        tabIndex={-1}
        style={triggerScaffold}
      >
        <SelectValue placeholder="Browse archive" />
      </SelectTrigger>
      <SelectContent style={contentScaffold}>
        <SelectGroup>
          <SelectLabel style={labelScaffold}>Lanes</SelectLabel>
          <LaneItems />
        </SelectGroup>
        <SelectSeparator style={separatorScaffold} />
        <SelectGroup>
          <SelectLabel style={labelScaffold}>Editions</SelectLabel>
          <SelectItem value="week-3" style={itemScaffold}>
            Dispatch · Week 3
          </SelectItem>
          <SelectItem value="week-2" style={itemScaffold}>
            Dispatch · Week 2
          </SelectItem>
          <SelectItem value="signal-001" style={itemScaffold}>
            Signal 001
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full anatomy: two labeled Groups split by a Separator — every composable export of the wrapper in one archive-browse listbox.",
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger
        aria-label="Filter dispatches by lane"
        style={{ ...triggerScaffold, color: "var(--text-muted)" }}
      >
        <SelectValue placeholder="All lanes" />
      </SelectTrigger>
      <SelectContent style={contentScaffold}>
        <LaneItems />
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Root `disabled` pass-through: the trigger reports disabled to AT and ignores pointer and keyboard invocation.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-label="Filter dispatches by lane" style={triggerScaffold}>
        <SelectValue placeholder="All lanes" />
      </SelectTrigger>
      <SelectContent style={contentScaffold}>
        <LaneItems />
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the trigger's ink lifts to warm cream and its rail-edge hairline settles into the walnut substrate via the data-prime-cycle cascade — no component-authored variants (Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-label="Filter dispatches by lane" style={triggerScaffold}>
        <SelectValue placeholder="All lanes" />
      </SelectTrigger>
      <SelectContent style={contentScaffold}>
        <LaneItems />
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: near-white ink in the restrained HUD register, every semantic token re-resolved through the cascade (Rule 5).",
      },
    },
  },
};
