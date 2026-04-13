import mongoose from "mongoose";
import {
  PARTNERSHIP_STATUS,
  INTEGRATION_PARTNERS,
  INVENTORY_PARTNERS,
} from "../../04_helpers/schemaHelpers/_schemaHelpers.index";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    competitors: [{ type: String }],
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
    partners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Partnership" }],
    integration: {
      type: String,
      enum: INTEGRATION_PARTNERS,
    },
    inventory: {
      type: String,
      enum: INVENTORY_PARTNERS,
    },

    status: {
      type: String,
      enum: PARTNERSHIP_STATUS,
      default: "active",
    },

    assets: {
      brandBook: { type: String },
      tagline: { type: String },
      logo: { type: String },
      menu: { type: String },
      brandPortfolio: { type: String },
      description: { type: String },
      files: [{ type: String }],
      website: { type: String },
      socialMedia: {
        instagram: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
        youtube: { type: String },
        tiktok: { type: String },
        whatsapp: { type: String },
      },
      legal: {
        VAT_certificate: { type: String },
        trade_license: { type: String },
        banking_details: {
          name: { type: String },
          bank: { type: String },
          accountNumber: { type: String },
          IBAN: { type: String },
          SWIFT: { type: String },
          ref: { type: String },
        },
      },
    },
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
