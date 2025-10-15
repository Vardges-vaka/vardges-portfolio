import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, requred: true },
    tagline: { type: String, requred: true },
    logo: { type: String, requred: true },
    menu: { type: String, requred: true },
    location: { type: String, requred: true },
    type: { type: String, requred: true },
    competitors: { type: String, requred: true },
    outlets: { type: String, requred: true },
    brandBook: { type: String, requred: true },
    brandPortfolio: { type: String, requred: true },
    brandSocials: { type: String, requred: true },
    description: { type: String, requred: true },
    timing: {
      isInfinite: { type: Boolean, default: false },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
