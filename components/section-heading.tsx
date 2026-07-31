import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
};

/** Consistent eyebrow / title / description block used at the top of sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverted = false,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`max-w-3xl ${isCentered ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow ? (
        <p
          className={`text-xs font-bold uppercase tracking-[0.18em] ${
            inverted ? "text-secondary-300" : "text-secondary-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          inverted ? "text-white" : ""
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            inverted ? "text-primary-100" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}

      <span
        className={`mt-6 block h-1 w-16 rounded-full bg-secondary-500 ${
          isCentered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
