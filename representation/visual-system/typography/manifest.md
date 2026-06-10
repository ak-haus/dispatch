---artifact: typography-subset-manifest
authored: W2-S-E 2026-05-10
authored-against: |
  fonts.md (V1 typeface contract — slot/family/weight matrix)
  build/subset.py (pyftsubset orchestration; this file is its specification)
  build/procure.sh (upstream URLs; this file declares what gets subset from each)
status: active
title: WOFF2 subset manifest
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# WOFF2 subset manifest

Per-cut specification for the 14 V1 WOFF2 binaries this directory ships. The manifest is the input contract for `build/subset.py`. Edit this file to change subset scope; do NOT edit subset binaries by hand.

## Naming convention

```
subsets/<surface>/<family>-<weight>[-<style>].woff2
```

- `<surface>` ∈ `{title, body, nav, code, civic}`
- `<family>` lowercase-hyphenated (`vollkorn`, `crimson-pro`, `inter`, `jetbrains-mono`, `im-fell`)
- `<weight>` numeric per CSS spec (`400`, `600`, `700`)
- `<style>` ∈ `{italic}` (omitted for upright; explicit for oblique/italic)

Examples:
- `subsets/title/vollkorn-400.woff2`
- `subsets/body/crimson-pro-700-italic.woff2`
- `subsets/code/jetbrains-mono-400.woff2`

## Unicode subset definitions

The subset profiles below are referenced by name in `build/subset.py`. Each profile lists Unicode ranges using `pyftsubset` `--unicodes=` syntax (hex ranges).

### Profile: `latin-extended-editorial`

For Title (Vollkorn) and Body (Crimson Pro) — full editorial Latin coverage.

```
U+0020-007E   Basic Latin (printable)
U+00A0-00FF   Latin-1 Supplement
U+0100-017F   Latin Extended-A
U+0180-024F   Latin Extended-B
U+1E00-1EFF   Latin Extended Additional
U+2010-2027   Hyphens, dashes, ellipsis
U+2030-2030   Per mille
U+2032-2033   Prime, double prime
U+2039-203A   Single guillemets
U+2044-2044   Fraction slash
U+2060-2060   Word joiner
U+20A0-20BF   Currency symbols (€ £ ¥ etc.)
U+2122-2122   Trademark
U+2190-2199   Arrows (basic)
U+25CA-25CA   Lozenge
U+201C-201D   Smart double quotes
U+2018-2019   Smart single quotes
U+2026-2026   Horizontal ellipsis
```

### Profile: `latin-basic-ui`

For Nav (Inter) — UI/wayfinding range; figures + common punctuation only.

```
U+0020-007E   Basic Latin
U+00A0-00FF   Latin-1 Supplement
U+2010-2027   Hyphens, dashes
U+2026-2026   Horizontal ellipsis
U+2018-2019   Smart single quotes
U+201C-201D   Smart double quotes
U+2190-2199   Arrows (basic; for back/forward UI)
U+20A0-20BF   Currency
```

### Profile: `mono-code`

For Code/Meta (JetBrains Mono) — ASCII + box drawing + ligature anchors.

```
U+0020-007E   Basic Latin
U+00A0-00FF   Latin-1 Supplement
U+2010-2027   Hyphens, dashes
U+2500-257F   Box Drawing
U+2580-259F   Block Elements
U+2200-22FF   Mathematical Operators
U+2190-2199   Arrows
U+27F0-27FF   Supplemental Arrows-A
```

JetBrains Mono ligatures depend on `liga` + `calt` OpenType features remaining enabled — `subset.py` retains both per family-specific override (see profile flag `--layout-features+=liga,calt`).

### Profile: `latin-extended-italian`

For Civic/Dante (IM Fell English) — Italian diacritics + small caps.

```
U+0020-007E   Basic Latin
U+00A0-00FF   Latin-1 Supplement
U+0100-017F   Latin Extended-A
U+0180-024F   Latin Extended-B
U+2010-2027   Hyphens, dashes
U+2018-2019   Smart single quotes
U+201C-201D   Smart double quotes
U+2026-2026   Horizontal ellipsis
U+2030-2030   Per mille
```

IM Fell carries small caps (`smcp` feature) — `subset.py` retains via `--layout-features+=smcp,c2sc` for the Civic surface.

## Cut inventory

