import React from "react";
import { useTranslation } from "react-i18next";
import "./styles/achievements.css";

const Achievements = ({ variant = "full" }) => {
  const { i18n, t } = useTranslation("achievements");
  const Achievements_classname = `Achievements ${
    variant === "full" ? "full" : "short"
  }`;
  return <div className={Achievements_classname}>{t("test")}</div>;
};

export default Achievements;
