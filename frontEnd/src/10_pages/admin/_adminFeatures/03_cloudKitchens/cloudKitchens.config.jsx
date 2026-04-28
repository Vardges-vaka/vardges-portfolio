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
} from "../../../../01_components/components.index.js";

const cloudKitchens_SideBar = (t) => [
  {
    label: t("branches") || "Branches",
    path: "cloudKitchens_branches",
    icon: Branches_Icon(),
    access: ["admin", "superAdmin"],
    isDefault: true,
  },
  {
    label: t("brands", { defaultValue: "Brands" }),
    path: "cloudKitchens_brands",
    icon: Brands_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("employees", { defaultValue: "Employees" }),
    path: "cloudKitchens_employees",
    icon: Employees_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("menus", { defaultValue: "Menus" }),
    path: "cloudKitchens_menus",
    icon: FoodMenu_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("menuCategories", { defaultValue: "Menu Categories" }),
    path: "cloudKitchens_menuCategories",
    icon: Hours24_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("modifiers", { defaultValue: "Modifiers" }),
    path: "cloudKitchens_modifiers",
    icon: Files_Icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("menuItems", { defaultValue: "Menu Items" }),
    path: "cloudKitchens_menuItems",
    icon: BrandDevelopment_icon(),
    access: ["admin", "superAdmin"],
  },
];

export default cloudKitchens_SideBar;
