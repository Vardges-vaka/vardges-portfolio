import mongoose from "mongoose";
import { multilingualTextSchema } from "../_schemaHelpers.index.js";

const personalInfoSchema = () => {
  return new mongoose.Schema(
    {
      name: multilingualTextSchema(),
      dateOfBirth: { type: Date, required: true },
      location: multilingualTextSchema(),
      languages: [
        {
          name: multilingualTextSchema(),
          level: multilingualTextSchema(),
        },
      ],
      contactInfo: [
        {
          label: multilingualTextSchema(),
          value: { type: String, required: true },
        },
      ],
    },
    { _id: false }
  );
};

export default personalInfoSchema;
