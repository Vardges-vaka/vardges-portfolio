import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";
import media from "../../_shared/media.schema.js";

/**
 * Project — a case-study project. Powers three frontend surfaces at once:
 *   1. graph node (kind "project") on the tech graph,
 *   2. the projects grid (featured wide card + incremental "load more"),
 *   3. the deep-dive modal (highlights list).
 *
 * The field shape mirrors `data/sampleProjects.js` exactly so swapping the static
 * array for `GET /projects` needs no frontend change.
 *
 * Translatable: title, tagline, description, metrics[].label, highlights[].
 * Plain (proper nouns / urls / tech): slug, year, stack[], links, media ids.
 */
const metricSchema = new mongoose.Schema(
  { value: { type: String, required: true }, label: { type: localizedString, required: true } },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true }, // "p-cloudops"
    slug: { type: String, required: true, unique: true, trim: true },

    title: { type: localizedString, required: true },
    tagline: { type: localizedString, required: true },
    description: { type: localizedString, required: true },

    year: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["live", "progress", "concept"], default: "concept" },

    featured: { type: Boolean, default: false }, // the wide hero card
    caseStudy: { type: Boolean, default: false },

    stack: { type: [String], default: [] }, // plain tech names
    media: { type: media, default: () => ({}) },
    links: {
      live: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
      anchor: { type: String, trim: true, default: "" },
    },

    metrics: { type: [metricSchema], default: [] }, // shown on the featured card
    highlights: { type: [localizedString], default: [] }, // deep-dive bullets

    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ active: 1, featured: -1, order: 1 });

export default mongoose.model("Project", projectSchema);
