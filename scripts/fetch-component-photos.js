/**
 * Finds freely-licensed hardware photos on Wikimedia Commons and writes them
 * into public/imgs/products/ as 800x800 WebP on white, matching the machine
 * photos already there.
 *
 * Run: node scripts/fetch-component-photos.js
 */
const fs = require("fs");
const sharp = require("sharp");

const OUT = "public/imgs/products";
fs.mkdirSync(OUT, { recursive: true });

// out-name -> Commons search terms, best first
const WANTED = {
  ram: ["DDR4 memory module", "RAM memory module computer", "DIMM module"],
  monitor: ["computer monitor LCD display", "LCD monitor"],
  storage: ["solid state drive SSD", "hard disk drive 2.5 inch"],
  motherboard: ["computer motherboard ATX", "motherboard"],
  cpu: ["CPU processor chip", "microprocessor CPU"],
  gpu: ["graphics card GPU", "video card PCI Express"],
  "pc-case": ["computer case tower", "PC case computer tower"],
  cooling: ["CPU cooler heatsink fan", "computer cooling fan"],
  "keyboard-mouse": ["computer keyboard and mouse", "computer keyboard"],
  "toner-cartridge": ["toner cartridge laser printer", "toner cartridge"],
  "ink-cartridge": ["inkjet cartridge", "ink cartridge printer"],
  "drum-unit": ["printer drum unit", "laser printer drum"],
  laptop: ["laptop computer notebook", "laptop computer"],
  "desktop-pc": ["desktop computer workstation", "desktop personal computer"],
  projector: ["video projector", "data projector"],
  scanner: ["document scanner flatbed", "flatbed scanner"],
  ups: ["uninterruptible power supply", "UPS battery backup"],
  battery: ["laptop battery pack", "laptop battery"],
  charger: ["laptop power adapter charger", "AC adapter laptop"],
};

const UA = "LogicElectronicsSiteBuild/1.0 (contact: support@logicuae.com)";

async function searchCommons(term) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
    `&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=12` +
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
        width: info.width,
        height: info.height,
        licence: meta.LicenseShortName?.value || "unknown",
        artist: (meta.Artist?.value || "").replace(/<[^>]+>/g, "").trim(),
      };
    })
    .filter(
      (f) =>
        f &&
        /jpeg|png/.test(f.mime) && // no SVG
        f.width >= 500 &&
        f.width / f.height > 0.5 &&
        f.width / f.height < 2.6,
    );
}

(async () => {
  const credits = [];

  for (const [name, terms] of Object.entries(WANTED)) {
    let picked = null;
    for (const term of terms) {
      const results = await searchCommons(term);
      if (results.length > 0) {
        picked = results[0];
        break;
      }
    }

    if (!picked) {
      console.log(`  --  ${name}: no suitable photo found`);
      continue;
    }

    try {
      const res = await fetch(picked.url, { headers: { "User-Agent": UA } });
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf)
        .resize(800, 800, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .webp({ quality: 86 })
        .toFile(`${OUT}/photo-${name}.webp`);

      credits.push({
        file: `photo-${name}.webp`,
        source: picked.title,
        licence: picked.licence,
        author: picked.artist,
      });
      console.log(`  ok  ${name}  <- ${picked.title}  [${picked.licence}]`);
    } catch (err) {
      console.log(`  !!  ${name}: ${err.message}`);
    }
  }

  fs.writeFileSync(
    `${OUT}/CREDITS.json`,
    JSON.stringify(credits, null, 2),
  );
  console.log(`\n${credits.length} photos written, credits in ${OUT}/CREDITS.json`);
})();
