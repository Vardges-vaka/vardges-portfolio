import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
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

const Project = mongoose.model("Project", projectSchema);

export default Project;
