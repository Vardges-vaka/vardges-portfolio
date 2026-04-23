import { useTranslation } from "react-i18next";
import { useDailySales_states } from "./useDailySales_states.js";
import { useDailySales_handlers } from "./useDailySales_handlers.js";
import { useDailySales_apiHelpers } from "./useDailySales_apiHelpers.js";

export const useDailySales = () => {
  // --- Translations ---
  // Extract all translation namespaces this page needs.
  // If you need more than one namespace, add them here:
  //   const { t: tCommon } = useTranslation("common");
  //   const { t: tValidation } = useTranslation("validation");
  const { t } = useTranslation("xXX");

  const { states, setters } = useDailySales_states();
  const { apiHelpers } = useDailySales_apiHelpers();
  const { handlers } = useDailySales_handlers(states, setters, apiHelpers);

  const DailySales_YYY_ZZZ_props = {
    states: { sampleState: states.sampleState },
    handlers: { handleSample: handlers.handleSample },
    t,
  };

  const DailySales_YYY_props = {
    states: { sampleState: states.sampleState, otherState: states.otherState },
    handlers: { handleSample: handlers.handleSample },
    t,
    childProps: {
      DailySales_YYY_ZZZ_props,
    },
  };

  return {
    t,
    states,
    handlers,
    compProps: {
      DailySales_YYY_props,
      // DailySales_AAA_props,  ← add more component props here as needed
    },
  };
};
