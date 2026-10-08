"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/container";
import { heroSlides } from "@/lib/site";

const SLIDE_DURATION_MS = 6000;

/**
 * Full-bleed hero: a commissioned banner illustration fills the entire
 * section width behind the copy, rather than sitting in a small boxed panel
 * beside it. Layout and CTA position stay fixed while the badge, headline,
 * keyword line, description, background image and CTA rotate through five
 * states — see the `heroSlides` data in lib/site.ts for how each banner was
 * matched to its content.
 *
 * Text re-entrance uses `animate-slide-up`, retriggered on every index
 * change via the `key` prop. The background crossfades the same way via
 * `animate-fade-in`.
 *
 * Autoplay pauses only while the cursor is over the content column (badge
 * through the nav buttons) — someone reading the copy or about to click a
 * CTA shouldn't have it shift under them.
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  /* +1 = incoming banner sweeps in from the right (forward through the
     states), -1 = from the left (backward). Autoplay and "next" always go
     forward; "previous" and a dot click behind the current state go back. */
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const slide = heroSlides[index];

  const goToPrevious = () => {
    setDirection(-1);
    setIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };
  const goToNext = () => {
    setDirection(1);
    setIndex((current) => (current + 1) % heroSlides.length);
  };
  const goToSlide = (target: number) => {
    setDirection(target > index ? 1 : target < index ? -1 : direction);
    setIndex(target);
  };

  return (
    <section className="relative isolate overflow-hidden bg-primary-900 bg-circuit">
      {/* Full-width background banner, sliding in from the direction of
          travel rather than crossfading in place — a carousel sweep, not a
          dissolve. Sized off the source art's own 2048x998 (~2.05:1) ratio
          so it never looks squashed, while `object-cover` fills whatever
          the viewport shape actually is. */}
      <div
        key={index}
        className={`absolute inset-0 ${
          direction === 1 ? "animate-slide-in-right" : "animate-slide-in-left"
        }`}
      >
        <Image
          src={`/imgs/hero/banners/${slide.image}`}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Readability gradient: strong under the text column on the left,
          easing off toward the right so the illustration still reads. A
          second, vertical pass keeps the bottom control row legible too,
          since the source art runs light in places (banners 2, 4 and 5 are
          mostly white/light blue). */}
      <div
        className="absolute inset-0 bg-linear-to-r from-primary-950/95 via-primary-950/75 to-primary-950/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-primary-950/70 via-transparent to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <div
          className="max-w-2xl py-20 sm:py-24 lg:py-28"
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

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-100">
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
                CTA above (which is "View All Services" on state 4). */}
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
                  onClick={() => goToSlide(itemIndex)}
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
      </Container>
    </section>
  );
}
