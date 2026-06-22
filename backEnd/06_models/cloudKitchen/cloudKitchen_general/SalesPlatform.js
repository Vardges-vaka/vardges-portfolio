import mongoose from "mongoose";
import {
  AUDIT,
  getLoginCredentialSchema,
  getKAMSchema,
  getPlatformSupportSchema,
} from "../modelHelpers/.temp.index.js";
/*

*/
const salesPlatformSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // "Talabat"
    notes: { type: String },
    links: {
      logoUrl: { type: String },
      websiteUrl: { type: String },
      partnerPortalUrl: { type: String },
      other: [{ label: { type: String }, link: { type: String } }],
    },

    kam: getKAMSchema(),
    loginCredentials: [getLoginCredentialSchema()],
    support: [getPlatformSupportSchema()],

    ...AUDIT,
  },
  { timestamps: true },
);
const SalesPlatform = mongoose.model("SalesPlatform", salesPlatformSchema);

export default SalesPlatform;
