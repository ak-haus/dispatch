"use client";

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
  FloatingOverlay,
} from "@floating-ui/react";

/**
 * Prime Floating UI primitive re-exports (F5; thin Floating UI surface).
 *
 * Used for any positioning need NOT covered by Radix Popover/Tooltip/Dropdown
 * (e.g., anchored Inferno-marker callouts on the cartography substrate
 * where the anchor is an SVG element + the float must reposition on scroll).
 *
 * Prefer Radix primitives for standard ARIA-grade dialog/menu/tooltip.
 * Reach for Floating UI when you need:
 *   - custom positioning logic (e.g., follow-cursor)
 *   - non-DOM anchors (SVG, virtual coordinates)
 *   - granular middleware composition (autoUpdate + custom shift)
 */
export {
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
  FloatingOverlay,
};
