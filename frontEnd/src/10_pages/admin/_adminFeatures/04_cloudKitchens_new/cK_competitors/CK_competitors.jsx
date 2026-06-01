import React from "react";
import { useCK_competitors } from "./03_cK_competitors_hooks/_cK_competitors_hooks.index.js";
import "./_styles/cK_competitors.css";

const CK_competitors = () => {
  const { states, handlers, childProps, t } = useCK_competitors();
  return (
    <div>
      <h1>CK_competitors</h1>
    </div>
  );
};

export default CK_competitors;
