import { useCallback } from "react";

export const useAdminSignIn_handlers = ({
  states,
  setters,
  api_helpers,
  userContext,
  navigate,
  tValidators,
}) => {
  const handleToggleForgotPassword = useCallback(() => {
    setters.setShowForgotPassword((prev) => !prev);
    setters.setError("");
    setters.setSuccess("");
    setters.setForgotPasswordEmail("");
  }, []);

  const handleForgotPswdEmail_change = useCallback(
    (e) => {
      setters.setForgotPasswordEmail(e.target.value);
      if (states.error) setters.setError("");
    },
    [states.error]
  );

  const handleSignin_change = useCallback(
    (e) => {
      setters.setAdminSigninForm({
        ...states.adminSigninForm,
        [e.target.name]: e.target.value,
      });
      if (states.error) setters.setError("");
    },
    [states.adminSigninForm, states.error]
  );

  const handleCheckbox_change = useCallback(
    (e) => {
      setters.setAdminSigninForm({
        ...states.adminSigninForm,
        rememberMe: e.target.checked,
      });
    },
    [states.adminSigninForm]
  );

  const handlePasswordVisibility_toggle = useCallback(() => {
    setters.setPasswordVisible((prev) => !prev);
  }, []);

  const handleForgotPassword_submit = useCallback(
    async (e) => {
      e.preventDefault();
      setters.setError("");
      setters.setSuccess("");

      if (!states.forgotPasswordEmail.trim()) {
        setters.setError(tValidators("emailRequired"));
        return;
      }

      const response = await api_helpers.adminForgotPassword_submit(
        states.forgotPasswordEmail,
        setters.setSuccess,
        setters.setError,
        setters.setIsLoading
      );

      response &&
        setTimeout(() => {
          setters.setForgotPasswordEmail("");
          setters.setShowForgotPassword(false);
          setters.setSuccess("");
        }, 3000);
    },
    [
      setters.setError,
      setters.setSuccess,
      states.forgotPasswordEmail,
      setters.setIsLoading,
      setters.setShowForgotPassword,
      api_helpers.adminForgotPassword_submit,
      tValidators,
    ]
  );

  // Form submission
  const handleSignin_submit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clear previous messages
      setters.setError("");
      setters.setSuccess("");

      // Client-side validation
      if (!states.adminSigninForm.email.trim()) {
        setters.setError(tValidators("emailRequired"));
        return;
      }
      if (!states.adminSigninForm.password) {
        setters.setError(tValidators("passwordRequired"));
        return;
      }

      const payload = {
        email: states.adminSigninForm.email,
        password: states.adminSigninForm.password,
        rememberMe: states.adminSigninForm.rememberMe,
      };

      const response = await api_helpers.adminSignin_submit(
        payload,
        setters.setSuccess,
        setters.setError,
        setters.setIsLoading
      );

      if (response.data?.user) {
        userContext.login({
          _id: response.data.user._id,
          name: response.data.user.name,
          role: response.data.user.role,
        });
      }

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    },
    [
      states.adminSigninForm.email,
      states.adminSigninForm.password,
      states.adminSigninForm.rememberMe,
      setters.setSuccess,
      setters.setError,
      setters.setIsLoading,
      api_helpers.adminSignin_submit,
      userContext.login,
      navigate,
      tValidators,
    ]
  );

  return {
    handlers: {
      handleToggleForgotPassword,
      handleForgotPswdEmail_change,
      handleForgotPassword_submit,
      handleSignin_change,
      handleCheckbox_change,
      handlePasswordVisibility_toggle,
      handleSignin_submit,
    },
  };
};
