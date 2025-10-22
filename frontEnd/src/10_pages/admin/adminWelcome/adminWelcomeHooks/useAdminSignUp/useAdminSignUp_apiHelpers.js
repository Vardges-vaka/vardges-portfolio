import { useCallback } from "react";
import { AdminSignUp_helper } from "../../../../../05_helpers/apiHelpers/_apiHelpers.index.js";

export const useAdminSignUp_apiHelpers = () => {
  const adminSignUp_submit = useCallback(async (formData) => {
    try {
      // Map form fields to backend payload format
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        accessCode: formData.key, // Note: key → accessCode for backend
        rememberMe: formData.rememberMe,
      };

      const response = await AdminSignUp_helper(payload);
      
      // Return response regardless of success/failure
      return response;
    } catch (error) {
      console.error("adminSignup_submit error:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
      };
    }
  }, []);

  return {
    api_helpers: {
      adminSignUp_submit,
    },
  };
};
