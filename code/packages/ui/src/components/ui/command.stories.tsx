import type { ComponentProps, ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./command";

/**
 * Storybook 9 stories for the Command primitive (F5; thin cmdk wrapper —
 * source header, command.tsx).
 *
 * The prop surface is cmdk's own (ComponentPropsWithoutRef of the cmdk
 * root — label / loop / shouldFilter and friends); the wrapper adds only
 * the `.prime-command__{part}` class hooks, which are wired at ROOF, not
 * here. The matrix therefore covers the seven exported parts composed
 * realistically — grouped results with a separator (the vitest fixture
 * register) and the CommandEmpty lifecycle. Story wrappers add layout
 * scaffolding only; palette chrome is ROOF-owned.
 */

/** Layout scaffolding for the unstyled primitive — chrome lands at ROOF. */
function PaletteFrame(props: { children: ReactElement }): ReactElement {
  return (
    <div
      style={{
        maxWidth: "28rem",
        border: "1px solid var(--chrome-border)",
        background: "var(--surface-inset)",
        padding: "0.75rem",
      }}
    >
      {props.children}
    </div>
  );
}

// CommandEmpty scaffolds OUTSIDE CommandList: an ARIA listbox owns only
// option/group children (WAI-ARIA APG Listbox pattern; axe
// aria-required-children), so the no-results status message is not a valid
// listbox child. cmdk's Empty is context-driven — it mounts anywhere under
// the Command root — and renders in the same visual slot below the list.
const renderPalette = (args: ComponentProps<typeof Command>): ReactElement => (
  <PaletteFrame>
    <Command {...args}>
      <CommandInput placeholder="Search dispatches" />
      <CommandList>
        <CommandGroup heading="Dispatches">
          <CommandItem value="dispatch-week-3">Dispatch · Week 3</CommandItem>
          <CommandItem value="dispatch-week-2">Dispatch · Week 2</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Signals">
          <CommandItem value="signal-004">Signal 004</CommandItem>
          <CommandItem value="signal-003">Signal 003</CommandItem>
        </CommandGroup>
      </CommandList>
      <CommandEmpty>No results — try a different query.</CommandEmpty>
    </Command>
  </PaletteFrame>
);

const meta: Meta<typeof Command> = {
  title: "Primitives / Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Thin cmdk wrapper (F5) — the foundation the V1 SearchPalette composes (cmdk-based per CD4 §3.1 #18). Filtering, keyboard navigation, and combobox ARIA come from cmdk; the wrapper contributes the `.prime-command__{part}` class hooks, wired to chrome at ROOF, not here (source header).",
      },
    },
  },
  argTypes: {
    label: { control: { type: "text" } },
    loop: { control: { type: "boolean" } },
    shouldFilter: { control: { type: "boolean" } },
  },
  args: {
    // cmdk renders this as the visually-hidden accessible label for the
    // combobox input — the primitive's a11y-bearing prop.
    label: "Search dispatches",
    loop: false,
    shouldFilter: true,
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: (args) => renderPalette(args),
  parameters: {
    docs: {
      description: {
        story:
          "Grouped palette — input, two headed groups split by a CommandSeparator, item values keyed for cmdk filtering (the same civic fixture the primitives vitest suite exercises). Type into the input to watch cmdk filter.",
      },
    },
  },
};

export const EmptyState: Story = {
  render: (args) => (
    <PaletteFrame>
      <Command {...args}>
        <CommandInput placeholder="Search dispatches" />
        <CommandList />
        {/* Outside the listbox — see renderPalette's scaffolding note (APG
            Listbox: a status message is not a valid option/group child). */}
        <CommandEmpty>No results — try a different query.</CommandEmpty>
      </Command>
    </PaletteFrame>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The CommandEmpty lifecycle: with no matching items, cmdk renders the empty slot in place of results.",
      },
    },
  },
};

export const LoopedNavigation: Story = {
  args: { loop: true },
  render: (args) => renderPalette(args),
  parameters: {
    docs: {
      description: {
        story:
          "cmdk's `loop` behavior: arrow-key navigation wraps from the last item back to the first — the keyboard contract the SearchPalette inherits.",
      },
    },
  },
};

export const DuskCycle: Story = {
  render: (args) => renderPalette(args),
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: the palette frame re-resolves to walnut surfaces with gilded-copper chrome, results reading as warm-cream ink. The primitive authors no theme variant — the [data-prime-cycle] cascade re-binds its consumed tokens (Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  render: (args) => renderPalette(args),
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: the palette reads as a restrained HUD, ember-and-gold wayfinding over the void substrate. Same markup, cycle-cascade only (Rule 5).",
      },
    },
  },
};
