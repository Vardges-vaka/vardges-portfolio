import mongoose from "mongoose";

// Localized text: 3 language slots (English, Russian, Arabic)
export const localizedTextSchema = new mongoose.Schema(
  {
    en: { type: String },
    ru: { type: String },
    ar: { type: String },
  },
  { _id: false },
);

// Description bundle: three channels, each localized
export const descriptionBundleSchema = new mongoose.Schema(
  {
    aggregators: localizedTextSchema,
    website: localizedTextSchema,
    google: localizedTextSchema,
  },
  { _id: false },
);

// Active timing windows. isAlwaysActive=true (or empty windows) means the
// item is available at all hours. When false, the item is only available
// during the listed windows. Runtime evaluation is NOT done here — the
// schema just stores the configuration.
export const activeTimingsSchema = new mongoose.Schema(
  {
    isAlwaysActive: { type: Boolean, default: true },
    windows: [
      {
        label: { type: String },
        from: { type: String },
        to: { type: String },
        _id: false,
      },
    ],
  },
  { _id: false },
);
