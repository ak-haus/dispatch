/**
 * DESIGN.md emit target — the S3 brand contract (ADR-0003 §Stage 7).
 *
 * Renders the repo-root DESIGN.md: spec-shaped YAML token frontmatter
 * (Google Labs DESIGN.md spec, register §6 house-hybrid) compiled from the
 * SAME DTCG source that emits tokens.css, plus house prose distilled from
 * CD1–5 with pointers into representation/visual-system/ — never copies.
 * The contract cannot drift from the shipped tokens because it IS a build
 * artifact; CI gate #8 (design-contract-drift) rebuilds and fails closed.
 *
 * Fail-closed by construction: every token table below is emitted by
 * ITERATING the parsed dictionaries (a new source token appears on the next
 * build; nothing hand-listed can silently go stale), and every cross-token
 * reference is asserted against the dawn dictionary before emission.
 */

/** Walk a Style Dictionary DTCG tree → ordered entries with full metadata. */
function collectFull(tree) {
  const out = [];
  const walk = (node, path) => {
    if (typeof node !== 'object' || node === null) return;
    if (node.$value !== undefined) {
      const prime = node.$extensions?.prime ?? {};
      out.push({
        path: path.join('.'),
        type: node.$type,
        value: node.$value,
        description: node.$description ?? '',
        cssName: prime.cssName,
        css: prime.css,
        tier: prime.tier,
        theme: prime.theme === true,
        root: prime.root === true,
        ratifiedAt: prime['ratified-at'] ?? '',
      });
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      walk(v, [...path, k]);
    }
  };
  walk(tree, []);
  return out;
}

const VAR_REF = /^var\(--([a-z0-9-]+)\)$/;

/** `var(--x)` → spec token reference `{colors.x}`; plain values pass through. */
function specColorValue(css, dawnByCssName, ctx) {
  const m = css.match(VAR_REF);
  if (!m) return css;
  if (!dawnByCssName.has(m[1])) {
    throw new Error(`[design-md] ${ctx} references --${m[1]} which is not a dawn color token`);
  }
  return `{colors.${m[1]}}`;
}

/** Dimension/duration $value → display string. */
function dim(value) {
  if (typeof value === 'number') return String(value);
  return `${value.value}${value.unit}`;
}

// JSON strings are valid YAML double-quoted scalars — quotes/backslashes in a
// future token value emit escaped instead of breaking the frontmatter.
const yq = (v) => JSON.stringify(String(v));

// Markdown-table cell: a pipe in a future $description/css would silently
// corrupt the row structure — escape it.
const cell = (v) => String(v).replace(/\|/g, '\\|');

