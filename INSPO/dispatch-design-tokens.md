---
title: DISpatch — Typography & Color Tokens
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# DISpatch — Typography & Color Tokens

*Visual-system reference captured 2026-05-12. Specifies the five-typeface containment system and the OKLCH color palette for the DISpatch microsite. Implementation lives in [`code/apps/microsite-astro/src/styles/global.css`](../code/apps/microsite-astro/src/styles/global.css).*

---

## Typography

DISpatch operates on a **five-contained-typeface system**. Each face has a single semantic role; faces never cross slots. The rule:

> **Pangram Sans for signage. Inter for utility.**

### Wordmark — Pangram Editorial New Bold

- Mixed case or title-style casing, **not** all caps.
- Tight but not cramped tracking: `letter-spacing: -0.01em` to `-0.025em`.
- Line-height discipline if it wraps: `0.95` to `1.0`. Ideally it doesn't wrap.
- Use as a **logo object**, not as body-heading typography.

### Nav — Pangram Sans Normal ExtraBold

- Small-caps feeling without true shouting: `font-size: 13px–15px` with `font-weight: 800`.
- Slight positive tracking: `0.04em` to `0.08em`.
- Title Case = more editorial. All caps = more municipal/institutional. Pick by tone.
- Keep labels short: **Home, Articles, Atlas, About**.

### Article Titles & Quote Blocks — Vollkorn

| Use | Weight / style | Size |
|---|---|---|
| Article titles, Narrative | Bold (700) | `--text-xl` to `--text-2xl` (24–56px) |
| Article titles, Meta | SemiBold (600) | `--text-xl` |
| Quote blocks, Meta | Medium Italic (500) | `--text-lg` |
| Quote blocks, Narrative | Regular Italic (500) | `--text-lg` |
| Epigraphs | Regular Italic (400) | `--text-base` to `--text-lg` |

### Article Body & Site Text — Inter

| Use | Weight / style | Size |
|---|---|---|
| Article body, Regular | Regular (400) | `--text-base` (16–18px) |
| Inline strong emphasis, technical terms | SemiBold (600) | `--text-base` |
| Soft emphasis, citations, editorial asides | Inter Italic (400 italic) | `--text-base` |

### Meta Components — JetBrains Mono

For code blocks, DLDS panel, agent behavior, provenance metadata.

| Use | Weight / style | Size |
|---|---|---|
| Code blocks | Regular (400) | `--text-sm` (14px) or `--text-base` (16px) |
| DLDS lane labels (e.g., "Hybrid," "Human-led," "AI-led") | Medium (500) | `--text-xs` to `--text-sm` (12–14px) |
| Inline code in body paragraphs (`varNames`, `function()`, file paths) | Regular (400) | `--text-sm` |

### Functional UI & Readable Interface Text — Inter

| Weight | Use |
|---|---|
| Medium (500) | Standard buttons and controls |
| SemiBold (600) | Small chips, ticker tags, compact pills, anything needing slightly more punch |

Use Inter when the clickable element is: a **button**, a **chip**, a **search trigger**, a **ticker item**, a **metadata pill**, a **provenance toggle**, a **small card CTA**.

The rule is simple: **Pangram Sans for signage, Inter for utility.**

---

## Color philosophy

DISpatch uses a restrained, contextual palette where most of the site is warm neutrals and **one color (red) does the heavy lifting** for identity, signal, and accent.

The palette should feel **civic-institutional** (graphite blues, terracotta warmth, paper whites) rather than SaaS-product (bright saturated primaries, gradients, electric accents).

Core semantic roles:
- **Red** for dispatch pulse / identity
- **Graphite-blue** for institutional rules and structure
- **Terracotta** for editorial warmth and secondary markers

### Dispatch Red — primary accent

**Role:** brand identity, building highlight, live signals, Inferno markers, primary CTAs, active state indicators.

This is the one color that DISpatch "owns." It should be:
- Warm-leaning red (not cool / magenta).
- Medium saturation — noticeable but not fluorescent.
- Used **sparingly**: the building marker, live tickers, key nav states, occasional editorial accents.

OKLCH starting point:

```css
--color-dispatch-red: oklch(0.55 0.18 25);  /* warm red, medium chroma */
```

Works on both light and dark surfaces. Holds up at small sizes (building footprints, pulse dots). Doesn't overwhelm the page when used in larger areas.

Three-cycle theme variants:

| Cycle | OKLCH | Note |
|---|---|---|
| Dawn (light) | `oklch(0.52 0.18 25)` | Slightly darker for contrast on light vellum |
| Dusk (twilight) | `oklch(0.58 0.17 25)` | Mid-tone, slightly desaturated |
| Night (dark) | `oklch(0.62 0.16 25)` | Lighter and slightly less saturated to stay readable on dark |

