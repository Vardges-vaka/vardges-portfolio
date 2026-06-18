import mongoose from "mongoose";

/**
 * graphRef — a stable, cross-collection pointer to a "node" in the knowledge graphs.
 *
 * THE CORE IDEA behind the whole graph/mind-map design:
 *   The frontend's knowledge graph (tech / bar / universe) and the mind-map are
 *   built from NODES that live in different collections (skills, certifications,
 *   projects, careers, testimonials) joined by EDGES. Rather than couple edges to
 *   MongoDB ObjectIds (which change per environment and are awkward to seed), every
 *   node carries a human-readable, STABLE `key` — exactly the ids the frontend
 *   already uses today:
 *       skills:        "sk-frontend", "bk-mixology"
 *       certs:         "c-it-automation", "c-cy-secplus"
 *       projects:      "p-cloudops"
 *       careers:       "xp-bff"
 *       testimonials:  "t-maria"
 *       bridges:       "br-experience"  (a Connection of kind "bridge")
 *
 *   An edge (see connections.model.js) is then just `{ from: graphRef, to: graphRef }`.
 *   This means the assembled `/graph/:variant` payload matches the shape the React
 *   `KnowledgeGraph` component consumes 1:1 — so you can swap the static data files
 *   for the API with ZERO component changes.
 */
export const NODE_KINDS = ["skill", "cert", "project", "career", "testimonial", "bridge"];

const graphRefSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: NODE_KINDS, required: true },
    key: { type: String, required: true, trim: true },
  },
  { _id: false }
);

export default graphRefSchema;
