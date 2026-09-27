"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  Phone,
  Smartphone,
  X,
} from "lucide-react";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { QuoteButton } from "@/components/quote-button";
import { megaMenus, primaryLinks, printersNavLink } from "@/lib/navigation";
import { contact } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  /**
   * Which desktop dropdown is open, by key. Holding a single key rather than
   * a flag per menu means opening one inherently closes any other, so two
   * panels can never overlap.
   */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
  };

  const closeDropdown = () => setOpenMenu(null);

  /* Escape closes the open panel, and a click anywhere outside the nav does
     too — hover alone isn't enough once a keyboard or touch user has opened
     one. */
  useEffect(() => {
    if (!openMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  /* Navigating to a new route should never leave a panel hanging open —
     including via the browser's back button, which no click handler sees.
     Adjusted during render (React's documented pattern for reacting to a
     changed value) rather than in an effect, which would queue a second
     render pass just to close a menu. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleMobileGroup = (key: string) =>
    setOpenMobileGroup((current) => (current === key ? null : key));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Utility bar */}
      <div className="hidden bg-primary-800 text-primary-50 xl:block">
        <Container>
          <div className="flex h-10 items-center justify-between text-sm">
            <p className="text-primary-100">
              ISO 9001:2015 Certified · Serving the UAE since 2000
            </p>
            <div className="flex items-center gap-6">
              {/* Mobile gets the handset glyph, the landline a desk-phone
                  one, so the two numbers are told apart at a glance. */}
              <a
                href={contact.primaryPhoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-secondary-300"
              >
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Mobile: </span>
                {contact.primaryPhone}
              </a>
              <a
                href={contact.landlineHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-secondary-300"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Telephone: </span>
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

          {/* Centre-aligned links: Home, About, then a mega menu per item
              below, then Contact — matching the report's requested order. */}
          <div
            ref={navRef}
            className="hidden shrink-0 items-center justify-center gap-1 xl:flex"
          >
            {primaryLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "text-primary-700"
                      : "text-slate-600 hover:text-primary-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Report item 6: the core business gets its own nav item. */}
            <Link
              href={printersNavLink.href}
              aria-current={isActive(printersNavLink.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                isActive(printersNavLink.href)
                  ? "text-primary-700"
                  : "text-slate-600 hover:text-primary-700"
              }`}
            >
              {printersNavLink.label}
            </Link>

            {megaMenus.map((menu) => {
              const isOpen = openMenu === menu.key;
              const triggerClasses = `inline-flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                isOpen || (menu.href && isActive(menu.href))
                  ? "text-primary-700"
                  : "text-slate-600 hover:text-primary-700"
              }`;
              const chevron = (
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              );

              return (
                <div
                  key={menu.key}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menu.key)}
                  onMouseLeave={closeDropdown}
                >
                  {menu.href ? (
                    <Link
                      href={menu.href}
                      aria-expanded={isOpen}
                      onFocus={() => setOpenMenu(menu.key)}
                      onClick={closeDropdown}
                      className={triggerClasses}
                    >
                      {menu.label}
                      {chevron}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onFocus={() => setOpenMenu(menu.key)}
                      onClick={() =>
                        setOpenMenu((current) =>
                          current === menu.key ? null : menu.key,
                        )
                      }
                      className={triggerClasses}
                    >
                      {menu.label}
                      {chevron}
                    </button>
                  )}

                  {/* `pt-2` rather than a translate keeps the panel's box flush
                      against the trigger, so moving the pointer down onto it
                      never crosses a dead gap that would close the menu. */}
                  <div
                    className={`absolute left-1/2 top-full z-40 w-screen max-w-4xl -translate-x-1/2 pt-2 transition-all duration-150 ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black/5">
                      {menu.variant === "headings" ? (
                        /* Headings only — clicking one jumps to that section
                           of the services page (report item 8). */
                        <div className="grid grid-cols-3 gap-3 p-6">
                          {menu.columns.map((column) => {
                            const Icon = column.icon;
                            return (
                              <Link
                                key={column.title}
                                href={column.href}
                                onClick={closeDropdown}
                                className="group/head flex items-center gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-primary-100 hover:bg-primary-50"
                              >
                                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-700 transition-colors group-hover/head:bg-primary-700 group-hover/head:text-white">
                                  <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span className="flex-1 text-sm font-semibold text-primary-950">
                                  {column.title}
                                </span>
                                <ArrowUpRight
                                  className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-200 group-hover/head:-translate-y-0.5 group-hover/head:translate-x-0.5 group-hover/head:text-secondary-500"
                                  aria-hidden="true"
                                />
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <div
                          className={`grid gap-x-6 gap-y-6 p-8 ${
                            menu.columns.length >= 4
                              ? "grid-cols-4"
                              : "grid-cols-3"
                          }`}
                        >
                          {menu.columns.map((column) => {
                            const Icon = column.icon;
                            return (
                              <div key={column.title}>
                                <Link
                                  href={column.href}
                                  onClick={closeDropdown}
                                  className="group/col mb-3 flex items-center gap-2 text-sm font-bold text-primary-950 transition-colors hover:text-primary-700"
                                >
                                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-700 transition-colors group-hover/col:bg-primary-700 group-hover/col:text-white">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                  </span>
                                  {column.title}
                                </Link>
                                <ul>
                                  {column.links.map((link) => (
                                    <li key={`${column.title}-${link.label}`}>
                                      <Link
                                        href={link.href}
                                        onClick={closeDropdown}
                                        className="group/link flex items-center justify-between gap-2 rounded-md px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
                                      >
                                        <span>{link.label}</span>
                                        <ArrowUpRight
                                          className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-secondary-500"
                                          aria-hidden="true"
                                        />
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-8 py-4">
                        <p className="text-sm text-slate-600">{menu.footerNote}</p>
                        <Link
                          href={menu.footerHref}
                          onClick={closeDropdown}
                          className="group/all inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-secondary-600"
                        >
                          {menu.footerLabel}
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover/all:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

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
            <QuoteButton className="hidden items-center rounded-md bg-secondary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-secondary-600 xl:inline-flex">
              Request a Quote
            </QuoteButton>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-primary-800 transition-colors hover:bg-primary-50 xl:hidden"
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
          className="border-t border-slate-200 bg-white xl:hidden"
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

              {/* Report item 6: mirrored on mobile as its own entry. */}
              <Link
                href={printersNavLink.href}
                onClick={closeMenu}
                aria-current={
                  isActive(printersNavLink.href) ? "page" : undefined
                }
                className={`rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                  isActive(printersNavLink.href)
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {printersNavLink.label}
              </Link>

              {megaMenus.map((menu) => (
                <div key={menu.key} className="rounded-md">
                  <div className="flex items-center justify-between">
                    {menu.href ? (
                      <Link
                        href={menu.href}
                        onClick={closeMenu}
                        className={`flex-1 rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                          isActive(menu.href)
                            ? "bg-primary-50 text-primary-700"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {menu.label}
                      </Link>
                    ) : (
                      <span className="flex-1 px-3 py-3 text-base font-semibold text-slate-700">
                        {menu.label}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleMobileGroup(menu.key)}
                      aria-expanded={openMobileGroup === menu.key}
                      className="cursor-pointer rounded-md p-3 text-slate-500 hover:bg-slate-50"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openMobileGroup === menu.key ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                      <span className="sr-only">Toggle {menu.label} list</span>
                    </button>
                  </div>
                  {openMobileGroup === menu.key ? (
                    <div className="ml-3 flex flex-col gap-4 border-l border-slate-200 py-2 pl-4">
                      {menu.columns.map((column) => (
                        <div key={column.title}>
                          <Link
                            href={column.href}
                            onClick={closeMenu}
                            className="text-sm font-bold text-primary-950"
                          >
                            {column.title}
                          </Link>
                          {column.links.length > 0 ? (
                            <ul className="mt-2 space-y-2">
                              {column.links.map((link) => (
                                <li key={`${column.title}-${link.label}`}>
                                  <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="text-sm text-slate-600"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

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
                  <Smartphone
                    className="h-4 w-4 text-secondary-500"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Mobile: </span>
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
                  <span className="sr-only">Telephone: </span>
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
