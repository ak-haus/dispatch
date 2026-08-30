"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { clsx } from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";

import "./ComparisonGrid.css";

/**
 * ComparisonGrid — 3-up (or N-up) editorial card grid for stating shape.
 *
 * Default usage: KEEP / RETIRE / REPLACE topology inventories in
 * infrastructure dispatches. Each card carries a lane-color top-bar
 * (variant prop) and renders a small content area. (The top-bar's paint
 * reached for unregistered token slots and has never rendered — restoring
 * it is F29; the bar's variant modifier classes are the declared seam.)
 *
 * Motion: staggered reveal on viewport intersection.
 */

export interface ComparisonGridItem {
  id: string;
  /** Single-word verb (KEEP / RETIRE / REPLACE / ADDED etc.) */
  verb: string;
  variant?: "editorial" | "institutional" | "dispatch" | "default" | "muted";
  title: string;
  description?: string;
  children?: ReactNode;
}

export interface ComparisonGridProps {
  items: ComparisonGridItem[];
  className?: string;
}

export function ComparisonGrid({ items, className }: ComparisonGridProps) {
  return (
    <div className={clsx("prime-comparison-grid", className)}>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{
            duration: 0.55,
            delay: i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Card className="prime-comparison-grid__card">
            <div
              aria-hidden="true"
              className={clsx(
                "prime-comparison-grid__bar",
                `prime-comparison-grid__bar--${item.variant ?? "default"}`,
              )}
            />
            <CardHeader>
              <Badge
                variant={item.variant ?? "default"}
                size="sm"
                className="prime-comparison-grid__verb-badge"
              >
                {item.verb}
              </Badge>
              <CardTitle>{item.title}</CardTitle>
              {item.description ? (
                <CardDescription>{item.description}</CardDescription>
              ) : null}
            </CardHeader>
            {item.children ? <CardContent>{item.children}</CardContent> : null}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
