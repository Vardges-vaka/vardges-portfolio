import React from "react";
import { useCK_marketing } from "./03_cK_marketing_hooks/_cK_marketing_hooks.index.js";
import "./_styles/cK_marketing.css";

const CK_marketing = () => {
  const { states, handlers, childProps, t } = useCK_marketing();
  return (
    <div>
      <h1>CK_marketing</h1>
    </div>
  );
};

export default CK_marketing;
