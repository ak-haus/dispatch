import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  useHover,
  useFocus,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  FloatingPortal,
  FloatingFocusManager,
} from "./floating";

/**
 * Storybook 9 stories for the Floating primitive (F5 thin Floating UI
 * surface — floating.tsx is a hooks/utilities module, not a component).
 *
 * Prop surface = the module's re-exports; the demo components below compose
 * them exactly per the source header's stated register: "anchored
 * Inferno-marker callouts on the cartography substrate where the anchor is
 * an SVG element + the float must reposition on scroll" — reached for when
 * Radix Popover/Tooltip/Dropdown do not fit (non-DOM anchors, granular
 * middleware composition).
 *
 * Scaffold styling is story-local (rem layout + semantic tokens only; no
 * radii — no ratified radius scale). FloatingOverlay is exported but not
 * exercised here (no modal-overlay register use exists yet — flagged, not
 * invented).
 *
 * Known limitation: FloatingPortal mounts on document.body, outside the
 * preview decorator's [data-prime-cycle] wrapper — cycle stories therefore
 * use the non-portaled hover-label composition, whose float re-resolves
 * cycle tokens correctly.
 */

const calloutScaffold: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
  maxWidth: "18rem",
  padding: "0.75rem 1rem",
  background: "var(--surface-inset)",
  border: "1px solid var(--rail-edge)",
  color: "var(--text-strong)",
};

const anchorButtonScaffold: CSSProperties = {
  padding: "0.25rem 0",
  fontSize: "0.875rem",
  background: "transparent",
  border: "none",
  color: "var(--text-strong)",
  textDecoration: "underline dotted",
  cursor: "pointer",
};

interface FloatingDemoProps {
  /** Accessible name for the anchor (a11y-bearing — always provided). */
  label: string;
  /** Float body copy. */
  children: ReactNode;
  /** Open on mount so the canvas shows the positioned float. */
  initialOpen?: boolean;
}

/**
 * The source header's register use, verbatim: an SVG marker on a cartography
 * plot anchors a click-opened callout. Composes useFloating + offset/flip/
 * shift/arrow middleware, autoUpdate (reposition on scroll/resize),
 * useClick + useDismiss + useRole, FloatingPortal + FloatingFocusManager.
 */
function InfernoMarkerCallout({
  label,
  children,
  initialOpen = false,
}: FloatingDemoProps) {
  const [open, setOpen] = useState(initialOpen);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  // Accessible name for the role="dialog" float (axe aria-dialog-name): the
  // APG dialog pattern names the dialog via aria-labelledby on its visible
  // title — useRole supplies the role, the label wiring is the consumer's.
  const headingId = useId();
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <svg width={240} height={160} viewBox="0 0 240 160">
        {/* Lot-line hairline scaffolding via the grid-line slot (architectural-document register) */}
        <path
          aria-hidden="true"
          d="M0 40 H240 M0 80 H240 M0 120 H240 M60 0 V160 M120 0 V160 M180 0 V160"
          stroke="var(--grid-line)"
          strokeWidth={1}
          fill="none"
        />
        <circle
          ref={refs.setReference}
          {...getReferenceProps()}
          cx={120}
          cy={80}
          r={7}
          // Inferno marker pulse pigment — the callout's stated anchor register (floating.tsx header)
          fill="var(--asset-cartography-pulse)"
          role="button"
          tabIndex={0}
          aria-label={label}
          style={{ cursor: "pointer" }}
        />
      </svg>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, ...calloutScaffold }}
              {...getFloatingProps({ "aria-labelledby": headingId })}
            >
              <strong
                id={headingId}
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </strong>
              <div style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                {children}
              </div>
              <div
                ref={arrowRef}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "0.625rem",
                  height: "0.625rem",
                  transform: "rotate(45deg)",
                  background: "var(--surface-inset)",
                  borderRight: "1px solid var(--rail-edge)",
                  borderBottom: "1px solid var(--rail-edge)",
                  bottom: "-0.3125rem",
                  left:
                    middlewareData.arrow?.x != null
                      ? `${middlewareData.arrow.x}px`
                      : undefined,
                }}
              />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

/**
 * Hover/focus wayfinding label — composes useHover + useFocus + useDismiss +
 * useRole(tooltip). Renders the float inline (no portal), which also keeps it
 * inside the cycle cascade scope for the Dusk/Night stories.
 */
function DistrictHoverLabel({
  label,
  children,
  initialOpen = false,
}: FloatingDemoProps) {
  const [open, setOpen] = useState(initialOpen);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "right",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        style={anchorButtonScaffold}
      >
        {label}
      </button>
      {open && (
        <div
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...calloutScaffold }}
          {...getFloatingProps()}
        >
          <span style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
            {children}
          </span>
        </div>
      )}
    </>
  );
}

const meta: Meta<typeof InfernoMarkerCallout> = {
  title: "Primitives / Floating",
  component: InfernoMarkerCallout,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Thin Floating UI re-export surface (F5) for positioning needs Radix does not cover: non-DOM/SVG anchors, follow-cursor logic, granular middleware composition (floating.tsx header). The demo composes the stated register use — an SVG Inferno-marker callout on the cartography substrate that repositions via autoUpdate.",
      },
    },
  },
  argTypes: {
    label: { control: { type: "text" } },
    children: { control: { type: "text" } },
    initialOpen: { control: { type: "boolean" } },
  },
  args: {
    label: "Inferno marker · Editorial District",
    children:
      "Live agent activity at the Editorial District plot — three dispatches drafted this cycle; the marker pulse is the only substrate element permitted to animate at scroll cadence.",
    initialOpen: true,
  },
};

export default meta;
type Story = StoryObj<typeof InfernoMarkerCallout>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Click-anchored callout on an SVG marker: offset + flip + shift + arrow middleware, autoUpdate repositioning, dismiss-on-outside-press, ARIA dialog role, and focus management — the full non-Radix positioning kit from the module's exports.",
      },
    },
  },
};

export const ClosedUntilInvoked: Story = {
  args: { initialOpen: false },
  parameters: {
    docs: {
      description: {
        story:
          "Resting state: useClick opens on click and — because the anchor is an SVG element, not a native button — on Enter/Space via its keyboard handlers; useDismiss closes on Escape and outside press.",
      },
    },
  },
};

export const HoverWayfinding: Story = {
  render: (args) => (
    <DistrictHoverLabel {...args} initialOpen={false} label="Editorial District">
      Writing-track quarter of the cartography — home plot of the weekly field
      dispatch.
    </DistrictHoverLabel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "useHover + useFocus composition with a tooltip role: the wayfinding label surfaces on settled hover or keyboard focus and renders inline without a portal.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: (args) => (
    <DistrictHoverLabel {...args} initialOpen label="Editorial District">
      Writing-track quarter of the cartography — home plot of the weekly field
      dispatch.
    </DistrictHoverLabel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: warm-cream ink over the walnut substrate, the float's inset surface and rail-edge hairline re-resolved by the data-prime-cycle cascade — the primitive authors no theme variants (Rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: (args) => (
    <DistrictHoverLabel {...args} initialOpen label="Editorial District">
      Writing-track quarter of the cartography — home plot of the weekly field
      dispatch.
    </DistrictHoverLabel>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: the wayfinding label reads in the restrained HUD register — near-white ink, ember accents — with every semantic token re-resolved through the cascade (Rule 5).",
      },
    },
  },
};
