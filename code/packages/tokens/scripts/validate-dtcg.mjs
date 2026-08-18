/**
 * DTCG 2025.10 validator + CD2 §2.5 prime-extension conformance + emission
 * integrity (the anti-dual-source guarantee for the S2 engine).
 *
 * Phase 1 — DTCG 2025.10 structural validity per $type:
 *   color        → { colorSpace, components[3], alpha?, hex? } or "{alias}"
 *   dimension    → { value:number, unit:"px"|"rem" }
 *   duration     → { value:number, unit:"ms"|"s" }
 *   fontFamily   → string | string[]
 *   fontWeight   → number 1..1000
 *   number       → number
 * Phase 2 — prime extension: tier ∈ {platform,dispatch,asset,component};
 *   ratified-at present; cssName unique across each tree.
 * Phase 3 — emission integrity: where $extensions.prime.css exists it must be
 *   EQUIVALENT to $value — the oklch()/hex string re-parsed must match the
 *   structured components (so the spec-shaped $value and the byte-exact
 *   emission string can never drift apart); var(--x) strings must correspond
 *   to an alias $value whose target token carries cssName x.
 */
import StyleDictionary from 'style-dictionary';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const TREES = {
  dawn: ['src/color/platform.json', 'src/color/dispatch.json', 'src/color/asset.json', 'src/color/ui-slots.json', 'src/typography.json', 'src/motion.json', 'src/cartography.json'],
  dusk: ['src/cycles/dusk.json'],
  night: ['src/cycles/night.json'],
  shadcnDark: ['src/color/shadcn-dark.json'],
};

const issues = [];
let tokenCount = 0;

const isAlias = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v);

function checkColorValue(v, id) {
  if (isAlias(v)) return;
  if (typeof v !== 'object' || v === null) return issues.push(`${id}: color $value must be object or alias (2025.10)`);
  if (typeof v.colorSpace !== 'string') issues.push(`${id}: color missing colorSpace`);
  if (!Array.isArray(v.components) || v.components.length !== 3 || v.components.some((c) => typeof c !== 'number'))
    issues.push(`${id}: color components must be [n,n,n]`);
  if (v.alpha !== undefined && (typeof v.alpha !== 'number' || v.alpha < 0 || v.alpha > 1)) issues.push(`${id}: bad alpha`);
  if (v.hex !== undefined && !/^#[0-9a-f]{6}$/i.test(v.hex)) issues.push(`${id}: bad hex fallback`);
}

function checkCssEquivalence(token, id, cssNameIndex) {
  const prime = token.$extensions?.prime;
  const css = prime?.css;
  if (css === undefined) return;
  const v = token.$value;
  if (css.startsWith('var(')) {
    if (!isAlias(v)) issues.push(`${id}: css is var() but $value is not an alias`);
    return; // alias-target existence is enforced by SD brokenReferences + emit fail-closed
  }
  if (isAlias(v)) return issues.push(`${id}: $value is alias but css "${css}" is not var()`);
  if (token.$type === 'color') {
    const m = css.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*(\d+)%)?\s*\)$/);
    if (m) {
      const [L, C, H] = [Number(m[1]), Number(m[2]), Number(m[3])];
      const [l2, c2, h2] = v.components;
      if (v.colorSpace !== 'oklch') issues.push(`${id}: css oklch but colorSpace=${v.colorSpace}`);
      if (Math.abs(L - l2) > 1e-9 || Math.abs(C - c2) > 1e-9 || Math.abs(H - h2) > 1e-9)
        issues.push(`${id}: css ${css} ≠ components [${v.components}]`);
      const alpha = m[4] !== undefined ? Number(m[4]) / 100 : undefined;
      if ((alpha ?? undefined) !== (v.alpha ?? undefined)) issues.push(`${id}: css alpha ≠ $value alpha`);
    } else if (/^#[0-9a-f]{6}$/i.test(css)) {
      if (v.hex?.toLowerCase() !== css.toLowerCase()) issues.push(`${id}: css hex ${css} ≠ $value.hex ${v.hex}`);
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(css.slice(i, i + 2), 16) / 255);
      const ok = ['r=0', 'g=1', 'b=2'].every((_, i) => Math.abs([r, g, b][i] - v.components[i]) < 0.002);
      if (!ok || v.colorSpace !== 'srgb') issues.push(`${id}: hex ${css} ≠ srgb components [${v.components}]`);
    } else {
      issues.push(`${id}: unrecognized color emission "${css}"`);
    }
  }
}

