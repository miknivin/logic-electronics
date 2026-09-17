import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Repeat } from "lucide-react";

import { Container } from "@/components/container";
import { Marquee } from "@/components/marquee";
import { SectionHeading } from "@/components/section-heading";
import { rentalPlans } from "@/lib/site";

/**
 * Rental/AMC product cards for the ribbon gallery. Real product photography
 * for every rental unit was not supplied with the brief, so each card pairs
 * the brand's own logo (already on file for the brand grid) with the rental
 * status badge you'd see on a listing — swap in unit photos here later
 * without touching the rest of the section.
 */
const rentalUnits = [
  { brand: "Konica Minolta", logo: "/imgs/brands/konica-minolta.png", badge: "For Rent" },
  { brand: "Canon", logo: "/imgs/brands/canon.png", badge: "New & Refurbished" },
  { brand: "Kyocera", logo: "/imgs/brands/kyocera.png", badge: "For Rent" },
  { brand: "Ricoh", logo: "/imgs/brands/ricoh.png", badge: "AMC Available" },
  { brand: "HP", logo: "/imgs/brands/hp.png", badge: "For Rent" },
  { brand: "Sharp", logo: "/imgs/brands/sharp.png", badge: "New & Refurbished" },
  { brand: "UTAX", logo: "/imgs/brands/utax.png", badge: "AMC Available" },
  { brand: "Triumph-Adler", logo: "/imgs/brands/triumph-adler.png", badge: "For Rent" },
];

const badgeStyles: Record<string, string> = {
  "For Rent": "bg-secondary-500 text-white",
  "New & Refurbished": "bg-primary-700 text-white",
  "AMC Available": "bg-slate-900 text-white",
};

/** Rental and AMC section for the home page, placed below "What we do". */
export function RentalSection() {
  return (
    <section className="border-y border-slate-200 bg-primary-950 py-20 sm:py-24">
      <Container>
        <SectionHeading
          inverted
          eyebrow="Printers & Copiers on Your Terms"
          title="Rent, lease or put it on AMC — we keep it running"
          description="No capital outlay, no surprise repair bills. Toner, servicing and breakdown cover all sit inside one predictable monthly cost."
        />
      </Container>

      {/* One-line ribbon gallery of rental units. */}
      <div className="mt-12">
        <Marquee durationSeconds={32}>
          {rentalUnits.map((unit, unitIndex) => (
            <div
              key={`${unit.brand}-${unitIndex}`}
              className="mx-3 flex w-48 shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-lg"
            >
              <div className="relative flex h-28 items-center justify-center bg-slate-50 px-6">
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badgeStyles[unit.badge]}`}
                >
                  {unit.badge}
                </span>
                <Image
                  src={unit.logo}
                  alt={unit.brand}
                  width={120}
                  height={48}
                  className="h-8 w-auto opacity-90"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-primary-950">
                  {unit.brand}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Printer &amp; Copier Rental
                </p>
              </div>
            </div>
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
