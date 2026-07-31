import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Service } from "@/lib/services";

/** Card used on the home page and services listing. */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 transition-colors group-hover:bg-secondary-500 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      <h3 className="mt-5 text-lg font-bold text-primary-950">
        {service.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {service.summary}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
        Learn more
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
