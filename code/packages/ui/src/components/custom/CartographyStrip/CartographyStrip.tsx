"use client";

import { motion } from "motion/react";
import { clsx } from "clsx";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Badge } from "../../ui/badge";

import "./CartographyStrip.css";

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
      className={clsx("prime-cartography-strip", className)}
    >
      <AspectRatio ratio={ratio} className="prime-cartography-strip__frame">
        <img
          src={imageUrl}
          alt={alt}
          className="prime-cartography-strip__image"
          loading="lazy"
        />
        {district ? (
          <div className="prime-cartography-strip__district">
            <Badge
              variant="outline"
              size="sm"
              className="prime-cartography-strip__district-badge"
            >
              {district}
            </Badge>
          </div>
        ) : null}
      </AspectRatio>
      {caption ? (
        <figcaption className="prime-cartography-strip__caption">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
