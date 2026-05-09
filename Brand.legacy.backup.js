import mongoose from "mongoose";

const fileRefSchema = new mongoose.Schema(
  { ref: { type: String }, value: { type: String } },
  { _id: false },
);

const emailEntrySchema = new mongoose.Schema(
  {
    name: { type: String },
    position: { type: String },
    email: { type: String },
  },
  { _id: false },
);

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    logo: { type: String },
    isActive: { type: Boolean, default: true },
    files: [fileRefSchema],
    socials: {
      instagram: { type: String },
      facebook: { type: String },
      tikTok: { type: String },
      linkedIn: { type: String },
      domain: { type: String },
    },
    emails: [emailEntrySchema],
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
