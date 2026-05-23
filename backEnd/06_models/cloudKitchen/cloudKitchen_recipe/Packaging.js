import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";

const packagingSchema = new mongoose.Schema(
  {
    // the fields
  },
  { timestamps: true },
);

const Packaging = mongoose.model("Packaging", packagingSchema);

export default Packaging;
