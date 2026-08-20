# The ideation zone

This is where visual ideas for DISpatch are made and kept — the landing zone for the ideation rail
(ADR-0003 §Stage 1, board S7). Nothing in here ships. Everything in here is evidence.

A run looks like this:

```
design/ideation/
  README.md              ← you are here
  house-register.md      ← what a DISpatch plate looks like, read off the shipped corpus
  dispatch-01-banner/    ← one run
    dispatch-01-banner-01.png
    provenance.json      ← the prompt, the model, the date, the cost, the contract it was built from
```

## The one rule

**Every kept artifact commits with its prompt, model and date — or it is discarded. There is no
third state.**

That rule is not advice. `scripts/check-ideation-provenance.ts` runs on every push as the
`ideation (provenance law)` gate, and it fails closed: an image with no provenance record, a record
whose SHA-256 no longer matches the bytes, or an unrecognised file in a run directory all turn the
build red. The reason is in the ADR — without commit-or-discard this stage manufactures orphan
mocks, images nobody can trace, reproduce, or argue with. An untraceable mock is worse than no mock,
because it still gets cited.

The same gate enforces a second rule: **shipped code may never reference `design/ideation/`.** This
zone is not an asset rail. A plate that earns its place gets *copied* into
`code/apps/microsite-astro/public/` as a deliberate act, and that act is AK's — content is his, and
promotion is content review, never an automated step.

## Making a run

The rail assembles its own prompt from the brand contract, so palette, typography, cycle ground and
the tombstoned-invention list come out of `DESIGN.md` at run time rather than out of memory:

```bash
bun scripts/ideate-visual.ts --slug my-run --need "F13 — …" --brief "…" --dry-run
```

`--dry-run` prints the assembled prompt and spends nothing; read it before you spend. To generate,
drop `--dry-run` and supply the key from the vault — never inline, never in a file:

```bash
doppler run -p prime-city -c dev -- bun scripts/ideate-visual.ts --slug my-run --need "…" --brief "…"
```

Nano Banana Pro costs about **$0.134** per 1K/2K image, and the standing ceiling from ADR-0003 is
**$10/month** across every usage-based stage. Each run records what it actually cost in its
`provenance.json`, so the ceiling is auditable rather than assumed.

## What this zone does not decide

The rail **consumes** canon; it does not extend it. If an ideation output would need a palette
change, a new type slot, or any other amendment to `representation/visual-system/`, that is an open
question for AK — file an **OQ** in
`code/packages/tokens/scripts/emit/layout-design-md.mjs` and rebuild, exactly as the S4 runbook
describes. Do not resolve it here, and do not quietly narrow the idea to avoid it.
