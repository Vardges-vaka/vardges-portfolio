import mongoose from "mongoose";

import { CLOUD_STORAGES } from "../../../10_constances/cloudStorages.js";
import { MENU_OWNER_TYPES } from "../../../10_constances/cloudKitchen/menu_ownerTypes.js";
import { NUTRITION_SOURCES } from "../../../10_constances/cloudKitchen/menu_nutritionSources.js";

/* ------------------------------------------------------------------ */
/*  Existing helpers (preserved)                                       */
/* ------------------------------------------------------------------ */

const getfileTypesSchema = () => {
  return new mongoose.Schema(
    {
      word: { type: String },
      excel: { type: String },
      pdf: { type: String },
    },
    { _id: false },
  );
};

const getLocalizedTextSchema = () => {
  return new mongoose.Schema(
    {
      ar: { type: String },
      ru: { type: String },
      en: { type: String },
    },
    { _id: false },
  );
};

const getPriceSchema = () => {
  return new mongoose.Schema(
    {
      gross: { type: Number },
      net: { type: Number },
      VAT: { type: Number },
    },
    { _id: false },
  );
};

// NOTE: previously wrapped its content under an outer `name:` key, which
// caused consumer paths like `menuItem.name.label` to actually live at
// `menuItem.name.name.label`. Fixed to return the inner shape directly so
// the documented access pattern works.
const getNameSchema = () => {
  return new mongoose.Schema(
    {
      label: { type: String },
      translations: getLocalizedTextSchema(),
      aggrigators: getLocalizedTextSchema(),
    },
    { _id: false },
  );
};

const getactiveTimingsSchema = () => {
  return new mongoose.Schema(
    {
      isAlwaysActive: { type: Boolean, default: true },
      windows: [
        {
          label: { type: String },
          from: { type: String },
          to: { type: String },
          _id: false,
        },
      ],
    },
    { _id: false },
  );
};

// Kept unchanged per "stays as-is". Not consumed by the new menu schemas
// (ownership is expressed via getOwnershipSchema instead). Retained for
// backwards compatibility with any other code that imports it.
const getTypeSchema = () => {
  return new mongoose.Schema(
    {
      type: String,
      enum: ["competitor", "own"],
      default: "own",
    },
    { _id: false },
  );
};

const getDescriptionSchema = () => {
  return new mongoose.Schema(
    {
      aggrigators: getLocalizedTextSchema(),
      website: {
        short: getLocalizedTextSchema(),
        long: getLocalizedTextSchema(),
      },
      short: getLocalizedTextSchema(),
      long: getLocalizedTextSchema(),
      google: { type: String },
    },
    { _id: false },
  );
};

const getImagesSchema = () => {
  return new mongoose.Schema(
    {
      main: { type: String },
      aggregators: { type: String },
      website: { type: String },
      google: { type: String },
      highRes: { type: String },
      noBackgroundPng: { type: String },
      jpg: { type: String },
      png: { type: String },
      WebP: { type: String },
      ico: { type: String },
      other: [
        {
          ref: { type: String },
          path: { type: String },
          fileType: { type: String },
          sizeInBytes: { type: Number },
          description: { type: String },
        },
      ],
    },
    { _id: false },
  );
};

/* ------------------------------------------------------------------ */
/*  New cross-cutting helpers                                          */
/*  Return plain objects so they spread into a Mongoose schema         */
/*  definition (vs returning a Schema, which is used as a field value).*/
/* ------------------------------------------------------------------ */

// Brand or Competitor ownership. `refPath` resolves the model name from
// the sibling `ownerType` field, which is why MENU_OWNER_TYPES values
// match the model names exactly ("Brand", "Competitor").
const getOwnershipSchema = () => {
  return {
    ownerType: {
      type: String,
      enum: MENU_OWNER_TYPES,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "ownerType",
    },
  };
};

const getSoftDeleteSchema = () => {
  return {
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  };
};

const getAuditFieldsSchema = () => {
  return {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  };
};

// Per-document override of where associated files are stored.
// `isDefault: true` → use the system default. Otherwise read `value`.
const getCloudStorageSchema = () => {
  return new mongoose.Schema(
    {
      isDefault: { type: Boolean, default: true },
      value: { type: String, enum: CLOUD_STORAGES },
    },
    { _id: false },
  );
};

// Nutrition denormalised onto MenuItem / MenuItemModifierOption.
// `source` distinguishes manual entry from Recipe-derived values; when the
// Recipe refactor lands, a service hook will flip `source` to
// "autoFromRecipe" and set `lastCalculatedAt`.
const getNutritionSchema = () => {
  return new mongoose.Schema(
    {
      source: {
        type: String,
        enum: NUTRITION_SOURCES,
        default: "manual",
      },
      calories: { type: Number },
      protein: { type: Number },
      carbs: { type: Number },
      fat: { type: Number },
      lastCalculatedAt: { type: Date },
    },
    { _id: false },
  );
};

export {
  getfileTypesSchema,
  getLocalizedTextSchema,
  getPriceSchema,
  getNameSchema,
  getactiveTimingsSchema,
  getTypeSchema,
  getDescriptionSchema,
  getImagesSchema,
  getOwnershipSchema,
  getSoftDeleteSchema,
  getAuditFieldsSchema,
  getCloudStorageSchema,
  getNutritionSchema,
};
