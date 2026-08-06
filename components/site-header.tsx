"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, Menu, Phone, X } from "lucide-react";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { QuoteButton } from "@/components/quote-button";
import { contact, navLinks } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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

      {/* Main navigation */}
      <Container>
        <nav
          className="flex items-center justify-between gap-4 py-3"
          aria-label="Main"
        >
          <Logo priority />

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-primary-700"
                    : "text-slate-600 hover:text-primary-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <QuoteButton className="ml-3 inline-flex items-center rounded-md bg-secondary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-secondary-600">
              Request a Quote
            </QuoteButton>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-primary-800 transition-colors hover:bg-primary-50 md:hidden"
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
        </nav>
      </Container>

      {/* Mobile menu */}
      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white md:hidden"
        >
          <Container>
            <div className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-primary-50 text-primary-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

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
