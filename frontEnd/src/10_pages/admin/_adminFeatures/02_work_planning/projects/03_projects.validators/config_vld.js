import { GLOBAL_PRIORITIES } from "../05_projects.constances/_projects.constances.index";

const PRIORITIES = GLOBAL_PRIORITIES.map((priority) => priority.value);

export const config_vld = (config) => {
  let message = "";
  let isError = false;

  // Priority must be selected
  if (!config.priority) {
    message = "Select a priority";
    isError = true;
    return { message, isError };
  }
  if (!PRIORITIES.includes(config.priority)) {
    message = "Invalid priority value";
    isError = true;
    return { message, isError };
  }

  const { timing } = config;
  // If ongoing, start and end dates are required and must be ordered
  if (timing.isOngoing) {
    if (!timing.startDate) {
      message = "Add the start date";
      isError = true;
      return { message, isError };
    }
    if (timing.endDate) {
      message = "End date is not allowed if the project is ongoing";
      isError = true;
      return { message, isError };
    }
  }

  if (!timing.isOngoing) {
    if (!timing.endDate) {
      message = "Add the end date";
      isError = true;
      return { message, isError };
    }
    if (timing.startDate > timing.endDate) {
      message = "End date must be after start date";
      isError = true;
      return { message, isError };
    }
  }

  // If deadline mode, deadline is required
  if (timing.isDeadline && !timing.deadline) {
    message = "Add the deadline date";
    isError = true;
    return { message, isError };
  }

  // If neither ongoing nor deadline, timing can remain empty
  return { message, isError };
};
