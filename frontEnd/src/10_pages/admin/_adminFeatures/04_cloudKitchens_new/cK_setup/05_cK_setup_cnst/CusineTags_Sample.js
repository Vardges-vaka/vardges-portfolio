import {
  Careem_logo,
  Deliveroo_logo,
  Keeta_logo,
  Noon_logo,
  Talabat_logo,
  Beverage_Logo,
  Category_Logo,
  Cuisine_Logo,
  Dessert_Logo,
  Dietary_Logo,
  MealType_Logo,
  Other_Logo,
} from "../../../../../../00_assets/_assets.index.js";

const AGGREGATOR_PLATFORMS = [
  { value: "talabat", label: "Talabat", logo: Talabat_logo },
  { value: "deliveroo", label: "Deliveroo", logo: Deliveroo_logo },
  { value: "noon", label: "Noon", logo: Noon_logo },
  { value: "careem", label: "Careem", logo: Careem_logo },
  { value: "keeta", label: "Keeta", logo: Keeta_logo },
  { value: "restHero", label: "RestHero", logo: Keeta_logo },
];

const CUISINE_TYPES = [
  { value: "cuisine", label: "Cuisine", logo: Cuisine_Logo },
  { value: "category", label: "Category", logo: Category_Logo },
  { value: "dietary", label: "Dietary", logo: Dietary_Logo },
  { value: "mealType", label: "Meal Type", logo: MealType_Logo },
  { value: "dessert", label: "Dessert", logo: Dessert_Logo },
  { value: "beverage", label: "Beverage", logo: Beverage_Logo },
  { value: "other", label: "Other", logo: Other_Logo },
];

const CUISINE_TAG_SOURCE_OPTIONS = [
  { value: "scraped", label: "Scraped" },
  { value: "KAM", label: "KAM" },
  { value: "manual", label: "Manual" },
  { value: "other", label: "Other" },
];

export {
  AGGREGATOR_PLATFORMS,
  CUISINE_TYPES,
  CUISINE_TAG_SOURCE_OPTIONS,
};
