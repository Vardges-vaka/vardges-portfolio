import { JWT_COOKIE_OPTIONS } from "../00_config/_config.index.js";

export const setJWT_Cookie = (res, token) => {
  try {
    res.cookie("authToken", token, JWT_COOKIE_OPTIONS);
    return {
      success: true,
      message: "JWT cookie set successfully",
      data: null,
    };
  } catch (error) {
    throw new Error(error.message || "Internal Server Error in setJWT_Cookie");
  }
};
