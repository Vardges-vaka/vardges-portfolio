import { User, Access } from "../../../../../06_models/_models.index.js";
import {
  catch_errorHandler_service,
  hashPassword,
  generateJWT,
} from "../../../../../03_services/_services.index.js";

const displayName = " | user_signUp_srv.js | |<=>| ";

export const user_signUp_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug &&
    console.log(`💾💾💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { name, email, password, accessCode, hashedCode, rememberMe, role } =
      req.body.sanitizedData;

    // 1. Fetch Access document from DB
    const accessDoc = await Access.findOne();

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return {
        success: false,
        message: "Email already registered",
        data: null,
      };
    }

    // 3. Hash the password
    const hashedPassword = await hashPassword(password);

    // 4. Create new User document
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      access: {
        role: role,
        position: null, // Can be set later
        usedCode: accessCode, // Store PLAIN TEXT code for reference
        usedAt: new Date(),
        usedIP: req.ip || req.connection.remoteAddress || "Unknown",
      },
    });

    // 5. Save User to database
    await newUser.save();
    isDebug &&
      console.log(`✅${displayName}User created with ID: ${newUser._id}`);

    // 6. Remove HASHED code from Access.newCodes[role] array
    accessDoc.newCodes[role] = accessDoc.newCodes[role].filter(
      (code) => code !== hashedCode // Remove the HASHED version from DB
    );

    // 7. Add entry to Access.usedCodes with metadata
    accessDoc.usedCodes.push({
      code: accessCode,
      role: role,
      usedAt: new Date(),
      usedIP: req.ip || req.connection.remoteAddress || "Unknown",
      userId: newUser._id,
      userAgent: req.headers["user-agent"] || "Unknown",
      accountEmail: email,
      accountName: name,
    });

    // 8. Save Access document
    await accessDoc.save();

    // Set session data
    const session_data = {
      _id: newUser._id,
      role: role,
    };
    let token = null;
    rememberMe && (token = generateJWT({ _id: newUser._id, role: role }));

    return {
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          name: newUser.name,
          role: role,
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
