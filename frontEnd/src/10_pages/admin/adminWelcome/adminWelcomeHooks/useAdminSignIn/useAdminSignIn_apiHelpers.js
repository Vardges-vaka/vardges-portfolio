import { useMemo, useState, useCallback } from "react";
import {
  AdminSignIn_helper,
  AdminSignUp_helper,
} from "../../../../../05_helpers/apiHelpers/_apiHelpers.index.js";
import { useTranslation } from "react-i18next";

export const useAdminSignIn_apiHelpers = () => {
  const { t } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const adminSignin_submit = () => {};
  const adminForgotPassword_submit = () => {};

  const adminSignup_submit = useCallback(async (payload) => {
    try {
      const response = await AdminSignUp_helper(payload, t, tCommon);
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("adminSignup_submit completed");
    }

    return response;
  }, []);

  return {
    api_helpers: {
      adminSignin_submit,
      adminForgotPassword_submit,
    },
  };
};
