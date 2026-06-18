import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";
import graphRef from "../../_shared/graphRef.schema.js";

/**
 * Connection — the EDGES of every knowledge graph (and the universe BRIDGES).
 * This is the single most important collection for serving graph connections from
 * the backend.
 *
 * An edge points `from` one node `to` another (both by stable {kind, key}), tagged
 * with a `relation` code and the `graph` it belongs to. The graph assembler
 * (features/graph) turns these into the `{ source, target, kind }` links the
 * frontend already consumes.
 *
 * RELATION CODES (copied from the frontend's graphData.js):
 *   cs  cert       → skill        (this cert built this skill)
 *   ps  project    → skill        (this project exercised this skill)
 *   cp  cert       → project      (this cert enabled this project)
 *   pp  project    → project      (built on / informed by)
 *   es  career(exp)→ skill(craft) (this role built this craft)
 *   ee  career     → career       (the career chain)
 *   te  testimonial→ career       (worked together at)
 *   tk  testimonial→ skill(craft) (praised this craft)
 *   br  BRIDGE                    (universe: a tech node ↔ a bar node)
 *
 * BRIDGES: a `relation: "br"` document also carries a `key` and localized
 * `label` + `why`. The frontend renders a bridge as a NODE of kind "bridge"
 * sitting between its two endpoints — see features/graph and the frontend
 * KnowledgeGraph "universe" variant.
 */
const connectionSchema = new mongoose.Schema(
  {
    key: { type: String, trim: true, default: "" }, // required only for bridges, e.g. "br-experience"
    from: { type: graphRef, required: true },
    to: { type: graphRef, required: true },
    relation: { type: String, enum: ["cs", "ps", "cp", "pp", "es", "ee", "te", "tk", "br"], required: true },
    graph: { type: String, enum: ["tech", "bar", "universe"], required: true },

    // bridge-only:
    label: { type: localizedString }, // "Experience design"
    why: { type: localizedString }, // the one-line analogy

    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

connectionSchema.index({ graph: 1, active: 1 });
connectionSchema.index({ "from.key": 1 });
connectionSchema.index({ "to.key": 1 });
connectionSchema.index({ relation: 1 });

// a bridge must carry its key + label
connectionSchema.pre("validate", function (next) {
  if (this.relation === "br" && (!this.key || !this.label)) {
    return next(new Error("A bridge connection (relation 'br') requires a key and a label."));
  }
  next();
});

export default mongoose.model("Connection", connectionSchema);
