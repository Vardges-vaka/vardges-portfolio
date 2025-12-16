import mongoose from "mongoose";
import { multilingualTextSchema } from "../_schemaHelpers.index.js";

const desktopApp_schema = () => {
  return new mongoose.Schema(
    {
      name: multilingualTextSchema(),
    },
    { _id: false }
  );
};

export default desktopApp_schema;
