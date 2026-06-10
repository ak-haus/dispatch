import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  CartographyCanvas,
  SubstrateLayer,
  SURFACE_TO_DIAL,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  scaleLinear,
  line,
  curveCatmullRom,
  contours,
  EDITORIAL_DISTRICT_BOUNDS,
  MAGAZINE_CORNER_ANCHOR,
} from "./index";

describe("CartographyCanvas shell", () => {
  it("renders an SVG with FORMULA §8.1 viewBox + ARIA contract", () => {
    render(<CartographyCanvas />);
    const svg = screen.getByRole("img", {
      name: "Editorial District cartography",
    });
    expect(svg.tagName.toLowerCase()).toBe("svg");
    expect(svg.getAttribute("viewBox")).toBe(
      `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`,
    );
    expect(svg.getAttribute("aria-labelledby")).toBeTruthy();
    expect(svg.getAttribute("aria-describedby")).toBeTruthy();
  });

  it("emits surface + district + dial as data-attributes for CSS hooks", () => {
    render(<CartographyCanvas surface="article" district="editorial" />);
    const svg = screen.getByRole("img");
    expect(svg.getAttribute("data-prime-surface")).toBe("article");
    expect(svg.getAttribute("data-prime-district")).toBe("editorial");
    expect(svg.getAttribute("data-prime-dial")).toBe("mid");
  });

  it("derives dial from surface unless explicitly overridden", () => {
    const { rerender } = render(<CartographyCanvas surface="homepage" />);
    expect(screen.getByRole("img").getAttribute("data-prime-dial")).toBe("low");
    rerender(<CartographyCanvas surface="sitemap" />);
    expect(screen.getByRole("img").getAttribute("data-prime-dial")).toBe(
      "high",
    );
    rerender(<CartographyCanvas surface="homepage" dial="high" />);
    expect(screen.getByRole("img").getAttribute("data-prime-dial")).toBe(
      "high",
    );
  });

  it("composes child layers via FORMULA §8.2 children-slot pattern", () => {
    render(
      <CartographyCanvas ariaLabel="Test surface">
        <g data-testid="custom-layer">
          <circle cx={100} cy={100} r={20} />
        </g>
      </CartographyCanvas>,
    );
    const layer = screen.getByTestId("custom-layer");
    expect(layer).toBeInTheDocument();
    expect(layer.tagName.toLowerCase()).toBe("g");
  });

  it("SURFACE_TO_DIAL canon mapping matches FORMULA §6 per-surface dial calibration", () => {
    expect(SURFACE_TO_DIAL).toEqual({
      homepage: "low",
      article: "mid",
      sitemap: "high",
    });
  });
});

describe("SubstrateLayer (Z-order 1+2 atmospheric)", () => {
  it("renders feTurbulence paper-grain filter + contour-warm radial gradient", () => {
    const { container } = render(
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
        <SubstrateLayer />
      </svg>,
    );
    const turbulence = container.querySelector("feTurbulence");
    expect(turbulence).not.toBeNull();
    expect(turbulence?.getAttribute("type")).toBe("fractalNoise");
    const gradient = container.querySelector("radialGradient");
    expect(gradient).not.toBeNull();
    expect(gradient?.getAttribute("id")).toBe("prime-contour-warm");
  });

  it("substrate group is aria-hidden (decorative; not part of a11y tree)", () => {
    const { container } = render(
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
        <SubstrateLayer />
      </svg>,
    );
    const group = container.querySelector(".prime-cartography__substrate");
    expect(group).not.toBeNull();
    expect(group?.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("D3 utilities", () => {
  it("scaleLinear produces a typed scale", () => {
    const scale = scaleLinear<number>().domain([0, 100]).range([0, 1440]);
    expect(scale(50)).toBe(720);
    expect(scale.domain()).toEqual([0, 100]);
  });

  it("line generator with curveCatmullRom produces a path string", () => {
    const generator = line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveCatmullRom);
    const path = generator([
      { x: 0, y: 0 },
      { x: 100, y: 50 },
      { x: 200, y: 0 },
    ]);
    expect(path).toMatch(/^M/);
  });

  it("contours generator factory available", () => {
    expect(typeof contours).toBe("function");
  });

  it("Editorial District + magazine-corner anchor coords are FORMULA-aligned", () => {
    expect(EDITORIAL_DISTRICT_BOUNDS.x).toBe(240);
    expect(EDITORIAL_DISTRICT_BOUNDS.width).toBe(960);
    expect(MAGAZINE_CORNER_ANCHOR.x).toBe(1100);
    expect(MAGAZINE_CORNER_ANCHOR.radius).toBe(140);
  });
});
