import { useMemo, useState, useCallback } from "react";

export const useAdminWelcome_apiHelpers = () => {
  const admin_signin = () => {};
  const admin_signup = () => {};
  const admin_forgotPassword = () => {};

  return {
    api_helpers: {
      admin_signin,
      admin_signup,
      admin_forgotPassword,
    },
  };
};
