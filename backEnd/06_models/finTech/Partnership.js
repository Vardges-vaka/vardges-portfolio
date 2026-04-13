import mongoose from "mongoose";
import {
  partnerList,
  getContactSchema,
  PARTNERSHIP_STATUS,
} from "../../04_helpers/schemaHelpers/_schemaHelpers.index";

const partnershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, enum: partnerList },
    legalName: { type: String },
    logo: { type: String },
    website: { type: String },
    description: { type: String },
    commissionRate: { type: Number },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    signatory: getContactSchema(),
    notes: { type: String },

    contact: {
      KAM: getContactSchema(),
      finSupport: getContactSchema(),
      onboarding: getContactSchema(),
      orderSupport: getContactSchema(),
    },
    credentials: {
      dashboard: {
        username: { type: String },
        password: { type: String },
      },
      isDevice: { type: Boolean, default: false },
      device: {
        username: { type: String },
        password: { type: String },
      },
    },
    integration: {
      type: String,
      enum: ["grabTech", "urbanPiper", "NONE"],
    },
    status: {
      type: String,
      enum: PARTNERSHIP_STATUS,
      default: "active",
    },
    files: {
      contract: { type: String, required: true },
      other: [{ type: String }],
    },
    terms: {
      timing: {
        isInfinite: { type: Boolean, default: false },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
      },
    },
  },
  { timestamps: true },
);

const Partnership = mongoose.model("Partnership", partnershipSchema);

export default Partnership;

/*
    branch: {
      name: { type: String },
      location: {
        address: { type: String },
        coordinates: { type: [Number] },
        mapLink,
      },
      contact: {
        marketingManager: {
          phone: { type: String },
          email: { type: String },
          whatsapp: { type: String },
        },
        customerSupport: {
          phone: { type: String },
          email: { type: String },
          whatsapp: { type: String },
        },
        operationsManager: {
          phone: { type: String },
          email: { type: String },
          whatsapp: { type: String },
        },
        riderSupport: {
          phone: { type: String },
          email: { type: String },
          whatsapp: { type: String },
        },
      },
    },

*/
