import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LanguageSelect,
  ThemeToggler,
  IconGlobal,
} from "../../../01_components/components.index.js";
import { useTranslation } from "react-i18next";
import { AdminHeader_NavBar } from "./adminHeader.comps/_adminHeader.comps.index.js";
import "./_styles/adminHeader.css";

const AdminHeader = () => {
  const { t } = useTranslation("adminHeader");
  const navigate = useNavigate();
  return (
    <header className="AdminLayout_header">
      <IconGlobal
        className=""
        isActive={true}
        type="lucide"
        lucid="Settings"
        svg_src=""
        version="primary"
        withWrapper={true}
        wrapperProps={{
          onClick: () => navigate("/admin/dashboard/settings"),
        }}
      />
      <AdminHeader_NavBar t={t} />
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
