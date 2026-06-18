import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * Certification — earned certificates AND the planned "cybersecurity roadmap".
 * Powers graph nodes (kind "cert") and the cert wall (with flip cards whose back
 * shows `description`).
 *
 * IMPORTANT — `title` is a PLAIN String, not localized. Certificate names are
 * official proper nouns ("Google IT Automation with Python — Professional
 * Certificate") and are never translated, matching the frontend i18n policy. Only
 * the human-written `description` (the blurb on the flip-card back / graph sidebar)
 * is localized.
 *
 * `planned: true` marks roadmap certs — they render with a "Planned" badge and a
 * "View path" link, and are DELIBERATELY EXCLUDED from the evidence-based tech
 * radar (they describe where things are heading, not current proficiency).
 */
const certificationSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true }, // "c-it-automation", "c-cy-secplus"
    title: { type: String, required: true, trim: true }, // PLAIN — official name
    org: { type: String, required: true, trim: true }, // "Google · Coursera"
    cat: { type: String, enum: ["dev", "auto", "ai", "cyber", "foundations"], required: true },
    sub: { type: String, trim: true, default: "" }, // optional sub-category

    featured: { type: Boolean, default: false },
    planned: { type: Boolean, default: false }, // cybersecurity roadmap — never shown as earned

    file: { type: String, trim: true, default: "" }, // bundled PDF path / url
    description: { type: localizedString }, // localized blurb (flip-card back + graph)

    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

certificationSchema.index({ active: 1, planned: 1, cat: 1, order: 1 });

export default mongoose.model("Certification", certificationSchema);
