import {
  DATABASES,
  CLOUD_STORAGES,
  FRONTEND_PACKAGES,
  BACKEND_PACKAGES,
  TECH_STACKS,
} from "../05_projects.constances/_projects.constances.index.js";

export const specificInfo_vld = (specificInfo) => {
  let message = "";
  let isError = false;

  const {
    techStack,
    hasBackEnd,
    db,
    links,
    cloudStorage,
    shouldShowPackages,
    packages,
  } = specificInfo;

  if (!techStack) {
    message = "Tech Stack is required";
    isError = true;
    return { message, isError };
  }
  for (let i = 0; i < techStack.length; i++) {
    const tech = techStack[i];
    if (!TECH_STACKS.includes(tech)) {
      message = "Invalid Tech Stack";
      isError = true;
      return { message, isError };
    }
  }
  if (hasBackEnd !== true && hasBackEnd !== false) {
    message = "Has Backend should be a boolean";
    isError = true;
    return { message, isError };
  }
  if (shouldShowPackages !== true && shouldShowPackages !== false) {
    message = "Should Show Packages should be a boolean";
    isError = true;
    return { message, isError };
  }
  if (!db.value) {
    message = "Database is required";
    isError = true;
    return { message, isError };
  }
  if (!DATABASES.includes(db.value)) {
    message = "Invalid Database";
    isError = true;
    return { message, isError };
  }
  if (cloudStorage.value && !CLOUD_STORAGES.includes(cloudStorage.value)) {
    message = "Invalid Cloud Storage";
    isError = true;
    return { message, isError };
  }

  if (!links || !links.gitHub) {
    message = "Links are required";
    isError = true;
    return { message, isError };
  }
  if (!links.gitHub.value) {
    message = "GitHub Link is required";
    isError = true;
    return { message, isError };
  }
  if (links.url.value.length < 3) {
    message = "URL must be at least 3 characters long";
    isError = true;
    return { message, isError };
  }
  if (links.url.value) {
    console.log("links.url.value", links.url.value);
    if (typeof links.url.value !== "string") {
      message = "URL should be a string";
      isError = true;
      return { message, isError };
    }
    if (links.url.value.length < 3) {
      message = "URL must be at least 3 characters long";
      isError = true;
      return { message, isError };
    }
  }
  if (packages) {
    for (let i = 0; i < packages.length; i++) {
      const pkg = packages[i];
      if (!["backEnd", "frontEnd"].includes(pkg.ref)) {
        message = "Invalid Package";
        isError = true;
        return { message, isError };
      }
      if (!pkg.name) {
        message = "Package name is required";
        isError = true;
        return { message, isError };
      }
      if (typeof pkg.name !== "string") {
        message = "Package name should be a string";
        isError = true;
        return { message, isError };
      }
      if (pkg.name.length < 3) {
        message = "Package name must be at least 3 characters long";
        isError = true;
        return { message, isError };
      }
      if (
        !FRONTEND_PACKAGES.includes(pkg.name) &&
        !BACKEND_PACKAGES.includes(pkg.name)
      ) {
        message = "Invalid Package";
        isError = true;
        return { message, isError };
      }
    }
  }

  return { message, isError };
};
