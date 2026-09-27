/**
 * Matches catalogue entries in lib/products.ts against the scraped
 * image/slug pairs, downloads the best match for each, and writes a
 * normalised WebP into public/imgs/products/.
 *
 * Run: node scripts/fetch-product-images.js
 * Then: node scripts/apply-product-images.js  (writes the paths into the data)
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const pairs = JSON.parse(fs.readFileSync(".work/sos-products.json", "utf8"));
const OUT_DIR = "public/imgs/products";
fs.mkdirSync(OUT_DIR, { recursive: true });

/* ---------------------------------------------------------------- catalogue */
// Parsed straight out of the TS source so the two can't drift apart.
const src = fs.readFileSync("lib/products.ts", "utf8");
const entryRe =
  /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g;

const catalogue = [];
let m;
while ((m = entryRe.exec(src)) !== null) {
  catalogue.push({ slug: m[1], name: m[2], brand: m[3], category: m[4] });
}

/* ------------------------------------------------------------------ matching */
const STOP = new Set([
  "the", "and", "series", "printer", "sale", "rental", "for", "mfp",
  "business", "laptop", "pro", "advance", "enterprise", "color", "colour",
]);

function tokens(str) {
  const base = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((t) => t.length > 1 && !STOP.has(t));

  // Also split letter/digit runs, so "c3004exsp" yields "c3004" and "exsp"
  // and can line up with a slug that separates them.
  const extra = [];
  for (const t of base) {
    const parts = t.match(/[a-z]+\d+|\d+[a-z]+|\d+|[a-z]+/g) || [];
    if (parts.length > 1) extra.push(...parts.filter((p) => p.length > 1));
  }
  return [...new Set([...base, ...extra])];
}

/** Model tokens carry digits — those are what actually identify a machine. */
function score(productTokens, slugTokens) {
  let total = 0;
  for (const t of productTokens) {
    if (slugTokens.includes(t)) total += /\d/.test(t) ? 4 : 1;
  }
  return total;
}

const targets = pairs.map((p) => ({
  ...p,
  tokens: tokens(p.href.split("/").pop()),
}));

// Source pages are printers/copiers only — matching a toner or a laptop
// against them can only ever attach the wrong photo.
const MACHINE_CATEGORIES = new Set(["printers-copiers", "rental"]);

const matches = [];
for (const product of catalogue) {
  if (!MACHINE_CATEGORIES.has(product.category)) continue;
  const pt = tokens(`${product.brand} ${product.name}`);
  let best = null;
  let bestScore = 0;

  for (const t of targets) {
    const s = score(pt, t.tokens);
    if (s > bestScore) {
      bestScore = s;
      best = t;
    }
  }

  // Require at least one numeric model-token hit, so we never attach a
  // photo of the wrong machine just because the brand name lined up.
  if (best && bestScore >= 4) {
    matches.push({ product, target: best, score: bestScore });
  }
}

console.log(`matched ${matches.length}/${catalogue.length} products`);

/* --------------------------------------------------------------- downloading */
(async () => {
  const applied = {};
  let ok = 0;
  let failed = 0;

  for (const { product, target, score: s } of matches) {
    const outPath = path.join(OUT_DIR, `${product.slug}.webp`);
    try {
      const res = await fetch(target.img, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());

      await sharp(buf)
        .resize(800, 800, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .webp({ quality: 88 })
        .toFile(outPath);

      applied[product.slug] = `/imgs/products/${product.slug}.webp`;
      ok++;
      console.log(`  ok  ${product.slug}  <- ${target.href.split("/").pop()} (${s})`);
    } catch (err) {
      failed++;
      console.log(`  !!  ${product.slug}: ${err.message}`);
    }
  }

  fs.writeFileSync(".work/applied-images.json", JSON.stringify(applied, null, 2));
  console.log(`\ndownloaded ${ok}, failed ${failed}`);
})();
