import { logger } from "./_services.index.js";

// Import error handling functionality from errorHandlers module
export {
  AppError,
  createValidationError,
  createUnauthorizedError,
  createNotFoundError,
  createDuplicateError,
  createForbiddenError,
  createRateLimitError,
  catch_errorHandler_cntrl,
} from "./errorHandlers/_errorHandlers.index.js";

export const validRespond = (res, debug, name, success, message, data) => {
  // Extract metadata
  const userId = res.locals?.user?.id;
  const statusCode = success ? 200 : 400;

  // Log using Winston logger
  // if (success) {
  //   logger.controller.success(name, data, {
  //     statusCode,
  //     userId,
  //   });
  // } else {
  //   logger.controller.error(name, new Error(message), {
  //     statusCode,
  //     userId,
  //   });
  // }

  // Maintain backward compatibility with console.log
  debug && console.log(`⛟📦🚚${name}[SUCCESS] ${success} |<=>| [DATA]`, data);

  return res.status(statusCode).json({ success, message, payload: data });
};
