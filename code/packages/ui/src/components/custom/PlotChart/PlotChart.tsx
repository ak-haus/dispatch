"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { cn } from "../../../utils/cn";

/**
 * PlotChart — Observable Plot inline chart for editorial data.
 *
 * Renders a chart from SERIALIZABLE data + a discriminator. Function props
 * don't survive Astro's MDX client-island boundary, so the data and the
 * chart-kind are passed as plain props; the rendering happens inside the
 * component on the client.
 *
 * Add new `kind` variants here as new article surfaces need them.
 */

export type PlotChartPoint = { t: number; v: number };

export interface PlotChartProps {
  data: PlotChartPoint[];
  kind?: "line-with-area";
  /** Optional threshold rule line (e.g., 95 for "saturation threshold") */
  thresholdY?: number;
  xLabel?: string;
  yLabel?: string;
  yDomain?: [number, number];
  caption?: string;
  className?: string;
}

export function PlotChart({
  data,
  kind = "line-with-area",
  thresholdY,
  xLabel = "minute → ",
  yLabel = "↑ value",
  yDomain = [0, 100],
  caption,
  className,
}: PlotChartProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const marks = [];
    if (kind === "line-with-area") {
      marks.push(
        Plot.areaY(data, {
          x: "t",
          y: "v",
          fill: "currentColor",
          fillOpacity: 0.16,
        }),
        Plot.lineY(data, {
          x: "t",
          y: "v",
          stroke: "currentColor",
          strokeWidth: 1.5,
        }),
      );
    }
    if (typeof thresholdY === "number") {
      marks.push(
        Plot.ruleY([thresholdY], {
          stroke: "currentColor",
          strokeDasharray: "2 4",
          strokeOpacity: 0.45,
        }),
      );
    }

    const chart = Plot.plot({
      height: 220,
      marginLeft: 40,
      marginBottom: 36,
      style: {
        background: "transparent",
        color: "currentColor",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "10px",
      },
      x: { label: xLabel, grid: false },
      y: { label: yLabel, grid: true, domain: yDomain },
      marks,
    });

    ref.current.innerHTML = "";
    ref.current.append(chart);

    return () => {
      try {
        chart.remove();
      } catch {
        // ignore
      }
    };
  }, [data, kind, thresholdY, xLabel, yLabel, yDomain]);

  return (
    <figure className={cn("not-prose my-16 md:my-20 max-w-[80ch]", className)}>
      <div
        ref={ref}
        className="bg-surface-inset p-4 border border-rail-edge text-text-strong overflow-x-auto"
      />
      {caption ? (
        <figcaption className="mt-2 font-nav text-xs uppercase tracking-[0.18em] text-text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
