import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * Skill — a competency that acts as a HUB in the knowledge graphs and an AXIS on
 * the proficiency radars. Covers BOTH crafts:
 *   - tech skills:  "sk-frontend", "sk-backend", "sk-cloud", "sk-security", … "sk-grc"
 *   - bar crafts:   "bk-mixology", "bk-menu", "bk-leadership", … "bk-brand"
 *
 * HOW IT POWERS THE FRONTEND
 *   · Graph: every skill is a node of kind "skill". Edges to certs/projects/careers
 *     live in the `connections` collection and reference this skill by `key`.
 *   · Radar (tech):  EVIDENCE-BASED. The tech radar's strength is computed from how
 *     many earned certs + projects connect to the skill, so we store no number —
 *     `evidenceBased: true` tells the graph controller to derive it.
 *   · Radar (bar):   SELF-RATED. A 14-year veteran rating, stored in `rating` (0–100).
 *   · `radarAxis` is the axis key the frontend already uses ("frontend", "mixology"…);
 *     skills without one still appear in the graph but not on the radar.
 */
const skillSchema = new mongoose.Schema(
  {
    // stable graph id — matches the frontend's existing ids (sk-* / bk-*)
    key: { type: String, required: true, unique: true, trim: true },

    domain: { type: String, enum: ["tech", "bar"], required: true },

    name: { type: localizedString, required: true },
    description: { type: localizedString, required: true },

    // radar
    radarAxis: { type: String, trim: true, default: "" }, // "" = not on the radar
    rating: { type: Number, min: 0, max: 100, default: 0 }, // used when evidenceBased = false
    evidenceBased: { type: Boolean, default: false }, // tech: derive strength from connections

    // optional visual override; otherwise the frontend palette decides by domain
    color: { type: String, trim: true, default: "" },

    // presentation
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// fast lookups for the graph/radar assembly
skillSchema.index({ domain: 1, active: 1, order: 1 });

export default mongoose.model("Skill", skillSchema);
