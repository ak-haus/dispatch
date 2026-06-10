import { MastheadWordmark } from "@prime-dispatch/ui";

/**
 * Smoke-test fixture for MastheadWordmark.
 * Minimal render configurations per spec.md Field 2 variants.
 * Consumed by lifecycle smoke-test runner (post-W3-S-A scope).
 */

export const MastheadWordmarkFixtures = {
  Default: () => <MastheadWordmark href="/" />,
  Compact: () => <MastheadWordmark variant="compact" href="/" />,
  HeaderScale: () => <MastheadWordmark scale="header" href="/" />,
  FaviconScale: () => <MastheadWordmark scale="favicon" href="/" />,
  AsH1: () => <MastheadWordmark as="h1" />,
};
