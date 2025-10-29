import {
  Calendar_icon,
  Countdown_icon,
  Projects_icon,
  To_do_list_icon,
  TravelPlanner_icon,
} from "../../../../01_components/components.index.js";

const work_planning_SideBar = (t) => {
  return [
    {
      label: t("Calendar"),
      path: "Calendar",
      icon: Calendar_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: true,
    },
    {
      label: t("Countdown"),
      path: "Countdown",
      icon: Countdown_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("Projects"),
      path: "Projects",
      icon: Projects_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("To_do_list"),
      path: "To_do_list",
      icon: To_do_list_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
    {
      label: t("TravelPlanner"),
      path: "TravelPlanner",
      icon: TravelPlanner_icon(),
      access: ["user", "admin", "superAdmin"],
      isDefault: false,
    },
  ];
};

export default work_planning_SideBar;
