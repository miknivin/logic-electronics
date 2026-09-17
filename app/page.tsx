import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, MapPin, Truck } from "lucide-react";

import whyChooseUsImage from "@/public/imgs/why-choose-us.jpg";
import { BrandGrid } from "@/components/brand-grid";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { HeroSlider } from "@/components/hero-slider";
import { RentalSection } from "@/components/rental-section";
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
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Five areas of expertise"
            title="Everything your business needs, from one partner"
            description="Each area is run by specialists, but you still deal with one team, one contract and one point of contact."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category, index) => (
              <Link
                key={category.key}
                href={`/services#${category.key}`}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-7 transition-all hover:border-primary-300 hover:shadow-lg"
              >
                <span className="text-5xl font-bold text-slate-100 transition-colors group-hover:text-secondary-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold">{category.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
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
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- services */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Services built around how your office actually works"
            description="From a jammed printer to a new office IT build, we cover the equipment, the infrastructure and the supplies, all on one account."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
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
