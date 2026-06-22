import { useState } from "react";
import {
  DFLT_F_D_CUISINE_TAG_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const EMPTY_FORM_ERRORS = {};

export const useCK_setup_cuisineTags_states = () => {
  const [cuisineTags, setCuisineTags] = useState([]);
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [cuisineTagFormData, setCuisineTagFormData] =
    useState(DFLT_F_D_CUISINE_TAG_FULL);
  const [cuisineTagFormErrors, setCuisineTagFormErrors] =
    useState(EMPTY_FORM_ERRORS);
  return {
    states: {
      activeOperation,
      cuisineTags,
      cuisineTagFormData,
      cuisineTagFormErrors,
    },
    setters: {
      setActiveOperation,
      setCuisineTags,
      setCuisineTagFormData,
      setCuisineTagFormErrors,
    },
    refs: {},
  };
};
