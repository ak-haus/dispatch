/**
 * S4 lane guard — every canon slot a component stylesheet reaches for must
 * exist at :root in the SHIPPED tokens.css.
 *
 * Why this test exists (the defect it was written against, 2026-08-19): the
 * engine withheld the six theme:true font slots from tokens.css because they
 * also compile into tokens.theme.css's @theme inline block. That is correct
 * for Tailwind consumers and wrong for everyone else — construction Rule 4
 * makes var(--token) the ONLY sanctioned way for packages/ui component CSS to
 * consume canon, and Footnote.css, DldsPanel.css and ChapterRail.css already
 * consumed var(--font-body) / var(--font-nav). On any surface without a
 * Tailwind compile those resolved to nothing and the browser substituted a
 * fallback family. Storybook is exactly that surface — so the S1 story lane
 * was snapshotting faces the product never ships, the same class of defect
 * visual.spec.ts's expectShippedFaces assertion exists to prevent on the
 * astro side.
 *
 * The assertion is the general rule, not the specific repair: scan every
 * stylesheet under packages/ui for var(--…) references and require each one
 * to be declared in tokens.css. It therefore also catches a component
 * reaching for a colour or spacing token that no longer exists.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const uiSrc = join(pkgRoot, '../ui/src');
const tokensCss = readFileSync(join(pkgRoot, 'dist/tokens.css'), 'utf8');

/** Custom properties DECLARED anywhere in the shipped tokens.css. */
const declared = new Set(
  [...tokensCss.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((m) => m[1]),
);

/** Properties a component may define for itself — local, not canon lookups. */
function locallyDeclared(css) {
  return new Set([...css.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((m) => m[1]));
}

function stylesheets(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...stylesheets(full));
    else if (name.endsWith('.css')) out.push(full);
  }
  return out;
}

const sheets = stylesheets(uiSrc);

test('the component layer has stylesheets to govern', () => {
  assert.ok(sheets.length > 0, 'expected at least one .css under packages/ui/src');
});

test('every var(--token) a component stylesheet consumes is declared in tokens.css', () => {
  const missing = [];
  for (const sheet of sheets) {
    const css = readFileSync(sheet, 'utf8');
    const own = locallyDeclared(css);
    for (const m of css.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)) {
      const name = m[1];
      if (own.has(name) || declared.has(name)) continue;
      missing.push(`${relative(pkgRoot, sheet)} → var(${name})`);
    }
  }
  assert.deepEqual(
    [...new Set(missing)],
    [],
    'component stylesheets reference tokens that tokens.css never declares — they resolve to nothing wherever Tailwind is absent (Storybook), so the story lane captures fallback rendering',
  );
});

test('all eight canon typography slots reach the plain-CSS layer', () => {
  for (const slot of [
    '--font-wordmark',
    '--font-nav',
    '--font-narrative',
    '--font-body',
    '--font-mono',
    '--font-civic',
    '--font-title',
    '--font-code',
  ]) {
    assert.ok(declared.has(slot), `tokens.css must declare ${slot} at :root`);
  }
});
