import { useCallback, useEffect } from "react";
import {
  useCK_setup_brands_states,
  useCK_setup_brands_apiHlpr,
  useCK_setup_brands_handlers,
} from "./_cK_setup_brands_hooks.index.js";
import { brands_propsComposer } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";

export const useCK_setup_brands = ({ TOAST, t }) => {
  const { states, setters, refs } = useCK_setup_brands_states();
  const { apiHelpers } = useCK_setup_brands_apiHlpr({ TOAST });
  const { handlers } = useCK_setup_brands_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  const {
    stp_empty_brand_props,
    stp_brands_viewOne_props,
    stp_brands_viewAll_props,
    stp_brands_addForm_props,
  } = brands_propsComposer(states, handlers, t);
  return {
    states: {
      activeOperation: states.activeOperation,
      activeViewingType: states.activeViewingType,
      brands: states.brands,
    },
    handlers: {
      handleAddnew: handlers.handleAddnew,
      handleinitialfetch: handlers.handleinitialfetch,
    },
    childProps: {
      stp_empty_brand_props: stp_empty_brand_props,
      stp_brands_viewOne_props: stp_brands_viewOne_props,
      stp_brands_viewAll_props: stp_brands_viewAll_props,
      stp_brands_addForm_props: stp_brands_addForm_props,
    },
    t,
    TOAST,
  };
};
