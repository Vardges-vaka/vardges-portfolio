import mongoose from "mongoose";

import {
  getNameSchema,
  getDescriptionSchema,
  getactiveTimingsSchema,
  getSoftDeleteSchema,
  getAuditFieldsSchema,
} from "../../../04_helpers/helpers.index.js";
import { MENU_OWNER_TYPES } from "../../../10_constances/cloudKitchen/menu_ownerTypes.js";

/*
  MenuCategory — owned by exactly one Menu.
  Carries its own isActive + activeTimings (unambiguous, one parent).
  `menuItems[]` is the join layer between the reusable MenuItem and this
  owned category — that is why isActive / activeTimings / displayOrder /
  sellingPriceOverride live on each join entry, not on MenuItem itself.
*/

const menuCategorySchema = new mongoose.Schema(
  {
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

    name: getNameSchema(),
    description: getDescriptionSchema(),

    // parent menu (one menu owns this category)
    menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },

    // join layer to reusable MenuItem
    menuItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
        },
        // activation/timings for this item *in this category*.
        // If activeTimings is empty, the item follows the category's
        // activeTimings.
        isActive: { type: Boolean, default: true },
        activeTimings: getactiveTimingsSchema(),
        displayOrder: { type: Number, default: 0 },
        // optional per-menu override of MenuItem.sellingPrice.gross
        sellingPriceOverride: { type: Number },
      },
    ],

    isActive: { type: Boolean, default: true },
    activeTimings: getactiveTimingsSchema(),
    displayOrder: { type: Number, default: 0 },

    ...getSoftDeleteSchema(),
    ...getAuditFieldsSchema(),
  },
  { timestamps: true },
);

menuCategorySchema.index({ ownerType: 1, ownerId: 1, isDeleted: 1 });
menuCategorySchema.index({ menu: 1 });

const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);

export default MenuCategory;
