import { User, Access } from "../../../../../06_models/_models.index.js";
import {
  catch_errorHandler_service,
  verifyJWT,
} from "../../../../../03_services/_services.index.js";

const displayName = " | user_authCheck_srv.js | |<=>| ";

export const user_authCheck_srv = async (req, isDebug) => {
  try {
    // 1. Check session first (most secure, server-side)
    if (req.session?.user) {
      isDebug &&
        console.log(
          `${displayName} User authenticated via session:`,
          req.session.user
        );
      return {
        success: true,
        message: "Authenticated via session",
        data: {
          name: req.session.user.name,
          role: req.session.user.role,
        },
      };
    }

    // 2. Check JWT cookie (remember me functionality)
    const token = req.cookies?.authToken;
    if (!token) {
      isDebug && console.log(`${displayName} No authentication found`, token);
      return {
        success: false,
        message: "Not authenticated",
        data: null,
      };
    }

    // 3. Check if JWT is blacklisted
    const accessDoc = await Access.findOne();
    if (accessDoc?.blacklist?.tokens?.logOut?.includes(token)) {
      isDebug && console.log(`${displayName} JWT token is blacklisted`);
      return {
        success: false,
        message: "Token has been revoked",
        data: null,
      };
    }

    // 4. Verify JWT signature and expiry
    const decoded = verifyJWT(token);
    if (!decoded) {
      isDebug && console.log(`${displayName} JWT verification failed`);
      return {
        success: false,
        message: "Invalid or expired token",
        data: null,
      };
    }

    // 5. Get user data from database to ensure user still exists
    const user = await User.findById(decoded._id);
    if (!user) {
      isDebug && console.log(`${displayName} User not found for token`);
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    req.session.user = {
      _id: user._id,
      role: user.access.role,
    };

    isDebug &&
      console.log(`${displayName} User authenticated via JWT:`, user.name);

    return {
      success: true,
      message: "Authenticated via JWT",
      data: {
        name: user.name,
        role: user.access.role,
      },
    };
  } catch (error) {
    return catch_errorHandler_service(error, displayName, isDebug);
  }
};
