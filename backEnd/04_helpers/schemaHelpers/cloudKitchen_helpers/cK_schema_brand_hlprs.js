import mongoose from "mongoose";
import { COMPETITOR_OBSERVATIONS_TAGS } from "../../../05_constants/schema_cnst/cloudKitchen_schema_cnst/cK_schema_brand_cnst.js";

// Brand-group schema helpers — Brand, Competitor.

const socialAccountSchema = () => {
  return new mongoose.Schema(
    {
      isActive: { type: Boolean, default: true },
      link: { type: String },
      consoleLink: { type: String },
      name: {
        type: String,
        enum: [
          "instagram",
          "facebook",
          "tikTok",
          "linkedIn",
          "youtube",
          "twitter",
          "other",
        ],
      },
      notes: { type: String },
    },
    { _id: false },
  );
};

const registeredInSchema = () => {
  return new mongoose.Schema(
    {
      country: { type: String },
      city: { type: String },
      emirate: { type: String },
      hasTradeLicense: { type: Boolean },
      hasVATCertificate: { type: Boolean },
      hasTradeMark: { type: Boolean },
      dateOfRegistration: { type: Date },
    },
    { _id: false },
  );
};

const getObservationsSchema = () => {
  return new mongoose.Schema(
    {
      date: { type: Date },
      note: { type: String },
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      tags: [{ type: String, enum: COMPETITOR_OBSERVATIONS_TAGS }],
    },
    { timestamps: true, _id: false },
  );
};

export { socialAccountSchema, registeredInSchema, getObservationsSchema };
