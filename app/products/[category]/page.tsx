import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { BrandGrid } from "@/components/brand-grid";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ProductListing } from "@/components/product-listing";
import {
  getBrandsInCategory,
  getProductCategory,
  getProductsByCategory,
  matchesSubcategory,
  productCategories,
} from "@/lib/products";
import { brands, site } from "@/lib/site";

type PageProps = { params: Promise<{ category: string }> };

/** Quote-modal preselection per category — the modal lists services, not products. */
const quoteServiceByCategory: Record<string, string> = {
  "printers-copiers": "Copier Sales & Service",
  sales: "Computers & Office Electronics",
  rental: "Printer & Copier Rental",
  "pc-components": "Genuine Spare Parts",
  consumables: "Toner & Ink Cartridges",
};

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getProductCategory(slug);

  if (!category) return {};

  return {
    title: category.heading,
    description: category.description,
    alternates: { canonical: `${site.url}/products/${category.slug}` },
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getProductCategory(slug);

  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);
  const categoryBrands = getBrandsInCategory(category.slug);

  /* Resolved here rather than in the client component, so the whole brand
     list doesn't have to cross the boundary just for a logo path. */
  const brandLogos = Object.fromEntries(
    brands
      .filter((brand) => brand.logo)
      .map((brand) => [brand.name, brand.logo as string]),
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Products", href: "/products/sales" },
          { label: category.title },
        ]}
        title={category.heading}
        description={category.description}
      />

      <section className="py-14 sm:py-20">
        <Container>
          {/* Suspense is required because the listing reads the `type`
              search param; without it this page would be forced dynamic and
              lose static generation. */}
          <Suspense fallback={null}>
            <ProductListing
              products={categoryProducts}
              brands={categoryBrands}
              brandLogos={brandLogos}
              quoteService={quoteServiceByCategory[category.slug]}
              category={{
                slug: category.slug,
                title: category.title,
                subcategories: category.subcategories.map((sub) => ({
                  slug: sub.slug,
                  label: sub.label,
                })),
              }}
              membership={Object.fromEntries(
                category.subcategories.map((sub) => [
                  sub.slug,
                  categoryProducts
                    .filter((product) => matchesSubcategory(product, sub))
                    .map((product) => product.slug),
                ]),
              )}
            />
          </Suspense>
        </Container>
      </section>

      {/* Report §4.1 / §10: relevant brand logos at the foot of product pages. */}
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
        title={`Looking for something specific?`}
        description="Tell us the model, the volume or just the problem, and we will come back with options and a clear price."
      />
    </>
  );
}
