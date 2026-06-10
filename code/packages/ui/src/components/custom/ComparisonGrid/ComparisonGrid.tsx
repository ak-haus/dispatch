"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { cn } from "../../../utils/cn";

/**
 * ComparisonGrid — 3-up (or N-up) editorial card grid for stating shape.
 *
 * Default usage: KEEP / RETIRE / REPLACE topology inventories in
 * infrastructure dispatches. Each card carries a lane-color top-bar
 * (variant prop) and renders a small content area.
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

const LANE_BAR: Record<NonNullable<ComparisonGridItem["variant"]>, string> = {
  editorial: "bg-lane-editorial",
  institutional: "bg-lane-institutional",
  dispatch: "bg-lane-dispatch",
  default: "bg-text-strong",
  muted: "bg-rail-edge",
};

export function ComparisonGrid({ items, className }: ComparisonGridProps) {
  return (
    <div
      className={cn(
        "not-prose my-16 md:my-20 grid grid-cols-1 gap-6 md:grid-cols-3",
        className,
      )}
    >
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
          <Card className="h-full">
            <div
              aria-hidden="true"
              className={cn(
                "h-1 w-full",
                LANE_BAR[item.variant ?? "default"],
              )}
            />
            <CardHeader>
              <Badge variant={item.variant ?? "default"} size="sm" className="w-fit mb-2">
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
