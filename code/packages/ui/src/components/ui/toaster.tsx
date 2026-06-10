"use client";

import { Toaster as SonnerToaster, toast } from "sonner";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Prime Toaster primitive (F5; thin sonner wrapper).
 *
 * Prime defaults:
 *   - position: "bottom-right" — out of the editorial reading area
 *   - duration: 4500ms — long enough to read; short enough not to linger
 *   - closeButton: true — explicit dismissal honors editorial calm
 *
 * Class hooks: `.prime-toaster` — wired at ROOF.
 */
export type PrimeToasterProps = ComponentPropsWithoutRef<typeof SonnerToaster>;

export function PrimeToaster({
  position = "bottom-right",
  duration = 4500,
  closeButton = true,
  className,
  ...props
}: PrimeToasterProps) {
  return (
    <SonnerToaster
      position={position}
      duration={duration}
      closeButton={closeButton}
      className={["prime-toaster", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { toast };
