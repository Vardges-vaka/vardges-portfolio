import validator from "validator";

export const email_vld = (email) => {
  let isValid = true;
  let message = "Email is Valid ✅";

  if (!email || typeof email !== "string") {
    isValid = false;
    message = "Email is required";
    return { isValid, message };
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (!validator.isEmail(trimmedEmail)) {
    isValid = false;
    message = "Invalid email format";
    return { isValid, message };
  }
  return { isValid, message };
};
