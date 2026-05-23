import mongoose from "mongoose";
import {
  getBranchContactSchema,
  getStorageSchema,
  getBranchLocationSchema,
  AUDIT,
} from "../modelHelpers/.temp.index.js";

const contact = getBranchContactSchema(["ourSupport", "manager"]);

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    location: getBranchLocationSchema(),

    contact: {
      ...contact,
    },
    files: getStorageSchema(),

    operations: {
      isActive: { type: Boolean, default: true },
      is24Hours: { type: Boolean, default: false },
      openingTime: { type: String }, // "07:00" HH:mm
      closingTime: { type: String }, // "23:00" HH:mm
      openSince: { type: Date },
      closedSince: { type: Date },
    },
    expenses: [
      {
        period: { from: Date, to: Date }, // or just `date` for one-offs
        kind: { type: String }, // "utility:electricity", "manual:cleaning-extra", etc.
        amount: { type: Number },
        currency: { type: String, default: "AED" },
        source: { type: String, enum: ["manual", "invoice", "snapshot"] },
        file: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" }, // invoice PDF if available
        notes: { type: String },
      },
    ],
    contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    equipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
