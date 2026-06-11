import mongoose from "mongoose";
import { getLocalizedTextSchema } from "../../../04_helpers/helpers.index.js";
import {
  getDescriptionSchema,
  getStorageSchema,
  socialAccountSchema,
  registeredInSchema,
  BRAND_PRICE_RANGES,
  AUDIT,
} from "../modelHelpers/.temp.index.js";

const brandSchema = new mongoose.Schema(
  {
    // ── Basic ───────────────────────────────────────────────
    name: { type: String },
    tagline: {
      value: { type: String },
      translations: getLocalizedTextSchema(),
    },
    description: getDescriptionSchema(),

    // ── Files ───────────────────────────────────────────────


    files: getStorageSchema(),

    // ── Socials ───────────────────────────────────────────────
    socials: [socialAccountSchema()],

    // ── Registered in ───────────────────────────────────────────────
    registeredIn: registeredInSchema(),
    priceRange: { type: String, enum: BRAND_PRICE_RANGES },
    cuisineTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "CuisineTag" }],
    website: { type: mongoose.Schema.Types.ObjectId, ref: "Website" },
    contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }],
    integrations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Integration" },
    ],
    siblings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    equipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    competitors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Competitor" }],
    ...AUDIT,
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
