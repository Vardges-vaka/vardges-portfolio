import React from "react";
import "./styles/projects.css";
import { useTranslation } from "react-i18next";
const Projects = ({ variant = "full" }) => {
  const { i18n, t } = useTranslation("projects");
  const Projects_classname = `Projects ${
    variant === "full" ? "full" : "short"
  }`;
  return <div className={Projects_classname}>{t("test")}</div>;
};

export default Projects;
