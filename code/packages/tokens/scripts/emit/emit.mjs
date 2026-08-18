/**
 * Emit engine — renders a layout template against the parsed token dictionaries.
 *
 * A layout is an array of strings. Lines containing the placeholder `{css}`
 * are TOKEN LINES: the engine extracts the custom-property name from the line
 * (`--<cssName>:`), looks the token up in the given dictionary (by
 * $extensions.prime.cssName), and injects its $extensions.prime.css emission
 * string. Everything else passes through verbatim.
 *
 * Fail-closed both ways:
 *  - a token line whose cssName is missing from the dictionary → throw;
 *  - a dictionary entry (scoped to the layout's cycle) never consumed by any
 *    token line → throw (no silent omission from the shipped CSS).
 */

const TOKEN_LINE = /--([a-z0-9-]+):.*\{css\}/i;

/** Walk a Style Dictionary DTCG token tree → Map<cssName, {css, path}>. */
export function collectByCssName(tree, { requireCss = true } = {}) {
  const map = new Map();
  const walk = (node, path) => {
    if (typeof node !== 'object' || node === null) return;
    if (node.$value !== undefined) {
      const prime = node.$extensions?.prime;
      if (!prime?.cssName) {
        if (requireCss) return; // tokens without cssName are source-only (weights, motion, cartography)
        return;
      }
      if (prime.css === undefined) {
        throw new Error(`token ${path.join('.')} has cssName ${prime.cssName} but no $extensions.prime.css emission string`);
      }
      if (map.has(prime.cssName)) {
        throw new Error(`duplicate cssName ${prime.cssName} at ${path.join('.')}`);
      }
      map.set(prime.cssName, { css: prime.css, path: path.join('.') });
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      walk(v, [...path, k]);
    }
  };
  walk(tree, []);
  return map;
}

/** Render one layout against one cssName map. */
export function render(layout, byCssName, { label }) {
  const consumed = new Set();
  const out = [];
  for (const line of layout) {
    const m = line.match(TOKEN_LINE);
    if (!m) {
      out.push(line);
      continue;
    }
    const cssName = m[1];
    const entry = byCssName.get(cssName);
    if (!entry) throw new Error(`[${label}] layout wants --${cssName} but the dictionary has no such token`);
    consumed.add(cssName);
    out.push(line.replace('{css}', entry.css));
  }
  for (const [cssName, entry] of byCssName) {
    if (!consumed.has(cssName)) {
      throw new Error(`[${label}] token ${entry.path} (--${cssName}) is never emitted by the layout — refusing silent omission`);
    }
  }
  return out.join('\n');
}
