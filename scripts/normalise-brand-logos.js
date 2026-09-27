/**
 * Fits downloaded logo artwork onto the site's standard 336x96 brand canvas,
 * so new logos line up with the sixteen already in public/imgs/brands.
 * Run: node scripts/normalise-brand-logos.js
 */
const sharp = require("sharp");
const fs = require("fs");

const CANVAS_W = 336;
const CANVAS_H = 96;
const PAD = 8; // breathing room inside the tile

const jobs = [
  { src: ".work/Microsoft_365_logo.svg.png", out: "microsoft-365.png" },
  { src: ".work/Google_Workspace_Logo.svg.png", out: "google-workspace.png" },
  { src: ".work/Fortinet_logo.svg.png", out: "fortinet.png" },
  { src: ".work/Veeam_logo.svg.png", out: "veeam.png" },
  { src: ".work/Ubiquiti_Logo_Horizontal.png.png", out: "ubiquiti.png" },
];

(async () => {
  for (const { src, out } of jobs) {
    if (!fs.existsSync(src)) {
      console.log("missing:", src);
      continue;
    }

    // Trim surrounding transparency/whitespace first, so every logo is
    // scaled by its actual artwork rather than by incidental padding.
    const trimmed = await sharp(src).trim({ threshold: 10 }).toBuffer();

    const fitted = await sharp(trimmed)
      .resize(CANVAS_W - PAD * 2, CANVAS_H - PAD * 2, {
        fit: "inside",
        withoutEnlargement: false,
      })
      .toBuffer();

    await sharp({
      create: {
        width: CANVAS_W,
        height: CANVAS_H,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: fitted, gravity: "center" }])
      .png()
      .toFile(`public/imgs/brands/${out}`);

    const meta = await sharp(`public/imgs/brands/${out}`).metadata();
    console.log(`  ${out}  ${meta.width}x${meta.height}`);
  }
})();
