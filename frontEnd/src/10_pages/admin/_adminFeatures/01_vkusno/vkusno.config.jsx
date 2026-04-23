import { BrandDevelopment_icon } from "../../../../01_components/components.index.js";

const vkusno_SideBar = (t) => {
  return [
    {
      label: "Daily Sales",
      path: "vkusno_daily_sales",
      icon: BrandDevelopment_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
  ];
};

export default vkusno_SideBar;
