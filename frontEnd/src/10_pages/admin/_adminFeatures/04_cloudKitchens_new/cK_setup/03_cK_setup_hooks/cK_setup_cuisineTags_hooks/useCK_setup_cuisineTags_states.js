import { useState, useRef } from "react";
import {
  DFLT_F_D_CUISINE_TAG,
  DFLT_F_D_CUISINE_TAG_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
export const useCK_setup_cuisineTags_states = () => {
  const [cuisineTags, setCuisineTags] = useState([]);
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("one");
  const [selectedCuisineTag, setSelectedCuisineTag] = useState(null);
  const [cuisineTagFormData, setCuisineTagFormData] =
    useState(DFLT_F_D_CUISINE_TAG);
  const [cuisineTagFormData_full, setCuisineTagFormData_full] =
    useState(DFLT_F_D_CUISINE_TAG_FULL);
  return {
    states: {
      activeOperation,
      activeViewingType,
      cuisineTags,
      selectedCuisineTag,
      cuisineTagFormData,
      cuisineTagFormData_full,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setCuisineTags,
      setSelectedCuisineTag,
      setCuisineTagFormData,
      setCuisineTagFormData_full,
    },
    refs: {},
  };
};
