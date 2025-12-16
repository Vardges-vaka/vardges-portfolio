import mongoose from "mongoose";
import { multilingualTextSchema } from "../_schemaHelpers.index.js";

const branding_schema = () => {
  return new mongoose.Schema(
    {
      name: multilingualTextSchema(),
    },
    { _id: false }
  );
};

export default branding_schema;
