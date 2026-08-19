/**
 * @prime-dispatch/tokens build — the S2 token engine (ADR-0003 §Stage 2).
 *
 * Style Dictionary v5 parses + set-merges the DTCG 2025.10 source trees;
 * the emit layer (scripts/emit/) renders the two targets:
 *
 *   (a) tokens.css        — CSS custom properties: :root dawn +
 *       [data-prime-cycle] dusk/night runtime cascade blocks + .dark shadcn
 *   (b) tokens.theme.css  — the Tailwind v4 @theme inline block (var() chains
 *       only; cycle overrides live OUTSIDE it, in (a) — repo law)
 *
 * Both are written INTO microsite-astro/src/styles/ (committed; the CI drift
 * gate rebuilds and fails closed on any diff) and mirrored to dist/ for
 * package consumers (Storybook preview, microsite-next).
 */
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { collectByCssName, render } from './emit/emit.mjs';
import { assembleTokensCss, DAWN, DUSK, NIGHT, SHADCN_DARK } from './emit/layout-tokens-css.mjs';
import { THEME } from './emit/layout-theme-css.mjs';
import { renderDesignMd } from './emit/layout-design-md.mjs';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(pkgRoot, '../../..');
const astroStyles = join(pkgRoot, '../../apps/microsite-astro/src/styles');
const distDir = join(pkgRoot, 'dist');

const TREES = {
  dawn: [
    'src/color/platform.json',
    'src/color/dispatch.json',
    'src/color/asset.json',
    'src/color/ui-slots.json',
    'src/typography.json',
    'src/motion.json',
    'src/cartography.json',
  ],
  dusk: ['src/cycles/dusk.json'],
  night: ['src/cycles/night.json'],
  shadcnDark: ['src/color/shadcn-dark.json'],
};

async function loadTree(name) {
  const sd = new StyleDictionary({
    source: TREES[name].map((p) => join(pkgRoot, p)),
    usesDtcg: true,
    log: { warnings: 'warn', verbosity: 'default', errors: { brokenReferences: 'throw' } },
  });
  await sd.hasInitialized;
  return sd.tokens;
}

const [dawnTree, duskTree, nightTree, shadcnTree] = await Promise.all(
  Object.keys(TREES).map(loadTree),
);

const dawnAll = collectByCssName(dawnTree);
const themeFontNames = new Set();
{
  // theme:true marks the slots that ALSO compile into tokens.theme.css's
  // @theme inline block (the Tailwind `font-body`/`font-nav` utilities).
  // Since S4 they are no longer withheld from tokens.css: plain CSS consumers
  // — every packages/ui component stylesheet, under construction Rule 4 —
  // need the same slot names at :root, on surfaces where no Tailwind compile
  // exists (Storybook). One token, both emissions, one value.
  const walk = (node) => {
    if (typeof node !== 'object' || node === null) return;
    if (node.$value !== undefined) {
      const p = node.$extensions?.prime;
      if (p?.theme === true) themeFontNames.add(p.cssName);
      return;
    }
    for (const [k, v] of Object.entries(node)) if (!k.startsWith('$')) walk(v);
  };
  walk(dawnTree);
}
const dawnCss = dawnAll;

// Tailwind theme dictionary: bridge lines derived from real tokens (fail-closed
// if a target is missing) + the six live font slots.
const THEME_BRIDGE = {
  'color-accent-prime': 'platform-accent-prime',
  'color-accent-prime-active': 'platform-accent-prime-active',
  'color-copper': 'platform-copper',
  'color-copper-deep': 'platform-copper-deep',
  'color-copper-label': 'platform-copper-label',
  'color-on-copper': 'platform-on-copper',
  'color-wordmark-dis': 'platform-wordmark-dis',
  'color-wordmark-patch': 'platform-wordmark-patch',
  'color-lane-editorial-strong': 'dispatch-lane-editorial-strong',
  'color-lane-institutional-strong': 'dispatch-lane-institutional-strong',
  'color-lane-dispatch-strong': 'dispatch-lane-dispatch-strong',
  'color-text-body-strong': 'platform-text-body-strong',
  'color-text-body-muted': 'dispatch-text-body-muted',
  'color-text-body-faint': 'dispatch-text-body-faint',
  'color-text-body-muted-deep': 'dispatch-text-body-muted-deep',
  'color-body-strong': 'platform-text-body-strong',
  'color-body-muted': 'dispatch-text-body-muted',
  'color-body-faint': 'dispatch-text-body-faint',
  'color-body-muted-deep': 'dispatch-text-body-muted-deep',
  'color-sky-high': 'sky-high',
  'color-sky-low': 'sky-low',
  'color-reflect': 'reflect',
  'color-window-warm': 'window-warm',
  'color-cartography-pulse': 'asset-cartography-pulse',
};

const themeDict = new Map();
for (const [utility, target] of Object.entries(THEME_BRIDGE)) {
  if (!dawnAll.has(target)) throw new Error(`@theme bridge ${utility} targets missing token --${target}`);
  themeDict.set(utility, { css: `var(--${target})`, path: `theme-bridge → ${target}` });
}
for (const name of themeFontNames) {
  themeDict.set(name, dawnAll.get(name));
}

const tokensCss = assembleTokensCss({
  dawn: render(DAWN.split('\n'), dawnCss, { label: 'dawn' }),
  dusk: render(DUSK.split('\n'), collectByCssName(duskTree), { label: 'dusk' }),
  night: render(NIGHT.split('\n'), collectByCssName(nightTree), { label: 'night' }),
  shadcnDark: render(SHADCN_DARK.split('\n'), collectByCssName(shadcnTree), { label: 'shadcn-dark' }),
});
const themeCss = render(THEME.split('\n'), themeDict, { label: 'theme' });

// S3 (ADR-0003 §Stage 7): the repo-root brand contract, emitted from the same
// source. Committed + drift-gated (gate #8), never hand-edited.
const designMd = renderDesignMd({ dawnTree, duskTree, nightTree });

mkdirSync(distDir, { recursive: true });
writeFileSync(join(astroStyles, 'tokens.css'), tokensCss);
writeFileSync(join(astroStyles, 'tokens.theme.css'), themeCss);
writeFileSync(join(repoRoot, 'DESIGN.md'), designMd);
copyFileSync(join(astroStyles, 'tokens.css'), join(distDir, 'tokens.css'));
copyFileSync(join(astroStyles, 'tokens.theme.css'), join(distDir, 'tokens.theme.css'));

console.log(
  `PRIME DISpatch token engine: tokens.css (${dawnCss.size} dawn + ${collectByCssName(duskTree).size} dusk + ${collectByCssName(nightTree).size} night + ${collectByCssName(shadcnTree).size} shadcn) + tokens.theme.css (${themeDict.size} slots) + DESIGN.md (${designMd.length} bytes) emitted → microsite-astro/src/styles + dist/ + repo root.`,
);
