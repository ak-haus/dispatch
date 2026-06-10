/**
 * Emits dist/* for @prime-dispatch/tokens:
 * - tokens.tailwind.config.ts, tokens.toon — Style Dictionary from src/*.json
 * - tokens.css — canonical bridge from microsite-astro (amendment-locked + theme cycles)
 */
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import config from '../style-dictionary.config.mjs';

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(pkgRoot, 'dist');
const astroCanonicalCss = join(
  pkgRoot,
  '../../apps/microsite-astro/src/styles/tokens.css'
);

mkdirSync(distDir, { recursive: true });

const sd = new StyleDictionary(config);
await sd.hasInitialized;
await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

copyFileSync(astroCanonicalCss, join(distDir, 'tokens.css'));

console.log(
  'PRIME DISpatch tokens build: dist/tokens.{css,tailwind.config.ts,toon} emitted.'
);
