import {
  catch_errorHandler_service,
  clearJWT_Cookie,
} from "../../../../../03_services/_services.index.js";
import { isProduction } from "../../../../../00_config/_config.index.js";
import { Access } from "../../../../../06_models/_models.index.js";

const displayName = " | user_signOut_srv.js | |<=>| ";

export const user_signOut_srv = async (req, res, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug &&
    console.log(
      `💾💾💾${displayName}[REQUEST] User: ${req.session?.user?._id}`
    );

  try {
    // 1. Add JWT to blacklist if it exists
    const token = req.cookies?.authToken;
    if (token) {
      const accessDoc = await Access.findOne();
      if (accessDoc) {
        // Ensure blacklist structure exists
        if (!accessDoc.blacklist) {
          accessDoc.blacklist = {
            tokens: { pswReset: [], logOut: [] },
            ips: [],
          };
        }
        if (!accessDoc.blacklist.tokens) {
          accessDoc.blacklist.tokens = { pswReset: [], logOut: [] };
        }
        if (!accessDoc.blacklist.tokens.logOut) {
          accessDoc.blacklist.tokens.logOut = [];
        }

        // Add token to blacklist if not already there
        if (!accessDoc.blacklist.tokens.logOut.includes(token)) {
          accessDoc.blacklist.tokens.logOut.push(token);
          await accessDoc.save();
          isDebug && console.log(`✅${displayName}JWT added to blacklist`);
        }
      }
    }

    // 2. Clear JWT cookie
    clearJWT_Cookie(res);
    isDebug && console.log(`✅${displayName}JWT cookie cleared`);

    // 3. Clear session cookie explicitly
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
    });
    isDebug && console.log(`✅${displayName}Session cookie cleared`);

    // 4. Destroy session
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        if (err) {
          isDebug &&
            console.error(`❌${displayName}Session destroy error:`, err);
          return resolve({
            success: false,
            message: "Error signing out",
            data: null,
          });
        }

        isDebug && console.log(`✅${displayName}Session destroyed`);
        return resolve({
          success: true,
          message: "Signed out successfully",
          data: null,
        });
      });
    });
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
