/**
 * F5 conformance — the per-node WCAG 2.x math behind the size-scoped split
 * (ADR-0003 register §10), asserted against the BUILT token values so a source
 * edit that breaks a ratio fails CI (the drift gate runs this suite).
 *
 * Scope: WCAG 1.4.3 AA = 4.5:1 below the large-text threshold, 3:1 at/above
 * it; 1.4.11 non-text = 3:1. Node inventory provenance: dispatch-archive PR #8
 * + the live axe re-measurement of 2026-08-18 (S2 session).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Color from 'colorjs.io';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(pkgRoot, 'dist/tokens.css'), 'utf8');

/** Pull a custom property's raw value out of a selector block; follow one
 * level of var() indirection within the same block chain (dawn falls back
 * to :root). */
function raw(block, name) {
  const m = block.match(new RegExp(`--${name}:\\s*([^;]+);`));
  return m?.[1].trim();
}
function blockFor(cycle) {
  if (cycle === 'dawn') return css.match(/:root \{[\s\S]*?\n\}/)[0];
  if (cycle === 'dusk') return css.match(/\[data-prime-cycle="dusk"\] \{[\s\S]*?\n\}/)[0];
  return css.match(/\.dark,\n\[data-prime-cycle="night"\] \{[\s\S]*?\n\}/)[0];
}
function resolve(cycle, name) {
  const chain = cycle === 'dawn' ? [blockFor('dawn')] : [blockFor(cycle), blockFor('dawn')];
  let value;
  for (const block of chain) {
    value = raw(block, name);
    if (value) break;
  }
  assert.ok(value, `token --${name} missing for ${cycle}`);
  let hops = 0;
  while (value.startsWith('var(')) {
    assert.ok(++hops < 5, `alias loop at --${name}`);
    const target = value.match(/var\(--([a-z0-9-]+)\)/i)[1];
    for (const block of chain) {
      const next = raw(block, target);
      if (next) { value = next; break; }
    }
  }
  return value;
}
const wcag = (fg, bg) => new Color(bg).contrast(new Color(fg), 'WCAG21');

