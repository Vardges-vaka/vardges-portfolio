import mongoose from "mongoose";
import { AUDIT } from "./modelHelpers/.temp.index.js";

const ORDER_STATUSES = ["completed", "cancelled", "other"];

const PAYMENT_METHODS = [
  "prepaid",
  "cash",
  "card",
  "aggregator-wallet",
  "unknown",
  "other",
];

const EXTERNAL_ID_SOURCES = [
  "aggregator", // Talabat / Careem / Noon / Deliveroo / Keeta order ID
  "GrabTech",
  "UrbanPiper",
  "Sapaad",
  "manual",
];

const EXTERNAL_ID_KINDS = ["primary", "ref", "sequence", "external", "fort"];

const orderSchema = new mongoose.Schema(
  {
    // ── Identity / linkage ───────────────────────────────────
    salesChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesChannel",
      required: true,
    },
    status: { type: String, enum: ORDER_STATUSES, default: "completed" },

    // Per-order pro/subscription flag — only fillable when source exposes it
    // (Talabat direct report column "Is Pro Order"). Stays null for Careem/Noon
    // since those platforms only report pro data as daily/monthly aggregates
    // (see SalesChannelMetrics).
    isProOrder: { type: Boolean },

    // Multiple identifiers per real-world order (aggregator + channel-manager + sequences)
    // Used as the dedup key during merge ingestion (see Q1 decision).
    externalIds: [
      {
        source: { type: String, enum: EXTERNAL_ID_SOURCES, required: true },
        kind: { type: String, enum: EXTERNAL_ID_KINDS },
        value: { type: String, required: true },
      },
    ],

    // ── Timing ───────────────────────────────────────────────
    placedAt: { type: Date }, // GrabTech "Received At" / UrbanPiper "Created At"
    requestedDeliveryAt: { type: Date }, // UrbanPiper "Request Delivery Time"
    deliveredAt: { type: Date }, // when available
    cancelledAt: { type: Date },

    // ── Customer (often null — most platforms mask) ──────────
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    customerSnapshot: {
      name: { type: String },
      phone: { type: String },
      address: { type: String },
      note: { type: String }, // "Customer Note" column
    },

    // ── Items (subdoc — Q2 decision) ─────────────────────────
    items: [
      {
        // refs (source of truth)
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
        },

        // snapshots (immutable historical truth)
        nameSnapshot: { type: String },
        categorySnapshot: { type: String }, // GrabTech "Tags" column

        // line economics
        qty: { type: Number },
        unitPrice: { type: Number }, // snapshot of MenuItem.sellingPrice.gross at order time
        lineTotal: { type: Number }, // qty × unitPrice
        discount: { type: Number },
        tax: { type: Number },

        // modifiers
        modifiers: [
          {
            option: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "MenuItemModifierOption",
            },
            nameSnapshot: { type: String },
            price: { type: Number },
          },
        ],

        // reconciliation
        sourceLineId: { type: String }, // e.g. UP's `unique id` ("C-1116567942-1")
      },
    ],

    // ── Money ────────────────────────────────────────────────
    // VAT confirmed: 5% on the post-discount total. Total = Net × 1.05.
    totals: {
      itemsSubtotal: { type: Number }, // sum of line items before discount
      grossPrice: { type: Number }, // GrabTech "Gross Price"
      discount: {
        total: { type: Number },
        aggregatorFunded: { type: Number, default: 0 }, // UrbanPiper "Aggregator Discount"
        merchantFunded: { type: Number }, // UrbanPiper "Merchant Discount", GrabTech default
      },
      tax: {
        total: { type: Number }, // 5% VAT
        aggregatorTax: { type: Number, default: 0 },
        merchantTax: { type: Number, default: 0 },
      },
      proCharge: { type: Number }, // Talabat's +4 AED if applicable
      netSales: { type: Number }, // post-discount, pre-VAT
      customerPaid: { type: Number }, // GrabTech "Total(Receipt Total)" / UP "Total Amount"
      merchantNet: { type: Number }, // UrbanPiper "Merchant Total" — what you actually receive
    },

    // ── Applied campaigns (snapshot at order time) ───────────
    appliedCampaigns: [
      {
        campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
        discountAmount: { type: Number },
        brandFunded: { type: Number },
        platformFunded: { type: Number },
        perOrderFee: { type: Number }, // Talabat's 2 AED if applicable
      },
    ],

    // ── Payment ──────────────────────────────────────────────
    paymentMethod: { type: String, enum: PAYMENT_METHODS, default: "unknown" },

    // ── Cancellation ─────────────────────────────────────────
    cancellation: {
      reason: { type: String }, // UrbanPiper "Order Cancel Reason"
      message: { type: String }, // UrbanPiper "Order Cancellation Message"
    },

    // ── Ingestion metadata ───────────────────────────────────
    ingestion: {
      primarySource: { type: String }, // first source that created this Order
      sources: [{ type: String }], // all sources that have contributed
      lastImportedAt: { type: Date },
      fileRef: { type: String }, // path/name of the originating export
    },

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

// Most common query: "this channel's orders by date"
orderSchema.index({ salesChannel: 1, placedAt: -1 });
// Dedup during ingestion: "do I already have this externalId from this source?"
orderSchema.index({ "externalIds.source": 1, "externalIds.value": 1 });
// Customer order history
orderSchema.index({ customer: 1, placedAt: -1 });
// Status filtering
orderSchema.index({ status: 1, placedAt: -1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;
