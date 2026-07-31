import { connectToDatabase, isDatabaseConfigured } from "@/lib/mongodb";
import {
  ENQUIRY_SOURCES,
  EnquiryModel,
  type EnquirySource,
} from "@/models/enquiry";

/** Enquiries are written per request, so this route is never prerendered. */
export const dynamic = "force-dynamic";

type EnquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  source?: unknown;
  pagePath?: unknown;
  company_website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim a value to a string, tolerating anything the client sends. */
function asText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function validate(payload: EnquiryPayload) {
  const name = asText(payload.name, 120);
  const email = asText(payload.email, 200).toLowerCase();
  const phone = asText(payload.phone, 40);
  const service = asText(payload.service, 120);
  const message = asText(payload.message, 5000);
  const pagePath = asText(payload.pagePath, 300);

  const requestedSource = asText(payload.source, 40) as EnquirySource;
  const source: EnquirySource = ENQUIRY_SOURCES.includes(requestedSource)
    ? requestedSource
    : "contact-page";

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Please tell us your name.";
  if (!email) {
    errors.email = "Please give us an email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "That email address does not look right.";
  }
  if (!phone) errors.phone = "Please give us a phone number.";
  if (!message) {
    errors.message = "Please tell us what you need.";
  } else if (message.length < 10) {
    errors.message = "Please give us a little more detail.";
  }

  return {
    errors,
    data: { name, email, phone, service, message, source, pagePath },
  };
}

export async function POST(request: Request) {
  let payload: EnquiryPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  // Honeypot: real people leave this hidden field empty. Accept and discard, so
  // the bot cannot tell it was rejected.
  if (asText(payload.company_website, 200)) {
    return Response.json({ ok: true }, { status: 202 });
  }

  const { errors, data } = validate(payload);

  if (Object.keys(errors).length > 0) {
    return Response.json(
      { ok: false, error: "Some details are missing.", fields: errors },
      { status: 422 },
    );
  }

  if (!isDatabaseConfigured) {
    console.error("Enquiry received but MONGODB_URI is not configured.", {
      email: data.email,
    });
    return Response.json(
      {
        ok: false,
        error:
          "We could not save your enquiry right now. Please call or email us instead.",
      },
      { status: 503 },
    );
  }

  try {
    await connectToDatabase();
    const enquiry = await EnquiryModel.create(data);

    return Response.json({ ok: true, id: String(enquiry._id) }, { status: 201 });
  } catch (error) {
    console.error("Failed to save enquiry", error);
    return Response.json(
      {
        ok: false,
        error:
          "We could not save your enquiry right now. Please call or email us instead.",
      },
      { status: 500 },
    );
  }
}
