import React from "react";
import {
  Logo,
  LanguageSelect,
} from "../../../01_components/components.index.js";
import { PublicHeader_NavBar } from "./publicHeaderComps/_publicHeaderComps.index.js";
import "./styles/publicHeader.css";

const PublicHeader = () => {
  return (
    <div className="PublicHeader">
      <Logo />
      <PublicHeader_NavBar />
      <LanguageSelect />
    </div>
  );
};

export default PublicHeader;
