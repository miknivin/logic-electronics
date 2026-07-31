import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * An enquiry submitted from the contact page or the "Request a Quote" modal.
 */

export const ENQUIRY_STATUSES = [
  "new",
  "contacted",
  "quoted",
  "won",
  "closed",
] as const;

export const ENQUIRY_SOURCES = ["contact-page", "quote-modal"] as const;

export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [120, "Name is too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [200, "Email is too long"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email address is not valid"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [40, "Phone number is too long"],
    },
    service: {
      type: String,
      trim: true,
      maxlength: [120, "Service name is too long"],
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [5000, "Message is too long"],
    },
    source: {
      type: String,
      enum: ENQUIRY_SOURCES,
      default: "contact-page",
    },
    status: {
      type: String,
      enum: ENQUIRY_STATUSES,
      default: "new",
      index: true,
    },
    /** Page the enquiry was sent from, useful for tracing where leads come from. */
    pagePath: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
  },
  { timestamps: true },
);

// Newest first, the order the team will read them in.
enquirySchema.index({ createdAt: -1 });

export type Enquiry = InferSchemaType<typeof enquirySchema>;

/**
 * Reuse the compiled model across hot reloads. Without this, Mongoose throws
 * "Cannot overwrite `Enquiry` model once compiled" on the second reload.
 */
export const EnquiryModel: Model<Enquiry> =
  (mongoose.models.Enquiry as Model<Enquiry>) ??
  mongoose.model<Enquiry>("Enquiry", enquirySchema);
