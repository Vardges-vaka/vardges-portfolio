// ⚠ DRAFT — PARTIAL REVIEW ONLY.
// So far validated against ~4 of ~22 contract samples (Deliveroo agreement +
// Grubtech vendor quote + partial Careem commission contract + partial Talabat
// hybrid doc). The rest are image-based PDFs or weren't extracted — including
// the main Talabat agreements, Noon commission card, DHK kitchen rentals,
// and several merchant agreements.
//
// REVISIT this schema when those remaining contracts are reviewed. The current
// shape may be missing fields specific to lease agreements, image-based
// Talabat docs, Noon's commission structure, etc.
//
// Tracks only the queryable / business-actionable fields. Read the actual PDF
// (via `file`) for full clauses, parties, T&Cs, addendums.
// See cloudKitchen_info/CONTRACT.md for sample observations.

import mongoose from "mongoose";
import { AUDIT, getStorageSchema } from "../modelHelpers/.temp.index.js";

const CONTRACT_KINDS = [
  "aggregator", // Talabat / Careem / Noon / Deliveroo / Keeta
  "integration", // Supy / Sapaad / GrabTech / UrbanPiper
  "lease", // kitchen rental
  "utility", // DEWA, internet
  "employment", // staff contracts
  "service", // cleaning, pest control
  "advertising", // monthly ad commitments
  "supplier", // ingredient / packaging vendors
  "insurance",
  "warranty",
  "nda",
  "other",
];

const CONTRACT_STATUSES = [
  "draft",
  "active",
  "amended", // commission / charges / commitments changed but contract still in force
  "expired",
  "terminated",
  "renewed",
];

const OWNER_TYPES = [
  "Brand",
  "Branch",
  "Employee",
  "Equipment",
  "Integration",
  "SalesChannel",
  "Menu",
  "Other",
];

const PAYMENT_CYCLES = [
  "one-time",
  "monthly",
  "quarterly",
  "yearly",
  "per-order",
  "other",
];

const CHARGE_BASES = [
  "fixed",
  "per-order",
  "percent-of-net-sales",
  "percent-of-order",
  "other",
];

const HISTORY_KINDS = [
  "commission-change",
  "charges-change",
  "commitments-change",
  "payment-change",
  "renewal",
  "termination",
  "amendment",
  "other",
];

const contractSchema = new mongoose.Schema(
  {
    // ── Identity ─────────────────────────────────────────────
    title: { type: String, required: true },
    description: { type: String },
    kind: { type: String, enum: CONTRACT_KINDS, required: true },

    // ── Polymorphic owner (which entity on OUR side) ─────────
    ownerType: { type: String, enum: OWNER_TYPES, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "ownerType",
      required: true,
    },

    // ── Counterparty (who you signed with) ───────────────────
    counterparty: {
      name: { type: String, required: true }, // "Deliveroo DMCC", "Grubtech LLC", landlord name
    },

    // ── File (the actual PDF) ────────────────────────────────
    file: getStorageSchema(),

    // ── Dates ────────────────────────────────────────────────
    effectiveFrom: { type: Date },
    effectiveTo: { type: Date }, // null when open-ended
    autoRenew: { type: Boolean, default: false },
    terminationNoticeDays: {
      byUs: { type: Number },
      byThem: { type: Number },
    },

    // ── Status ───────────────────────────────────────────────
    status: { type: String, enum: CONTRACT_STATUSES, default: "draft" },

    // ── Aggregator-specific (when kind === "aggregator") ─────
    commissionPct: { type: Number },
    additionalCharges: [
      {
        name: { type: String }, // "Pro Delivery Fee", "Super Saver Fee", etc.
        amount: { type: Number },
        basis: { type: String, enum: CHARGE_BASES },
      },
    ],
    commitments: [
      {
        name: { type: String }, // "Monthly ad commitment", etc.
        basis: { type: String, enum: CHARGE_BASES },
        amount: { type: Number }, // fixed amount, if applicable
        percent: { type: Number }, // % of net sales, if applicable
      },
    ],

    // ── Non-aggregator (when kind !== "aggregator") ──────────
    payment: {
      amount: { type: Number },
      cycle: { type: String, enum: PAYMENT_CYCLES },
    },

    // ── Change history — record meaningful changes over time ─
    // When commission goes from 25% → 28%, append a history entry rather
    // than just overwriting the field. Schema stays current; history stays full.
    history: [
      {
        date: { type: Date },
        kind: { type: String, enum: HISTORY_KINDS },
        summary: { type: String }, // "Commission raised from 25% to 28%"
        previousValue: { type: mongoose.Schema.Types.Mixed },
        newValue: { type: mongoose.Schema.Types.Mixed },
        notes: { type: String },
      },
    ],

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

// "All contracts for this Brand/Branch/Employee/etc."
contractSchema.index({ ownerType: 1, ownerId: 1 });
// "All active aggregator contracts" / "all expiring leases"
contractSchema.index({ kind: 1, status: 1 });
// "What expires in the next 30 days"
contractSchema.index({ effectiveTo: 1 });

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
