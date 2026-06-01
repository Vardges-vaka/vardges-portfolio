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
  // Tags_Icon,
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
} from "../../../../01_components/components.index.js";

const cloudKitchens_SideBar = (t) => [
  {
    label: "Dashboard",
    path: "cK_dashboard",
    icon: Branches_Icon(),
    access: ["admin", "superAdmin"],
    isDefault: true,
  },
  {
    label: "Map Studio",
    path: "cK_mapStudio",
    icon: Brands_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "Simulation",
    path: "cK_simulation",
    icon: Competitors_Icon(),
    access: ["admin", "superAdmin"],
  },

  {
    label: "Sales & Orders",
    path: "cK_salesAndOrders",
    icon: Employees_Icon(),
    access: ["admin", "superAdmin"],
  },

  {
    label: "Menus",
    path: "cK_menus",
    icon: FoodMenu_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "Recipes & Stock",
    path: "cK_recipesAndStock",
    icon: FoodMenu_Icon(),
    access: ["admin", "superAdmin"],
  },

  // ---------------------------------------------
  {
    label: "Marketing",
    path: "cK_marketing",
    icon: Recipe_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "Competitors",
    path: "cK_competitors",
    icon: Earth_Icon(),
    access: ["admin", "superAdmin"],
  },

  {
    label: "Kitchens",
    path: "cK_kitchens",
    icon: Dashboard_Icon(),
    access: ["admin", "superAdmin"],
  },

  {
    label: "Setup",
    path: "cK_setup",
    icon: SalesChannel_Icon(),
    access: ["admin", "superAdmin"],
  },

  // {
  //   label: "Earth_Icon3",
  //   path: "cloudKitchens_XXX",
  //   icon: Earth_Icon3(),
  //   access: ["admin", "superAdmin"],
  // },
];

export default cloudKitchens_SideBar;
