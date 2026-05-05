#!/usr/bin/env python3
"""
import_content.py
Copies M3 Markdown modules into the Hugo content directories,
injecting front matter if not already present.
"""

import os
import re
import shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
REPO_DIR   = SCRIPT_DIR.parent
M3_DIR     = REPO_DIR.parent / "M3-Localization"

# M3 folder name → Hugo content folder name
LANG_MAP = {
    "hr":      "hr",
    "sr-Latn": "sr-latn",
    "sr-Cyrl": "sr-cyrl",
    "bs":      "bs",
    "cnr":     "cnr",
    "mk":      "mk",
    "sq":      "sq",
}

# Module number → learning path
def path_for(n):
    if n <= 4:  return "foundation"
    if n <= 8:  return "intermediate"
    return "advanced"

def extract_title(text):
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("# "):
            return line[2:].strip()
    return ""

def inject_front_matter(text, hugo_lang, mod_num):
    title = extract_title(text)
    module_path  = path_for(mod_num)
    fm = f"""---
title: "{title}"
module_number: {mod_num}
module_path: "{module_path}"
module_lang: "{hugo_lang}"
quiz_file: "Module-{mod_num:02d}"
weight: {mod_num}
---

"""
    return fm + text

if not M3_DIR.exists():
    print(f"ERROR: M3-Localization not found at {M3_DIR}")
    raise SystemExit(1)

print(f"Importing from : {M3_DIR}")
print(f"Destination    : {REPO_DIR}/content/\n")

total = 0
for m3_lang, hugo_lang in LANG_MAP.items():
    src = M3_DIR / m3_lang
    dst = REPO_DIR / "content" / hugo_lang / "modules"

    if not src.exists():
        print(f"  SKIP: {src} not found")
        continue

    dst.mkdir(parents=True, exist_ok=True)

    for src_file in sorted(src.glob("Module-*.md")):
        basename = src_file.name                          # Module-01.hr.md
        # strip language suffix: Module-01.hr.md → module-01.md
        slug = re.sub(r"Module-", "module-", basename)
        slug = re.sub(r"\.[a-zA-Z-]+\.md$", ".md", slug)
        dst_file = dst / slug

        # Extract module number
        m = re.search(r"(\d+)", slug)
        mod_num = int(m.group(1)) if m else 0

        text = src_file.read_text(encoding="utf-8")

        # Inject front matter only if not already present
        if not text.lstrip().startswith("---"):
            text = inject_front_matter(text, hugo_lang, mod_num)

        dst_file.write_text(text, encoding="utf-8")
        print(f"  ✓  {m3_lang}/{basename} → content/{hugo_lang}/modules/{slug}")
        total += 1

    # _index.md for the modules section
    idx = REPO_DIR / "content" / hugo_lang / "modules" / "_index.md"
    if not idx.exists():
        idx.write_text("---\ntitle: \"Modules\"\n---\n", encoding="utf-8")

# Language root _index.md files
for hugo_lang in LANG_MAP.values():
    idx = REPO_DIR / "content" / hugo_lang / "_index.md"
    if not idx.exists():
        idx.write_text("---\ntitle: \"OSFL Balkans\"\n---\n", encoding="utf-8")

print(f"\nDone — {total} module files imported.")
