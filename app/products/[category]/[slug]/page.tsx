import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";

import { BrandGrid } from "@/components/brand-grid";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHeader } from "@/components/page-header";
import { QuoteButton } from "@/components/quote-button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  getProduct,
  getProductCategory,
  getRelatedProducts,
  productImage,
  products,
  type Product,
  type ProductBadge,
} from "@/lib/products";
import { brands, contact, site } from "@/lib/site";

type PageProps = { params: Promise<{ category: string; slug: string }> };

const badgeStyles: Record<ProductBadge, string> = {
  "For Rent": "bg-secondary-500 text-white",
  New: "bg-primary-700 text-white",
  Refurbished: "bg-emerald-600 text-white",
  Featured: "bg-slate-900 text-white",
};

function logoFor(brandName: string): string | undefined {
  return brands.find((brand) => brand.name === brandName)?.logo;
}

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  const title = `${product.brand} ${product.name}`;
  return {
    title,
    description: `${title} — ${product.blurb}. Available from ${site.name} across the UAE.`,
    alternates: {
      canonical: `${site.url}/products/${product.category}/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: categorySlug, slug } = await params;
  const product = getProduct(slug);

  /* Guard the category too, so /products/consumables/<a-rental-slug> 404s
     rather than rendering a product under a category it isn't in. */
  if (!product || product.category !== categorySlug) notFound();

  const category = getProductCategory(product.category);
  const related = getRelatedProducts(product);
  const logo = logoFor(product.brand);
  const fullName = `${product.brand} ${product.name}`;

  const isRental = product.category === "rental";
  const whatsappMessage = `Hello Logic Electronics, I would like a price for the ${fullName}${
    isRental ? " (rental)" : ""
  }. Please send me the details.`;

  /* Only facts already held about the product — nothing inferred. */
  const highlights = [
    { label: "Brand", value: product.brand },
    { label: "Type", value: product.blurb },
    product.format ? { label: "Paper size", value: product.format } : null,
    {
      label: "Condition",
      value: product.badges.includes("Refurbished")
        ? "Refurbished"
        : product.badges.includes("New")
          ? "New"
          : "Available",
    },
    { label: "Availability", value: isRental ? "For rent" : "For sale" },
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Products", href: "/products/printers-copiers" },
          {
            label: category?.title ?? "Products",
            href: `/products/${product.category}`,
          },
          { label: product.name },
        ]}
        title={`${product.name} | ${isRental ? "Printer Rental" : "Printer Sale & Rental"}`}
        description={`${fullName} — ${product.blurb}.`}
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ------------------------------------------------- image */}
            <div className="lg:col-span-5">
              <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white sm:h-96">
                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badgeStyles[badge]}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <Image
                  src={productImage(product)}
                  alt={fullName}
                  fill
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="object-contain p-8"
                  priority
                />

                {logo ? (
                  <Image
                    src={logo}
                    alt={product.brand}
                    width={336}
                    height={96}
                    sizes="140px"
                    className="absolute bottom-5 right-6 h-7 w-auto opacity-70"
                  />
                ) : null}
              </div>
            </div>

            {/* ------------------------------------------------ details */}
            <div className="lg:col-span-7">
              <p className="text-sm font-bold uppercase tracking-wide text-secondary-600">
                {product.brand}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {product.name}
              </h2>
              <p className="mt-3 text-lg text-slate-600">{product.blurb}</p>

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-primary-950">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton message={whatsappMessage} />
                <QuoteButton
                  service={
                    isRental
                      ? "Printer & Copier Rental"
                      : "Copier Sales & Service"
                  }
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-primary-700 px-6 py-3 text-base font-semibold text-primary-700 transition-colors hover:bg-primary-700 hover:text-white"
                >
                  Request a Quote
                </QuoteButton>
                <a
                  href={contact.primaryPhoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-slate-600 transition-colors hover:text-primary-700"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {contact.primaryPhone}
                </a>
              </div>

              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {(isRental
                  ? [
                      "Toner and consumables included",
                      "Preventive maintenance scheduled",
                      "Free replacement if a unit fails",
                      "Terms from a few days to several years",
                    ]
                  : [
                      "Supplied, installed and networked",
                      "Engineer handover and user training",
                      "AMC and consumables available",
                      "Trade-in against your old machine",
                    ]
                ).map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Specification table, shown only once real spec rows are supplied. */}
      {product.specs && product.specs.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50 py-14">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight">
              Specifications
            </h2>
            <dl className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {product.specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`grid gap-1 px-6 py-4 sm:grid-cols-3 ${
                    index % 2 === 1 ? "bg-slate-50" : ""
                  }`}
                >
                  <dt className="text-sm font-semibold text-primary-950">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-slate-600 sm:col-span-2">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {/* ------------------------------------------------------ enquiry */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Get a price for this machine
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Tell us your monthly volume and whether you want to buy, rent or
                put it on contract, and we will come back with a clear price.
                For an immediate answer, message us on WhatsApp.
              </p>
              <div className="mt-6">
                <WhatsAppButton message={whatsappMessage} />
              </div>
            </div>
            <div className="lg:col-span-7">
              <EnquiryForm
                defaultService={
                  isRental
                    ? "Printer & Copier Rental"
                    : "Copier Sales & Service"
                }
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ related */}
      {related.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Related machines
              </h2>
              <Link
                href={`/products/${product.category}`}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-secondary-600"
              >
                View all
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <RelatedCard key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-y border-slate-200 bg-white py-14">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Brands we supply and service
          </p>
        </Container>
        <div className="mt-8">
          <BrandGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function RelatedCard({ product }: { product: Product }) {
  const logo = logoFor(product.brand);

  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
    >
      <div className="relative flex h-32 items-center justify-center bg-white">
        <Image
          src={productImage(product)}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="240px"
          className="object-contain p-3"
        />
        {logo ? (
          <Image
            src={logo}
            alt={product.brand}
            width={336}
            height={96}
            sizes="80px"
            className="absolute bottom-2 right-3 h-4 w-auto opacity-70"
          />
        ) : null}
      </div>
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-secondary-600">
          {product.brand}
        </p>
        <p className="mt-1 text-sm font-bold text-primary-950">
          {product.name}
        </p>
      </div>
    </Link>
  );
}
