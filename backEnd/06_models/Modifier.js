import mongoose from "mongoose";
import {
  localizedTextSchema,
  descriptionBundleSchema,
} from "../04_helpers/schemaHelpers/menu_shared_schemas.js";

const modifierOptionSchema = new mongoose.Schema(
  {
    name: localizedTextSchema,
    descriptions: descriptionBundleSchema,
    cost: { type: Number },
    sellingPrice: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { _id: true },
);

const modifierSchema = new mongoose.Schema(
  {
    name: localizedTextSchema,
    descriptions: descriptionBundleSchema,
    type: { type: String, enum: ["optional", "mandatory"], default: "optional" },
    selectionQty: { type: String, enum: ["onlyOne", "multiple"], default: "onlyOne" },
    cost: { type: Number },
    options: [modifierOptionSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Modifier", modifierSchema);
