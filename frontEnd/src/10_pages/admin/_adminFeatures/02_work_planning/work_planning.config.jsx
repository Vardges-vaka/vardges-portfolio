import {
  Calendar_icon,
  Countdown_icon,
  Projects_icon,
  To_do_list_icon,
  TravelPlanner_icon,
} from "../../../../01_components/components.index.js";

const work_planning_SideBar = (t) => {
  [
    {
      label: t("Calendar"),
      path: "",
      icon: Calendar_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("Countdown"),
      path: "",
      icon: Countdown_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("Projects"),
      path: "",
      icon: Projects_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("To_do_list"),
      path: "",
      icon: To_do_list_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("TravelPlanner"),
      path: "",
      icon: TravelPlanner_icon,
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
  ];
};

export default work_planning_SideBar;
