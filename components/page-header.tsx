import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/container";

type Crumb = { label: string; href?: string };

/** Dark banner at the top of every inner page, with breadcrumbs. */
export function PageHeader({
  title,
  description,
  breadcrumbs = [],
}: {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <section className="bg-primary-800 bg-circuit">
      <Container>
        <div className="py-14 sm:py-20">
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
      </Container>
    </section>
  );
}
