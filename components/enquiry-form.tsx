"use client";

import { usePathname } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";

import { services } from "@/lib/services";
import { contact } from "@/lib/site";

/**
 * Enquiry form, shared by the contact page and the "Request a Quote" modal.
 * Submissions are POSTed to /api/enquiries and stored in MongoDB.
 */

type Status = "idle" | "submitting" | "success" | "error";

type EnquiryFormProps = {
  /** Pre-selects the service dropdown, used when opening from a service page. */
  defaultService?: string;
  source?: "contact-page" | "quote-modal";
  /** Called after a successful save, used by the modal to show a done state. */
  onSuccess?: () => void;
};

const inputClasses =
  "mt-2 block w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600";

const errorInputClasses =
  "mt-2 block w-full rounded-md border border-red-400 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

export function EnquiryForm({
  defaultService = "",
  source = "contact-page",
  onSuccess,
}: EnquiryFormProps) {
  const pathname = usePathname();
  const fieldId = useId();

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    setStatus("submitting");
    setFieldErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, pagePath: pathname }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setFieldErrors(result?.fields ?? {});
        setMessage(
          result?.error ??
            `Something went wrong. Please call ${contact.primaryPhone} or email ${contact.email} instead.`,
        );
        return;
      }

      setStatus("success");
      setMessage(
        "Thanks, we have got your enquiry. We usually reply within one working day.",
      );
      form.reset();
      onSuccess?.();
    } catch {
      setStatus("error");
      setMessage(
        `We could not reach the server. Please call ${contact.primaryPhone} or email ${contact.email} instead.`,
      );
    }
  }

  const isSubmitting = status === "submitting";

  /** Renders the small red hint under a field when the API rejects it. */
  const fieldError = (field: string) =>
    fieldErrors[field] ? (
      <p id={`${fieldId}-${field}-error`} className="mt-1.5 text-sm text-red-700">
        {fieldErrors[field]}
      </p>
    ) : null;

  const classesFor = (field: string) =>
    fieldErrors[field] ? errorInputClasses : inputClasses;

  const describedBy = (field: string) =>
    fieldErrors[field] ? `${fieldId}-${field}-error` : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${fieldId}-name`}
            className="block text-sm font-semibold text-primary-950"
          >
            Full name <span className="text-secondary-600">*</span>
          </label>
          <input
            id={`${fieldId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={describedBy("name")}
            className={classesFor("name")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label
            htmlFor={`${fieldId}-phone`}
            className="block text-sm font-semibold text-primary-950"
          >
            Phone <span className="text-secondary-600">*</span>
          </label>
          <input
            id={`${fieldId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+971 50 000 0000"
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={describedBy("phone")}
            className={classesFor("phone")}
          />
          {fieldError("phone")}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${fieldId}-email`}
          className="block text-sm font-semibold text-primary-950"
        >
          Email <span className="text-secondary-600">*</span>
        </label>
        <input
          id={`${fieldId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={describedBy("email")}
          className={classesFor("email")}
        />
        {fieldError("email")}
      </div>

      <div>
        <label
          htmlFor={`${fieldId}-service`}
          className="block text-sm font-semibold text-primary-950"
        >
          Service you&apos;re interested in
        </label>
        <select
          id={`${fieldId}-service`}
          name="service"
          defaultValue={defaultService}
          className={inputClasses}
        >
          <option value="">Select a service (optional)</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div>
        <label
          htmlFor={`${fieldId}-message`}
          className="block text-sm font-semibold text-primary-950"
        >
          How can we help? <span className="text-secondary-600">*</span>
        </label>
        <textarea
          id={`${fieldId}-message`}
          name="message"
          rows={5}
          required
          placeholder="Tell us about the equipment, the fault or the project."
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={describedBy("message")}
          className={classesFor("message")}
        />
        {fieldError("message")}
      </div>

      {/* Honeypot field: visually hidden, ignored by real users. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${fieldId}-company-website`}>Do not fill this in</label>
        <input
          id={`${fieldId}-company-website`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary-500 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send enquiry
            <Send className="h-5 w-5" aria-hidden="true" />
          </>
        )}
      </button>

      <p aria-live="polite" className="text-sm">
        {status === "success" ? (
          <span className="font-medium text-green-700">{message}</span>
        ) : null}
        {status === "error" ? (
          <span className="font-medium text-red-700">{message}</span>
        ) : null}
      </p>
    </form>
  );
}
