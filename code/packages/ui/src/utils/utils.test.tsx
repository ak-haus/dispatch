import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { cn } from "./cn";
import {
  formatPublishedAt,
  formatDateline,
  formatKicker,
} from "./dates";
import { newId, newSlugId, newShortId } from "./ids";
import { PrimeIcon, ArrowRight } from "./icons";

describe("cn() className composer", () => {
  it("composes truthy class names via clsx", () => {
    expect(cn("a", "b", false && "c", "d")).toBe("a b d");
  });

  it("dedupes conflicting Tailwind utilities (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm text-lg")).toBe("text-lg");
  });

  it("handles arrays + objects", () => {
    expect(cn(["a", { b: true, c: false }])).toBe("a b");
  });
});

describe("date formatters", () => {
  // Local-time noon — stable across timezones (avoids day-shift in
  // negative-offset timezones; date-fns formats in the reader's local TZ
  // by design, so test fixtures use local-time construction).
  const fixed = new Date(2026, 4, 11, 12, 0, 0);
  const fixedLocalIso = `2026-05-11T12:00:00`;

  it("formatPublishedAt → long-form masthead date", () => {
    expect(formatPublishedAt(fixed)).toBe("May 11, 2026");
  });

  it("formatDateline → ISO compact", () => {
    expect(formatDateline(fixed)).toBe("2026-05-11");
  });

  it("formatKicker → 'LANE · YYYY-MM-DD'", () => {
    expect(formatKicker(fixed, "editorial")).toBe("EDITORIAL · 2026-05-11");
  });

  it("accepts local-time ISO string OR Date input", () => {
    expect(formatPublishedAt(fixedLocalIso)).toBe("May 11, 2026");
    expect(formatDateline(fixedLocalIso)).toBe("2026-05-11");
  });
});

describe("id generators", () => {
  it("newId returns 21-char URL-safe nanoid", () => {
    const id = newId();
    expect(id).toMatch(/^[A-Za-z0-9_-]{21}$/);
  });

  it("newSlugId returns 12-char kebab-friendly id", () => {
    const id = newSlugId();
    expect(id).toMatch(/^[a-z0-9]{12}$/);
  });

  it("newShortId returns 8-char short id", () => {
    const id = newShortId();
    expect(id).toHaveLength(8);
  });

  it("ids are sufficiently unique within a 100-iteration sample", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) ids.add(newId());
    expect(ids.size).toBe(100);
  });
});

describe("PrimeIcon", () => {
  it("renders Lucide icon at md (20px) by default", () => {
    render(<PrimeIcon icon={ArrowRight} aria-label="Next" />);
    const icon = screen.getByLabelText("Next");
    expect(icon.getAttribute("width")).toBe("20");
    expect(icon.getAttribute("height")).toBe("20");
  });

  it("respects size prop (sm=16, md=20, lg=24)", () => {
    const { rerender, container } = render(
      <PrimeIcon icon={ArrowRight} size="sm" />,
    );
    expect(container.querySelector("svg")?.getAttribute("width")).toBe("16");
    rerender(<PrimeIcon icon={ArrowRight} size="lg" />);
    expect(container.querySelector("svg")?.getAttribute("width")).toBe("24");
  });

  it("applies 1.5px stroke per prime-design canon", () => {
    const { container } = render(<PrimeIcon icon={ArrowRight} />);
    expect(container.querySelector("svg")?.getAttribute("stroke-width")).toBe(
      "1.5",
    );
  });

  it("auto-adds aria-hidden when no aria-label provided", () => {
    const { container } = render(<PrimeIcon icon={ArrowRight} />);
    expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });
});
