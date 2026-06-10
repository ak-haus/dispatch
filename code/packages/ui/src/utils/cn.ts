import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Prime className composer (industry-standard pattern).
 *
 * Combines clsx (truthy-conditional className composition) with
 * tailwind-merge (deduplicates conflicting Tailwind utilities so the
 * last-applied utility wins).
 *
 * Used at the ROOF floor when Tailwind utilities flow into components.
 * At F9, this is the helper itself; consumers wire it later.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
