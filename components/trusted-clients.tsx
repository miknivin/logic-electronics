import Image from "next/image";

import { Container } from "@/components/container";
import { Marquee } from "@/components/marquee";
import { trustedClients } from "@/lib/site";

/**
 * "Our Trusted Clients" logo wall (report §3.4).
 *
 * Client logos have not been supplied yet, so each tile falls back to a
 * wordmark badge, styled differently from the brand ribbon above it
 * (reversed scroll direction, circular tiles, no border) so the two
 * sections read as distinct even before real artwork lands. Add a `logo`
 * path in `trustedClients` (lib/site.ts) per client once it arrives.
 */
export function TrustedClients() {
  return (
    <section className="bg-white py-16">
      <Container>
        <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
          Our Trusted Clients
        </p>
      </Container>
      <div className="mt-9">
        <Marquee durationSeconds={38} reverse>
          {trustedClients.map((client) => (
            <div
              key={client.name}
              className="mx-3 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-primary-300 sm:h-28 sm:w-28"
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={200}
                  height={200}
                  sizes="80px"
                  className="h-auto w-full"
                />
              ) : (
                <span className="text-center text-xs font-semibold leading-tight text-slate-400">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
