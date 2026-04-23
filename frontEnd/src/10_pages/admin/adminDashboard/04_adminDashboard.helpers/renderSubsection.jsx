import React, { Suspense, useCallback } from "react";
import { componentMap } from "../05_adminDashboard.constances/_adminDashboard.constances.index.js";

export const renderSubsection = ({ states, isDebug }) =>
  useCallback(() => {
    // isDebug && console.log("rendSubsection:originalpath", states.original_Path);
    // isDebug && console.log("rendSubsection:defaultpath", states.default_Path);
    // isDebug && console.log("rendSubsection:section", states.section);
    if (!states.original_Path && !states.default_Path) return null;

    let path = states.original_Path || states.default_Path;
    let section = states.section || "settings";

    // isDebug && console.log("activeSubsection_______path", path);
    // isDebug && console.log("activeSubsection_______section", section);

    const Component = componentMap[section][path];
    isDebug && console.log("Component", Component);
    if (!Component) return null;

    // const ;
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <Component />
      </Suspense>
    );
  }, [states.original_Path, states.default_Path, states.section]);
