import { useMemo, useState, useCallback } from "react";
// import {  } from "../../../../../05_helpers/apiHelpers/_apiHelpers.index.js";
import { AdminSignOut_helper } from "../../../../05_helpers/apiHelpers/_apiHelpers.index.js";

export const useAdminDashboard_apiHelpers = ({}) => {
  //   try {
  //     const response = await AdminSignOut_helper(t, tCommon);
  //     if (response && response.success) {
  //       console.log("Sign out successful, clearing user context...");
  //       // Clear user context
  //       logout();
  //       // Redirect to admin welcome page
  //       navigate("/admin");
  //     } else {
  //       console.error("Sign out failed:", response?.message);
  //     }
  //   } catch (error) {
  //     console.error("Sign out error:", error);
  //   }
  // };
  return {
    apiHelpers: {},
  };
};
