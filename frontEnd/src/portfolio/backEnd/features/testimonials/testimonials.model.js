import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * Testimonial — a LinkedIn recommendation. Rendered as a graph node (kind
 * "testimonial") and in the testimonials strip.
 *
 * `aiTranslated: true` tells the frontend to show a "translated with AI" badge in
 * any non-English language — because the recommendations were written in English
 * and the RU/HY `quote`/`role` are machine translations (the original English is
 * the authoritative version).
 *
 * `track` decides which graph the person appears on (most are "bar"; add tech
 * recommendations with track "tech" and they show on the tech page).
 */
const testimonialSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true }, // "t-maria"
    name: { type: String, required: true, trim: true }, // proper noun
    role: { type: localizedString, required: true }, // their job title
    org: { type: String, trim: true, default: "" },
    quote: { type: localizedString, required: true },
    track: { type: String, enum: ["bar", "tech"], default: "bar" },
    aiTranslated: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

testimonialSchema.index({ active: 1, track: 1, order: 1 });

export default mongoose.model("Testimonial", testimonialSchema);
