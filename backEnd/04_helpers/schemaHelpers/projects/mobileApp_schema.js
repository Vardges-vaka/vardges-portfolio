import mongoose from "mongoose";
import { multilingualTextSchema } from "../_schemaHelpers.index.js";

const mobileApp_schema = () => {
  return new mongoose.Schema(
    {
      name: multilingualTextSchema(),
    },
    { _id: false }
  );
};

export default mobileApp_schema;
