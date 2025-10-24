import { useAdminSignIn_handlers } from "./useAdminSignIn_handlers.js";

export const useAdminSignIn = ({
  states,
  setters,
  api_helpers,
  translations,
  userContext,
  navigate,
}) => {
  const { tValidators, tAdminWelcome } = translations;

  // const { states, setters } = useAdminSignIn_states();
  const { handlers } = useAdminSignIn_handlers({
    states,
    setters,
    api_helpers,
    userContext,
    navigate,
    tValidators,
  });

  return {
    states: {
      adminSigninForm: states.adminSigninForm,
      passwordVisible: states.passwordVisible,
      showForgotPassword: states.showForgotPassword,
      forgotPasswordEmail: states.forgotPasswordEmail,
    },
    handlers: {
      handleSignin_change: handlers.handleSignin_change,
      handleCheckbox_change: handlers.handleCheckbox_change,
      handlePasswordVisibility_toggle: handlers.handlePasswordVisibility_toggle,
      handleToggleForgotPassword: handlers.handleToggleForgotPassword,
      handleForgotPswdEmail_change: handlers.handleForgotPswdEmail_change,
      handleSignin_submit: handlers.handleSignin_submit,
      handleForgotPassword_submit: handlers.handleForgotPassword_submit,
    },
    status: {
      error: states.error,
      success: states.success,
      isLoading: states.isLoading,
    },
    t: tAdminWelcome,
  };
};
