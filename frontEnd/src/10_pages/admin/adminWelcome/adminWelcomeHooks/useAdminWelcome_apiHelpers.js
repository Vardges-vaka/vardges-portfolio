import { useMemo, useState, useCallback } from "react";
import {
  AdminSignIn_helper,
  AdminSignUp_helper,
  AdminForgotPassword_helper,
} from "../../../../05_helpers/apiHelpers/_apiHelpers.index.js";

export const useAdminWelcome_apiHelpers = ({ translations }) => {
  const { tValidators, tCommon, tAdminWelcome } = translations;

  const adminForgotPassword_submit = useCallback(
    async (email, setSuccess, setError, setIsLoading) => {
      setIsLoading(true);
      try {
        const response = await AdminForgotPassword_helper(
          email,
          tValidators,
          tCommon
        );

        if (response && response.success) {
          setSuccess(
            response.message ||
              tAdminWelcome("adminSignin.forgotPassword.success")
          );
          return response;
        } else {
          setError(
            response?.message ||
              tAdminWelcome("adminSignin.forgotPassword.error")
          );
        }
      } catch (err) {
        setError(tAdminWelcome("adminSignin.forgotPassword.error"));
        console.error("Forgot password error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [tValidators, tCommon, tAdminWelcome]
  );

  const adminSignin_submit = useCallback(
    async (payload, setSuccess, setError, setIsLoading) => {
      setIsLoading(true);
      try {
        const response = await AdminSignIn_helper(
          payload,
          tValidators,
          tCommon
        );

        if (response && response.success) {
          setSuccess(
            response.message || tAdminWelcome("adminSignin.signin.success")
          );
        } else {
          setError(
            response?.message || tAdminWelcome("adminSignin.signin.error")
          );
        }
        return response;
      } catch (err) {
        setError(tAdminWelcome("adminSignin.signin.error"));
        console.error("Sign in error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [tValidators, tCommon, tAdminWelcome]
  );

  const adminSignup_submit = useCallback(
    async (payload, setSuccess, setError, setIsLoading) => {
      setIsLoading(true);
      try {
        const response = await AdminSignUp_helper(
          payload,
          tValidators,
          tCommon
        );

        if (response && response.success) {
          setSuccess(
            response.message || tAdminWelcome("adminSignup.signup.success")
          );
        } else {
          setError(
            response?.message || tAdminWelcome("adminSignup.signup.error")
          );
        }
        return response;
      } catch (err) {
        setError(tAdminWelcome("adminSignup.signup.errorUnexpected"));
        console.error("Signup error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [AdminSignUp_helper, tAdminWelcome]
  );

  return {
    api_helpers: {
      adminSignin_submit,
      adminForgotPassword_submit,
      adminSignup_submit,
    },
  };
};
