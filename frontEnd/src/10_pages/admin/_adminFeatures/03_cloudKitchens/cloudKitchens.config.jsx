import {
  BrandDevelopment_icon,
  Branches_Icon,
  DeliveryCoverage_Icon,
  OurSupport_Icon,
  ManagerSupport_Icon,
  Hours24_Icon,
  Equipments_Icon,
  Employees_Icon,
  Brands_Icon,
  Images_Icon,
  Files_Icon,
  FoodMenu_Icon,
  MapView_Icon,
  ListView_Icon,
  Competitors_Icon,

  // New Ones
  Category_Icon,
  Area_Icon,
  City_Icon,
  Country_Icon,
  DineIn_Icon,
  Dish_Icon,
  Budget_Icon,
  Medium_Icon,
  Premium_Icon,
  PriceRange_Icon,
  Modifiers_Icon,
  IsDelivery_Icon,
  Tags_Icon,
  Update_Icon,
  Polygon,
  Radius_Icon,

  // Emirate_Icon,
  // Ingredients_Icon,

  // Operations_Icon,
  // Packaging_1_Icon,

  // Recipe_Icon,
  // Street_Icon,
  // Sup_Recipe_Icon,
  // Supplier_Icon,

  // Text_Icon,
} from "../../../../01_components/components.index.js";

const cloudKitchens_SideBar = (t) => [
  // {
  //   label: t("branches") || "Branches",
  //   path: "cloudKitchens_branches",
  //   icon: Branches_Icon(),
  //   access: ["admin", "superAdmin"],
  //   isDefault: true,
  // },
  // {
  //   label: t("brands", { defaultValue: "Brands" }),
  //   path: "cloudKitchens_brands",
  //   icon: Brands_Icon(),
  //   access: ["admin", "superAdmin"],
  // },
  // {
  //   label: t("employees", { defaultValue: "Employees" }),
  //   path: "cloudKitchens_employees",
  //   icon: Employees_Icon(),
  //   access: ["admin", "superAdmin"],
  // },
  // {
  //   label: t("menus", { defaultValue: "Menus" }),
  //   path: "cloudKitchens_menus",
  //   icon: FoodMenu_Icon(),
  //   access: ["admin", "superAdmin"],
  // },
  // {
  //   label: t("menuCategories", { defaultValue: "Menu Categories" }),
  //   path: "cloudKitchens_menuCategories",
  //   icon: Category_Icon(),
  //   access: ["admin", "superAdmin"],
  // },
  // {
  //   label: t("modifiers", { defaultValue: "Modifiers" }),
  //   path: "cloudKitchens_modifiers",
  //   icon: Modifiers_Icon(),
  //   access: ["admin", "superAdmin"],
  // },
  {
    label: t("menuItems", { defaultValue: "Menu Items" }),
    path: "cloudKitchens_menuItems",
    icon: Dish_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "Competitors",
    path: "cloudKitchens_competitors",
    icon: Competitors_Icon(),
    access: ["admin", "superAdmin"],
  },

  //

  {
    label: "Area",
    path: "cloudKitchens_competitors",
    icon: Area_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "City",
    path: "cloudKitchens_competitors",
    icon: City_Icon(),
    access: ["admin", "superAdmin"],
  },

  {
    label: "Competitors",
    path: "cloudKitchens_competitors",
    icon: Competitors_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "Update Icon",
    path: "cloudKitchens_competitors",
    icon: Update_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "IsDelivery Icon",
    path: "cloudKitchens_competitors",
    icon: IsDelivery_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "Tags",
    path: "cloudKitchens_competitors",
    icon: Tags_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "Polygon",
    path: "cloudKitchens_competitors",
    icon: Polygon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: "Radius",
    path: "cloudKitchens_competitors",
    icon: Radius_Icon(),
    access: ["admin", "superAdmin"],
  },
];

export default cloudKitchens_SideBar;
