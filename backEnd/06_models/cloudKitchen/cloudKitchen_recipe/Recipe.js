import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";

const recipeSchema = new mongoose.Schema(
  {
    // the fields
  },
  { timestamps: true },
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
