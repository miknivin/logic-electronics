import type { Metadata } from "next";

import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ServiceCard } from "@/components/service-card";
import { ServiceCategoryNav } from "@/components/service-category-nav";
import {
  getServicesByCategory,
  serviceCategories,
  services,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Printer and copier sales, rental, repair and AMC; managed IT, networking, cybersecurity and backup; CCTV and access control; websites and digital marketing; office stationery and spare parts across the UAE.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Services" }]}
        title="Our Services"
        description={`${services.length} services across five areas of the business: print and copier solutions, IT infrastructure, security and communication, digital solutions, and office supplies.`}
      />

      {/* Category quick-nav */}
      <section className="border-b border-slate-200 bg-slate-50">
        <Container>
          <ServiceCategoryNav categories={serviceCategories} />
        </Container>
      </section>

      {/* Category sections */}
      {serviceCategories.map((category, index) => {
        const categoryServices = getServicesByCategory(category.key);

        return (
          <section
            key={category.key}
            id={category.key}
            className={`scroll-mt-32 py-16 sm:py-20 ${
              index % 2 === 1 ? "bg-slate-50" : ""
            }`}
          >
            <Container>
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-600">
                    {String(index + 1).padStart(2, "0")} · Category
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    {category.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {category.description}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-slate-500">
                  {categoryServices.length}{" "}
                  {categoryServices.length === 1 ? "service" : "services"}
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryServices.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <CtaBand
        title="Not sure which service you need?"
        description="Describe the problem and we'll tell you what it needs, and what it will cost, before any work starts."
      />
    </>
  );
}
