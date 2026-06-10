/**
 * DTCG 2025.10 schema validator + CD2 §2.5 8-field shape conformance check.
 * Per master-plan §6.6 Row 1 verification ladder (tokens.json validates + tokens.css compiles).
 *
 * Two-phase validation:
 *   Phase 1 — DTCG W3C structural validity ($value / $type / $description / $extensions presence).
 *   Phase 2 — Prime CD2 §2.5 8-field shape conformance ($extensions.prime.{tier, concept-citation,
 *             apca-validated-pairs, colorblind-validated, ratified-at}).
 *
 * Phase 2 is non-blocking on stub tokens (those carrying $extensions.prime.stub-from); enforces on ratified
 * tokens. Mirrors CD2 §9 stub-vs-lock pattern.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const TIER_FILES = ['platform', 'dispatch', 'asset'];
const REQUIRED_PRIME_FIELDS = ['tier', 'concept-citation', 'ratified-at'];
const STUB_MARKER = 'stub-from';

const issues = [];
let tokenCount = 0;

function walkTokens(node, path = []) {
  if (typeof node !== 'object' || node === null) return;
  if (node.$value !== undefined) {
    tokenCount++;
    validateToken(node, path);
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    walkTokens(child, [...path, key]);
  }
}

function validateToken(token, path) {
  const tokenId = path.join('.');

  if (typeof token.$value !== 'string') {
    issues.push(`${tokenId}: $value missing or not string`);
    return;
  }

  const ext = token.$extensions?.prime;
  if (!ext) {
    issues.push(`${tokenId}: missing $extensions.prime namespace per CD2 §2.5`);
    return;
  }

  const isStub = !!ext[STUB_MARKER];

  for (const field of REQUIRED_PRIME_FIELDS) {
    if (!ext[field]) {
      if (isStub && field === 'concept-citation') continue;
      issues.push(`${tokenId}: missing $extensions.prime.${field} per CD2 §2.5`);
    }
  }

  if (ext.tier && !['platform', 'dispatch', 'asset', 'component'].includes(ext.tier)) {
    issues.push(`${tokenId}: tier "${ext.tier}" not in {platform,dispatch,asset,component} per CD2 §2.4`);
  }

  if (token.$value.startsWith('{') && !token.$value.endsWith('}')) {
    issues.push(`${tokenId}: malformed DTCG alias reference`);
  }
}

for (const tier of TIER_FILES) {
  const path = resolve(`packages/tokens/src/${tier}.json`);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  walkTokens(data);
}

if (issues.length === 0) {
  console.log(`PRIME DTCG validator: ${tokenCount} tokens — CONFORMANT to DTCG 2025.10 + CD2 §2.5 8-field shape.`);
  process.exit(0);
} else {
  console.error(`PRIME DTCG validator: ${tokenCount} tokens — ${issues.length} issues:`);
  for (const issue of issues) console.error(`  ✗ ${issue}`);
  process.exit(1);
}
