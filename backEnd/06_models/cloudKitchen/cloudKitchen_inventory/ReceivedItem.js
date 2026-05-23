import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";

const receivedItemSchema = new mongoose.Schema(
  {
    // the fields
  },
  { timestamps: true },
);

const ReceivedItem = mongoose.model("ReceivedItem", receivedItemSchema);

export default ReceivedItem;
