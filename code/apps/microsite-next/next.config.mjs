// Prime DISpatch — Next.js 15 config (W2-S-A bedrock + Tailwind v4 + UI workspace dep).
// App Router + RSC + Server Actions are Next.js 15 defaults — no flags needed.
//
// Hybrid architectural rationale: this Next.js surface is the platform-integration
// layer for Prime's hub webapp. Astro 6 (microsite-astro) is the editorial content
// surface. The microsite IS an app inside the larger Prime platform — these two apps
// share tokens + UI package and present as a unified Building.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // Workspace package transpilation (pnpm workspace deps with TS source).
  transpilePackages: ["@prime-dispatch/tokens", "@prime-dispatch/ui"],
};

export default nextConfig;
