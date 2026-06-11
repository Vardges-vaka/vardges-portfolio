import { useCallback, useEffect } from "react";
import {
  useCK_setup_cuisineTags_states,
  useCK_setup_cuisineTags_apiHlpr,
  useCK_setup_cuisineTags_handlers,
} from "./_cK_setup_cuisineTags_hooks.index.js";
import { cuisineTags_propsComposer } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";

export const useCK_setup_cuisineTags = ({ TOAST, t }) => {
  const { states, setters, refs } = useCK_setup_cuisineTags_states();
  const { apiHelpers } = useCK_setup_cuisineTags_apiHlpr({ TOAST });
  const { handlers } = useCK_setup_cuisineTags_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  const {
    stp_empty_cuisineTags_props,
    stp_cuisineTags_addForm_props,
    stp_cuisineTags_viewOne_props,
    stp_cuisineTags_viewAll_props,
    stp_cuisineTags_full_props,
  } = cuisineTags_propsComposer(states, handlers, t);

  return {
    states: {
      activeOperation: states.activeOperation,
      activeViewingType: states.activeViewingType,
      cuisineTags: states.cuisineTags,
    },
    handlers: {
      handleAddnew: handlers.handleAddnew,
      handleinitialfetch: handlers.handleinitialfetch,
    },
    childProps: {
      stp_empty_cuisineTags_props: stp_empty_cuisineTags_props,
      stp_cuisineTags_addForm_props: stp_cuisineTags_addForm_props,
      stp_cuisineTags_viewOne_props: stp_cuisineTags_viewOne_props,
      stp_cuisineTags_viewAll_props: stp_cuisineTags_viewAll_props,
      stp_cuisineTags_full_props: stp_cuisineTags_full_props,
    },
    t,
    TOAST,
  };
};
