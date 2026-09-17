"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. Slower reads calmer, faster feels busier. */
  durationSeconds?: number;
  reverse?: boolean;
  className?: string;
  /** Pause the scroll while the pointer is over the ribbon. */
  pauseOnHover?: boolean;
};

/**
 * Seamless horizontal auto-scroller.
 *
 * Renders `children` twice, back to back, then animates the track by exactly
 * -50% of its width. Because both halves are identical, the loop point is
 * invisible. Reduced-motion users get the animation switched off globally in
 * `globals.css`, and the content still reads fine sitting still.
 */
export function Marquee({
  children,
  durationSeconds = 30,
  reverse = false,
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={`group/marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] ${className}`}
    >
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} ${
          pauseOnHover ? "group-hover/marquee:[animation-play-state:paused]" : ""
        }`}
        style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
      >
        <div className="flex w-max shrink-0 items-center">{children}</div>
        <div className="flex w-max shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
