import { Project } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";

const displayName = " | project_add_srv.js | |<=>| ";

export const project_add_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const sanitizedProject = req.body.sanitizedData;

    const project = new Project({ ...sanitizedProject });
    await project.save();

    isDebug && console.log(`✅${displayName}Project added: ${project._id}`);

    return {
      success: true,
      message: "Project added Successfully",
      data: {
        projectId: project._id,
      },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
