import { useCallback, useEffect } from "react";
import {
  useCK_setup_salesPlatforms_states,
  useCK_setup_salesPlatforms_apiHlpr,
  useCK_setup_salesPlatforms_handlers,
} from "./_cK_setup_salesPlatforms_hooks.index.js";
import { salesPlatforms_propsComposer } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
export const useCK_setup_salesPlatforms = ({ TOAST, t }) => {
  const { states, setters, refs } = useCK_setup_salesPlatforms_states();
  const { apiHelpers } = useCK_setup_salesPlatforms_apiHlpr({ TOAST });
  const { handlers } = useCK_setup_salesPlatforms_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  const {
    stp_empty_salesPlatforms_props,
    stp_salesPlatforms_addForm_props,
    stp_salesPlatforms_viewOne_props,
    stp_salesPlatforms_viewAll_props,
  } = salesPlatforms_propsComposer(states, handlers, t);

  return {
    states: {
      activeOperation: states.activeOperation,
      activeViewingType: states.activeViewingType,
      salesPlatforms: states.salesPlatforms,
    },
    handlers: {
      handleAddnew: handlers.handleAddnew,
      handleinitialfetch: handlers.handleinitialfetch,
    },
    childProps: {
      stp_empty_salesPlatforms_props: stp_empty_salesPlatforms_props,
      stp_salesPlatforms_addForm_props: stp_salesPlatforms_addForm_props,
      stp_salesPlatforms_viewOne_props: stp_salesPlatforms_viewOne_props,
      stp_salesPlatforms_viewAll_props: stp_salesPlatforms_viewAll_props,
    },
    t,
    TOAST,
  };
};
