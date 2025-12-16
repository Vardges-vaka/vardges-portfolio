import mongoose from "mongoose";
import { multilingualTextSchema } from "../_schemaHelpers.index.js";

const roleSchema = () => {
  return new mongoose.Schema(
    {
      id: Number,
      title: multilingualTextSchema(),
      company: multilingualTextSchema(),
      subCompany: multilingualTextSchema(false),
      location: multilingualTextSchema(),
      timing: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: false },
        isPresent: { type: Boolean, required: true, default: false },
      },

      category: {
        type: String,
        enum: ["tech", "hospitality", "hybrid", "consulting"],
        required: true,
      },
      type: {
        type: String,
        enum: ["full-time", "part-time", "contract", "freelance", "founder"],
        required: true,
      },
      profiles: [
        {
          type: String,
          enum: ["dev", "hospitality", "both"],
        },
      ],
      scope: multilingualTextSchema(false),
      responsibilities: [multilingualTextSchema(false)],
      achievements: [multilingualTextSchema(false)],
      tags: [multilingualTextSchema(true)],
    },
    { _id: false }
  );
};

export default roleSchema;
