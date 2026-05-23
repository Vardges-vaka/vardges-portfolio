import mongoose from "mongoose";
import {
  getSoftDeleteSchema,
  getAuditFieldsSchema,
} from "../../../04_helpers/helpers.index.js";
import { MENU_OWNER_TYPES } from "../../../10_constances/cloudKitchen/menu_ownerTypes.js";

/*
  Menu — composition layer. Owned by one (Branch x Brand x Aggregator)
  triple in the future SalesChannel refactor; for now it is owned by a
  Brand or Competitor via getOwnershipSchema.

  No `hasTimeBoundCategories` / `hasTimeBoundMenuItems` flags — the
  consumer can check activeTimings on each entity at render time.
*/

const menuSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    description: { type: String },
    ownerType: {
      type: String,
      enum: MENU_OWNER_TYPES,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      refPath: "ownerType",
    },

    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory" }],

    isActive: { type: Boolean, default: true },

    ...getSoftDeleteSchema(),
    ...getAuditFieldsSchema(),
  },
  { timestamps: true },
);

menuSchema.index({ ownerType: 1, ownerId: 1, isActive: 1, isDeleted: 1 });

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
