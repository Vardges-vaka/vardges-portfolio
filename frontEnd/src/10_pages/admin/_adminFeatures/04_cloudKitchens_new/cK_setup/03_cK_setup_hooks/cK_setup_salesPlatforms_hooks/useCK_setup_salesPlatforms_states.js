import { useState, useRef } from "react";
import {
  DFLT_F_D_SALES_PLATFORM,
  DFLT_F_D_SALES_PLATFORM_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
export const useCK_setup_salesPlatforms_states = () => {
  const [salesPlatforms, setSalesPlatforms] = useState([]);
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("one");
  const [selectedSalesPlatform, setSelectedSalesPlatform] = useState(null);
  const [salesPlatformFormData, setSalesPlatformFormData] = useState(
    DFLT_F_D_SALES_PLATFORM,
  );
  const [salesPlatformFormData_full, setSalesPlatformFormData_full] = useState(
    DFLT_F_D_SALES_PLATFORM_FULL,
  );
  return {
    states: {
      activeOperation,
      activeViewingType,
      salesPlatforms,
      selectedSalesPlatform,
      salesPlatformFormData,
      salesPlatformFormData_full,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setSalesPlatforms,
      setSelectedSalesPlatform,
      setSalesPlatformFormData,
      setSalesPlatformFormData_full,
    },
    refs: {},
  };
};
