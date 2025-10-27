import React from "react";
import { useTranslation } from "react-i18next";
import "./styles/skills.css";

const Skills = ({ variant = "full" }) => {
  const { i18n, t } = useTranslation("skills");
  const Skills_classname = `Skills ${variant === "full" ? "full" : "short"}`;
  return <div className={Skills_classname}>{t("test")}</div>;
};

export default Skills;
