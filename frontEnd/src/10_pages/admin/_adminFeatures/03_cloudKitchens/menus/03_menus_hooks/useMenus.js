import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MENUS_isDebug from "../menus.config.js";
import {
  useMenus_states,
  useMenus_apiHelpers,
  useMenus_handlers,
} from "./_menus_hooks.index.js";
// import {} from "../05_menus_cnst/_menus_cnst.index.js";
import { getCompProps } from "../02_menus_helpers/_menus_helpers.index.js";

const isDebug = MENUS_isDebug.hooks;

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
    },
    handlers: {},
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
