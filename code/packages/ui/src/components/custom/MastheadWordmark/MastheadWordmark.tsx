import { clsx } from "clsx";
import type {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactElement,
} from "react";
import "./MastheadWordmark.css";

/**
 * MastheadWordmark — DISpatch building-name identity.
 *
 * Visual archetype: typographic-only mark. Per W3-S-A phase-1-reset-rules:
 *   - Rule 1 — no background on root (substrate is host-owned).
 *   - Rule 3 — split-color follows lane semantics: DIS = dispatch wine,
 *     patch = institutional text-strong.
 *   - Rule 4 — distinct visual character: this is the BARE TYPOGRAPHY
 *     archetype (no chrome around it; the mark IS the chrome).
 *   - Rule 6 — opacity-only hover; less chrome.
 *
 * Polymorphic root (`as` prop) lets surfaces choose semantic element:
 *   `<h1>` on homepage  /  `<span>` inside `<header>` on article surfaces
 *   `<a>` when linking back to homepage (most common case)
 *
 * Spec: representation/visual-system/components/MastheadWordmark/spec.md
 */

type MastheadWordmarkVariant = "default" | "compact";

type MastheadWordmarkScale =
  | "masthead"
  | "landing"
  | "header"
  | "favicon";

type CommonProps = {
  /** Variant per spec.md Field 2 — `default` or `compact` (mobile/constrained chrome). */
  variant?: MastheadWordmarkVariant;
  /** Type scale — `masthead` (~72px) / `landing` (~48px) / `header` (~24px) / `favicon` (~16px). */
  scale?: MastheadWordmarkScale;
  /**
   * Visible label override (default: "DISpatch"). Always split as DIS + patch.
   * Custom label MUST start with "DIS" to preserve cosmology encoding.
   */
  label?: string;
  /** Accessible label for the link/heading. Defaults to "DISpatch — return to homepage". */
  ariaLabel?: string;
  className?: string;
};

type AsAnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    as?: "a";
    href: string;
  };

type AsNonAnchorProps = CommonProps &
  Omit<HTMLAttributes<HTMLElement>, "className"> & {
    as?: Exclude<ElementType, "a">;
    href?: never;
  };

export type MastheadWordmarkProps = AsAnchorProps | AsNonAnchorProps;

const SCALE_CLASS: Record<MastheadWordmarkScale, string> = {
  masthead: "prime-wordmark--masthead",
  landing: "prime-wordmark--landing",
  header: "prime-wordmark--header",
  favicon: "prime-wordmark--favicon",
};

function splitDis(label: string): { dis: string; patch: string } {
  // Cosmology rule: first three glyphs are the dispatch slot.
  if (label.length <= 3) return { dis: label, patch: "" };
  return { dis: label.slice(0, 3), patch: label.slice(3) };
}

export function MastheadWordmark(props: MastheadWordmarkProps): ReactElement {
  const {
    variant = "default",
    scale = "masthead",
    label = "DISpatch",
    ariaLabel = "DISpatch — return to homepage",
    className,
    as,
    ...rest
  } = props as MastheadWordmarkProps & { as?: ElementType };

  const Tag: ElementType = as ?? "a";
  const { dis, patch } = splitDis(label);

  const cls = clsx(
    "prime-wordmark",
    variant === "compact"
      ? "prime-wordmark--compact"
      : SCALE_CLASS[scale],
    className
  );

  // Anchor surfaces get aria-label + default href guarded by AsAnchorProps
  const ariaProps =
    Tag === "a"
      ? { "aria-label": ariaLabel }
      : { "aria-label": ariaLabel };

  return (
    <Tag className={cls} {...ariaProps} {...rest}>
      <span className="prime-wordmark__dis">{dis}</span>
      {patch.length > 0 ? (
        <span className="prime-wordmark__patch">{patch}</span>
      ) : null}
    </Tag>
  );
}
