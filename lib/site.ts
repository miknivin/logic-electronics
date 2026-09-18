/**
 * Single source of truth for company details.
 * Everything here is taken from the Logic Electronics brochure. Update it in
 * one place and it propagates across the header, footer, contact page and SEO.
 */

export const FOUNDED_YEAR = 2000;

/** Derived so the site never advertises a stale "X years of experience". */
export const yearsOfExperience = new Date().getFullYear() - FOUNDED_YEAR;

export const site = {
  name: "Logic Electronics",
  legalName: "Logic Electronics Sole Proprietorship LLC",
  tagline: "Solution for all your office issues",
  description:
    "Logic Electronics is a leading electronics service centre and office supplier in Abu Dhabi. Since 2000 we have delivered copier and printer services, IT infrastructure, CCTV, networking and stationery to businesses across the UAE.",
  url: "https://www.logicuae.com",
  certification: "ISO 9001:2015 Certified Company",
} as const;

export const contact = {
  primaryPhone: "+971 50 834 2034",
  primaryPhoneHref: "tel:+971508342034",
  landline: "+971 2 633 3364",
  landlineHref: "tel:+97126333364",
  whatsapp: "+971 55 477 3364",
  whatsappHref: "https://wa.me/971554773364",
  email: "support@logicuae.com",
  emailAlt: "logicauh@gmail.com",
  salesEmail: "sales@logicofficesupply.com",
  contactPerson: "Mohammed Saeed",
  hours: "Saturday – Thursday, 8:30 AM – 7:00 PM",
} as const;

export type Branch = {
  city: string;
  country: string;
  address: string;
  phones: string[];
  email?: string;
  isHeadOffice?: boolean;
};

export const branches: Branch[] = [
  {
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    address: "Khalifa Street, Abu Dhabi",
    phones: ["+971 50 834 2034", "+971 58 645 0127", "+971 2 633 3364"],
    email: "support@logicuae.com",
    isHeadOffice: true,
  },
  {
    city: "Madinat Zayed",
    country: "United Arab Emirates",
    address: "Behind Lulu Fresh Market, Madinat Zayed",
    phones: ["+971 56 147 8818", "+971 2 584 6665"],
    email: "sales@logicofficesupply.com",
  },
  {
    city: "Mussafah",
    country: "United Arab Emirates",
    address: "M-09, 10th Street 2, Mussafah",
    phones: ["+971 55 477 3364", "+971 56 763 9984", "+971 2 633 3364"],
  },
  {
    city: "Kozhikode",
    country: "India",
    address: "Kozhikode, Kerala, India",
    phones: ["+91 90373 18370", "+91 97446 10091"],
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "London, United Kingdom",
    phones: ["+44 7587 474 235", "+44 7587 481 316"],
  },
];

/** Support commitments highlighted on the brochure cover. */
export const commitments = [
  "Annual Maintenance",
  "24/7 Support",
  "Remote Help Desk",
  "On Site Support",
  "Free Pickup & Delivery",
  "Rental Facility",
  "Office Shifting Facility",
  "Office Equipment & Stationery",
] as const;

/**
 * Brands supplied and serviced.
 *
 * `logo` points at a file in `public/imgs/brands`. Brands without one fall back
 * to their name set as a wordmark, so the grid stays complete. Drop a matching
 * PNG in and add the `logo` key to swap it in with no other change.
 */
export type Brand = { name: string; logo?: string };

export const brands: Brand[] = [
  { name: "HP", logo: "/imgs/brands/hp.png" },
  { name: "Brother", logo: "/imgs/brands/brother.png" },
  { name: "Dell", logo: "/imgs/brands/dell.png" },
  { name: "ASUS", logo: "/imgs/brands/asus.png" },
  { name: "Lenovo", logo: "/imgs/brands/lenovo.png" },
  { name: "Logitech", logo: "/imgs/brands/logitech.png" },
  { name: "Hikvision", logo: "/imgs/brands/hikvision.png" },
  { name: "NEC", logo: "/imgs/brands/nec.png" },
  { name: "Canon", logo: "/imgs/brands/canon.png" },
  { name: "Kyocera", logo: "/imgs/brands/kyocera.png" },
  { name: "Konica Minolta", logo: "/imgs/brands/konica-minolta.png" },
  { name: "Epson", logo: "/imgs/brands/epson.png" },
  { name: "Sharp", logo: "/imgs/brands/sharp.png" },
  { name: "Triumph-Adler", logo: "/imgs/brands/triumph-adler.png" },
  { name: "Ricoh", logo: "/imgs/brands/ricoh.png" },
  { name: "UTAX", logo: "/imgs/brands/utax.png" },
  /* Software brands behind our managed IT, backup and security services.
     No logo artwork on file yet, so these render as wordmark badges through
     the same fallback as any hardware brand above — drop a PNG into
     public/imgs/brands and add a `logo` key to upgrade any of them. */
  { name: "Microsoft 365" },
  { name: "Google Workspace" },
  { name: "Fortinet" },
  { name: "Veeam" },
  { name: "Ubiquiti" },
];

