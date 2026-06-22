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
  useCK_setup_integrations,
  useCK_setup_contracts,
} from "./_cK_setup_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

const SESSION_GUARD_MAP = {
  brands: "brands",
  salesPlatforms: "salesPlatforms",
  integrations: "integrations",
};

export const useCK_setup = () => {
  const { t } = useTranslation("setup");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_setup_states();

  const applySessionChange = useCallback(
    (sessionValue) => {
      setters.setActiveSession(sessionValue);
    },
    [setters.setActiveSession],
  );

  const cuisineTags = useCK_setup_cuisineTags({ TOAST, t });
  const brands = useCK_setup_brands({
    TOAST,
    t,
    cuisineTags: cuisineTags.states.cuisineTags,
    onSessionChange: applySessionChange,
  });
  const channels = useCK_setup_channels({ TOAST, t });
  const salesPlatforms = useCK_setup_salesPlatforms({
    TOAST,
    t,
    onSessionChange: applySessionChange,
  });
  const integrations = useCK_setup_integrations({
    TOAST,
    t,
    onSessionChange: applySessionChange,
  });
  const contracts = useCK_setup_contracts({ TOAST, t });

  const sessionModules = { brands, salesPlatforms, integrations };

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
    integrations,
    contracts,
    sessionModules,
  });

  useEffect(() => {
    handlers.handleInitialFetch(states.activeSession);
  }, [handlers.handleInitialFetch, states.activeSession]);

  const handleViewAllToggle = useCallback(() => {
    const activeKey = SESSION_GUARD_MAP[states.activeSession];
    const activeModule = activeKey ? sessionModules[activeKey] : null;

    if (activeModule?.states?.activeViewingType === "one") {
      activeModule.guards.handleRequestNavigation({ type: "viewAll" });
      return;
    }

    if (states.activeViewingType === "one") {
      setters.setActiveViewingType("all");
    } else {
      setters.setActiveViewingType("one");
    }
  }, [
    sessionModules,
    setters.setActiveViewingType,
    states.activeSession,
    states.activeViewingType,
  ]);

  const stp_sessionToggler_props = {
    states: { activeSession: states.activeSession },
    handlers: {
      handleSessionChange: handlers.handleSessionChange,
      handleAddNew: handlers.handleAddNew,
      handle: handleViewAllToggle,
    },
    childProps: {},
    t,
  };

  const stp_sessionSwitch_props = {
    states: { activeSession: states.activeSession },
    handlers: {},
    childProps: {
      brands,
      cuisineTags,
      salesPlatforms,
      channels,
      integrations,
      contracts,
    },
    t,
  };

  return {
    states: {},
    handlers: { initiateModalOpening: handlers.initiateModalOpening },
    childProps: {
      stp_sessionSwitch_props,
      stp_sessionToggler_props,
    },
    t,
    TOAST,
  };
};
