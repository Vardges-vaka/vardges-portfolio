import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * Service — a Cocktail Tree consultancy offering (menu engineering, staff
 * training, bar audits, opening support, supplier strategy, guest-experience
 * design). Rendered as the "Consulting, with roots" cards on /bar.
 */
const serviceSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true }, // "svc-menu"
    title: { type: localizedString, required: true },
    text: { type: localizedString, required: true },
    icon: { type: String, trim: true, default: "" }, // lucide icon name
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceSchema.index({ active: 1, order: 1 });

export default mongoose.model("Service", serviceSchema);
