import {
  BrandDevelopment_icon,
  BrandPortfolio_icon,
  BrandBook_icon,
  CocktailDevelopment_icon,
  MenuDevelopment_icon,
} from "../../../../01_components/components.index.js";

const brand_product_SideBar = (t) => {
  return [
    {
      label: t("BrandDevelopment"),
      path: "BrandDevelopment",
      icon: BrandDevelopment_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("BrandPortfolio"),
      path: "BrandPortfolio",
      icon: BrandPortfolio_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("BrandBook"),
      path: "BrandBook",
      icon: BrandBook_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("MenuDevelopment"),
      path: "MenuDevelopment",
      icon: MenuDevelopment_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("CocktailDevelopment"),
      path: "CocktailDevelopment",
      icon: CocktailDevelopment_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
  ];
};

export default brand_product_SideBar;
