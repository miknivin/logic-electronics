/**
 * Pairs product images with their model names from the reference listing
 * pages, so each machine photo can be matched to the right catalogue entry.
 * Run: node scripts/scrape-products.js
 */
const fs = require("fs");

const files = process.argv.slice(2);
const out = [];

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");

  // Each card is an <a> wrapping the image and, further on, the title text.
  const cardRe =
    /<a[^>]+href="([^"]*\/printers\/[^"]+)"[\s\S]{0,4000}?<img[^>]+src="([^"]*\/upload\/printer\/[^"]+)"[\s\S]{0,4000}?<\/a>/g;

  let m;
  while ((m = cardRe.exec(html)) !== null) {
    const [block, href, img] = m;

    // Title: the visible anchor/heading text inside the block.
    const text = block
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();

    out.push({ href, img, text: text.slice(0, 160) });
  }
}

// De-dupe by image url
const seen = new Set();
const unique = out.filter((r) => {
  if (seen.has(r.img)) return false;
  seen.add(r.img);
  return true;
});

fs.writeFileSync(".work/sos-products.json", JSON.stringify(unique, null, 2));
console.log("pairs:", unique.length);
for (const r of unique.slice(0, 25)) {
  console.log(r.img.split("/").pop(), "|", r.text.slice(0, 90));
}
