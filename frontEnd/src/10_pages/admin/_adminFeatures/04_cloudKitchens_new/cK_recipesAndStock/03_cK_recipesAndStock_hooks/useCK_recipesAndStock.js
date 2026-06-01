import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_recipesAndStock_states,
  useCK_recipesAndStock_apiHelpers,
  useCK_recipesAndStock_handlers,
} from "./_cK_recipesAndStock_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_recipesAndStock = () => {
  const { t } = useTranslation("recipesAndStock");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_recipesAndStock_states();
  const { apiHelpers } = useCK_recipesAndStock_apiHelpers();
  const { handlers } = useCK_recipesAndStock_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
