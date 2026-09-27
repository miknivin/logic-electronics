/**
 * Product catalogue behind the `/products/[category]` listing pages.
 *
 * Scope note: model designations below are real manufacturer models for the
 * brands Logic Electronics already services (see `brands` in lib/site.ts).
 * They give the listing pages realistic content to lay out against, but
 * nobody has confirmed which of these are actually held in stock — treat
 * this as a starting catalogue for the client to prune and extend, not as
 * verified inventory.
 *
 * Photography: no machine or product photos were supplied, so `image` is
 * optional and cards fall back to the brand's logo on a light tile. Drop a
 * file into `public/imgs/products/` and set `image` to switch any single
 * card over — no layout change needed.
 */

export type ProductBadge = "For Rent" | "New" | "Refurbished" | "Featured";

export type Product = {
  slug: string;
  /** Model designation as the manufacturer writes it. */
  name: string;
  /** Must match a `name` in `brands` (lib/site.ts) for the logo fallback. */
  brand: string;
  category: string;
  /** Short capability line, e.g. "Copy / Print / Scan / Fax". */
  blurb: string;
  badges: ProductBadge[];
  image?: string;
  /**
   * Paper format, where known. Left off rather than guessed — the detail
   * page simply omits the chip when it is absent.
   */
  format?: string;
  /**
   * Full specification rows for the detail page table. Deliberately empty
   * for now: publishing invented figures for real, named machines (speeds,
   * memory, duty cycles) would put wrong data about identifiable products on
   * the client's site. Paste the manufacturer spec sheet rows in here and
   * the table appears automatically.
   */
  specs?: { label: string; value: string }[];
};

export type ProductCategory = {
  slug: string;
  /** Nav/menu label. */
  title: string;
  /** Listing page H1. */
  heading: string;
  description: string;
  /** Sub-groupings shown in the Products mega menu. */
  menuItems: string[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "printers-copiers",
    title: "Printers & Copiers",
    heading: "Printers & Copiers",
    description:
      "Multifunction copiers, laser and inkjet printers from every major brand, new or professionally refurbished, available to buy or rent.",
    menuItems: [
      "New Printers",
      "Refurbished Printers",
      "Copiers",
      "Multifunction Printers",
      "Scanners",
    ],
  },
  {
    slug: "sales",
    title: "Sales",
    heading: "Products for Sale",
    description:
      "New and refurbished printers, copiers, computers and office hardware, supplied, configured and supported by our own engineers.",
    menuItems: [
      "New Printers",
      "Refurbished Printers",
      "Copiers",
      "Multifunction Printers",
      "Scanners",
      "Projectors",
      "Laptops",
      "Desktops",
      "Custom Build PCs",
      "UPS Systems",
    ],
  },
  {
    slug: "rental",
    title: "Rentals",
    heading: "Printers & Copiers for Rent",
    description:
      "Short and long-term rental across the UAE, with toner, servicing and breakdown cover inside one predictable monthly cost.",
    menuItems: ["Rental Printers", "Rental Copiers"],
  },
  {
    slug: "pc-components",
    title: "PC Components",
    heading: "PC Components",
    description:
      "Monitors, memory, storage and the internals we fit, upgrade and support across your workstations.",
    menuItems: [
      "Monitors",
      "RAM",
      "Storage (SSD & HDD)",
      "Motherboards",
      "Processors (CPUs)",
      "Graphics Cards (GPUs)",
      "Casings / Cabinets",
      "Cooling Systems",
    ],
  },
  {
    slug: "consumables",
    title: "Consumables",
    heading: "Printer Consumables",
    description:
      "Original, compatible and remanufactured toner, ink and wear parts for every printer and copier brand we service.",
    menuItems: [
      "Toner Cartridges",
      "Ink Cartridges",
      "Drum Units",
      "Fuser Units",
      "Maintenance / Roller Kits",
      "Laptop & PC Batteries",
      "Laptop Spare Parts",
      "Laptop & Mobile Chargers",
      "Keyboards & Mice",
    ],
  },
];

