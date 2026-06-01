import React from "react";
import { useCK_mapStudio } from "./03_cK_mapStudio_hooks/_cK_mapStudio_hooks.index.js";
import "./_styles/cK_mapStudio.css";

const CK_mapStudio = () => {
  const { states, handlers, childProps, t } = useCK_mapStudio();
  return (
    <div>
      <h1>CK_mapStudio</h1>
    </div>
  );
};

export default CK_mapStudio;
