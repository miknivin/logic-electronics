import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Target,
  Users,
  Zap,
} from "lucide-react";

import { BrandGrid } from "@/components/brand-grid";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import {
  branches,
  commitments,
  site,
  stats,
  yearsOfExperience,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Founded in Abu Dhabi in 2000, ${site.name} is one of the leading electronics service centres in the UAE, with offices across the Emirates, India and the United Kingdom.`,
};

const values = [
  {
    icon: Target,
    title: "Our mission",
    description:
      "To keep our customers happy with efficient, effective service, and to be the one company they call for anything to do with office equipment, IT and supplies.",
  },
  {
    icon: Zap,
    title: "Our approach",
    description:
      "Diagnose it properly, quote it clearly, fix it once. We use branded parts and tell you honestly when something is better replaced than repaired.",
  },
  {
    icon: Users,
    title: "Our people",
    description:
      "Experienced technicians and certified IT specialists who get to know your setup, so you are not explaining it from scratch on every visit.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "About" }]}
        title="A trusted service partner in the UAE since 2000"
        description={`${site.legalName} is an ISO 9001:2015 certified electronics service centre and office supplier, working with multinational, medium and small-scale organisations.`}
      />

      {/* ---------------------------------------------------------- story */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                align="left"
                eyebrow="About us"
                title="Over two decades keeping UAE offices running"
              />

              <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
                <p>
                  Logic Electronics started in Abu Dhabi in 2000 and is now one
                  of the leading electronics service centres in the United Arab
                  Emirates, with a number of major companies on our books. Over{" "}
                  {yearsOfExperience} years we have built a reputation for
                  looking after multinational, medium and small-scale
                  organisations right across the country.
                </p>
                <p>
                  We have spent that time working with every kind of electronic
                  product: copiers, printers, computers, displays, networking
                  and security hardware. We sell new equipment, and we also
                  recondition and supply refurbished machines when that makes
                  more sense for the customer.
                </p>
                <p>
                  Alongside the service business we supply stationery too.
                  Office and school stationery, laboratory equipment, art and
                  craft materials and mobile accessories. It means one supplier,
                  one account and one delivery, rather than juggling several
                  vendors.
                </p>
                <p>
                  We believe customers play a big part in whether any
                  organisation reaches its goals. Keeping them satisfied is what
                  we care about most, and we work hard to deliver quality,
                  efficient service at a price that is fair.
                </p>
              </div>
            </div>

            {/* Facts panel */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="text-lg font-bold">At a glance</h3>

                <dl className="mt-6 grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="block text-3xl font-bold text-primary-700">
                          {stat.value}
                        </span>
                        <span className="mt-1 block text-sm text-slate-600">
                          {stat.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <p className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    {site.certification}
                  </p>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Support commitments
                  </h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {commitments.map((item) => (
                      <li
                        key={item}
                        className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-primary-900 ring-1 ring-slate-200"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- values */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Straightforward service, without the runaround"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-slate-200 bg-white p-8"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- locations */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Where to find us"
            title="Five offices across three countries"
            description="Head office in Abu Dhabi, with branches in Madinat Zayed and Mussafah, plus international presence in India and the United Kingdom."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <div
                key={`${branch.city}-${branch.country}`}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {branch.isHeadOffice ? (
                    <span className="rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700">
                      Head office
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-lg font-bold">{branch.city}</h3>
                <p className="mt-1 text-sm text-slate-500">{branch.country}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {branch.address}
                </p>

                <ul className="mt-4 space-y-1.5 text-sm">
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
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- brands */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Authorised brands we supply and service
          </p>
          <div className="mt-9">
            <BrandGrid />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-800"
            >
              See what we can do for you
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Work with a partner who answers the phone"
        description="Talk to our team about a service contract, an equipment quote or a project you are planning."
      />
    </>
  );
}
