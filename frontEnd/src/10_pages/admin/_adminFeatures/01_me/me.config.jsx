import {
  Ai_icon,
  Health_icon,
} from "../../../../01_components/components.index.js";

const me_SideBar = (t) => {
  [
    {
      label: t("Ai"),
      path: "",
      icon: Ai_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("Health"),
      path: "",
      icon: Health_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
  ];
};

export default me_SideBar;