**Use for:**
- The DISpatch building on the map
- Live ticker markers and Inferno activity pulses
- Primary CTA buttons (sparingly — most buttons should be neutral)
- Active nav states or selected items
- Editorial accent moments (pull quotes, footnote markers)

**Do not use for:** backgrounds, large surface areas, multiple buttons per screen, decorative borders, or anything that would make the page feel "red" rather than "paper with red accents."

### Graphite Blue — institutional structure

**Role:** hairline rules, grid lines, cartographic structure, metadata borders, technical annotations, system chrome.

The color of the map's underlying architecture — contour lines, street grids, district boundaries, institutional dividers.

- Cool, quiet, low-saturation blue-gray.
- Reads as a **technical / civic color**, not a brand accent.
- Used at very low opacity for ambient structure (grid lines, dividers) and higher opacity for intentional technical markers (DLDS panel borders, code block chrome).

OKLCH starting point:

```css
--color-graphite-blue: oklch(0.45 0.04 240);  /* cool gray-blue, very low chroma */
```

Three-cycle theme variants:

| Cycle | OKLCH |
|---|---|
| Dawn | `oklch(0.42 0.04 240)` |
| Dusk | `oklch(0.48 0.04 240)` |
| Night | `oklch(0.55 0.04 240)` |

**Use for:**
- Cartography grid lines and contour hairlines
- Horizontal rules and section dividers
- DLDS panel borders and metadata containers
- Code block gutters and line-number regions
- Subtle background tints for technical surfaces: `color-mix(in oklch, var(--color-graphite-blue) 3%, var(--color-surface))`

### Terracotta — editorial warmth

**Role:** secondary editorial markers, warm accents, pull quote colors, footnote highlights, softer emphasis.

Sits between red and brown — warm, earthy, literary, less intense than dispatch red. Use when you need editorial warmth without the signal intensity of red.

OKLCH starting point:

```css
--color-terracotta: oklch(0.58 0.10 40);  /* warm orange-brown, moderate chroma */
```

Three-cycle theme variants:

| Cycle | OKLCH |
|---|---|
| Dawn | `oklch(0.54 0.10 40)` |
| Dusk | `oklch(0.60 0.09 40)` |
| Night | `oklch(0.64 0.08 40)` |

