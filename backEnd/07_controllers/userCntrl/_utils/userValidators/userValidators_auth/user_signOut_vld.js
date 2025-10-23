import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";

const displayName = " | user_signOut_vld.js | ";
const isDebug = true;

export const user_signOut_vld = (req) => {
  let sanitizedData = {};

  // Check if user has an active session
  if (!req.session || !req.session.user) {
    return request_failed(
      "No active session to sign out",
      req.body,
      displayName,
      isDebug
    );
  }

  isDebug &&
    console.log(
      `✅${displayName}Active session found for user: ${req.session.user._id}`
    );

  return request_success(displayName, isDebug, sanitizedData);
};
