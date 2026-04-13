import {
  AboutIcon,
  AchievementsIcon,
  EducationIcon,
  ExperienceIcon,
  GoalsIcon,
  ProjectsIcon,
  SkillsIcon,
  ValuesIcon,
  ContactIcon,
} from "../../../../01_components/components.index.js";

export const navBarItems = (t) => {
  return [
    {
      label: t("navBar.labels.about") || "About",
      path: "/about",
      icon: AboutIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.work") || "Work",
      path: "/work",
      icon: ProjectsIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.skills") || "Skills",
      path: "/skills",
      icon: SkillsIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.contact") || "Contact",
      path: "/contact",
      icon: ContactIcon(),
      classname: "ContactIcon",
    },
  ];
};
