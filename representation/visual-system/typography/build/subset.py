#!/usr/bin/env python3
"""
subset.py — WOFF2 production cuts for V1 OFL stack (W2-S-E).

Reads variable + static source fonts from `sources/<family>/`, instances
variable fonts at the manifest-specified weights, subsets to the per-surface
Unicode range, retains family-appropriate OpenType features, and writes
WOFF2 binaries to `subsets/<surface>/<family>-<weight>[-italic].woff2`.

Reproduces the 14-cut V1 inventory documented in ../manifest.md.

Run from the typography/ directory:

    cd v1-dev-diary-microsite/representation/visual-system/typography
    python build/procure.py    # one-time; populates sources/
    python build/subset.py     # produces subsets/<surface>/<family>-*.woff2

Authored 2026-05-10 by W2-S-E.
"""

from __future__ import annotations

import hashlib
import sys
from dataclasses import dataclass
from pathlib import Path

from fontTools import subset as ft_subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

# ---------------------------------------------------------------------------
# Subset profiles (Unicode ranges per surface)
# ---------------------------------------------------------------------------

UNICODES_LATIN_EXTENDED_EDITORIAL = (
    "U+0020-007E,U+00A0-024F,U+1E00-1EFF,U+2010-2027,U+2030,U+2032-2033,"
    "U+2039-203A,U+2044,U+2060,U+20A0-20BF,U+2122,U+2190-2199,U+25CA,"
    "U+2018-2019,U+201C-201D,U+2026"
)

UNICODES_LATIN_BASIC_UI = (
    "U+0020-007E,U+00A0-00FF,U+2010-2027,U+2026,U+2018-2019,U+201C-201D,"
    "U+2190-2199,U+20A0-20BF"
)

UNICODES_MONO_CODE = (
    "U+0020-007E,U+00A0-00FF,U+2010-2027,U+2500-257F,U+2580-259F,"
    "U+2200-22FF,U+2190-2199,U+27F0-27FF"
)

UNICODES_LATIN_EXTENDED_ITALIAN = (
    "U+0020-007E,U+00A0-024F,U+2010-2027,U+2018-2019,U+201C-201D,"
    "U+2026,U+2030"
)

# ---------------------------------------------------------------------------
# Cut inventory (mirrors ../manifest.md)
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class Cut:
    surface: str
    family: str  # filesystem family-key (sources/ + subsets/<surface>/<family>-…)
    source_file: str  # under sources/<family>/
    weight: int  # 400, 600, 700 etc.
    italic: bool
    profile_unicodes: str
    layout_features: tuple[str, ...]  # extra OT features to retain
    output_name: str  # subsets/<surface>/<output_name>


