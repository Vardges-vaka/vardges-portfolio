import {
  Ai_icon,
  Health_icon,
} from "../../../../01_components/components.index.js";

const me_SideBar = (t) => {
  return [
    {
      label: t("Ai"),
      path: "Ai",
      icon: Ai_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("Health"),
      path: "Health",
      icon: Health_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
  ];
};

export default me_SideBar;
