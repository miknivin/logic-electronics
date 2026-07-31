import Image from "next/image";
import Link from "next/link";

import logoMark from "@/public/logo-mark.svg";

type LogoProps = {
  /** Renders the wordmark in white for use on dark backgrounds. */
  inverted?: boolean;
  className?: string;
};

/**
 * Brand lockup: the logo mark plus the wordmark.
 *
 * The mark lives at `public/logo-mark.svg`. Drop the official artwork in at
 * that path to swap it out without touching any code.
 */
export function Logo({ inverted = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Logic Electronics, home"
    >
      <Image
        src={logoMark}
        alt=""
        width={44}
        height={44}
        priority
        className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
      />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight sm:text-[1.375rem]">
          <span className="text-secondary-500">L</span>
          <span className={inverted ? "text-white" : "text-primary-700"}>O</span>
          <span className="text-secondary-500">GIC</span>
        </span>
        <span
          className={`mt-1 text-[0.5625rem] font-semibold tracking-[0.2em] ${
            inverted ? "text-primary-100" : "text-primary-800"
          }`}
        >
          ELECTRONICS
        </span>
      </span>
    </Link>
  );
}
