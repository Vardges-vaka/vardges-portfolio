import React from "react";
import {
  LanguageSelect,
  ThemeToggler,
} from "../../../01_components/components.index.js";
import { AdminHeader_NavBar } from "./adminHeader.comps/_adminHeader.comps.index.js";
import "./_styles/adminHeader.css";

const AdminHeader = () => {
  return (
    <header className="AdminLayout_header">
      <p>Admin Header</p>
      <div className="AdminHeader_right">
        <LanguageSelect />
        <ThemeToggler />
      </div>
    </header>
  );
};

export default AdminHeader;
