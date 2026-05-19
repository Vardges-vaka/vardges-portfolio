import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MENUS_isDebug from "../menus.config.js";
import {
  useMenus_states,
  useMenus_apiHelpers,
  useMenus_handlers,
} from "./_menus_hooks.index.js";
import { getCompProps } from "../02_menus_helpers/_menus_helpers.index.js";

const isDebug = MENUS_isDebug.hooks;

/* ============================================================================
   useMenus — orchestrator hook for the Menus feature.

   Composes:
     - states  (useMenus_states)
     - apiHelpers (useMenus_apiHelpers)
     - handlers (useMenus_handlers)
   And then computes prop bundles via getCompProps so Menus.jsx can stay thin.

   Auto-fetches initial data each time the session changes.

   Auto-dismisses a toast 2.4 s after it appears.
============================================================================ */
export const useMenus = () => {
  const { t } = useTranslation("menus");
  const { states, setters } = useMenus_states();
  const { apiHelpers } = useMenus_apiHelpers();
  const { handlers } = useMenus_handlers({
    states,
    setters,
    apiHelpers,
    isDebug,
  });

  useEffect(() => {
    handlers.handleInitialFetch();
  }, [handlers.handleInitialFetch]);

  useEffect(() => {
    if (!states.toast) return undefined;
    const id = setTimeout(() => handlers.dismissToast(), 2400);
    return () => clearTimeout(id);
  }, [states.toast, handlers.dismissToast]);

  const {
    Menus_session_menu_props,
    Menus_session_menuItem_props,
    Menus_session_modifier_props,
    Menus_session_option_props,
    Menus_sessionToggle_props,
    Menus_confirmModal_fieldUpdate_props,
  } = getCompProps(states, handlers, t);

  return {
    states: {
      session: states.session,
      operation: states.operation,
      viewingType: states.viewingType,
      showForm: states.showForm,
      isCreating: states.isCreating,
      toast: states.toast,
      confirm: states.confirm,
    },
    handlers: {
      closeCreate: handlers.closeCreate,
      handleCreate: handlers.handleCreate,
      dismissToast: handlers.dismissToast,
    },
    childProps: {
      sess_Toggle_props: Menus_sessionToggle_props,
      sess_menu_props: Menus_session_menu_props,
      sess_menuItem_props: Menus_session_menuItem_props,
      sess_modifier_props: Menus_session_modifier_props,
      sess_option_props: Menus_session_option_props,
      confirmModal_fieldUpdate_props: Menus_confirmModal_fieldUpdate_props,
    },
    t,
  };
};
