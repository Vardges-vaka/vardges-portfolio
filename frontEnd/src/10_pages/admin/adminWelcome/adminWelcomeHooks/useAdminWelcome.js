import { useMemo, useState, useCallback, useEffect } from "react";

import {
  useAdminWelcome_states,
  useAdminWelcome_apiHelpers,
  useAdminWelcome_handlers,
} from "./_adminWelcomeHooks.index";

export const useAdminWelcome = () => {
  const { states, setters } = useAdminWelcome_states();
  const { api_helpers } = useAdminWelcome_apiHelpers();
  const { handlers } = useAdminWelcome_handlers({
    states,
    setters,
    api_helpers,
  });

  return {
    signup_props: {},
    signin_props: {},
    forgotPassword_props: {},
  };
};
