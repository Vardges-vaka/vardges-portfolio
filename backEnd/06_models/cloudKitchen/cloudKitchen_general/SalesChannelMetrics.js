import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";

// Platform-provided periodic aggregates. NOT per-order — these are summaries
// the platform itself computes (e.g. Careem's daily C+ user breakdown, Noon's
// monthly customer-segment report).
//
// Used for costing + customer-segment analytics. Coexists with Order: Talabat
// per-order pro flag goes on Order.isProOrder; Careem/Noon aggregates land here.

const GRANULARITIES = ["daily", "weekly", "monthly", "quarterly", "yearly"];

const SOURCES = [
  "careem-business-report",
  "talabat-business-report",
  "noon-customer-report",
  "deliveroo-report",
  "keeta-report",
  "manual",
  "other",
];

const SEGMENT_NAMES = [
  // Careem segments
  "overall",
  "cplus",
  "non-cplus",
  "new",
  "reactivated",
  "retained",
  // Noon / generic
  "pro",
  "non-pro",
  // catch-all
  "other",
];

const salesChannelMetricsSchema = new mongoose.Schema(
  {
    // ── Linkage ──────────────────────────────────────────────
    salesChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesChannel",
      required: true,
    },

    // ── Period ───────────────────────────────────────────────
    granularity: { type: String, enum: GRANULARITIES, required: true },
    period: {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
    },

    // ── Source ───────────────────────────────────────────────
    source: { type: String, enum: SOURCES, default: "manual" },
    fileRef: { type: String }, // path/name of the source report

    // ── Customer-segment breakdown ───────────────────────────
    // Each segment carries the standard three metrics + optional extras
    segments: [
      {
        name: { type: String, enum: SEGMENT_NAMES, required: true },
        avgBasket: { type: Number },
        deliveredOrders: { type: Number },
        sales: { type: Number },
        // Platform-specific extras (e.g. retention rate, repeat rate, etc.)
        extra: { type: mongoose.Schema.Types.Mixed },
      },
    ],

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

// "Channel metrics over time, ordered by period"
salesChannelMetricsSchema.index({ salesChannel: 1, "period.from": -1 });
// "All daily reports from Careem in this window"
salesChannelMetricsSchema.index({ source: 1, granularity: 1, "period.from": -1 });

const SalesChannelMetrics = mongoose.model(
  "SalesChannelMetrics",
  salesChannelMetricsSchema,
);

export default SalesChannelMetrics;
