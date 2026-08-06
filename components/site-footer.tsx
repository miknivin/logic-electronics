import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { serviceCategories } from "@/lib/services";
import {
  branches,
  contact,
  FOUNDED_YEAR,
  navLinks,
  site,
  socialLinks,
} from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-primary-950 text-primary-100">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="inline-flex rounded-lg bg-white px-3 py-2">
              <Logo size="lg" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-200">
              {site.legalName}. A leading electronics service centre and office
              supplier in Abu Dhabi, delivering print, IT, security and
              stationery solutions across the UAE since {FOUNDED_YEAR}.
            </p>
            <p className="mt-4 inline-flex rounded-full bg-primary-900 px-3 py-1.5 text-xs font-semibold text-secondary-300">
              {site.certification}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-200 transition-colors hover:text-secondary-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {serviceCategories.map((category) => (
                <li key={category.key}>
                  <Link
                    href={`/services#${category.key}`}
                    className="text-primary-200 transition-colors hover:text-secondary-300"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={contact.primaryPhoneHref}
                  className="inline-flex items-start gap-3 text-primary-200 transition-colors hover:text-secondary-300"
                >
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400"
                    aria-hidden="true"
                  />
                  {contact.primaryPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-start gap-3 break-all text-primary-200 transition-colors hover:text-secondary-300"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400"
                    aria-hidden="true"
                  />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-200">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400"
                  aria-hidden="true"
                />
                <span>
                  {branches
                    .map((branch) => branch.city)
                    .join(" · ")}
                </span>
              </li>
            </ul>

            <div className="mt-6 flex gap-4 text-sm">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-300 transition-colors hover:text-secondary-300"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-primary-900 py-6 text-xs text-primary-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Abu Dhabi · Madinat Zayed · Mussafah · India · United Kingdom</p>
        </div>
      </Container>
    </footer>
  );
}
