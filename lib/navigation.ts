import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Cctv,
  Cpu,
  Database,
  Network,
  Phone,
  Printer,
  Repeat,
  Wrench,
} from "lucide-react";

import { serviceCategories } from "@/lib/services";
import { productCategories } from "@/lib/products";

export type MenuLink = { label: string; href: string };

export type MenuColumn = {
  title: string;
  icon: LucideIcon;
  /** Column heading is itself a link to the section/listing page. */
  href: string;
  links: MenuLink[];
};

export type MegaMenu = {
  key: string;
  label: string;
  /** Set when the top-level label is itself a page. */
  href?: string;
  /**
   * `columns` renders grouped link lists; `headings` renders one row of
   * large heading tiles (used by Services, which deliberately shows only
   * section headings rather than all 20+ services — report item 8).
   */
  variant: "columns" | "headings";
  columns: MenuColumn[];
  footerNote: string;
  footerLabel: string;
  footerHref: string;
};

/** Product sub-category labels, capped so no column runs too long. */
const MAX_COLUMN_LINKS = 6;

function productColumn(slug: string, icon: LucideIcon): MenuColumn {
  const category = productCategories.find((c) => c.slug === slug);
  const href = `/products/${slug}`;

  return {
    title: category?.title ?? slug,
    icon,
    href,
    /* Sub-category labels all point at the category listing, which is the
       page that actually exists — there are no per-sub-category pages. */
    links: (category?.menuItems ?? [])
      .slice(0, MAX_COLUMN_LINKS)
      .map((label) => ({ label, href })),
  };
}

/**
 * Products: the four categories the client asked for — Sales, Rentals, PC
 * Components and Consumables (report item 4).
 */
const productsMenu: MegaMenu = {
  key: "products",
  label: "Products",
  variant: "columns",
  columns: [
    productColumn("sales", Printer),
    productColumn("rental", Repeat),
    productColumn("pc-components", Cpu),
    productColumn("consumables", Boxes),
  ],
  footerNote: "New, refurbished and rental hardware, plus consumables for every brand we service.",
  footerLabel: "Browse all products",
  footerHref: "/products/printers-copiers",
};

/**
 * Services: headings only, each jumping to its section on the services page
 * (report item 8). Listing every service here would crowd the panel, which
 * is exactly what the client flagged.
 */
const servicesMenu: MegaMenu = {
  key: "services",
  label: "Services",
  href: "/services",
  variant: "headings",
  columns: serviceCategories.map((category) => ({
    title: category.title,
    icon: category.icon,
    href: `/services#${category.key}`,
    links: [],
  })),
  footerNote: "Repairs, maintenance, AMC and IT support delivered by our own engineers.",
  footerLabel: "View all services",
  footerHref: "/services",
};

/**
 * Solutions: grouped by the client's four solution areas, each showing a few
 * real services underneath (report item 11).
 */
const solutionsMenu: MegaMenu = {
  key: "solutions",
  label: "Solutions",
  variant: "columns",
  columns: [
    {
      title: "CCTV & Security",
      icon: Cctv,
      href: "/services/cctv-surveillance",
      links: [
        { label: "IP & HD CCTV Systems", href: "/services/cctv-surveillance" },
        { label: "Access Control Systems", href: "/services/communication-and-lv-systems" },
        { label: "Biometric Attendance", href: "/services/communication-and-lv-systems" },
        { label: "Cybersecurity Services", href: "/services/cybersecurity-services" },
      ],
    },
    {
      title: "Network & Data",
      icon: Network,
      href: "/services/networking-and-switching",
      links: [
        { label: "Structured Cabling", href: "/services/networking-and-switching" },
        { label: "Wi-Fi & LAN/WAN Setup", href: "/services/networking-and-switching" },
        { label: "Firewall & Security Setup", href: "/services/cybersecurity-services" },
        { label: "Server Virtualisation", href: "/services/datacenter-solutions" },
      ],
    },
    {
      title: "Backup & Protection",
      icon: Database,
      href: "/services/data-backup-and-protection",
      links: [
        { label: "Cloud Data Backup", href: "/services/data-backup-and-protection" },
        { label: "On-Premise & NAS Backup", href: "/services/data-backup-and-protection" },
        { label: "Data Loss Prevention", href: "/services/data-backup-and-protection" },
        { label: "Business Email Solutions", href: "/services/business-email-solutions" },
      ],
    },
    {
      title: "Communication & Power",
      icon: Phone,
      href: "/services/communication-and-lv-systems",
      links: [
        { label: "IP Phone Solutions", href: "/services/communication-and-lv-systems" },
        { label: "Conference Solutions", href: "/services/communication-and-lv-systems" },
        { label: "UPS Solutions", href: "/services/datacenter-solutions" },
        { label: "IT Datacenter Solutions", href: "/services/datacenter-solutions" },
      ],
    },
  ],
  footerNote: "Security, networking and data protection, designed and installed end to end.",
  footerLabel: "View all services",
  footerHref: "/services",
};

/**
 * Rentals: leads with the rental listing page (report item 5), then the
 * contract types.
 */
const rentalsMenu: MegaMenu = {
  key: "rentals",
  label: "Rentals",
  variant: "columns",
  columns: [
    {
      title: "Printers & Copiers",
      icon: Printer,
      href: "/products/rental",
      links: [
        { label: "Browse rental machines", href: "/products/rental" },
        { label: "Short & Long-Term Rental", href: "/services/printer-and-copier-rental" },
        { label: "Corporate Printer Rental", href: "/services/printer-and-copier-rental" },
        { label: "Event & Temporary Rental", href: "/services/printer-and-copier-rental" },
      ],
    },
    {
      title: "Managed Print Services",
      icon: Wrench,
      href: "/services/printer-amc",
      links: [
        { label: "Maintenance Support", href: "/services/printer-amc" },
        { label: "Toner & Consumables Management", href: "/services/toner-and-cartridges" },
        { label: "Pay-Per-Print Solutions", href: "/services/printer-amc" },
      ],
    },
    {
      title: "Contracts",
      icon: Repeat,
      href: "/services/printer-amc",
      links: [
        { label: "AMC", href: "/services/printer-amc" },
        { label: "Annual Rental Contracts", href: "/services/printer-and-copier-rental" },
        { label: "Leasing", href: "/contact" },
        { label: "FSMA", href: "/services/managed-it-services" },
      ],
    },
  ],
  footerNote: "Short and long-term rental, AMC and leasing available across the UAE.",
  footerLabel: "Browse rental machines",
  footerHref: "/products/rental",
};

export const megaMenus: MegaMenu[] = [
  productsMenu,
  servicesMenu,
  solutionsMenu,
  rentalsMenu,
];

/** Plain top-level links, in the order they appear in the bar. */
export const primaryLinks: MenuLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

/** Report item 6: Printers & Copiers promoted to its own nav item. */
export const printersNavLink: MenuLink = {
  label: "Printers & Copiers",
  href: "/products/printers-copiers",
};
