import mongoose from "mongoose";
import localizedString from "../../_shared/localizedString.schema.js";

/**
 * Profile — a SINGLETON holding the site-wide content that no other collection
 * owns: identity, hero copy, the "who I am" intro, the manifesto, the live
 * now-panel, the home stat counters, and the marquee words.
 *
 * Singleton pattern: a fixed unique `singleton: "profile"` key → exactly one doc;
 * the controller upserts it.
 */
const statSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true },
    suffix: { type: String, default: "" }, // "+", "" …
    label: { type: localizedString, required: true },
    mode: { type: String, enum: ["both", "tech", "bar"], default: "both" }, // which audience this number leads for
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    singleton: { type: String, default: "profile", unique: true, immutable: true },

    name: { type: String, trim: true, default: "" }, // proper noun
    role: { type: localizedString },
    location: { type: localizedString },
    tagline: { type: localizedString },

    hero: {
      kicker: { type: localizedString },
      techWord: { type: localizedString }, // "The Engineer"
      barWord: { type: localizedString }, // "The Alchemist"
      techSub: { type: localizedString },
      barSub: { type: localizedString },
    },

    about: {
      kicker: { type: localizedString },
      title: { type: localizedString },
      paragraphs: { type: [localizedString], default: [] },
      badges: { type: [localizedString], default: [] },
    },

    manifesto: { type: localizedString },

    now: {
      tz: { type: String, default: "Dubai · GST" },
      statuses: { type: [localizedString], default: [] },
    },

    stats: { type: [statSchema], default: [] },
    marquee: { type: [localizedString], default: [] },

    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
