import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { SiteNav, navPages } from "../../index";

/**
 * SiteNav contract tests (B16 port, 2026-08-31): the fork's shipped
 * behavior, now library-owned — aria-current derivation from currentPath,
 * the A13 conditional aria-controls seam on the SearchPalette trigger,
 * Concept 7 sanctuary on the article variant, the mobile sheet contract
 * (onNavigate), and the theme-cycler's raw-string 'prime-cycle' protocol
 * (the one the microsite's blocking FOUC script reads).
 */

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-prime-cycle");
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("prime-cycle");
});

describe("SiteNav — reception", () => {
  it("renders the nav landmark with the navPages default set and derives aria-current", () => {
    render(<SiteNav currentPath="/article/" />);
    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(navPages.length);
    // trailing-slash match: /article/ marks /article current
    const active = links.filter((l) => l.getAttribute("aria-current") === "page");
    expect(active.length).toBe(1);
    expect(active[0]).toHaveAttribute("href", "/article");
    // editorial instrumentation contract: declared in markup
    expect(active[0]).toHaveAttribute("data-analytics", "nav:/article");
  });

  it("SearchPalette trigger carries the A13 conditional aria-controls pair", () => {
    const { rerender } = render(<SiteNav currentPath="/" />);
    const trigger = screen.getByRole("button", {
      name: "Search DISpatch (press Ctrl+K or Cmd+K)",
    });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    // closed: a closed <dialog> is unperceivable — no aria-controls (A13)
    expect(trigger.getAttribute("aria-controls")).toBeNull();

    rerender(<SiteNav currentPath="/" paletteOpen />);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", "dispatch-search-palette");
  });
});

describe("SiteNav — article (sanctuary)", () => {
  it("hides the SearchPalette trigger and compresses to the back-link", () => {
    render(<SiteNav currentPath="/dispatch/week-3" variant="article" />);
    expect(
      screen.queryByRole("button", {
        name: "Search DISpatch (press Ctrl+K or Cmd+K)",
      }),
    ).toBeNull();
    const back = screen.getByRole("link", { name: "Back to DISpatch" });
    expect(back).toHaveAttribute("href", "/");
    // theme-cycler stays hosted (spec Field 6)
    expect(
      screen.getByRole("group", { name: "Cycle theme — dawn, dusk, or night" }),
    ).toBeInTheDocument();
  });
});

describe("SiteNav — mobile (host sheet contents)", () => {
  it("calls onNavigate on link activation and keeps the affordances footer", () => {
    const onNavigate = vi.fn();
    render(<SiteNav currentPath="/" variant="mobile" onNavigate={onNavigate} />);
    fireEvent.click(screen.getByRole("link", { name: "Atlas" }));
    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("button", { name: "Search DISpatch (press Ctrl+K or Cmd+K)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Cycle theme — dawn, dusk, or night" }),
    ).toBeInTheDocument();
  });
});

describe("SiteNav — theme-cycler", () => {
  it("persists the RAW cycle string + html attribute (+ .dark mirror on night)", () => {
    render(<SiteNav currentPath="/" />);
    const buttons = screen
      .getAllByRole("button")
      .filter((b) => b.getAttribute("aria-pressed") !== null);
    expect(buttons.length).toBe(3);
    expect(buttons.filter((b) => b.getAttribute("aria-pressed") === "true").length).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: /Night cycle/ }));
    expect(document.documentElement.getAttribute("data-prime-cycle")).toBe("night");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    // RAW string protocol — what the microsite's blocking script reads
    // (NOT the zustand-JSON of state/theme-cycler)
    expect(localStorage.getItem("prime-cycle")).toBe("night");
    expect(
      screen.getByRole("button", { name: "Night cycle (active)" }),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /Dawn cycle/ }));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("prime-cycle")).toBe("dawn");
  });
});
