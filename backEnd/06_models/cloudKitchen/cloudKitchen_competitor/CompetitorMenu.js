import mongoose from "mongoose";
import { localizedTextSchema } from "../../../04_helpers/schemaHelpers/menu_shared_schemas.js";

const competitorMenuSchema = new mongoose.Schema(
  {
    // Which competitor this menu belongs to
    competitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competitor",
      required: true,
    },

    name: { type: String },

    // Which delivery platform this snapshot was captured from.
    // null = universal / applies to all platforms.
    platform: { type: String }, // "Talabat" | "Careem Now" | "Noon Food" | "Deliveroo"

    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CompetitorMenuCategory" },
    ],

    // When this menu snapshot was captured (scraped or manually entered)
    capturedAt: { type: Date },

    isActive: { type: Boolean, default: true },
    // Archived = old snapshot kept for historical comparison, not the current menu
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const CompetitorMenu = mongoose.model("CompetitorMenu", competitorMenuSchema);
export default CompetitorMenu;
