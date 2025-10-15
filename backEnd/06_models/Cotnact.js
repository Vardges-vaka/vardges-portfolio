import mongoose from "mongoose";

const cotnactSchema = new mongoose.Schema(
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

const Cotnact = mongoose.model("Cotnact", cotnactSchema);

export default Cotnact;
