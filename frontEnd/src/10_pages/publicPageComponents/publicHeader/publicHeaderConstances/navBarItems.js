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

export const navBarItems = (t, language) => {
  return [
    {
      label: t("navBar.labels.about") || "About",
      path: `/${language}/about`,
      icon: AboutIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.work") || "Work",
      path: `/${language}/work`,
      icon: ProjectsIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.skills") || "Skills",
      path: `/${language}/skills`,
      icon: SkillsIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.contact") || "Contact",
      path: `/${language}/contact`,
      icon: ContactIcon(),
      classname: "ContactIcon",
    },
  ];
};
