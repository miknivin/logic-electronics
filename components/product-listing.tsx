"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, LayoutGrid, List, Menu } from "lucide-react";

import { QuoteButton } from "@/components/quote-button";
import { productImage, type Product, type ProductBadge } from "@/lib/products";

type ListingCategory = {
  slug: string;
  title: string;
  subcategories: { slug: string; label: string; linkTo?: string }[];
};

type ProductListingProps = {
  products: Product[];
  brands: string[];
  /** Drives the sub-category tab row. */
  category?: ListingCategory;
  /** sub-category slug -> product slugs, computed server-side from the rules. */
  membership?: Record<string, string[]>;
  /** Brand name -> logo path, resolved server-side from `brands` in lib/site. */
  brandLogos: Record<string, string>;
  /**
   * Service title to preselect in the quote modal. The modal's dropdown only
   * holds service titles, so a product name would silently match nothing.
   */
  quoteService?: string;
};

const badgeStyles: Record<ProductBadge, string> = {
  "For Rent": "bg-secondary-500 text-white",
  New: "bg-primary-700 text-white",
  Refurbished: "bg-emerald-600 text-white",
  Featured: "bg-slate-900 text-white",
};

/** How many brands to show before the "Show more" toggle. */
const BRANDS_BEFORE_FOLD = 6;

