import React from "react";
import { useCK_kitchens } from "./03_cK_kitchens_hooks/_cK_kitchens_hooks.index.js";
import "./_styles/cK_kitchens.css";

const CK_kitchens = () => {
  const { states, handlers, childProps, t } = useCK_kitchens();
  return (
    <div>
      <h1>CK_kitchens</h1>
    </div>
  );
};

export default CK_kitchens;