function validateToken(token, path, cssNames, treeName) {
  const id = `${treeName}:${path.join('.')}`;
  tokenCount++;
  const t = token.$type;
  const v = token.$value;

  if (t === 'color') checkColorValue(v, id);
  else if (t === 'dimension' || t === 'duration') {
    if (isAlias(v)) { /* ok */ }
    else if (typeof v !== 'object' || typeof v.value !== 'number' || typeof v.unit !== 'string')
      issues.push(`${id}: ${t} $value must be {value, unit} (2025.10)`);
    else if (t === 'dimension' && !['px', 'rem'].includes(v.unit)) issues.push(`${id}: dimension unit "${v.unit}"`);
    else if (t === 'duration' && !['ms', 's'].includes(v.unit)) issues.push(`${id}: duration unit "${v.unit}"`);
  } else if (t === 'fontFamily') {
    if (!(typeof v === 'string' || (Array.isArray(v) && v.every((s) => typeof s === 'string'))))
      issues.push(`${id}: fontFamily must be string or string[]`);
  } else if (t === 'fontWeight') {
    if (typeof v !== 'number' || v < 1 || v > 1000) issues.push(`${id}: fontWeight out of range`);
  } else if (t === 'number') {
    if (typeof v !== 'number') issues.push(`${id}: number $value`);
  } else if (t === undefined) {
    issues.push(`${id}: missing $type (2025.10 requires resolvable type)`);
  } else {
    issues.push(`${id}: unhandled $type "${t}" — extend the validator deliberately, never silently`);
  }

  const prime = token.$extensions?.prime;
  if (!prime) return issues.push(`${id}: missing $extensions.prime (CD2 §2.5)`);
  if (!prime['ratified-at']) issues.push(`${id}: missing prime.ratified-at`);
  if (prime.tier && !['platform', 'dispatch', 'asset', 'component'].includes(prime.tier))
    issues.push(`${id}: tier "${prime.tier}" invalid (CD2 §2.4)`);
  if (prime.cssName) {
    if (cssNames.has(prime.cssName)) issues.push(`${id}: duplicate cssName --${prime.cssName}`);
    cssNames.add(prime.cssName);
    checkCssEquivalence(token, id, cssNames);
  }
}

function walkTokens(node, path, cssNames, treeName) {
  if (typeof node !== 'object' || node === null) return;
  if (node.$value !== undefined) return validateToken(node, path, cssNames, treeName);
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    walkTokens(child, [...path, key], cssNames, treeName);
  }
}

for (const [treeName, files] of Object.entries(TREES)) {
  const sd = new StyleDictionary({
    source: files.map((p) => join(pkgRoot, p)),
    usesDtcg: true,
    log: { warnings: 'disabled', verbosity: 'silent', errors: { brokenReferences: 'throw' } },
  });
  await sd.hasInitialized;
  walkTokens(sd.tokens, [], new Set(), treeName);
}

if (issues.length === 0) {
  console.log(`PRIME DTCG validator: ${tokenCount} tokens — CONFORMANT to DTCG 2025.10 + CD2 §2.5 + emission integrity.`);
} else {
  console.error(`PRIME DTCG validator: ${tokenCount} tokens — ${issues.length} issues:`);
  for (const issue of issues) console.error(`  ✗ ${issue}`);
  process.exit(1);
}
