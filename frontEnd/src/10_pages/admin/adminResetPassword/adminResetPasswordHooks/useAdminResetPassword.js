import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AdminResetPassword_helper } from "../../../../05_helpers/apiHelpers/_apiHelpers.index.js";

export const useAdminResetPassword = (token) => {
  const navigate = useNavigate();
  const { t } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");

  // Form states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tokenValid, setTokenValid] = useState(null); // null = validating, true = valid, false = invalid
  const [isValidating, setIsValidating] = useState(true);
  const [countdown, setCountdown] = useState(4); // 4 second countdown

  // Password visibility
  const [passwordVisible, setPasswordVisible] = useState({
    new: false,
    confirm: false,
  });

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false);
        setIsValidating(false);
        setError("No reset token provided");
        return;
      }

      // For now, just check if token exists
      // Backend will validate when submitting
      setIsValidating(false);
      setTokenValid(true);
    };

    validateToken();
  }, [token]);

  // Countdown timer after success
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      navigate("/admin"); // Redirect to sign-in page, not dashboard
    }
  }, [success, countdown, navigate]);

  // Handle password input change
  const handlePasswordChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "newPassword" || name === "password") {
        setNewPassword(value);
      } else if (name === "confirmPassword") {
        setConfirmPassword(value);
      }
      if (error) setError("");
    },
    [error]
  );

  // Toggle password visibility
  const handlePasswordVisibility_toggle = useCallback((field) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  // Handle form submit
  const handleResetSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      // Client-side validation
      if (!newPassword) {
        setError("Password is required");
        return;
      }

      if (newPassword.length < 10) {
        setError("Password must be at least 10 characters");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setIsLoading(true);
      try {
        const response = await AdminResetPassword_helper(
          token,
          newPassword,
          t,
          tCommon
        );

        if (response && response.success) {
          setSuccess(
            response.message || "Password reset successful! Redirecting..."
          );
          setNewPassword("");
          setConfirmPassword("");
          // Countdown will trigger redirect
        } else {
          setError(
            response?.message ||
              "Failed to reset password. Please try again or request a new link."
          );
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        console.error("Reset password error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [token, newPassword, confirmPassword, t, tCommon]
  );

  // Handle skip countdown (go immediately)
  const handleSkipCountdown = useCallback(() => {
    navigate("/admin");
  }, [navigate]);

  return {
    states: {
      newPassword,
      confirmPassword,
      isLoading,
      error,
      success,
      tokenValid,
      isValidating,
      countdown,
      passwordVisible,
    },
    handlers: {
      handlePasswordChange,
      handlePasswordVisibility_toggle,
      handleResetSubmit,
      handleSkipCountdown,
    },
  };
};
