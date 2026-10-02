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

import { productCategories } from "@/lib/products";
import { serviceCategories } from "@/lib/services";

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

/* Columns list every sub-category the report specifies — truncating hid
   items like "Keyboards & Mice" and drew a revision round. */

function productColumn(slug: string, icon: LucideIcon): MenuColumn {
  const category = productCategories.find((c) => c.slug === slug);
  const href = `/products/${slug}`;

  return {
    title: category?.title ?? slug,
    icon,
    href,
    /* Each sub-category links to the listing pre-filtered to itself, so
       "New Printers" and "Refurbished Printers" land on different results
       rather than the same unfiltered page (report items 15, 17, 18). */
    links: (category?.subcategories ?? [])
      .map((sub) => ({
        label: sub.label,
        href: `/products/${sub.linkTo ?? slug}?type=${sub.slug}`,
      })),
  };
}

/**
 * Products: the four categories the client asked for — Sales, Rentals, PC
 * Components and Consumables (report item 4).
 */
const productsMenu: MegaMenu = {
  key: "products",
  label: "Products",
  href: "/products",
  variant: "columns",
  columns: [
    productColumn("sales", Printer),
    productColumn("rental", Repeat),
    productColumn("pc-components", Cpu),
    productColumn("consumables", Boxes),
  ],
  footerNote: "New, refurbished and rental hardware, plus consumables for every brand we service.",
  footerLabel: "Browse all products",
  footerHref: "/products",
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
  /*
   * The five category headings that actually exist as sections on the
   * services page, every one linking to its own section. An earlier version
   * listed the report's seven headings, but three of those had no section to
   * land on and jumped into individual service pages instead — the client
   * flagged the inconsistency. Uniform behaviour matters more here than
   * matching the report's wording.
   */
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
        { label: "IP & HD CCTV Systems", href: "/services/cctv-surveillance#camera-supply-and-installation" },
        { label: "NVR / DVR Systems", href: "/services/cctv-surveillance#recording-and-storage" },
        { label: "Remote Monitoring", href: "/services/cctv-surveillance#remote-and-mobile-viewing" },
        { label: "Access Control Systems", href: "/services/communication-and-lv-systems#access-control" },
        { label: "Biometric Attendance", href: "/services/communication-and-lv-systems#biometric-attendance" },
      ],
    },
    {
      title: "Network & Data",
      icon: Network,
      href: "/services/networking-and-switching",
      links: [
        { label: "Structured Cabling", href: "/services/networking-and-switching#structured-cabling" },
        { label: "Wi-Fi & LAN/WAN Setup", href: "/services/networking-and-switching#wi-fi-services" },
        { label: "Firewall & Security Setup", href: "/services/cybersecurity-services#next-generation-firewall" },
        { label: "NAS & Data Storage", href: "/services/datacenter-solutions#nas-storage" },
        { label: "Server Virtualisation", href: "/services/datacenter-solutions#virtualisation" },
      ],
    },
    {
      title: "Backup & Protection",
      icon: Database,
      href: "/services/data-backup-and-protection",
      links: [
        { label: "Cloud Data Backup", href: "/services/data-backup-and-protection#cloud-data-backup" },
        { label: "On-Premise Backup", href: "/services/data-backup-and-protection#on-premise-backup" },
        { label: "Workstation & NAS Backup", href: "/services/data-backup-and-protection#workstation-and-nas-backup" },
        { label: "VM Backup", href: "/services/data-backup-and-protection#virtual-machine-backup" },
        { label: "Data Loss Prevention", href: "/services/data-backup-and-protection#data-loss-prevention" },
      ],
    },
    {
      title: "Communication & Power",
      icon: Phone,
      href: "/services/communication-and-lv-systems",
      links: [
        { label: "IP Phone Solutions", href: "/services/communication-and-lv-systems#ip-phone-solutions" },
        { label: "Conference Solutions", href: "/services/communication-and-lv-systems#conference-solutions" },
        { label: "Intercom Systems", href: "/services/communication-and-lv-systems#intercom-systems" },
        { label: "UPS Solutions", href: "/services/datacenter-solutions#ups-solutions" },
        { label: "Environmental Control", href: "/services/datacenter-solutions#environmental-control" },
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
        { label: "Leasing", href: "/services/equipment-leasing" },
        { label: "FSMA", href: "/services/fsma" },
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

/* Report item 14 reversed item 6: the standalone "Printers & Copiers" nav
   link is gone. The entry inside Products now covers it, which only became
   safe once the Products sub-links stopped all pointing at one page. */
