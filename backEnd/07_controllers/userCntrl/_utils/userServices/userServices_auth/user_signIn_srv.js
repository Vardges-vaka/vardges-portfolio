import { User } from "../../../../../06_models/_models.index.js";
import {
  catch_errorHandler_service,
  comparePassword,
  generateJWT,
} from "../../../../../03_services/_services.index.js";

const displayName = " | user_signIn_srv.js | |<=>| ";

export const user_signIn_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug &&
    console.log(`💾💾💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { email, password, rememberMe } = req.body.sanitizedData;

    // 1. Find user by email
    isDebug && console.log(`🔍${displayName}Finding user by email: ${email}`);
    const user = await User.findOne({ email: email });
    if (!user) {
      isDebug && console.log(`❌${displayName}User not found`);
      return {
        success: false,
        message: "Invalid email or password",
        data: null,
      };
    }
    isDebug && console.log(`✅${displayName}User found: ${user._id}`);

    // 2. Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      isDebug && console.log(`❌${displayName}Invalid password`);
      return {
        success: false,
        message: "Invalid email or password",
        data: null,
      };
    }
    isDebug && console.log(`✅${displayName}Password verified`);

    // 3. Create session data
    const session_data = {
      _id: user._id,
      role: user.access.role,
    };

    // 4. Generate JWT token if rememberMe is true
    let token = null;
    if (rememberMe) {
      token = generateJWT({ _id: user._id, role: user.access.role });
      isDebug && console.log(`✅${displayName}JWT token generated`);
    }

    // 5. Return success with user data
    return {
      success: true,
      message: "Sign in successful",
      data: {
        user: {
          name: user.name,
          role: user.access.role,
        },
      },
      session_data: session_data,
      token: token,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
