import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_marketing_states,
  useCK_marketing_apiHelpers,
  useCK_marketing_handlers,
} from "./_cK_marketing_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_marketing = () => {
  const { t } = useTranslation("marketing");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_marketing_states();
  const { apiHelpers } = useCK_marketing_apiHelpers();
  const { handlers } = useCK_marketing_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
