import {
  useEffect,
  type CSSProperties,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog";

/**
 * Storybook 9 stories for the Dialog primitive (F5; thin Radix wrapper —
 * source header, dialog.tsx).
 *
 * The prop surface is Radix's own (Root: open / defaultOpen /
 * onOpenChange / modal); the wrapper contributes only the
 * `.prime-dialog__{part}` class hooks, wired to chrome at ROOF, not
 * here. Stories compose the documented compound API exactly as the
 * source header prescribes: Trigger → Portal → Overlay + Content
 * (Title / Description / Close). Radix DialogPortal renders to
 * document.body — OUTSIDE the preview decorator's cycle wrapper — so a
 * story-file decorator bridges the active cycle global onto the
 * document root, letting the portaled dialog inherit the
 * [data-prime-cycle] cascade.
 */

/**
 * Bridges the active cycle onto the document root so DialogPortal
 * content (rendered on document.body) inherits the cycle cascade.
 * Dawn is the :root default, so the attribute is only set for
 * dusk/night — matching how the microsite drives the cascade.
 */
function CyclePortalBridge(props: {
  cycle: string;
  children: ReactNode;
}): ReactElement {
  const { cycle, children } = props;
  useEffect(() => {
    const root = document.documentElement;
    if (cycle === "dawn") {
      root.removeAttribute("data-prime-cycle");
    } else {
      root.setAttribute("data-prime-cycle", cycle);
    }
    return () => {
      root.removeAttribute("data-prime-cycle");
    };
  }, [cycle]);
  return <>{children}</>;
}

const withPortalCycle: Decorator = (Story, context) => {
  const cycle = (context.globals as { cycle?: string }).cycle ?? "dawn";
  return (
    <CyclePortalBridge cycle={cycle}>
      <Story />
    </CyclePortalBridge>
  );
};

/**
 * Story scaffolding only — the primitive ships unstyled by design (class
 * hooks wired at ROOF). Positioning + token surfaces make the portaled
 * content visible in the preview; rem units, tokens via var() only.
 */
const contentStyle: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 3rem)",
  maxWidth: "26rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "1.5rem",
  background: "var(--surface-inset)",
  color: "var(--text-strong)",
  border: "1px solid var(--chrome-border)",
};

const buttonStyle: CSSProperties = {
  font: "inherit",
  fontSize: "0.875rem",
  padding: "0.5rem 1rem",
  border: "1px solid var(--chrome-border)",
  background: "var(--surface-inset)",
  color: "var(--chrome-text)",
  cursor: "pointer",
  alignSelf: "flex-start",
};

const renderSubscribeDialog = (
  args: ComponentProps<typeof Dialog>,
): ReactElement => (
  <Dialog {...args}>
    <DialogTrigger style={buttonStyle}>Subscribe</DialogTrigger>
    <DialogPortal>
      {/* Scrim chrome is ROOF-wired; the unstyled overlay still carries
          Radix's dismiss + scroll-lock behavior (Rule 6: less chrome). */}
      <DialogOverlay />
      <DialogContent style={contentStyle}>
        <DialogTitle style={{ margin: 0, fontSize: "1.125rem" }}>
          Subscribe to DISpatch
        </DialogTitle>
        <DialogDescription
          style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}
        >
          Receive new dispatches from the desk — weekly, no noise. Signals
          land as they are filed.
        </DialogDescription>
        <DialogClose style={buttonStyle}>Close</DialogClose>
      </DialogContent>
    </DialogPortal>
  </Dialog>
);

const meta: Meta<typeof Dialog> = {
  title: "Primitives / Dialog",
  component: Dialog,
  tags: ["autodocs"],
  decorators: [withPortalCycle],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Thin Radix Dialog wrapper (F5): compound API Dialog / Trigger / Portal / Overlay / Content / Title / Description / Close. ARIA dialog role, focus trap, and keyboard dismissal come from Radix; the `.prime-dialog__{part}` class hooks are wired to chrome at ROOF, not here (source header; the shared-primitive earned-place case per components/ui README — a Dialog shared by SearchPalette and future modal chrome).",
      },
    },
  },
  argTypes: {
    defaultOpen: { control: { type: "boolean" } },
    modal: { control: { type: "boolean" } },
  },
  args: {
    modal: true,
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Closed: Story = {
  render: (args) => renderSubscribeDialog(args),
  parameters: {
    docs: {
      description: {
        story:
          "Closed lifecycle state — only the trigger renders; nothing is portaled until Radix flips open. Click the trigger to exercise the full open cycle (focus trap, escape and overlay dismissal).",
      },
    },
  },
};

export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => renderSubscribeDialog(args),
  parameters: {
    docs: {
      description: {
        story:
          "Open state via `defaultOpen` — the portaled content exposes the ARIA dialog role with Title and Description wired by Radix (the same contract the primitives vitest suite asserts).",
      },
    },
  },
};

export const DuskCycle: Story = {
  args: { defaultOpen: true },
  render: (args) => renderSubscribeDialog(args),
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: the dialog surface re-resolves to walnut with gilded-copper chrome text and warm-cream ink. The story decorator bridges the cycle onto the document root so the portaled content inherits the cascade; the primitive authors no theme variant (Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  args: { defaultOpen: true },
  render: (args) => renderSubscribeDialog(args),
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: the dialog holds as a restrained HUD panel, ember-and-gold accents over the void. Cycle attribute bridged to the document root for the portal (Rule 5).",
      },
    },
  },
};

export const ReducedMotion: Story = {
  args: { defaultOpen: true },
  render: (args) => renderSubscribeDialog(args),
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  parameters: {
    docs: {
      description: {
        story:
          "Reduced-motion contract: the primitive itself carries no motion (enter/exit choreography is ROOF-wired chrome); under prefers-reduced-motion that chrome clamps to static or an opacity-only crossfade within the ratified 200ms cap (DESIGN.md ratified motion gates).",
      },
    },
  },
};
