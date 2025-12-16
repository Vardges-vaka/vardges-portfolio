import {
  PROJECT_TYPES,
  GLOBAL_PRIORITIES,
  DATABASES,
  CLOUD_STORAGES,
} from "../10_constances/_constances.index.js";

export const text_vld = (text, msg) => {
  let isValid = true;
  let message = `${msg} of the Project is Valid ✅`;
  if (!text) {
    isValid = false;
    message = `${msg} of the Project is required`;
    return { isValid, message };
  }
  const { en, ru, hy, ar } = text;

  if (
    !en ||
    !ru ||
    !hy ||
    !ar ||
    typeof en !== "string" ||
    typeof ru !== "string" ||
    typeof hy !== "string" ||
    typeof ar !== "string"
  ) {
    isValid = false;
    message = `${msg} of the Project is required`;
    return { isValid, message };
  }
  if (en.length < 3 || ru.length < 3 || hy.length < 3 || ar.length < 3) {
    message = `${msg} must be at least 3 characters long`;
    isValid = false;
    return { isValid, message };
  }

  return { isValid, message };
};

export const projectType_vld = (type) => {
  let isValid = true;
  let message = `Type of the Project is Valid ✅`;
  if (!type) {
    isValid = false;
    message = `Project Type is required`;
    return { isValid, message };
  }
  if (!PROJECT_TYPES.includes(type)) {
    isValid = false;
    message = `Wrong Project Type`;
    return { isValid, message };
  }

  return { isValid, message };
};

export const boolean_vld = (value, msg) => {
  let isValid = true;
  let message = `Project Configurations are Valid ✅`;
  if (value === undefined || value === null) {
    isValid = false;
    message = `Project Configurations ${msg} is required`;
    return { isValid, message };
  } else if (value !== true && value !== false) {
    isValid = false;
    message = `Project Configurations ${msg}  is required`;
  }
  return { isValid, message };
};

export const projectType_webApp_vld = (projectInfo) => {
  let isValid = true;
  let message = ``;
  const { techStack, hasBackEnd, db, links, cloudStorage, packages } =
    projectInfo;

  if (!techStack || typeof techStack !== "string") {
    isValid = false;
    message = `Tech Stack is required`;
    return { isValid, message };
  }

  if (!boolean_vld(hasBackEnd, "hasBackEnd").isValid) {
    isValid = false;
    message = `Should indicate if the project have or does not have a Back End`;
    return { isValid, message };
  }
  if (!db || !DATABASES.includes(db)) {
    isValid = false;
    message = `Data bases is required`;
  }

  if (!links || !links.gitHub) {
    isValid = false;
    message = `Github link is required`;
  }
  if (cloudStorage && !CLOUD_STORAGES.includes(cloudStorage)) {
    isValid = false;
    message = `Cloud Storage is Wrong`;
  }

  if (packages && packages.length) {
    for (let i = 0; i < packages.length; i++) {
      const pkg = packages[i];
      if (!["backEnd", "frontEnd"].includes(pkg.ref)) {
        isValid = false;
        message = `Package at index ${i} has an invalid 'ref' value.`;
        return { isValid, message };
      }
      if (!pkg.name || typeof pkg.name !== "string" || pkg.name.length <= 3) {
        isValid = false;
        message = `Package at index ${i} should have a 'name' with more than 3 characters.`;
        return { isValid, message };
      }
    }
  }

  return { isValid, message: isValid ? "Web App info is valid ✅" : message };
};

export const projectType_mobileApp_vld = (projectInfo) => {
  let isValid = true;
  let message = ``;
};
export const projectType_desktopApp_vld = (projectInfo) => {
  let isValid = true;
  let message = ``;
};
export const projectType_branding_vld = (projectInfo) => {
  let isValid = true;
  let message = ``;
};
export const projectType_marketing_vld = (projectInfo) => {
  let isValid = true;
  let message = ``;
};
export const projectType_advertizing_vld = (projectInfo) => {
  let isValid = true;
  let message = ``;
};

