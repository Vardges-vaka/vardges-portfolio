import { BrandDevelopment_icon } from "../../../../01_components/components.index.js";

const cloudKitchens_SideBar = (t) => [
  {
    label: t("branches") || "Branches",
    path: "cloudKitchens_branches",
    icon: BrandDevelopment_icon(),
    access: ["admin", "superAdmin"],
    isDefault: true,
  },
  {
    label: t("brands", { defaultValue: "Brands" }),
    path: "cloudKitchens_brands",
    icon: BrandDevelopment_icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("employees", { defaultValue: "Employees" }),
    path: "cloudKitchens_employees",
    icon: BrandDevelopment_icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("menus", { defaultValue: "Menus" }),
    path: "cloudKitchens_menus",
    icon: BrandDevelopment_icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("menuCategories", { defaultValue: "Menu Categories" }),
    path: "cloudKitchens_menuCategories",
    icon: BrandDevelopment_icon(),
    access: ["admin", "superAdmin"],
  },
  {
    label: t("modifiers", { defaultValue: "Modifiers" }),
    path: "cloudKitchens_modifiers",
    icon: BrandDevelopment_icon(),
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
