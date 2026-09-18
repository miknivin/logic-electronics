"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset, so a row of cards arrives one after another. */
  delayMs?: number;
  className?: string;
};

/**
 * Fades and lifts its children into place the first time they scroll into
 * view, then disconnects — it never animates back out, so scrolling up
 * doesn't replay it.
 *
 * The hidden/shown states live in CSS on `.reveal-item` (globals.css); this
 * only toggles the `is-revealed` class on the node, so revealing costs no
 * React re-render.
 *
 * Failure modes are handled rather than assumed away: without
 * IntersectionObserver the content is shown immediately, reduced-motion
 * users get it shown with no transition, and a `<noscript>` rule in the
 * root layout covers JS being off entirely. In every one of those cases the
 * content is visible — the animation is an enhancement, never a
 * prerequisite for reading the page.
 */
export function Reveal({ children, delayMs = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => element.classList.add("is-revealed");

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-item ${className}`}
    >
      {children}
    </div>
  );
}
