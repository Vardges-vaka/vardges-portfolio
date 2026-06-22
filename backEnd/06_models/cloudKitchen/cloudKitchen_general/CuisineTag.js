import mongoose from "mongoose";
import {
  CUISINE_TYPES,
  PLATFORMS,
  CUISINE_TAG_SOURCES,
  AUDIT,
} from "../modelHelpers/.temp.index.js";

// {
//   value: "italian",
//   label: "Italian",
//   description:
//     "Italian cuisine on UAE delivery platforms covers the full repertoire of pasta, pizza, risotto, antipasti, lasagna, tiramisu and gelato. In Dubai's cloud-kitchen context, Italian is one of the highest-volume cuisine tags — anchored by olive oil, tomato, garlic, basil, oregano and parmesan, with Neapolitan and Roman pizzas (wood-fired or pan), fresh and dried pastas (carbonara, arrabbiata, pesto, bolognese), creamy risottos, and bruschetta-style starters. UAE consumers expect halal-certified meats (chicken substitutes for pork-based salumi like prosciutto and pancetta are standard, often replaced with beef bacon or turkey ham), kid-friendly menus, and family sharing platters. Strong sub-categories include thin-crust pizza, stuffed pasta and Italian desserts  (cannoli, panna cotta, tiramisu). Brands like PizzaExpress, Eataly, 800 Pizza, Pinza and Bianco Italy define expectations.",
//   platforms: ["talabat", "deliveroo", "noon", "careem", "keeta"],
//   type: "cuisine",
// },
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
