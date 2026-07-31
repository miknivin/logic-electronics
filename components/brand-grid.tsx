import Image from "next/image";

import { brands } from "@/lib/site";

/**
 * Logo wall for the brands we supply and service.
 *
 * The source logos come from mixed origins: most are transparent PNGs, a couple
 * are white artwork on a solid brand-colour block. White tiles give every logo
 * the same container so the inconsistency does not show, and the greyscale
 * treatment stops seventeen brand palettes competing with our own.
 *
 * Source files are a uniform 336x96 canvas, so each renders into a matching
 * 3.5:1 box and the whole row lines up.
 */
export function BrandGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
      {brands.map((brand) => (
        <li
          key={brand.name}
          className="group flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 transition-colors hover:border-slate-300 sm:h-24"
        >
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={brand.name}
              width={336}
              height={96}
              sizes="140px"
              className="h-auto w-full max-w-35 rounded-md opacity-70 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
            />
          ) : (
            /* No logo file yet, so show the name as a wordmark instead. */
            <span className="text-center text-base font-bold tracking-tight text-slate-400 transition-colors group-hover:text-primary-700">
              {brand.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
