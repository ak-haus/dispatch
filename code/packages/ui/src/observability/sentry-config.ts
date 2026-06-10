/**
 * Prime Sentry config factory (F10 observability primitive).
 *
 * Per Stream 1 floor plan F10 + master plan §6.6 verification ladder:
 * Sentry SDK is wired but DORMANT until Stream 2 Path X provisions the
 * production DSN. This factory returns `enabled: false` when no DSN is
 * present in env — apps Sentry.init({ ...config }) on the result and the
 * SDK no-ops without errors.
 *
 * DSN env-var precedence (most specific → most general):
 *   1. SENTRY_DSN              (server)
 *   2. NEXT_PUBLIC_SENTRY_DSN  (Next.js client; public)
 *   3. PUBLIC_SENTRY_DSN       (Astro client; public)
 */

export type PrimeSentryConfig = {
  dsn: string | undefined;
  environment: string;
  release: string | undefined;
  tracesSampleRate: number;
  enabled: boolean;
};

export function getPrimeSentryConfig(
  env: Record<string, string | undefined> = {},
): PrimeSentryConfig {
  const dsn =
    env.SENTRY_DSN ??
    env.NEXT_PUBLIC_SENTRY_DSN ??
    env.PUBLIC_SENTRY_DSN ??
    undefined;

  const environment = env.SENTRY_ENVIRONMENT ?? env.NODE_ENV ?? "production";
  const release = env.SENTRY_RELEASE ?? env.npm_package_version ?? undefined;

  return {
    dsn,
    environment,
    release,
    tracesSampleRate: dsn ? 0.1 : 0,
    enabled: Boolean(dsn),
  };
}
