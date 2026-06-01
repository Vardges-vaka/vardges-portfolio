import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_salesAndOrders_states,
  useCK_salesAndOrders_apiHelpers,
  useCK_salesAndOrders_handlers,
} from "./_cK_salesAndOrders_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_salesAndOrders = () => {
  const { t } = useTranslation("salesAndOrders");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_salesAndOrders_states();
  const { apiHelpers } = useCK_salesAndOrders_apiHelpers();
  const { handlers } = useCK_salesAndOrders_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
