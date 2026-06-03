import {
  // BrandDevelopment_icon,
  // DeliveryCoverage_Icon,
  // OurSupport_Icon,
  // ManagerSupport_Icon,
  // Hours24_Icon,
  // Equipments_Icon,
  // Images_Icon,
  // Files_Icon,
  // MapView_Icon,
  // ListView_Icon,
  // Category_Icon,
  // Area_Icon,
  // City_Icon,
  // Country_Icon,
  // DineIn_Icon,
  // Dish_Icon,
  // Budget_Icon,
  // Medium_Icon,
  // Premium_Icon,
  // PriceRange_Icon,
  // Modifiers_Icon,
  // IsDelivery_Icon,
  Tags_Icon,
  // Update_Icon,
  // Polygon_Icon,
  // Radius_Icon,
  // Emirate_Icon,
  // Ingredients_Icon,
  // Operations_Icon,
  // Packaging_Icon,
  // Street_Icon,
  // Sup_Recipe_Icon,
  Recipe_Icon,
  Supplier_Icon,
  SalesChannel_Icon,
  Earth_Icon,
  Dashboard_Icon,
  Branches_Icon,
  Competitors_Icon,
  Employees_Icon,
  Brands_Icon,
  FoodMenu_Icon,
} from "../../../../../../01_components/_components.index.js";

const VALID_SESSIONS = () => {
  return [
    { value: "brands", label: "Brands", icon: () => Brands_Icon() },

    { value: "cuisineTags", label: "Cuisine Tags", icon: () => Tags_Icon() },

    {
      value: "salesPlatforms",
      label: "Sales Platforms",
      icon: () => SalesChannel_Icon(),
    },

    { value: "channels", label: "Channels", icon: () => Dashboard_Icon() },
  ];
};
const VALID_SESSION_OPERATIONS = ["viewing", "adding", "updating", "deleting"];
const VALID_SESSION_OPERATIONS_TYPES = ["all", "one"];

export {
  VALID_SESSIONS,
  VALID_SESSION_OPERATIONS,
  VALID_SESSION_OPERATIONS_TYPES,
};
