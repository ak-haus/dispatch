---artifact: typography-v1-contract
authored: W2-S-E 2026-05-10
authored-against: |
  representation/visual-system/color.md §5.3 V1 free-OFL stack lock + §10 Decision 7c
  cc-ledger/dispatches/W1/2026-05-09_microsite-stack-budget-ledger-v0.md rows 12-16 (5 OFL families; $0 OFL-1.1)
status: active
title: V1 typeface contract
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# V1 typeface contract

Canon source for the five free-OFL typeface families that fill DISpatch microsite typographic slots at V1. Locked Mayor 2026-05-07 per CD2 §10 Decision 7c.

## Slot × family × weight × source × license

### Title (display serif; DISpatch-locked) — Vollkorn

| Field | Value |
|---|---|
| **Family** | Vollkorn |
| **Designer** | Friedrich Althausen |
| **Foundry** | Independent (released free) |
| **License** | OFL-1.1 (Open Font License) |
| **Canonical upstream** | https://github.com/Friedrich-Althausen/Vollkorn-Typeface |
| **Mirror upstream** | https://fonts.google.com/specimen/Vollkorn (static asset only; NO runtime CDN) |
| **Weights shipped at V1** | Regular (400), Italic (400), Bold (700) |
| **Slot rationale** | Magazine register fit (warmth + classical Garamond influence); "Vollkorn" = "whole-grain" embodies CD1 Concept 4 atmospheric paper substrate; less common than Source Serif 4 / EB Garamond — "comfortable but not boring" target met (CD2 §5.3) |
| **Surface roles** | Article masthead titles · pull-quotes (Vollkorn Display at enlarged size per CD2 §5.4) · placeholder wordmark carrier until W2-S-F procures Editorial New |
| **Subset target** | Latin Extended + figures + smart-quotes + dashes (≈ 600 glyphs) |

### Body (reading serif; DISpatch-locked) — Crimson Pro

| Field | Value |
|---|---|
| **Family** | Crimson Pro |
| **Designer** | Sebastian Kosch (with Jacques Le Bailly) |
| **Foundry** | Independent (released free) |
| **License** | OFL-1.1 (Open Font License) |
| **Canonical upstream** | https://github.com/Fonthausen/CrimsonPro |
| **Mirror upstream** | https://fonts.google.com/specimen/Crimson+Pro (static asset only) |
| **Weights shipped at V1** | Regular (400), Italic (400), SemiBold (600), Bold (700), BoldItalic (700) |
| **Slot rationale** | Garamond influence + warmth pairs with Vollkorn register-coherently; multiple weights; designed for screen reading; not Adobe-foundry-default-feel of Source Serif 4 (CD2 §5.3) |
| **Surface roles** | Article body · long-form reading · footnotes · captions |
| **Subset target** | Latin Extended + figures + dashes + smart-quotes + common diacritics (≈ 700 glyphs) |

### Nav (humanist sans; Prime-platform-wide) — Inter [V1 PLACEHOLDER]

| Field | Value |
|---|---|
| **Family** | Inter |
| **Designer** | Rasmus Andersson |
| **Foundry** | Independent (Inter Foundry) |
| **License** | OFL-1.1 (Open Font License) |
| **Canonical upstream** | https://github.com/rsms/inter |
| **Mirror upstream** | https://fonts.google.com/specimen/Inter (static asset only) |
| **Weights shipped at V1 placeholder** | Regular (400), SemiBold (600) |
| **Slot rationale** | De facto modern web sans gold-standard; containment-locked to Nav scope per CD1 Concept 1; variable axes; perpetual free OFL (CD2 §5.3) |
| **Surface roles** | Site nav · in-page wayfinding · UI chrome · button labels |
| **Subset target** | Latin Basic + figures + common punctuation (≈ 250 glyphs) |
| **Forward arc** | **W2-S-F replaces Inter with Pangram Pangram Sans (heaviest weight in catalog) at the nav slot.** Mayor 2026-05-10 follow-up correction: nav is Prime-platform-wide register; Pangram Sans heaviest weight reads as smoothed-out NY-street-sign character; wayfinding-grade weight; foundry-canonical pairing with Editorial New (per Pangram product page). When W2-S-F lands, `--font-nav` re-keys to Pangram Sans without touching component CSS. |

### Code/Meta (monospace; component-locked) — JetBrains Mono

| Field | Value |
|---|---|
| **Family** | JetBrains Mono |
| **Designer** | JetBrains type team (lead: Philipp Nurullin) |
| **Foundry** | JetBrains s.r.o. |
| **License** | OFL-1.1 (Open Font License) |
| **Canonical upstream** | https://github.com/JetBrains/JetBrainsMono |
| **Mirror upstream** | https://fonts.google.com/specimen/JetBrains+Mono (static asset only) |
| **Weights shipped at V1** | Regular (400), Bold (700) |
| **Slot rationale** | Designed for code-editor display; ligatures; variable weights; long-session optimization; carries Wired/Hacker register per CD1 thesis §3 META vocabulary (CD2 §5.3) |
| **Surface roles** | Code blocks · terminal-search · DLDS panels · meta-numerals · byline timestamps |
| **Subset target** | ASCII + figures + common code symbols + box-drawing + ligature key sequences (≈ 350 glyphs) |

