import React from "react";
import { useTranslation } from "react-i18next";
import "./styles/education.css";

const Education = ({ variant = "full" }) => {
  const { i18n, t } = useTranslation("education");
  const Education_classname = `Education ${
    variant === "full" ? "full" : "short"
  }`;
  return <div className={Education_classname}>{t("test")}</div>;
};

export default Education;
