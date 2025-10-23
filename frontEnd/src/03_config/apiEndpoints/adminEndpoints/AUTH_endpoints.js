import { BACKEND_URL } from "../../siteSettings";

const AUTH = {
  // AdminSignIn_helper.js configurations
  SIGNIN: {
    ENDPOINT: `${BACKEND_URL}/api/user/auth/signin`,
    DISPLAY_NAME: "AdminSignIn_helper.js",
    PROPERTIES: (payload) => {
      return {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
    },
  },

  // AdminSignUp_helper.js configurations
  SIGNUP: {
    ENDPOINT: `${BACKEND_URL}/api/user/auth/signup`,
    DISPLAY_NAME: "AdminSignUp_helper.js",
    PROPERTIES: (payload) => {
      return {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
    },
  },

  // AdminSignOut_helper.js configurations
  SIGNOUT: {
    ENDPOINT: `${BACKEND_URL}/api/user/auth/signout`,
    DISPLAY_NAME: "AdminSignOut_helper.js",
    PROPERTIES: {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  },

  // AdminForgotPassword_helper.js configurations
  FORGOT_PASSWORD: {
    ENDPOINT: `${BACKEND_URL}/api/user/auth/forgot-password`,
    DISPLAY_NAME: "AdminForgotPassword_helper.js",
    PROPERTIES: (payload) => {
      return {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
    },
  },

  // AdminResetPassword_helper.js configurations
  RESET_PASSWORD: {
    ENDPOINT: `${BACKEND_URL}/api/user/auth/reset-password`,
    DISPLAY_NAME: "AdminResetPassword_helper.js",
    PROPERTIES: (payload) => {
      return {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
    },
  },

  // AdminAuthCheck_helper.js configurations
  CHECK: {
    ENDPOINT: `${BACKEND_URL}/api/user/auth/check`,
    DISPLAY_NAME: "AdminAuthCheck_helper.js",
    PROPERTIES: {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
};

export default AUTH;
