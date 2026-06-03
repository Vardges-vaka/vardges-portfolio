import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_setup_states,
  useCK_setup_apiHlpr,
  useCK_setup_handlers,
  useCK_setup_brands,
  useCK_setup_channels,
  useCK_setup_cuisineTags,
  useCK_setup_salesPlatforms,
} from "./_cK_setup_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_setup = () => {
  const { t } = useTranslation("setup");
  const { TOAST } = useNotificationContext();
  const brands = useCK_setup_brands({ TOAST, t });
  const channels = useCK_setup_channels({ TOAST, t });
  const cuisineTags = useCK_setup_cuisineTags({ TOAST, t });
  const salesPlatforms = useCK_setup_salesPlatforms({ TOAST, t });

  const { states, setters, refs } = useCK_setup_states();
  const { apiHelpers } = useCK_setup_apiHlpr({ TOAST });
  const { handlers } = useCK_setup_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
    brands,
    channels,
    cuisineTags,
    salesPlatforms,
  });
  useEffect(() => {
    handlers.handleInitialFetch(states.activeSession);
  }, [handlers.handleInitialFetch, states.activeSession]);

  const handler = () => {
    if (states.activeViewingType === "one") {
      setters.setActiveViewingType("all");
    } else {
      setters.setActiveViewingType("one");
    }
  };
  const stp_sessionToggler_props = {
    states: {
      activeSession: states.activeSession,
    },
    handlers: {
      handleSessionChange: handlers.handleSessionChange,
      handleAddNew: handlers.handleAddNew,
      handle: handler,
    },
    childProps: {},
    t: t,
  };
  const stp_sessionSwitch_props = {
    states: {
      activeSession: states.activeSession,
    },
    handlers: {},
    childProps: {
      brands: brands,
      cuisineTags: cuisineTags,
      salesPlatforms: salesPlatforms,
      channels: channels,
    },
    t: t,
  };
  // const 

  // const modal_props = {
  //   states: {
  //     isOpen: modalOpen ? true : false,
  //     title:
  //       states.activeOperation === "update"
  //         ? "Confirm the Update"
  //         : "Confirm the Delete",
  //     cancelLabel: "Cancel",
  //     confirmLabel: "Confirm",
  //   },
  //   handlers: {
  //     onConfirm: handlers.handleModalOnConfirm,
  //     onCancel: handlers.handleModalOnCancel,
  //   },
  // };

  return {
    states: {},
    handlers: { initiateModalOpening: handlers.initiateModalOpening },
    childProps: {
      stp_sessionSwitch_props: stp_sessionSwitch_props,
      stp_sessionToggler_props: stp_sessionToggler_props,
      // modal_props: modal_props,
    },
    t,
    TOAST,
  };
};
