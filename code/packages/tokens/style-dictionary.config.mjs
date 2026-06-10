import StyleDictionary from 'style-dictionary';
import { register } from './scripts/transforms/toon-format.mjs';
import { registerTailwindV4Format } from './scripts/transforms/tailwind-v4-format.mjs';

register(StyleDictionary);
registerTailwindV4Format(StyleDictionary);

/** @type {import('style-dictionary').Config} */
export default {
  // DTCG JSON lives in src/. Shipped tokens.css is copied from microsite-astro after SD runs
  // (canonical Dawn/Dusk/Night cycles + amendment-locked values exceed color-only SD output).
  source: ['src/**/*.json'],
  usesDtcg: true,
  log: {
    warnings: 'warn',
    verbosity: 'verbose',
    errors: { brokenReferences: 'throw' }
  },
  expand: {
    typesMap: true
  },
  platforms: {
    'tailwind-v4': {
      transformGroup: 'js',
      transforms: ['attribute/cti', 'name/pascal', 'color/css'],
      buildPath: 'dist/',
      options: {
        outputReferences: false
      },
      files: [
        {
          destination: 'tokens.tailwind.config.ts',
          format: 'prime/tailwind-v4-config',
          filter: (token) => token.$type === 'color'
        }
      ]
    },

    toon: {
      transformGroup: 'js',
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.toon',
          format: 'prime/toon',
          filter: (token) => token.$type === 'color'
        }
      ]
    }
  }
};