**Use for:**
- Pull quote markers or aside borders
- Footnote reference numbers
- Secondary editorial highlights (e.g., epigraph separators)
- Warm background tints for callouts or special article moments
- Less intense CTA states (e.g., "Read more" links that aren't primary actions)

**Not for:** primary navigation, brand identity, or anywhere that competes with dispatch red.

### Vellum / Paper — reading surfaces

**Role:** article backgrounds, card surfaces, elevated panels — the "paper" substrate of the site.

DISpatch should feel like reading on warm, slightly aged paper — not pure white, not cool gray. The vellum tone is critical to the civic-archive aesthetic.

Light mode starting point:

```css
--color-bg-vellum: oklch(0.97 0.01 80);        /* warm off-white, very slight yellow */
--color-surface-vellum: oklch(0.98 0.008 80);  /* slightly lighter elevated surface */
```

Dark mode equivalent:

```css
--color-bg-dark: oklch(0.18 0.01 80);       /* warm dark, not pure black */
--color-surface-dark: oklch(0.22 0.008 80); /* elevated panels slightly lighter */
```

Key: maintain a **warm bias** (hue ~60–90 in OKLCH) and **very low chroma** (0.005–0.015) so the warmth is perceptible but never overpowering.

Three-cycle theme variants:

| Cycle | Background OKLCH |
|---|---|
| Dawn | `oklch(0.97 0.01 80)` (pure vellum warmth) |
| Dusk | `oklch(0.50 0.005 80)` (slightly desaturated, mid-tone) |
| Night | `oklch(0.18 0.01 80)` (warm dark) |

### Text hierarchy

**Role:** primary text, muted metadata, faint labels, inverse text.

Strong contrast against vellum / paper surfaces. WCAG AA minimum (4.5:1 for body, 7:1 AAA for long-form reading).

Light mode:

```css
--color-text-primary: oklch(0.20 0.01 80);   /* near-black with warm bias */
--color-text-muted:   oklch(0.48 0.01 80);   /* mid-tone for metadata */
--color-text-faint:   oklch(0.65 0.01 80);   /* labels, captions */
```

Dark mode:

```css
--color-text-primary: oklch(0.88 0.01 80);   /* warm off-white */
--color-text-muted:   oklch(0.60 0.01 80);   /* mid-tone */
--color-text-faint:   oklch(0.45 0.01 80);   /* faint labels */
```

All text maintains warm bias (hue ~80) and extremely low chroma to stay neutral against the reading surface.

---

## Complete palette summary

| Role | Color name | Light mode (OKLCH) | Dark mode (OKLCH) | Usage |
|---|---|---|---|---|
| Brand accent | **Dispatch Red** | `0.52 0.18 25` | `0.62 0.16 25` | Building marker, live signals, primary CTAs |
| Institutional | **Graphite Blue** | `0.42 0.04 240` | `0.55 0.04 240` | Grid lines, rules, metadata chrome |
| Editorial warmth | **Terracotta** | `0.54 0.10 40` | `0.64 0.08 40` | Pull quotes, footnotes, secondary accents |
| Reading surface | **Vellum** | `0.97 0.01 80` | `0.18 0.01 80` | Article backgrounds, card surfaces |
| Primary text | **Warm Black / White** | `0.20 0.01 80` | `0.88 0.01 80` | Body copy, headings |
| Muted text | **Warm Gray** | `0.48 0.01 80` | `0.60 0.01 80` | Metadata, dates, labels |

---

## Usage rules

1. **Most of the page is vellum + text.** The site should feel like paper with ink, not like a colorful product UI.
2. **Red is an accent, not a theme.** Use it for 1–3 elements per screen, max.
3. **Graphite-blue is infrastructure.** It holds the cartographic and technical systems together but stays quiet.
4. **Terracotta is editorial warmth.** Use it when you need softer emphasis than red but more presence than neutral gray.
5. **No gradients, no multi-color cards, no color-coded navigation tabs.** The palette is restrained and hierarchical, not decorative.

---

## Implementation notes

Current implementation in [`code/apps/microsite-astro/src/styles/global.css`](../code/apps/microsite-astro/src/styles/global.css). Tokens are exposed via Tailwind v4 `@theme inline` so they generate utility classes automatically.

**Color utilities available now:**

| Utility | Source token |
|---|---|
| `bg-vellum`, `bg-vellum-elevated` | reading surfaces |
| `text-ink`, `text-ink-muted`, `text-ink-faint` | text hierarchy |
| `text-dispatch-red`, `bg-dispatch-red`, `border-dispatch-red` | brand accent |
| `text-graphite-blue`, `bg-graphite-blue`, `border-graphite-blue` | institutional structure |
| `text-terracotta`, `bg-terracotta`, `border-terracotta` | editorial warmth |

**Font utilities available now:**

| Utility | Stack |
|---|---|
| `font-wordmark` | `'Pangram Editorial New', 'Vollkorn', Georgia, serif` |
| `font-nav` | `'Pangram Sans', 'Inter', system-ui, sans-serif` |
| `font-narrative` | `'Vollkorn', Georgia, serif` |
| `font-body` | `'Inter', system-ui, -apple-system, sans-serif` |
| `font-mono` | `'JetBrains Mono', ui-monospace, monospace` |

**Licensing status:**
- ✅ Vollkorn — loaded from Google Fonts
- ✅ Inter — loaded from Google Fonts (weights 400 / 500 / 600 / 700)
- ✅ JetBrains Mono — loaded from Google Fonts (weights 400 / 500 / 700 + italic)
- ✅ **Pangram Editorial New Bold** — licensed 2026-05-12 (Pangram Pangram Foundry). Self-hosted at `code/apps/microsite-astro/0-terra/fonts/PPEditorialNew-Bold.woff2`, served as `font-weight: 700`.
- ✅ **Pangram Sans Normal ExtraBold** — licensed 2026-05-12. Self-hosted at `code/apps/microsite-astro/0-terra/fonts/PPPangramSans-Extrabold.woff2`, served as `font-weight: 800` (CSS standard, not Pangram's internal axis value of 900).

Both Pangram faces are wired via `@font-face` at the top of `global.css` with `font-display: swap`. Vollkorn and Inter remain in the fallback chain — if the Pangram file fails to load (network error, content-blocker), the wordmark drops to Vollkorn and the nav drops to Inter without breaking layout.

**Theme cycle status:**
- ✅ Dawn (light) — fully implemented in `:root`
- ✅ Night (dark) — fully implemented in `.dark`
- ⏸ Dusk (twilight) — variants captured in this doc, not yet wired into a CSS cycle

**Surface scoping:** the vellum substrate is opt-in via `<body class="dispatch-surface">`, applied by `StackLayout` when a page passes `theme="vellum"`. This keeps the Sitemap page on the neutral shadcn palette while Home / Article / About sit on warm paper.
