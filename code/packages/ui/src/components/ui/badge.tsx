import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

/**
 * Prime Badge primitive (F5; shadcn-canonical + DLDS lane-coded).
 *
 * Variants encode DLDS provenance lane semantics (Hybrid / Human-led / AI-led)
 * mapped to lane pigments. Used inline as a DLDS chip, byline lane marker,
 * or any small categorical signal.
 */

const badgeVariants = cva(
  "inline-flex items-center font-nav uppercase tracking-[0.12em] font-extrabold leading-none",
  {
    variants: {
      variant: {
        default: "bg-text-strong text-surface-page",
        editorial: "bg-lane-editorial text-surface-page",
        institutional: "bg-lane-institutional text-surface-page",
        dispatch: "bg-lane-dispatch text-surface-page",
        outline: "border border-rail-edge bg-transparent text-text-strong",
        muted: "bg-surface-inset text-text-muted",
      },
      size: {
        default: "text-[0.6875rem] px-2 py-1",
        sm: "text-[0.5625rem] px-1.5 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { badgeVariants };
