import mongoose from "mongoose";
import { localizedTextSchema } from "../04_helpers/schemaHelpers/menu_shared_schemas.js";

const menuSchema = new mongoose.Schema(
  {
    name: localizedTextSchema,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory" }],
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Menu", menuSchema);
