# Build 29 — the promote-or-lose pass, and Phase B closes

> Record of the register-promotion pass mandated by ADR-0002 Decision 1, executed 2026-09-20.
> **Phase B runs exactly once for code.** A code-hardening flag still sitting in the ledger when B
> closes is homeless, because there is no second B. This pass gives every open flag a row, a close, or
> a park, and then closes Phase B by name.

## What this pass is, and what it is not

It is a **sort**, not a second audit. The C1 bug bash (2026-09-20) filed seventeen rows already
carrying phase tags for exactly this reason. The eighteen older flags are sorted here against the
doctrine that governs each: ADR-0002 Decision 1 (B is code hardening, once), ADR-0002's own Phase B
note (*records reconciliation moves to a standing lint cadence*), and ADR-0004 (a rule citing no
standard is not standing law; tracks are not B rows).

Three rows did **not** survive re-verification as filed. They are corrected below rather than
promoted as written — the fourth, fifth and sixth builds running where that has happened, which is
why the opener mandates first-hand re-verification before fixing.

---

## Phase B — CLOSED 2026-09-20

**Every Dispatch row in Phase B is disposed:**

| Row | Disposition |
|---|---|
| B1 · B2 · B4 · B5 · B12 · B13 · B14 · B15 · B16 | **DONE** — merged, deployed, smoke green |
| B3 — records reconciliation | **MOVES TO E** (standing lint cadence) — see below |
| B17 — masthead single-owner repair | **CONDITIONAL, filed** — a register row whose content is an instruction not to act. Fires only on its named trigger. Filed is the disposition |
| B18 — share metadata | **BUILT**, closes on AK's real-platform check of the cards |
| B6–B11 | **PARKED** for Crossfire's own firmness-and-stability run (ADR-0002 amendment, AK 2026-09-19) |

**B3 is not abandoned, it is rehomed.** Phase B's own note reads *"Code hardening never recurs;
records reconciliation moves to a standing lint cadence."* B3 is records reconciliation — three
doc-drift lines, a stale root index, and two canon calls that are AK's. It was never code hardening,
so E is where the doctrine already put it. F8 folds into it on the same grounds.

**PHASE B IS CLOSED.** Nothing code-hardening remains in the ledger unsorted.

---

## The sort — all 35 open flags

### Already phase-tagged by C1 (17) — accepted as tagged, with two corrections

**Phase C, the Build 29 fix rows (15):** F50 · F51 · F52 · F53 · F55 · F56 · F57 · F58 · F59 ·
F61 · F62 · F63 · F64 · F65 · F66

**Phase A, instrument (1):** F54 — the axe floor's gap is by route and by state, not by width.

**Phase T, track (1):** F60 — **CORRECTED, see below.**

Two corrections this pass makes to the C1 tags:

- **F61 is Phase C in full, not part-D1.** The row held that the pull quote "has no field to wire to"
  and therefore needed a schema widening that is AK's alone under the S8 authoring contract.
  **Measured first-hand: the premise is false.** Every one of the six dispatches already carries an
  authored `<PullQuote text="…" />` in its MDX body — `dispatch-01.mdx:83`, `-02.mdx:77`,
  `-03.mdx:30`, `-04.mdx:32`, `-05.mdx:32`, `-06.mdx:32` — which is the authoring contract's own
  documented mechanism (*".mdx to embed components (`<PullQuote />`) at exact paragraph anchors"*,
  AGENTS.md). There is a field to derive from; it is authored content, not frontmatter. **No schema
  widening, no OQ, no AK ruling.** The hardcoded string at `ArticleSpread.tsx:173` is not even the
  featured dispatch's pull quote — it is dispatch-01's *opening body sentence* (`dispatch-01.mdx:71`),
  while that dispatch's actual pull quote is "The cartography is the visual hero, but not the product
  model." F61 is now one engineering defect class, entire.
- **F60 stays T, and its citation is corrected.** Below.

### The eighteen older flags