export const stats = [
  { value: `${yearsOfExperience}+`, label: "Years in business" },
  { value: "5", label: "Offices across 3 countries" },
  { value: "24/7", label: "Technical support" },
  /* Derived, so adding or removing a brand keeps this honest. */
  { value: `${brands.length}+`, label: "Brands serviced" },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/logic-electronics" },
  { label: "Instagram", href: "https://www.instagram.com/logic-electronics" },
  { label: "YouTube", href: "https://www.youtube.com/@logic-electronics" },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * The three rotating hero states on the home page. Layout and CTA position
 * stay fixed; only the badge, headline, keyword line, description, image and
 * CTA change, so the section reads as one company covering three fronts
 * rather than three unrelated banners.
 */
export type HeroSlide = {
  badge: string;
  headline: string;
  highlight: string;
  keywords: string[];
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export const heroSlides: HeroSlide[] = [
  {
    badge: "Printers & Copiers",
    headline: "Every printer and copier need,",
    highlight: "sorted in one call",
    keywords: [
      "Printers",
      "Copiers",
      "Scanners",
      "Consumables",
      "New & Refurbished",
      "Repairs",
      "AMC",
      "Rentals",
      "Leasing",
    ],
    description:
      "Sales, rental, repair and consumables for every major printer and copier brand, backed by same-day service across the UAE.",
    ctaLabel: "Explore Printer & Copier Solutions",
    ctaHref: "/services#print-copier",
  },
  {
    badge: "IT Hardware & Support",
    headline: "IT hardware and support",
    highlight: "that keeps pace with your team",
    keywords: [
      "Computers",
      "Laptops",
      "PC Components",
      "Monitors",
      "Storage & RAM",
      "Networking",
      "Custom PC Builds",
      "IT Equipment",
    ],
    description:
      "From a single laptop to a full office rollout, we supply, configure and support the hardware your business runs on.",
    ctaLabel: "Explore IT Hardware & Support",
    ctaHref: "/services#office-supplies",
  },
  {
    badge: "Service & Support",
    headline: "Every product we sell,",
    highlight: "backed by real engineers",
    keywords: [
      "Print & Copier",
      "IT Infrastructure",
      "Security & CCTV",
      "Digital Services",
      "Office Supplies",
      "Rentals & AMC",
    ],
    description:
      "Repairs, scheduled maintenance and AMC cover delivered by our own team, on everything from a single printer to your full IT and security setup.",
    ctaLabel: "View All Services",
    ctaHref: "/services",
  },
];

/** Rental and contract options highlighted in the home page rental section. */
export type RentalPlan = {
  title: string;
  description: string;
  benefits: string[];
  href: string;
};

export const rentalPlans: RentalPlan[] = [
  {
    title: "Short & long-term rental",
    description:
      "Daily, weekly, monthly or multi-year hire for events, project sites, seasonal peaks and offices that would rather not own hardware.",
    benefits: ["No money up front", "Toner and servicing included", "Free replacement if a unit fails"],
    href: "/services/printer-and-copier-rental",
  },
  {
    title: "Annual maintenance contracts",
    description:
      "Scheduled servicing, priority breakdown response and parts cover across your whole print fleet, for one predictable annual cost.",
    benefits: ["Same-day response for contract customers", "Fixed cost you can budget for", "Mixed-brand fleets on one contract"],
    href: "/services/printer-amc",
  },
  {
    title: "Leasing & FSMA",
    description:
      "Structured leasing and full-service maintenance agreements that bundle hardware, consumables and support into a single line item.",
    benefits: ["Predictable monthly billing", "Hardware refreshed on schedule", "One invoice, one point of contact"],
    href: "/contact",
  },
];

/**
 * "Our Trusted Clients" roster (report §3.4).
 *
 * Source files supplied in `public/imgs/clients-logos` arrived at wildly
 * different sizes and aspect ratios — some with huge blank margins (the
 * actual ADRC mark was a small logo lost in a 1400x204 canvas), and two
 * (`dark: true` below) are white artwork meant for a dark background, which
 * would be invisible on a plain white tile. Both problems are fixed once,
 * here, rather than in the component:
 *   1. Every logo was trimmed to its real content with sharp and re-saved
 *      into `public/imgs/clients/<slug>.png`, so no tile shows dead space.
 *   2. `width`/`height` are the trimmed file's real pixel dimensions, so
 *      `TrustedClients` can scale each logo to fit its tile via
 *      `object-contain` without distorting or cropping any of them,
 *      whatever the aspect ratio.
 *   3. `dark` flags the two logos (Abu Dhabi Refreshments Co. and NSCC
 *      International) that need the dark tile variant to stay legible.
 */
export type Client = {
  name: string;
  logo: string;
  width: number;
  height: number;
  dark?: boolean;
};

export const trustedClients: Client[] = [
  { name: "Nael & Bin Harmal Hydroexport", logo: "/imgs/clients/nbhh.png", width: 1008, height: 184 },
  { name: "Abu Dhabi Refreshments Co.", logo: "/imgs/clients/adrc.png", width: 1366, height: 200, dark: true },
  { name: "Everest", logo: "/imgs/clients/everest.png", width: 256, height: 395 },
  { name: "Al Jawdah Domestic Workers Services", logo: "/imgs/clients/al-jawdah.png", width: 844, height: 843 },
  { name: "GreenLine", logo: "/imgs/clients/greenline.png", width: 884, height: 237 },
  { name: "Trojan Construction Holding", logo: "/imgs/clients/trojan.png", width: 698, height: 176 },
  { name: "NSCC International", logo: "/imgs/clients/nscc-international.png", width: 350, height: 96, dark: true },
  { name: "Hamad Bin Jarwan Advocates & Legal Consultants", logo: "/imgs/clients/hamad-bin-jarwan.png", width: 687, height: 153 },
  { name: "Al Jaber", logo: "/imgs/clients/al-jaber.png", width: 400, height: 130 },
  { name: "Mohammed Rasool Khoory & Sons", logo: "/imgs/clients/mrk.png", width: 250, height: 49 },
  { name: "Al Diyar General Contracting Co", logo: "/imgs/clients/al-diyar.png", width: 276, height: 101 },
  { name: "ZCAA", logo: "/imgs/clients/zcaa.png", width: 1263, height: 218 },
];
