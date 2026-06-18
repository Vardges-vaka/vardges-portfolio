import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * Resume — a downloadable CV. The frontend's single, context-aware CV button
 * resolves WHICH one by track:
 *     both  → "both" (full CV)   ·   tech → "tech"   ·   bar → "hospitality"
 * (on /tech and /bar the page wins; on home the audience mode decides.)
 *
 * `current: true` marks the live file for a track; keep older versions with
 * `current: false` for history. `label` is the button text ("Full CV"…).
 */
const resumeSchema = new mongoose.Schema(
  {
    track: { type: String, enum: ["tech", "bar", "both"], required: true },
    label: { type: localizedString, required: true }, // "Full CV" / "Tech CV" / "Hospitality CV"
    file: { type: String, required: true, trim: true }, // PDF path / url
    filename: { type: String, trim: true, default: "" }, // download attribute
    current: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// the current resume per track is what the button needs
resumeSchema.index({ track: 1, current: 1, active: 1 });

export default mongoose.model("Resume", resumeSchema);
