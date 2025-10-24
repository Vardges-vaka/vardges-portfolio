import { User } from "../../../../../06_models/_models.index.js";
import {
  catch_errorHandler_service,
  generateJWT,
} from "../../../../../03_services/_services.index.js";
import {
  JWT_RESET_EXPIRY,
  FRONTEND_URL,
} from "../../../../../00_config/_config.index.js";

const displayName = " | user_forgotPassword_srv.js | |<=>| ";

export const user_forgotPassword_srv = async (req, isDebug) => {
  try {
    const { email } = req.body.sanitizedData;

    const user = await User.findOne({ email: email });

    // Generate JWT token with userId and type
    const resetToken = generateJWT(
      {
        userId: user._id,
        type: "password-reset",
      },
      JWT_RESET_EXPIRY
    );

    // Create reset link
    const resetLink = `${FRONTEND_URL}/admin/reset-password/${resetToken}`;

    // TODO: Send email with reset link
    // For now, console.log the link

    console.log("PASSWORD RESET LINK");
    console.log("=".repeat(80));
    console.log(`Email: ${email}`);
    console.log(`User ID: ${user.name}`);
    console.log(`Reset Link: ${resetLink}`);
    console.log(`Token Expiry: ${JWT_RESET_EXPIRY}`);
    console.log("=".repeat(80) + "\n");

    return {
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
      data: null,
    };
  } catch (error) {
    return catch_errorHandler_service(error, displayName, isDebug);
  }
};
