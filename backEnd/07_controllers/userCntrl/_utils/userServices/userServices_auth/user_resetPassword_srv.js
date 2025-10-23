import { User, Access } from "../../../../../06_models/_models.index.js";
import {
  catch_errorHandler_service,
  verifyJWT,
  hashPassword,
} from "../../../../../03_services/_services.index.js";

const displayName = " | user_resetPassword_srv.js | |<=>| ";

export const user_resetPassword_srv = async (req, isDebug) => {
  try {
    const { token, newPassword } = req.body.sanitizedData;

    // 1. Get Access document to check blacklist
    const accessDoc = await Access.findOne();
    if (!accessDoc) {
      return {
        success: false,
        message: "System error. Please contact administrator.",
        data: null,
      };
    }

    // 2. Check if token is in blacklist (already used)
    const isBlacklisted =
      accessDoc.blacklist?.tokens?.pswReset?.includes(token);
    if (isBlacklisted) {
      console.log(`${displayName} Attempted reuse of blacklisted token`);
      return {
        success: false,
        message: "Reset link already used. Please request a new one.",
        data: null,
      };
    }

    // 3. Verify JWT token (signature + expiry)
    const decoded = verifyJWT(token);
    if (!decoded) {
      return {
        success: false,
        message: "Reset link is expired or invalid. Please request a new one.",
        data: null,
      };
    }

    // 4. Verify token type
    if (decoded.type !== "password-reset") {
      console.log(`${displayName} Invalid token type: ${decoded.type}`);
      return {
        success: false,
        message: "Invalid reset link.",
        data: null,
      };
    }

    // 5. Extract userId from token payload
    const { userId } = decoded;

    // 6. Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "Invalid reset link. User not found.",
        data: null,
      };
    }

    // 7. Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // 8. Update user password
    user.password = hashedPassword;

    // 9. Update password reset metadata
    if (!user.passwordReset) {
      user.passwordReset = {};
    }
    user.passwordReset.lastResetAt = new Date();
    user.passwordReset.resetCount = (user.passwordReset.resetCount || 0) + 1;

    await user.save();

    // 10. Add token to blacklist
    if (!accessDoc.blacklist) {
      accessDoc.blacklist = { tokens: { pswReset: [], logOut: [] }, ips: [] };
    }
    if (!accessDoc.blacklist.tokens) {
      accessDoc.blacklist.tokens = { pswReset: [], logOut: [] };
    }
    if (!accessDoc.blacklist.tokens.pswReset) {
      accessDoc.blacklist.tokens.pswReset = [];
    }

    accessDoc.blacklist.tokens.pswReset.push(token);
    await accessDoc.save();

    console.log(
      `${displayName} Password successfully reset for user: ${user.email}`
    );

    return {
      success: true,
      message: "Password reset successful. You can now sign in.",
      data: null,
    };
  } catch (error) {
    return catch_errorHandler_service(error, displayName, isDebug);
  }
};
