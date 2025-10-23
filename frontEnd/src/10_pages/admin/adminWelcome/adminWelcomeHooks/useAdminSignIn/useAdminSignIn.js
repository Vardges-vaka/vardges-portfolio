import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdminSignIn_helper,
  AdminForgotPassword_helper,
} from "../../../../../05_helpers/apiHelpers/_apiHelpers.index.js";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../../02_context/context.index.js";
export const useAdminSignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { login } = useUserContext();

  // Form data state
  const [adminSigninForm, setAdminSigninForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password visibility state
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Forgot password view state
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Forgot password email state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  // Toggle forgot password view
  const handleToggleForgotPassword = useCallback(() => {
    setShowForgotPassword((prev) => !prev);
    setError("");
    setSuccess("");
    setForgotPasswordEmail("");
  }, []);

  // Handle forgot password email change
  const handleForgotPasswordEmail_change = useCallback(
    (e) => {
      setForgotPasswordEmail(e.target.value);
      if (error) setError("");
    },
    [error]
  );

  // Handle forgot password submit
  const handleForgotPassword_submit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      // Validation
      if (!forgotPasswordEmail.trim()) {
        setError("Email is required");
        return;
      }

      setIsLoading(true);
      try {
        const response = await AdminForgotPassword_helper(
          forgotPasswordEmail,
          t,
          tCommon
        );

        if (response && response.success) {
          setSuccess(
            response.message ||
              "If an account with that email exists, a password reset link has been sent."
          );
          // Clear form and return to sign-in after 3 seconds
          setTimeout(() => {
            setForgotPasswordEmail("");
            setShowForgotPassword(false);
            setSuccess("");
          }, 3000);
        } else {
          setError(response?.message || "Failed to send reset link.");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        console.error("Forgot password error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [forgotPasswordEmail, t, tCommon]
  );

  // Handle input changes for text fields
  const handleSignin_change = useCallback(
    (e) => {
      setAdminSigninForm({
        ...adminSigninForm,
        [e.target.name]: e.target.value,
      });
      // Clear error when user starts typing
      if (error) setError("");
    },
    [adminSigninForm, error]
  );

  // Handle checkbox change for rememberMe
  const handleCheckbox_change = useCallback(
    (e) => {
      setAdminSigninForm({
        ...adminSigninForm,
        rememberMe: e.target.checked,
      });
    },
    [adminSigninForm]
  );

  // Toggle password visibility
  const handlePasswordVisibility_toggle = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  // Form submission
  const handleSignin_submit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clear previous messages
      setError("");
      setSuccess("");

      // Client-side validation
      if (!adminSigninForm.email.trim()) {
        setError("Email is required");
        return;
      }
      if (!adminSigninForm.password) {
        setError("Password is required");
        return;
      }

      // Submit to API
      setIsLoading(true);
      try {
        // Map form fields to backend payload format
        const payload = {
          email: adminSigninForm.email,
          password: adminSigninForm.password,
          rememberMe: adminSigninForm.rememberMe,
        };

        const response = await AdminSignIn_helper(payload, t, tCommon);

        if (response && response.success) {
          setSuccess(response.message || "Sign in successful!");
          
          // Update user context with the returned user data
          // Backend returns: { payload: { user: { _id, name, role } } }
          if (response.data?.user) {
            login({
              _id: response.data.user._id,
              name: response.data.user.name,
              role: response.data.user.role,
            });
          }
          
          // Redirect to dashboard
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        } else {
          setError(response?.message || "Sign in failed. Please try again.");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        console.error("Sign in error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [adminSigninForm, navigate, login, t, tCommon]
  );

  return {
    states: {
      adminSigninForm,
      isLoading,
      error,
      success,
      passwordVisible,
      showForgotPassword,
      forgotPasswordEmail,
    },
    setters: {
      setAdminSigninForm,
    },
    handlers: {
      handleSignin_submit,
      handleSignin_change,
      handleCheckbox_change,
      handlePasswordVisibility_toggle,
      handleToggleForgotPassword,
      handleForgotPasswordEmail_change,
      handleForgotPassword_submit,
    },
  };
};
