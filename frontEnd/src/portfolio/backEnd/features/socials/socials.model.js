import mongoose from "mongoose";

/**
 * Social — a social / contact link used in the nav, footer and contact rail
 * (LinkedIn, GitHub, Discord, Email, …).
 *
 * All fields are plain strings — platform names, handles and urls are not
 * translated. (The accessible label could be localized later if desired.)
 *
 * NOTE: the current frontend has TODO placeholders for the GitHub and Discord
 * urls (see portfolio.constants.js) — fill them here once known.
 */
const socialSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true }, // "linkedin"
    platform: { type: String, required: true, trim: true }, // "LinkedIn"
    label: { type: String, trim: true, default: "" }, // accessible label
    display: { type: String, trim: true, default: "" }, // the @handle / text shown
    url: { type: String, required: true, trim: true },
    icon: { type: String, trim: true, default: "" }, // lucide / custom icon name
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

socialSchema.index({ active: 1, order: 1 });

export default mongoose.model("Social", socialSchema);
