"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Cctv,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Globe,
  Printer,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import heroImage from "@/public/imgs/logic-banner-img.jpg";
import whyChooseUsImage from "@/public/imgs/why-choose-us.jpg";
import { heroSlides } from "@/lib/site";

const SLIDE_DURATION_MS = 6000;

/** Image shown behind each of the three rotating states, in order. */
const slideImages: { src: StaticImageData; alt: string }[] = [
  {
    src: heroImage,
    alt: "An office professional collecting documents from a multifunction printer",
  },
  {
    src: whyChooseUsImage,
    alt: "A member of staff checking a job on a tablet beside an office printer",
  },
  {
    src: heroImage,
    alt: "Logic Electronics covers print, IT, security and office supplies",
  },
];

/** Overlaid on the third, "everything we do" state to sell the overview at a glance. */
const overviewIcons: LucideIcon[] = [Printer, Cpu, Cctv, Globe, ShoppingBag];

/**
 * Dynamic hero: layout and CTA position stay fixed while the badge, headline,
 * keyword line, description, image and CTA rotate through three states.
 * Text re-entrance uses `animate-slide-up`, retriggered on every index change
 * via the `key` prop, so each new state reads as sliding upward into place.
 *
 * Autoplay pauses only while the cursor is over the content column (badge
 * through the nav buttons) — someone reading the copy or about to click a
 * CTA shouldn't have it shift under them. The image column is excluded, so
 * autoplay keeps running for a visitor just looking at the photo.
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const slide = heroSlides[index];
  const image = slideImages[index];

  const goToPrevious = () =>
    setIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  const goToNext = () =>
    setIndex((current) => (current + 1) % heroSlides.length);

  return (
    <div className="relative">
      <div className="relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div
          className="lg:col-span-7"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div key={index} className="animate-slide-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-800 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-300 ring-1 ring-primary-700">
              {slide.badge}
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {slide.headline}{" "}
              <span className="text-secondary-400">{slide.highlight}</span>
            </h1>

            <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium text-secondary-300 sm:text-base">
              {slide.keywords.map((keyword, keywordIndex) => (
                <span key={keyword} className="inline-flex items-center">
                  {keyword}
                  {keywordIndex < slide.keywords.length - 1 ? (
                    <span className="ml-2 text-primary-400" aria-hidden="true">
                      •
                    </span>
                  ) : null}
                </span>
              ))}
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-100">
              {slide.description}
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-secondary-900/20 transition-colors hover:bg-secondary-600"
            >
              {slide.ctaLabel}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            {/* Fixed secondary CTA, distinct from every state's own primary
                CTA above (which is "View All Services" on the third state). */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>

          {/* Prev/next controls plus state dots, styled in the brand's navy
              and orange rather than a generic carousel skin. */}
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous highlight"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-primary-800/70 text-white transition-colors hover:border-secondary-500 hover:bg-secondary-500"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Hero highlights"
            >
              {heroSlides.map((item, itemIndex) => (
                <button
                  key={item.badge}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-label={item.badge}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    itemIndex === index
                      ? "w-8 bg-secondary-400"
                      : "w-4 bg-white/25 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next highlight"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-primary-800/70 text-white transition-colors hover:border-secondary-500 hover:bg-secondary-500"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Hero image, fixed slot, contents crossfade with the state. */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <span
              className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-secondary-500 sm:-right-5 sm:-top-5 sm:h-28 sm:w-28"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
              <div key={index} className="animate-fade-in">
                <Image
                  src={image.src}
                  alt={image.alt}
                  placeholder="blur"
                  priority
                  sizes="(min-width: 1024px) 30rem, (min-width: 640px) 24rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="absolute inset-0 bg-linear-to-t from-primary-950/45 via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* Overview state: layer the five business areas on the photo. */}
              {index === 2 ? (
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
                  {overviewIcons.map((Icon, iconIndex) => (
                    <span
                      key={iconIndex}
                      className="animate-slide-up inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-primary-700 shadow-lg"
                      style={{ animationDelay: `${iconIndex * 80}ms` }}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
