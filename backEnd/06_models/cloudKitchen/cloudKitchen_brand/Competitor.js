import mongoose from "mongoose";
import {
  AUDIT,
  getStorageSchema,
  CONTACT_LABELS,
  SOCIAL_MEDIA_LABELS,
  BRAND_PRICE_RANGES,
  getBranchLocationSchema,
  getPlatformsSchema,
  getObservationsSchema,
  getLifecycleSchema,
} from "../modelHelpers/.temp.index.js";

const competitorSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    priceRange: { type: String, enum: BRAND_PRICE_RANGES },
    cuisineTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "CuisineTag" }],
    files: getStorageSchema(),
    contact: [
      {
        label: {
          type: String,
          enum: CONTACT_LABELS,
        },
        value: { type: String },
      },
    ],
    socialMedia: [
      {
        label: {
          type: String,
          enum: SOCIAL_MEDIA_LABELS,
        },
        link: { type: String },
      },
    ],
    globalObservations: [getObservationsSchema()],

    branches: [
      {
        label: { type: String },
        hasDineIn: { type: Boolean },
        hasOwnDelivery: { type: Boolean },
        hasOwnPickup: { type: Boolean },
        lifecycle: getLifecycleSchema(),

        location: getBranchLocationSchema(),
        platforms: [getPlatformsSchema()],
        competesWith: [
          {
            brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" }, // ✓ correct
            branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, // ✓ correct
            byPlatforms: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SalesPlatform",
              },
            ],
            byCoverageArea: { type: Boolean },
            byPriceRange: { type: Boolean },
            byCuisineTags: [
              { type: mongoose.Schema.Types.ObjectId, ref: "CuisineTag" },
            ],

            observations: [getObservationsSchema()],
          },
        ],
      },
    ],

    ...AUDIT,
  },
  { timestamps: true },
);

const Competitor = mongoose.model("Competitor", competitorSchema);

export default Competitor;
