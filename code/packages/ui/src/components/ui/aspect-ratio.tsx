"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * Prime AspectRatio primitive (F5; thin Radix wrapper).
 *
 * Used for cartography strip (typically 21/9 cinemascope), hero images
 * (16/9), and any inline imagery that should hold its proportion across
 * breakpoints.
 */
export const AspectRatio = AspectRatioPrimitive.Root;
