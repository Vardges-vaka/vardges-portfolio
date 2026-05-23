import mongoose from "mongoose";
import {
  AUDIT,
  getCloudStorageSchema,
  RATING_SOURCES,
  REPLY_VISIBILITY,
  ITEM_FEEDBACK_SENTIMENTS,
} from "../modelHelpers/.temp.index.js";

const ratingSchema = new mongoose.Schema(
  {
    // ── Linkage ──────────────────────────────────────────────
    salesChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesChannel",
      required: true,
    },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    platformOrderId: { type: String }, // snapshot — bridge to Order even if not yet linked
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },

    // ── The rating itself ────────────────────────────────────
    stars: { type: Number, min: 1, max: 5, required: true },
    comment: { original: { type: String }, translated: { type: String } }, // optional — Careem can have rating without text
    receivedAt: { type: Date },

    // ── Snapshots from platform (fallback when customer ref not resolvable) ──
    customerNameSnapshot: { type: String }, // Keeta always; Talabat customer-app sometimes
    customerLoyaltyTier: { type: String }, // raw string — "Frequent customer", "2-4 Orders", "New customer"
    sentimentTag: { type: String }, // Keeta "Poor service" etc.

    // ── Item-level feedback ──────────────────────────────────
    // Keeta = dislikes; Noon = likes/mentions; future platforms welcome
    itemFeedback: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        nameSnapshot: { type: String },
        sentiment: { type: String, enum: ITEM_FEEDBACK_SENTIMENTS },
      },
    ],

    attachments: {
      images: [{ type: String }],
      cloudStorage: getCloudStorageSchema(),
    },

    // ── Reply workflow ───────────────────────────────────────
    reply: {
      text: { type: String },
      sentAt: { type: Date },
      sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      visibility: { type: String, enum: REPLY_VISIBILITY }, // Talabat public, Deliveroo private email
      editCount: { type: Number, default: 0 }, // Keeta caps at 6
      creditGranted: { type: Number }, // Deliveroo only
    },

    // ── Source + raw payload ─────────────────────────────────
    source: { type: String, enum: RATING_SOURCES, default: "manual" },

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

// Common query: "ratings for this channel, sorted by most recent"
ratingSchema.index({ salesChannel: 1, receivedAt: -1 });
// Bridge to Order when matching by aggregator order ID
ratingSchema.index({ platformOrderId: 1 });

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