export function ProductListing({
  products,
  brands,
  brandLogos,
  quoteService,
  category,
  membership,
}: ProductListingProps) {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showAllBrands, setShowAllBrands] = useState(false);

  /* Read from the URL rather than local state, so a menu link like
     ?type=new-printers lands pre-filtered and the result is shareable. */
  const typeParam = useSearchParams().get("type");
  const activeSub = category?.subcategories.find((s) => s.slug === typeParam);
  const inSub = activeSub ? membership?.[activeSub.slug] : undefined;
  const subEmpty = Boolean(activeSub) && (inSub?.length ?? 0) === 0;

  const visibleBrands = showAllBrands
    ? brands
    : brands.slice(0, BRANDS_BEFORE_FOLD);

  const filtered = useMemo(() => {
    // A sub-category that matches nothing shows the full range instead of a
    // dead end; the notice above the grid explains why.
    const bySub =
      inSub && inSub.length > 0
        ? products.filter((product) => inSub.includes(product.slug))
        : products;
    return activeBrand
      ? bySub.filter((product) => product.brand === activeBrand)
      : bySub;
  }, [products, activeBrand, inSub]);

  const tabClass = (isActive: boolean) =>
    `inline-flex rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors ${
      isActive
        ? "bg-primary-700 text-white ring-primary-700"
        : "bg-white text-primary-800 ring-slate-200 hover:bg-primary-700 hover:text-white hover:ring-primary-700"
    }`;

  return (
    <>
      {/* Sub-category tabs (report item 18) — and the visible proof that each
          Products menu link now lands somewhere different (items 15, 17). */}
      {category && category.subcategories.length > 0 ? (
        <nav aria-label={`${category.title} categories`} className="mb-8">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href={`/products/${category.slug}`}
                className={tabClass(!activeSub)}
              >
                All {category.title}
              </Link>
            </li>
            {category.subcategories.map((sub) => (
              <li key={sub.slug}>
                <Link
                  /* A sub-category whose products live elsewhere links to
                     that category's page, matching what the mega menu does —
                     otherwise "New Printers" filtered Sales and showed
                     laptops. */
                  href={`/products/${sub.linkTo ?? category.slug}?type=${sub.slug}`}
                  aria-current={
                    !sub.linkTo && activeSub?.slug === sub.slug
                      ? "true"
                      : undefined
                  }
                  className={tabClass(!sub.linkTo && activeSub?.slug === sub.slug)}
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {subEmpty ? (
        <p className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Nothing listed under{" "}
          <span className="font-semibold">{activeSub?.label}</span> yet, so the
          full range is shown below. Ask us and we will source it.
        </p>
      ) : null}

    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ------------------------------------------------ brands sidebar */}
      <aside className="lg:col-span-3">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <p className="flex items-center gap-2 bg-primary-700 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white">
            <Menu className="h-4 w-4" aria-hidden="true" />
            Popular Brands
          </p>
          <ul className="p-2">
            <li>
              <button
                type="button"
                onClick={() => setActiveBrand(null)}
                aria-pressed={activeBrand === null}
                className={`w-full cursor-pointer rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                  activeBrand === null
                    ? "bg-primary-50 font-semibold text-primary-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary-700"
                }`}
              >
                All brands
                <span className="ml-1.5 text-xs text-slate-400">
                  ({products.length})
                </span>
              </button>
            </li>
            {visibleBrands.map((brand) => {
              const count = products.filter((p) => p.brand === brand).length;
              const isActive = activeBrand === brand;

              return (
                <li key={brand}>
                  <button
                    type="button"
                    onClick={() => setActiveBrand(isActive ? null : brand)}
                    aria-pressed={isActive}
                    className={`w-full cursor-pointer rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-primary-50 font-semibold text-primary-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-primary-700"
                    }`}
                  >
                    {brand}
                    <span className="ml-1.5 text-xs text-slate-400">
                      ({count})
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {brands.length > BRANDS_BEFORE_FOLD ? (
            <button
              type="button"
              onClick={() => setShowAllBrands((open) => !open)}
              className="w-full cursor-pointer border-t border-slate-100 px-5 py-3 text-left text-sm font-semibold text-secondary-600 transition-colors hover:text-secondary-700"
            >
              {showAllBrands
                ? "Show less"
                : `+ Show more (${brands.length - BRANDS_BEFORE_FOLD})`}
            </button>
          ) : null}
        </div>
      </aside>

      {/* -------------------------------------------------- product grid */}
      <div className="lg:col-span-9">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {activeSub && !subEmpty ? ` in ${activeSub.label}` : ""}
            {activeBrand ? ` from ${activeBrand}` : ""}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">View as:</span>
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
              className={`inline-flex cursor-pointer items-center justify-center rounded-md border p-2 transition-colors ${
                view === "grid"
                  ? "border-primary-700 bg-primary-700 text-white"
                  : "border-slate-200 text-slate-500 hover:border-primary-300 hover:text-primary-700"
              }`}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              aria-label="List view"
              className={`inline-flex cursor-pointer items-center justify-center rounded-md border p-2 transition-colors ${
                view === "list"
                  ? "border-primary-700 bg-primary-700 text-white"
                  : "border-slate-200 text-slate-500 hover:border-primary-300 hover:text-primary-700"
              }`}
            >
              <List className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className={
            view === "grid"
              ? "mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              : "mt-6 flex flex-col gap-4"
          }
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              logo={brandLogos[product.brand]}
              view={view}
              quoteService={quoteService}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

function ProductCard({
  product,
  logo,
  view,
  quoteService,
}: {
  product: Product;
  logo?: string;
  view: "grid" | "list";
  quoteService?: string;
}) {
  /* No product photography supplied yet, so the brand's own logo stands in
     on a light tile. Setting `image` on the product swaps it straight out. */
  const media = (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-white ${
        view === "grid" ? "h-44 w-full" : "h-28 w-full sm:w-44"
      }`}
    >
      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
        {product.badges.map((badge) => (
          <span
            key={badge}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badgeStyles[badge]}`}
          >
            {badge}
          </span>
        ))}
      </div>

      <Image
        src={productImage(product)}
        alt={`${product.brand} ${product.name}`}
        fill
        sizes="(min-width: 1280px) 20rem, (min-width: 640px) 16rem, 100vw"
        className="object-contain p-3"
      />

      {/* Brand logo sits in the corner so the tile still identifies the
          manufacturer while the artwork is a generic device. */}
      {logo ? (
        <Image
          src={logo}
          alt={product.brand}
          width={336}
          height={96}
          sizes="90px"
          className="absolute bottom-2 right-3 h-5 w-auto opacity-70"
        />
      ) : null}
    </div>
  );

  const href = `/products/${product.category}/${product.slug}`;

  return (
    <div
      className={`group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg ${
        view === "list" ? "flex flex-col sm:flex-row sm:items-center" : ""
      }`}
    >
      <Link href={href} aria-label={`${product.brand} ${product.name}`}>
        {media}
      </Link>

      <div
        className={`flex flex-1 flex-col p-5 ${view === "list" ? "sm:py-4" : ""}`}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-secondary-600">
          {product.brand}
        </p>
        <h3 className="mt-1.5 text-base font-bold text-primary-950">
          <Link href={href} className="hover:text-primary-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 flex-1 text-sm text-slate-500">{product.blurb}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            View
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <QuoteButton
            service={quoteService}
            className="inline-flex cursor-pointer items-center rounded-md border-2 border-primary-700 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-700 hover:text-white"
          >
            Request a Quote
          </QuoteButton>
        </div>
      </div>
    </div>
  );
}
