import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../../../02_context/context.index.js";
import {
  ArmenianFlag,
  RussianFlag,
  BritishFlag,
  ArabicFlag,
} from "../../../00_assets/_assets.index.js";
import "../../_styles/languageSelect.css";

const LanguageSelect = () => {
  const { i18n, t } = useTranslation("common");
  const { toggleLanguage } = useLanguageContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentLanguage = i18n.language;

  const languages = useMemo(
    () => [
      {
        code: "en",
        name: t("language.en"),
        dir: "ltr",
        flag: BritishFlag,
        title: t("language.hover.en"),
      },
      {
        code: "ar",
        name: t("language.ar"),
        dir: "rtl",
        flag: ArabicFlag,
        title: t("language.hover.ar"),
      },
      {
        code: "ru",
        name: t("language.ru"),
        dir: "ltr",
        flag: RussianFlag,
        title: t("language.hover.ru"),
      },
      {
        code: "hy",
        name: t("language.hy"),
        dir: "ltr",
        flag: ArmenianFlag,
        title: t("language.hover.hy"),
      },
    ],
    [t]
  );

  const changeLanguage = (langCode) => {
    toggleLanguage(langCode);
    setIsOpen(false);

    const validLanguagePattern = /^\/(?:en|ar|ru|hy)/;
    const currentPath =
      location.pathname.replace(validLanguagePattern, "") || "/";
    if (currentPath === "/") {
      return;
    } else {
      navigate(`/${langCode}${currentPath}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const currentLang =
      languages.find((lang) => lang.code === currentLanguage) || languages[0];

    document.documentElement.dir = currentLang.dir;
    document.documentElement.lang = currentLang.code;

    // Add RTL class if needed
    if (currentLang.dir === "rtl") {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  }, [currentLanguage, languages]);

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <div className={`languageSwitcher`} ref={dropdownRef}>
      <button
        className={`languageSwitcher__button`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("language.selector.aria")}>
        <img
          src={currentLang.flag}
          alt={`${currentLang.name} flag`}
          className={`languageSwitcher__flag-img`}
          title={t("language.click")}
        />
        {/* <span className={`languageSwitcher__name`}>{currentLang.name}</span> */}
      </button>

      {isOpen && (
        <ul
          className={`languageSwitcher__dropdown`}
          role="listbox"
          aria-activedescendant={currentLanguage}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              id={lang.code}
              role="option"
              aria-selected={lang.code === currentLanguage}
              aria-label={t("language.selector.aria")}
              title={lang.title}
              className={`languageSwitcher__option ${
                lang.code === currentLanguage ? "active" : ""
              }`}
              onClick={() => changeLanguage(lang.code)}>
              <img
                src={lang.flag}
                alt={`${lang.name} flag`}
                className={`languageSwitcher__flag-img`}
              />
              <span className={`languageSwitcher__name`}>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// LanguageSelect.propTypes = {
//   className: PropTypes.string,
// };

// LanguageSelect.displayName = "LanguageSelect";

export default LanguageSelect;
