import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * Contact — a SINGLETON holding the contact section's configuration: the direct
 * channels and the intent chips (Build / Consult / Chat). Inbound form
 * submissions live in a separate model (contactMessage.model.js).
 *
 * Singleton pattern: a fixed `singleton: "contact"` unique key guarantees exactly
 * one document; the controller upserts it.
 */
const contactSchema = new mongoose.Schema(
  {
    singleton: { type: String, default: "contact", unique: true, immutable: true },
    email: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" }, // E.164
    phoneDisplay: { type: String, trim: true, default: "" },
    location: { type: localizedString },
    ctaText: { type: localizedString },
    intents: {
      type: [
        new mongoose.Schema(
          {
            key: { type: String, enum: ["tech", "bar", "other"], required: true },
            label: { type: localizedString, required: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
