import mongoose from "mongoose";
import { multilingualTextSchema } from "./_schemaHelpers.index.js";
import { CLOUD_STORAGES } from "../../00_config/_config.index.js";

const imageSchema = () => {
  return new mongoose.Schema(
    {
      url: { type: String, required: true },
      alt: { type: String, required: true },
      caption: multilingualTextSchema(false),
      title: multilingualTextSchema(false),
      format: {
        type: String,
        required: true,
        enum: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      size: { type: Number, required: true },
      cloudStorage: {
        type: String,
        required: true,
        enum: CLOUD_STORAGES.ENUM,
      },
      ref: { type: String, required: true },
    },
    { _id: false }
  );
};

export default imageSchema;
