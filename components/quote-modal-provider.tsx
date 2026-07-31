"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, X } from "lucide-react";

import { EnquiryForm } from "@/components/enquiry-form";
import { contact } from "@/lib/site";

type QuoteModalContextValue = {
  /** Opens the quote modal, optionally pre-selecting a service. */
  openQuoteModal: (service?: string) => void;
  closeQuoteModal: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);

  if (!context) {
    throw new Error("useQuoteModal must be used inside <QuoteModalProvider>");
  }

  return context;
}

/**
 * Provides the "Request a Quote" modal to the whole app.
 *
 * Built on the native <dialog> element, so focus trapping, the top layer and
 * Escape-to-close come from the browser rather than from extra dependencies.
 */
export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openQuoteModal = useCallback((nextService?: string) => {
    setService(nextService ?? "");
    setIsSubmitted(false);
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Drive the native dialog from React state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      // Stop the page behind the dialog from scrolling.
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    if (!isOpen) {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({ openQuoteModal, closeQuoteModal }),
    [openQuoteModal, closeQuoteModal],
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="quote-modal-title"
        onClose={() => setIsOpen(false)}
        // Clicking the backdrop (the dialog element itself) closes the modal.
        onClick={(event) => {
          if (event.target === dialogRef.current) setIsOpen(false);
        }}
        className="m-auto w-[calc(100vw-2rem)] max-w-2xl rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-primary-950/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
          <div>
            <h2
              id="quote-modal-title"
              className="text-xl font-bold text-primary-950 sm:text-2xl"
            >
              Request a Quote
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Tell us what you need and we&apos;ll come back with a clear price.
            </p>
          </div>

          <button
            type="button"
            onClick={closeQuoteModal}
            className="shrink-0 rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-primary-900"
          >
            <span className="sr-only">Close dialog</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8">
          {isSubmitted ? (
            <div className="py-6 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold">Enquiry sent</h3>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-600">
                Thanks, we have got your details and someone will get back to
                you, usually within one working day. If it is urgent, call us on{" "}
                <a
                  href={contact.primaryPhoneHref}
                  className="font-semibold text-primary-700 hover:text-secondary-600"
                >
                  {contact.primaryPhone}
                </a>
                .
              </p>

              <button
                type="button"
                onClick={closeQuoteModal}
                className="mt-7 inline-flex items-center justify-center rounded-md bg-primary-700 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-800"
              >
                Close
              </button>
            </div>
          ) : isOpen ? (
            /*
             * Keyed on the service and mounted only while open, so each time the
             * modal opens it gets a fresh form with the right service preselected
             * and no leftover state from the previous visit.
             */
            <EnquiryForm
              key={service}
              defaultService={service}
              source="quote-modal"
              onSuccess={() => setIsSubmitted(true)}
            />
          ) : null}
        </div>
      </dialog>
    </QuoteModalContext.Provider>
  );
}
