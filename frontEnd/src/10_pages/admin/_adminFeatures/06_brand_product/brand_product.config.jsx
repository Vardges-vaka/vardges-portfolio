import {
  BrandDevelopment_icon,
  BrandPortfolio_icon,
  BrandBook_icon,
  CocktailDevelopment_icon,
  MenuDevelopment_icon,
} from "../../../../01_components/components.index.js";

const brand_product_SideBar = (t) => {
  [
    {
      label: t("BrandDevelopment"),
      path: "",
      icon: BrandDevelopment_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("BrandPortfolio"),
      path: "",
      icon: BrandPortfolio_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("BrandBook"),
      path: "",
      icon: BrandBook_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("MenuDevelopment"),
      path: "",
      icon: MenuDevelopment_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("CocktailDevelopment"),
      path: "",
      icon: CocktailDevelopment_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
  ];
};

export default brand_product_SideBar;
