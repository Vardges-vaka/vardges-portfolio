import mongoose from "mongoose";

import { coordinateSchema } from "../../../04_helpers/helpers.index.js";

// ─── Main schema ──────────────────────────────────────────────────────────────



const competitorSchema = new mongoose.Schema(
  {
    name: { type: String },
    logo: { storage: { type: String }, path: { type: String } },
    description: { type: String },

    // ── Market positioning ────────────────────────────────────────────────────
    cuisineTypes: [{ tag: { type: String }, description: { type: String } }], // ["burgers", "shawarma", "pizza"]
    priceRange: {
      type: String,
      enum: ["budget", "mid", "premium"],
    },

    // ── Socials & contact ─────────────────────────────────────────────────────
    socials: {
      instagram: { type: String },
      facebook: { type: String },
      tikTok: { type: String },
      linkedIn: { type: String },
      youtube: { type: String },
      twitter: { type: String },
      website: { type: String },
      others: [{ link: { type: String }, label: { type: String } }],
    },
    contact: {
      email: { type: String },
      whatsApp: { type: String },
      telegram: { type: String },
      phone: { type: String },
    },

    /** First-party delivery in Dubai (vs aggregator-only). */
    hasOwnDeliveryDubai: { type: Boolean, default: false },
    // new fields
    avgRatingPerPlatform: {
      talabat: { type: Number },
      careem: { type: Number },
      noon: { type: Number },
      deliveroo: { type: Number },
      keeta: { type: Number },
      google: { type: Number },
    },
    avgReviewCountPerPlatform: {
      talabat: { type: Number },
      careem: { type: Number },
      noon: { type: Number },
      deliveroo: { type: Number },
      keeta: { type: Number },
      google: { type: Number },
    },
    // ── Branch footprint ──────────────────────────────────────────────────────
    branches: {
      totalQnt: { type: Number },
      multiBranch: { type: Boolean },
      multiEmirates: { type: Boolean },
      multiCountry: { type: Boolean },
      label: { type: String },

      // ---------------------------------------

      locations: [
        {
          country: { type: String },
          hasDineIn: { type: Boolean },
          hasOwnDelivery: { type: Boolean },
          emirate: { type: String },
          state: { type: String },
          city: { type: String },
          address: { type: String },
          coordinates: coordinateSchema(),
          coverageAreas: {
            byDistance: {
              polygon: [coordinateSchema()],
              radius: {
                km: { type: Number },
                center: coordinateSchema(),
              },
            },
            byDriveTime: {
              polygon: [coordinateSchema()],
              radius: {
                minutes: { type: Number },
                center: coordinateSchema(),
              },
            },
          },
          links: [{ label: { type: String }, link: { type: String } }],
          // ── Delivery platform presence ─────────────────────────────────────────────
          // Ratings, fees, and menu can differ per platform — tracked independently.
          platforms: [
            {
              name: { type: String }, // "Talabat" | "Careem Now" | "Noon Food" | "Deliveroo" | "InstaShop"
              storeUrl: { type: String },
              isActive: { type: Boolean, default: true },
              rating: { type: Number },
              reviewCount: { type: Number },
              deliveryFee: { type: Number }, // AED
              minOrder: { type: Number }, // AED
              deliveryTimeMin: { type: Number }, // estimated minutes
              lastChecked: { type: Date },
              notes: { type: String },
            },
          ],
          // ── Active promotions / deals ─────────────────────────────────────────────
          promos: [
            {
              name: { type: String },
              platform: { type: String },
              discountType: {
                type: String,
                enum: ["fixed", "percentage", "freeDelivery", "bogo", "other"],
              },
              discountValue: { type: Number },
              discountCap: { type: Number },
              minOrder: { type: Number },
              startDate: { type: Date },
              endDate: { type: Date },
              isActive: { type: Boolean, default: true },
              description: { type: String },
              capturedAt: { type: Date }, // when this promo was first spotted
            },
          ],
        },
      ],
    },

    // ── Menu ──────────────────────────────────────────────────────────────────
    // Unified model — competitor menus live in the same `Menu` collection
    // as our own brands, distinguished by ownerType: "Competitor".
    // Multiple menus are supported in anticipation of the future
    // (Branch x Brand x Aggregator) SalesChannel layer.
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],

    // ── Intelligence log ──────────────────────────────────────────────────────
    // Observation diary — tracks what changed, when, and what it means over time.
    observations: [
      {
        date: { type: Date },
        note: { type: String },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        tags: [{ type: String }], // "pricing" | "menu-change" | "expansion" | "marketing"
      },
    ],

    // ── Files ─────────────────────────────────────────────────────────────────
    files: [
      {
        ref: { type: String },
        value: { type: String },
        fileType: { type: String },
        sizeInKb: { type: Number },
        uploadedAt: { type: Date },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

    // ── Org links ─────────────────────────────────────────────────────────────
    // Brands this competitor is tracked against.
    // Brand.competitors[] also holds this ref — keep both in sync.
    competesWithBrands: [
      {
        brand: { type: mongoose.Schema.Types.ObjectId, ref: "Competitor" },
        cuisineTags: [{ type: String }],
        platform: { type: String },
        branchLabel: { type: String },
        observations: [
          {
            date: { type: Date },
            note: { type: String },
            addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            tags: [{ type: String }], // "pricing" | "menu-change" | "expansion" | "marketing"
          },
        ],
      },
    ],
    competesWithOurBrands: [
      {
        brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
        cuisineTags: [{ type: String }],
        platform: { type: String },
        branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
        observations: [
          {
            date: { type: Date },
            note: { type: String },
            addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            tags: [{ type: String }], // "pricing" | "menu-change" | "expansion" | "marketing"
          },
        ],
      },
    ],

    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

const Competitor = mongoose.model("Competitor", competitorSchema);
export default Competitor;
