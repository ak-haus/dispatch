import { describe, it, expect } from "vitest";
import { getPrimeSentryConfig } from "./sentry-config";

describe("getPrimeSentryConfig (F10 dormant-until-DSN)", () => {
  it("returns disabled config when no DSN env present", () => {
    const config = getPrimeSentryConfig({});
    expect(config.enabled).toBe(false);
    expect(config.dsn).toBeUndefined();
    expect(config.tracesSampleRate).toBe(0);
  });

  it("enables when SENTRY_DSN env present", () => {
    const config = getPrimeSentryConfig({
      SENTRY_DSN: "https://example@sentry.io/123",
    });
    expect(config.enabled).toBe(true);
    expect(config.dsn).toBe("https://example@sentry.io/123");
    expect(config.tracesSampleRate).toBe(0.1);
  });

  it("falls back to NEXT_PUBLIC_SENTRY_DSN when SENTRY_DSN absent", () => {
    const config = getPrimeSentryConfig({
      NEXT_PUBLIC_SENTRY_DSN: "https://next@sentry.io/123",
    });
    expect(config.enabled).toBe(true);
    expect(config.dsn).toBe("https://next@sentry.io/123");
  });

  it("falls back to PUBLIC_SENTRY_DSN for Astro client", () => {
    const config = getPrimeSentryConfig({
      PUBLIC_SENTRY_DSN: "https://astro@sentry.io/123",
    });
    expect(config.enabled).toBe(true);
    expect(config.dsn).toBe("https://astro@sentry.io/123");
  });

  it("env precedence: SENTRY_DSN beats NEXT_PUBLIC beats PUBLIC", () => {
    const config = getPrimeSentryConfig({
      SENTRY_DSN: "https://server@sentry.io/123",
      NEXT_PUBLIC_SENTRY_DSN: "https://next@sentry.io/123",
      PUBLIC_SENTRY_DSN: "https://astro@sentry.io/123",
    });
    expect(config.dsn).toBe("https://server@sentry.io/123");
  });

  it("environment defaults to NODE_ENV when SENTRY_ENVIRONMENT unset", () => {
    const config = getPrimeSentryConfig({
      SENTRY_DSN: "https://example@sentry.io/123",
      NODE_ENV: "staging",
    });
    expect(config.environment).toBe("staging");
  });

  it("environment falls back to production if neither env nor NODE_ENV set", () => {
    const config = getPrimeSentryConfig({
      SENTRY_DSN: "https://example@sentry.io/123",
    });
    expect(config.environment).toBe("production");
  });

  it("release picks up SENTRY_RELEASE then npm_package_version", () => {
    const release = getPrimeSentryConfig({
      SENTRY_DSN: "https://example@sentry.io/123",
      SENTRY_RELEASE: "v1.2.3",
    });
    expect(release.release).toBe("v1.2.3");

    const fallback = getPrimeSentryConfig({
      SENTRY_DSN: "https://example@sentry.io/123",
      npm_package_version: "0.0.1",
    });
    expect(fallback.release).toBe("0.0.1");
  });
});
