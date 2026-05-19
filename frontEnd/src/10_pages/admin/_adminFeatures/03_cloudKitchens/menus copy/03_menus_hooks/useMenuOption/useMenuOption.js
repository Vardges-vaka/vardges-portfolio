import { useTranslation } from "react-i18next";
import MENUS_isDebug from "../../menus.config.js";
import useMenuOption_states from "./useMenuOption_states.js";
import useMenuOption_apiHelpers from "./useMenuOption_apiHelpers.js";
import useMenuOption_handlers from "./useMenuOption_handlers.js";

/* ============================================================================
   useMenuOption — composes states + apiHelpers + handlers for a single Option.

   Usage:
     const { states, handlers, t } = useMenuOption();

   The shape of states/handlers matches the convention in useMenus.js so the
   downstream UI components can read them the same way.
============================================================================ */

const isDebug = MENUS_isDebug?.hooks;

const useMenuOption = () => {
  const { t } = useTranslation("menus");
  const { states, setters } = useMenuOption_states();
  const { apiHelpers } = useMenuOption_apiHelpers();
  const { handlers } = useMenuOption_handlers({ states, setters, apiHelpers, isDebug });

  return { states, setters, apiHelpers, handlers, t };
};

export default useMenuOption;
