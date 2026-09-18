import type { Metadata } from "next";
import {
  Building2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Container } from "@/components/container";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { branches, contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name}. Offices in Abu Dhabi, Madinat Zayed and Mussafah, plus India and the UK. Call ${contact.primaryPhone} or email ${contact.email}.`,
};

const quickContacts = [
  {
    icon: Phone,
    label: "Call us",
    value: contact.primaryPhone,
    href: contact.primaryPhoneHref,
    note: "Landline: " + contact.landline,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.whatsapp,
    href: contact.whatsappHref,
    note: `Ask for ${contact.contactPerson}`,
  },
  {
    icon: Mail,
    label: "Email us",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: contact.emailAlt,
  },
  {
    icon: Clock,
    label: "Opening hours",
    value: contact.hours,
    note: "24/7 support for AMC customers",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Contact" }]}
        title="Let's talk about what your office needs"
        description="Send us the details and we'll come back with a clear quote. For urgent breakdowns, call or WhatsApp us directly."
        image={{
          src: "/imgs/contact/team.jpg",
          alt: "A Logic Electronics team member ready to help with your enquiry",
        }}
      />

      {/* ------------------------------------------------- quick contacts */}
      <section className="border-b border-slate-200 bg-slate-50 py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickContacts.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </h2>
                  <p className="mt-2 font-semibold text-primary-950">
                    {item.value}
                  </p>
                  {item.note ? (
                    <p className="mt-1 text-sm text-slate-500">{item.note}</p>
                  ) : null}
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white p-6"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- form + offices */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                align="left"
                eyebrow="Send an enquiry"
                title="Tell us what you need"
                description="Fill in the form and our team will get back to you, usually within one working day."
              />

              <div className="mt-10">
                <EnquiryForm source="contact-page" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold tracking-tight">Our offices</h2>
              <span className="mt-4 block h-1 w-16 rounded-full bg-secondary-500" />

              <div className="mt-8 space-y-5">
                {branches.map((branch) => (
                  <div
                    key={`${branch.city}-${branch.country}`}
                    className="rounded-xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                          <Building2 className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-base font-bold">{branch.city}</h3>
                          <p className="text-xs text-slate-500">
                            {branch.country}
                          </p>
                        </div>
                      </div>
                      {branch.isHeadOffice ? (
                        <span className="shrink-0 rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700">
                          Head office
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {branch.address}
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                      {branch.phones.map((phone) => (
                        <li key={phone}>
                          <a
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="font-medium text-primary-700 transition-colors hover:text-secondary-600"
                          >
                            {phone}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {branch.email ? (
                      <a
                        href={`mailto:${branch.email}`}
                        className="mt-2 inline-block break-all text-sm text-slate-500 transition-colors hover:text-secondary-600"
                      >
                        {branch.email}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- map */}
      <section className="border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-5 py-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-primary-950">
            Head office · Khalifa Street, Abu Dhabi
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Khalifa+Street,+Abu+Dhabi,+UAE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-secondary-600"
          >
            Open in Google Maps
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="h-96 w-full bg-slate-100">
          <iframe
            title="Logic Electronics head office location, Khalifa Street, Abu Dhabi"
            src="https://www.google.com/maps?q=Khalifa+Street,+Abu+Dhabi,+UAE&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </section>
    </>
  );
}
