import mongoose from "mongoose";
import {
  localizedTextSchema,
  activeTimingsSchema,
} from "../04_helpers/schemaHelpers/menu_shared_schemas.js";

const menuCategorySchema = new mongoose.Schema(
  {
    name: localizedTextSchema,
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
    activeTimings: activeTimingsSchema,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("MenuCategory", menuCategorySchema);
