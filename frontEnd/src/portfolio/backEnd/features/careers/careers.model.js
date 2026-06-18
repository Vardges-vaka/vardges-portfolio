import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * Career — 14 years of roles. ONE collection feeds THREE frontend surfaces:
 *   1. bar graph nodes (kind "career", rendered as type "experience"),
 *   2. the home "journey"/recipe timeline (chronological),
 *   3. the bar tasting-menu prose (role/venue/city/text per "course").
 *
 * `type` colours the timeline card (a career can be bar, tech, or hybrid — e.g.
 * the pivot to coding is "tech", founding The Cocktail Tree is "hybrid").
 * `courseIndex` aligns a role with its tasting-menu entry on the bar page.
 *
 * Translatable: role, title, text. Plain: venue, city, country, year (proper
 * nouns / dates).
 */
const careerSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true }, // "xp-bff"

    role: { type: localizedString, required: true }, // "Bar Manager"
    venue: { type: String, trim: true, default: "" }, // proper noun
    city: { type: String, trim: true, default: "" },
    country: { type: String, trim: true, default: "" },
    year: { type: String, trim: true, default: "" }, // "2018–24"

    courseIndex: { type: Number, default: -1 }, // aligns with bar tasting-menu order

    type: { type: String, enum: ["bar", "tech", "hybrid"], default: "bar" }, // timeline colour

    title: { type: localizedString }, // timeline headline (may differ from role)
    place: { type: String, trim: true, default: "" }, // "BFF Sports Bar · Dubai, UAE"
    text: { type: localizedString }, // the blurb (timeline + tasting menu)

    order: { type: Number, default: 0 }, // chronological order
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

careerSchema.index({ active: 1, order: 1 });

export default mongoose.model("Career", careerSchema);
