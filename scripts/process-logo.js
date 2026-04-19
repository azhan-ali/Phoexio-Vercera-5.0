/**
 * One-time script: converts /public/phoenix-logo.jpg → /public/phoenix-logo.png
 * - Trims surrounding white margin
 * - Removes white background (smooth falloff so phoenix edges stay clean)
 *
 * Run: node scripts/process-logo.js
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = path.join(__dirname, "..", "public", "phoenix-logo.jpg");
const OUT = path.join(__dirname, "..", "public", "phoenix-logo.png");

(async () => {
  if (!fs.existsSync(SRC)) {
    console.error("Source not found:", SRC);
    process.exit(1);
  }

  // Step 1: trim white borders
  const trimmed = await sharp(SRC)
    .trim({ threshold: 10 })
    .toBuffer();

  // Step 2: load as raw RGBA and zero out white pixels
  const img = sharp(trimmed).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Processing ${width}x${height} (${channels} channels)`);

  // Thresholds
  const FULL_WHITE = 245; // pixels >= this become fully transparent
  const SOFT_WHITE = 200; // smooth falloff between SOFT and FULL

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minC = Math.min(r, g, b);

    if (minC >= FULL_WHITE) {
      data[i + 3] = 0; // fully transparent
    } else if (minC >= SOFT_WHITE) {
      // linear falloff so edges blend nicely
      const t = (minC - SOFT_WHITE) / (FULL_WHITE - SOFT_WHITE);
      data[i + 3] = Math.round(255 * (1 - t));
    }
  }

  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  const before = fs.statSync(SRC).size;
  const after = fs.statSync(OUT).size;
  console.log(
    `Done → ${OUT} (${(after / 1024).toFixed(1)} KB, was ${(before / 1024).toFixed(1)} KB JPG)`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
