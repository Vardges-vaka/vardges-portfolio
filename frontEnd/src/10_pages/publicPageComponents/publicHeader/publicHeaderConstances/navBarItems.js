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
      label: t("navBar.labels.bio"),
      path: `/${language}/bio`,
      icon: AboutIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.journey"),
      path: `/${language}/journey`,
      icon: ExperienceIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.projects"),
      path: `/${language}/projects`,
      icon: ProjectsIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.skills"),
      path: `/${language}/skills`,
      icon: SkillsIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.education"),
      path: `/${language}/education`,
      icon: EducationIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.achievements"),
      path: `/${language}/achievements`,
      icon: AchievementsIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.vision"),
      path: `/${language}/vision`,
      icon: GoalsIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.values"),
      path: `/${language}/values`,
      icon: ValuesIcon(),
      classname: "",
    },
    {
      label: t("navBar.labels.contact"),
      path: `/${language}/contact`,
      icon: ContactIcon(),
      classname: "ContactIcon",
    },
  ];
};
