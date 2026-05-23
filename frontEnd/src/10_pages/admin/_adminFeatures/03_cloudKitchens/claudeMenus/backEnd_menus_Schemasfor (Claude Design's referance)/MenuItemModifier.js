import mongoose from "mongoose";

import {
  getNameSchema,
  getDescriptionSchema,
  getactiveTimingsSchema,
  getOwnershipSchema,
  getSoftDeleteSchema,
  getAuditFieldsSchema,
  getCloudStorageSchema,
} from "../../../04_helpers/helpers.index.js";

import { MODIFIER_SELECTION_MODES } from "../../../10_constances/_constances.index.js";
import { MENU_OWNER_TYPES } from "../../../10_constances/cloudKitchen/menu_ownerTypes.js";
/*
  MenuItemModifier — reusable across MenuItems.

  Behaviour fields (isOptional, selectionMode, isFree, activeTimings,
  isActive) are GLOBAL. Any change propagates to every MenuItem that
  references this modifier. For different behaviour, duplicate the
  modifier ("Sauce — Free" vs "Sauce — Paid").
*/

const menuItemModifierSchema = new mongoose.Schema(
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

    title: getNameSchema(),
    description: getDescriptionSchema(),

    isOptional: { type: Boolean, default: true },
    selectionMode: {
      type: String,
      enum: MODIFIER_SELECTION_MODES,
      default: "single",
    },
    isFree: { type: Boolean, default: false },

    // TODO
    availableInMenuItems: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    ],
    // join layer to reusable MenuItemModifierOption
    options: [
      {
        option: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItemModifierOption",
        },
        displayOrder: { type: Number, default: 0 },
      },
    ],

    isActive: { type: Boolean, default: true },
    activeTimings: getactiveTimingsSchema(),

    ...getSoftDeleteSchema(),
    ...getAuditFieldsSchema(),
  },
  { timestamps: true },
);

menuItemModifierSchema.index({ ownerType: 1, ownerId: 1, isDeleted: 1 });

const MenuItemModifier = mongoose.model(
  "MenuItemModifier",
  menuItemModifierSchema,
);

export default MenuItemModifier;