export const projectInfo_vld = (type, projectInfo) => {
  let isValid = true;
  let message = `Project Information is Valid ✅`;
  switch (type) {
    case "Web App":
      if (!projectType_webApp_vld(projectInfo).isValid) {
        isValid = false;
        message = projectType_webApp_vld(projectInfo).message;
        return { isValid, message };
      } else {
        break;
      }
    case "Mobile App":
      if (!projectType_mobileApp_vld(projectInfo).isValid) {
        isValid = false;
        message = projectType_mobileApp_vld(projectInfo).message;
        return { isValid, message };
      } else {
        break;
      }
    case "Desktop App":
      if (!projectType_desktopApp_vld(projectInfo).isValid) {
        isValid = false;
        message = projectType_desktopApp_vld(projectInfo).message;
        return { isValid, message };
      } else {
        break;
      }
    case "Branding":
      if (!projectType_branding_vld(projectInfo).isValid) {
        isValid = false;
        message = projectType_branding_vld(projectInfo).message;
        return { isValid, message };
      } else {
        break;
      }
    case "Marketing":
      if (!projectType_marketing_vld(projectInfo).isValid) {
        isValid = false;
        message = projectType_marketing_vld(projectInfo).message;
        return { isValid, message };
      } else {
        break;
      }
    case "Advertizing":
      if (!projectType_advertizing_vld(projectInfo).isValid) {
        isValid = false;
        message = projectType_advertizing_vld(projectInfo).message;
        return { isValid, message };
      } else {
        break;
      }
  }
  return { isValid, message };
};

export const projectConfig_timing_vld = (timing) => {
  let isValid = true;
  let message = `Project's Configuration's Timings are Valid ✅`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { startDate, endDate, deadline, isOngoing, isDeadline } = timing;

  const startDateObj = new Date(startDate);

  if (!startDate || isNaN(startDateObj.getTime())) {
    isValid = false;
    message =
      "Project Configurations: Start date must be a valid date for deadline comparison.";
    return { isValid, message };
  }

  if (startDateObj > today) {
    isValid = false;
    message =
      "Project Configurations: Start date must not be a greater than today.";
    return { isValid, message };
  }

  if (!isOngoing) {
    const endDateObj = new Date(endDate);
    if (!endDate || isNaN(endDateObj.getTime())) {
      isValid = false;
      message =
        "Project Configurations: End date must be a valid date for non ongoing projects";
      return { isValid, message };
    } else if (endDateObj <= startDateObj) {
      isValid = false;
      message =
        "Project Configurations: End date must be after the start date.";
      return { isValid, message };
    }
  }

  if (isOngoing) {
    if (endDate) {
      isValid = false;
      message =
        "Project Configurations: End date can not be set if the project is ongoing.";
      return { isValid, message };
    }
  }

  if (isDeadline) {
    const deadlineDate = new Date(deadline);

    if (!deadline || isNaN(deadlineDate.getTime())) {
      isValid = false;
      message = "Project Configurations: Deadline must be a valid date.";
      return { isValid, message };
    }

    if (deadlineDate <= startDateObj) {
      isValid = false;
      message =
        "Project Configurations: Deadline must be after the start date.";
      return { isValid, message };
    }
    if (deadlineDate <= today) {
      isValid = false;
      message = "Project Configurations: Deadline must be after today's date.";
      return { isValid, message };
    }
  }

  return { isValid, message };
};

export const projectConfig_vld = (config) => {
  let isValid = true;
  let message = `Project Configurations are Valid ✅`;

  const { isPublic, timing, priority } = config;

  const { isOngoing, isDeadline } = timing;

  const PRIORITIES = GLOBAL_PRIORITIES.map((priority) => priority.value);

  if (!PRIORITIES.includes(priority) || !priority) {
    isValid = false;
    message = "Project Configurations: Priority is wrong.";
    return { isValid, message };
  }

  if (!boolean_vld(isPublic, "isPublic").isValid) {
    isValid = false;
    message = boolean_vld(isPublic, "isPublic").message;
    return { isValid, message };
  }
  if (!boolean_vld(isOngoing, "isOngoing").isValid) {
    isValid = false;
    message = boolean_vld(isOngoing, "isOngoing").message;
    return { isValid, message };
  }
  if (!boolean_vld(isDeadline, "isDeadline").isValid) {
    isValid = false;
    message = boolean_vld(isDeadline, "isDeadline").message;
    return { isValid, message };
  }
  if (!projectConfig_timing_vld(timing).isValid) {
    isValid = false;
    message = projectConfig_timing_vld(timing).message;
    return { isValid, message };
  }

  return { isValid, message };
};
