"use client";

import type { ReactNode } from "react";

import { useQuoteModal } from "@/components/quote-modal-provider";

type QuoteButtonProps = {
  children: ReactNode;
  className?: string;
  /** Pre-selects a service in the modal, used on service detail pages. */
  service?: string;
  onClick?: () => void;
};

/**
 * Opens the "Request a Quote" modal. Used anywhere a quote CTA appears, so the
 * visitor never loses their place by being sent to the contact page.
 */
export function QuoteButton({
  children,
  className = "",
  service,
  onClick,
}: QuoteButtonProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openQuoteModal(service);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
