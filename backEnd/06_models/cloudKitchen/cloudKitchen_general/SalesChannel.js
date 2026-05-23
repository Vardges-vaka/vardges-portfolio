import mongoose from "mongoose";
import {
  STORE_ID_SOURCES,
  STORE_STATUSES,
  EXCLUDED_MENU_ITEM_REASONS,
  AUDIT,
} from "../modelHelpers/.temp.index.js";

const salesChannelSchema = new mongoose.Schema(
  {
    // ── Identity (the triple) ──────────────────────────────
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    platform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesPlatform",
      required: true,
    },
    storeUrl: { type: String }, // public-facing menu URL on the platform
    storeIds: [
      {
        source: { type: String, enum: STORE_ID_SOURCES },
        value: { type: String },
        notes: { type: String },
      },
    ],
    status: {
      value: {
        type: String,
        enum: STORE_STATUSES,
        default: "queued",
      },
      onboardingStartedAt: Date,
      livedAt: Date,
      pausedAt: Date,
      terminatedAt: Date,
      expectedResumeAt: Date, // for terminated-temporary
    },

    commissionPct: { type: Number },
    ratings: {
      average: { type: Number },
      count: { type: Number, default: 0 },
      lastReceivedAt: { type: Date },
    },
    excludedMenuItems: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        reason: {
          type: String,
          enum: EXCLUDED_MENU_ITEM_REASONS,
        },
        since: { type: Date },
        until: { type: Date }, // null = permanent
        notes: { type: String },
      },
    ],

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

// One channel per branch+brand+platform combo
salesChannelSchema.index(
  { branch: 1, brand: 1, platform: 1 },
  { unique: true },
);
const SalesChannel = mongoose.model("SalesChannel", salesChannelSchema);

export default SalesChannel;
