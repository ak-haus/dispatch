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
];

for (const c of cases) {
  test(`${c.cycle}: --${c.fg} on ${c.bgLiteral ?? `--${c.bg}`} ≥ ${c.min}:1 — ${c.node}`, () => {
    const fg = resolve(c.cycle, c.fg);
    const bg = c.bgLiteral ?? resolve(c.cycle, c.bg);
    const ratio = wcag(fg, bg);
    assert.ok(ratio >= c.min, `${fg} on ${bg} = ${ratio.toFixed(2)}:1 < ${c.min}:1`);
  });
}

// Documented, deliberate NON-assertions (pre-existing canon, filed at S2 for
// the D1 gate — asserting them would falsely brand S2 as having decided them):
// dusk/night --dispatch-text-body-faint sits at 3.34:1 / 3.52:1 on cycle
// vellum-25 (below AA for its 12px consumers); dawn display copper on
// vellum-300 is 2.56:1 (no display-copper-on-window-warm node exists today).
test('faint cycle deficiency stays FILED, not silently fixed', () => {
  const dusk = wcag(resolve('dusk', 'dispatch-text-body-faint'), resolve('dusk', 'dispatch-vellum-25'));
  const night = wcag(resolve('night', 'dispatch-text-body-faint'), resolve('night', 'dispatch-vellum-25'));
  // If a future canon decision lifts these past 4.5, delete this guard and
  // assert AA above instead.
  assert.ok(dusk >= 3 && night >= 3, 'cycle faint fell below even 3:1 — canon regression');
});
