import React from "react";
import { useCK_setup } from "./03_cK_setup_hooks/_cK_setup_hooks.index.js";
import "./_styles/cK_setup.css";

const CK_setup = () => {
  const { states, handlers, childProps, t } = useCK_setup();
  return (
    <div>
      <h1>CK_setup</h1>
    </div>
  );
};

export default CK_setup;
