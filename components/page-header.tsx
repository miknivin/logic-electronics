import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/container";

type Crumb = { label: string; href?: string };

type HeaderImage = {
  src: StaticImageData | string;
  alt: string;
};

/**
 * Dark banner at the top of every inner page, with breadcrumbs.
 *
 * `image` is optional — pages that don't pass one (Contact, Services, each
 * service detail page) keep the original single-column layout untouched.
 * When it's supplied, the banner switches to a two-column layout with the
 * photo on the right, sized for a landscape (4:3) crop around 1200x900 so it
 * stays sharp at the ~540px display width on desktop without ballooning the
 * banner's height the way a portrait hero photo would.
 */
export function PageHeader({
  title,
  description,
  breadcrumbs = [],
  image,
}: {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  image?: HeaderImage;
}) {
  const content = (
    <div className={image ? "lg:col-span-7" : undefined}>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-primary-200">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-secondary-300"
            >
              Home
            </Link>
          </li>
          {breadcrumbs.map((crumb) => (
            <li key={crumb.label} className="flex items-center gap-1.5">
              <ChevronRight
                className="h-4 w-4 text-primary-400"
                aria-hidden="true"
              />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-secondary-300"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      {description ? (
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-primary-100">
          {description}
        </p>
      ) : null}
    </div>
  );

  return (
    <section className="bg-primary-800 bg-circuit">
      <Container>
        <div className="py-14 sm:py-20">
          {image ? (
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              {content}

              <div className="lg:col-span-5">
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  <span
                    className="absolute -right-4 -top-4 h-20 w-20 rounded-2xl bg-secondary-500 sm:-right-5 sm:-top-5 sm:h-24 sm:w-24"
                    aria-hidden="true"
                  />
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 34rem, (min-width: 640px) 24rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            content
          )}
        </div>
      </Container>
    </section>
  );
}
