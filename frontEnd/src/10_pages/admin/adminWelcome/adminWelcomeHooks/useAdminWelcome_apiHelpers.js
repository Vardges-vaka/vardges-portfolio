import { useMemo, useState, useCallback } from "react";
import {
  AdminSignIn_helper,
  AdminSignUp_helper,
  AdminSignOut_helper,
} from "../../../../05_helpers/apiHelpers/_apiHelpers.index.js";

export const useAdminWelcome_apiHelpers = () => {
  const adminSignin_submit = () => {};
  const adminForgotPassword_submit = () => {};

  const adminSignup_submit = useCallback(async (payload) => {
    try {
      const response = await AdminSignUp_helper(payload);
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
      adminSignup_submit,
      adminForgotPassword_submit,
    },
  };
};
