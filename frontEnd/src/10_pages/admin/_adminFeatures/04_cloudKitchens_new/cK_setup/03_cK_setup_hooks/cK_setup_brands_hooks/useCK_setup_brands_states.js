import { useState, useRef } from "react";
import {
  DFLT_F_D_BRAND_INITIAL,
  DFLT_F_D_BRAND_FULL,
  DFLT_F_D_FILES,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
export const useCK_setup_brands_states = () => {
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("all");
  const [addingStep, setAddingStep] = useState("step1");
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandFormData, setBrandFormData] = useState(DFLT_F_D_BRAND_INITIAL);
  const [brandFormData_full, setBrandFormData_full] =
    useState(DFLT_F_D_BRAND_FULL);
  const [brandFormData_files, setBrandFormData_files] = useState([
    DFLT_F_D_FILES,
  ]);
  return {
    states: {
      activeOperation,
      activeViewingType,
      brands,
      selectedBrand,
      brandFormData,
      brandFormData_full,
      brandFormData_files,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setBrands,
      setSelectedBrand,
      setBrandFormData,
      setBrandFormData_full,
      setBrandFormData_files,
    },
    refs: {},
  };
};
