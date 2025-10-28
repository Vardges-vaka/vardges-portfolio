import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LanguageSelect,
  ThemeToggler,
  IconGlobal,
} from "../../../01_components/components.index.js";
import { useTranslation } from "react-i18next";
import { AdminHeader_NavBar } from "./adminHeader.comps/_adminHeader.comps.index.js";
import "./_styles/adminHeader.css";

const AdminHeader = () => {
  const { i18n, t } = useTranslation("adminHeader");
  const location = useLocation();
  const currentLanguage = i18n.language;

  return (
    <header className="AdminLayout_header">
      <IconGlobal
        className=""
        isActive={true}
        withWrapper={false}
        type="lucide"
        lucid="Settings"
        svg_src=""
        version="primary"
        // iconProps = {}
      />
      <AdminHeader_NavBar t={t} lan={currentLanguage} />
      <div className="AdminHeader_right">
        {" "}
        <LanguageSelect isAdmin={true} />
        <ThemeToggler />
        <IconGlobal
          key="logOut"
          className=""
          isActive={true}
          withWrapper={false}
          type="lucide"
          lucid="LogOut"
          svg_src=""
          version="primary"
          // iconProps = {}
        />
      </div>
    </header>
  );
};

export default AdminHeader;
