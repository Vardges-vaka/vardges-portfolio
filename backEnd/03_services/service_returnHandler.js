export const catch_errorHandler_service = (name, isDebug, error) => {
  const displayName = name ? `🚫 🚫 🚫${name}` : "UnSpecified Service Field";

  isDebug && console.error(`${displayName}<=>| [catch (ERROR)]`, error);

  throw new Error(error.message || "Internal Server Error in Service");
};
