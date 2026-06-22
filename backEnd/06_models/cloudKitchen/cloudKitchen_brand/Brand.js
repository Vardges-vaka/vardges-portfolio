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
    integrations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Integration" },
    ],
    siblings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    website: { type: mongoose.Schema.Types.ObjectId, ref: "Website" },
    // ── Relations ───────────────────────────────────────────────
    cuisineTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "CuisineTag" }],
    contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }],
    competitors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Competitor" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    equipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    ...AUDIT,
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