| Flag | Disposition | Grounds |
|---|---|---|
| **F6** — Interceptor page-reach | **PARK (PAI)** | PAI tooling, not Dispatch code. Nothing on the golden path depends on it |
| **F7** — Forge/Cato rail dark | **PARK (PAI)** | PAI + AK budget. Not a Dispatch row |
| **F8** — B14 file ledger | **FOLD INTO B3 → E** | Records-sized by its own filing ("none block anything"). Same rehoming as B3 |
| **F25** — ledger not machine-checkable | **MOVES TO E** | Half closed by mechanism at Build 27 (`audit-flag-ledger.mjs`). The remaining half — an in-repo ledger — is records infrastructure, which Phase B's own note sends to the standing cadence. Not code hardening; not homeless |
| **F26** — Vercel immutable 404s | **ACCEPTED RESIDUE, named** | Re-read `vercel.json` first-hand: `headers` match on **path**, and Vercel's matchers (`has`/`missing`) condition on host, header, cookie and query — **never status**. There is no config repair. Its bite is removed from the other end by F63's fallback, which makes a chunk 404 non-destructive. Recorded as a known property, not an open repair |
| **F27** — lazy chunk 404 across a deploy | **CLOSE — known, accepted** | Generic to code-splitting; the A6 design already states its accepted loss. F63 is its runtime consequence and carries the repair |
| **F28** — did build 59's 4 baselines include the banner? | **AK one-click** | Answerable only in the Chromatic UI, which needs AK's login. Cheap inspection, no measurement owed |
| **F29** — 22 utilities name unregistered slots | **PHASE T** | The drop-at-conversion half executed in B15. What remains is whether the emitter should register the names — a canon governance call, explicitly AK's, which ADR-0002 keeps out of B |
| **F33** — story rail never audits mobile | **PHASE A, folds with F54** | Same defect class as F54: the accessibility instrument has a coverage hole. Desktop half already pinned by the Build 26 guard |
| **F37** — maplibre stylesheet sitewide | **RIDES T8** | Already ruled 2026-09-19 |
| **F39** — /wire LCP +450 ms | **CLOSE — bound** | The row's own re-test at Build 25 showed it does not share B12's cause, and the re-baselined ceiling (4500 → 3600) now binds it. A figure inside a binding ceiling is not an open defect |
| **F42** — vitest outside its Vite range | **PHASE T** | Costs a Storybook 9 → 10 major; explicitly out of this session's scope. A toolchain major is a build of its own |
| **F44** — title reads "DISpatch — DISpatch" | **PHASE C** | One line, rides Build 29 |
| **F45** — `favicon.svg` referenced by nothing | **PHASE C** | One decision, one line, rides Build 29 |
| **F46** — home card banners at full plate size | **RIDES T5 / OQ-7** | The repair is right-sized renditions, which is the image seam. Out of scope by the opener |
| **F47** — live pulse under `prefers-reduced-motion` | **PHASE C, folds with F55** | Same floor (CD5 §2 / WCAG 2.3.3), same fix family, different files |
| **F48** — only the article is scanned narrow | **CLOSE — superseded by F54** | F54 measured the axis F48 named and found it wrong: a 320/375 sweep is byte-identical, so the gap is route and state, not width. F54 carries it |
| **F49** — inert diff drew 2 archive-lane changes | **PHASE C** | One container run to measure; Build 29 runs the container anyway |

---

## The three rows that did not survive re-verification

### F60 — the measurement stands, the citation does not

**What holds, re-measured first-hand.** Type is px-pinned at scale. Forcing `html{font-size:32px}`
and re-snapshotting every text element: `/` 439/488 pinned (90.0%), `/article` 89/114 (78.1%),
`/sitemap` 61/79 (77.2%), `/about` 138/218 (63.3%). The overflow figures reproduce **exactly** as
filed, once the method is matched — they require a 375px viewport *and* a 32px root together:
`/about` +105px, `/article` +135px, `/preview/tokens` +301px, `/preview/figure` +499px. At 1280px the
same root change overflows only `/` (+111px). Nothing here is retracted.

**What does not hold: this is not a WCAG 1.4.4 failure.** W3C's Understanding SC 1.4.4 states the
criterion is satisfied *"if it can be scaled up to 200% using **at least one** text scaling mechanism
supported by user agents"*, and names *"the browser's full-page zoom function"* as such a mechanism.
Browser zoom scales px and rem text alike. W3C specifies zoom tests as CSS-pixel viewport reduction
(320 CSS px ≡ 400% zoom of 1280), so 640×512 ≡ 200%.

**Measured at 640×512 across eight routes: zero horizontal overflow on every one. SC 1.4.4 PASSES.**

The same probe at 320×256 (400%, which 1.4.4 does not require) independently reproduced **F59's**
findings — `/article` +48px, `/preview/figure` +117px, `/preview/tokens` +18px. So the real normative
failure in this neighbourhood is F59 (SC 1.4.10 Reflow), which is already a Phase C row, and F60 was
citing F59's standard for a different defect.

**What F60 actually is:** a violation of **R1a**, Dispatch's own house rule — and R1a is itself
*mis-grounded*, because it cites WCAG 1.4.4 for a requirement 1.4.4 does not impose. That is exactly
ADR-0004 M1 and T1's **"mis-grounded → re-ground"** case, not a cull: the underlying goal (type that
answers a reader's *default font size*, not merely their zoom) is real, is good practice, and is not
a conformance obligation.

**Phase: stays T.** Decided by cited field consensus, not by preference: golden does not wait for the
type scale, because golden's gate is conformance and conformance passes. The track re-grounds R1a on
what actually founds it and carries the type-scale program.

### F53 — understated; it is a three-cycle defect, not a dawn one

