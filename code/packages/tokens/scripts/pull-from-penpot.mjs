/**
 * Penpot DTCG token export → tier-partitioned source files.
 *
 * Penpot's design-tokens API returns a single Tokens Studio JSON tree; this script
 * partitions the tree into per-tier DTCG sets per CD2 §2.5 Decision 3 β:
 *   tokens.color.platform.*   → tokens/platform.json
 *   tokens.color.dispatch.*   → tokens/dispatch.json
 *   tokens.color.asset.*      → tokens/asset.json
 *   tokens.color.component.*  → tokens/component.<name>.json (per-component file)
 *
 * Per-tier partitioning preserves containment-as-file-discipline per CD2 §2.5 —
 * CD-instances editing component tokens never touch the platform-wide file.
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PENPOT_URI = process.env.PENPOT_PUBLIC_URI;
const PENPOT_PAT = process.env.PENPOT_TOKEN_API_PAT;

if (!PENPOT_URI || !PENPOT_PAT) {
  console.error('PENPOT_PUBLIC_URI + PENPOT_TOKEN_API_PAT required (Doppler-managed; CI mirrors via GitHub secrets).');
  process.exit(1);
}

async function fetchPenpotTokens() {
  const res = await fetch(`${PENPOT_URI}/api/rpc/command/get-team-design-tokens`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${PENPOT_PAT}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!res.ok) {
    throw new Error(`Penpot API ${res.status}: ${await res.text()}`);
  }

  return await res.json();
}

function partitionByTier(tokenTree) {
  const tiers = { platform: {}, dispatch: {}, asset: {}, component: {} };
  const colorTree = tokenTree?.color;

  if (!colorTree) {
    throw new Error('Penpot returned no `color` tree; design-tokens schema mismatch.');
  }

  for (const tier of ['platform', 'dispatch', 'asset', 'component']) {
    if (colorTree[tier]) {
      tiers[tier] = {
        $description: tokenTree.$description ?? '',
        color: { $type: 'color', [tier]: colorTree[tier] }
      };
    }
  }

  return tiers;
}

const tree = await fetchPenpotTokens();
const tiers = partitionByTier(tree);

for (const [tier, content] of Object.entries(tiers)) {
  if (Object.keys(content).length === 0) continue;
  const path = resolve(`packages/tokens/src/${tier}.json`);
  writeFileSync(path, JSON.stringify(content, null, 2));
  console.log(`Wrote ${path}`);
}

console.log('Penpot DTCG export → tier-partitioned source files complete.');
