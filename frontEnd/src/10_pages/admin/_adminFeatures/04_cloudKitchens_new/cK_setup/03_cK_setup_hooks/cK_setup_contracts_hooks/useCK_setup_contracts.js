import { useCallback, useEffect } from "react";

import {
  useCK_setup_contracts_states,
  useCK_setup_contracts_apiHlpr,
  useCK_setup_contracts_handlers,
} from "./_cK_setup_contracts_hooks.index.js";
import { contracts_propsComposer } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
export const useCK_setup_contracts = ({ TOAST, t }) => {
  const { states, setters, refs } = useCK_setup_contracts_states();
  const { apiHelpers } = useCK_setup_contracts_apiHlpr({ TOAST });
  const { handlers } = useCK_setup_contracts_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  const {
    stp_contracts_addForm_props,
    stp_empty_contracts_props,
    stp_contracts_viewOne_props,
    stp_contracts_viewAll_props,
  } = contracts_propsComposer(states, handlers, t);

  return {
    states: {
      activeOperation: states.activeOperation,
      activeViewingType: states.activeViewingType,
      contracts: states.contracts,
    },
    handlers: {
      handleAddnew: handlers.handleAddnew,
      handleinitialfetch: handlers.handleinitialfetch,
    },
    childProps: {
      stp_contracts_addForm_props: stp_contracts_addForm_props,
      stp_empty_contracts_props: stp_empty_contracts_props,
      stp_contracts_viewOne_props: stp_contracts_viewOne_props,
      stp_contracts_viewAll_props: stp_contracts_viewAll_props,
    },
    t,
    TOAST,
  };
};
