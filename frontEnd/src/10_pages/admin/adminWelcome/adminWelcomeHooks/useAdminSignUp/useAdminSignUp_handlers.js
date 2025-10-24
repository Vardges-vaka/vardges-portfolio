import { useCallback } from "react";

export const useAdminSignUp_handlers = ({
  states,
  setters,
  api_helpers,
  userContext,
  navigate,
  tValidators,
}) => {
  const handleSignup_change = useCallback(
    (e) => {
      setters.setAdminSignupForm({
        ...states.adminSignupForm,
        [e.target.name]: e.target.value,
      });
      // Clear error when user starts typing
      if (states.error) setters.setError("");
    },
    [states.adminSignupForm, states.error]
  );

  const handleCheckbox_change = useCallback(
    (e) => {
      setters.setAdminSignupForm({
        ...states.adminSignupForm,
        rememberMe: e.target.checked,
      });
    },
    [states.adminSignupForm]
  );

  const handlePasswordVisibility_toggle = useCallback((field) => {
    setters.setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const handleSignup_submit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clear previous messages
      setters.setError("");
      setters.setSuccess("");

      // Client-side validation
      if (!states.adminSignupForm.name.trim()) {
        setters.setError(tValidators("nameRequired"));
        return;
      }
      if (!states.adminSignupForm.email.trim()) {
        setters.setError(tValidators("emailRequired"));
        return;
      }
      if (!states.adminSignupForm.password) {
        setters.setError(tValidators("passwordRequired"));
        return;
      }
      if (!states.adminSignupForm.confirmPassword) {
        setters.setError(tValidators("confirmPasswordRequired"));
        return;
      }
      if (
        states.adminSignupForm.password !==
        states.adminSignupForm.confirmPassword
      ) {
        setters.setError(tValidators("passwordsDoNotMatch"));
        return;
      }
      if (!states.adminSignupForm.key.trim()) {
        setters.setError(tValidators("keyRequired"));
        return;
      }

      const payload = {
        name: states.adminSignupForm.name,
        email: states.adminSignupForm.email,
        password: states.adminSignupForm.password,
        accessCode: states.adminSignupForm.key,
        rememberMe: states.adminSignupForm.rememberMe,
      };

      const response = await api_helpers.adminSignup_submit(
        payload,
        setters.setSuccess,
        setters.setError,
        setters.setIsLoading
      );

      if (response && response.success) {
        if (response.data?.user) {
          userContext.login({
            _id: response.data.user._id,
            name: response.data.user.name,
            role: response.data.user.role,
          });
        }

        // Clear form on success
        setters.setAdminSignupForm({
          email: "",
          password: "",
          confirmPassword: "",
          key: "",
          name: "",
          rememberMe: false,
        });

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500);
      }
    },
    [
      setters.setSuccess,
      setters.setError,
      setters.setIsLoading,
      states.adminSignupForm,
      userContext.login,
      setters.setAdminSignupForm,
      api_helpers.adminSignup_submit,
      navigate,
    ]
  );

  return {
    handlers: {
      handleSignup_submit,
      handleSignup_change,
      handleCheckbox_change,
      handlePasswordVisibility_toggle,
    },
  };
};
