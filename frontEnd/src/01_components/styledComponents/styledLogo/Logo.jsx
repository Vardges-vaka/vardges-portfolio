import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../_styles/logo.css";

const Logo = ({ onClick }) => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const mainText = t("logo.name");
  const subtitleText = t("logo.familyName");

  return (
    <div
      className="Logo_container"
      onClick={onClick ? onClick : () => navigate("/")}>
      {/* Main Logo */}
      <div className="Logo_main">
        {mainText.split("").map((letter, index) => (
          <span
            key={`main-${index}`}
            className="letter"
            data-letter={letter}
            style={{ "--delay": `${index * 0.5}s` }}>
            {letter}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <div className="Logo_subtitle">
        {subtitleText.split("").map((letter, index) => (
          <span
            key={`subtitle-${index}`}
            className="letter"
            data-letter={letter}
            style={{ "--delay": `${index * 0.3}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Logo;
