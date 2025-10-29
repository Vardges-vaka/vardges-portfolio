import React from "react";
import { AdminNavBar_Items } from "../adminHeader.constances/_adminHeader.constances.index.js";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../_styles/adminHeader_NavBar.css";

const AdminHeader_NavBar = ({ t, lan }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = AdminNavBar_Items(t);
  const isActive = (path) => {
    return location.pathname === `/${lan}/admin/dashboard/${path}`;
  };

  return (
    <nav className="publicHeaderNavBar">
      <ul className="publicHeaderNavBar__list">
        {items.map((item, index) => {
          const iconSrc = item.icon;
          const active = isActive(item.to);

          return (
            <li
              className={`publicHeaderNavBar__item ${
                active ? "publicHeaderNavBar__item--active" : ""
              }`}
              key={item.to}>
              <div
                onClick={() => navigate(`/${lan}/admin/dashboard/${item.to}`)}
                className="publicHeaderNavBar__link">
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
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminHeader_NavBar;
