import { Check } from "lucide-react";

import { Marquee } from "@/components/marquee";
import { commitments } from "@/lib/site";

/**
 * The service-commitment badges, as a continuously sliding ribbon.
 *
 * Previously sat at the bottom of the hero, below the fold on most screens
 * (report §2.2). Moved here, right under the stats strip, as a full-bleed
 * dark ribbon so it stays visible without needing the hero to grow.
 */
export function ServiceRibbon() {
  return (
    <div className="border-y border-primary-900 bg-primary-800 bg-circuit py-4">
      <Marquee durationSeconds={26}>
        {commitments.map((item) => (
          <span
            key={item}
            className="mx-3 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-700/60 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10"
          >
            <Check className="h-4 w-4 text-secondary-400" aria-hidden="true" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
