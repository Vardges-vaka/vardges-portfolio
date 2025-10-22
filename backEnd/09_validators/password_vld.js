export const password_vld = (password) => {
  let isValid = true;
  let message = "Password is Valid ✅";
  // Validate: password
  if (!password || typeof password !== "string") {
    isValid = false;
    message = "Password is required";
    return { isValid, message };
  }

  // Password requirements (matching PasswordInput.jsx)
  if (password.length < 10) {
    isValid = false;
    message = "Password must be at least 10 characters long";
    return { isValid, message };
  }
  if (!/[A-Z]/.test(password)) {
    isValid = false;
    message = "Password must contain at least one uppercase letter";
    return { isValid, message };
  }
  if (!/[a-z]/.test(password)) {
    isValid = false;
    message = "Password must contain at least one lowercase letter";
    return { isValid, message };
  }
  if (!/[0-9]/.test(password)) {
    isValid = false;
    message = "Password must contain at least one number";
    return { isValid, message };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    isValid = false;
    message = "Password must contain at least one special character";
    return { isValid, message };
  }
  return { isValid, message };
};
