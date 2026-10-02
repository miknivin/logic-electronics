import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Cpu, Printer, Repeat } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BrandGrid } from "@/components/brand-grid";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import {
  getProductsByCategory,
  productCategories,
  products,
} from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Printers, copiers, computers, PC components and consumables supplied across the UAE, to buy or to rent, with our own engineers behind every one.",
  alternates: { canonical: `${site.url}/products` },
};

/**
 * The four buying categories shown as cards. "Printers & Copiers" is not
 * among them — it is the machine listing that Sales links into, not a
 * separate thing to buy from.
 */
const CARD_ORDER = ["sales", "rental", "pc-components", "consumables"];

const icons: Record<string, LucideIcon> = {
  sales: Printer,
  rental: Repeat,
  "pc-components": Cpu,
  consumables: Boxes,
};

export default function ProductsLandingPage() {
  const cards = CARD_ORDER.map((slug) =>
    productCategories.find((category) => category.slug === slug),
  ).filter((category): category is NonNullable<typeof category> =>
    Boolean(category),
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Products" }]}
        title="Everything we supply, in four places"
        description={`${products.length} products across sales, rentals, PC components and consumables — all from the same team that installs and services them.`}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Browse by category"
            title="Pick the shelf you need"
            description="Each category opens a full listing you can filter by type and by brand."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {cards.map((category, index) => {
              const Icon = icons[category.slug] ?? Printer;
              const count = getProductsByCategory(category.slug).length;

              return (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-secondary-500 transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute right-6 top-5 text-3xl font-bold text-slate-100 transition-colors group-hover:text-secondary-100"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 text-xl font-bold">{category.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {category.description}
                  </p>

                  {/* The sub-categories, so the card shows what's inside
                      without needing a dropdown. */}
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {category.subcategories.slice(0, 6).map((sub) => (
                      <li
                        key={sub.slug}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {sub.label}
                      </li>
                    ))}
                    {category.subcategories.length > 6 ? (
                      <li className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                        +{category.subcategories.length - 6} more
                      </li>
                    ) : null}
                  </ul>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                      Browse {category.title}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {count} {count === 1 ? "product" : "products"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Brands we supply and service
          </p>
        </Container>
        <div className="mt-8">
          <BrandGrid />
        </div>
      </section>

      <CtaBand
        title="Not sure which model you need?"
        description="Tell us the volume, the budget or just the problem, and we'll come back with options and a clear price."
      />
    </>
  );
}
