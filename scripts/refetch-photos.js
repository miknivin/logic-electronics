/**
 * Re-fetches the component photos that the first pass got wrong, requiring
 * the Commons file title to actually mention the subject — searching alone
 * returned things like a brick wall for "charger".
 *
 * Run: node scripts/refetch-photos.js
 */
const fs = require("fs");
const sharp = require("sharp");

const OUT = "public/imgs/products";
const UA = "LogicElectronicsSiteBuild/1.0 (contact: support@logicuae.com)";

// name -> { terms, must: title keywords, not: title keywords to reject }
const JOBS = {
  // "tower" alone matched a telecoms tower at sunset — require computer words.
  "desktop-pc": {
    terms: ["computer case tower PC", "desktop computer case", "PC tower computer"],
    must: /(pc|computer).*(case|tower)|(case|tower).*(pc|computer)/i,
    not: /telstra|sunset|crepuscular|radio|water|church|clock|office|room/i,
  },
};

async function candidates(term) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
    `&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=25` +
    "&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=900";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return [];
  const json = await res.json();
  const pages = json?.query?.pages ? Object.values(json.query.pages) : [];
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return null;
      const meta = info.extmetadata || {};
      return {
        title: p.title,
        url: info.thumburl || info.url,
        mime: info.mime,
        w: info.width,
        h: info.height,
        licence: meta.LicenseShortName?.value || "unknown",
        artist: (meta.Artist?.value || "").replace(/<[^>]+>/g, "").trim(),
      };
    })
    .filter(
      (f) => f && /jpeg|png/.test(f.mime) && f.w >= 600 && f.w / f.h > 0.6 && f.w / f.h < 2.4,
    );
}

(async () => {
  const credits = JSON.parse(
    fs.readFileSync(`${OUT}/CREDITS.json`, "utf8"),
  ).filter((c) => !JOBS[c.file.replace("photo-", "").replace(".webp", "")]);

  for (const [name, job] of Object.entries(JOBS)) {
    let picked = null;
    for (const term of job.terms) {
      const list = await candidates(term);
      picked = list.find((f) => job.must.test(f.title) && !job.not.test(f.title));
      if (picked) break;
    }

    if (!picked) {
      console.log(`  --  ${name}: still nothing suitable`);
      continue;
    }

    const res = await fetch(picked.url, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize(800, 800, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .webp({ quality: 86 })
      .toFile(`${OUT}/photo-${name}.webp`);

    credits.push({
      file: `photo-${name}.webp`,
      source: picked.title,
      licence: picked.licence,
      author: picked.artist,
    });
    console.log(`  ok  ${name}  <- ${picked.title}  [${picked.licence}]`);
  }

  fs.writeFileSync(`${OUT}/CREDITS.json`, JSON.stringify(credits, null, 2));
})();
