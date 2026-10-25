// Licensed webfonts: how a build machine gets them. The two Pangram Pangram
// faces are gitignored and never committed (B14 public cut, 2026-08-18). Every
// build hydrates public/fonts/ from a PRIVATE Vercel Blob store; files already
// present are skipped, so a machine that has them needs no credential.
//
// WHY PRIVATE. AK holds Web licences only (order PPF-#118381, 2026-05-10): the
// right to embed the faces on the licensed domain, dispatchmag.dev. The EULA
// bars "uploading the Font to a public internet file transfer or storing
// channel" (3.7 (ii)) and giving third parties access to the files (3.1 (ii)).
// A public blob URL is such a channel even though the site serves the same
// bytes as webfonts, so the rail moved off its public store on 2026-10-24.
// Never move the files to a public store or a public URL.
//
// WHY BLOB, NOT THE SITE. Sourcing the fonts from dispatchmag.dev was circular
// once git started building production (Vercel GitHub App, F3-a, 2026-08-20):
// the first git-sourced build had no PP binaries and shipped the fallback
// wordmark. A store that no deploy builds cannot be emptied by a deploy, so
// never point this script at the site.
//
// CREDENTIALS. The store is `dispatch-fonts` (store_WfwQXnzCaczlnBf3), connected
// to the dispatch Vercel project for production and preview. Reads send a
// bearer token (Vercel docs, "Private storage"):
//   - Vercel builds: VERCEL_OIDC_TOKEN, which Vercel issues to each build and
//     rotates itself; nothing is stored.
//   - elsewhere: BLOB_FONTS_READ_WRITE_TOKEN, the store's static token (a GitHub
//     Actions secret, and Doppler for local runs: `doppler run -- pnpm
//     fetch:fonts`). Dependabot and fork PRs receive no Actions secrets, so
//     their font steps fail here, loudly.
// The token goes only into the Authorization header of a request to the store.
// It is never printed.
//
// REFRESH (only when a licensed binary is replaced): upload with @vercel/blob's
// put() and the static token, keeping the pathname stable:
//   put(`fonts/${name}`, bytes, { access: 'private', addRandomSuffix: false,
//     allowOverwrite: true, contentType: 'font/woff2', token })
import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const FONTS = ['PPEditorialNew-Bold.woff2', 'PPPangramSans-Extrabold.woff2'];
const STORE = 'https://wfwqxnzcaczlnbf3.private.blob.vercel-storage.com';
const WOFF2_SIGNATURE = 'wOF2';
const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'fonts');

// The SDK's order (JS SDK reference, "Resolution order"): OIDC when present,
// then the static token.
function credential() {
  for (const kind of ['VERCEL_OIDC_TOKEN', 'BLOB_FONTS_READ_WRITE_TOKEN']) {
    const token = process.env[kind]?.trim();
    if (token) return { kind, token };
  }
  return null;
}

await mkdir(outDir, { recursive: true });
const missing = [];
for (const name of FONTS) {
  const present = await access(path.join(outDir, name)).then(() => true, () => false);
  if (present) console.log(`fonts: ${name} present, skipped`);
  else missing.push(name);
}

if (missing.length > 0) {
  const cred = credential();
  if (!cred) {
    console.error(
      `fonts: FAILED, no credential for the private font store (missing: ${missing.join(', ')}).\n` +
        '  Vercel builds get VERCEL_OIDC_TOKEN automatically. Anywhere else, set\n' +
        '  BLOB_FONTS_READ_WRITE_TOKEN: a GitHub Actions secret in CI, or\n' +
        '  `doppler run -- pnpm fetch:fonts` on a laptop. Dependabot and fork PRs get no secrets.',
    );
    process.exitCode = 1;
  } else {
    for (const name of missing) {
      try {
        const res = await fetch(`${STORE}/fonts/${name}`, {
          headers: { Authorization: `Bearer ${cred.token}` },
        });
        if (!res.ok) {
          const why =
            res.status === 401 || res.status === 403
              ? `the store refused ${cred.kind} (expired, revoked, or not connected to this project)`
              : res.status === 404
                ? 'the file is not in the store'
                : 'unexpected response';
          console.error(`fonts: FAILED ${name}, HTTP ${res.status} from the private store: ${why}`);
          process.exitCode = 1;
          continue;
        }
        const bytes = Buffer.from(await res.arrayBuffer());
        if (bytes.subarray(0, 4).toString('latin1') !== WOFF2_SIGNATURE) {
          console.error(`fonts: FAILED ${name}, the response is not a WOFF2 file (${bytes.length} bytes)`);
          process.exitCode = 1;
          continue;
        }
        await writeFile(path.join(outDir, name), bytes);
        console.log(`fonts: fetched ${name} (${bytes.length} bytes) with ${cred.kind}`);
      } catch (error) {
        console.error(`fonts: FAILED ${name}, request error: ${error?.cause?.code ?? error?.message ?? error}`);
        process.exitCode = 1;
      }
    }
  }
}
