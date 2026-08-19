import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropCap } from "./DropCap";

/**
 * Storybook 9 stories for DropCap.
 *
 * No CD4 spec exists for this component — the exported TypeScript interface
 * in DropCap.tsx is the sole variant authority (children + className only;
 * no ratified variants). Cycle stories exercise the [data-prime-cycle]
 * cascade only — the component authors no theme variants (Rule 5).
 */

const meta: Meta<typeof DropCap> = {
  title: "Article / DropCap",
  component: DropCap,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "First-letter editorial flourish for article openers: the opening character renders in the Title display serif, ~5 lines tall, floated left in the wine accent, and the rest of the paragraph wraps around it (DropCap.tsx source contract — applies to the opening paragraph of every NarrativeArticleOpener). Pure CSS, no hooks, substrate-agnostic root (construction-rules.md Rule 1).",
      },
    },
  },
  argTypes: {
    children: { control: { type: "text" } },
  },
  args: {
    children:
      "Prime did not begin as a skyline. It began as a ledger — a constitution, a cartography, and a standing rule that no agent acts without leaving a record. The city that rose from those pages kept the habit: every district audited, every position hired in the open, every dispatch filed before the ink of the decision had dried.",
  },
};

export default meta;
type Story = StoryObj<typeof DropCap>;

export const Default: Story = {};

export const ArticleMeasure: Story = {
  render: (args) => (
    <div style={{ maxWidth: "65ch" }}>
      <DropCap {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The drop capital inside a reading-column measure — the float wraps roughly five lines of Body prose around the Title-serif capital, the composition it ships in on article openers.",
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
          "Dusk — the chiaroscuro walnut study: warm-cream ink over the darkened substrate, the drop capital re-resolving to the lit-ember accent. The component stays cycle-blind; the [data-prime-cycle] cascade re-resolves every token at bridge level (Rule 5).",
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
          "Night — the true-black void: ember-and-gold accents in the restrained HUD register, prose ink near-white. No component-side theme variant exists — tokens re-resolve per active cycle (Rule 5).",
      },
    },
  },
};
