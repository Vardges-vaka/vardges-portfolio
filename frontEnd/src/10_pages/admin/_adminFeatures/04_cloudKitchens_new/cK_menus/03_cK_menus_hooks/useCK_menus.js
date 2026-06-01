import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_menus_states,
  useCK_menus_apiHelpers,
  useCK_menus_handlers,
} from "./_cK_menus_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_menus = () => {
  const { t } = useTranslation("menus");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_menus_states();
  const { apiHelpers } = useCK_menus_apiHelpers();
  const { handlers } = useCK_menus_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
