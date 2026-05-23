import mongoose from "mongoose";
import {
  AUDIT,
  getStorageSchema,
  AD_KINDS,
  AD_BASES,
  AD_SOURCES,
} from "../modelHelpers/.temp.index.js";

const adSpendSchema = new mongoose.Schema(
  {
    // ── Identity / scope ─────────────────────────────────────
    salesChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesChannel",
      required: true,
    },
    kind: { type: String, enum: AD_KINDS, required: true },
    period: {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
    },

    // ── Money ────────────────────────────────────────────────
    amount: { type: Number, required: true },
    basis: { type: String, enum: AD_BASES },

    // ── Billing & contract ───────────────────────────────────
    isContractual: { type: Boolean, default: false },
    contract: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },

    // ── Kind-specific metrics (flexible — each kind fills what applies) ──
    // CPC:               clicks, avgCpc, attributedOrders, attributedRevenue
    // CPM / banner:      impressions, avgCpm, placement
    // featured-listing:  placement, impressions
    // sponsored-search:  keywords, clicks, impressions
    // commission-uplift: commissionUpliftPct, attributedOrders
    metrics: {
      impressions: { type: Number },
      clicks: { type: Number },
      avgCpc: { type: Number },
      avgCpm: { type: Number },
      keywords: [{ type: String }],
      attributedOrders: { type: Number },
      attributedRevenue: { type: Number },
      commissionUpliftPct: { type: Number },
    },

    // ── Attribution context ──────────────────────────────────
    netSalesForPeriod: { type: Number }, // for percent-of-net-sales calculations
    source: { type: String, enum: AD_SOURCES, default: "manual" },

    files: getStorageSchema(),
    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

// "Spend on this channel over time"
adSpendSchema.index({ salesChannel: 1, "period.from": -1 });
// "All CPC ads this month across channels"
adSpendSchema.index({ kind: 1, "period.from": -1 });

const AdSpend = mongoose.model("AdSpend", adSpendSchema);

export default AdSpend;