const cases = [
  // ---- dawn: the four flagged families + the wheat panel ----
  { cycle: 'dawn', fg: 'platform-copper-label', bg: 'dispatch-vellum-100', min: 4.5, node: 'nav links 13px/800, wire+home 12px copper labels, article CTA 13px (SC 1.4.3 small)' },
  { cycle: 'dawn', fg: 'platform-copper-label', bg: 'dispatch-vellum-25', min: 4.5, node: 'copper labels over sky-high washes' },
  { cycle: 'dawn', fg: 'platform-on-copper', bg: 'platform-copper-label', min: 4.5, node: '/wire filter pill text 12px on copper-label fill' },
  { cycle: 'dawn', fg: 'dispatch-vellum-100', bg: 'platform-copper-label', min: 4.5, node: 'CTA hover: sky-low text on copper-label fill (BackToDispatch, ArticleSpread)' },
  { cycle: 'dawn', fg: 'dispatch-text-body-muted', bg: 'dispatch-vellum-100', min: 4.5, node: 'wire excerpts 13px, meta rows 12px, StackLayout kicker/description' },
  { cycle: 'dawn', fg: 'dispatch-text-body-faint', bg: 'dispatch-vellum-100', min: 4.5, node: 'separators, end-line, footer 12px' },
  { cycle: 'dawn', fg: 'platform-copper', bg: 'dispatch-vellum-100', min: 3, node: 'DISPLAY copper (canon, register §10: large-text 3:1 floor) + icon affordances (SC 1.4.11)' },
  { cycle: 'dawn', fg: 'platform-copper-deep', bg: 'dispatch-vellum-100', min: 4.5, node: 'nav hover state (deepening survives the split)' },
  { cycle: 'dawn', fg: 'platform-accent-prime-active', bg: 'dispatch-vellum-100', min: 4.5, node: 'nav active state' },
  { cycle: 'dawn', fg: 'platform-text-body-strong', bg: 'dispatch-vellum-100', min: 4.5, node: 'body ink' },
  // wheat band: color-mix(copper 80%, sky-low 20%) is not var-resolvable here — the
  // measured surface #e1d0b8 (axe, 2026-08-18) is asserted literally.
  { cycle: 'dawn', fg: 'dispatch-text-body-muted-deep', bgLiteral: '#e1d0b8', min: 4.5, node: 'article-hero wheat band meta 12px (DispatchArticleLayout)' },
  { cycle: 'dawn', fg: 'dispatch-text-body-muted-deep', bg: 'dispatch-vellum-100', min: 4.5, node: 'muted-deep must also hold on plain vellum' },

  // ---- dusk: F5 variants alias cycle canon — prove the aliases hold AA ----
  { cycle: 'dusk', fg: 'platform-copper-label', bg: 'dispatch-vellum-25', min: 4.5, node: 'dusk copper labels (alias → cycle copper)' },
  { cycle: 'dusk', fg: 'dispatch-text-body-muted', bg: 'dispatch-vellum-25', min: 4.5, node: 'dusk muted ink' },
  { cycle: 'dusk', fg: 'dispatch-text-body-muted-deep', bg: 'dispatch-vellum-25', min: 4.5, node: 'dusk muted-deep (alias → cycle muted)' },
  { cycle: 'dusk', fg: 'platform-on-copper', bg: 'platform-copper-label', min: 4.5, node: 'dusk pill: vellum-25 ink on gilded fill' },

  // ---- night ----
  { cycle: 'night', fg: 'platform-copper-label', bg: 'dispatch-vellum-25', min: 4.5, node: 'night copper labels (alias → cycle copper)' },
  { cycle: 'night', fg: 'dispatch-text-body-muted', bg: 'dispatch-vellum-25', min: 4.5, node: 'night muted ink' },
  { cycle: 'night', fg: 'dispatch-text-body-muted-deep', bg: 'dispatch-vellum-25', min: 4.5, node: 'night muted-deep (alias → cycle muted)' },
  { cycle: 'night', fg: 'platform-on-copper', bg: 'platform-copper-label', min: 4.5, node: 'night pill: void ink on gilded fill' },

  // ---- OQ-3 (AK 2026-08-18, executed S5): faint AA cycle variants — the
  // mechanical mirror of F5. Worst surface is cycle vellum-25 (the lightest
  // dark-cycle plane); -50/-100 asserted so a substrate re-bind can't regress.
  { cycle: 'dusk', fg: 'dispatch-text-body-faint', bg: 'dispatch-vellum-25', min: 4.5, node: 'dusk faint 12px consumers (separators, end-line, footer) — OQ-3' },
  { cycle: 'dusk', fg: 'dispatch-text-body-faint', bg: 'dispatch-vellum-50', min: 4.5, node: 'dusk faint on surface-inset (vellum-50 provisional binding) — OQ-3' },
  { cycle: 'dusk', fg: 'dispatch-text-body-faint', bg: 'dispatch-vellum-100', min: 4.5, node: 'dusk faint on the page substrate — OQ-3' },
  { cycle: 'night', fg: 'dispatch-text-body-faint', bg: 'dispatch-vellum-25', min: 4.5, node: 'night faint 12px consumers — OQ-3' },
  { cycle: 'night', fg: 'dispatch-text-body-faint', bg: 'dispatch-vellum-50', min: 4.5, node: 'night faint on surface-inset (vellum-50 provisional binding) — OQ-3' },
  { cycle: 'night', fg: 'dispatch-text-body-faint', bg: 'dispatch-vellum-100', min: 4.5, node: 'night faint on the page substrate — OQ-3' },

  // ---- OQ-4 (AK 2026-08-18, executed S5): the chrome-text slot is the one
  // semantic slot bound to a TEXT role (label-size, Footnote back-link 12px) —
  // prove the provisional binding holds AA on the surfaces it can sit on, in
  // every cycle. The other slots are surfaces/hairlines: rail-edge/chrome-
  // border/grid-line are decorative separators (SC 1.4.11 does not bind
  // decorative hairlines) — deliberately NOT asserted; the S5 census watches
  // the two ornament-glyph color: consumers instead.
  { cycle: 'dawn', fg: 'chrome-text', bg: 'surface-page', min: 4.5, node: 'chrome-text on surface-page (slot chain → copper-label on vellum-100) — OQ-4' },
  { cycle: 'dawn', fg: 'chrome-text', bg: 'surface-inset', min: 4.5, node: 'chrome-text on surface-inset (vellum-50) — OQ-4' },
  { cycle: 'dusk', fg: 'chrome-text', bg: 'surface-page', min: 4.5, node: 'dusk chrome-text on surface-page — OQ-4' },
  { cycle: 'dusk', fg: 'chrome-text', bg: 'surface-inset', min: 4.5, node: 'dusk chrome-text on surface-inset — OQ-4' },
  { cycle: 'night', fg: 'chrome-text', bg: 'surface-page', min: 4.5, node: 'night chrome-text on surface-page — OQ-4' },
  { cycle: 'night', fg: 'chrome-text', bg: 'surface-inset', min: 4.5, node: 'night chrome-text on surface-inset — OQ-4' },

  // ---- B16 (AK 2026-08-31): the SearchPalette meta-ink pair — the palette's
  // small-print register on the window-warm card, where the body inks fall
  // below AA (muted 4.41, faint 4.03; story-rail axe, 2026-08-31). The card's
  // tinted surfaces are color-mix recipes not var-resolvable here — the
  // axe-measured surfaces are asserted literally (wheat-band precedent).
  { cycle: 'dawn', fg: 'dispatch-text-meta', bg: 'window-warm', min: 4.5, node: 'palette snippet 13px / type badge 10px / hint body / close chip on the card — B16' },
  { cycle: 'dawn', fg: 'dispatch-text-meta', bgLiteral: '#d4cbb6', min: 4.5, node: 'palette meta ink on the selected-row tint (institutional 6% over the card) — B16' },
  { cycle: 'dawn', fg: 'dispatch-text-meta', bgLiteral: '#d0b4a2', min: 4.5, node: 'palette snippet inside the <mark> highlight (accent-prime 18% over the card) — B16' },
  { cycle: 'dawn', fg: 'dispatch-text-meta', bgLiteral: '#d1c8b4', min: 4.5, node: 'palette hint code chip (institutional 8% over the card) — B16' },
  { cycle: 'dawn', fg: 'dispatch-text-meta-faint', bg: 'window-warm', min: 4.5, node: 'palette match kicker + footer keyboard hints 11px on the card — B16' },
  { cycle: 'dawn', fg: 'dispatch-text-meta-faint', bgLiteral: '#d4cbb6', min: 4.5, node: 'palette kicker inside the selected row — B16' },
  { cycle: 'dusk', fg: 'dispatch-text-meta', bg: 'window-warm', min: 4.5, node: 'dusk palette meta (alias → cycle muted) on the dusk card — B16' },
  { cycle: 'dusk', fg: 'dispatch-text-meta-faint', bg: 'window-warm', min: 4.5, node: 'dusk palette meta-faint (alias → cycle faint) — B16' },
  { cycle: 'night', fg: 'dispatch-text-meta', bg: 'window-warm', min: 4.5, node: 'night palette meta (alias → cycle muted) on the void card — B16' },
  { cycle: 'night', fg: 'dispatch-text-meta-faint', bg: 'window-warm', min: 4.5, node: 'night palette meta-faint (alias → cycle faint) — B16' },

  // ---- F53 (AK 2026-09-20): the editorial lane's label role. The canon lane
  // pigment is a DISPLAY token; carried as text below the large-text threshold
  // it read 4.25:1 on the /article card and 4.02:1 on the /sitemap focused-zone
  // tint (axe, against the locally-served production build). The role-scoped
  // sibling holds hue 41 and chroma 0.16 and grades lightness 0.55 → 0.52 —
  // the first rung clearing AA on BOTH (0.53 gives 4.66 and 4.41). The card
  // and tint surfaces are color-mix recipes not var-resolvable here, so the
  // axe-measured grounds are asserted literally (the B16 wheat-band precedent).
  { cycle: 'dawn', fg: 'dispatch-lane-editorial-label', bgLiteral: '#efe8da', min: 4.5, node: 'article card kicker 12px/700 + Read affordance 12px/800 on the card ground — F53' },
  { cycle: 'dawn', fg: 'dispatch-lane-editorial-label', bgLiteral: '#f0e0d2', min: 4.5, node: 'atlas index zone name 15px/700 on the focused-zone tint (editorial 10% over sky-low) — F53' },
  { cycle: 'dawn', fg: 'dispatch-lane-editorial-label', bg: 'dispatch-vellum-100', min: 4.5, node: 'editorial lane label on the untinted page ground — F53' },
  // Dark cycles: the label sibling equals the cycle display pigment BY
  // MEASUREMENT — dusk reads 5.68:1 and night 7.22:1 on their own grounds, so
  // no grade is owed. Asserted so a future cycle edit cannot silently drop
  // either below AA. (The dark-cycle wine failures are T4/OQ-6b's, not this.)
  { cycle: 'dusk', fg: 'dispatch-lane-editorial-label', bg: 'dispatch-vellum-100', min: 4.5, node: 'dusk editorial lane label on the walnut ground — F53' },
  { cycle: 'night', fg: 'dispatch-lane-editorial-label', bg: 'dispatch-vellum-100', min: 4.5, node: 'night editorial lane label on the void ground — F53' },
];

