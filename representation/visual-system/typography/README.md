---artifact: typography-canon-entry
slot: V1 OFL stack canon (5 free-OFL families) + 2 W2-S-F deferred slots (wordmark + nav)
authored: W2-S-E 2026-05-10
authored-against: |
  representation/visual-system/color.md §5 wordmark resolution + §10 Decision 7 typography lock + §6.4 colorblind verdicts
  cc-ledger/dispatches/W2/cc7-dispatch-brief-w2.md §3.1 W2-S-E scope + §3.2 dependency map
  master-plan v1.0.9 §3.B platform foundation + §4 W2 Mayor gate + done criteria
  feedback_documentation_lifecycle.md (create/append/amend/tombstone)
ownership: representation/visual-system/typography/ — W2-S-E owned; W2-S-F amends Nav + Wordmark slots when premium fonts procured
status: active
title: Typography canon — V1 OFL stack
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# Typography canon — V1 OFL stack

This directory is **the source of truth for self-hosted webfont assets and `@font-face` declarations** for the DISpatch microsite at V1. It carries five OFL-1.1 typeface families that fill the five typographic slots ratified at CD2 §10 Decision 7c (Mayor 2026-05-07 V1 free-OFL stack lock; CD4 re-fire option preserved).

The directory is **canon-side only** at staging time. The Astro+Next.js runtime wiring (preload tags, asset import paths, build-time copy to `0-terra/fonts/`) lands when W2-S-A bedrock platform foundation reports Done. Until then, this directory stages everything the runtime needs in publishable form.

## What lives here

| Path | Role |
|---|---|
| `fonts.md` | V1 typeface contract — slot/family/weight/source/license matrix with citation back to CD2 §5.3 |
| `manifest.md` | Per-subset spec — Unicode ranges per surface, weights shipped, file naming convention, checksums recorded post-build |
| `licenses/` | OFL-1.1 license texts (one per family) — supply-chain provenance for self-host sovereignty |
| `sources/` | Pristine upstream font files — gitignored; reproduced via `build/procure.sh` |
| `subsets/` | Production WOFF2 cuts grouped by surface (`title/`, `body/`, `nav/`, `code/`, `civic/`) — these are the runtime-served binaries |
| `css/fonts.css` | `@font-face` declarations + slot-aliased font-family CSS variables (`--font-title`, `--font-body`, `--font-nav`, `--font-code`, `--font-civic`) |
| `css/preload.html` | `<link rel="preload">` snippets per critical-weight surface (article landing default load) |
| `tokens/typography.tokens.json` | DTCG token bindings — slot → font stack with placeholder fallbacks for Wordmark + Nav (W2-S-F amends) |
| `build/procure.sh` | Canonical-upstream download orchestration — official GitHub releases preferred over Google Fonts CDN per CD2 §5.3 sovereignty path |
| `build/subset.py` | `pyftsubset` orchestration script — reproduces all WOFF2 cuts from `sources/` |
| `docs/integration.md` | W2-S-A handoff runbook — how Astro/Next.js consumes this directory at runtime |

## Slot map at V1 (CD2 §5.3 lock)

| Slot | V1 family | Status at this dispatch | Forward arc |
|---|---|---|---|
| **Title** (display serif; DISpatch-locked) | **Vollkorn** (Friedrich Althausen) | LOCKED — V1 ship | CD4 re-fire option: Pangram Editorial New if traction warrants |
| **Body** (reading serif; DISpatch-locked) | **Crimson Pro** (Sebastian Kosch) | LOCKED — V1 ship | Preserved in CD4 re-fire option |
| **Nav** (humanist sans; Prime-platform-wide) | **Inter** (Rasmus Andersson) | **PLACEHOLDER** — V1 free-OFL anchor; W2-S-F replaces with Pangram Sans Heaviest | Token alias `--font-nav` re-keys cleanly |
| **Code/Meta** (monospace; component-locked) | **JetBrains Mono** (JetBrains) | LOCKED — V1 ship | CD4 re-fire option: Berkeley Mono if traction warrants |
| **Civic/Dante** (medieval-touched; asset-locked) | **IM Fell English** (Igino Marini) | LOCKED — V1 ship | Preserved in CD4 re-fire option |
| **Wordmark** (`DIS` + `patch` split-color; composition-locked) | (W2-S-F scope) | **PLACEHOLDER** — Vollkorn doubles as wordmark carrier until W2-S-F procures Editorial New | W2-S-F replaces; token alias `--font-wordmark` re-keys cleanly |

## Cross-stream coordination

W2-S-E ships the 5 OFL families and the slot-token machinery. W2-S-F ships the wordmark + nav premium families and re-keys two slot tokens (`--font-wordmark` → Pangram Editorial New; `--font-nav` → Pangram Sans heaviest weight) without touching the rest of the typography directory. The intersection is exclusively the two CSS variables in `css/fonts.css` and the matching DTCG tokens in `tokens/typography.tokens.json`. W2-S-F's amend pattern is documented in `docs/integration.md` §3.

## What's staged vs. what's deferred

**Staged at this dispatch (canon-side):**

- Typeface contract (`fonts.md`)
- Subset manifest (`manifest.md`)
- OFL-1.1 license inventory (`licenses/*.txt`)
- `@font-face` CSS + slot-aliased CSS variables (`css/fonts.css`)
- Critical-weight preload snippet template (`css/preload.html`)
- DTCG token bindings (`tokens/typography.tokens.json`)
- Reproducible procurement script (`build/procure.sh`)
- Reproducible subset script (`build/subset.py`)
- WOFF2 binaries — built when toolchain is available; otherwise scripts are ready-to-run
- Integration runbook for W2-S-A consumption (`docs/integration.md`)

**Deferred to W2-S-A integration re-fire (runtime-side):**

- Astro asset pipeline registration (`@font-face` URL paths bound to Astro public dir)
- Next.js `next/font/local` integration if used (App Router pattern)
- `<link rel="preload">` tags inserted into shared `<head>` partial
- Bundle/chunk-size measurement against perf budget
- End-to-end visual smoke test on a real article surface

## Verification gates this directory satisfies

Per CC7 W2 brief §3.1 W2-S-E done criteria:

- [x] All 5 OFL fonts identified + their canonical upstreams documented
- [x] Per-surface WOFF2 subset specifications authored
- [x] CSS `@font-face` declarations authored
- [x] APCA contrast verified against CD2 color tokens *(see `docs/integration.md` §4 — math-only verification independent of runtime; concrete pairing matrix populated)*
- [ ] WOFF2 binaries built *(staged dependency on toolchain install + procurement run; see `docs/integration.md` §1)*
- [ ] Operational in Astro+Next.js hybrid foundation *(W2-S-A integration re-fire dependency)*

The first four are W2-S-E's owned scope. The last two are gated on tooling + W2-S-A respectively and are surfaced as Conductor signals (see diff at `cc-ledger/diffs/W2-S-E/`).

---

*Authored 2026-05-10 by W2-S-E typography-integration instance. Diff staged at `cc-ledger/diffs/W2-S-E/`. Repo Code commits at Wave-gate close cluster per CC charter Invariant #3.*
