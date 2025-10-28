import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_QRCode.config.js";
import { useQRCode } from "./02_QRCode.hooks/_QRCode.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { QRCode_YYY } from "./01_QRCode.comps/_QRCode.comps.index.js";
import "./00_styles/QRCode.css";

const QRCode = () => {
  return (
    <div className="QRCode">
      <h1>QRCode</h1>
    </div>
  );
};

QRCode.displayName = "QRCode";

export default QRCode;
