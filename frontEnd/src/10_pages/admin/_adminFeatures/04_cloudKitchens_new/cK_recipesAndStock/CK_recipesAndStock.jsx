import React from "react";
import { useCK_recipesAndStock } from "./03_cK_recipesAndStock_hooks/_cK_recipesAndStock_hooks.index.js";
import "./_styles/cK_recipesAndStock.css";

const CK_recipesAnStock = () => {
  const { states, handlers, childProps, t } = useCK_recipesAndStock();
  return (
    <div>
      <h1>CK_recipesAnStock</h1>
    </div>
  );
};

export default CK_recipesAnStock;
