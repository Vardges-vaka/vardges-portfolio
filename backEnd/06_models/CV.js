import mongoose from "mongoose";

const cVSchema = new mongoose.Schema(
  {
    name: { type: String, requred: true },
    description: { type: String, requred: true },
    timing: {
      isInfinite: { type: Boolean, default: false },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
    },
  },
  { timestamps: true }
);

const CV = mongoose.model("CV", cVSchema);

export default CV;
