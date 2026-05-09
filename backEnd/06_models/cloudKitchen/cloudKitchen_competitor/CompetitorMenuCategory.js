import mongoose from "mongoose";

const activeTimingSchema = new mongoose.Schema(
  {
    label: { type: String },
    from: { type: String },
    to: { type: String },
  },
  { _id: false },
);

const competitorMenuCategorySchema = new mongoose.Schema(
  {
    // Parent menu reference — required to query a category's menu without scanning all menus
    competitorMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompetitorMenu",
      required: true,
    },

    name: { type: String },

    menuItems: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CompetitorMenuItem" },
    ],

    // Controls display order within the menu
    sortOrder: { type: Number, default: 0 },

    isCustomTimings: { type: Boolean, default: false },
    activeTimings: [activeTimingSchema],

    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

const CompetitorMenuCategory = mongoose.model(
  "CompetitorMenuCategory",
  competitorMenuCategorySchema,
);

export default CompetitorMenuCategory;
