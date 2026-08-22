# The house register — what a DISpatch plate looks like

> **This file is evidence, not canon.** It records what the six shipped banners in
> `code/apps/microsite-astro/public/banners/` actually look like, censused first-hand at the S7
> build (2026-08-19). It makes no visual decision and extends no canon: where it disagrees with
> `representation/visual-system/` or `DESIGN.md`, **canon wins and this file is wrong**.
> `scripts/ideate-visual.ts` reads the fenced `register` block below into every prompt, so an
> ideation run inherits the shipped house style instead of a style typed from memory.

## The census

Every banner in the corpus, described from the file rather than from its name.

| Plate | Register | Ground | Accents | Lettering |
|---|---|---|---|---|
| `dispatch-02` | Ligne-claire ink cityscape, elevated three-quarter view, a boxy-headed figure in the foreground | white paper, sky blue | sky blue, ochre | none |
| `dispatch-03` | Isometric architectural cut-away, cranes, halftone dot fields | cream | navy line, rose | none |
| `dispatch-04` | Axonometric pen-and-ink, dense hatching, an overlaid network of lines and nodes | cream vellum | orange-red | none |
| `dispatch-05` | Top-down blueprint city plan, pure line | deep navy | white hairlines | none |
| `dispatch-06` | Magazine-cover product render, soft studio shadow | cream on brick red | brick red | **garbled** |
| `dispatch-07` | Aged book spread, archive plate, CRT monitors | aged cream | red, teal | **garbled** |

## What the census says

**Four of six are the register**: hand-drawn architectural or cartographic line work on a warm
paper ground, one or two accent pigments, no lettering, no photorealism, drafted from above or in
axonometric. That is the DISpatch plate.

**Two of six are the failure mode, and they are instructive.** `dispatch-06` and `dispatch-07`
both carry drawn text, and every word of it is garbled — image models cannot set type. Worse,
`dispatch-06` draws the wordmark as flat black "Dispatch", which breaks the one universal type
rule that admits no exception: **`DIS` is always red** (`DESIGN.md` §Universal type rules 1). A
plate cannot satisfy that rule, because the rule is about a `<span>` split that only exists in
code. So the constraint follows from canon rather than from taste: **a generated plate carries no
lettering at all.** Type is set in code, over the plate, never inside it.

Neither outlier is being retouched or removed here — that would be a content decision, and AK owns
content. They are recorded so the rail does not reproduce them.

## The production spec (injected)

Everything inside the fence below is injected verbatim into the prompt. Under
[ADR-0004](../../docs/adr/0004-doctrine-grounding-and-audit-tracks.md) **M2**, only constraints
with a **mechanical or professional-practice footing** may live here, because everything here
pre-rejects art before AK ever sees it. Each line's grounding is named in the audit below the
fence. Taste does not belong in this block — it belongs to the creative brief, which is AK's.

```register
Editorial illustration in the register of a hand-drawn architectural plate — the kind of
drawing a small press would print on good paper.

  - Medium: ink line work. Pen, technical drafting pen, or fine brush. Visible hatching and
    stipple for tone. The paper grain and the warmth of the stock are part of the image.
  - View: axonometric, isometric, or straight top-down plan. A drafted view, not a
    photographic one.
  - Subject: architecture and the city. Buildings in section or cut-away, rooftops, street
    grids, lot lines, scaffolding and cranes, surveyor's marks, the machinery of construction.
  - Colour: the paper ground plus one or two accent pigments, used sparingly as marks,
    annotations, and network lines. Never a wash, never a gradient, never a field of colour.
  - Lettering: none. No words, labels, signage text, or marks that read as type anywhere in
    the image, including in the margins.
```

### Why each line is here — the M2 audit (2026-08-21)

| Constraint | Founding principle |
|---|---|
| ink line work; hatching and stipple | named illustration techniques — standard craft vocabulary taught in illustration and technical drawing |
| axonometric / isometric / plan | architectural drawing conventions (paraline projection), taught in architecture and technical drawing |
| subject: architecture and the city | the publication's editorial subject — a brief-level fact about what the magazine is about, not a taste judgment about how it should look |
| paper ground plus one or two accent pigments; no wash, gradient, or field | **spot-colour print production** — a real press constraint from letterpress, risograph, and offset spot printing |
| no lettering at all | empirically demonstrated (every drawn word in `dispatch-06` and `dispatch-07` is garbled — image models cannot set type) and canon-derived (`DESIGN.md` §Universal type rules 1: the `DIS` split exists only in code, so no plate can satisfy it) |

## The creative brief (AK's, per run — NOT injected as standing law)

These are **art direction**, not production constraints. Under ADR-0004 M2 they were removed from
the fence: each is a taste judgment that was pre-rejecting art on subjective grounds with no
mechanical or professional-practice footing. The professional structure is the ordinary one — a
creative brief carries the visual and artistic direction and belongs to the art director; a
production spec carries the countable deliverable requirements. They are complementary documents,
and fusing them was the defect.

AK may pass any of these into a run via `--brief`, vary them, or ignore them entirely. The rail
must not enforce them.

- **Density** — rich and patient; small incidental detail that rewards a second look, so the
  drawing holds up when the reader stops scrolling and looks properly.
- **Temperature** — warm, quiet, restrained, precise. Civic-archive rather than science fiction.
- **Figures** — if present, small, silhouetted, incidental to the architecture; no portraits.
- **Self-awareness** — the drawing knows it is a drawing.

*Provenance: `dispatch-01` (plate 01, promoted 2026-08-21) was generated while these lines were
still in the fence. They are recorded here so the direction is not lost — only its standing.*

