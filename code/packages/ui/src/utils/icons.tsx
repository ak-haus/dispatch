import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Menu,
  Check,
  Info,
  AlertCircle,
  AlertTriangle,
  Copy,
  ExternalLink,
  type LucideProps,
} from "lucide-react";
import type { ReactElement } from "react";

/**
 * Prime icon set (curated Lucide React subset).
 *
 * Per prime-design canon: 1.5px stroke; sizes 16/20/24; outline only;
 * NEVER emoji. Lucide React provides exactly this register.
 *
 * Curated subset reduces tree-shake-bypass surface area; consumers
 * import named icons + receive consistent Prime defaults via
 * `<PrimeIcon icon={ArrowRight} size="md" />`.
 *
 * Token canon: see prime-design skill README "Iconography" section.
 */

export type PrimeIconSize = "sm" | "md" | "lg";

const SIZE_TO_PX: Record<PrimeIconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export type PrimeIconProps = Omit<LucideProps, "size"> & {
  icon: React.ComponentType<LucideProps>;
  size?: PrimeIconSize;
};

export function PrimeIcon({
  icon: Icon,
  size = "md",
  strokeWidth = 1.5,
  ...props
}: PrimeIconProps): ReactElement {
  return (
    <Icon
      size={SIZE_TO_PX[size]}
      strokeWidth={strokeWidth}
      aria-hidden={props["aria-label"] ? undefined : "true"}
      {...props}
    />
  );
}

// Re-export the curated icon set for direct use when PrimeIcon wrapper
// is more friction than value (e.g., inline icons inside Storybook stories).
export {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Menu,
  Check,
  Info,
  AlertCircle,
  AlertTriangle,
  Copy,
  ExternalLink,
};
