import mongoose from "mongoose";
import {
  localizedTextSchema,
  descriptionBundleSchema,
  activeTimingsSchema,
} from "../04_helpers/schemaHelpers/menu_shared_schemas.js";

const menuItemSchema = new mongoose.Schema(
  {
    name: localizedTextSchema,
    descriptions: descriptionBundleSchema,
    cost: { type: Number },
    sellingPrice: { type: Number },
    images: {
      aggregators: { type: String },
      website: { type: String },
      google: { type: String },
      original: { type: String },
      icon: { type: String },
    },
    recipeFile: { type: String },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
    modifiers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Modifier" }],
    activeTimings: activeTimingsSchema,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("MenuItem", menuItemSchema);
