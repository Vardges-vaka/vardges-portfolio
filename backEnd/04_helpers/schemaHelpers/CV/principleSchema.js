import mongoose from "mongoose";
import { multilingualTextSchema } from "../_schemaHelpers.index.js";

const principleSchema = () => {
  return new mongoose.Schema(
    {
      id: Number,
      title: multilingualTextSchema(),
      icon: String, // System field
      description: multilingualTextSchema(),
      quote: multilingualTextSchema(false),
      practical: [multilingualTextSchema(false)],
      profiles: [
        {
          type: String,
          enum: ["dev", "hospitality", "both"],
        },
      ],
    },
    { _id: false }
  );
};

export default principleSchema;