INVENTORY: list[Cut] = [
    # Title — Vollkorn (variable wght axis; instance at 400 and 700)
    Cut("title", "vollkorn", "Vollkorn[wght].ttf", 400, False,
        UNICODES_LATIN_EXTENDED_EDITORIAL, ("kern", "liga", "dlig", "onum", "lnum", "tnum"),
        "vollkorn-400.woff2"),
    Cut("title", "vollkorn", "Vollkorn-Italic[wght].ttf", 400, True,
        UNICODES_LATIN_EXTENDED_EDITORIAL, ("kern", "liga", "dlig", "onum", "lnum", "tnum"),
        "vollkorn-400-italic.woff2"),
    Cut("title", "vollkorn", "Vollkorn[wght].ttf", 700, False,
        UNICODES_LATIN_EXTENDED_EDITORIAL, ("kern", "liga", "dlig", "onum", "lnum", "tnum"),
        "vollkorn-700.woff2"),

    # Body — Crimson Pro (variable wght axis; instance at 400 / 600 / 700)
    Cut("body", "crimson-pro", "CrimsonPro[wght].ttf", 400, False,
        UNICODES_LATIN_EXTENDED_EDITORIAL,
        ("kern", "liga", "dlig", "onum", "lnum", "tnum", "smcp", "c2sc"),
        "crimson-pro-400.woff2"),
    Cut("body", "crimson-pro", "CrimsonPro-Italic[wght].ttf", 400, True,
        UNICODES_LATIN_EXTENDED_EDITORIAL,
        ("kern", "liga", "dlig", "onum", "lnum", "tnum", "smcp", "c2sc"),
        "crimson-pro-400-italic.woff2"),
    Cut("body", "crimson-pro", "CrimsonPro[wght].ttf", 600, False,
        UNICODES_LATIN_EXTENDED_EDITORIAL,
        ("kern", "liga", "dlig", "onum", "lnum", "tnum", "smcp", "c2sc"),
        "crimson-pro-600.woff2"),
    Cut("body", "crimson-pro", "CrimsonPro[wght].ttf", 700, False,
        UNICODES_LATIN_EXTENDED_EDITORIAL,
        ("kern", "liga", "dlig", "onum", "lnum", "tnum", "smcp", "c2sc"),
        "crimson-pro-700.woff2"),
    Cut("body", "crimson-pro", "CrimsonPro-Italic[wght].ttf", 700, True,
        UNICODES_LATIN_EXTENDED_EDITORIAL,
        ("kern", "liga", "dlig", "onum", "lnum", "tnum", "smcp", "c2sc"),
        "crimson-pro-700-italic.woff2"),

    # Nav — Inter (variable opsz + wght; instance at 400 and 600, opsz=14 default)
    Cut("nav", "inter", "Inter[opsz,wght].ttf", 400, False,
        UNICODES_LATIN_BASIC_UI, ("kern", "liga", "calt", "case", "cv11"),
        "inter-400.woff2"),
    Cut("nav", "inter", "Inter[opsz,wght].ttf", 600, False,
        UNICODES_LATIN_BASIC_UI, ("kern", "liga", "calt", "case", "cv11"),
        "inter-600.woff2"),

    # Code — JetBrains Mono (variable wght; instance at 400 and 700; preserve liga/calt for code)
    Cut("code", "jetbrains-mono", "JetBrainsMono[wght].ttf", 400, False,
        UNICODES_MONO_CODE, ("kern", "liga", "calt"),
        "jetbrains-mono-400.woff2"),
    Cut("code", "jetbrains-mono", "JetBrainsMono[wght].ttf", 700, False,
        UNICODES_MONO_CODE, ("kern", "liga", "calt"),
        "jetbrains-mono-700.woff2"),

    # Civic — IM Fell English (static cuts; no instancing needed).
    # Marini's source naming: IMFeENrm28P (Roman) / IMFeENit28P (Italic).
    Cut("civic", "im-fell", "IMFeENrm28P.ttf", 400, False,
        UNICODES_LATIN_EXTENDED_ITALIAN, ("kern", "liga", "dlig", "smcp", "c2sc"),
        "im-fell-400.woff2"),
    Cut("civic", "im-fell", "IMFeENit28P.ttf", 400, True,
        UNICODES_LATIN_EXTENDED_ITALIAN, ("kern", "liga", "dlig", "smcp", "c2sc"),
        "im-fell-400-italic.woff2"),
]


# ---------------------------------------------------------------------------
# Subsetting pipeline
# ---------------------------------------------------------------------------


def is_variable(font: TTFont) -> bool:
    return "fvar" in font


def instance_variable(font: TTFont, weight: int, italic: bool) -> TTFont:
    """Instance a variable font at the requested weight (and slnt=-10 for italic
    if the font has a slnt axis; otherwise italic is selected by source file)."""
    axes = {axis.axisTag for axis in font["fvar"].axes}
    location: dict[str, float] = {}
    if "wght" in axes:
        location["wght"] = float(weight)
    if "opsz" in axes:
        # Optical-size: 14 is a sensible default for body/nav usage; titles
        # would use larger but we ship one cut, so 14 covers UI + body well.
        location["opsz"] = 14.0
    if italic and "slnt" in axes:
        # Inter uses slnt; not all variable italics use this axis. Most variable
        # italics ship as a separate "*-Italic[wght].ttf" file (Vollkorn,
        # Crimson Pro, JetBrains Mono pattern), in which case `italic` flag here
        # doesn't need slnt manipulation — the source file IS the italic.
        location["slnt"] = -10.0
    return instancer.instantiateVariableFont(font, location)


