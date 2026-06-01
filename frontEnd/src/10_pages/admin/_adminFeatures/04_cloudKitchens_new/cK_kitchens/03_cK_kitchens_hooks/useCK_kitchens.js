import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_kitchens_states,
  useCK_kitchens_apiHelpers,
  useCK_kitchens_handlers,
} from "./_cK_kitchens_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_kitchens = () => {
  const { t } = useTranslation("kitchens");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_kitchens_states();
  const { apiHelpers } = useCK_kitchens_apiHelpers();
  const { handlers } = useCK_kitchens_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
