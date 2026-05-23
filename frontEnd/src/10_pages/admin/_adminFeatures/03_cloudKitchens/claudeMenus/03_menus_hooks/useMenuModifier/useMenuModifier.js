import { useTranslation } from "react-i18next";
import MENUS_isDebug from "../../menus.config.js";
import useMenuModifier_states from "./useMenuModifier_states.js";
import useMenuModifier_apiHelpers from "./useMenuModifier_apiHelpers.js";
import useMenuModifier_handlers from "./useMenuModifier_handlers.js";

/* ============================================================================
   useMenuModifier — composes states + apiHelpers + handlers for a single Modifier.

   Usage:
     const { states, handlers, t } = useMenuModifier();

   The shape of states/handlers matches the convention in useMenus.js so the
   downstream UI components can read them the same way.
============================================================================ */

const isDebug = MENUS_isDebug?.hooks;

const useMenuModifier = () => {
  const { t } = useTranslation("menus");
  const { states, setters } = useMenuModifier_states();
  const { apiHelpers } = useMenuModifier_apiHelpers();
  const { handlers } = useMenuModifier_handlers({ states, setters, apiHelpers, isDebug });

  return { states, setters, apiHelpers, handlers, t };
};

export default useMenuModifier;
