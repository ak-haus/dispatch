// Licensed webfonts live on a private asset rail, never in the public repo
// (Pangram Pangram per-style EULA — B14 public cut, 2026-08-18). The live site
// serves them as ordinary webfonts, so a build machine hydrates public/fonts/
// from production. Skip-if-present keeps the script idempotent; CI never runs
// it (hermetic builds fall back to system fonts, which no gate asserts on).
import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const FONTS = ['PPEditorialNew-Bold.woff2', 'PPPangramSans-Extrabold.woff2'];
const ORIGIN = process.env.FONTS_ORIGIN ?? 'https://dispatchmag.dev';
const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'fonts');

await mkdir(outDir, { recursive: true });
for (const name of FONTS) {
  const dest = path.join(outDir, name);
  const exists = await access(dest).then(() => true, () => false);
  if (exists) {
    console.log(`fonts: ${name} present — skipped`);
    continue;
  }
  const res = await fetch(`${ORIGIN}/fonts/${name}`);
  if (!res.ok) {
    console.error(`fonts: FAILED ${name} — HTTP ${res.status} from ${ORIGIN}`);
    process.exitCode = 1;
    continue;
  }
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`fonts: fetched ${name} (${res.headers.get('content-length') ?? '?'} bytes)`);
}
