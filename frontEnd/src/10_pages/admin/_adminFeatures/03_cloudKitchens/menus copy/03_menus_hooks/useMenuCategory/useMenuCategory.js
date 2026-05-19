import { useTranslation } from "react-i18next";
import MENUS_isDebug from "../../menus.config.js";
import useMenuCategory_states from "./useMenuCategory_states.js";
import useMenuCategory_apiHelpers from "./useMenuCategory_apiHelpers.js";
import useMenuCategory_handlers from "./useMenuCategory_handlers.js";

/* ============================================================================
   useMenuCategory — composes states + apiHelpers + handlers for a single Category.

   Usage:
     const { states, handlers, t } = useMenuCategory();

   The shape of states/handlers matches the convention in useMenus.js so the
   downstream UI components can read them the same way.
============================================================================ */

const isDebug = MENUS_isDebug?.hooks;

const useMenuCategory = () => {
  const { t } = useTranslation("menus");
  const { states, setters } = useMenuCategory_states();
  const { apiHelpers } = useMenuCategory_apiHelpers();
  const { handlers } = useMenuCategory_handlers({ states, setters, apiHelpers, isDebug });

  return { states, setters, apiHelpers, handlers, t };
};

export default useMenuCategory;
