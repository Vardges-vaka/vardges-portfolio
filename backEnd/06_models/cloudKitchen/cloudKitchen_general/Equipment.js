import mongoose from "mongoose";
import {
  AUDIT,
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_STATUSES,
  getWarrantySchema,
  getStorageSchema,
} from "../modelHelpers/.temp.index.js";

const equipmentSchema = new mongoose.Schema(
  {
    // ── Identity ─────────────────────────────────────────
    name: { type: String, required: true }, // "Rational iCombi Pro 6-grid"
    category: { type: String, enum: EQUIPMENT_CATEGORIES },
    assetTag: { type: String }, // internal label/sticker code
    description: { type: String },
    storedIn: { type: String, enum: ["branch", "warehouse"] },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },

    // ── Lifecycle ────────────────────────────────────────
    status: { type: String, enum: EQUIPMENT_STATUSES, default: "operational" },
    purchase: {
      date: { type: Date },
      cost: { type: Number },
      vendor: { type: String },
      invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    },
    warranty: getWarrantySchema(),
    decommissionedAt: { type: Date },
    decommissionReason: { type: String },

    // ── Maintenance log ──────────────────────────────────
    maintenance: [
      {
        date: { from: { type: Date }, to: { type: Date } },
        cost: { type: Number },
        warranty: getWarrantySchema(),
        vendor: { type: String },
        invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
        notes: { type: String },
      },
    ],

    contracts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contract" }],

    files: getStorageSchema(),

    depreciation: {
      method: {
        type: String,
        enum: ["straight-line", "declining-balance", "none"],
      },
      usefulLifeYears: { type: Number }, // e.g. 5 for kitchen equipment
      salvageValue: { type: Number },
      inServiceDate: { type: Date }, // usually = purchase.date, but may differ (e.g., installed weeks later)
    },

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;
