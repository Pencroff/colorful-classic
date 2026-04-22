#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
NAME="colorful-classic"
OUT="$HERE/${NAME}.jar"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/META-INF" "$STAGE/themes" "$STAGE/colorscheme"
cp "$HERE/META-INF/plugin.xml"            "$STAGE/META-INF/plugin.xml"
cp "$HERE/${NAME}.theme.json"             "$STAGE/themes/${NAME}.theme.json"
cp "$HERE/${NAME}.icls"                   "$STAGE/colorscheme/${NAME}.xml"

rm -f "$OUT"
(cd "$STAGE" && zip -qr "$OUT" META-INF themes colorscheme)

echo "built: $OUT"
