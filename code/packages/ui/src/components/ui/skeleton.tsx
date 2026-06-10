import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

/**
 * Prime Skeleton primitive (F5; shadcn-canonical).
 *
 * Loading placeholder with a subtle pulse — uses Vellum atmospheric
 * tokens so it sits in the warm-paper register, not on a gaudy gray.
 */
export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("animate-pulse bg-surface-inset", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
