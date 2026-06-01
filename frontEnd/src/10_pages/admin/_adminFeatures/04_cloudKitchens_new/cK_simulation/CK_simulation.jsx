import React from "react";
import { useCK_simulation } from "./03_cK_simulation_hooks/_cK_simulation_hooks.index.js";
import "./_styles/cK_simulation.css";

const CK_simulation = () => {
  const { states, handlers, childProps, t } = useCK_simulation();
  return (
    <div>
      <h1>CK_simulation</h1>
    </div>
  );
};

export default CK_simulation;
