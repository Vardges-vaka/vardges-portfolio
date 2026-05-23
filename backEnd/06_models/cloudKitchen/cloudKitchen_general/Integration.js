import mongoose from "mongoose";
import {
  AUDIT,
  getStorageSchema,
  getLoginCredentialSchema,
  getKAMSchema,
  getPlatformSupportSchema,
  getLifecycleSchema,
  INTEGRATION_KINDS,
  INTEGRATION_STATUSES,
  PAYMENT_CYCLES,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  MAINTENANCE_STATUSES,
} from "../modelHelpers/.temp.index.js";

const integrationSchema = new mongoose.Schema(
  {
    // ── Identity ─────────────────────────────────────────────
    provider: { type: String, required: true }, // "Supy", "Sapaad", "GrabTech"
    kind: { type: String, enum: INTEGRATION_KINDS, required: true },
    accountLabel: { type: String }, // "Supy — Vkusno entity"
    description: { type: String },

    // ── Lifecycle ────────────────────────────────────────────
    status: {
      type: String,
      enum: INTEGRATION_STATUSES,
      default: "onboarding",
    },
    lifecycle: getLifecycleSchema(),

    // ── Links ────────────────────────────────────────────────
    links: {
      websiteUrl: { type: String },
      portalUrl: { type: String },
      other: [{ label: { type: String }, url: { type: String } }],
    },

    // ── Payment (what YOU pay the vendor) ────────────────────
    payment: {
      cycle: { type: String, enum: PAYMENT_CYCLES },
      amount: { type: Number },
      currency: { type: String, default: "AED" },
      method: { type: String, enum: PAYMENT_METHODS },
      status: { type: String, enum: PAYMENT_STATUSES },
      lastPaidOn: { type: Date },
      nextDueOn: { type: Date },
      notes: { type: String },
    },

    // ── Credentials (Tier 3 — select: false inside helper) ───
    loginCredentials: [getLoginCredentialSchema()],

    // ── Contacts ─────────────────────────────────────────────
    kam: getKAMSchema(),
    support: [getPlatformSupportSchema()],

    // ── Maintenance windows ──────────────────────────────────
    scheduledMaintenances: [
      {
        status: { type: String, enum: MAINTENANCE_STATUSES },
        startsAt: { type: Date },
        endsAt: { type: Date },
        notes: { type: String },
      },
    ],

    // ── Relationships ────────────────────────────────────────
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
    contract: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },

    // ── Files + notes ────────────────────────────────────────
    files: getStorageSchema(),
    notes: { type: String },

    ...AUDIT,
  },
  { timestamps: true },
);

// "All active inventory integrations" / "all paused sales-managers"
integrationSchema.index({ kind: 1, status: 1 });
// "Which integrations does Vkusno use?"
integrationSchema.index({ brands: 1 });
// "Which integrations does Arjan use?"
integrationSchema.index({ branches: 1 });

const Integration = mongoose.model("Integration", integrationSchema);

export default Integration;
