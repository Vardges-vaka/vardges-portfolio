import { useTranslation } from "react-i18next";
import MENUS_isDebug from "../../menus.config.js";
import useMenuItem_states from "./useMenuItem_states.js";
import useMenuItem_apiHelpers from "./useMenuItem_apiHelpers.js";
import useMenuItem_handlers from "./useMenuItem_handlers.js";

/* ============================================================================
   useMenuItem — composes states + apiHelpers + handlers for a single Menu Item.

   Usage:
     const { states, handlers, t } = useMenuItem();

   The shape of states/handlers matches the convention in useMenus.js so the
   downstream UI components can read them the same way.
============================================================================ */

const isDebug = MENUS_isDebug?.hooks;

const useMenuItem = () => {
  const { t } = useTranslation("menus");
  const { states, setters } = useMenuItem_states();
  const { apiHelpers } = useMenuItem_apiHelpers();
  const { handlers } = useMenuItem_handlers({ states, setters, apiHelpers, isDebug });

  return { states, setters, apiHelpers, handlers, t };
};

export default useMenuItem;
