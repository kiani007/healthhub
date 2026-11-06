#!/bin/sh
# Builds responsive variants of the client photos in img/. Needs ffmpeg with libwebp.
set -e
cd "$(dirname "$0")/../img"
for name in hero process kit portrait; do
  ffmpeg -loglevel error -y -i "$name.jpg" -vf scale=800:-2 -q:v 4 "$name-800.jpg"
  ffmpeg -loglevel error -y -i "$name.jpg" -vf scale=800:-2 -c:v libwebp -quality 80 "$name-800.webp"
  ffmpeg -loglevel error -y -i "$name.jpg" -c:v libwebp -quality 80 "$name-1400.webp"
done
# Face crop of Dr. Kris for the hero byline
ffmpeg -loglevel error -y -i portrait.jpg -vf "crop=460:460:490:170,scale=160:160" -q:v 3 kris-face.jpg
