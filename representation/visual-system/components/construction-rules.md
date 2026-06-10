---artifact: components-construction-rules
version: 0.1.0
ratified: 2026-05-13
authored-against:
  - W3-S-A canon-reconciliation-tombstone (2026-05-10 evening) — canon-correct'd the 7 hard rules from W3-S-A phase-1-reset-rules.md by tombstoning the Cycle 1 "real CSS theme variants" rule (substrate moved to bridge-level emission via [data-prime-cycle] selector blocks)
  - W3-S-A canon-reconciliation-amend-1 (2026-05-11) — 3-cycle Dawn/Dusk/Night substrate restored
  - Mayor 2026-05-13 furnace directive — chiseled surface canon
governs: every component implementation under `code/packages/ui/src/components/`
discipline: append-only; amendments via canon-reconciliation-style appended notices; SUPERSEDED-BY markers on retired rules
title: Component Construction Rules
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
last_amended: 2026-05-17
load_bearing: true
---

# Component Construction Rules

7 hard rules govern every component implementation. Violation is non-conformant — Mayor adjudicates rebuild path. Rules are canon-correct per W3-S-A canon-reconciliation 2026-05-10 evening (which tombstoned Cycle 1's standalone "real CSS theme variants" rule when the 3-cycle substrate moved to bridge-level emission via `[data-prime-cycle]` selector blocks on `:root`).

## Rule 1 — Substrate-agnostic root

Components do NOT set `background-color` on their root element. Substrate is page-surface owned (article surfaces, reception surfaces, theme-cycler decorators); components contribute structure + typography + bounded interaction states, not chromatic substrate.

**FORBIDDEN:**
```css
.prime-site-nav { background-color: var(--sky-low); }
.prime-chapter-rail { background-color: var(--sky-low); }
.prime-footnote__container { background-color: var(--window-warm); }
```

**ALLOWED:**
```css
.prime-site-nav { /* no bg */ }
.prime-chapter-rail { border-left: 2px solid var(--rail-edge); }
.prime-footnote__container { background-color: var(--surface-inset); /* contained slot only */ }
```

The exception class — components legitimately needing a contained background — must use `--surface-inset` or theme-conditioned equivalent, NOT vellum. Even then, it's a CONTAINER slot, not a root.

## Rule 2 — Lane-semantic accent deployment

The three lane pigments are SEMANTICALLY DISTINCT, not interchangeable. Per CD2 §4.3 Decision 5:

| Lane | Pigment token | Use for |
|---|---|---|
| **dispatch** | `--platform-accent-prime` (Atlantic-wine `#8e2532`; CD2 Decision 12) | Wordmark "DIS" + dispatch-typed markers + focus rings on critical interactions |
| **institutional** | `--platform-text-body-strong` + `--lane-institutional` (graphite-blue cool-mineral) | Body prose + institutional content + cosmology-position markers |
| **editorial** | `--lane-editorial` (terracotta warm-earth) | Editorial-register content + writing-track markers + warm-publication signals |

**FORBIDDEN:** Using `--platform-accent-prime` (wordmark wine) on every focus ring + every active indicator + every border without semantic justification. Per W3-S-A canon-reconciliation 2026-05-10: "wine became chrome wallpaper" is the failure mode this rule exists to prevent.

**ALLOWED:**
- Focus rings use `--platform-accent-prime` because focus-visibility is a CRITICAL interaction
- Current-chapter indicator uses `--platform-copper` (gilded register; wayfinding-but-not-alarm)
- Cosmology markers use `--platform-accent-prime` (Inferno-infra surfacing per CD2 §10 Decision 7)
- Editorial-register content uses editorial-lane pigments; institutional-register uses institutional-lane

Each accent placement carries inline CSS-comment justification against the lane semantics.

## Rule 3 — Distinct visual character per component

Components are NOT all the same visual archetype. Each has a different role + surface context:

| Component | Visual character |
|---|---|
| **MastheadWordmark** | Typographic-only identity. NO chrome around it. DIS+patch typography composition IS the visual character. Split-color (wine `#8e2532` + near-black). Patch +8% sizing per CD2 Decision 12b. |
| **SiteNav** | Top-of-page chrome BAND. Subtle border-bottom for boundary; copper-default nav links per CD2 Decision 12c; layout discipline (left/center/right slots) carries structure. Background is HOST-PROVIDED. |
| **ChapterRail** | Vertical-rail navigation device. Distinguished by left-edge structural line. NOT a box with bg — a RAIL. Quiet structural indicator dot (NOT Roman numerals — tombstoned 2026-05-10); current dot fills with `--platform-copper` (gilded wayfinding per CD4 spec Field 7). |
| **ReadingProgress** | Hairline-thin chrome at viewport-top. Fill = `--window-warm` atmospheric (paper-grain register per CD1 Concept 4 + CD4 spec Field 5+7). NOT wine — wine is wordmark/dispatch territory; ReadingProgress sits above nav which is copper. |
| **Footnote** | Two structural registers: inline marker (typographic; Meta-code typography per spec Field 7) + container (semantic aside; typographic shift not chromatic substrate). |

Phase 2 + Phase 3 components inherit the discipline: each gets a distinct visual character justified against its CD4 spec, not the same archetype repeated.

## Rule 4 — Canon-token consumption only

Components consume tokens via `var(--token-name)` from `@prime-dispatch/tokens/css`. NO inline hex values; NO inventions (no theme-specific hex variants per lane; no `--font-civic-dante: Cinzel` substitutions when canon names IM Fell English per CD2 §5.3 + CD1 Concept 1).

The bridge at `code/packages/tokens/dist/tokens.css` is downstream of canon — never treat the bridge as source of truth. If a token isn't in CD2 / CD4 / typography canon, it doesn't exist operationally. Amendment goes through CD2 §10 ledger (per Decision 12 precedent), NOT through bridge edits.

## Rule 5 — Substrate emits via `[data-prime-cycle]` at bridge level

The 3-cycle Dawn/Dusk/Night substrate system (per CD3 concept-01 FORMULA §2.1+§2.2; restored to bridge 2026-05-11) emits via `[data-prime-cycle="dawn|dusk|night"]` selector blocks on `:root`. Dawn is `:root` direct (default); Dusk + Night are selector overrides. 320ms ease-out transition on substrate-bound elements per CD5 §3.1 substrate-breathing motion category.

**FORBIDDEN:** Components defining their own theme variants. Per-cycle adjustment happens at the bridge level via cycle selector cascade — components consume `--surface-page` / `--text-strong` / `--rail-edge` semantic tokens that resolve per active cycle automatically.

**SUPERSEDED:** Cycle 1's original Rule 2 "Real CSS theme variants OR remove the toolbar" was per-component theme-variant authorship. Tombstoned 2026-05-10 (canon-reconciliation): substrate-level cycle emission via bridge is canon-correct; component-level theme variants are not.

## Rule 6 — When in doubt, less chrome

Atmospheric chrome has a place — but it's NOT every component. Components that DON'T need a contained surface should ship transparent. Default: "no bg, no border" UNLESS the structural role demands a boundary signal (a rail, a band, a contained inset).

Per W3-S-A canon-reconciliation 2026-05-10 tombstoned inventions (full list in chiseled-history below): middot `·` separators, wine `::before` masthead-bands, Cinzel `❖` illuminated ornaments, double-rule shadow rails, drafting-grid ReadingProgress track patterns, Roman-numeral chapter markers, italic-on-patch — all classified as "chrome that shouldn't exist." The rule exists to prevent these classes of invention.

## Rule 7 — Anti-pattern documentation inline

Every component CSS file opens with a comment block listing anti-patterns specific to that component. Example:

```css
/* Footnote — canon-bound styles.
 *
 * INTENTIONAL ANTI-PATTERNS (do NOT add these without Mayor canon-promotion via CD2 §10):
 *   - No background-color on .prime-footnote root (substrate is host-owned; Rule 1)
 *   - No --window-warm bg on .prime-footnote__container (margin-aside uses typographic shift,
 *     not chromatic; Rule 1 + Rule 6)
 *   - No mechanical accent-prime on every state (use lane semantics; Rule 2)
 *   - No Cinzel container label (tombstoned 2026-05-10; Rule 4 — IM Fell English is the canon
 *     Civic-Dante per CD2 §5.3 + CD1 Concept 1)
 *   - No column-rule ::after gutter (tombstoned 2026-05-10; Rule 6)
 *   - No small-caps ⟵ swash back-link (tombstoned 2026-05-10; Rule 6)
 */
```

This forces the agent to think about the rule before writing the violation.

---

## Chiseled history — what these rules killed

The rules above were chiseled from W3-S-A Cycle 1 (2026-05-10 morning) + Cycle 2 (2026-05-10 afternoon) inventions that did NOT survive canon-reconciliation 2026-05-10 evening. Authoritative record at `archive/cc-ledger/diffs/W3-S-A/cycle-2/canon-reconciliation-tombstone.md`. Load-bearing rejected ideas (agents read these to avoid re-proposing):

- **Light / Blueprint / Black theme naming** → Dawn / Dusk / Night is canon (per CD3 FORMULA §2.1+§2.2)
- **Cinzel for Civic-Dante** → IM Fell English (per CD2 §5.3 + CD1 Concept 1)
- **Italic letterspace on wordmark patch** → no italics (Mayor 2026-05-10: "we definitely decided no italics")
- **Wine `::before` masthead-band on SiteNav** → no — wine is wordmark/dispatch-precious, not chrome wallpaper
- **Middot `·` separators between nav-links** → not in spec; tombstoned
- **Roman-numeral chapter markers + Cinzel small-caps + double-rule shadow rail + pilcrow section-break** → tombstoned; quiet structural indicator dot is canon (per CD4 spec Field 7)
- **Wine linear-gradient ReadingProgress fill + angled clip-path cap + drafting-grid track pattern** → tombstoned; `--window-warm` atmospheric fill is canon (per CD4 spec Field 5+7)
- **Cinzel `❖` Footnote container label + overline ornament + column-rule `::after` + small-caps `⟵` swash back-link** → tombstoned; simple typographic register-shift is canon
- **Per-theme hex variants per lane** (e.g., `#a8472f` light / `#d4956b` dusk / `#ff8a5a` black for editorial) → Cycle 1 scaffolding drift; canon = ONE OKLCH per lane (per CD2 §4.3 Decision 5)
- **3-theme system at component level via per-component CSS** → tombstoned; cycle emission is bridge-level (Rule 5)

---

*Construction rules ratified 2026-05-13 by Mayor furnace directive. Append-only; amendments via canon-reconciliation-style appended notices. Constitutional for every component implementation under `code/packages/ui/src/components/`.*
