// Regenerates the product line-art in public/imgs/products.
// Run with: node scripts/generate-product-art.js
const sharp = require("sharp");
const fs = require("fs");

fs.mkdirSync("public/imgs/products", { recursive: true });

// Brand palette
const NAVY = "#14479B";
const DARK = "#0d2245";
const ORANGE = "#EE6A24";
const BODY = "#eef2f7";
const PANEL = "#dbe3ee";
const SHADE = "#c7d3e3";

const wrap = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <rect width="800" height="800" fill="none"/>
  <g stroke="${NAVY}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" fill="none">
    ${inner}
  </g>
</svg>`;

/* --------------------------------------------- A3 multifunction copier */
const copier = wrap(`
  <!-- document feeder -->
  <rect x="215" y="150" width="370" height="70" rx="10" fill="${PANEL}"/>
  <rect x="250" y="120" width="230" height="32" rx="8" fill="${BODY}"/>
  <!-- scanner body -->
  <rect x="200" y="220" width="400" height="70" rx="8" fill="${BODY}"/>
  <!-- control panel -->
  <rect x="470" y="232" width="115" height="46" rx="8" fill="${DARK}" stroke="${DARK}"/>
  <rect x="487" y="246" width="60" height="7" rx="3.5" fill="${ORANGE}" stroke="none"/>
  <rect x="487" y="260" width="38" height="6" rx="3" fill="#7f95b8" stroke="none"/>
  <!-- output tray gap -->
  <rect x="215" y="290" width="330" height="58" rx="6" fill="#ffffff"/>
  <path d="M235 318 H430" stroke="${SHADE}" stroke-width="5"/>
  <!-- main cabinet -->
  <rect x="200" y="348" width="400" height="300" rx="10" fill="${BODY}"/>
  <!-- paper drawers -->
  <rect x="228" y="392" width="344" height="58" rx="7" fill="${PANEL}"/>
  <rect x="352" y="414" width="96" height="10" rx="5" fill="${SHADE}" stroke="none"/>
  <rect x="228" y="468" width="344" height="58" rx="7" fill="${PANEL}"/>
  <rect x="352" y="490" width="96" height="10" rx="5" fill="${SHADE}" stroke="none"/>
  <rect x="228" y="544" width="344" height="58" rx="7" fill="${PANEL}"/>
  <rect x="352" y="566" width="96" height="10" rx="5" fill="${SHADE}" stroke="none"/>
  <!-- feet -->
  <path d="M240 648 V672 M560 648 V672"/>
`);

/* ------------------------------------------------- desktop laser printer */
const printer = wrap(`
  <!-- paper out the top -->
  <rect x="300" y="200" width="200" height="60" rx="6" fill="#ffffff"/>
  <path d="M325 228 H470" stroke="${SHADE}" stroke-width="5"/>
  <!-- top shell -->
  <rect x="215" y="258" width="370" height="90" rx="12" fill="${BODY}"/>
  <rect x="440" y="282" width="120" height="42" rx="8" fill="${DARK}" stroke="${DARK}"/>
  <rect x="456" y="296" width="56" height="7" rx="3.5" fill="${ORANGE}" stroke="none"/>
  <!-- body -->
  <rect x="215" y="348" width="370" height="200" rx="12" fill="${PANEL}"/>
  <path d="M245 400 H555" stroke="${SHADE}" stroke-width="5"/>
  <!-- front tray -->
  <path d="M255 548 H545 L575 610 H225 Z" fill="${BODY}"/>
  <path d="M300 578 H500" stroke="${SHADE}" stroke-width="5"/>
`);

/* ------------------------------------------------------- toner cartridge */
const toner = wrap(`
  <!-- main hopper -->
  <path d="M170 265 H570 a44 44 0 0 1 44 44 v112 a44 44 0 0 1 -44 44 H170 a34 34 0 0 1 -34 -34 v-132 a34 34 0 0 1 34 -34 Z" fill="${BODY}"/>
  <!-- label panel -->
  <rect x="196" y="305" width="316" height="76" rx="12" fill="${PANEL}"/>
  <rect x="224" y="330" width="196" height="14" rx="7" fill="${ORANGE}" stroke="none"/>
  <rect x="224" y="356" width="120" height="10" rx="5" fill="${SHADE}" stroke="none"/>
  <!-- grip handle on the right -->
  <path d="M614 316 h52 a22 22 0 0 1 22 22 v54 a22 22 0 0 1 -22 22 h-52" fill="${PANEL}"/>
  <!-- drum roller, clear of the body -->
  <rect x="150" y="487" width="420" height="46" rx="23" fill="${SHADE}"/>
  <path d="M196 510 H524" stroke="#9fb2cb" stroke-width="8" stroke-linecap="round"/>
`);

/* -------------------------------------------------------------- monitor */
const monitor = wrap(`
  <rect x="150" y="200" width="500" height="320" rx="16" fill="${BODY}"/>
  <rect x="180" y="230" width="440" height="255" rx="8" fill="${DARK}" stroke="${DARK}"/>
  <path d="M215 300 H420" stroke="${ORANGE}" stroke-width="10" stroke-linecap="round"/>
  <path d="M215 345 H540" stroke="#3f5a86" stroke-width="10" stroke-linecap="round"/>
  <path d="M215 390 H480" stroke="#3f5a86" stroke-width="10" stroke-linecap="round"/>
  <!-- stand -->
  <path d="M360 520 h80 v60 h-80 Z" fill="${PANEL}"/>
  <path d="M290 600 H510" stroke-width="18" stroke-linecap="round"/>
`);

/* --------------------------------------------------------------- laptop */
const laptop = wrap(`
  <path d="M230 230 H570 a16 16 0 0 1 16 16 V470 H214 V246 a16 16 0 0 1 16 -16 Z" fill="${BODY}"/>
  <rect x="246" y="262" width="308" height="176" rx="6" fill="${DARK}" stroke="${DARK}"/>
  <path d="M278 320 H430" stroke="${ORANGE}" stroke-width="9" stroke-linecap="round"/>
  <path d="M278 358 H500" stroke="#3f5a86" stroke-width="9" stroke-linecap="round"/>
  <path d="M278 396 H452" stroke="#3f5a86" stroke-width="9" stroke-linecap="round"/>
  <!-- base -->
  <path d="M160 470 H640 L664 540 H136 Z" fill="${PANEL}"/>
  <path d="M340 505 H460" stroke="${SHADE}" stroke-width="10" stroke-linecap="round"/>
`);

const art = { copier, printer, toner, monitor, laptop };

(async () => {
  for (const [name, svg] of Object.entries(art)) {
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(`public/imgs/products/${name}.webp`);
    console.log("wrote", name);
  }
})();
