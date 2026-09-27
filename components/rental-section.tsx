import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Repeat } from "lucide-react";

import rentalPhoto from "@/public/imgs/rental.webp";
import { Container } from "@/components/container";
import { Marquee } from "@/components/marquee";
import { SectionHeading } from "@/components/section-heading";
import { getProductsByCategory, productImage } from "@/lib/products";
import { brands, rentalPlans } from "@/lib/site";

/**
 * The ribbon now runs off the real rental catalogue (lib/products.ts) rather
 * than a hardcoded list of brand tiles, so it shows actual machines —
 * brand, model and rental badge — the way the client's reference does.
 *
 * Still outstanding: machine photography. No product shots were supplied,
 * so each card falls back to the brand's logo. Setting `image` on a rental
 * product in lib/products.ts switches that card to a real photo with no
 * change here.
 */
const rentalUnits = getProductsByCategory("rental").slice(0, 10);

const brandLogos = Object.fromEntries(
  brands.filter((b) => b.logo).map((b) => [b.name, b.logo as string]),
);

const badgeStyles: Record<string, string> = {
  "For Rent": "bg-secondary-500 text-white",
  New: "bg-primary-700 text-white",
  Refurbished: "bg-emerald-600 text-white",
  Featured: "bg-slate-900 text-white",
};

/** Rental and AMC section for the home page, placed below "What we do". */
export function RentalSection() {
  return (
    <section className="border-y border-slate-200 bg-primary-950 py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              inverted
              eyebrow="Printers & Copiers on Your Terms"
              title="Rent, lease or put it on AMC — we keep it running"
              description="No capital outlay, no surprise repair bills. Toner, servicing and breakdown cover all sit inside one predictable monthly cost."
            />
          </div>

          {/* A real Logic Electronics technician servicing a copier, backing
              up the "we keep it running" promise with an actual photo
              instead of just the ribbon of brand logos below. */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <span
                className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-secondary-500 sm:-right-5 sm:-top-5 sm:h-28 sm:w-28"
                aria-hidden="true"
              />
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
                <Image
                  src={rentalPhoto}
                  alt="A Logic Electronics engineer handing over a multifunction copier to a client in an Abu Dhabi office"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 34rem, (min-width: 640px) 24rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* One-line ribbon gallery of rental units. */}
      <div className="mt-12">
        <Marquee durationSeconds={36}>
          {rentalUnits.map((unit) => (
            <Link
              key={unit.slug}
              href="/products/rental"
              className="group mx-3 flex w-52 shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative flex h-28 items-center justify-center bg-white px-6">
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                    badgeStyles[unit.badges[0]] ?? "bg-slate-900 text-white"
                  }`}
                >
                  {unit.badges[0]}
                </span>
                <Image
                  src={productImage(unit)}
                  alt={`${unit.brand} ${unit.name}`}
                  fill
                  sizes="208px"
                  className="object-contain p-3"
                />
                {brandLogos[unit.brand] ? (
                  <Image
                    src={brandLogos[unit.brand]}
                    alt={unit.brand}
                    width={120}
                    height={48}
                    className="absolute bottom-2 right-3 h-4 w-auto opacity-70"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-secondary-600">
                  {unit.brand}
                </p>
                <p className="mt-1 text-sm font-bold text-primary-950">
                  {unit.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{unit.blurb}</p>
              </div>
            </Link>
          ))}
        </Marquee>
      </div>

      {/* Rental / AMC / leasing contract types, benefits led. */}
      <Container>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {rentalPlans.map((plan) => (
            <div
              key={plan.title}
              className="flex flex-col rounded-xl border border-primary-800 bg-primary-900 p-7"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-500/15 text-secondary-400">
                <Repeat className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">
                {plan.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-200">
                {plan.description}
              </p>
              <ul className="mt-4 space-y-2">
                {plan.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-primary-100"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400"
                      aria-hidden="true"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-400 transition-colors hover:text-secondary-300"
              >
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
