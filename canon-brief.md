---brief: prime-dispatch-visual-system
version: 0.4.0
ratified: 2026-05-13
scope: portable cold-load brief for Claude sessions; condensed canon for paste/share
parent-canon: representation/visual-system/ (full canon at the paths in canon-files below)
dependencies: [prime.md, brand.md]
amendment-mechanic: append-decisions-with-superseded-by-markers
authored-against:
  - W3-S-A canon-reconciliation-tombstone (2026-05-10 evening)
  - W3-S-A canon-reconciliation-amend-1 (2026-05-11)
  - Mayor 2026-05-13 furnace directive (chiseled surface canon)

canon-files:
  CD1-thesis:           representation/visual-system/thesis.md
  CD1-inputs:           representation/visual-system/reference-archive.md
  CD2-color:            representation/visual-system/color.md
  CD3-cartography:      representation/visual-system/cartography.md
  CD4-components:       representation/visual-system/components.md
  CD5-motion:           representation/visual-system/motion.md
  manifest:             representation/visual-system/MANIFEST.yaml
  construction-rules:   representation/visual-system/components/construction-rules.md
  component-specs:      representation/visual-system/components/<Name>/spec.md  # 20 files
  typography-index:     representation/visual-system/typography/README.md
  typography-contract:  representation/visual-system/typography/fonts.md
  typography-tokens:    representation/visual-system/typography/tokens/typography.tokens.json
  typography-css:       representation/visual-system/typography/css/fonts.css
  operations-deploy:    code/vercel.json                                        # deploy SoT (manual CLI)
  bridge-source:        code/packages/tokens/src/{platform,dispatch,asset}.json
  bridge-outputs:       code/packages/tokens/dist/{tokens.css,tokens.tailwind.config.ts,tokens.toon}
  bridge-consumer:      '@prime-dispatch/tokens/css'
  components-code:      code/packages/ui/src/components/{custom,patterns,ui}/
  storybook:            code/apps/storybook/
  chiseled-history:
    - archive/cc-ledger/diffs/W3-S-A/cycle-2/canon-reconciliation-tombstone.md       # 2026-05-10 (the kill list)
    - archive/cc-ledger/diffs/W3-S-A/cycle-2/canon-reconciliation-amend-1-2026-05-11.md  # 2026-05-11 (3-cycle restore)

agent-reading-recipes:
  implement-new-component:
    - CD4 components.md                       # contract + inventory + 7-field spec template
    - components/<Name>/spec.md                # what to build
    - components/construction-rules.md         # 7 hard rules
    - CD2 color.md §10                         # tokens + amendment ledger
    - typography/README.md                     # font slots
    - chiseled-history.tombstone               # what NOT to invent
  amend-a-token:
    - CD2 color.md §10                         # Decision 12 is the worked example of supersede-with-markers
    - CD2 color.md §11                         # done criteria
  deploy-or-operate:
    - code/vercel.json                         # deploy SoT
    - code/apps/microsite-astro/deploy.md      # deploy runbook (manual CLI)
  understand-what-was-rejected:
    - chiseled-history.tombstone
    - chiseled-history.amend-1

deferred-mayor-adjudication:
  - id: cd2-3-cycle-canon-promotion
    note: Promote 3-cycle Dawn/Dusk/Night to CD2 §2.5; Dusk OKLCH pending Mayor lock (provisional in bridge at oklch(0.58 0.050 65))
  - id: apca-dusk-night-pre-screen
    note: APCA evidence rows for Dusk + Night cycle substrates (Dawn was W2-S-E validated)
  - id: per-component-fidelity-audit
    note: Mayor 2026-05-11 close-out flagged "some components still look bad vs canon"
  - id: phase-2-remainder
    note: LiveTicker + SearchPalette components not yet built
  - id: phase-3-patterns
    note: 9 pattern components pending (CodeBlockCopyButton, MetroMapMarker, CartographyCanvas, ReceptionHero, EditorialDigest, DistrictMap, CrossPost, VirgilChat, LiveRoom)
title: Prime DISpatch — Brand Canon (Condensed Brief)
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
last_amended: 2026-05-17
load_bearing: true
---

# Prime DISpatch — Brand Canon (Condensed Brief)

> **For any Claude session cold-loading into Prime DISpatch visual-system work.** Frontmatter above carries the machine-readable index + reading recipes. Body below carries the load-bearing rules + operational values + chiseled-history "do not re-propose" list. Full canon at paths listed in frontmatter; this brief is self-contained for paste/share.

## What you're operating inside

Prime DISpatch is Prime's V1 dev-diary microsite — Astro 6 + Next.js 15 hybrid; pnpm 10 monorepo. Brand canon lives at `representation/visual-system/`. Five ratified Decision Documents (CD1-5) + sub-canon (typography, construction rules) + ops records + bridge (tokens + component library) + chiseled-history records.

