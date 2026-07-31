import { ArrowRight, Phone } from "lucide-react";

import { Container } from "@/components/container";
import { QuoteButton } from "@/components/quote-button";
import { contact } from "@/lib/site";

type CtaBandProps = {
  title?: string;
  description?: string;
};

/** Closing call-to-action repeated at the foot of every page. */
export function CtaBand({
  title = "Let's solve your office issues",
  description = "Tell us what you need, whether that's a repair, a rental, an AMC or a full IT setup, and we'll come back with a clear quote.",
}: CtaBandProps) {
  return (
    <section className="bg-primary-700 bg-circuit">
      <Container>
        <div className="flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-100">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <QuoteButton className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary-500 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary-600">
              Request a Quote
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </QuoteButton>
            <a
              href={contact.primaryPhoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {contact.primaryPhone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
