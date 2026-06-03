import { useCallback, useEffect } from "react";

import {
  useCK_setup_channels_states,
  useCK_setup_channels_apiHlpr,
  useCK_setup_channels_handlers,
} from "./_cK_setup_channels_hooks.index.js";
import { channels_propsComposer } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
export const useCK_setup_channels = ({ TOAST, t }) => {
  const { states, setters, refs } = useCK_setup_channels_states();
  const { apiHelpers } = useCK_setup_channels_apiHlpr({ TOAST });
  const { handlers } = useCK_setup_channels_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  const {
    stp_channels_addForm_props,
    stp_empty_channels_props,
    stp_channels_viewOne_props,
    stp_channels_viewAll_props,
  } = channels_propsComposer(states, handlers, t);

  return {
    states: {
      activeOperation: states.activeOperation,
      activeViewingType: states.activeViewingType,
      channels: states.channels,
    },
    handlers: {
      handleAddnew: handlers.handleAddnew,
      handleinitialfetch: handlers.handleinitialfetch,
    },
    childProps: {
      stp_channels_addForm_props: stp_channels_addForm_props,
      stp_empty_channels_props: stp_empty_channels_props,
      stp_channels_viewOne_props: stp_channels_viewOne_props,
      stp_channels_viewAll_props: stp_channels_viewAll_props,
    },
    t,
    TOAST,
  };
};
