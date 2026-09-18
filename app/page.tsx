import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  MessageSquare,
  Truck,
} from "lucide-react";

import whyChooseUsImage from "@/public/imgs/why-choose-us.jpg";
import { BrandGrid } from "@/components/brand-grid";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { HeroSlider } from "@/components/hero-slider";
import { QuoteButton } from "@/components/quote-button";
import { RentalSection } from "@/components/rental-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { ServiceRibbon } from "@/components/service-ribbon";
import { TrustedClients } from "@/components/trusted-clients";
import { featuredServices, serviceCategories } from "@/lib/services";
import { stats } from "@/lib/site";

const differentiators = [
  {
    icon: Clock,
    title: "24/7 support",
    description:
      "A remote help desk for the issues we can fix from here, and engineers on site for the ones we cannot.",
  },
  {
    icon: Truck,
    title: "Free pickup & delivery",
    description:
      "We collect the equipment, repair it at our service centre and bring it back, at no extra charge.",
  },
  {
    icon: BadgeCheck,
    title: "ISO 9001:2015 certified",
    description:
      "Documented processes and quality standards behind every job, from a single toner order to a full IT build.",
  },
  {
    icon: MapPin,
    title: "One supplier, everything covered",
    description:
      "Print, IT, security, digital and stationery on a single account, instead of chasing five vendors.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden bg-primary-900 bg-circuit">
        <div
          className="pointer-events-none absolute -right-24 top-1/2 hidden h-128 w-lg -translate-y-1/2 rounded-full bg-secondary-500/15 blur-3xl lg:block"
          aria-hidden="true"
        />

        <Container>
          <HeroSlider />
        </Container>
      </section>

      {/* ----------------------------------------------------------- stats */}
      <section className="border-b border-slate-200 bg-slate-50">
        <Container>
          <dl className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-4xl font-bold tracking-tight text-primary-700 sm:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-sm font-medium text-slate-600">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Commitments, as a sliding ribbon right below the stats (report §2.2). */}
      <ServiceRibbon />

      {/* ------------------------------------------------------ categories */}
      {/* Five areas of expertise now leads, ahead of the services grid
          (report §3.1), giving visitors the full shape of the business
          before drilling into individual services. */}
      <section className="relative overflow-hidden bg-circuit-light py-20 sm:py-24">
        {/* Slow-drifting brand glows, so the section has some life behind
            the cards without anything competing with the text. */}
        <div
          className="animate-drift pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-primary-200/35 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="animate-drift-reverse pointer-events-none absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-secondary-200/35 blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative">
          <SectionHeading
            eyebrow="Five areas of expertise"
            title="Everything your business needs, from one partner"
            description="Each area is run by specialists, but you still deal with one team, one contract and one point of contact."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <Reveal
                  key={category.key}
                  delayMs={index * 90}
                  className="h-full"
                >
                  <Link
                    href={`/services#${category.key}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
                  >
                    {/* Accent bar that wipes in from the left on hover. */}
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
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                      Browse services
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}

            {/* Five categories in a three-column grid leaves an empty slot on
                the last row, so it carries a quote CTA rather than a hole. */}
            <Reveal delayMs={serviceCategories.length * 90} className="h-full">
              <QuoteButton className="group flex h-full w-full flex-col rounded-xl bg-secondary-500 p-7 text-left text-white shadow-lg shadow-secondary-900/10 transition-all duration-200 hover:-translate-y-1 hover:bg-secondary-600 hover:shadow-xl">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
                  <MessageSquare className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="mt-5 block text-xl font-bold">
                  Not sure which you need?
                </span>
                <span className="mt-3 block flex-1 text-sm leading-relaxed text-white/85">
                  Tell us what is not working and we will point you at the right
                  team, with a clear quote before any work starts.
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Request a Quote
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </QuoteButton>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- services */}
      <section className="relative overflow-hidden bg-linear-to-b from-white via-slate-50 to-primary-50/50 py-20 sm:py-24">
        {/* Same ambient treatment as the section above, on a different
            vector and a slower cycle so the two don't drift in lockstep. */}
        <div
          className="animate-drift-slow pointer-events-none absolute -right-12 top-4 h-96 w-96 rounded-full bg-primary-300/45 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="animate-drift pointer-events-none absolute -left-16 bottom-0 h-88 w-88 rounded-full bg-secondary-300/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="animate-drift-reverse pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative">
          <SectionHeading
            eyebrow="What we do"
            title="Services built around how your office actually works"
            description="From a jammed printer to a new office IT build, we cover the equipment, the infrastructure and the supplies, all on one account."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, index) => (
              <Reveal
                key={service.slug}
                delayMs={(index % 4) * 90}
                className="h-full"
              >
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md border-2 border-primary-700 px-7 py-3 text-base font-semibold text-primary-700 transition-colors hover:bg-primary-700 hover:text-white"
            >
              View all services
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Rental & AMC section, directly below "What we do" (report §3.2). */}
      <RentalSection />

      {/* ------------------------------------------------------------- why */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Why Logic Electronics"
                title="Customer satisfaction is our primary focus"
                description="We have been in the market since 2000, dealing with every kind of electronic product and serving major companies as valued customers. Our aim is straightforward: quality, efficient service at an affordable price."
              />

              <p className="mt-8 leading-relaxed text-slate-600">
                We believe customers play a big part in whether any organisation
                hits its goals, and that shapes how we work. You get a clear
                quote before we start, branded parts in the repair, honest advice
                on whether something is worth fixing or replacing, and a support
                line that someone actually answers.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary-700 transition-colors hover:text-secondary-600"
              >
                More about our company
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>

            {/* Supporting image */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              {/* Offset orange block, matching the hero treatment. */}
              <span
                className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-secondary-500 sm:-bottom-5 sm:-right-5 sm:h-28 sm:w-28"
                aria-hidden="true"
              />
              {/* Fixed ratio so the tall source photo cannot dwarf the text
                  column beside it. */}
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200">
                <Image
                  src={whyChooseUsImage}
                  alt="A member of staff checking a job on a tablet beside an office printer"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 34rem, (min-width: 640px) 24rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Differentiators, sitting full width beneath the intro. */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-6"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- brands */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <Container>
          <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Brands we supply and service
          </p>
        </Container>
        <div className="mt-9">
          <BrandGrid />
        </div>
      </section>

      {/* --------------------------------------------------- trusted clients */}
      <TrustedClients />

      <CtaBand />
    </>
  );
}
