import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * StackGroup — the concrete technology "arsenal" shown grouped on /tech
 * ("Frontend", "Backend", "Cloud & DevOps", "Security & practice").
 *
 * WHY a group document:
 *   The frontend renders the stack as a few cards, each a named group with a list
 *   of tools. So the natural unit is the GROUP. `items` are brand/tech names
 *   (React 19, Node.js, AWS …) and STAY PLAIN STRINGS — proper nouns are never
 *   translated, matching the frontend i18n policy. Only the group `name` is
 *   translatable (e.g. "Frontend" → "Фронтенд").
 */
const stackGroupSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true }, // "stack-frontend"
    name: { type: localizedString, required: true },
    items: { type: [String], default: [] }, // plain brand/tech names
    icon: { type: String, trim: true, default: "" }, // lucide icon name (frontend maps it)
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

stackGroupSchema.index({ active: 1, order: 1 });

export default mongoose.model("StackGroup", stackGroupSchema);
