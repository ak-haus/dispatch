"use client";

import { Command as CommandPrimitive } from "cmdk";
import { clsx } from "clsx";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

/**
 * Prime Command primitive (F5; thin cmdk wrapper).
 *
 * Foundation for the V1 SearchPalette component (cmdk-based per CD4 §3.1 #18).
 * Class hooks: `.prime-command__{part}` — wired at ROOF.
 */
export const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={clsx("prime-command", className)}
    {...props}
  />
));
Command.displayName = "Command";

export const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="prime-command__input-wrap" cmdk-input-wrapper="">
    <CommandPrimitive.Input
      ref={ref}
      className={clsx("prime-command__input", className)}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

export const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={clsx("prime-command__list", className)}
    {...props}
  />
));
CommandList.displayName = "CommandList";

export const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="prime-command__empty"
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

export const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={clsx("prime-command__group", className)}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

export const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={clsx("prime-command__item", className)}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

export const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    // axe: aria-required-children — an ARIA listbox owns only option/group
    // children (WAI-ARIA APG Listbox pattern), and cmdk hardcodes
    // role="separator" on this node inside its role="listbox" list. The rule
    // between groups is purely decorative (the group structure already
    // conveys the boundary), so it is removed from the accessibility tree.
    // DOM and visuals are unchanged; cmdk spreads props before its own
    // attributes, so aria-hidden passes through while role stays cmdk-owned.
    aria-hidden="true"
    className={clsx("prime-command__separator", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";
