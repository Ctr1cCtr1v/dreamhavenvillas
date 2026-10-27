#!/bin/bash
# =====================================================================
#  PREP PHOTOS for the website
#
#  1. Put photos in a folder inside photo-inbox/ named after where they
#     belong on the site, e.g.:
#         photo-inbox/pool/IMG_1234.HEIC
#         photo-inbox/bedrooms/Primary Suite.jpg
#     Folder names: hero exterior pool living kitchen bedrooms game-room
#                   resort area   (any new name creates a new folder)
#  2. Run:   tools/prep-photos.sh
#
#  Each photo is rotated upright, resized to max 2800px, saved as JPEG,
#  stripped of hidden metadata (incl. GPS location), renamed web-safe
#  ("Primary Suite.jpg" → "primary-suite.jpg"), and placed in
#  assets/images/<folder>/. Originals move to photo-inbox/_done/.
#  Hugo then makes all the phone/desktop sizes automatically.
# =====================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

INBOX=photo-inbox
MAX=2800
QUALITY=85

command -v magick >/dev/null || { echo "Needs ImageMagick:  brew install imagemagick"; exit 1; }

count=0
shopt -s nullglob nocaseglob
for dir in "$INBOX"/*/; do
  folder=$(basename "$dir")
  [ "$folder" = "_done" ] && continue
  mkdir -p "assets/images/$folder" "$INBOX/_done/$folder"
  for f in "$dir"*.{jpg,jpeg,png,heic,heif,webp,tif,tiff}; do
    name=$(basename "${f%.*}" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-|-$//g')
    out="assets/images/$folder/$name.jpg"
    magick "$f" -auto-orient -resize "${MAX}x${MAX}>" -strip -colorspace sRGB -quality $QUALITY "$out"
    mv "$f" "$INBOX/_done/$folder/"
    echo "✓ $folder/$name.jpg"
    count=$((count + 1))
  done
done

loose=("$INBOX"/*.{jpg,jpeg,png,heic,heif,webp})
[ ${#loose[@]} -gt 0 ] && echo "⚠ ${#loose[@]} photo(s) sitting loose in $INBOX/ were skipped — put them in a folder (e.g. $INBOX/pool/)."

echo "Done: $count photo(s) prepared."
