// Subpath import: pulls only F5 primitives (button, card, separator + Radix
// wrappers) without dragging in custom client components that haven't been
// marked "use client" yet.
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@prime-dispatch/ui/f5";

/**
 * Prime DISpatch — Next.js 15 platform-integration shell.
 *
 * This page is the bridge surface between DISpatch (the microsite) and
 * the larger Prime hub webapp. The Astro surface serves editorial content;
 * this surface serves interactive / authenticated / cross-Building
 * functionality.
 *
 * Shell phase (2026-05-11): proves the framework stack is operational —
 * Tailwind v4 utilities resolve, shadcn primitives render, Lenis smooth
 * scroll works, tokens flow through the 3-cycle theme system.
 */
export default function Page() {
  return (
    <main className="min-h-screen px-major-grid py-major-grid mx-auto max-w-screen-xl">
      <header className="mb-major-grid">
        <p className="font-nav text-xs uppercase tracking-[0.18em] text-text-muted">
          Platform · Next.js 15 surface
        </p>
        <h1 className="font-title text-5xl md:text-7xl font-bold text-text-strong leading-[0.95] tracking-tight mt-4">
          <span className="text-wordmark-dis">DIS</span>
          <span className="text-wordmark-patch">patch</span>
        </h1>
        <p className="font-body text-lg text-text-muted max-w-prose mt-6">
          The platform-integration surface for Prime&apos;s hub webapp. An app inside
          the bigger app — same DNA, different scope from the editorial Astro
          surface.
        </p>
      </header>

      <Separator className="my-major-grid" />

      <section className="grid gap-major-grid md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Foundation</CardTitle>
            <CardDescription>
              Tailwind v4 + shadcn + Radix wired to the canon token system.
            </CardDescription>
          </CardHeader>
          <CardContent className="font-code text-xs text-text-muted">
            <code>@prime-dispatch/tokens</code>
            <br />
            <code>@prime-dispatch/ui</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Motion</CardTitle>
            <CardDescription>
              Lenis + GSAP + Motion v12 + AutoAnimate + scrollama, behind a
              reduced-motion floor.
            </CardDescription>
          </CardHeader>
          <CardContent className="font-code text-xs text-text-muted">
            <code>@prime-dispatch/ui/next-shell</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Provenance</CardTitle>
            <CardDescription>
              Every surface DLDS-co-authored. C2PA + IPTC ready for editorial
              transparency.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 flex-wrap">
            <span className="font-nav text-xs uppercase tracking-wider px-2 py-1 bg-lane-editorial text-surface-page">
              Editorial
            </span>
            <span className="font-nav text-xs uppercase tracking-wider px-2 py-1 bg-lane-institutional text-surface-page">
              Institutional
            </span>
            <span className="font-nav text-xs uppercase tracking-wider px-2 py-1 bg-lane-dispatch text-surface-page">
              Dispatch
            </span>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-major-grid" />

      <section className="flex gap-4 flex-wrap">
        <Button variant="dispatch" size="lg">
          Visit the editorial surface
        </Button>
        <Button variant="outline" size="lg">
          Hub webapp (Prime)
        </Button>
        <Button variant="ghost" size="lg">
          Read the brief
        </Button>
      </section>
    </main>
  );
}
