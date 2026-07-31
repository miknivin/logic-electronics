import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-6xl font-bold text-secondary-500 sm:text-7xl">
            404
          </p>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-4 leading-relaxed text-slate-600">
            The page may have moved or no longer exists. Try our services page,
            or get in touch and we&apos;ll point you in the right direction.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-700 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-800"
            >
              Browse services
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border-2 border-slate-300 px-7 py-3 text-base font-semibold text-slate-700 transition-colors hover:border-primary-700 hover:text-primary-700"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
