import { useAdminSignUp_handlers } from "./useAdminSignUp_handlers.js";

export const useAdminSignup = ({
  states,
  setters,
  api_helpers,
  translations,
  userContext,
  navigate,
}) => {
  const { tValidators, tAdminWelcome } = translations;

  // const { states, setters } = useAdminSignIn_states();
  const { handlers } = useAdminSignUp_handlers({
    states,
    setters,
    api_helpers,
    userContext,
    navigate,
    tValidators,
  });

  return {
    states: {
      adminSignupForm: states.adminSignupForm,
      isLoading: states.isLoading,
      error: states.error,
      success: states.success,
      passwordVisible: states.passwordVisible,
    },
    setters: {
      setAdminSignupForm: setters.setAdminSignupForm,
    },
    handlers: {
      handleSignup_submit: handlers.handleSignup_submit,
      handleSignup_change: handlers.handleSignup_change,
      handleCheckbox_change: handlers.handleCheckbox_change,
      handlePasswordVisibility_toggle: handlers.handlePasswordVisibility_toggle,
    },
    t: tAdminWelcome,
  };
};
