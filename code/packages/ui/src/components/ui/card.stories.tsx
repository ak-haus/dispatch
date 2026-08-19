import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";

/**
 * Storybook 9 stories for the Card primitive (F5; shadcn-canonical +
 * Prime token-mapped — source header, card.tsx).
 *
 * Card carries no variant props — the surface is six composition slots
 * (Card / CardHeader / CardTitle / CardDescription / CardContent /
 * CardFooter) plus a cn()-composable className. The matrix therefore
 * covers the exported subcomponents composed realistically, and the two
 * className affordances the source itself documents: depth via
 * background-tone change (surface-page → surface-inset, never shadows —
 * per inspo/dispatch-brief.md) and the optional 8px soft radius
 * (Monocle-style; default radius is 0px per the Kinfolk/Monocle/
 * Exhibition editorial register).
 */

const meta: Meta<typeof Card> = {
  title: "Primitives / Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "shadcn-canonical composition-slot primitive mapped to Prime tokens (F5; earned-place gate per components/ui README + CD4 §6). Six slots — Card / CardHeader / CardTitle / CardDescription / CardContent / CardFooter. Depth is a background-tone change (surface-page → surface-inset), never a shadow; default radius is 0px per the editorial register (source header, citing inspo/dispatch-brief.md).",
      },
    },
  },
  argTypes: {
    className: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/** Full six-slot anatomy with editorial sample content. */
const fullAnatomy = (props: ComponentProps<typeof Card>) => (
  <Card {...props} style={{ maxWidth: "24rem", ...props.style }}>
    <CardHeader>
      <CardTitle>Dispatch · Week 3</CardTitle>
      <CardDescription>The cartography substrate lands</CardDescription>
    </CardHeader>
    <CardContent>
      <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>
        The Editorial District surfaces at low dial this week — landmark
        hints, not polygon borders. Articles keep their park-like reading
        sanctuaries while the grid forms around the components.
      </p>
    </CardContent>
    <CardFooter>
      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
        Filed from the Editorial District
      </span>
    </CardFooter>
  </Card>
);

export const Default: Story = {
  render: (args) => fullAnatomy(args),
  parameters: {
    docs: {
      description: {
        story:
          "All six composition slots assembled — header (title + description), content prose, footer meta line. Border is rail-edge; surface is surface-page; ink is text-strong (the primitive's token-mapped defaults).",
      },
    },
  },
};

export const HeaderOnly: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: "24rem" }}>
      <CardHeader>
        <CardTitle>Signal 004</CardTitle>
        <CardDescription>Reception window opens</CardDescription>
      </CardHeader>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Minimal composition — header slot alone. Slots are independent; consumers assemble only what the surface needs.",
      },
    },
  },
};

export const SoftRadius: Story = {
  render: (args) => fullAnatomy({ ...args, className: "rounded-[8px]" }),
  parameters: {
    docs: {
      description: {
        story:
          "The one documented radius departure: pass `rounded-[8px]` via className for Monocle-style soft cards (source header). Default remains 0px — the editorial register's hard-edge card.",
      },
    },
  },
};

export const ToneDepthMatrix: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
        gap: "1.5rem",
        alignItems: "start",
      }}
    >
      <Card {...args} style={{ maxWidth: "24rem" }}>
        <CardHeader>
          <CardTitle>Surface-page card</CardTitle>
          <CardDescription>The primitive default</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>
            Sits flush with the page substrate; the rail-edge border alone
            carries the boundary.
          </p>
        </CardContent>
      </Card>
      <Card
        {...args}
        className="bg-surface-inset"
        style={{ maxWidth: "24rem" }}
      >
        <CardHeader>
          <CardTitle>Surface-inset card</CardTitle>
          <CardDescription>Depth by tone, never shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>
            The documented depth mechanism: a background-tone step from
            surface-page to surface-inset (source header, per
            inspo/dispatch-brief.md).
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side of the two documented surface tones — the only depth vocabulary the primitive ships (no shadows).",
      },
    },
  },
};

export const DuskCycle: Story = {
  render: (args) => fullAnatomy(args),
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: the card's surface and rail-edge border re-resolve against the walnut substrate, prose reads as warm-cream ink. The primitive authors no theme variant of its own — the [data-prime-cycle] cascade re-binds its tokens (Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  render: (args) => fullAnatomy(args),
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: the card holds as a restrained HUD panel, boundary carried by the re-resolved rail-edge hairline, ink stepping to the night text roles. Same markup, cycle-cascade only (Rule 5).",
      },
    },
  },
};
