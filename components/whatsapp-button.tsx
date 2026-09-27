import { MessageCircle } from "lucide-react";

import { contact } from "@/lib/site";

/**
 * Opens WhatsApp with the enquiry already written, so the customer only has
 * to press send and we know which machine they are asking about.
 *
 * `contact.whatsappHref` is a plain wa.me link; the prefilled body goes on
 * as the `text` query parameter.
 */
export function WhatsAppButton({
  message,
  className = "",
  children = "Enquire on WhatsApp",
}: {
  message: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const href = `${contact.whatsappHref}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ||
        "inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1da851]"
      }
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {children}
    </a>
  );
}
