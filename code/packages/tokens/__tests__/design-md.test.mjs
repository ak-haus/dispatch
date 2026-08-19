/**
 * S3 brand-contract conformance — structural asserts on the BUILT repo-root
 * DESIGN.md (ADR-0003 §Stage 7), so a layout edit that breaks the contract's
 * shape fails CI (the drift gate runs this suite; gate #8 catches byte drift).
 *
 * Scope: spec-shaped frontmatter (Google Labs DESIGN.md — YAML fences, colors/
 * typography maps, resolvable {colors.*} references, no leaked var() syntax),
 * generated-file banner, the read-before-generate directive, and the four
 * S2-filed open questions surfaced-not-decided.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(pkgRoot, '../../..');
const doc = readFileSync(join(repoRoot, 'DESIGN.md'), 'utf8');

const fmMatch = doc.match(/^---\n([\s\S]*?)\n---\n/);

test('frontmatter exists and is fenced', () => {
  assert.ok(fmMatch, 'DESIGN.md must open with a --- YAML frontmatter fence');
});

const fm = fmMatch ? fmMatch[1] : '';
const body = doc.slice(fmMatch ? fmMatch[0].length : 0);

test('frontmatter carries the spec-required maps', () => {
  for (const key of ['version:', 'name:', 'description:', 'colors:', 'typography:']) {
    assert.ok(fm.includes(key), `frontmatter missing ${key}`);
  }
});

test('frontmatter never leaks CSS var() syntax — aliases are spec references', () => {
  assert.ok(!fm.includes('var(--'), 'frontmatter must use {colors.*} references, not var()');
});

test('every {colors.*} reference resolves to a declared color key', () => {
  const declared = new Set(
    [...fm.matchAll(/^ {2}([a-z0-9-]+): /gm)].map((m) => m[1]),
  );
  const refs = [...fm.matchAll(/\{colors\.([a-z0-9-]+)\}/g)].map((m) => m[1]);
  assert.ok(refs.length > 0, 'expected alias references in the colors map');
  for (const ref of refs) {
    assert.ok(declared.has(ref), `{colors.${ref}} does not resolve to a declared key`);
  }
});

test('the shipped dawn token surface is present in the frontmatter', () => {
  const css = readFileSync(join(pkgRoot, 'dist/tokens.css'), 'utf8');
  const rootBlock = css.match(/:root \{[\s\S]*?\n\}/)[0];
  const colorProps = [...rootBlock.matchAll(/^ {2}--([a-z0-9-]+):/gm)]
    .map((m) => m[1])
    .filter((name) => !name.startsWith('font-'));
  assert.ok(colorProps.length >= 40, `expected the full dawn color surface, saw ${colorProps.length}`);
  for (const name of colorProps) {
    assert.ok(
      new RegExp(`^ {2}${name}: `, 'm').test(fm),
      `dawn token --${name} ships in tokens.css but is absent from the DESIGN.md frontmatter`,
    );
  }
});

test('generated-file banner and regenerate command are present', () => {
  assert.ok(body.includes('GENERATED FILE — do not hand-edit'), 'banner missing');
  assert.ok(body.includes('pnpm --filter @prime-dispatch/tokens build'), 'regenerate command missing');
});

test('the read-before-generate directive leads the document', () => {
  assert.ok(
    body.includes('Read this file before generating or editing any UI'),
    'the ADR-0003 §Stage 7 read-before-generate directive is missing',
  );
});

test('the four S2-filed questions carry the AK rulings of 2026-08-18', () => {
  assert.ok(body.includes('## Adjudicated questions'), 'adjudicated-questions section missing');
  for (const oq of ['### OQ-1', '### OQ-2', '### OQ-3', '### OQ-4']) {
    assert.ok(body.includes(oq), `${oq} missing`);
  }
  const rulings = body.match(/DECIDED \(AK 2026-08-18\)/g) ?? [];
  assert.equal(rulings.length, 4, `expected 4 rulings, saw ${rulings.length}`);
});

test('spec sections appear in the Google Labs canonical order', () => {
  const order = ['## Overview', '## Colors', '## Typography', '## Layout', '## Components', "## Do's and Don'ts"];
  let last = -1;
  for (const heading of order) {
    const idx = body.indexOf(heading);
    assert.ok(idx !== -1, `${heading} missing`);
    assert.ok(idx > last, `${heading} out of spec order`);
    last = idx;
  }
});
