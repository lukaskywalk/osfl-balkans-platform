#!/usr/bin/env bash
# Deploy OSFL Balkans platform
# Run from repo root: bash scripts/deploy.sh
set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="/var/www/drugakozmicka/osflbalkans"
HUGO_BIN="$HOME/bin/hugo"

echo "[1/3] Pulling latest changes..."
git -C "$REPO_DIR" pull

echo "[2/3] Building site..."
"$HUGO_BIN" --minify --source "$REPO_DIR" --destination "$BUILD_DIR"

echo "[3/3] Done — site live at $BUILD_DIR"
