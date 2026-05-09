import mongoose from "mongoose";

const competitorMenuItemSchema = new mongoose.Schema(
  {
    // Parent category reference
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompetitorMenuCategory",
      required: true,
    },

    name: { type: String },
    description: { type: String },
    images: [{ type: String }],

    sellingPrice: { type: Number },
    currency: { type: String, default: "AED" },

    // Serving size or portion description (e.g. "250g", "Regular / Large", "6 pcs")
    portion: { type: String },

    // Price history — derive increase/decrease logic from this array; don't store stale flags.
    // capturedAt = when the price was observed (not necessarily when it changed).
    oldPrices: [
      {
        price: { type: Number },
        capturedAt: { type: Date },
        notes: { type: String }, // "Ramadan pricing", "post-VAT increase"
      },
    ],

    // If the item only exists on one platform (some restaurants list exclusives)
    platform: { type: String },

    notes: { type: String },
    isAvailable: { type: Boolean, default: true }, // item can be temporarily out of stock
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

const CompetitorMenuItem = mongoose.model(
  "CompetitorMenuItem",
  competitorMenuItemSchema,
);

export default CompetitorMenuItem;
