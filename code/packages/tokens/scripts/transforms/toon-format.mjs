/**
 * TOON (Token-Oriented Object Notation) custom format.
 * Per CD2 §8.3 + master-plan §1.7 reframe 2.7 — 30-60% LLM token savings vs JSON
 * for stable agent-read artifacts; per §1.4.2 AI-first operability.
 *
 * Consumer pattern: AI agents querying token system at boot read tokens.toon
 * rather than full DTCG JSON; saves prompt tokens at scale. Mirrors DTCG schema
 * with token-economy compression — strips $description prose + $extensions
 * provenance arrays + collapses aliases to flattened final values.
 */

const formatToon = ({ dictionary }) => {
  const lines = [
    '# PRIME DISpatch tokens — TOON format',
    '# Source: CD2 ratified (representation/visual-system/color.md)',
    '# Compiled from Style Dictionary v4 + DTCG 2025.10 sources',
    '# Schema: <token-path>=<final-value>:<tier>',
    ''
  ];

  for (const token of dictionary.allTokens) {
    const tier = token.$extensions?.prime?.tier ?? 'unspecified';
    const value = token.$value ?? token.value;
    const path = token.path.join('.');
    lines.push(`${path}=${value}:${tier}`);
  }

  return lines.join('\n') + '\n';
};

export const register = (StyleDictionary) => {
  StyleDictionary.registerFormat({
    name: 'prime/toon',
    format: formatToon
  });
};
