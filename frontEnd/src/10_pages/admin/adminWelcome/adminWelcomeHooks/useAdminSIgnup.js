import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AdminSignUp_helper } from "../../../../05_helpers/apiHelpers/_apiHelpers.index.js";
import { useUserContext } from "../../../../02_context/context.index.js";

export const useAdminSignup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { login } = useUserContext();
  // Form data state
  const [adminSignupForm, setAdminSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    key: "",
    name: "",
    rememberMe: false,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password visibility states
  const [passwordVisible, setPasswordVisible] = useState({
    new: false,
    confirm: false,
  });

  // Handle input changes for text fields
  const handleSignup_change = useCallback(
    (e) => {
      setAdminSignupForm({
        ...adminSignupForm,
        [e.target.name]: e.target.value,
      });
      // Clear error when user starts typing
      if (error) setError("");
    },
    [adminSignupForm, error]
  );

  // Handle checkbox change for rememberMe
  const handleCheckbox_change = useCallback(
    (e) => {
      setAdminSignupForm({
        ...adminSignupForm,
        rememberMe: e.target.checked,
      });
    },
    [adminSignupForm]
  );

  // Toggle password visibility
  const handlePasswordVisibility_toggle = useCallback((field) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  // Form submission
  const handleSignup_submit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clear previous messages
      setError("");
      setSuccess("");

      // Client-side validation
      if (!adminSignupForm.name.trim()) {
        setError("Name is required");
        return;
      }
      if (!adminSignupForm.email.trim()) {
        setError("Email is required");
        return;
      }
      if (!adminSignupForm.password) {
        setError("Password is required");
        return;
      }
      if (!adminSignupForm.confirmPassword) {
        setError("Please confirm your password");
        return;
      }
      if (adminSignupForm.password !== adminSignupForm.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!adminSignupForm.key.trim()) {
        setError("Access code is required");
        return;
      }

      // Submit to API
      setIsLoading(true);
      try {
        // Map form fields to backend payload format
        const payload = {
          name: adminSignupForm.name,
          email: adminSignupForm.email,
          password: adminSignupForm.password,
          accessCode: adminSignupForm.key, // Note: key → accessCode for backend
          rememberMe: adminSignupForm.rememberMe,
        };

        const response = await AdminSignUp_helper(payload, t, tCommon);

        if (response && response.success) {
          setSuccess(response.message || "Signup successful!");

          // Update user context with the returned user data
          // Backend returns: { payload: { user: { _id, name, role } } }
          if (response.data?.user) {
            login({
              _id: response.data.user._id,
              name: response.data.user.name,
              role: response.data.user.role,
            });
          }

          // Clear form on success
          setAdminSignupForm({
            email: "",
            password: "",
            confirmPassword: "",
            key: "",
            name: "",
            rememberMe: false,
          });
          // Redirect to dashboard
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        } else {
          setError(response?.message || "Signup failed. Please try again.");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        console.error("Signup error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [adminSignupForm, navigate, login, t, tCommon]
  );

  return {
    states: {
      adminSignupForm,
      isLoading,
      error,
      success,
      passwordVisible,
    },
    setters: {
      setAdminSignupForm,
    },
    handlers: {
      handleSignup_submit,
      handleSignup_change,
      handleCheckbox_change,
      handlePasswordVisibility_toggle,
    },
  };
};
