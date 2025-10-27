import React from "react";
import "./styles/vision.css";
import { useTranslation } from "react-i18next";
const Vision = ({ variant = "full" }) => {
  const { i18n, t } = useTranslation("vision");
  const Vision_classname = `Vision ${variant === "full" ? "full" : "short"}`;
  return <div className={Vision_classname}>{t("test")}</div>;
};

export default Vision;
