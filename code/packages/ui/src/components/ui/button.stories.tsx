import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

/**
 * Storybook 9 stories for the Button primitive (F5; shadcn-canonical +
 * Prime token-mapped).
 *
 * The cva surface defines exactly seven variants (default / dispatch /
 * editorial / institutional / outline / ghost / link) and four sizes
 * (default / sm / lg / icon) — variants encode lane provenance per CD2 §4
 * lane pigments (source header). Sharp 0-radius on primary buttons with
 * the 50%-radius icon exception is the source's atmospheric rule. No
 * invented variants (DESIGN.md §Don'ts).
 */

const meta: Meta<typeof Button> = {
  title: "Primitives / Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Prime token-mapped Button: variants encode lane provenance (CD2 §4 lane pigments — dispatch carries the accent-prime register; outline/ghost/link are minimal-chrome), consuming canon tokens only per construction rule 4.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "default",
        "dispatch",
        "editorial",
        "institutional",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: {
      control: { type: "radio" },
      options: ["default", "sm", "lg", "icon"],
    },
    asChild: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
  },
  args: {
    variant: "default",
    size: "default",
    children: "Read the dispatch",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default variant — strong-ink fill with the copper-deep hover shift.",
      },
    },
  },
};

export const Dispatch: Story = {
  args: { variant: "dispatch", children: "Subscribe to DISpatch" },
  parameters: {
    docs: {
      description: {
        story:
          "The accent-prime register — dispatch-lane wine is precious; reserve for genuinely dispatch-typed critical actions (construction rule 2).",
      },
    },
  },
};

export const Editorial: Story = {
  args: { variant: "editorial", children: "Browse the essays" },
  parameters: {
    docs: {
      description: {
        story: "Editorial lane fill — the terracotta writing-track channel.",
      },
    },
  },
};

export const Institutional: Story = {
  args: { variant: "institutional", children: "Read the charter" },
  parameters: {
    docs: {
      description: {
        story:
          "Institutional lane fill — the graphite-blue civic-content channel.",
      },
    },
  },
};

export const Outline: Story = {
  args: { variant: "outline", children: "View the archive" },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal-chrome variant: rail-edge hairline over transparent fill (construction rule 6).",
      },
    },
  },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Dismiss" },
  parameters: {
    docs: {
      description: {
        story:
          "No fill, no border — hover surfaces the inset ground only.",
      },
    },
  },
};

export const LinkVariant: Story = {
  args: { variant: "link", children: "Continue reading" },
  parameters: {
    docs: {
      description: {
        story:
          "Typographic link register — accent ink with hover underline, zero box chrome.",
      },
    },
  },
};

export const IconButton: Story = {
  args: {
    size: "icon",
    children: "→",
    "aria-label": "Next dispatch",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The icon size — the 50%-radius exception to the sharp 0-radius primary rule (source header). Icon-only buttons must carry an aria-label; the story args provide one.",
      },
    },
  },
};

export const Disabled: Story = {
  args: { variant: "dispatch", children: "Subscribe", disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state from the native prop surface: pointer events off, opacity halved.",
      },
    },
  },
};

export const AsChildLink: Story = {
  args: { asChild: true, variant: "outline" },
  render: (args) => (
    <Button {...args}>
      <a href="/dispatch/week-12">Read Dispatch No. 12</a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`asChild` merges the button surface onto the child element via Radix Slot — here a real anchor, keeping navigation semantics.",
      },
    },
  },
};

export const VariantMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
        maxWidth: "36rem",
      }}
    >
      <Button>Read the dispatch</Button>
      <Button variant="dispatch">Subscribe</Button>
      <Button variant="editorial">Browse the essays</Button>
      <Button variant="institutional">Read the charter</Button>
      <Button variant="outline">View the archive</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="link">Continue reading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All seven ratified variants side by side — the three lane fills flanked by the strong-ink default and the minimal-chrome trio.",
      },
    },
  },
};

export const SizeLadder: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}
    >
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Next dispatch">
        {"→"}
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The four ratified sizes — sm / default / lg text buttons and the round icon size (with its required aria-label).",
      },
    },
  },
};

export const DuskCycle: Story = {
  args: { variant: "dispatch", children: "Subscribe to DISpatch" },
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: lane pigments lift for the dark ground and wayfinding reads as gilded copper with warm-cream ink, all re-resolved through the [data-prime-cycle] cascade (construction rule 5 — components never author theme variants).",
      },
    },
  },
};

export const NightCycle: Story = {
  args: { variant: "dispatch", children: "Subscribe to DISpatch" },
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: ember-and-gold accents in the restrained HUD register; the same semantic tokens re-resolve at bridge level, the component ships zero theme variants (construction rule 5).",
      },
    },
  },
};
