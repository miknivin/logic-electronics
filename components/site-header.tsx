"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Cctv,
  ChevronDown,
  Cpu,
  Globe,
  Mail,
  Menu,
  Phone,
  Printer,
  Repeat,
  ShoppingBag,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { QuoteButton } from "@/components/quote-button";
import { getServicesByCategory, serviceCategories } from "@/lib/services";
import { contact, rentalPlans } from "@/lib/site";

/** Small glyph per service category, so each mega-menu column reads at a glance. */
const categoryIcons: Record<string, LucideIcon> = {
  "print-copier": Printer,
  "it-infrastructure": Cpu,
  "security-communication": Cctv,
  digital: Globe,
  "office-supplies": ShoppingBag,
};

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleMobileGroup = (key: string) =>
    setOpenMobileGroup((current) => (current === key ? null : key));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Utility bar */}
      <div className="hidden bg-primary-800 text-primary-50 lg:block">
        <Container>
          <div className="flex h-10 items-center justify-between text-sm">
            <p className="text-primary-100">
              ISO 9001:2015 Certified · Serving the UAE since 2000
            </p>
            <div className="flex items-center gap-6">
              <a
                href={contact.primaryPhoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-secondary-300"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.primaryPhone}
              </a>
              <a
                href={contact.landlineHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-secondary-300"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.landline}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-secondary-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {contact.email}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main navigation. Three flex slots, the outer two set to flex-1 so
          they always match width and the centre slot sits exactly in the
          middle, whatever the logo or CTA measure — a plain grid track
          (e.g. `grid-cols-[1fr_auto_1fr]`) does the same in principle but
          its "1fr" tracks have an implicit min-content floor, which pushed
          the CTA onto its own line the moment the centre nav got wide
          enough to fill the row; flex-1 has no such floor. */}
      <Container>
        <nav className="flex items-center justify-between gap-4 py-3" aria-label="Main">
          <div className="flex flex-1 items-center">
            <Logo priority />
          </div>

          {/* Centre-aligned links, with mega menus for Services and Rentals. */}
          <div className="hidden shrink-0 items-center justify-center gap-1 lg:flex">
            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "text-primary-700"
                  : "text-slate-600 hover:text-primary-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                isActive("/about")
                  ? "text-primary-700"
                  : "text-slate-600 hover:text-primary-700"
              }`}
            >
              About
            </Link>

            {/* Services mega menu */}
            <div className="group relative">
              <Link
                href="/services"
                aria-current={isActive("/services") ? "page" : undefined}
                className={`inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive("/services")
                    ? "text-primary-700"
                    : "text-slate-600 hover:text-primary-700"
                }`}
              >
                Services
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                  aria-hidden="true"
                />
              </Link>

              <div className="invisible absolute left-1/2 top-full z-40 w-screen max-w-5xl -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black/5">
                  <div className="grid grid-cols-5 gap-6 p-8">
                    {serviceCategories.map((category) => {
                      const Icon = categoryIcons[category.key] ?? Printer;
                      const categoryServices = getServicesByCategory(
                        category.key,
                      ).slice(0, 6);

                      return (
                        <div key={category.key}>
                          <Link
                            href={`/services#${category.key}`}
                            className="group/col inline-flex items-center gap-2 text-sm font-bold text-primary-950 transition-colors hover:text-primary-700"
                          >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary-50 text-primary-700 transition-colors group-hover/col:bg-primary-700 group-hover/col:text-white">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            {category.title}
                          </Link>
                          <ul className="mt-4 space-y-2.5">
                            {categoryServices.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  className="text-sm text-slate-600 transition-colors hover:text-secondary-600"
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-8 py-4">
                    <p className="text-sm text-slate-600">
                      20+ services across five areas of the business.
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-secondary-600"
                    >
                      View all services
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Rentals mega menu */}
            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-primary-700"
              >
                Rentals
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                  aria-hidden="true"
                />
              </button>

              <div className="invisible absolute left-1/2 top-full z-40 w-screen max-w-3xl -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black/5">
                  <div className="grid grid-cols-3 gap-6 p-8">
                    {rentalPlans.map((plan) => (
                      <Link
                        key={plan.title}
                        href={plan.href}
                        className="group/plan"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary-50 text-secondary-600 transition-colors group-hover/plan:bg-secondary-500 group-hover/plan:text-white">
                          <Repeat className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <p className="mt-3 text-sm font-bold text-primary-950 transition-colors group-hover/plan:text-primary-700">
                          {plan.title}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                          {plan.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-8 py-4">
                    <p className="text-sm text-slate-600">
                      Short and long-term rental, AMC and leasing available.
                    </p>
                    <a
                      href={contact.primaryPhoneHref}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-secondary-600"
                    >
                      Call {contact.primaryPhone}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                isActive("/contact")
                  ? "text-primary-700"
                  : "text-slate-600 hover:text-primary-700"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right slot: desktop CTA and mobile toggle share it, so it
              stays flex-1/justify-end at every breakpoint and the visible
              child is always pinned to the right edge. */}
          <div className="flex flex-1 items-center justify-end">
            <QuoteButton className="hidden items-center rounded-md bg-secondary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-secondary-600 lg:inline-flex">
              Request a Quote
            </QuoteButton>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-primary-800 transition-colors hover:bg-primary-50 lg:hidden"
            >
              <span className="sr-only">
                {isMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white lg:hidden"
        >
          <Container>
            <div className="flex flex-col gap-1 py-4">
              <Link
                href="/"
                onClick={closeMenu}
                aria-current={pathname === "/" ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                  pathname === "/"
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={closeMenu}
                aria-current={isActive("/about") ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                  isActive("/about")
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                About
              </Link>

              {/* Services accordion */}
              <div className="rounded-md">
                <div className="flex items-center justify-between">
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className={`flex-1 rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                      isActive("/services")
                        ? "bg-primary-50 text-primary-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup("services")}
                    aria-expanded={openMobileGroup === "services"}
                    className="rounded-md p-3 text-slate-500 hover:bg-slate-50"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openMobileGroup === "services" ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Toggle services list</span>
                  </button>
                </div>
                {openMobileGroup === "services" ? (
                  <div className="ml-3 flex flex-col gap-4 border-l border-slate-200 py-2 pl-4">
                    {serviceCategories.map((category) => (
                      <div key={category.key}>
                        <Link
                          href={`/services#${category.key}`}
                          onClick={closeMenu}
                          className="text-sm font-bold text-primary-950"
                        >
                          {category.title}
                        </Link>
                        <ul className="mt-2 space-y-2">
                          {getServicesByCategory(category.key).map(
                            (service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={closeMenu}
                                  className="text-sm text-slate-600"
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Rentals accordion */}
              <div className="rounded-md">
                <button
                  type="button"
                  onClick={() => toggleMobileGroup("rentals")}
                  aria-expanded={openMobileGroup === "rentals"}
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Rentals
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openMobileGroup === "rentals" ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openMobileGroup === "rentals" ? (
                  <div className="ml-3 flex flex-col gap-3 border-l border-slate-200 py-2 pl-4">
                    {rentalPlans.map((plan) => (
                      <Link
                        key={plan.title}
                        href={plan.href}
                        onClick={closeMenu}
                        className="text-sm font-semibold text-slate-700"
                      >
                        {plan.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <Link
                href="/contact"
                onClick={closeMenu}
                aria-current={isActive("/contact") ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                  isActive("/contact")
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Contact
              </Link>

              <QuoteButton
                onClick={closeMenu}
                className="mt-2 inline-flex items-center justify-center rounded-md bg-secondary-500 px-5 py-3 text-base font-semibold text-white"
              >
                Request a Quote
              </QuoteButton>

              <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm">
                <a
                  href={contact.primaryPhoneHref}
                  className="inline-flex items-center gap-2 font-medium text-slate-700"
                >
                  <Phone
                    className="h-4 w-4 text-secondary-500"
                    aria-hidden="true"
                  />
                  {contact.primaryPhone}
                </a>
                <a
                  href={contact.landlineHref}
                  className="inline-flex items-center gap-2 font-medium text-slate-700"
                >
                  <Phone
                    className="h-4 w-4 text-secondary-500"
                    aria-hidden="true"
                  />
                  {contact.landline}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 font-medium text-slate-700"
                >
                  <Mail
                    className="h-4 w-4 text-secondary-500"
                    aria-hidden="true"
                  />
                  {contact.email}
                </a>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
