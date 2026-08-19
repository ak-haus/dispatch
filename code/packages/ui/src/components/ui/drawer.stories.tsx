import {
  useEffect,
  type CSSProperties,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer";

/**
 * Storybook 9 stories for the Drawer primitive (F5; thin vaul wrapper —
 * source header, drawer.tsx).
 *
 * The prop surface is vaul's own (Root: open / defaultOpen /
 * onOpenChange / direction / modal / dismissible …); the Prime wrapper
 * pins `shouldScaleBackground` to false by default and contributes the
 * `.prime-drawer__{part}` class hooks, wired at ROOF. DrawerContent
 * self-portals with its overlay (source composition), so stories only
 * compose Trigger → Content (Title / Description / Close). The source
 * header names both registers the matrix covers: the bottom sheet
 * (mobile SearchPalette fallback) and the side sheet (future VirgilChat
 * docked drawer pattern). The portal renders to document.body — outside
 * the preview decorator's cycle wrapper — so a story-file decorator
 * bridges the active cycle global onto the document root.
 */

/**
 * Bridges the active cycle onto the document root so portaled drawer
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
 * sheet visible in the preview; rem units, tokens via var() only.
 */
const bottomSheetStyle: CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "1.5rem",
  background: "var(--surface-inset)",
  color: "var(--text-strong)",
  borderTop: "1px solid var(--chrome-border)",
};

const sideSheetStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "min(20rem, 85vw)",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "1.5rem",
  background: "var(--surface-inset)",
  color: "var(--text-strong)",
  borderLeft: "1px solid var(--chrome-border)",
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

const sheetBody = (
  <>
    <DrawerTitle style={{ margin: 0, fontSize: "1.125rem" }}>
      Search dispatches
    </DrawerTitle>
    <DrawerDescription
      style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}
    >
      The mobile reception window — dispatches, signals, and districts,
      reachable from one sheet.
    </DrawerDescription>
    <DrawerClose style={buttonStyle}>Close</DrawerClose>
  </>
);

const renderBottomSheet = (
  args: ComponentProps<typeof Drawer>,
): ReactElement => (
  <Drawer {...args}>
    <DrawerTrigger style={buttonStyle}>Open search</DrawerTrigger>
    <DrawerContent style={bottomSheetStyle}>{sheetBody}</DrawerContent>
  </Drawer>
);

const renderSideSheet = (args: ComponentProps<typeof Drawer>): ReactElement => (
  <Drawer {...args}>
    <DrawerTrigger style={buttonStyle}>Open docked drawer</DrawerTrigger>
    <DrawerContent style={sideSheetStyle}>{sheetBody}</DrawerContent>
  </Drawer>
);

const meta: Meta<typeof Drawer> = {
  title: "Primitives / Drawer",
  component: Drawer,
  tags: ["autodocs"],
  decorators: [withPortalCycle],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Thin vaul wrapper (F5) for bottom/side sheets — the mobile SearchPalette fallback and the future VirgilChat docked drawer pattern (source header). DrawerContent self-portals with its overlay; drag-to-dismiss, snap logic, and dialog ARIA come from vaul; `.prime-drawer__{part}` class hooks are wired at ROOF. The Prime wrapper defaults `shouldScaleBackground` to false.",
      },
    },
  },
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["top", "bottom", "left", "right"],
    },
    defaultOpen: { control: { type: "boolean" } },
    modal: { control: { type: "boolean" } },
    dismissible: { control: { type: "boolean" } },
    shouldScaleBackground: { control: { type: "boolean" } },
  },
  args: {
    direction: "bottom",
    dismissible: true,
    shouldScaleBackground: false,
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Closed: Story = {
  render: (args) => renderBottomSheet(args),
  parameters: {
    docs: {
      description: {
        story:
          "Closed lifecycle state — only the trigger renders; nothing is portaled until vaul flips open. Click the trigger to exercise open, drag-to-dismiss, and overlay dismissal.",
      },
    },
  },
};

export const OpenBottomSheet: Story = {
  args: { defaultOpen: true },
  render: (args) => renderBottomSheet(args),
  parameters: {
    docs: {
      description: {
        story:
          "Open bottom sheet via `defaultOpen` — the mobile SearchPalette fallback register (source header). vaul wires the dialog ARIA contract (Title + Description) and owns the drag gesture.",
      },
    },
  },
};

export const SideSheet: Story = {
  args: { defaultOpen: true, direction: "right" },
  render: (args) => renderSideSheet(args),
  parameters: {
    docs: {
      description: {
        story:
          "`direction=\"right\"` side sheet — the future VirgilChat docked drawer pattern the source header names. Same compound API, vaul re-orients the drag axis.",
      },
    },
  },
};

export const DuskCycle: Story = {
  args: { defaultOpen: true },
  render: (args) => renderBottomSheet(args),
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: the sheet lifts from the walnut substrate in warm-cream ink with gilded-copper chrome. The story decorator bridges the cycle onto the document root so the portaled sheet inherits the cascade; the primitive authors no theme variant (Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  args: { defaultOpen: true },
  render: (args) => renderBottomSheet(args),
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: the sheet reads as a restrained HUD edge, ember-and-gold accents over the void. Cycle attribute bridged to the document root for the portal (Rule 5).",
      },
    },
  },
};

export const ReducedMotion: Story = {
  args: { defaultOpen: true },
  render: (args) => renderBottomSheet(args),
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  parameters: {
    docs: {
      description: {
        story:
          "Reduced-motion contract: the slide/settle choreography is ROOF-wired chrome over vaul's gesture engine; under prefers-reduced-motion it clamps to static or an opacity-only crossfade within the ratified 200ms cap (DESIGN.md ratified motion gates).",
      },
    },
  },
};
