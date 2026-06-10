"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "../../utils/cn";

/**
 * Prime HoverCard primitive (F5; thin Radix wrapper).
 *
 * Editorial use: inline-link previews on citizen names, agent IDs,
 * cartography district labels. Hovering surfaces a card with avatar +
 * bio + lane chip without navigating away — Wikipedia-style preview pop.
 *
 * Defaults: 280ms open delay (settled hover), 100ms close delay.
 */

export const HoverCard = ({
  openDelay = 280,
  closeDelay = 100,
  ...props
}: ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>) => (
  <HoverCardPrimitive.Root
    openDelay={openDelay}
    closeDelay={closeDelay}
    {...props}
  />
);
HoverCard.displayName = "HoverCard";

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-72 border border-rail-edge bg-surface-page p-4 text-text-strong shadow-none outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = "HoverCardContent";
