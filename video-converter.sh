#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <source-folder> <destination-folder>"
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is not installed."
  exit 1
fi

if [ ! -d "$1" ]; then
  echo "Error: source folder does not exist: $1"
  exit 1
fi

SOURCE_DIR="$(cd "$1" && pwd)"
mkdir -p "$2"
DEST_DIR="$(cd "$2" && pwd)"

while IFS= read -r -d '' SOURCE_PATH; do
  RELATIVE_PATH="${SOURCE_PATH#"$SOURCE_DIR"/}"
  DEST_PATH="$DEST_DIR/$RELATIVE_PATH"

  mkdir -p "$(dirname "$DEST_PATH")"

  case "$SOURCE_PATH" in
    *.mp4 | *.MP4)
      echo "Converting: $RELATIVE_PATH"

      ffmpeg \
        -nostdin \
        -hide_banner \
        -loglevel error \
        -y \
        -i "$SOURCE_PATH" \
        -t 8 \
        -vf "scale='min(540,iw)':-2" \
        -c:v libx264 \
        -preset medium \
        -crf 26 \
        -pix_fmt yuv420p \
        -movflags +faststart \
        -an \
        "$DEST_PATH"
      ;;

    *)
      echo "Copying: $RELATIVE_PATH"
      cp -p "$SOURCE_PATH" "$DEST_PATH"
      ;;
  esac
done < <(find "$SOURCE_DIR" -type f -print0)

echo
echo "Created optimized copy at:"
echo "$DEST_DIR"