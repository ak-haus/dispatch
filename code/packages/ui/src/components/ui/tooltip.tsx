"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

/**
 * Prime Tooltip primitive (F5; thin Radix wrapper).
 *
 * Prime defaults:
 *   - delayDuration: 300ms — gives users time to settle on hovered element
 *     without flashing on transit (per editorial reading register; mirrors
 *     NYT Mag in-text glossary timing)
 *   - skipDelayDuration: 200ms
 *
 * Class hooks: `.prime-tooltip__{part}` — wired at ROOF.
 */
export const TooltipProvider = ({
  children,
  delayDuration = 300,
  skipDelayDuration = 200,
  ...props
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider
    delayDuration={delayDuration}
    skipDelayDuration={skipDelayDuration}
    {...props}
  >
    {children}
  </TooltipPrimitive.Provider>
);
TooltipProvider.displayName = "TooltipProvider";

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={clsx("prime-tooltip__content", className)}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

export const TooltipArrow = forwardRef<
  ElementRef<typeof TooltipPrimitive.Arrow>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={clsx("prime-tooltip__arrow", className)}
    {...props}
  />
));
TooltipArrow.displayName = "TooltipArrow";
