import { useTranslation } from "react-i18next";
import MENUS_isDebug from "../../menus.config.js";
import useMenu_states from "./useMenu_states.js";
import useMenu_apiHelpers from "./useMenu_apiHelpers.js";
import useMenu_handlers from "./useMenu_handlers.js";

/* ============================================================================
   useMenu — composes states + apiHelpers + handlers for a single Menu.

   Usage:
     const { states, handlers, t } = useMenu();

   The shape of states/handlers matches the convention in useMenus.js so the
   downstream UI components can read them the same way.
============================================================================ */

const isDebug = MENUS_isDebug?.hooks;

const useMenu = () => {
  const { t } = useTranslation("menus");
  const { states, setters } = useMenu_states();
  const { apiHelpers } = useMenu_apiHelpers();
  const { handlers } = useMenu_handlers({ states, setters, apiHelpers, isDebug });

  return { states, setters, apiHelpers, handlers, t };
};

export default useMenu;
