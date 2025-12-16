import { Project } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";

const displayName = " | project_getAll_srv.js | |<=>| ";

export const project_getAll_srv = async (req, isDebug) => {
  isDebug &&
    console.log(`▄︻デ══━一💥${displayName}[STARTED] ... Finding all Projects`);

  try {
    const projects = await Project.find({});

    if (!projects || projects.length === 0) {
      return {
        success: true,
        message: "There are no projects",
        data: {
          projects: [],
        },
      };
    }

    isDebug &&
      console.log(
        `✅${displayName}Projects found [projects.length]: ${projects.length}`,
        projects
      );

    return {
      success: true,
      message: "Project found Successfully",
      data: {
        projects: projects,
      },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
