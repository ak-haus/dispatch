import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";

/**
 * Storybook 9 stories for the DropdownMenu primitive (F5 thin Radix wrapper).
 *
 * Prop surface = the exported subcomponents in dropdown-menu.tsx (Radix
 * pass-through props + the `.prime-dropdown-menu__*` class hooks, wired at
 * ROOF), corroborated by primitives.test.tsx §DropdownMenu. The /ui register
 * carries NO variant props (components.md §9.9 — the register pulls past
 * shadcn defaults), so stories cover the exported subcomponents composed
 * realistically instead of a variant matrix.
 *
 * Scaffold styling below is story-local stand-in surface (the ROOF-wired
 * class hooks ship no CSS yet): layout in rem, colors via semantic tokens
 * only — --surface-inset for the contained floating slot (Rule 1),
 * --rail-edge for its boundary hairline. No radii (no ratified radius scale).
 *
 * Known limitation: DropdownMenuContent hard-wraps Radix Portal, so the open
 * layer mounts on document.body — OUTSIDE the preview decorator's
 * [data-prime-cycle] wrapper. Cycle stories therefore render the menu closed
 * and exercise the anchored trigger chrome, which re-resolves correctly.
 * DropdownMenuSub / DropdownMenuRadioGroup / DropdownMenuPortal are exported
 * without their SubTrigger / SubContent / RadioItem counterparts, so they
 * cannot be composed in a story yet — flagged, not invented.
 */

const triggerScaffold: CSSProperties = {
  padding: "0.5rem 1rem",
  fontSize: "0.875rem",
  background: "transparent",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
  cursor: "pointer",
};

const contentScaffold: CSSProperties = {
  minWidth: "14rem",
  padding: "0.375rem",
  display: "flex",
  flexDirection: "column",
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

const meta: Meta<typeof DropdownMenu> = {
  title: "Primitives / DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Thin Radix DropdownMenu wrapper (F5): ARIA menu semantics pass through untouched; surface styling arrives via the `.prime-dropdown-menu__*` class hooks wired at ROOF — the /ui register ships behavior, not chrome, per the Mayor's form-after-function discipline (components.md §9.9; dropdown-menu.tsx header).",
      },
    },
  },
  argTypes: {
    defaultOpen: { control: { type: "boolean" } },
    modal: { control: { type: "boolean" } },
    dir: { control: { type: "radio" }, options: ["ltr", "rtl"] },
  },
  args: {
    defaultOpen: true,
    // Radix defaults modal to true; stories run non-modal so the
    // defaultOpen layers don't lock pointer-events on the docs-page body.
    modal: false,
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger style={triggerScaffold}>Lanes</DropdownMenuTrigger>
      <DropdownMenuContent style={contentScaffold}>
        <DropdownMenuLabel style={labelScaffold}>Filter by lane</DropdownMenuLabel>
        <DropdownMenuSeparator style={separatorScaffold} />
        <DropdownMenuItem style={itemScaffold}>Editorial</DropdownMenuItem>
        <DropdownMenuItem style={itemScaffold}>Institutional</DropdownMenuItem>
        <DropdownMenuItem style={itemScaffold}>Dispatch</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The three-lane filter composition from the vitest suite (primitives.test.tsx §DropdownMenu): trigger + label + separator + three menuitem entries, one per semantic lane channel.",
      },
    },
  },
};

export const FullAnatomy: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger style={triggerScaffold}>
        Dispatch · Week 3
      </DropdownMenuTrigger>
      <DropdownMenuContent style={contentScaffold}>
        <DropdownMenuLabel style={labelScaffold}>Edition</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem style={itemScaffold}>Open dispatch</DropdownMenuItem>
          <DropdownMenuItem style={itemScaffold}>Copy permalink</DropdownMenuItem>
          <DropdownMenuItem style={itemScaffold}>View provenance</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator style={separatorScaffold} />
        <DropdownMenuLabel style={labelScaffold}>Records</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem style={itemScaffold}>Append correction</DropdownMenuItem>
          <DropdownMenuItem
            disabled
            style={{ ...itemScaffold, color: "var(--text-muted)" }}
          >
            Purge (Mayor-gated)
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Every composable export at once: Label, Group, Separator, and a disabled Item (Radix `disabled` pass-through — aria-disabled + data-disabled land automatically). Sub, RadioGroup, and Portal are exported without their counterpart parts and stay out of the matrix until those land.",
      },
    },
  },
};

export const ClosedUntilInvoked: Story = {
  args: { defaultOpen: false },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger style={triggerScaffold}>Lanes</DropdownMenuTrigger>
      <DropdownMenuContent style={contentScaffold}>
        <DropdownMenuItem style={itemScaffold}>Editorial</DropdownMenuItem>
        <DropdownMenuItem style={itemScaffold}>Institutional</DropdownMenuItem>
        <DropdownMenuItem style={itemScaffold}>Dispatch</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Resting state: the menu opens on click / Enter / Space / ArrowDown with full Radix keyboard navigation — the primitive's behavior contract, untouched by the wrapper.",
      },
    },
  },
};

export const DuskCycle: Story = {
  args: { defaultOpen: false },
  globals: { cycle: "dusk" },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger style={triggerScaffold}>Lanes</DropdownMenuTrigger>
      <DropdownMenuContent style={contentScaffold}>
        <DropdownMenuItem style={itemScaffold}>Editorial</DropdownMenuItem>
        <DropdownMenuItem style={itemScaffold}>Institutional</DropdownMenuItem>
        <DropdownMenuItem style={itemScaffold}>Dispatch</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the trigger's ink lifts to warm cream and its rail-edge hairline settles into the walnut substrate via the data-prime-cycle cascade — the component authors no theme variants (Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  args: { defaultOpen: false },
  globals: { cycle: "night" },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger style={triggerScaffold}>Lanes</DropdownMenuTrigger>
      <DropdownMenuContent style={contentScaffold}>
        <DropdownMenuItem style={itemScaffold}>Editorial</DropdownMenuItem>
        <DropdownMenuItem style={itemScaffold}>Institutional</DropdownMenuItem>
        <DropdownMenuItem style={itemScaffold}>Dispatch</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: near-white ink over the void in the restrained HUD register; the semantic tokens re-resolve through the cascade with no component-authored variants (Rule 5).",
      },
    },
  },
};
