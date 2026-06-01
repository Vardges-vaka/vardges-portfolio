import React from "react";
import { useCK_menus } from "./03_cK_menus_hooks/_cK_menus_hooks.index.js";
import "./_styles/cK_menus.css";

const CK_menus = () => {
  const { states, handlers, childProps, t } = useCK_menus();
  return (
    <div>
      <h1>CK_menus</h1>
    </div>
  );
};

export default CK_menus;
