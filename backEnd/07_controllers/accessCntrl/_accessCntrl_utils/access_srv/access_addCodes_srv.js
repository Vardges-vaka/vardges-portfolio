import { Access } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";

const displayName = " | access_addCodes_srv.js | |<=>| ";

export const access_addCodes_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug &&
    console.log(`💾💾💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { codes } = req.body.sanitizedData;

    // Check if Access document exists
    let accessDoc = await Access.findOne();

    if (accessDoc) {
      // Update existing document - set superAdmin codes
      accessDoc.newCodes.superAdmin = codes;
      await accessDoc.save();

      isDebug &&
        console.log(`✅${displayName}Updated existing Access document`);
    } else {
      // Create new Access document
      accessDoc = new Access({
        newCodes: {
          superAdmin: codes,
          admin: [],
          user: [],
          guest: [],
        },
        usedCodes: [],
      });
      await accessDoc.save();

      isDebug && console.log(`✅${displayName}Created new Access document`);
    }

    return {
      success: true,
      message: `Successfully added ${codes.length} superAdmin access codes`,
      data: {
        totalSuperAdminCodes: accessDoc.newCodes.superAdmin.length,
        addedCodes: codes.length,
      },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