### Civic/Dante (medieval-touched; asset-locked) — IM Fell English

| Field | Value |
|---|---|
| **Family** | IM Fell English (chosen variant from IM Fell suite) |
| **Designer** | Igino Marini (revival of Dr. John Fell's 17th-century English types) |
| **Foundry** | iginomarini.com |
| **License** | OFL-1.1 (Open Font License) |
| **Canonical upstream** | https://www.iginomarini.com/fell/the-revival-fonts (PDF + ZIP releases) |
| **Mirror upstream** | https://fonts.google.com/specimen/IM+Fell+English (static asset only) |
| **Weights shipped at V1** | Regular (400), Italic (400) |
| **Slot rationale** | Medieval-revival; Italian designer reviving early-modern English type; cosmology-fit for Civic/Dante slot per CD1 Concept 1 (CD2 §5.3) |
| **Surface roles** | Civic-cartography labels · Dante-passage epigraphs · cosmology-encoded asset typography |
| **Subset target** | Latin Extended + Italian diacritics + smart-quotes + small caps glyphs (≈ 500 glyphs) |

### Wordmark (composition-locked) — W2-S-F scope

| Field | Value |
|---|---|
| **V1 placeholder** | Vollkorn at title scale (Title slot family doubles as wordmark carrier until W2-S-F lands) |
| **W2-S-F target** | Pangram Pangram Editorial New (single style) — DISpatch-exclusive register; foundry-canonical pairing with Pangram Sans (Nav slot); wordmark "DIS" + "patch" split-color composition per CD2 §5.2 |
| **Composition** | `<span class="wordmark"><span class="wordmark-dis">DIS</span><span class="wordmark-patch">patch</span></span>` — selective letter coloring (`DIS` → `--accent-prime` red; `patch` → `--text-body-strong`) per CD2 §5.2 token mapping |
| **Hand-off shape** | W2-S-E sets `--font-wordmark: var(--font-title)` as placeholder; W2-S-F amends one CSS variable + one DTCG token entry to cut Editorial New in. No component CSS changes required. |

## Total V1 weight inventory (count + size budget)

| Family | Weights | Subset glyph count target | Estimated WOFF2 size each |
|---|---|---|---|
| Vollkorn | 3 (R/I/B) | ≈ 600 | 30-40 KB per cut |
| Crimson Pro | 5 (R/I/SB/B/BI) | ≈ 700 | 35-45 KB per cut |
| Inter | 2 (R/SB) | ≈ 250 | 18-25 KB per cut |
| JetBrains Mono | 2 (R/B) | ≈ 350 | 25-35 KB per cut |
| IM Fell English | 2 (R/I) | ≈ 500 | 30-40 KB per cut |
| **Total V1 cuts** | **14** | — | **≈ 400-500 KB** total page-weight if all loaded; **≈ 80-100 KB** for critical-weight preload (Body Regular + Title Regular + Nav Regular) |

Critical-weight preload strategy: only Body/Regular + Title/Regular + Nav/Regular preload by default; other weights load on demand via `font-display: swap`. Concrete preload markup in `css/preload.html`.

## License & sovereignty notes

All five families ship under **OFL-1.1**. OFL grants:

- **Free use** including commercial publication
- **Modification permitted** (but the modified version must use a different name; we do not modify)
- **Redistribution permitted** (we redistribute via self-host)
- **Bundling with software permitted** (we bundle with the microsite build)

The OFL prohibition we respect: **selling the font binaries by themselves**. Self-hosting the font binaries as part of a microsite delivery is not "selling the font" — it is using the font.

License copies live at `licenses/<family>-OFL.txt`. Each is the canonical OFL-1.1 text with the family-specific copyright header preserved. License copies are reproduced from upstream during procurement and **must not be edited**.

## Cross-references

- **CD2 §5.3** — V1 free-OFL stack lock + CD4 re-fire option (color.md)
- **CD2 §5.4** — Quote blocks render in Vollkorn Display at enlarged size
- **CD2 §6.4** — Wordmark Option C colorblind verdicts (graceful-degradation by design)
- **CD2 §10 Decision 7c** — Mayor ratification of V1 free-OFL stack
- **W1 budget ledger v0.1** rows 12-16 — `vollkorn-ofl` / `crimson-pro-ofl` / `inter-ofl` / `jetbrains-mono-ofl` / `im-fell-ofl` ($0 OFL-1.1)
- **CC7 W2 brief §3.1 W2-S-E** — Stream scope authority
- **W2-S-F brief** (forthcoming under CC7) — Pangram Sans + Editorial New procurement; cross-stream re-key intersection with this contract

---

*V1 typeface contract authored 2026-05-10 by W2-S-E. Mayor-locked 2026-05-07 per CD2 §10 Decision 7c.*
