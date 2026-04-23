import React from "react";
import { useTranslation } from "react-i18next";
import "./styles/contact.css";

const Contact = () => {
  const { t } = useTranslation("tempContent");

  return <div className="Contact">{t("ui.pages.contact.title")}</div>;
};

export default Contact;