Re-verified through the repo's own `e2e/helpers/axe.ts` configuration, **detector proven first** (a
planted `#eeeeee` on `#ffffff` element fires `color-contrast`; note that a planted *pseudo-element*
does **not** — axe does not read `::before` content, and that first control was discarded as
worthless rather than trusted).

Dawn reproduces F53 exactly: `/sitemap` 4 violations (3 × 3.36:1 copper, 1 × 4.02:1 lane),
`/article` 10 × 4.25:1. Independent hand-computed WCAG math agrees with axe to 0.01.

**The copper half is fixed and needed no canon change.** All three `/sitemap` nodes were
`--platform-copper` (the *display* token) used at `text-[12px] font-bold` — the F5 size-scoped split
violated at the call site, not a palette problem. Repointed to `--platform-copper-label`, the AA
variant F5 created for exactly this: **#9f5c17, 4.64:1**, already asserted in
`packages/tokens/__tests__/contrast.test.mjs`. `/sitemap` 4 violations → 1.

**What re-verification added, and F53 did not have:** the dark cycles fail too, with a **different
colour pair and worse ratios**.

| cycle | /article | /sitemap | pairs |
|---|---|---|---|
| dawn | 10 | 1 | `#bb4812` on `#efe8da` / `#f0e0d2` — lane-editorial |
| dusk | 2 | 3 | `#951c2c` **2.22:1** and `#b4343b` 3.14:1 on `#1b0e08` |
| night | 2 | 3 | `#a62534` 2.90:1 and `#c5353e` 3.90:1 on `#020201` |

The dark-cycle pair is the accent-prime wine, which is **already T4/OQ-6b's** subject ("lifts
dusk/night `--platform-accent-prime-active` to AA"). So F53 splits: the lane half is a lane-pigment
question, the dark-cycle half rides T4.

**The lane half is ASK FIRST** (AGENTS.md: locked visual canon CD1–5 — lanes). The field's
recommendation is recorded with it so the call is one decision, not research: **IBM Carbon** models
colour as **role-based tokens** ("tokens are a method of abstracting color by role or usage"), with
text tokens held separately from brand tokens; **USWDS** puts grades on a 100-point scale with
documented magic numbers and directs designers to *"adjust the grade of their chosen hue to meet
contrast needs — this preserves brand identity while ensuring accessibility."* Both point the same
way: **add a role-scoped `lane-editorial-label` sibling for small text; do not mutate the canon lane
pigment globally.** That is also the in-house precedent (`--platform-copper-label`, F5), and it
leaves CD1–5 untouched. Computed by the OQ-5/OQ-6b method — hue 41 and chroma 0.16 held exactly,
lightness only — the first rung clearing AA on both dawn backgrounds is **oklch(0.52 0.16 41) =
#b03e00** (4.87 on the card, 4.61 on the tint).

**F54's route coverage is HELD behind it**, stated rather than discovered later: adding `/article`
and `/sitemap` to the axe suite today turns these nodes into an immediate red. The coverage gap and
the defect it hid must clear together.

**New, not in F53:** `/about` returns a real `scrollable-region-focusable` violation — a scrolling
`<pre>` with no keyboard access (WCAG 2.1.1). Filed as **F67**.

### F51 — the band's upper bound is wrong

Confirmed and fixed, but the row's band is not what it claimed. Measured on the built site:
overflow at 768 (+463), 820 (+411), 1024 (+207) — exactly as filed — and **0 at 1231**, where the row
said "broken 768→1231 inclusive". 1231 and 1232 are both clean; the true band ends between 1024 and
1231. The repair moves the forced single line from `md` (768) to `xl` (1280), the first standard
breakpoint clear of the band. Re-measured across twenty widths from 320 to 1920 plus landscape phone
812×375: **zero overflow everywhere.**

---

## What landed in this build

| Flag | Repair | Pin |
|---|---|---|
| **F50** | `Number.isFinite(new Date(e.ts).getTime())` in `contract.ts` **and** `generate-wire-snapshot.mjs` | 8 contract tests; **7 of them fail on the old code** |
| **F64** | `AbortSignal.timeout(10s)` on the poll · single-flight latch · `revalidateNow` respects a pending backoff | 4 store tests; **all 4 fail on the old code** |
| **F51** | `md:` → `xl:` on the BuildTicker caption | e2e reflow floor extended into the band: 768 · 820 · 1024 · 1280, plus landscape 812×375 |
| **F53** (copper half) | 3 call sites → `--platform-copper-label` | existing per-node math in `contrast.test.mjs` |

Every pin was **negative-tested**: the source repair was reverted with the tests in place, the suite
was run, and the failures were read before the repair was re-applied. A test that has never been seen
red is not a pin.

---

## Next

**D1 may open on a sorted register.** The register is sorted: every open flag now has a row, a close,
or a park, and Phase B is closed by name. What stands between here and the golden gate is the
remainder of Phase C — the C1 fix rows not taken in this build — plus F53's lane half, which is one
AK ruling with the field's recommendation already attached.
