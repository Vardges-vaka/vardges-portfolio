import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navBarItems } from "../publicHeaderConstances/_publicHeaderConstances.index.js";
import "./styles/publicHeader_navBar.css";

const PublicHeader_NavBar = () => {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();

  const navBarItemsList = navBarItems(t, i18n.language);

  // Check if current path matches the nav item
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="publicHeaderNavBar">
      <ul className="publicHeaderNavBar__list">
        {navBarItemsList.map((item) => (
          <li
            className={`publicHeaderNavBar__item ${
              isActive(item.path) ? "publicHeaderNavBar__item--active" : ""
            }`}
            key={item.path}>
            <Link to={item.path} className="publicHeaderNavBar__link">
              <span className="publicHeaderNavBar__label">{item.label}</span>
              {isActive(item.path) && (
                <span className="publicHeaderNavBar__activeIndicator"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PublicHeader_NavBar;
