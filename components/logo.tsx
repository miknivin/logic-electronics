import Image from "next/image";
import Link from "next/link";

import mark from "@/public/logo-mark.png";
import wordmark from "@/public/logo-wordmark.png";

type LogoProps = {
  /** `md` suits the header, `lg` the footer where there is more room. */
  size?: "md" | "lg";
  priority?: boolean;
};

/**
 * The company logo, linking home.
 *
 * The official artwork in `public/logo.png` is a stacked lockup, which is far
 * too tall to stay legible in a horizontal header. The mark and wordmark are
 * therefore split into `logo-mark.png` and `logo-wordmark.png` and set side by
 * side here, so the header stays a sensible height and the wordmark is still
 * readable. Both files are cropped straight from the original artwork.
 */
export function Logo({ size = "md", priority = false }: LogoProps) {
  const markSize = size === "lg" ? "h-14" : "h-12";
  const wordmarkSize = size === "lg" ? "h-10" : "h-9";

  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center gap-2.5"
      aria-label="Logic Electronics, home"
    >
      {/* Decorative: the wordmark beside it already carries the company name. */}
      <Image
        src={mark}
        alt=""
        priority={priority}
        sizes="72px"
        className={`${markSize} w-auto`}
      />
      <Image
        src={wordmark}
        alt="Logic Electronics"
        priority={priority}
        sizes="110px"
        className={`${wordmarkSize} w-auto`}
      />
    </Link>
  );
}