for (const c of cases) {
  test(`${c.cycle}: --${c.fg} on ${c.bgLiteral ?? `--${c.bg}`} ≥ ${c.min}:1 — ${c.node}`, () => {
    const fg = resolve(c.cycle, c.fg);
    const bg = c.bgLiteral ?? resolve(c.cycle, c.bg);
    const ratio = wcag(fg, bg);
    assert.ok(ratio >= c.min, `${fg} on ${bg} = ${ratio.toFixed(2)}:1 < ${c.min}:1`);
  });
}

// Documented, deliberate NON-assertion (F53, measured 2026-09-20): the atlas
// index zone name in its focused CIVIC state. Canon copper reads 3.03:1 on that
// tint (#f0e4d5 = copper 10% over sky-low); the index now binds the F5
// --platform-copper-label instead, which lifts it to 4.19:1 — better, and still
// short of AA. F5 graded copper-label against the UNTINTED substrate, where it
// clears at 4.66:1 (asserted above); nobody had measured it against a copper
// tint. Not asserted here because it does not yet pass, and not fixed here
// because a tint-grade copper rung is the F5 register, not the editorial lane.
// Unreachable by the suite regardless: the atlas focuses 'editorial' by
// default and only hover moves it. Filed as F68.
//
// Documented, deliberate NON-assertion (pre-existing canon): dawn display
// copper on vellum-300 is 2.56:1 (no display-copper-on-window-warm node exists
// today). The former dusk/night faint FILED-guard is gone — OQ-3 (AK
// 2026-08-18) executed the AA cycle variants; the assertions above are now
// the law.

// OQ-3 emphasis ordinal: the faint lift must never invert the dark-cycle
// emphasis ladder (faint < muted < strong in lightness terms = faint contrast
// stays below muted contrast on the same surface). Material dark-theme
// tiering: halation is managed above AA via the ordinal, not by dropping AA.
for (const cycle of ['dusk', 'night']) {
  test(`${cycle}: faint stays below muted in the emphasis ladder`, () => {
    const bg = resolve(cycle, 'dispatch-vellum-25');
    const faint = wcag(resolve(cycle, 'dispatch-text-body-faint'), bg);
    const muted = wcag(resolve(cycle, 'dispatch-text-body-muted'), bg);
    assert.ok(faint < muted, `faint (${faint.toFixed(2)}) must sit below muted (${muted.toFixed(2)})`);
  });
}