| Surface | Family | Weight | Style | Source file (in `sources/<family>/`) | Profile | Output path |
|---|---|---|---|---|---|---|
| **title** | Vollkorn | 400 | regular | `Vollkorn-Regular.ttf` | `latin-extended-editorial` | `subsets/title/vollkorn-400.woff2` |
| **title** | Vollkorn | 400 | italic | `Vollkorn-Italic.ttf` | `latin-extended-editorial` | `subsets/title/vollkorn-400-italic.woff2` |
| **title** | Vollkorn | 700 | regular | `Vollkorn-Bold.ttf` | `latin-extended-editorial` | `subsets/title/vollkorn-700.woff2` |
| **body** | Crimson Pro | 400 | regular | `CrimsonPro-Regular.ttf` | `latin-extended-editorial` | `subsets/body/crimson-pro-400.woff2` |
| **body** | Crimson Pro | 400 | italic | `CrimsonPro-Italic.ttf` | `latin-extended-editorial` | `subsets/body/crimson-pro-400-italic.woff2` |
| **body** | Crimson Pro | 600 | regular | `CrimsonPro-SemiBold.ttf` | `latin-extended-editorial` | `subsets/body/crimson-pro-600.woff2` |
| **body** | Crimson Pro | 700 | regular | `CrimsonPro-Bold.ttf` | `latin-extended-editorial` | `subsets/body/crimson-pro-700.woff2` |
| **body** | Crimson Pro | 700 | italic | `CrimsonPro-BoldItalic.ttf` | `latin-extended-editorial` | `subsets/body/crimson-pro-700-italic.woff2` |
| **nav** | Inter | 400 | regular | `Inter-Regular.otf` | `latin-basic-ui` | `subsets/nav/inter-400.woff2` |
| **nav** | Inter | 600 | regular | `Inter-SemiBold.otf` | `latin-basic-ui` | `subsets/nav/inter-600.woff2` |
| **code** | JetBrains Mono | 400 | regular | `JetBrainsMono-Regular.ttf` | `mono-code` | `subsets/code/jetbrains-mono-400.woff2` |
| **code** | JetBrains Mono | 700 | regular | `JetBrainsMono-Bold.ttf` | `mono-code` | `subsets/code/jetbrains-mono-700.woff2` |
| **civic** | IM Fell English | 400 | regular | `IMFeENrm28P.ttf` | `latin-extended-italian` | `subsets/civic/im-fell-400.woff2` |
| **civic** | IM Fell English | 400 | italic | `IMFeENit28P.ttf` | `latin-extended-italian` | `subsets/civic/im-fell-400-italic.woff2` |

**Total V1 cuts: 14.**

## OpenType feature retention

By default, `pyftsubset` retains a minimal set of GSUB/GPOS features. We extend retention per family:

| Family | Additional features retained | Reason |
|---|---|---|
| Vollkorn | `kern`, `liga`, `dlig`, `onum`, `lnum`, `tnum` | Editorial typography needs old-style figures + tabular figures; ligatures preserve typographic discretion |
| Crimson Pro | `kern`, `liga`, `dlig`, `onum`, `lnum`, `tnum`, `c2sc`, `smcp` | Same as Vollkorn + small caps for editorial pull-quote treatments |
| Inter | `kern`, `liga`, `calt`, `case`, `cv11` | Inter's `cv11` enables single-story 'a' (matches Pangram Sans target character; smooth W2-S-F transition) |
| JetBrains Mono | `kern`, `liga`, `calt` | Code-ligature programming preservation (== / => / != etc.) |
| IM Fell English | `kern`, `liga`, `dlig`, `smcp`, `c2sc` | Small caps for Dante-passage epigraphs; historical ligatures |

Concrete `--layout-features+=` flags are encoded in `build/subset.py` per family.

## Build verification

After running `python build/subset.py`:

1. **Existence check** — all 14 paths in §Cut inventory exist
2. **Size check** — each WOFF2 file ≤ 50 KB (alarm threshold; investigate if exceeded — likely subset profile mismatch)
3. **Glyph round-trip check** — load each WOFF2 with `TTFont` and verify glyph count matches profile expectation (logged in build output)
4. **Checksum recording** — `build/subset.py` writes SHA-256 for each output to `build/checksums.txt`

## Forward-arc

When W2-S-F lands Pangram Sans + Editorial New:

- This manifest gains 2-3 new rows (1 weight Editorial New for wordmark; 1 weight Pangram Sans heaviest for nav; optional second weight if Mayor selects)
- The Inter rows under `nav` surface stay in repo as standing-history (per `feedback_documentation_lifecycle.md` — never delete) but `css/fonts.css` swaps `--font-nav` from `'Inter'` to `'Pangram Sans'`
- Pangram Sans + Editorial New **CANNOT be subset using `pyftsubset`** if the foundry license restricts modification — verify per Pangram Pangram EULA before adding to this manifest. Indie-tier OFL/SIL licenses allow subsetting; commercial-foundry licenses commonly do not. W2-S-F instance verifies and reports.

---

*Manifest authored 2026-05-10 by W2-S-E. Re-runnable: any `build/subset.py` invocation reproduces the binaries exactly to spec.*
