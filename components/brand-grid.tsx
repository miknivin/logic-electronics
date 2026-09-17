import Image from "next/image";

import { Marquee } from "@/components/marquee";
import { brands } from "@/lib/site";

/**
 * Logo wall for the brands and software platforms we supply and service.
 *
 * Shown in each brand's own colours by default (report §3.3) rather than the
 * greyscale-until-hover treatment used previously, and set inside a
 * continuous sliding ribbon so a long brand list never needs to wrap onto
 * extra rows.
 *
 * Source files are a uniform 336x96 canvas, so each renders into a matching
 * 3.5:1 box and the whole row lines up.
 */
export function BrandGrid() {
  return (
    <Marquee durationSeconds={34}>
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="mx-2 flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 transition-colors hover:border-primary-300 hover:shadow-md sm:h-24 sm:w-44"
        >
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={brand.name}
              width={336}
              height={96}
              sizes="140px"
              className="h-auto w-full max-w-35"
            />
          ) : (
            /* No logo file yet, so show the name as a wordmark instead. */
            <span className="text-center text-base font-bold tracking-tight text-primary-700">
              {brand.name}
            </span>
          )}
        </div>
      ))}
    </Marquee>
  );
}
