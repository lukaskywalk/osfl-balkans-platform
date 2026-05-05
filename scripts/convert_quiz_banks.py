#!/usr/bin/env python3
"""
convert_quiz_banks.py
Converts M3 Markdown quiz bank files to JSON for the Hugo quiz engine.

Handles two formats:
  Format A (hr, bs, cnr, sr-latn, mk):
    **N. Question text?**
    a) Option / а) Option (Cyrillic for mk)
    b) Option
    c) Option
    d) Option
    **Odgovor: b)** or **Одговор: б)**

  Format B (sq — Albanian):
    **Pyetja N.** Question text?
    a) Option  ...  d) Option
    Answer table at end: | N | **c)** | explanation |
"""

import json
import re
import shutil
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
REPO_DIR   = SCRIPT_DIR.parent
M3_DIR     = REPO_DIR.parent / "M3-Localization" / "quiz-banks"
OUT_DIR    = REPO_DIR / "data" / "quiz-banks"

# M3 file lang code → Hugo data folder
LANG_MAP = {
    "hr":      "hr",
    "sr-Latn": "sr-latn",
    "bs":      "bs",
    "cnr":     "cnr",
    "mk":      "mk",
    "sq":      "sq",
}

# Cyrillic option letters (Macedonian) → 0-based index
CYRL_LETTER = {"а": 0, "б": 1, "в": 2, "г": 3}
LATIN_LETTER = {"a": 0, "b": 1, "c": 2, "d": 3}

# ── Answer keyword patterns ──────────────────────────────────────────────────
# Matches: **Odgovor: b)** or **Одговор: б)** (with optional explanation after)
INLINE_ANSWER_RE = re.compile(
    r"\*\*(?:Odgovor|Одговор|Pravilno|Tačno|Përgjigja)\s*:\s*([a-dа-г])\)",
    re.IGNORECASE
)

# ── Question patterns ────────────────────────────────────────────────────────
# Format A: **1. Question text?**  or  **1. Question text**
QUESTION_A_RE = re.compile(r"^\*\*(\d+)\.\s+(.+?)\*\*\s*$")

# Format B (Albanian): **Pyetja 1.** Question text?
QUESTION_B_RE = re.compile(r"^\*\*Pyetja\s+(\d+)\.\*\*\s*(.+)$")

# Option line: a) text  or  а) text (Cyrillic)
OPTION_RE = re.compile(r"^([a-dа-г])\)\s+(.+)$")

# Albanian answer table row: | 3 | **c)** | explanation |
SQ_ANSWER_RE = re.compile(r"^\|\s*(\d+)\s*\|\s*\*\*([a-d])\)\*\*")


def letter_to_index(letter):
    l = letter.lower()
    if l in LATIN_LETTER:
        return LATIN_LETTER[l]
    if l in CYRL_LETTER:
        return CYRL_LETTER[l]
    return 0


def parse_format_a(lines, lang):
    """Parse inline-answer format (hr, bs, cnr, sr-latn, mk)."""
    questions = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        m = QUESTION_A_RE.match(line)
        if not m:
            i += 1
            continue

        q_num  = int(m.group(1))
        q_text = m.group(2).strip()
        options = []
        correct = 0
        i += 1

        # Collect options and answer
        while i < len(lines):
            l = lines[i].strip()

            opt_m = OPTION_RE.match(l)
            if opt_m:
                options.append(opt_m.group(2).strip())
                i += 1
                continue

            ans_m = INLINE_ANSWER_RE.search(l)
            if ans_m:
                correct = letter_to_index(ans_m.group(1))
                i += 1
                break

            # blank line or separator — keep scanning
            if l == "" or l == "---":
                i += 1
                continue

            # next question starts — stop
            if QUESTION_A_RE.match(l):
                break

            i += 1

        if len(options) >= 2:
            questions.append({
                "question": q_text,
                "options": options,
                "correct": correct
            })

    return questions


def parse_format_b(lines):
    """Parse Albanian format with answer table at end."""
    questions = []
    sq_answers = {}

    # First pass: collect answer table
    in_table = False
    for line in lines:
        if "Përgjigjet e sakta" in line:
            in_table = True
            continue
        if in_table:
            m = SQ_ANSWER_RE.match(line.strip())
            if m:
                sq_answers[int(m.group(1))] = letter_to_index(m.group(2))

    # Second pass: collect questions and options
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        m = QUESTION_B_RE.match(line)
        if not m:
            i += 1
            continue

        q_num  = int(m.group(1))
        q_text = m.group(2).strip()
        options = []
        i += 1

        while i < len(lines):
            l = lines[i].strip()
            opt_m = OPTION_RE.match(l)
            if opt_m:
                options.append(opt_m.group(2).strip())
                i += 1
                continue
            if l == "" or l == "---":
                i += 1
                if len(options) >= 2:
                    break
                continue
            if QUESTION_B_RE.match(l):
                break
            i += 1

        if len(options) >= 2:
            questions.append({
                "question": q_text,
                "options": options,
                "correct": sq_answers.get(q_num, 0)
            })

    return questions


def convert_file(src_path, hugo_lang, mod_num):
    lines = src_path.read_text(encoding="utf-8").splitlines()
    is_albanian = hugo_lang == "sq"

    if is_albanian:
        # Try inline format first (modules 4–11); fall back to table format (modules 1–3)
        questions = parse_format_a(lines, hugo_lang)
        if not questions:
            questions = parse_format_b(lines)
    else:
        questions = parse_format_a(lines, hugo_lang)

    return {
        "module": mod_num,
        "lang": hugo_lang,
        "questions": questions
    }


total = 0
for m3_lang, hugo_lang in LANG_MAP.items():
    out_lang_dir = OUT_DIR / hugo_lang
    out_lang_dir.mkdir(parents=True, exist_ok=True)

    for mod_num in range(1, 12):
        src = M3_DIR / f"Module-{mod_num:02d}.{m3_lang}.quiz.md"
        if not src.exists():
            print(f"  SKIP  {src.name} (not found)")
            continue

        data = convert_file(src, hugo_lang, mod_num)
        out = out_lang_dir / f"Module-{mod_num:02d}.json"
        out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"  ✓  {src.name} → data/quiz-banks/{hugo_lang}/Module-{mod_num:02d}.json  ({len(data['questions'])} questions)")
        total += 1

# sr-Cyrl: copy sr-Latn JSON (same content, Cyrillic transliteration deferred to later)
sr_latn_dir = OUT_DIR / "sr-latn"
sr_cyrl_dir = OUT_DIR / "sr-cyrl"
sr_cyrl_dir.mkdir(parents=True, exist_ok=True)
copied = 0
for f in sorted(sr_latn_dir.glob("*.json")):
    dst = sr_cyrl_dir / f.name
    if not dst.exists():
        data = json.loads(f.read_text(encoding="utf-8"))
        data["lang"] = "sr-cyrl"
        dst.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        copied += 1
if copied:
    print(f"\n  ✓  sr-cyrl: copied {copied} quiz banks from sr-latn (transliteration deferred)")

print(f"\nDone — {total} quiz bank files converted, {copied} copied for sr-cyrl.")
