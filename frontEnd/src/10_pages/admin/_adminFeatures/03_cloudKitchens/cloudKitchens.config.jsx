import { BrandDevelopment_icon } from "../../../../01_components/components.index.js";

const cloudKitchens_SideBar = (t) => [
  {
    label: t("branches") || "Branches",
    path: "cloudKitchens_branches",
    icon: BrandDevelopment_icon(),
    access: ["admin", "superAdmin"],
    isDefault: true,
  },
];

export default cloudKitchens_SideBar;