export function renderDesignMd({ dawnTree, duskTree, nightTree }) {
  const dawnAll = collectFull(dawnTree);
  const duskAll = collectFull(duskTree);
  const nightAll = collectFull(nightTree);

  const dawnColors = dawnAll.filter((t) => t.path.startsWith('color.') && t.cssName);
  const canonical = dawnColors.filter((t) => !t.path.startsWith('color.ui.'));
  const aliases = dawnColors.filter((t) => t.path.startsWith('color.ui.'));
  const dawnByCssName = new Map(dawnColors.map((t) => [t.cssName, t]));
  const canonicalNames = new Set(canonical.map((t) => t.cssName));

  const byCss = (list, label) => {
    const map = new Map();
    for (const t of list.filter((x) => x.cssName)) {
      if (!canonicalNames.has(t.cssName)) {
        throw new Error(`[design-md] ${label} overrides --${t.cssName}, which has no dawn canonical base`);
      }
      map.set(t.cssName, t);
    }
    return map;
  };
  const dusk = byCss(duskAll, 'dusk');
  const night = byCss(nightAll, 'night');

  const families = dawnAll.filter((t) => t.path.startsWith('font.family.'));
  const weights = dawnAll.filter((t) => t.path.startsWith('font.weight.'));
  const weight = (name) => {
    const w = weights.find((t) => t.path === `font.weight.${name}`);
    if (!w) throw new Error(`[design-md] ratified weight token font.weight.${name} is missing`);
    return w.value;
  };
  // Slot↔weight pairings ratified in the slot/weight $descriptions
  // (wordmark = Editorial New Bold 700; nav = Pangram Sans Extrabold 800;
  // body = the regular/default weight). Other slots carry no ratified pairing.
  const slotWeights = new Map([
    ['wordmark', weight('bold')],
    ['nav', weight('extrabold')],
    ['body', weight('regular')],
  ]);

  const cartography = dawnAll.filter((t) => t.path.startsWith('cartography.'));
  const motion = dawnAll.filter((t) => t.path.startsWith('motion.'));

  // ---------------------------------------------------------------- frontmatter
  const fm = [];
  fm.push('---');
  fm.push('version: "alpha"');
  fm.push('name: "PRIME DISpatch"');
  fm.push('description: "Brand contract for the DISpatch editorial microsite (dispatchmag.dev) — generated from the @prime-dispatch/tokens DTCG source; prose distilled from the CD1-5 canon at representation/visual-system/. GENERATED FILE: edit the source, never this file."');
  fm.push('omitted:');
  fm.push('  - section: "Elevation & Depth"');
  fm.push('    reason: "no ratified elevation canon; letterpress (emboss/burn-in) is the depth register (see Typography)"');
  fm.push('  - section: "Shapes"');
  fm.push('    reason: "no ratified radius scale exists in canon (see Adjudicated questions, OQ-4 adjacency)"');
  fm.push('colors:');
  let tierCursor = '';
  for (const t of canonical) {
    if (t.tier !== tierCursor) {
      tierCursor = t.tier;
      fm.push(`  # ${tierCursor} tier`);
    }
    fm.push(`  ${t.cssName}: ${yq(specColorValue(t.css, dawnByCssName, t.path))}`);
  }
  fm.push('  # W2 short-name alias API (packages/ui + microsite-next consumers)');
  for (const t of aliases) {
    fm.push(`  ${t.cssName}: ${yq(specColorValue(t.css, dawnByCssName, t.path))}`);
  }
  fm.push('typography:');
  for (const t of families) {
    const slot = t.path.replace('font.family.', '');
    fm.push(`  ${slot}:`);
    fm.push(`    fontFamily: ${yq(t.css)}`);
    if (slotWeights.has(slot)) fm.push(`    fontWeight: ${slotWeights.get(slot)}`);
  }
  fm.push('---');

  // ---------------------------------------------------------------- tables
  const canonTable = [
    '| Token | Dawn value | Tier |',
    '|---|---|---|',
    ...canonical.map((t) => `| \`--${t.cssName}\` | \`${t.css}\` | ${t.tier} |`),
  ].join('\n');

  const aliasTable = [
    '| Alias (W2 API) | Target |',
    '|---|---|',
    ...aliases.map((t) => `| \`--${t.cssName}\` | \`${t.css.replace(VAR_REF, '--$1')}\` |`),
  ].join('\n');

  const cycleTable = [
    '| Token | Dusk | Night |',
    '|---|---|---|',
    ...canonical.map((t) => {
      const d = dusk.get(t.cssName);
      const n = night.get(t.cssName);
      return `| \`--${t.cssName}\` | ${d ? `\`${d.css}\`` : '—'} | ${n ? `\`${n.css}\`` : '—'} |`;
    }),
  ].join('\n');

  const slotTable = [
    '| Slot | Live stack (shipped) | Emits to | Tier |',
    '|---|---|---|---|',
    ...families.map((t) => {
      const slot = t.path.replace('font.family.', '');
      const target = t.theme ? '`tokens.theme.css` (`@theme`)' : '`tokens.css` (`:root`)';
      return `| ${slot} | \`${t.css}\` | ${target} | ${t.tier} |`;
    }),
  ].join('\n');

  const weightTable = [
    '| Weight token | Value | Role |',
    '|---|---|---|',
    ...weights.map((t) => `| ${t.path.replace('font.weight.', '')} | ${t.value} | ${cell(t.description)} |`),
  ].join('\n');

  const cartoTable = [
    '| Token | Value | Role |',
    '|---|---|---|',
    ...cartography.map((t) => `| \`${t.path}\` | ${dim(t.value)} | ${cell(t.description)} |`),
  ].join('\n');

  const motionTable = [
    '| Token | Value | Role |',
    '|---|---|---|',
    ...motion.map((t) => `| \`${t.path}\` | ${dim(t.value)} | ${cell(t.description)} |`),
  ].join('\n');

  // ---------------------------------------------------------------- document
  return `${fm.join('\n')}

<!-- GENERATED FILE — do not hand-edit (ADR-0003 §Stage 7: generated-from-canon, never hand-held).
     Token data:  code/packages/tokens/src/**  (DTCG 2025.10 — the same source that compiles tokens.css)
     Prose:       code/packages/tokens/scripts/emit/layout-design-md.mjs
     Regenerate:  cd code && pnpm --filter @prime-dispatch/tokens build
     CI gate #8 "design (contract drift gate)" rebuilds this file and fails closed on any diff. -->

# PRIME DISpatch — the brand contract

> **Read this file before generating or editing any UI in this repo.** It is the agent-facing
> compilation of the ratified visual canon. It cannot drift from the shipped tokens because its
> token block is emitted from the same DTCG source that compiles \`tokens.css\`. Authority and
> depth live in \`representation/visual-system/\` (CD1–5) — **canon is the law; this file is the
> map.** Cold-start index: \`representation/visual-system/MANIFEST.yaml\`. Shape: Google Labs
> DESIGN.md spec frontmatter + house prose (ADR-0003 register §6, house-hybrid).

## Overview

DISpatch is an editorial scrollytelling microsite — the magazine of Prime, live at
dispatchmag.dev. Its visual thesis (thesis.md §1–§5) marries two registers that must never drown
each other: **NARRATIVE** (literary-civic-stately — NYT-Magazine/New-Yorker lineage, carried by
the Title + Body serifs) and **META** ("rip through the screen" old-Wired/hacker register —
carried by the component-locked monospace, expressed as beautifully composed boxes, never
effects). Beneath both sits the **cartographic substrate**: the subtle hero that lives underneath
the writing — forgettable while reading, present and alive when the reader looks up
(thesis.md §1, §4.4). Atmosphere is the paper the publication is printed on — felt, never
noticed; spectacle is not this register (thesis.md §2 Concept 4).

The visual product **is the JavaScript**: React + GSAP + Motion + Lenis over an Astro substrate
(\`.claude/CLAUDE.md\` §Project identity). The quality bar is principal-grade — Apple / Linear /
Stripe / NYT at their best, in DISpatch's register (thesis.md §1, §9).

## Colors

Hues live in four scope-locked tiers — **platform** (Prime-wide) → **dispatch**
(publication-locked) → **asset** (asset-locked) → component — each with its own provenance and
addition gate; references flow specific→canonical only (color.md §2.1 Decision 1, §2.4
Decision 3a). Values are OKLCH-native on the Tailwind v4 scale plus the low-chroma Vellum
atmospheric extension (chroma ≤ 0.06 — chrome is never vivid; color.md §2.2–§2.3 Decision 2).
Components consume semantic aliases via \`var(--token)\` only — never numeric tokens, never raw
OKLCH, never hex literals (color.md §2.4 Decision 3b; construction-rules.md Rule 4).

**Contrast discipline:** APCA Lc is the canonical metric (body ≥ 85, display ≥ 70, incidental
UI ≥ 55, wordmark ≥ 90 — color.md §3.3 Decision 4c); WCAG 2.1 ratios are the CI fallback
(axe-core). **Copper is size-scoped (F5, ADR-0003 register §10):** display-size copper
\`--platform-copper\` stays canon under the WCAG large-text 3:1 threshold; label/body-size copper
text and label-bearing fills use \`--platform-copper-label\` (4.66:1 on sky-low);
\`--platform-on-copper\` is the single on-fill text role; \`--dispatch-text-body-muted-deep\`
covers tinted panels. Per-node math is enforced in \`code/packages/tokens/__tests__/contrast.test.mjs\`,
which runs inside the tokens drift gate.

**The three lanes are semantic channels, applied as local accents — never page gradients, never
spatial bands, ONE OKLCH per lane** (color.md §4.1–§4.3 Decision 5; construction-rules.md
Rule 2):

| Lane | Token | Deploy for |
|---|---|---|
| dispatch | \`--dispatch-lane-dispatch-strong\` → \`--platform-accent-prime\` | wordmark DIS · dispatch-typed markers · focus rings on critical interactions |
| institutional | \`--dispatch-lane-institutional-strong\` (graphite-blue) | body prose · institutional content · cosmology-position markers |
| editorial | \`--dispatch-lane-editorial-strong\` (terracotta) | editorial-register content · writing-track markers |

Wine (\`--platform-accent-prime\`, Atlantic-pigment \`#8e2532\` — Decision 12a supersedes the old
red-600 approximation) is wordmark/dispatch-precious: **"wine became chrome wallpaper" is the
named failure mode** — every accent placement carries an inline CSS-comment justification
(construction-rules.md Rule 2). Nav wayfinding is copper (default \`--platform-copper\`, hover
\`--platform-copper-deep\`, active \`--platform-accent-prime-active\`, focus
\`--platform-accent-prime\` — color.md §10 Decision 12c). Atmospheric chrome (\`--sky-high\`,
\`--sky-low\`, \`--reflect\`, \`--window-warm\`) is never animated as a primary motion target
(color.md §4.5 Decision 6).

### Canonical dawn tokens (generated from the DTCG source)

${canonTable}

### W2 alias API (generated)

${aliasTable}

### Cycles — dawn / dusk / night

The 3-cycle substrate emits at bridge level via \`[data-prime-cycle="dusk|night"]\` selector
blocks on \`:root\`; dawn is the \`:root\` default. Components NEVER define their own theme
variants — they consume semantic tokens that resolve per active cycle; substrate-bound elements
transition 320ms ease-out (construction-rules.md Rule 5 — note CD5 §3.1 itself leaves the
crossfade duration W3-refinable, inclination 240–360ms; Rule 5's 320ms is the shipped bridge
truth). Cycle
canon-promotion to CD2 §2.5 is a deferred Mayor adjudication (MANIFEST.yaml
\`deferred-mayor-adjudication\`); the values below are the shipped bridge truth. "—" = not
overridden in that cycle block: the dawn declaration is a \`var()\` alias that re-resolves
against the cycle's values at runtime.

${cycleTable}

## Typography

Six slots — the ratified five-typeface system under **containment governance — containment IS
the cohesion mechanism; a typeface never escapes its scope** (thesis.md §2 Concept 1, §7
Decision 2) plus the composition-locked Wordmark slot (CD2 §5; typography/README.md
§Slot map): Title (display
serif, DISpatch-locked) · Body (reading serif, DISpatch-locked) · Nav (humanist sans,
Prime-platform-wide) · Code/Meta (monospace, **component-locked — never in chrome or article
prose**) · Civic/Dante (medieval-touched, asset-locked to cartography/signage — IM Fell English,
NOT Cinzel, tombstoned 2026-05-10) · Wordmark (composition-locked). The two premium slots
(Wordmark = Pangram Editorial New; Nav = Pangram Sans Extrabold 800) landed via the W2-S-F
token re-key; the OFL contract is \`representation/visual-system/typography/\` (README.md +
fonts.md — slot × family × weight × source × license, subsetting, preload budget).

### Universal type rules (apply everywhere)

1. **Wordmark \`DISpatch\` — \`DIS\` is always red.** Anywhere the literal word renders, split it:
   \`<span class="text-wordmark-dis font-bold">DIS</span><span class="text-wordmark-patch">patch</span>\`
   (add \`not-italic\` to both in italic prose — italics on the patch are tombstoned, Mayor
   2026-05-10). The patch half carries \`font-size: 1.08em\` optical balance (color.md §10
   Decision 12b). No exception.
2. **Smallest legible text is 12px** (WCAG/industry, May 2026); the old 9/10px caps are
   deprecated.
3. **Editorial type on the cartographic substrate uses letterpress** — \`.dispatch-emboss\`
   (light: caps/labels) or \`.dispatch-burnin\` (heavy: display 16px+); both pair \`text-shadow\`
   + \`mix-blend-mode: multiply\`. District typography renders in the burned-in street-sign
   register at whisper opacity, tracked-out caps (formula.md §5 Z-10).

### Slots (generated from the DTCG source)

${slotTable}

### Ratified weights (generated)

${weightTable}

## Layout

The grid is hierarchical-layered: the cartography occupies its own active grid layer (a dynamic
participant, not a background image), a simpler hierarchical site grid sits on top, and the two
marry at coordinate-handoff points; articles design around columns, never against freeform
borders (thesis.md §2 Concept 2, §7 Decision 3). **Components are primary — the cartography grid
dances and forms around page components**, and articles occupy park-like spaces with no
distracting cartographic features beneath them (cartography.md §2.6, Mayor verbatim). No ratified
spacing scale exists in canon (see Adjudicated questions, OQ-4 adjacency) — consult per-component specs.

### The cartographic substrate

Presence is a **dial** — intensity per surface at fixed zoom, not different cartographies:
homepage = Editorial District at LOW-MID dial (felt, not navigated) · article = magazine-corner
at MID dial (reading sanctuary) · atlas/sitemap = full opacity, the map IS the page
(cartography.md §2.6; formula.md §6). Districts surface via landmark hints, NOT polygon borders
(formula.md §13.2 supersedes the §3.2 boundary table). **No street view, ever** — top-down at
every zoom (cartography.md §2.6). Text over the substrate passes APCA Lc 60+ (body/labels) and
Lc 75+ under 14px, via letterpress (formula.md §1.2, §2.3). The substrate is **static at scroll
cadence** — only Inferno marker pulses and the DISpatch building dispatch-pulse animate, inside
\`prefers-reduced-motion: no-preference\` (formula.md §7.1–§7.2). The stroke system below is the
canon px source for the substrate (formula.md §3–§4; the stroke ratio is Mayor-KEPT pending
in-context iteration — formula.md §13.1 Q3 — not hard-ratified); it governs the substrate, never
component chrome. **Two boundary rows are superseded as written**: the §13.2 landmark-hints
amendment softens \`district-active\` to a whisper 1.0px @ 0.45 and REMOVES the
\`neighbor-forward\` dashed boundary in favor of landmark silhouettes — the table transcribes the
DTCG source; the §13 ledger is current truth.

### Stroke system (generated from the DTCG source)

${cartoTable}

## Components

The V1 inventory is **31 components**: 20 ratified in CD4 (components.md §3.1 — 8 article
surface, 2 openers, 2 cross-surface chrome, 4 reception, 3 utility, plus LiveRoom) and 11
multimedia extensions #21–31 (components-multimedia.md §2.1, with Mayor-locked tooling per
class). Every component follows the 7-field spec template — Structure / Variants / States /
Accessibility / Motion / Theme / Tokens — at
\`representation/visual-system/components/<Name>/spec.md\` (components.md §4). Specs cite tokens
**by reference only, never literal values** (Field 7 — the anti-"agents invent variants" rule).
Directory layers: \`/components/custom\` (Prime chrome) and \`/components/patterns\`
(compositions); \`/components/ui\` is intentionally empty — the register pulls past shadcn
defaults (components.md §9.9; MANIFEST.yaml \`implementation.components-code\`).

**The seven construction rules** (construction-rules.md — constitutional for every component
under \`code/packages/ui/src/components/\`; violation is non-conformant):

1. **Substrate-agnostic root** — components never set \`background-color\` on their root;
   substrate is page-owned. Contained slots use \`--surface-inset\`, never vellum, never the root.
2. **Lane-semantic accents** — the three lane pigments are semantically distinct, never
   interchangeable; every accent placement carries an inline justification comment.
3. **Distinct visual character per component** — justified against its CD4 spec, never the same
   archetype repeated (the wordmark is typographic-only; a rail is a rail, not a box).
4. **Canon-token consumption only** — \`var(--token)\` from \`@prime-dispatch/tokens/css\`; no
   hex, no inventions; the bridge is downstream of canon — amendments go through CD2 §10, never
   bridge edits.
5. **Cycles emit at bridge level** — \`[data-prime-cycle]\` cascade; components never author
   theme variants.
6. **When in doubt, less chrome** — default "no bg, no border" unless the structural role
   demands a boundary signal.
7. **Anti-pattern documentation inline** — every component CSS file opens with its own
   do-not-add list.

New components are **re-decided fresh** against CD1 thesis + CD2 tokens + CD3 cartography —
never migrated from the v3 sandbox (components.md §2, RE-DECIDE doctrine).

## Motion

The runtime stack is locked at four vertebrae: **Motion v12** (layout-position) · **GSAP**
(timeline-orchestrated) · **Lenis 1.2+** (scroll; shipped 1.3) · a custom **single-rAF
supervisor** — substituting any vertebra requires a Mayor-gated amendment (the master-plan §12
RES process, ledgered in motion.md §9; motion.md §1, §7 Decision 1). All animation subscribes to ONE \`requestAnimationFrame\` loop with
wake/sleep contracts; every animating component registers a motion-active handle and releases it
on completion so the compositor goes truly idle (motion.md §2 Layers 1–2). Ambient/mid-cadence
motion (paper drift, cartography flicker) uses deferred scheduling — \`setTimeout\` /
\`requestIdleCallback\`, never continuous rAF (motion.md §2 Layer 3).

**Animate \`transform\` + \`opacity\` only — never \`top\`/\`left\`/\`width\`/\`height\`/margins/padding**
(CLS-safe; motion.md §2 gates; \`.claude/CLAUDE.md\` §Animation stack). Atmospheric chrome is
**structurally excluded** from scroll-cadence animation — theme-cycle transitions and slow
ambient drift only (motion.md §4 STRUCTURAL LOCK). Reduced motion is a launch-non-negotiable
floor (WCAG 2.1 SC 2.3.3): under \`prefers-reduced-motion: reduce\`, every vector clamps to
static or an opacity-only crossfade at most the ratified cap below.

**Design durations, easings, amplitudes, springs, and Lenis parameters are deliberately
UNRATIFIED** — every CD5 §3 number marked "currently inclined toward" is a hypothesis, not
canon. **Do not invent or harden motion values**; author inside the locked envelope and flag for
W3 ratification (motion.md §1, §3, and its Reading-discipline muted-language law). What IS
ratified is below.

### Ratified motion gates (generated from the DTCG source)

${motionTable}

## Do's and Don'ts

**Do:**

- Read this file, then the relevant canon (\`MANIFEST.yaml\` reading recipes) before UI work.
- Consume tokens via \`var(--token)\` from \`@prime-dispatch/tokens\` — amend tokens only through
  the DTCG source + CD2 §10 ledger, then \`pnpm --filter @prime-dispatch/tokens build\`.
- Letterpress editorial type on the cartographic substrate; keep the substrate static at scroll.
- Give every animated component a reduced-motion fallback and a motion-active handle.
- Open every component CSS file with its anti-pattern comment block.

**Don't** (tombstoned inventions and structural exclusions — never re-propose;
construction-rules.md §Chiseled history, MANIFEST.yaml \`chiseled-history\`):

- Cinzel anywhere (Civic/Dante is IM Fell English) · italics on the wordmark patch · wine as
  chrome wallpaper (\`::before\` masthead bands, wine-gradient ReadingProgress fills) · middot
  nav separators · Roman-numeral chapter markers · per-theme hex variants per lane (ONE OKLCH
  per lane) · Light/Blueprint/Black cycle naming (Dawn/Dusk/Night is canon).
- Street-view cartography, literal cosmology labeling ("this is the Governance Pillar"), or
  substrate animation at scroll cadence.
- Layout-property animation, artificial rAF frame caps, continuous-rAF ambient motion.
- Hex/OKLCH literals in components, invented tokens, invented motion durations, invented
  variants beyond a component's spec.
- Placeholder media on launch-ready code (real assets live in
  \`code/apps/microsite-astro/public/\`).
- Runtime font CDNs — canon mandates self-hosted WOFF2: every family's mirror row is marked
  "static asset only" (Vollkorn's adds "NO runtime CDN" — fonts.md), procurement prefers
  official upstream over the Google Fonts CDN (typography/README.md, CD2 §5.3 sovereignty
  path). The live surface complies — every family self-hosts from \`/fonts/\` (OQ-2, executed
  at the fonts restoration build).

## Adjudicated questions — AK rulings (OQ-1–4) + open filings (OQ-7–8)

> These four contradictions were FILED at S2 (tokens README §F5; typography.json
> \`$description\`s), surfaced at S3 per ADR-0003 §Stage 7, and **RULED by AK on 2026-08-18**
> after a cited research pass (peer-publication production CSS · LG München I + Chrome cache
> partitioning · WCAG 2.2 + Material dark-theme guidance · DTCG 2025.10 +
> Material/Polaris/Spectrum/SLDS tier practice). All four are EXECUTED — OQ-3 and OQ-4 at the
> S5 pre-step, OQ-1 and OQ-2 at the fonts restoration build. This contract reports the shipped
> truth for each.

### OQ-1 · Body family — DECIDED (AK 2026-08-18): restore Crimson Pro — EXECUTED (fonts build)

Canon locks Body = **Crimson Pro** (typography/fonts.md §Body, LOCKED V1; CD2 §5.3 + §10
Decision 7c); the live app shipped \`--font-body: 'Inter', …\`. **Ruling:** restore the reading
serif — self-hosted Crimson Pro at the body slot; Inter stays at nav/UI where canon places it.
Evidence: all five register peers (NYT · New Yorker · Atlantic · Quanta · Stripe Press) ship
serif prose with sans confined to UI (production CSS fetched 2026-08-18); screen-readability
science is neutral, so register convention governs. **Executed at the fonts restoration
build:** \`--font-body\` re-keyed to \`'Crimson Pro', 'Iowan Old Style', Georgia, 'Times New
Roman', serif\` (the canon css/fonts.css chain); the five canon body cuts (400/400i/600/700/
700i) self-host from \`/fonts/body/\` with Regular preloaded as a first-paint critical weight.
The frontmatter above carries the shipped Crimson Pro stack.

### OQ-2 · Font delivery — DECIDED (AK 2026-08-18): execute self-hosting — EXECUTED (fonts build)

Canon mandates self-hosted WOFF2 (typography/fonts.md; typography/README.md
\`build/procure.sh\`, CD2 §5.3 sovereignty path); the live app loaded the OFL families from the
Google Fonts CDN at runtime. **Ruling:** execute the self-host wiring — static WOFF2 in
\`public/fonts/\` matching the shipped PP-premium pattern. Evidence: the LG München I (2022)
GDPR position stands; Chrome 86 cache partitioning removed the CDN's performance argument
while the render-blocking \`@import\` at \`global.css:1\` added two extra origins; CI is
hermetic-fontless. **Executed at the fonts restoration build:** the \`@import\` is gone; the 13
checksum-verified canon cuts (typography/subsets/, build/subset-checksums.txt) serve from
\`/fonts/<surface>/\` beside the PP premium rail, declared via canon-mirrored \`@font-face\`
(unicode-range + \`font-display: swap\`) with the canon critical-weight preloads (Body + Title
+ Nav + Wordmark) in the shared head. Zero runtime font origins remain.

### OQ-3 · Dusk/night faint ink — DECIDED (AK 2026-08-18): AA cycle variants — EXECUTED (S5)

\`--dispatch-text-body-faint\` measured **3.34:1 (dusk)** / **3.52:1 (night)** with live 12px
consumers — below the 4.5:1 AA normal-text threshold (WCAG 1.4.3; the 3:1 allowance starts at
~24px / ~18.5px bold). **Ruling:** raise the dusk/night faint values to ≥ 4.5:1 as
cycle-scoped variants — the mechanical mirror of executed F5 (register §10). Halation is
managed above AA, never below it (Material dark-theme emphasis tiers). Restricting faint to
large-text consumers was rejected: live consumers sit at 12px, so it forces the same consumer
edits while deleting a token role the light theme already proved. **Executed at S5 pre-step:**
C/H held, lightness lifted — dusk \`oklch(0.64 0.014 65)\` (4.62:1 worst-surface), night
\`oklch(0.59 0.005 80)\` (4.72:1 worst-surface); emphasis ordinal faint < muted < strong
preserved; per-node assertions joined \`contrast.test.mjs\` (the cycle table above is the
shipped truth).

### OQ-4 · Semantic slot names — DECIDED (AK 2026-08-18): ratify as provisionally-bound aliases — EXECUTED (S5)

The construction rules direct components at \`--surface-page\`/\`--surface-inset\`/\`--rail-edge\`
(construction-rules.md Rules 1 + 5); the W2 packages/ui census forward-declared \`--chrome-*\` +
\`--grid-line\` (\`src/color/ui-slots.json\`; live consumer Footnote.css \`var(--chrome-text)\`).
None carried values — consumers resolved to nothing. **Ruling:** ratify the semantic slots as
DTCG **aliases with provisional bindings** into the ratified vellum/chrome/ink palette — the
Material/Polaris/Spectrum/SLDS middle tier; DTCG 2025.10 makes unresolvable references a
MUST-error, so bare-name ratification is not a legitimate intermediate state. S5's consumer
census then amends bindings (a one-line re-point per alias — the tier's purpose). Scope rider:
\`--chrome-*\` stays a small named set; no per-component token tier until multi-brand pain
exists. **Executed at S5 pre-step** (CD2 §10 Decision 13): the ten slots ship in the W2 alias
table above; every binding is PROVISIONAL pending the S5 story census — re-point via
\`src/color/ui-slots.json\`, never a new value.

### OQ-7 · Who owns the build-time <Image> call — OPEN (filed S4, 2026-08-19)

CD7 §3.4 names Astro's \`<Image>\` as ImageWithCaption's in-stack image processor (build-time
AVIF/WebP negotiation) AND names \`/components/custom\` — a **React** package — as its
destination. The two cannot both hold: Astro's \`<Image>\` is a build-time Astro component and
cannot execute inside a React component. **Built under the assumption** that the React primitive
owns structure and typography and exposes a \`media\` slot, so an Astro surface can hand it a
build-optimized element; the shipped proving ground passes a plain \`<img>\`. **The question for
AK:** should an Astro-native \`Figure.astro\` wrapper own the \`<Image>\` call — which splits the
component across two packages and two idioms — or does the \`media\` slot stay the seam, leaving
articles responsible for passing an optimized element? Not decided here: it is an architecture
call about where the app/library boundary sits, and it governs every later CD7 image component
(#25 ImageGallery, #31 ComparisonSlider). Cost of deferring: figures render unoptimized source
assets until it lands.

### OQ-8 · Runtime C2PA read — OPEN (filed S4, 2026-08-19)

CD7 §3.4 specifies the DLDS provenance band as "reading C2PA metadata via \`@contentauth/c2pa\`
JS", tied to EU AI Act compliance dated 2026-08-02. **Built** with \`c2paAttached\` as a
**declared** flag — the shape DldsPanel already ratified (CD4 spec Field 2, variant
\`c2pa-attached\`) — so provenance is disclosed from authored data, not inferred. **The question
for AK:** does V1 add the \`@contentauth/c2pa\` runtime dependency to read content credentials
off the asset in-browser? That is a new client dependency on an editorial surface with a
Lighthouse budget ratchet, and its compliance value depends on assets actually carrying C2PA —
which today they do not. A build-time read (extract at publish, emit into frontmatter) is the
recorded alternative and keeps the client rail at zero. Not decided here: it is a dependency +
compliance call, not a visual one.

## Canon reading paths

| Need | Read, in order |
|---|---|
| Cold start | \`representation/visual-system/MANIFEST.yaml\` → this file |
| Implement a component | components.md → \`components/<Name>/spec.md\` → construction-rules.md → color.md §10 → typography/README.md → the tombstone record (MANIFEST \`agent-reading-recipes\`) |
| Amend a token | color.md §10 (Decisions pattern + SUPERSEDED-BY discipline) → \`code/packages/tokens/src/\` → \`pnpm --filter @prime-dispatch/tokens build\` |
| Motion work | motion.md §1–§2 (stack lock + single-rAF discipline) → §3 per-component entries → §9 amendment ledger |
| Cartography work | cartography.md §2.6 + §6–§7 → cartography-concepts/concept-01/formula.md (the FORMULA + §13 amendments) |
| The decisions behind this file | docs/adr/0003-vertical-design-stack-architecture.md (§Stage 7 + register §6/§10) |
`;
}
