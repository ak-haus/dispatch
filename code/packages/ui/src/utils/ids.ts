import { nanoid, customAlphabet } from "nanoid";

/**
 * Prime DISpatch id generators (nanoid wrappers).
 *
 * Three flavors for different domains:
 *   - newId()       → standard nanoid (URL-safe; 21 chars)
 *   - newSlugId()   → kebab-friendly (lowercase + digit + hyphen; 12 chars);
 *                     used for transient slugs in drafts before publish
 *   - newShortId()  → short cardinal id (8 chars); for live-ticker rows,
 *                     ephemeral notifications, etc.
 */

const slugAlphabet = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);
const shortAlphabet = customAlphabet(
  "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  8,
);

export function newId(): string {
  return nanoid();
}

export function newSlugId(): string {
  return slugAlphabet();
}

export function newShortId(): string {
  return shortAlphabet();
}
