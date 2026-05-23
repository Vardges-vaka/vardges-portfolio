import mongoose from "mongoose";

import {
  getNameSchema,
  getDescriptionSchema,
  getImagesSchema,
  getfileTypesSchema,
  getPriceSchema,
  getSoftDeleteSchema,
  getAuditFieldsSchema,
  getCloudStorageSchema,
  getNutritionSchema,
} from "../../../04_helpers/helpers.index.js";
import { MENU_OWNER_TYPES } from "../../../10_constances/cloudKitchen/menu_ownerTypes.js";
import {
  DIETARY_TAGS,
  ALLERGENS,
  KITCHEN_STATIONS,
  CUISINE_TYPES,
} from "../../../10_constances/_constances.index.js";

/*
  MenuItem — reusable, atomic.
  See cloudKitchen_menu/cloudKitchen_menu_README.md for the design.

  Activation / timings DO NOT live here — they live on the
  `MenuCategory.menuItems[]` join entry, because items are reusable across
  menus and each context decides its own active state.
*/

const menuItemSchema = new mongoose.Schema(
  {
    // ownership: Brand or Competitor
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

    // identity & presentation
    name: getNameSchema(),
    description: getDescriptionSchema(),
    images: getImagesSchema(),

    // recipe (Recipe layer is a future refactor)
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    recipeFile: getfileTypesSchema(),
    techCardFile: getfileTypesSchema(),
    otherFiles: [
      {
        ref: { type: String },
        path: { type: String },
        fileType: { type: String },
        sizeInBytes: { type: Number },
        description: { type: String },
      },
    ],

    // pricing — actualCost stays manual via estimatedCost until Recipe lands
    cost: {
      actualCost: { type: Number },
      estimatedCost: { type: Number },
    },
    sellingPrice: getPriceSchema(),
    priceHistory: [
      {
        from: { type: Date },
        to: { type: Date },
        price: { type: Number },
        source: { type: String },
      },
    ],
    // TODO
    availableInCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory" },
    ],
    // modifiers — reusable refs, with per-item display order
    modifiers: [
      {
        modifier: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItemModifier",
        },
        displayOrder: { type: Number, default: 0 },
      },
    ],

    // portion
    sizeByGrams: { type: Number },
    quantity: { type: Number },

    // enrichments
    dietaryTags: [{ type: String, enum: DIETARY_TAGS }],
    allergens: [{ type: String, enum: ALLERGENS }],
    spicyLevel: { type: Number, min: 0, max: 3 },
    preparationTimeMin: { type: Number },
    sku: { type: String },
    kitchenStation: { type: String, enum: KITCHEN_STATIONS },
    cuisineType: { type: String, enum: CUISINE_TYPES },
    nutrition: getNutritionSchema(),

    // symmetric cross-link to "same food, different brand" twins.
    // Service layer keeps both sides in sync.
    mirroredWithOtherMenuItems: [
      {
        brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
        item: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        note: { type: String },
      },
    ],

    // one-directional cross-link from our items to competitor items
    competesWithOtherMenuItems: [
      {
        brand: { type: mongoose.Schema.Types.ObjectId, ref: "Competitor" },
        item: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        sizeByGrams: { type: String },
        quantity: { type: Number },
        addOns: [
          {
            type: {
              type: String,
              enum: ["sauce", "sideDish", "drink", "dessert"],
            },
            description: { type: String },
            sizeByGrams: { type: String },
            quantity: { type: Number },
          },
        ],
        sellingPrice: getPriceSchema(),
        estimatedCost: { type: Number },
        capturedAt: { type: Date },
        note: { type: String },
      },
    ],

    // capture provenance (mostly relevant for competitor items)
    source: { type: String },

    // inventory integration id (Supy / Sapaad / GrabTech / UrbanPiper)
    externalId: { type: String },

    // cross-cutting
    cloudStorage: getCloudStorageSchema(),
    ...getSoftDeleteSchema(),
    ...getAuditFieldsSchema(),
  },
  { timestamps: true },
);

menuItemSchema.index({ ownerType: 1, ownerId: 1 });
menuItemSchema.index({ ownerType: 1, ownerId: 1, isDeleted: 1 });
menuItemSchema.index(
  { ownerType: 1, ownerId: 1, sku: 1 },
  { unique: true, sparse: true },
);
menuItemSchema.index({ "name.label": "text", "description.short.en": "text" });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