const MFP = "Copy / Print / Scan / Fax";

export const products: Product[] = [
  /* ------------------------------------------- printers & copiers (sale) */
  { slug: "canon-ir-advance-c5235", name: "imageRUNNER ADVANCE C5235", brand: "Canon", category: "printers-copiers", blurb: MFP, badges: ["Refurbished", "Featured"], image: "/imgs/products/canon-ir-advance-c5235.webp" },
  { slug: "canon-ir-advance-c5240", name: "imageRUNNER ADVANCE C5240", brand: "Canon", category: "printers-copiers", blurb: MFP, badges: ["Refurbished"], image: "/imgs/products/canon-ir-advance-c5240.webp" },
  { slug: "canon-ir-advance-dx-4700", name: "imageRUNNER ADVANCE DX 4700", brand: "Canon", category: "printers-copiers", blurb: MFP, badges: ["New"], image: "/imgs/products/canon-ir-advance-dx-4700.webp" },
  { slug: "canon-ir-advance-c3226", name: "imageRUNNER ADVANCE C3226", brand: "Canon", category: "printers-copiers", blurb: MFP, badges: ["Refurbished"], image: "/imgs/products/canon-ir-advance-c3226.webp" },
  { slug: "konica-bizhub-c360i", name: "bizhub C360i", brand: "Konica Minolta", category: "printers-copiers", blurb: MFP, badges: ["New", "Featured"], image: "/imgs/products/konica-bizhub-c360i.webp" },
  { slug: "konica-bizhub-c266", name: "bizhub C266", brand: "Konica Minolta", category: "printers-copiers", blurb: MFP, badges: ["Refurbished"], image: "/imgs/products/konica-bizhub-c266.webp" },
  { slug: "konica-bizhub-306i", name: "bizhub 306i / 266i / 226i", brand: "Konica Minolta", category: "printers-copiers", blurb: "Copy / Print / Scan", badges: ["New"], image: "/imgs/products/konica-bizhub-306i.webp" },
  { slug: "kyocera-taskalfa-3554ci", name: "TASKalfa 3554ci", brand: "Kyocera", category: "printers-copiers", blurb: MFP, badges: ["New"], image: "/imgs/products/kyocera-taskalfa-3554ci.webp" },
  { slug: "kyocera-ecosys-m2040dn", name: "ECOSYS M2040dn", brand: "Kyocera", category: "printers-copiers", blurb: "Copy / Print / Scan", badges: ["New"], image: "/imgs/products/kyocera-ecosys-m2040dn.webp" },
  { slug: "ricoh-im-c2000", name: "IM C2000", brand: "Ricoh", category: "printers-copiers", blurb: MFP, badges: ["Refurbished"], image: "/imgs/products/ricoh-im-c2000.webp" },
  { slug: "ricoh-mp-c3004ex", name: "MP C3004exSP", brand: "Ricoh", category: "printers-copiers", blurb: MFP, badges: ["Refurbished"], image: "/imgs/products/ricoh-mp-c3004ex.webp" },
  { slug: "sharp-bp-30c25", name: "BP-30C25", brand: "Sharp", category: "printers-copiers", blurb: MFP, badges: ["New"], image: "/imgs/products/sharp-bp-30c25.webp" },
  { slug: "sharp-mx-3111u", name: "MX-2310U / 3111U", brand: "Sharp", category: "printers-copiers", blurb: MFP, badges: ["Refurbished"], image: "/imgs/products/sharp-mx-3111u.webp" },
  { slug: "triumph-adler-3005ci", name: "3005ci", brand: "Triumph-Adler", category: "printers-copiers", blurb: MFP, badges: ["Refurbished", "Featured"], image: "/imgs/products/triumph-adler-3005ci.webp" },
  { slug: "triumph-adler-4007ci", name: "4007ci", brand: "Triumph-Adler", category: "printers-copiers", blurb: MFP, badges: ["Refurbished"], image: "/imgs/products/triumph-adler-4007ci.webp" },
  { slug: "utax-6007ci", name: "6007ci", brand: "UTAX", category: "printers-copiers", blurb: MFP, badges: ["Refurbished"], image: "/imgs/products/utax-6007ci.webp" },
  { slug: "hp-color-laserjet-m477", name: "Color LaserJet Pro MFP M477", brand: "HP", category: "printers-copiers", blurb: "Copy / Print / Scan", badges: ["New"], image: "/imgs/products/hp-color-laserjet-m477.webp" },
  { slug: "epson-workforce-c5790", name: "WorkForce Pro WF-C5790", brand: "Epson", category: "printers-copiers", blurb: MFP, badges: ["New"], image: "/imgs/products/epson-workforce-c5790.webp" },
  { slug: "brother-mfc-l5900dw", name: "MFC-L5900DW", brand: "Brother", category: "printers-copiers", blurb: MFP, badges: ["New"], image: "/imgs/products/brother-mfc-l5900dw.webp" },

  /* ------------------------------------------------------------- rentals */
  { slug: "rent-konica-bizhub-225i", name: "bizhub 225i / 205i", brand: "Konica Minolta", category: "rental", blurb: "Copy / Print / Scan", badges: ["For Rent", "Featured"], image: "/imgs/products/rent-konica-bizhub-225i.webp" },
  { slug: "rent-konica-bizhub-c300i", name: "bizhub C300i", brand: "Konica Minolta", category: "rental", blurb: MFP, badges: ["For Rent"], image: "/imgs/products/rent-konica-bizhub-c300i.webp" },
  { slug: "rent-konica-bizhub-458e", name: "bizhub 458e / 558e / 658e", brand: "Konica Minolta", category: "rental", blurb: MFP, badges: ["For Rent"], image: "/imgs/products/rent-konica-bizhub-458e.webp" },
  { slug: "rent-canon-ir-c3520i", name: "imageRUNNER ADVANCE C3520i", brand: "Canon", category: "rental", blurb: MFP, badges: ["For Rent", "Featured"], image: "/imgs/products/rent-canon-ir-c3520i.webp" },
  { slug: "rent-canon-ir-c5535i", name: "imageRUNNER ADVANCE C5535i", brand: "Canon", category: "rental", blurb: MFP, badges: ["For Rent"], image: "/imgs/products/rent-canon-ir-c5535i.webp" },
  { slug: "rent-kyocera-taskalfa-2553ci", name: "TASKalfa 2553ci", brand: "Kyocera", category: "rental", blurb: MFP, badges: ["For Rent"] },
  { slug: "rent-kyocera-taskalfa-4002i", name: "TASKalfa 4002i", brand: "Kyocera", category: "rental", blurb: "Copy / Print / Scan", badges: ["For Rent"], image: "/imgs/products/rent-kyocera-taskalfa-4002i.webp" },
  { slug: "rent-triumph-adler-5007ci", name: "5007ci", brand: "Triumph-Adler", category: "rental", blurb: MFP, badges: ["For Rent"], image: "/imgs/products/rent-triumph-adler-5007ci.webp" },
  { slug: "rent-triumph-adler-4007ci", name: "4007ci", brand: "Triumph-Adler", category: "rental", blurb: MFP, badges: ["For Rent"], image: "/imgs/products/rent-triumph-adler-4007ci.webp" },
  { slug: "rent-ricoh-mp-c2004", name: "MP C2004exSP", brand: "Ricoh", category: "rental", blurb: MFP, badges: ["For Rent"], image: "/imgs/products/rent-ricoh-mp-c2004.webp" },
  { slug: "rent-sharp-bp-20c25", name: "BP-20C25", brand: "Sharp", category: "rental", blurb: MFP, badges: ["For Rent"], image: "/imgs/products/rent-sharp-bp-20c25.webp" },
  { slug: "rent-utax-5007ci", name: "5007ci", brand: "UTAX", category: "rental", blurb: MFP, badges: ["For Rent"], image: "/imgs/products/rent-utax-5007ci.webp" },
  { slug: "rent-epson-wf-c20600", name: "WorkForce Enterprise WF-C20600", brand: "Epson", category: "rental", blurb: "High-volume colour MFP", badges: ["For Rent", "New"], image: "/imgs/products/rent-epson-wf-c20600.webp" },
  { slug: "rent-hp-laserjet-m750", name: "Color LaserJet Enterprise M750", brand: "HP", category: "rental", blurb: "Print only", badges: ["For Rent"], image: "/imgs/products/rent-hp-laserjet-m750.webp" },

  /* ------------------------------------------------------------- sales */
  { slug: "dell-latitude-business-laptop", name: "Latitude Series Business Laptop", brand: "Dell", category: "sales", blurb: "Business laptops, configured and domain-joined", badges: ["New"] },
  { slug: "hp-probook-business-laptop", name: "ProBook Series Business Laptop", brand: "HP", category: "sales", blurb: "Business laptops, configured and domain-joined", badges: ["New"] },
  { slug: "lenovo-thinkpad-laptop", name: "ThinkPad Series Business Laptop", brand: "Lenovo", category: "sales", blurb: "Business laptops, configured and domain-joined", badges: ["New", "Featured"] },
  { slug: "asus-desktop-workstation", name: "Desktop Workstation", brand: "ASUS", category: "sales", blurb: "Office desktops and workstations", badges: ["New"] },
  { slug: "custom-build-pc", name: "Custom Build PC", brand: "ASUS", category: "sales", blurb: "Built to your specification and budget", badges: ["New", "Featured"] },
  { slug: "nec-projector", name: "Projector Range", brand: "NEC", category: "sales", blurb: "Meeting room and classroom projectors", badges: ["New"] },
  { slug: "canon-document-scanner", name: "imageFORMULA Document Scanner", brand: "Canon", category: "sales", blurb: "Desktop and departmental scanners", badges: ["New"] },
  { slug: "ups-systems", name: "UPS Systems", brand: "NEC", category: "sales", blurb: "Power protection sized to your load", badges: ["New"] },

  /* ------------------------------------------------------ pc components */
  { slug: "monitors", name: "Business Monitors", brand: "Dell", category: "pc-components", blurb: "Desktop monitors and large-format displays", badges: ["New"] },
  { slug: "memory-ram", name: "Memory (RAM)", brand: "ASUS", category: "pc-components", blurb: "Compatible memory supplied and fitted", badges: ["New"] },
  { slug: "storage-ssd-hdd", name: "Storage (SSD & HDD)", brand: "Dell", category: "pc-components", blurb: "Drives supplied, fitted and cloned with your data", badges: ["New", "Featured"] },
  { slug: "motherboards", name: "Motherboards", brand: "ASUS", category: "pc-components", blurb: "Replacement and upgrade boards", badges: ["New"] },
  { slug: "processors-cpu", name: "Processors (CPUs)", brand: "ASUS", category: "pc-components", blurb: "Desktop and workstation processors", badges: ["New"] },
  { slug: "graphics-cards", name: "Graphics Cards (GPUs)", brand: "ASUS", category: "pc-components", blurb: "Workstation and design-grade graphics", badges: ["New"] },
  { slug: "casings-cabinets", name: "Casings & Cabinets", brand: "ASUS", category: "pc-components", blurb: "Chassis for custom builds", badges: ["New"] },
  { slug: "cooling-systems", name: "Cooling Systems", brand: "ASUS", category: "pc-components", blurb: "Air and liquid cooling", badges: ["New"] },
  { slug: "keyboards-mice", name: "Keyboards & Mice", brand: "Logitech", category: "pc-components", blurb: "Wired and wireless desk peripherals", badges: ["New"] },

  /* -------------------------------------------------------- consumables */
  { slug: "toner-canon", name: "Canon Toner Cartridges", brand: "Canon", category: "consumables", blurb: "Original and compatible toner", badges: ["New"] },
  { slug: "toner-konica", name: "Konica Minolta Toner Cartridges", brand: "Konica Minolta", category: "consumables", blurb: "Original and compatible toner", badges: ["New", "Featured"] },
  { slug: "toner-kyocera", name: "Kyocera Toner Cartridges", brand: "Kyocera", category: "consumables", blurb: "Original and compatible toner", badges: ["New"] },
  { slug: "toner-ricoh", name: "Ricoh Toner Cartridges", brand: "Ricoh", category: "consumables", blurb: "Original and compatible toner", badges: ["New"] },
  { slug: "toner-hp", name: "HP Toner Cartridges", brand: "HP", category: "consumables", blurb: "Original and compatible toner", badges: ["New"] },
  { slug: "ink-epson", name: "Epson Ink Cartridges", brand: "Epson", category: "consumables", blurb: "Original and compatible ink", badges: ["New"] },
  { slug: "ink-brother", name: "Brother Ink Cartridges", brand: "Brother", category: "consumables", blurb: "Original and compatible ink", badges: ["New"] },
  { slug: "drum-units", name: "Drum Units", brand: "Sharp", category: "consumables", blurb: "Drums and developer units", badges: ["New"] },
  { slug: "fuser-units", name: "Fuser Units", brand: "UTAX", category: "consumables", blurb: "Fusers for production and office machines", badges: ["New"] },
  { slug: "maintenance-roller-kits", name: "Maintenance & Roller Kits", brand: "Triumph-Adler", category: "consumables", blurb: "Feed rollers and service kits", badges: ["New"] },
  { slug: "laptop-pc-batteries", name: "Laptop & PC Batteries", brand: "Dell", category: "consumables", blurb: "Genuine replacement batteries", badges: ["New"] },
  { slug: "laptop-chargers", name: "Laptop & Mobile Chargers", brand: "Lenovo", category: "consumables", blurb: "Power adapters and chargers", badges: ["New"] },
];

