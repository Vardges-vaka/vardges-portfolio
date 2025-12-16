import mongoose from "mongoose";
import { multilingualTextSchema } from "../_schemaHelpers.index.js";

const advertizing_schema = () => {
  return new mongoose.Schema(
    {
      name: multilingualTextSchema(),
    },
    { _id: false }
  );
};

export default advertizing_schema;
