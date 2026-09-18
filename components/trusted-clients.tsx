import Image from "next/image";

import { Container } from "@/components/container";
import { Marquee } from "@/components/marquee";
import { trustedClients } from "@/lib/site";

/**
 * "Our Trusted Clients" logo wall (report §3.4).
 *
 * The supplied logos range from a 1:1 square to a 6.8:1 wide lockup (see the
 * comment on `trustedClients` in lib/site.ts for how the raw files were
 * cleaned up). Rather than force every logo into the same box the way the
 * brand ribbon above does — which relies on its source files already
 * sharing one aspect ratio — each tile here has a fixed size and uses
 * `object-contain`, so every logo scales to fit without being cropped,
 * stretched or left swimming in dead space, whatever its native shape.
 * Reversed scroll direction and square-cornered (not circular) tiles keep
 * this section visually distinct from the brand ribbon above it.
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
              className={`mx-3 flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border p-4 transition-colors sm:h-24 sm:w-48 ${
                client.dark
                  ? "border-primary-800 bg-primary-900 hover:border-primary-600"
                  : "border-slate-200 bg-white hover:border-primary-300"
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
