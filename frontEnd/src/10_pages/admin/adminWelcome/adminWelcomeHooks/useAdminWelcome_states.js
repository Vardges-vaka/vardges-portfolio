import { useState } from "react";

export const useAdminWelcome_states = () => {
  const [activeForm, setActiveForm] = useState("signin");

  const [adminSignupForm, setAdminSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    key: "",
    name: "",
    rememberMe: false,
  });
  const [adminSigninForm, setAdminSigninForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [pswdVisible_signIn, setPswdVisible_signIn] = useState({
    new: false,
    confirm: false,
  });
  const [pswdVisible_signUp, setPswdVisible_signUp] = useState({
    new: false,
    confirm: false,
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return {
    states: {
      signIn: {
        adminSigninForm,
        isLoading,
        error,
        success,
        showForgotPassword,
        forgotPasswordEmail,
        passwordVisible: pswdVisible_signIn,
      },
      signUp: {
        adminSignupForm,
        isLoading,
        error,
        success,
        passwordVisible: pswdVisible_signUp,
      },
      activeForm,
    },
    setters: {
      signIn: {
        setAdminSigninForm,
        setIsLoading,
        setError,
        setSuccess,
        setPasswordVisible: setPswdVisible_signIn,
        setShowForgotPassword,
        setForgotPasswordEmail,
      },
      signUp: {
        setAdminSignupForm,
        setIsLoading,
        setError,
        setSuccess,
        setPasswordVisible: setPswdVisible_signUp,
      },
      setActiveForm,
    },
  };
};
