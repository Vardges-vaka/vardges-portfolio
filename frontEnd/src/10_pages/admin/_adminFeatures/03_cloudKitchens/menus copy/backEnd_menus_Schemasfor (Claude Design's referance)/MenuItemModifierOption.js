import mongoose from "mongoose";

import {
  getNameSchema,
  getDescriptionSchema,
  getImagesSchema,
  getfileTypesSchema,
  getPriceSchema,
  getOwnershipSchema,
  getSoftDeleteSchema,
  getAuditFieldsSchema,
  getCloudStorageSchema,
  getNutritionSchema,
} from "../../../04_helpers/helpers.index.js";

/*
  MenuItemModifierOption — reusable, atomic.

  No isActive: if you do not want an option to appear, remove it from the
  parent MenuItemModifier.options[] array.
*/
import { MENU_OWNER_TYPES } from "../../../10_constances/cloudKitchen/menu_ownerTypes.js";
const menuItemModifierOptionSchema = new mongoose.Schema(
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
    images: getImagesSchema(),
    recipeFile: getfileTypesSchema(),
    techCardFile: getfileTypesSchema(),
    // TODO
    availableInModifiers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MenuItemModifier" },
    ],
    cost: {
      actualCost: { type: Number },
      estimatedCost: { type: Number },
    },
    sellingPrice: getPriceSchema(),
    nutrition: getNutritionSchema(),

    cloudStorage: getCloudStorageSchema(),
    ...getSoftDeleteSchema(),
    ...getAuditFieldsSchema(),
  },
  { timestamps: true },
);

menuItemModifierOptionSchema.index({ ownerType: 1, ownerId: 1, isDeleted: 1 });

const MenuItemModifierOption = mongoose.model(
  "MenuItemModifierOption",
  menuItemModifierOptionSchema,
);

export default MenuItemModifierOption;
