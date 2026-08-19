/**
 * Token-governance scan for component CSS (ADR-0003 §Stage 5) — the sibling
 * of eslint.config.mjs for the surface ESLint's parser does not reach.
 * Component stylesheets consume canon via var(--token) only: raw hex and
 * raw color-function literals are banned (construction-rules.md Rule 4;
 * DESIGN.md §Colors). Fail-closed: any hit = exit 1 = red gate.
 *
 * Deferred, same honesty clause as the ESLint side: px (stroke canon is px;
 * no spacing scale ratified) and rgba()/hsla() shadows (no elevation canon).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = [
  "packages/ui/src/components",
  "apps/microsite-astro/src/components",
];

const BANNED = [
  { re: /#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?\b/, label: "raw hex color literal" },
  { re: /\boklch\(/, label: "raw oklch() literal" },
];

function* cssFiles(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* cssFiles(full);
    else if (entry.endsWith(".css")) yield full;
  }
}

const violations = [];
for (const root of ROOTS) {
  for (const file of cssFiles(root)) {
    const raw = readFileSync(file, "utf8");
    // Blank comment CONTENT while preserving line numbers, so canon-citing
    // prose inside /* */ blocks (Rule 7 anti-pattern headers cite hex like
    // "#8e2532 per Decision 12") never false-positives — including blocks
    // spanning multiple lines.
    const stripped = raw.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ""));
    stripped.split("\n").forEach((code, i) => {
      for (const { re, label } of BANNED) {
        if (re.test(code)) violations.push(`${file}:${i + 1} — ${label}: ${code.trim()}`);
      }
    });
  }
}

if (violations.length) {
  console.error(`tokens-lint (css): ${violations.length} violation(s) — components consume var(--token) only (construction-rules Rule 4):`);
  for (const v of violations) console.error(`  ✗ ${v}`);
  process.exit(1);
}
console.log("tokens-lint (css): component stylesheets are literal-free — canon consumption only.");
