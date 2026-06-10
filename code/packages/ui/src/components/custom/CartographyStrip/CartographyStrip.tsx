"use client";

import { motion } from "motion/react";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Badge } from "../../ui/badge";
import { cn } from "../../../utils/cn";

/**
 * CartographyStrip — atmospheric editorial divider rendered as a wide
 * cartography excerpt.
 *
 * Per dispatch-brief.md aesthetic rule: cartography breathes underneath
 * editorial content. On article surfaces, the strip appears below the
 * opener as a section divider — narrow horizontal slice of a wider
 * cartographic render (MidJourney session or hand-drawn vector).
 *
 * Image delivery: Imgix-ready URL; IPTC metadata badge optional.
 * Aspect ratio: cinemascope 21:9 default; tune via prop.
 */

export interface CartographyStripProps {
  imageUrl: string;
  alt: string;
  ratio?: number;
  caption?: string;
  district?: string;
  className?: string;
}

export function CartographyStrip({
  imageUrl,
  alt,
  ratio = 21 / 9,
  caption,
  district,
  className,
}: CartographyStripProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn("my-0 relative", className)}
    >
      <AspectRatio ratio={ratio} className="overflow-hidden bg-surface-inset">
        <img
          src={imageUrl}
          alt={alt}
          className="h-full w-full object-cover grayscale-[20%] contrast-[1.05]"
          loading="lazy"
        />
        {district ? (
          <div className="absolute top-4 left-4 md:top-6 md:left-8">
            <Badge variant="outline" size="sm" className="bg-surface-page/85 backdrop-blur-sm font-civic">
              {district}
            </Badge>
          </div>
        ) : null}
      </AspectRatio>
      {caption ? (
        <figcaption className="mt-3 px-4 md:px-12 font-nav text-xs uppercase tracking-[0.18em] text-text-muted">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
