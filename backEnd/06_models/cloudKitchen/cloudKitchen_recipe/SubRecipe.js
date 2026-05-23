import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";

const subRecipeSchema = new mongoose.Schema(
  {
    // the fields
  },
  { timestamps: true },
);

const SubRecipe = mongoose.model("SubRecipe", subRecipeSchema);

export default SubRecipe;