/* ----------------------------------------------------------------- helpers */

export function getProductCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/**
 * Line-art stand-ins, drawn in the brand palette, so every card carries a
 * device image rather than a bare brand logo while real photography is
 * outstanding. They are generic device illustrations, not depictions of the
 * specific model, so a real photo in `product.image` always wins.
 */
const ART = {
  copier: "/imgs/products/copier.webp",
  printer: "/imgs/products/printer.webp",
  toner: "/imgs/products/toner.webp",
  monitor: "/imgs/products/monitor.webp",
  laptop: "/imgs/products/laptop.webp",
} as const;

/** Desktop-class machines, as opposed to floor-standing A3 copiers. */
const DESKTOP_HINTS = [
  "ecosys",
  "mfc-",
  "laserjet",
  "workforce",
  "imageformula",
  "sp 2",
];

function artFor(product: Product): string {
  const name = `${product.name} ${product.blurb}`.toLowerCase();

  switch (product.category) {
    case "printers-copiers":
    case "rental":
      return DESKTOP_HINTS.some((hint) => name.includes(hint))
        ? ART.printer
        : ART.copier;
    case "consumables":
      if (/batter|charger|keyboard|mice|spare/.test(name)) return ART.laptop;
      return ART.toner;
    case "pc-components":
      return /monitor|display/.test(name) ? ART.monitor : ART.laptop;
    case "sales":
      if (/printer|copier|scanner|imagerunner|bizhub/.test(name)) {
        return ART.printer;
      }
      if (/monitor|projector|display/.test(name)) return ART.monitor;
      return ART.laptop;
    default:
      return ART.printer;
  }
}

/** Real photo when supplied, brand-styled illustration otherwise. */
export function productImage(product: Product): string {
  return product.image ?? artFor(product);
}

/** Same brand first, then same category, for the "related" rail. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (candidate) =>
      candidate.slug !== product.slug && candidate.category === product.category,
  );

  return [
    ...sameCategory.filter((candidate) => candidate.brand === product.brand),
    ...sameCategory.filter((candidate) => candidate.brand !== product.brand),
  ].slice(0, limit);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug);
}

/** Brands present in a category, in catalogue order — drives the sidebar. */
export function getBrandsInCategory(categorySlug: string): string[] {
  return [
    ...new Set(
      getProductsByCategory(categorySlug).map((product) => product.brand),
    ),
  ];
}
