import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navBarItems } from "../publicHeaderConstances/_publicHeaderConstances.index.js";
import "./styles/publicHeader_navBar.css";

const PublicHeader_NavBar = () => {
  const { t, i18n } = useTranslation("common");

  const navBarItemsList = navBarItems(t, i18n.language);

  return (
    <nav className="PublicHeader_NavBar">
      <ul className="PublicHeader_NavBar_list">
        {navBarItemsList.map((item) => (
          <li className="PublicHeader_NavBar_item" key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PublicHeader_NavBar;
