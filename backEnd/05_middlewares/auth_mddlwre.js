import { Access } from "../06_models/_models.index.js";
import { verifyJWT } from "../03_services/_services.index.js";

const displayName = " | auth_mddlwre.js | |<=>| ";
const isDebug = false;

export const auth_mddlwre = async (req, res, next) => {
  try {
    // 1. Check session first (server-side storage, most secure)
    if (req.session?.user) {
      // req.user = req.session.user;
      isDebug &&
        console.log(
          `${displayName} User authenticated via session:`,
          req.session.user,
        );
      return next();
    }

    // 2. Check JWT cookie
    const token = req.cookies?.authToken;
    if (!token) {
      isDebug && console.log(`${displayName} No auth token found`);
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // 3. Check blacklist
    const accessDoc = await Access.findOne();
    if (accessDoc?.blacklist?.tokens?.logOut?.includes(token)) {
      isDebug && console.log(`${displayName} Token is blacklisted`);
      return res.status(401).json({
        success: false,
        message: "Token has been revoked",
      });
    }

    // 4. Verify JWT
    const decoded = verifyJWT(token);
    if (!decoded) {
      isDebug && console.log(`${displayName} JWT verification failed`);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 5. Attach user to request
    req.session.user = {
      _id: decoded._id,
      role: decoded.role,
    };

    isDebug &&
      console.log(
        `${displayName} User authenticated via JWT:`,
        req.session.user,
      );

    next();
  } catch (error) {
    isDebug && console.error(`${displayName} Error:`, error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
  }
};
