---
title: DISpatch Article Template
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# DISpatch Article Template

Use this template for longform DISpatch articles, manifesto pieces, development diary entries, and reflective editorial essays. It follows a magazine-style web structure validated against longform editorial best practices: kicker, headline, dek, metadata, disciplined body paragraphs, optional pull quote, and restrained end matter. [cite:78][cite:88][cite:91][cite:93][cite:97]

## Article Markdown

```md
---
title: "DISpatch Is Prime City’s First Published Building"
kicker: "Editorial District"
dek: "A serialized editorial publication documenting the construction of Prime City from inside the work."
author: "AK ALMoumen"
date: "2026-05-12"
reading_time: "5 min read"
provenance: "Hybrid"
tags:
  - DISpatch
  - Prime City
  - Editorial District
  - Dev Diary
---

# DISpatch Is Prime City’s First Published Building

*DISpatch is a dev-diary magazine and the first published Building in Prime’s Editorial District. It is a serialized editorial publication that documents the construction of Prime City from inside the work, with each dispatch serving as a chapter in the larger story of building agentically.*

DISpatch publishes as a magazine, reads as a notebook, and behaves as a website. The reader enters the Editorial District, finds the magazine building, and reads inside a quiet editorial sanctuary while a living cartographic substrate breathes beneath the surface.

The site is a dynamic publication with interactive islands, built as an editorial microsite inside the larger Prime platform. Its three main surfaces are a homepage in district zoom, an article page in neighborhood zoom, and a sitemap in atlas register.

On the homepage, a zoomed-out Editorial District sits beneath the publication front page, with the DISpatch building highlighted off-center in dispatch red. On article pages, the cartography tightens into a neighborhood-scale atmosphere that bends around the prose rather than competing with it. The sitemap functions as a borough-scale directory and cosmology index.

> “The cartography is the visual hero, but not the product model.”

Its aesthetic is civic-archive: warm, restrained, hand-crafted, and dev-coded. DISpatch should feel like a developer’s notebook bound by a small editorial press, shaped by literary magazine quiet, technical annotation, and the visual memory of a city drafted by hand.

The cartography is a deeply architected atmospheric system—an expensive, layered, often half-hidden site artifact—that makes the publication feel alive without turning it into a map app.

DISpatch is also a provenance-aware publication. It is not generic AI-first marketing; it is an editorial surface made in collaboration with agentic systems, where process, authorship, and editorial lineage remain visible.

Its components support publication structure, reading, provenance, and cartographic atmosphere: masthead, navigation, chapter tracking, reading progress, editorial footnotes, DLDS provenance panels, article openers, institutional fixtures, cartography canvases, digest surfaces, cross-posting, and editorial companions.

DISpatch exists to test Prime’s brand DNA against real construction. What holds up here—in typography, atmosphere, provenance, and editorial systems—becomes the reference inheritance for every future Building in Prime City.

---

## Notes

- Keep paragraphs to one idea each.
- Aim for 2–4 sentences per paragraph.
- Use one pull quote only if it truly adds rhythm.
- Keep lists rare in narrative essays; use them in META dispatches when needed.
```

## Website formatting settings

These settings align with web editorial readability guidance for longform articles, including optimal line length, paragraph rhythm, hierarchy, and screen-friendly typography. [cite:78][cite:84][cite:88][cite:97]

### Layout

- Body text measure: 64–72ch. [cite:84][cite:97]
- Main prose column max width: about 680–760px, depending on font rendering. [cite:97]
- Left-aligned text, never justified on web. [cite:81][cite:84]
- Generous vertical spacing between title, dek, metadata, and body blocks. [cite:91]

### Type settings

- Kicker: 12–14px, uppercase or small-caps feel, slight tracking. [cite:93]
- Headline: `clamp(2rem, 1.4rem + 2vw, 3.25rem)`, line-height 1.05–1.12. [cite:93][cite:97]
- Dek: 18–20px, line-height about 1.45–1.55. [cite:78][cite:91]
- Body: 16–17px Inter, line-height 1.65–1.8. [cite:78][cite:88]
- Paragraph spacing: 1.1em–1.4em. [cite:78][cite:91]
- Pull quote: max width 18–24ch, centered or slightly offset, never full measure. [cite:88][cite:91]
- Metadata: 12–14px, visibly distinct from prose, quieter than the dek. [cite:93]

### Content rules

- Open with a dek or italic standfirst when the piece is conceptual or essayistic. [cite:88]
- Break paragraphs by thought, not by arbitrary length. [cite:88]
- Avoid walls of text; web editorials should scan cleanly even when they read slowly. [cite:88][cite:91]
- Use pull quotes sparingly. [cite:88]
- Maintain one clear hierarchy: kicker -> headline -> dek -> meta -> body -> end matter. [cite:91][cite:93]

## Suggested HTML mapping

```html
<article class="article">
  <header class="article-header">
    <p class="article-kicker">Editorial District</p>
    <h1 class="article-title">DISpatch Is Prime City’s First Published Building</h1>
    <p class="article-dek">A serialized editorial publication documenting the construction of Prime City from inside the work.</p>
    <div class="article-meta">
      <span>AK ALMoumen</span>
      <span>May 12, 2026</span>
      <span>5 min read</span>
      <span>Hybrid</span>
    </div>
  </header>

  <div class="article-body">
    <p>...</p>
    <blockquote>...</blockquote>
    <p>...</p>
  </div>
</article>
```

## Suggested CSS mapping

```css
.article {
  max-width: 72ch;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.article-title {
  font-family: "Vollkorn", serif;
  font-weight: 700;
  font-size: clamp(2rem, 1.4rem + 2vw, 3.25rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  max-width: 18ch;
  margin-bottom: 0.5rem;
}

.article-dek {
  font-family: "Inter", sans-serif;
  font-size: 1.125rem;
  line-height: 1.5;
  max-width: 56ch;
  margin-bottom: 1.5rem;
}

.article-body {
  font-family: "Inter", sans-serif;
  font-size: 1.0625rem;
  line-height: 1.72;
}

.article-body p {
  margin-bottom: 1.2em;
}

.article-body blockquote {
  font-family: "Vollkorn", serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.25rem, 1.1rem + 0.6vw, 1.75rem);
  line-height: 1.4;
  max-width: 24ch;
  margin: 2rem auto;
}

.article-kicker,
.article-meta {
  font-family: "Inter", sans-serif;
  font-size: 0.8125rem;
  line-height: 1.4;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.article-body code,
.article-body pre {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.92em;
  line-height: 1.6;
}
```
