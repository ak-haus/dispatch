import type { Meta, StoryObj } from "@storybook/react-vite";
import { PrimeToaster, toast } from "./toaster";

/**
 * Storybook 9 stories for the PrimeToaster primitive (F5; thin sonner
 * wrapper).
 *
 * Toasts are interaction-triggered — each story stages labeled buttons that
 * fire the `toast()` API the vitest suite asserts ("visual rendering
 * verified via Storybook" per primitives.test.tsx). The `.prime-toaster`
 * class hook is wired at ROOF; sonner's own surface styling renders here
 * until that surface CSS lands.
 */

const meta: Meta<typeof PrimeToaster> = {
  title: "Primitives / Toaster",
  component: PrimeToaster,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Thin sonner wrapper with Prime defaults (source header): position bottom-right — out of the editorial reading area; duration 4500ms — long enough to read, short enough not to linger; closeButton on — explicit dismissal honors editorial calm. Class hook `.prime-toaster` is wired at ROOF.",
      },
    },
  },
  argTypes: {
    position: {
      control: { type: "radio" },
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    duration: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    closeButton: { control: { type: "boolean" } },
  },
  args: {
    position: "bottom-right",
    duration: 4500,
    closeButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof PrimeToaster>;

/** Shared stage: labeled triggers that exercise the toast() API. */
const toasterStage: Story["render"] = (args) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "0.75rem",
      minHeight: "16rem",
    }}
  >
    <button
      type="button"
      onClick={() =>
        toast("Dispatch filed", {
          description: "Cell Proof — the Week 3 edition is live on the wire.",
        })
      }
    >
      File dispatch
    </button>
    <button
      type="button"
      onClick={() =>
        toast.success("Edition archived", {
          description: "Ledger entry appended with provenance.",
        })
      }
    >
      Archive edition
    </button>
    <PrimeToaster {...args} />
  </div>
);

export const Default: Story = {
  render: toasterStage,
  parameters: {
    docs: {
      description: {
        story:
          "Prime defaults in play — fire a toast with the buttons; it lands bottom-right, outside the editorial reading area, and dismisses explicitly via the close button.",
      },
    },
  },
};

export const TopCenter: Story = {
  args: { position: "top-center" },
  render: toasterStage,
  parameters: {
    docs: {
      description: {
        story:
          "`position=\"top-center\"` — the override surface from the sonner prop contract. Prime's default stays bottom-right so notices never sit over the reading column.",
      },
    },
  },
};

export const NoCloseButton: Story = {
  args: { closeButton: false },
  render: toasterStage,
  parameters: {
    docs: {
      description: {
        story:
          "`closeButton={false}` — timing-only dismissal. Prime's default keeps the close button: explicit dismissal honors editorial calm (source header).",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: toasterStage,
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the stage substrate re-resolves to walnut with warm-cream ink. The toast surface itself renders sonner defaults until the ROOF-wired `.prime-toaster` surface CSS takes the cycle cascade.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: toasterStage,
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: the stage holds the restrained HUD register — ember-and-gold reserved. Toast surface styling follows the ROOF-wired `.prime-toaster` hook, not the primitive.",
      },
    },
  },
};
