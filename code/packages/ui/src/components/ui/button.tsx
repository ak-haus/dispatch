import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

/**
 * Prime Button primitive (F5; shadcn-canonical + Prime token-mapped).
 *
 * Variants encode lane provenance (per CD2 §4 lane pigments). `dispatch` is
 * the accent-prime register; `editorial` + `institutional` reserve their
 * lanes; `outline` + `ghost` + `link` are minimal-chrome variants.
 *
 * Per INSPO/dispatch-brief.md atmospheric rule: sharp 0px radius on primary
 * buttons; icon-toggles use 50% (handled at call site or via separate
 * IconToggle component).
 *
 * Per Mayor's form-after-function discipline: utility classes are sensible
 * defaults; component consumers override via className.
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-text-strong text-surface-page hover:bg-copper-deep",
        dispatch:
          "bg-lane-dispatch text-surface-page hover:bg-accent-prime-active",
        editorial:
          "bg-lane-editorial text-surface-page hover:opacity-90",
        institutional:
          "bg-lane-institutional text-surface-page hover:opacity-90",
        outline:
          "border border-rail-edge bg-transparent text-text-strong hover:bg-surface-inset",
        ghost:
          "bg-transparent text-text-strong hover:bg-surface-inset",
        link:
          "bg-transparent text-text-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
