import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { SUPPORTED_LANGUAGES } from "../../08_constances/_constances.index.js";

const isLanguageContext_debug = true;

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }
    if (SUPPORTED_LANGUAGES.includes(i18n.language)) {
      return i18n.language;
    }

    return "en";
  });

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    localStorage.setItem("language", language);
    isLanguageContext_debug && console.log("language changed", language);
  }, [language, i18n]);

  const toggleLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const contextValue = {
    language,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

LanguageProvider.displayName = "LanguageProvider";

export { LanguageContext, LanguageProvider };
