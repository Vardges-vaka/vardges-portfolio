import mongoose from "mongoose";
import {
  CUISINE_TYPES,
  PLATFORMS,
  CUISINE_TAG_SOURCES,
  AUDIT,
} from "../modelHelpers/.temp.index.js";

const cuisineTagSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    platforms: [
      {
        type: String,
        enum: PLATFORMS,
      },
    ],
    kind: {
      type: String,
      enum: CUISINE_TYPES,
    },
    source: {
      type: String,
      enum: CUISINE_TAG_SOURCES,
    },
    ...AUDIT,
  },
  { timestamps: true },
);

const CuisineTag = mongoose.model("CuisineTag", cuisineTagSchema);

export default CuisineTag;
