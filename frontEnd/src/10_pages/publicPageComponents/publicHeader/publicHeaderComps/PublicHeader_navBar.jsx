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
        {navBarItemsList.map((item, index) => {
          const iconSrc = item.icon;
          const active = isActive(item.path);

          return (
            <li
              className={`publicHeaderNavBar__item ${
                active ? "publicHeaderNavBar__item--active" : ""
              }`}
              key={item.path}>
              <Link to={item.path} className="publicHeaderNavBar__link">
                {/* Icon Container */}
                <div className="publicHeaderNavBar__iconWrapper">
                  <img
                    src={iconSrc}
                    alt={item.label}
                    className={`publicHeaderNavBar__icon ${
                      item.classname ? item.classname : ""
                    }`}
                  />
                </div>

                {/* Label - shows on hover or when active */}
                <span
                  className={`publicHeaderNavBar__label ${
                    active ? "publicHeaderNavBar__label--visible" : ""
                  }`}>
                  {item.label}
                </span>

                {/* Active indicator bar */}
                {active && (
                  <span className="publicHeaderNavBar__activeIndicator"></span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PublicHeader_NavBar;
