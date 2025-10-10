import React from "react";
import {
  Logo,
  LanguageSelect,
  ThemeToggler,
  ProfileToggler,
} from "../../../01_components/components.index.js";
import { PublicHeader_NavBar } from "./publicHeaderComps/_publicHeaderComps.index.js";
import "./styles/publicHeader.css";

import { A, B, C, D, E, Toggler1, G } from "../../../_/AAA.js";

const PublicHeader = () => {
  return (
    <div className="PublicHeader">
      <Logo />
      <PublicHeader_NavBar />

      <div className="PublicHeader_right">
        <ProfileToggler />
        <LanguageSelect />
        <ThemeToggler />
      </div>
    </div>
  );
};

export default PublicHeader;
