import mongoose from "mongoose";
import {
  AUDIT,
  getStorageSchema,
  getLifecycleSchema,
  CAMPAIGN_KINDS,
  CAMPAIGN_STATUSES,
  CAMPAIGN_SOURCES,
  VALUE_TYPES,
} from "../modelHelpers/.temp.index.js";

const campaignSchema = new mongoose.Schema(
  {
    // ── Identity ─────────────────────────────────────────────
    name: { type: String, required: true }, // "Talabat 50% up to 30 AED"
    description: { type: String },
    kind: { type: String, enum: CAMPAIGN_KINDS, required: true },
    source: {
      type: String,
      enum: CAMPAIGN_SOURCES,
      default: "platform-defined",
    },
    platformPromoId: { type: String }, // platform-side ID if exposed

    // ── Lifecycle ────────────────────────────────────────────
    status: { type: String, enum: CAMPAIGN_STATUSES, default: "draft" },
    lifecycle: getLifecycleSchema(),

    // ── Validity window (open-ended if `to` is null) ─────────
    validity: {
      from: { type: Date },
      to: { type: Date },
      daysOfWeek: [{ type: String }], // ["fri", "sat"] — optional restriction
      hoursOfDay: {
        from: { type: String }, // "11:00"
        to: { type: String }, // "14:00"
      },
    },

    // ── Value ────────────────────────────────────────────────
    valueType: { type: String, enum: VALUE_TYPES },
    value: { type: Number }, // 50 (means 50% or 50 AED depending on valueType)
    cap: { type: Number }, // max discount in currency (e.g. 30 AED for "50% up to 30")
    currency: { type: String, default: "AED" },

    // ── Funding economics ────────────────────────────────────
    // Two cost dimensions: who funds the discount, and any per-order participation fee
    funding: {
      brandPct: { type: Number, default: 100 }, // % of the discount the brand absorbs
      platformPct: { type: Number, default: 0 }, // % of the discount the platform absorbs
      perOrderBrandFee: { type: Number, default: 0 }, // flat fee brand pays per participating order (Talabat: 2 AED)
      perOrderPlatformFee: { type: Number, default: 0 },
      notes: { type: String },
    },

    // ── Conditions ───────────────────────────────────────────
    conditions: {
      minOrderAmount: { type: Number }, // e.g. Careem: 50 AED
      maxUsesPerCustomer: { type: Number },
      maxRedemptions: { type: Number }, // total cap across all customers
      eligibleMenuItems: [
        { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      ],
      voucherCode: { type: String }, // for code-based promos
      newCustomersOnly: { type: Boolean, default: false },
      notes: { type: String },
    },

    // ── Attached sales channels ──────────────────────────────
    salesChannels: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SalesChannel" },
    ],

    // ── Files (promo materials, screenshots) ─────────────────
    files: getStorageSchema(),

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

// "Active campaigns on this channel" — most common query
campaignSchema.index({ salesChannels: 1, status: 1 });
// "All campaigns of a kind currently active"
campaignSchema.index({ kind: 1, status: 1 });

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
