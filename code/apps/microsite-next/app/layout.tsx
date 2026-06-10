import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { LenisRoot, themeCyclerBlockingScript } from "@prime-dispatch/ui/next-shell";
import "./globals.css";

/**
 * Prime DISpatch — Next.js 15 root layout.
 *
 * The Next.js surface is the platform-integration layer for Prime's hub
 * webapp. Astro 6 (microsite-astro) is the editorial content surface. Both
 * apps share tokens + UI package and present as a unified Building.
 *
 * Framework wiring:
 *   - globals.css → Tailwind v4 + @prime-dispatch/tokens
 *   - LenisRoot → smooth scroll (honors prefers-reduced-motion)
 *   - themeCyclerBlockingScript → FOUC prevention for 3-cycle theme
 *   - data-prime-cycle="dawn" → default theme (substrate is dawn warm-paper)
 */

export const metadata: Metadata = {
  title: "Prime DISpatch",
  description:
    "An AI-first dev-diary microsite — the first Building inside Prime City. Editorial co-authored with agentic staff.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-prime-cycle="dawn">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeCyclerBlockingScript() }}
        />
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body data-prime-reduced-motion="no-preference">
        <LenisRoot />
        {children}
      </body>
    </html>
  );
}
