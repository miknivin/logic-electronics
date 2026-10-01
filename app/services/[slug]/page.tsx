import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";

import { BrandGrid } from "@/components/brand-grid";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { QuoteButton } from "@/components/quote-button";
import { ServiceCard } from "@/components/service-card";
import {
  getCategory,
  getService,
  getServicesByCategory,
  services,
} from "@/lib/services";
import { brandsForServiceCategory, contact, site } from "@/lib/site";

/** Stable anchor id for an offering, e.g. "UPS solutions" -> "ups-solutions". */
function offeringId(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render every service page at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const category = getCategory(service.category);
  const relatedServices = getServicesByCategory(service.category)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const Icon = service.icon;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "LocalBusiness",
      name: site.legalName,
      telephone: contact.primaryPhone,
      email: contact.email,
    },
    areaServed: "United Arab Emirates",
    serviceType: category?.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        title={service.title}
        description={service.tagline}
      />

      {/* ------------------------------------------------- overview + aside */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                {category ? (
                  <Link
                    href={`/services#${category.key}`}
                    className="text-sm font-semibold text-primary-700 transition-colors hover:text-secondary-600"
                  >
                    {category.title}
                  </Link>
                ) : null}
              </div>

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-600">
                {service.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              {/* What's included */}
              <h2 className="mt-14 text-2xl font-bold tracking-tight sm:text-3xl">
                What&apos;s included
              </h2>
              <span className="mt-5 block h-1 w-16 rounded-full bg-secondary-500" />

              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                {service.offerings.map((offering) => (
                  /* Anchored so a Solutions menu link can land on the exact
                     offering it names, and `target:` highlights it on arrival
                     (report items 19 and 30). */
                  <div
                    key={offering.title}
                    id={offeringId(offering.title)}
                    className="scroll-mt-36 rounded-xl border border-slate-200 bg-white p-6 target:border-secondary-400 target:bg-secondary-50 target:ring-2 target:ring-secondary-200"
                  >
                    <dt className="flex items-start gap-2.5 text-base font-bold text-primary-950">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-secondary-500"
                        aria-hidden="true"
                      />
                      {offering.title}
                    </dt>
                    <dd className="mt-2.5 pl-6.5 text-sm leading-relaxed text-slate-600">
                      {offering.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Sticky sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                  <h2 className="text-lg font-bold">Why choose us</h2>
                  <ul className="mt-5 space-y-3.5">
                    {service.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500"
                          aria-hidden="true"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-2xl bg-primary-800 bg-circuit p-7 text-white">
                  <h2 className="text-lg font-bold text-white">
                    Get a quote for {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-primary-100">
                    Tell us what you need and we&apos;ll come back with a clear
                    price. No obligation.
                  </p>

                  <QuoteButton
                    service={service.title}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-600"
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </QuoteButton>

                  <a
                    href={contact.primaryPhoneHref}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {contact.primaryPhone}
                  </a>

                  <p className="mt-5 border-t border-primary-700 pt-5 text-xs text-primary-200">
                    {contact.hours} · 24/7 support for contract customers
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- related */}
      {relatedServices.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Related services
                </h2>
                <p className="mt-3 text-slate-600">
                  Other services in {category?.title}.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-secondary-600"
              >
                View all services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Report item 10 / §4.1: the brands relevant to this service. */}
      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Brands we supply and service
          </p>
        </Container>
        <div className="mt-8">
          <BrandGrid items={brandsForServiceCategory(service.category)} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