**Sandbox is a furnace, not a museum.** Load-bearing ideas chisel into canon via the CD2 §10 ledger pattern (append-only with SUPERSEDED-BY / AMENDED-IN-PART markers). Rejected ideas burn through canon-reconciliation tombstone records; source files vaporize. Git history is the only diff archive; canon is the only preservation surface.

**Authority chain:** Mayor adjudicates canon promotions. Bridge or inline CSS amendments are pre-canon and require canon-promotion to become authoritative. Conductor relays signal proposals through State Layer (CMD-005). Repo Code is sole committer (Invariant #3) at Wave-gate close clusters.

---

## Foundations (CD2 + CD1)

- **4-tier token hierarchy** (CD2 §2.1 Hybrid C+D): `tokens.color.platform > tokens.color.dispatch > tokens.color.asset > tokens.color.component.<name>`. Cross-tier reference rule (CD2 §2.4 β): lower tier → higher tier OK; higher → lower BLOCKED by validator.
- **8-field DTCG 2025.10 token shape** (CD2 §2.5): `$value` + `$type` + `$description` + `$extensions.prime.{tier, concept-citation, apca-validated-pairs, colorblind-validated, ratified-at}`.
- **Three-layer naming** (CD2 §2.4): numeric (Tailwind v4 + Vellum) + semantic-intent (`--lane-editorial-strong`) + spatial-perceptual (`--sky-high`, `--reflect`, `--window-warm`).
- **Three lane pigments** (CD2 §4.3 Decision 5; semantically distinct, NOT interchangeable):
  - **dispatch** (`--lane-dispatch` → inherits `--platform-accent-prime`): Inferno-infra surfacing
  - **institutional** (`--lane-institutional`, graphite-blue cool-mineral)
  - **editorial** (`--lane-editorial`, terracotta warm-earth)
- **Cosmology framing** (CD2 §10 Decision 7): dispatch-red surfaces Inferno underneath Purgatorio at masthead. Wordmark = visible Inferno-infra surfacing.
- **APCA contrast** (CD2 §3): Lc ≥85 body / ≥70 display / ≥55 incidental + γ exceptions (wordmark Lc ≥90; cartography far-zoom ≥60; minimap chrome ≥35; secondary ≥40).
- **Colorblind framework** (CD2 §6): three-deficiency-type discipline (deuteranopia + protanopia + tritanopia); chroma.js + Color Oracle + Sim Daltonism + Coolors Pro + Mayor cascade.

---

## Operational color values (CD2 ratified + Decision 12 amendments)

| Token | Operational hex | Use |
|---|---|---|
| `--platform-accent-prime` | **`#8e2532`** *(Decision 12a)* | Wordmark "DIS" + Inferno-infra surfacing markers + focus rings on critical interactions |
| `--platform-accent-prime-active` | **`#6b2520`** *(NEW in Decision 12c)* | Wine intermediate; nav active state (tonal-stepping discipline) |
| `--platform-text-body-strong` | `#1a1a1a` | Body text + wordmark "patch" + institutional content |
| `--platform-copper` | `#b87333` | Nav default + current-chapter indicators + Prime institutional gilded warmth |
| `--platform-copper-deep` | **`#8b5224`** *(NEW in Decision 12c)* | Nav hover; engagement deepening within copper register |
| `--asset-cartography-pulse` | `oklch(0.45 0.18 22°)` (stub) | Cartography pulse; CD3 calibrates per-zoom-state |

**Bold** = added/amended by Decision 12 (2026-05-13 canon-promotion of Mayor 2026-05-10 W2-S-F lock).

**Nav state arc** (CD2 Decision 12c tonal-stepping):

| State | Token | Hex |
|---|---|---|
| default | `--platform-copper` | `#b87333` |
| hover | `--platform-copper-deep` | `#8b5224` |
| active | `--platform-accent-prime-active` | `#6b2520` |
| focus-visible | outline: `--platform-accent-prime` | `#8e2532` |
| disabled | (opacity 0.35) | — |

**Wordmark composition** (CD2 §10 Decision 7b + Decision 12b): `<span class="wordmark"><span class="wordmark-dis">DIS</span><span class="wordmark-patch">patch</span></span>`. Patch +8% sizing: `.wordmark-patch { font-size: 1.08em; }`.

---

## 3-cycle substrate system (CD3 FORMULA + W3-S-A canon-reconciliation-amend-1)

Emits via `[data-prime-cycle="dawn|dusk|night"]` selector blocks on `:root` at **bridge level** (NOT component level). Dawn = `:root` direct (default; no selector needed). 320ms ease-out transition on substrate-bound elements per CD5 §3.1 substrate-breathing motion category.

| Cycle | Substrate OKLCH | Canon source |
|---|---|---|
| **Dawn** (default) | `oklch(0.96 0.012 88)` | CD3 concept-01 FORMULA §2.1 verbatim |
| **Dusk** | `oklch(0.58 0.050 65)` ⚠️ provisional | canon-derived interpolation; Mayor lock pending |
| **Night** | `oklch(0.22 0.016 55)` | CD3 concept-01 FORMULA §2.2 inverted-Dawn pattern |

⚠️ Dusk OKLCH not yet Mayor-locked. CD2 §2.5 canon-promotion of the 3-cycle system is on deferred Mayor adjudication backlog (per Mayor 2026-05-11 close-out).

---

## Typography slot map (CD2 §5.3 + W2-S-F + canon-reconciliation 2026-05-10)

| Slot | V1 family (OFL) | Premium overlay (W2-S-F) |
|---|---|---|
| Title (display serif; DISpatch-locked) | Vollkorn | — |
| Body (reading serif; DISpatch-locked) | Crimson Pro | — |
| Nav (humanist sans; Prime-platform-wide) | Inter | **Pangram Sans Extrabold** (11.3KB subset) |
| Code/Meta (monospace; component-locked) | JetBrains Mono | — |
| **Civic-Dante** (medieval-touched; asset-locked) | **IM Fell English** | — |
| Wordmark (`DIS` + `patch` split-color) | Vollkorn (carrier) | **Pangram Editorial New Bold** (1.5KB subset; 8 glyphs `DISpatch`) |

CSS slot tokens: `--font-{title,body,nav,code,civic,wordmark}`. Files at `representation/visual-system/typography/subsets/`.

⚠️ **Civic-Dante = IM Fell English, NOT Cinzel.** Cinzel was a Cycle 2 invention tombstoned 2026-05-10.

---

## Component construction — 7 hard rules

These govern every implementation under `code/packages/ui/src/components/`. Violation is non-conformant — Mayor adjudicates rebuild path.

1. **Substrate-agnostic root.** Components do NOT set `background-color` on their root element. Substrate is page-surface owned. Contained-slot exceptions use `--surface-inset` only.
2. **Lane-semantic accent deployment.** dispatch/institutional/editorial are NOT interchangeable. Each accent placement carries inline CSS-comment justification against lane semantics. Failure mode this rule prevents: "wine becomes chrome wallpaper."
3. **Distinct visual character per component.** Rail vs band vs hairline vs typographic vs fixture — not all the same archetype repeated. MastheadWordmark = typographic-only; SiteNav = chrome band; ChapterRail = vertical rail (NOT a box); ReadingProgress = hairline atmospheric fill; Footnote = typographic register-shift not chromatic substrate.
4. **Canon-token consumption only.** `var(--token-name)` from `@prime-dispatch/tokens/css`. No inline hex. No inventions. Bridge is downstream of canon — never source-of-truth. Amendments go through CD2 §10 ledger.
5. **Substrate emits via `[data-prime-cycle]` at bridge level.** Components do NOT define theme variants; cycle selector cascade resolves semantic tokens per active cycle automatically. *(SUPERSEDES Cycle-1 Rule 2 "real CSS theme variants" — tombstoned 2026-05-10.)*
6. **When in doubt, less chrome.** Default: "no bg, no border" unless structural role demands a boundary signal.
7. **Anti-pattern documentation inline.** Every component CSS file opens with comment block listing component-specific anti-patterns + citing which Rule each enforces.

---

## Chiseled history — do NOT re-propose

Per canon-reconciliation-tombstone (2026-05-10). Agents read this list BEFORE proposing component changes.

**Themes / substrate:**
- Light / Blueprint / Black naming → **Dawn / Dusk / Night** is canon (per CD3 FORMULA)
- Cream substrate as "city-engineer map" metaphor (Cycle 1) → tombstoned
- Per-theme hex variants per lane → ONE OKLCH per lane is canon (per CD2 §4.3); per-cycle adjustment via `[data-prime-cycle]` selector
- Component-level theme variants (Cycle-1 Rule 2) → SUPERSEDED by Rule 5 bridge-level emission

**Typography:**
- Cinzel for Civic-Dante → **IM Fell English** (per CD2 §5.3 + CD1 Concept 1)
- Italic letterspace on wordmark patch → no italics (Mayor 2026-05-10: "we definitely decided no italics")

**SiteNav:**
- Wine `::before` masthead-band → no; wine is wordmark/dispatch-precious
- Middot `·` separators between nav-links → not in spec; tombstoned
- Small-caps SEARCH typographic affordance → tombstoned (simplified)

**ChapterRail:**
- Roman-numeral chapter markers + Cinzel small-caps → tombstoned; **quiet structural indicator dot** is canon
- Double-rule "shadow rail" `::before` 4px outside primary → tombstoned
- Pilcrow `¶` section-break ornament every 5 chapters → tombstoned
- Text-shadow halo on current marker → tombstoned
- "What's inside" Cinzel reception-condensed heading → tombstoned

**ReadingProgress:**
- Wine linear-gradient fill (`--lane-dispatch-strong → --accent-prime-active`) → tombstoned; **`--window-warm` atmospheric fill** is canon (per CD4 spec Field 5+7)
- Angled clip-path cap on fill right edge → tombstoned
- Drafting-grid track pattern (Light-theme-only) → tombstoned
- Typographic-percentage Pangram Sans 800 small-caps "PROGRESS · 47%" → tombstoned (canon uses Meta-code typography per spec)

**Footnote:**
- Cinzel `❖` illuminated-manuscript ornament container label → tombstoned
- Overline ornament on container label → tombstoned
- Column-rule `::after` vertical hairline gutter → tombstoned
- Small-caps `⟵` swash back-link → tombstoned; **simple Nav-slot text link** per spec Field 7

**Authoritative records:** `archive/cc-ledger/diffs/W3-S-A/cycle-2/canon-reconciliation-tombstone.md` (2026-05-10) + `canon-reconciliation-amend-1-2026-05-11.md` (2026-05-11).

---

## Token pipeline (operations)

**Superseded (2026-08-18):** the V1 Penpot-on-VPS token pipeline never shipped. The tokens bridge is
hand-maintained (`0.0.0-w3-s-a-bridge`, `code/packages/tokens`) until ADR-0003 Stage S2 lands the
generated pipeline (`docs/adr/0003-vertical-design-stack-architecture.md`).

- **Consumer (current truth):** `@prime-dispatch/tokens/css` subpath export resolves to bridge `dist/tokens.css`

---

## Deploy lanes (W2-S-C; Mayor 2026-05-10 lock)

- **PRIMARY:** Vercel (Astro 6 native); config at `code/vercel.json` — the single authoritative file

---

## Amendment mechanic (CD2 §10 pattern; Decision 12 is the worked example)

When a Mayor-locked amendment lands:

1. **Append a new numbered Decision** to CD2 §10 (forward-only; SUPERSEDED markers go elsewhere, not in §10's structure)
2. **Add `> AMENDED IN PART by Decision N` block** at the top of the superseded Decision, naming what migrated and what survives
3. **Add `[x]` item** to §11 done criteria naming the new Decision
4. **Vaporize the amendment proposal file** from cc-ledger archive (load-bearing content is now in canon)
5. **Bridge stays unchanged** (it was already emitting the values during pre-canon staging; canon-promotion makes canon match bridge)

Never delete or in-place mutate the original Decision text. Never use git-only history as the supersession signal — markers must be visible inside the canon file.

---

## Component inventory (CD4 §3.1; Mayor 2026-05-08 ratified)

20 V1 components in three layers under `code/packages/ui/src/components/`:

- **Phase 1 chrome** (`/custom/`; 5 components — REBUILT post-canon-reconciliation 2026-05-10): MastheadWordmark, SiteNav, ChapterRail, ReadingProgress, Footnote
- **Phase 2 chrome** (`/custom/`; 6 components — 4 built 2026-05-11, 2 pending): DldsPanel, MetaArticleOpener, NarrativeArticleOpener, InstitutionalFixture (built); LiveTicker, SearchPalette (pending)
- **Phase 3 patterns** (`/patterns/`; 9 components — all pending): CodeBlockCopyButton, MetroMapMarker, CartographyCanvas, ReceptionHero, EditorialDigest, DistrictMap, CrossPost, VirgilChat, LiveRoom

Per-component spec at `representation/visual-system/components/<Name>/spec.md` (7-field template).

---

## Quick orientation for a fresh Claude session

If you're reading this cold and need to act fast:

1. **Read this whole brief first** — it's ~300 lines; faster than grepping canon
2. **Pick a reading recipe** from frontmatter `agent-reading-recipes` matching your task
3. **Honor the construction rules** (Section "7 hard rules") and the chiseled-history kill list before authoring anything
4. **Surface contradictions** — if canon says X and bridge says Y, canon wins; if you can't reconcile, surface to Mayor rather than improvise
5. **Sandbox is a furnace** — any cc-ledger diff you author should describe deliverables landing at canonical paths, not be the deliverable itself; your work product graduates to canon or vaporizes

---

*Condensed canon brief authored 2026-05-13 per Mayor furnace directive. Self-contained portable artifact for cold-loading Claude sessions. Authoritative paths in frontmatter; chiseled history at the two archive paths named in `chiseled-history`. Amendments via CD2 §10 ledger pattern (Decision 12 is the worked example). Append-only.*
