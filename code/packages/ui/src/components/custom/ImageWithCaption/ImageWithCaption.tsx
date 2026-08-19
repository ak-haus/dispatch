"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { DldsPanel, type DldsPanelProps } from "../DldsPanel";
import "./ImageWithCaption.css";

/**
 * ImageWithCaption (#24) — the article figure primitive.
 *
 * Canon source: components-multimedia.md (CD7) §2.1 row 24 + §3.4 —
 * "figure + img + figcaption + DLDS provenance band"; composes with
 * Footnote (#5), MetaArticleOpener (#9), NarrativeArticleOpener (#10) and
 * DldsPanel (#7). Mode-crossing: article-only. Destination: /components/custom.
 *
 * Visual character (construction Rule 3): a PLATE. The image is the surface;
 * the component adds no frame, matte or shadow. What distinguishes the four
 * variants is the caption's VOICE — the C1 multi-voice concept made
 * structural — never chrome:
 *
 *   default            Body slot (Crimson Pro). The reading register.
 *   meta-terminal      Meta-code slot. Terminal output, component-locked mono.
 *   cartography-frame  Civic/Dante slot (IM Fell English) + letterpress, the
 *                      asset-locked signage register for cosmology plates.
 *   photograph         Body caption plus the IPTC-carried credit line.
 *
 * Provenance is DISCLOSED, not restyled: the band is the ratified DldsPanel,
 * so lane pigment and authorship taxonomy stay owned by one component
 * (Rule 2). C2PA is a DECLARED flag here — reading content credentials off
 * the asset at runtime is OQ-8, not this component's business.
 */

export type ImageWithCaptionVariant =
  | "default"
  | "meta-terminal"
  | "cartography-frame"
  | "photograph";

/** The DLDS band's inputs, minus the presentation choices this figure owns. */
export type ImageWithCaptionProvenance = Pick<
  DldsPanelProps,
  "lane" | "authorship" | "driftSensitivity" | "c2paAttached"
>;

export type ImageWithCaptionProps = {
  variant?: ImageWithCaptionVariant;
  /** Asset URL. Ignored when `media` is supplied. */
  src?: string;
  /**
   * Alternative text. Required whenever this component renders the <img>
   * itself; pass "" for a decorative plate whose caption already carries the
   * meaning. Also seeds the provenance band's accessible name so several
   * figures on one page stay distinguishable (axe landmark-unique).
   */
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: "eager" | "lazy";
  /**
   * Pre-rendered media slot — the interop seam for Astro's build-time
   * <Image> (AVIF/WebP negotiation), which cannot run inside a React
   * component. Supplying it replaces the internal <img> entirely. Whether an
   * Astro-native Figure.astro wrapper should own that call instead is OQ-7.
   */
  media?: ReactNode;
  caption?: ReactNode;
  /** Credit / rights line — the photograph variant's IPTC surface. */
  credit?: string;
  provenance?: ImageWithCaptionProvenance;
  className?: string;
};

const VARIANT_CLASS: Record<ImageWithCaptionVariant, string> = {
  default: "",
  "meta-terminal": "prime-figure--meta-terminal",
  "cartography-frame": "prime-figure--cartography-frame",
  photograph: "prime-figure--photograph",
};

export function ImageWithCaption({
  variant = "default",
  src,
  alt = "",
  width,
  height,
  sizes,
  loading = "lazy",
  media,
  caption,
  credit,
  provenance,
  className,
}: ImageWithCaptionProps) {
  const reduceMotion = useReducedMotion();

  // Editorial type set ON the cartographic substrate takes the letterpress
  // press (DESIGN.md §Typography universal rule 3). .dispatch-emboss is the
  // PAGE-owned contract (letterpress.css) — it carries its own dusk/night
  // overrides, so re-authoring it here would violate Rule 5.
  const embossed = variant === "cartography-frame";

  const hasFigcaption = Boolean(caption || credit || provenance);

  return (
    <motion.figure
      className={clsx("prime-figure", VARIANT_CLASS[variant], className)}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {media ?? (
        <img
          className="prime-figure__media"
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={loading}
          decoding="async"
        />
      )}

      {/* One figcaption, rendered LAST: the HTML content model allows
       * figcaption only as the figure's first or last child, so caption
       * prose, credit and the provenance band all live inside it rather
       * than as siblings. */}
      {hasFigcaption ? (
        <figcaption>
          {caption ? (
            <span
              className={clsx(
                "prime-figure__caption",
                embossed && "dispatch-emboss",
              )}
            >
              {caption}
            </span>
          ) : null}
          {credit ? (
            <span className="prime-figure__credit">{credit}</span>
          ) : null}
          {provenance ? (
            <DldsPanel
              className="prime-figure__provenance"
              variant="inline-disclosure"
              // Distinct accessible name per figure: DldsPanel's own default
              // names the landmark after the LANE, so two editorial-lane
              // figures on one page would collide (axe landmark-unique — the
              // AgentTraceCallout precedent). rest-spread wins over the
              // component's default label.
              aria-label={`Provenance${alt ? ` for ${alt}` : ""}: ${provenance.lane} lane`}
              {...provenance}
            />
          ) : null}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
