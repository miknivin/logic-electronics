/**
 * Writes `image:` paths into lib/products.ts for every product that has a
 * downloaded photo in public/imgs/products/<slug>.webp.
 * Run: node scripts/apply-product-images.js
 */
const fs = require("fs");

const file = "lib/products.ts";
let src = fs.readFileSync(file, "utf8");

const available = new Set(
  fs
    .readdirSync("public/imgs/products")
    .filter((f) => f.endsWith(".webp"))
    .map((f) => f.replace(/\.webp$/, "")),
);

let added = 0;
let skipped = 0;

// Rewrite each single-line product literal that lacks an image.
src = src.replace(
  /\{ slug: "([^"]+)",([^\n]*?) \},/g,
  (match, slug, rest) => {
    if (!available.has(slug)) return match;
    if (rest.includes("image:")) {
      skipped++;
      return match;
    }
    added++;
    return `{ slug: "${slug}",${rest}, image: "/imgs/products/${slug}.webp" },`;
  },
);

fs.writeFileSync(file, src);
console.log(`image paths added: ${added}, already set: ${skipped}`);