def subset_one(cut: Cut, sources_root: Path, subsets_root: Path) -> tuple[Path, int, int]:
    src_path = sources_root / cut.family / cut.source_file
    if not src_path.exists():
        raise FileNotFoundError(f"source missing: {src_path} (run procure.py first)")

    font = TTFont(src_path)
    if is_variable(font):
        font = instance_variable(font, cut.weight, cut.italic)

    options = ft_subset.Options()
    options.flavor = "woff2"
    options.with_zopfli = False  # zopfli only helps for woff (gzip), not woff2
    options.desubroutinize = False  # keep CFF subroutines compact
    options.hinting = True
    options.legacy_kern = True
    options.notdef_outline = True
    options.recommended_glyphs = True
    options.layout_features = ["*"]  # we'll narrow via layout_features explicit list below
    # narrow to only-want list:
    options.layout_features = list(cut.layout_features) + ["mark", "mkmk", "ccmp"]
    options.name_IDs = ["*"]
    options.name_legacy = True
    options.glyph_names = False
    options.symbol_cmap = False
    options.legacy_cmap = False
    options.no_subset_tables += ["MATH"]

    glyphs_before = font.getGlyphOrder()
    subsetter = ft_subset.Subsetter(options=options)
    subsetter.populate(unicodes=ft_subset.parse_unicodes(cut.profile_unicodes))
    subsetter.subset(font)

    out_path = subsets_root / cut.surface / cut.output_name
    out_path.parent.mkdir(parents=True, exist_ok=True)
    font.flavor = "woff2"
    font.save(out_path)

    glyphs_after = font.getGlyphOrder()
    return out_path, len(glyphs_before), len(glyphs_after)


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    here = Path(__file__).resolve().parent
    typography_root = here.parent
    sources_root = typography_root / "sources"
    subsets_root = typography_root / "subsets"

    if not sources_root.exists():
        print(f"sources/ missing -> run `python {here / 'procure.py'}` first", file=sys.stderr)
        return 1

    print(f"subsetting {len(INVENTORY)} cuts from {sources_root} -> {subsets_root}\n")
    rows: list[tuple[str, int, int, int]] = []
    failures: list[str] = []
    for cut in INVENTORY:
        label = f"{cut.surface}/{cut.output_name}"
        try:
            out_path, glyphs_before, glyphs_after = subset_one(cut, sources_root, subsets_root)
            size = out_path.stat().st_size
            rows.append((label, glyphs_before, glyphs_after, size))
            print(f"  OK   {label:<40s} {glyphs_after:>4d} glyphs   {size/1024:>5.1f} KB")
        except Exception as exc:  # noqa: BLE001
            msg = f"{label} :: {exc}"
            failures.append(msg)
            print(f"  FAIL {msg}", file=sys.stderr)

    # checksums for all produced subsets
    checksums_path = here / "subset-checksums.txt"
    with checksums_path.open("w", encoding="utf-8") as f:
        f.write("# SHA-256 of WOFF2 subsets (subset.py output)\n")
        f.write("# format: <hex>  <surface>/<file>\n\n")
        for surface_dir in sorted(subsets_root.iterdir()):
            if not surface_dir.is_dir():
                continue
            for woff2 in sorted(surface_dir.glob("*.woff2")):
                rel = f"{surface_dir.name}/{woff2.name}"
                f.write(f"{sha256_of(woff2)}  {rel}\n")

    print(f"\nchecksums recorded -> {checksums_path}")
    if failures:
        print(f"\n{len(failures)} failure(s):", file=sys.stderr)
        for fail in failures:
            print(f"  - {fail}", file=sys.stderr)
        return 1
    total_kb = sum(size for _, _, _, size in rows) / 1024
    print(f"\nsubset.py: OK ({len(rows)} cuts; {total_kb:.1f} KB total)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
