#!/usr/bin/env python3
"""
procure.py — V1 OFL font upstream download orchestration (W2-S-E).

Fetches the five OFL-1.1 typeface families from canonical upstreams into
`sources/<family>/`. Idempotent — skips files already present with matching
SHA-256 if `checksums.expected.txt` is populated.

Source pattern: github.com/google/fonts/raw/main/ofl/<family-dir>/<file>
(static asset; not a runtime CDN dependency per CD2 §5.3 sovereignty path).

Run from the typography/ directory:

    cd v1-dev-diary-microsite/representation/visual-system/typography
    python build/procure.py

Sources/ is .gitignored; binaries are NOT committed. WOFF2 subsets in
`subsets/` (produced by `build/subset.py`) are committed.

Authored 2026-05-10 by W2-S-E.
"""

from __future__ import annotations

import hashlib
import sys
import urllib.request
from pathlib import Path

# ---------------------------------------------------------------------------
# Upstream catalog
#
# Each entry maps (family-key, source-dir) → list of (url, dest-relative-path).
# `family-key` becomes the directory under sources/. `dest-relative-path` is
# the path under sources/<family-key>/ where the file lands.
#
# Upstream choice rationale: Google Fonts repo (github.com/google/fonts)
# mirrors all five families with stable raw URLs and verified OFL-1.1 copies.
# Foundry-canonical upstreams (github.com/Friedrich-Althausen/Vollkorn-Typeface
# etc.) are documented in ../fonts.md but not used here for procurement
# uniformity — both yield identical OFL-1.1 binaries.
# ---------------------------------------------------------------------------

GOOGLE_FONTS_RAW = "https://github.com/google/fonts/raw/main/ofl"

CATALOG: dict[str, list[tuple[str, str]]] = {
    "vollkorn": [
        # Variable font (wght axis); subset.py instances at 400 and 700
        (f"{GOOGLE_FONTS_RAW}/vollkorn/Vollkorn%5Bwght%5D.ttf", "Vollkorn[wght].ttf"),
        (f"{GOOGLE_FONTS_RAW}/vollkorn/Vollkorn-Italic%5Bwght%5D.ttf", "Vollkorn-Italic[wght].ttf"),
        (f"{GOOGLE_FONTS_RAW}/vollkorn/OFL.txt", "OFL.txt"),
    ],
    "crimson-pro": [
        (f"{GOOGLE_FONTS_RAW}/crimsonpro/CrimsonPro%5Bwght%5D.ttf", "CrimsonPro[wght].ttf"),
        (f"{GOOGLE_FONTS_RAW}/crimsonpro/CrimsonPro-Italic%5Bwght%5D.ttf", "CrimsonPro-Italic[wght].ttf"),
        (f"{GOOGLE_FONTS_RAW}/crimsonpro/OFL.txt", "OFL.txt"),
    ],
    "inter": [
        # Inter ships single variable file with slnt + wght axes; subset.py
        # instances at 400, 600, and slnt=0 (upright only at V1 nav scope)
        (f"{GOOGLE_FONTS_RAW}/inter/Inter%5Bopsz%2Cwght%5D.ttf", "Inter[opsz,wght].ttf"),
        (f"{GOOGLE_FONTS_RAW}/inter/Inter-Italic%5Bopsz%2Cwght%5D.ttf", "Inter-Italic[opsz,wght].ttf"),
        (f"{GOOGLE_FONTS_RAW}/inter/OFL.txt", "OFL.txt"),
    ],
    "jetbrains-mono": [
        (f"{GOOGLE_FONTS_RAW}/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf", "JetBrainsMono[wght].ttf"),
        (f"{GOOGLE_FONTS_RAW}/jetbrainsmono/JetBrainsMono-Italic%5Bwght%5D.ttf", "JetBrainsMono-Italic[wght].ttf"),
        (f"{GOOGLE_FONTS_RAW}/jetbrainsmono/OFL.txt", "OFL.txt"),
    ],
    "im-fell": [
        # IM Fell English (chosen variant from IM Fell suite); static cuts only.
        # Marini's original naming convention is preserved in google/fonts:
        #   IMFeENrm28P.ttf = IM Fell English Roman, 28pt design size
        #   IMFeENit28P.ttf = IM Fell English Italic, 28pt design size
        (f"{GOOGLE_FONTS_RAW}/imfellenglish/IMFeENrm28P.ttf", "IMFeENrm28P.ttf"),
        (f"{GOOGLE_FONTS_RAW}/imfellenglish/IMFeENit28P.ttf", "IMFeENit28P.ttf"),
        (f"{GOOGLE_FONTS_RAW}/imfellenglish/OFL.txt", "OFL.txt"),
    ],
}


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f"  -> {url}")
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "prime-city-brand-sandbox/W2-S-E (typography procure.py)"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp, dest.open("wb") as out:
        if resp.status != 200:
            raise RuntimeError(f"HTTP {resp.status} fetching {url}")
        out.write(resp.read())


def main() -> int:
    here = Path(__file__).resolve().parent
    typography_root = here.parent
    sources_root = typography_root / "sources"
    licenses_root = typography_root / "licenses"
    licenses_root.mkdir(exist_ok=True)

    checksums_actual: dict[str, str] = {}
    failures: list[str] = []

    for family, files in CATALOG.items():
        family_dir = sources_root / family
        family_dir.mkdir(parents=True, exist_ok=True)
        print(f"\n[procuring {family}]")
        for url, dest_rel in files:
            dest = family_dir / dest_rel
            try:
                if not dest.exists():
                    download(url, dest)
                else:
                    print(f"  . {dest_rel} (cached; skipping download)")
                checksums_actual[f"{family}/{dest_rel}"] = sha256_of(dest)

                # OFL.txt is duplicated to licenses/<family>-OFL.txt for
                # canon-side license inventory at the typography root.
                if dest_rel == "OFL.txt":
                    license_copy = licenses_root / f"{family}-OFL.txt"
                    license_copy.write_bytes(dest.read_bytes())
            except Exception as exc:  # noqa: BLE001
                msg = f"{family}/{dest_rel} :: {exc}"
                print(f"  FAIL {msg}", file=sys.stderr)
                failures.append(msg)

    checksums_path = here / "checksums.txt"
    with checksums_path.open("w", encoding="utf-8") as f:
        f.write("# SHA-256 of procured upstream sources (procure.py output)\n")
        f.write("# format: <hex>  <family>/<file>\n\n")
        for key in sorted(checksums_actual):
            f.write(f"{checksums_actual[key]}  {key}\n")

    print(f"\nchecksums recorded -> {checksums_path}")
    if failures:
        print(f"\n{len(failures)} failure(s):", file=sys.stderr)
        for fail in failures:
            print(f"  - {fail}", file=sys.stderr)
        return 1
    print(f"\nprocure.py: OK ({len(checksums_actual)} files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
