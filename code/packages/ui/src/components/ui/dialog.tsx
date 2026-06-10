"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

/**
 * Prime Dialog primitive (F5; thin Radix wrapper).
 *
 * Compound API:
 *   <Dialog>
 *     <DialogTrigger>Open</DialogTrigger>
 *     <DialogPortal>
 *       <DialogOverlay />
 *       <DialogContent>
 *         <DialogTitle>Title</DialogTitle>
 *         <DialogDescription>Body</DialogDescription>
 *         <DialogClose>Close</DialogClose>
 *       </DialogContent>
 *     </DialogPortal>
 *   </Dialog>
 *
 * Class hooks: `.prime-dialog__{part}` — wired to chrome at the ROOF, not here.
 * ARIA + focus management + keyboard nav: provided by Radix.
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={clsx("prime-dialog__overlay", className)}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={clsx("prime-dialog__content", className)}
    {...props}
  >
    {children}
  </DialogPrimitive.Content>
));
DialogContent.displayName = "DialogContent";

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx("prime-dialog__title", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={clsx("prime-dialog__description", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
