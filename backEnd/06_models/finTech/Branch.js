import mongoose from "mongoose";
import {
  partnerList,
  getContactSchema,
  PARTNERSHIP_STATUS,
} from "../../04_helpers/schemaHelpers/_schemaHelpers.index";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, enum: partnerList },
    description: { type: String },
    commissionRate: { type: Number },
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    notes: { type: String },
    contact: { support: getContactSchema(), branch: getContactSchema() },
    files: [{ type: String }],

    status: {
      type: String,
      enum: PARTNERSHIP_STATUS,
      default: "active",
    },

    timing: {
      openningTime: { type: Date, required: true },
      closingTime: { type: Date, required: true },
      is24Hours: { type: Boolean, default: false },
    },

    location: {
      address: { type: String },
      coordinates: { type: [Number] },
      mapLink: { type: String },
      label: { type: String },
    },
  },
  { timestamps: true },
);

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;
