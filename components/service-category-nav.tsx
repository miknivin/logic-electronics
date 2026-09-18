"use client";

import { useEffect, useState } from "react";

/**
 * Only the serialisable fields of a `ServiceCategory`. The full type carries
 * an `icon` component, and React components cannot be passed from a server
 * component across to a client one — so the page hands over just what the
 * pills actually render.
 */
type NavCategory = { key: string; title: string };

type ServiceCategoryNavProps = {
  categories: NavCategory[];
};

/**
 * Category quick-nav for the services page.
 *
 * Previously a row of near-identical pills with no sense of where you were
 * on the page (report §4.2). This version defaults to the first category
 * selected, tracks scroll position with an `IntersectionObserver` so the
 * active pill follows you down the page, and gives the active pill a solid
 * fill so it reads as a pressed toggle rather than plain text in a box.
 */
export function ServiceCategoryNav({ categories }: ServiceCategoryNavProps) {
  const [activeKey, setActiveKey] = useState(categories[0]?.key ?? "");

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.key))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveKey(visible[0].target.id);
        }
      },
      {
        // Bias the trigger band toward the top of the viewport, just below
        // the sticky header, so a section counts as "active" once its
        // heading has actually scrolled into view.
        rootMargin: "-140px 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav aria-label="Service categories">
      <ul className="flex flex-wrap gap-2 py-5">
        {categories.map((category) => {
          const isActive = category.key === activeKey;
          return (
            <li key={category.key}>
              <a
                href={`#${category.key}`}
                onClick={() => setActiveKey(category.key)}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 ${
                  isActive
                    ? "bg-primary-700 text-white ring-1 ring-primary-700"
                    : "bg-white text-primary-800 ring-1 ring-slate-200 hover:bg-primary-700 hover:text-white hover:ring-primary-700"
                }`}
              >
                {category.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
