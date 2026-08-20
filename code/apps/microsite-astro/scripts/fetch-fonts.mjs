// Licensed webfonts live on a private asset rail, never in the public repo
// (Pangram Pangram per-style EULA — B14 public cut, 2026-08-18). A build machine
// hydrates public/fonts/ from that rail; skip-if-present keeps it idempotent.
//
// THE RAIL IS VERCEL BLOB, and it is deliberately NOT the live site.
//
// It used to be `https://dispatchmag.dev`, which worked only for as long as
// production was deployed by CLI from a laptop that had the binaries locally:
// the Vercel CLI uploads local files, gitignored ones included. Installing the
// Vercel GitHub App (F3-a, 2026-08-20) changed who builds production. The first
// git-sourced production build had no PP binaries — nothing in the repo has
// them — so it shipped without them, the site fell back to Vollkorn for the
// wordmark, and every gate that hydrates fonts started failing on HTTP 404.
//
// That was circular by construction: CI took its fonts from production, and
// production was now built by the same pipeline that had none. Blob breaks the
// cycle — it is a rail neither side builds, so there is no path by which a
// deploy can empty it.
//
// Public URLs by design, and no credential anywhere. These faces are already
// served publicly as ordinary webfonts (a browser must download them to render
// the page), so a public blob URL is exactly the exposure the site already has
// and changes nothing about the EULA position: the binaries stay out of git.
// The upside is that CI, Vercel and a laptop all use the identical path with no
// token to leak, rotate, or forget.
//
// Refresh the rail (only when a licensed binary is replaced) with the blob
// token from the Vercel project env:
//   curl -X PUT "https://blob.vercel-storage.com/fonts/<name>.woff2" \
//     -H "Authorization: Bearer $BLOB_READ_WRITE_TOKEN" -H "x-api-version: 7" \
//     -H "x-content-type: font/woff2" -H "x-add-random-suffix: 0" \
//     --data-binary "@public/fonts/<name>.woff2"
// `x-add-random-suffix: 0` is what keeps the URL below stable; without it every
// upload mints a new one and this file goes stale.
import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const FONTS = ['PPEditorialNew-Bold.woff2', 'PPPangramSans-Extrabold.woff2'];
const ORIGIN = process.env.FONTS_ORIGIN ?? 'https://ovwa7w9grksbdzc3.public.blob.vercel-storage.com';
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
