import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlockCopyButton } from "./CodeBlockCopyButton";
import { PrimeToaster } from "../../ui";

/**
 * Storybook 9 stories for CodeBlockCopyButton.
 *
 * Prop surface = CodeBlockCopyButtonProps (component source), corroborated by
 * the F11 vitest suite (pre/code + band + aria-labelled copy button). The CD4
 * spec Field 2 scaffolds further variants (runnable / diff /
 * compact-livesnippet) that are W3-deferred and NOT in the shipped prop
 * surface — no stories are invented for them (DESIGN.md §Don'ts). The
 * `copied` / `error` interaction states (spec Field 3) are internal,
 * user-triggered state — click the button in the canvas to see the glyph
 * swap + toast; they are not prop-reachable, so no state story fakes them.
 *
 * The PrimeToaster decorator mounts the sonner outlet so the copy-success
 * confirmation (spec Field 4 announcement contract) is visible in-canvas.
 */

const SAMPLE_CODE = `// The weekly cadence contract for the DISpatch masthead.
export const dispatch = {
  masthead: "PRIME DISpatch",
  cadence: "weekly",
  lanes: ["editorial", "institutional", "dispatch"],
} as const;`;

const meta: Meta<typeof CodeBlockCopyButton> = {
  title: "Patterns / CodeBlockCopyButton",
  component: CodeBlockCopyButton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compound code surface + copy affordance: a `<figure>` wrapping `<pre><code>` with an optional filename/language band and a copy button (CD4 spec Field 1). This is where the META register lives natively — Meta-code slot, component-locked per CD1 Concept 1; copy success confirms via aria-label swap, glyph change, and toast.",
      },
    },
  },
  decorators: [
    // Sonner outlet — the component fires toast.success/error on copy
    // (spec Field 3 copied/error states); without a mounted Toaster the
    // confirmation would be silent in the canvas.
    (Story) => (
      <>
        <Story />
        <PrimeToaster />
      </>
    ),
  ],
  argTypes: {
    code: { control: { type: "text" } },
    language: { control: { type: "text" } },
    filename: { control: { type: "text" } },
    successMessage: { control: { type: "text" } },
    className: { control: false },
  },
  args: {
    code: SAMPLE_CODE,
    language: "typescript",
    filename: "dispatch.config.ts",
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlockCopyButton>;

export const Static: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The shipped `static` variant (spec Field 2 default): code rendered as-is with the copy button enabled. Clicking copies via the clipboard API, swaps the glyph to a check for ~1.5s, and announces success through the toast outlet.",
      },
    },
  },
};

export const LanguageOnly: Story = {
  render: (args) => (
    <CodeBlockCopyButton code={args.code} language={args.language} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Band composition with the language chip only — the filename slot is omitted and the figcaption carries just the META language label.",
      },
    },
  },
};

export const NoBand: Story = {
  render: (args) => <CodeBlockCopyButton code={args.code} />,
  parameters: {
    docs: {
      description: {
        story:
          "Neither filename nor language provided — the figcaption band is not rendered (source conditional); the surface is pre/code + copy affordance alone.",
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
          "Chiaroscuro walnut study: the code surface reads as a composed META box in the dark — warm-cream ink over the walnut substrate, gilded-copper chrome resolving through the cycle cascade. Boxes, never effects.",
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
          "True-black void: restrained HUD register — ember-and-gold accents over the void; the META box stays a beautifully composed instrument, never neon.",
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
          "Spec Field 4/5 reduced-motion contract: the idle ↔ copied transition becomes an instant glyph + label toggle — no animation, no shake; success is indicated by glyph and color change alone.",
      },
    },
  },
};
