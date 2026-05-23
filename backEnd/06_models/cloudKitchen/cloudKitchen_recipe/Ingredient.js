import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";
const supplierSchema = new mongoose.Schema(
  {
    name: {
      label: { type: String },
      value: { type: String },
    },
    category: { type: String },
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }],
    measurement: {
      unit: { type: String },
      value: { type: Number },
    },
    cost: { type: Number },

    
    files: {
      logo: { type: String },
      invoices: [
        {
          ref: { type: String },
          value: { type: String },
          date: { type: Date },
          status: { type: String },
          amount: { type: Number },
          paymentStatus: { type: String },
          paymentDate: { type: Date },
        },
      ],
    },

    notes: { type: String },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
