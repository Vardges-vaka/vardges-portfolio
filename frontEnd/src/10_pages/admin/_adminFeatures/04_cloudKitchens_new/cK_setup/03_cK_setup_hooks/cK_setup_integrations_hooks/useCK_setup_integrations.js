import {
  useCK_setup_integrations_states,
  useCK_setup_integrations_apiHlpr,
  useCK_setup_integrations_handlers,
} from "./_cK_setup_integrations_hooks.index.js";
import { integrations_propsComposer } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";

export const useCK_setup_integrations = ({ TOAST, t, onSessionChange }) => {
  const { states, setters, refs } = useCK_setup_integrations_states();
  const { apiHelpers } = useCK_setup_integrations_apiHlpr();
  const { handlers } = useCK_setup_integrations_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
    onSessionChange,
  });

  const {
    stp_empty_integrations_props,
    stp_integrations_addForm_props,
    stp_integrations_viewOne_props,
    stp_integrations_viewAll_props,
    stp_integrations_modals_props,
  } = integrations_propsComposer(states, handlers, t);

  return {
    states: {
      activeOperation: states.activeOperation,
      activeViewingType: states.activeViewingType,
      integrations: states.integrations,
    },
    handlers: {
      handleAddnew: handlers.handleAddnew,
      handleinitialfetch: handlers.handleinitialfetch,
    },
    guards: {
      hasUnsavedDetailChanges: handlers.hasUnsavedDetailChanges,
      handleRequestNavigation: handlers.handleRequestNavigation,
      resetDetailState: handlers.resetDetailState,
    },
    childProps: {
      stp_empty_integrations_props,
      stp_integrations_addForm_props,
      stp_integrations_viewOne_props,
      stp_integrations_viewAll_props,
      stp_integrations_modals_props,
    },
    t,
    TOAST,
  };
};
