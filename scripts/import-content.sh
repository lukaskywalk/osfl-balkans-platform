#!/usr/bin/env bash
# import-content.sh
# Copies M3 Markdown content into the Hugo content directory.
# Run once from the repo root: bash scripts/import-content.sh
#
# Expects M3 content at: ../M3-Localization/
# Adjust M3_DIR if your directory layout differs.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
M3_DIR="$(dirname "$REPO_DIR")/M3-Localization"

if [ ! -d "$M3_DIR" ]; then
  echo "ERROR: M3-Localization directory not found at: $M3_DIR"
  echo "Update M3_DIR in this script to point to your M3 content."
  exit 1
fi

echo "Importing from: $M3_DIR"
echo "Destination:    $REPO_DIR/content/"

# Language code map: M3 folder → Hugo content folder
declare -A LANGS=(
  ["hr"]="hr"
  ["sr-Latn"]="sr-latn"
  ["sr-Cyrl"]="sr-cyrl"
  ["bs"]="bs"
  ["cnr"]="cnr"
  ["mk"]="mk"
  ["sq"]="sq"
)

for M3_LANG in "${!LANGS[@]}"; do
  HUGO_LANG="${LANGS[$M3_LANG]}"
  SRC="$M3_DIR/$M3_LANG"
  DST="$REPO_DIR/content/$HUGO_LANG/modules"

  if [ ! -d "$SRC" ]; then
    echo "SKIP: $SRC not found"
    continue
  fi

  mkdir -p "$DST"

  for FILE in "$SRC"/Module-*.md; do
    [ -f "$FILE" ] || continue
    BASENAME=$(basename "$FILE")
    # Convert Module-01.hr.md → module-01.md
    SLUG=$(echo "$BASENAME" | sed 's/Module-/module-/; s/\.[a-zA-Z-]*\.md$/.md/')
    DST_FILE="$DST/$SLUG"

    # Extract module number for front matter injection
    MOD_NUM=$(echo "$SLUG" | grep -o '[0-9][0-9]')

    # Add Hugo front matter if not present
    if ! head -1 "$FILE" | grep -q "^---"; then
      TITLE=$(head -5 "$FILE" | grep "^# " | head -1 | sed 's/^# //')
      PATH_TAG="foundation"
      MOD_INT=$((10#$MOD_NUM))
      if [ "$MOD_INT" -ge 5 ] && [ "$MOD_INT" -le 8 ]; then PATH_TAG="intermediate"; fi
      if [ "$MOD_INT" -ge 9 ]; then PATH_TAG="advanced"; fi

      {
        echo "---"
        echo "title: \"${TITLE:-Module $MOD_NUM}\""
        echo "module_number: $MOD_INT"
        echo "path: \"$PATH_TAG\""
        echo "lang: \"$HUGO_LANG\""
        echo "quiz_file: \"Module-$MOD_NUM\""
        echo "weight: $MOD_INT"
        echo "---"
        echo ""
        cat "$FILE"
      } > "$DST_FILE"
    else
      cp "$FILE" "$DST_FILE"
    fi

    echo "  ✓ $M3_LANG/$BASENAME → content/$HUGO_LANG/modules/$SLUG"
  done

  # Create _index.md for the modules section if missing
  INDEX="$REPO_DIR/content/$HUGO_LANG/modules/_index.md"
  if [ ! -f "$INDEX" ]; then
    echo "---" > "$INDEX"
    echo "title: \"Modules\"" >> "$INDEX"
    echo "---" >> "$INDEX"
  fi
done

# Create language _index.md files
for HUGO_LANG in hr sr-latn sr-cyrl bs cnr mk sq; do
  INDEX="$REPO_DIR/content/$HUGO_LANG/_index.md"
  if [ ! -f "$INDEX" ]; then
    echo "---" > "$INDEX"
    echo "title: \"OSFL Balkans\"" >> "$INDEX"
    echo "---" >> "$INDEX"
  fi
done

echo ""
echo "Import complete."
echo "Run 'hugo server' to preview the site."
