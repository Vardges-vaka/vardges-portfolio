import { validator_title } from "./titleValidator.js";
import { validator_description } from "./descriptionValidator.js";
import { PROJECT_TYPES } from "../05_projects.constances/_projects.constances.index.js";

export const generalInfo_vld = (generalInfo, type) => {
  let message = "";
  let isError = false;

  if (!type) {
    message = "Type is required";
    isError = true;
    return { message, isError };
  }
  if (!PROJECT_TYPES.includes(type)) {
    message = "Invalid Type";
    isError = true;
    return { message, isError };
  }
  const { title, description } = generalInfo;
  if (!title) {
    message = "Title is required";
    isError = true;
    return { message, isError };
  }
  if (!description) {
    message = "Description is required";
    isError = true;
    return { message, isError };
  }
  if (!title.en.value) {
    message = "Title is required in English";
    isError = true;
    return { message, isError };
  }
  if (!title.ru.value) {
    message = "Title is required in Russian";
    isError = true;
    return { message, isError };
  }
  if (!title.hy.value) {
    message = "Title is required in Armenian";
    isError = true;
    return { message, isError };
  }
  if (!title.ar.value) {
    message = "Title is required in Arabic";
    isError = true;
    return { message, isError };
  }
  if (
    title.en.value.length < 3 ||
    title.ru.value.length < 3 ||
    title.hy.value.length < 3 ||
    title.ar.value.length < 3
  ) {
    message = "Title must be at least 3 characters long";
    isError = true;
    return { message, isError };
  }
  const { brief, detailed } = description;
  if (!brief) {
    message = "Brief Description is required";
    isError = true;
    return { message, isError };
  }
  if (!detailed) {
    message = "Detailed Description is required";
    isError = true;
    return { message, isError };
  }

  if (
    !detailed.en.value ||
    !detailed.ru.value ||
    !detailed.hy.value ||
    !detailed.ar.value
  ) {
    message = "Detailed Description is required in all languages";
    isError = true;
  }
  if (
    detailed.en.value.length < 3 ||
    detailed.ru.value.length < 3 ||
    detailed.hy.value.length < 3 ||
    detailed.ar.value.length < 3
  ) {
    message = "Detailed Description must be at least 3 characters long";
    isError = true;
  }

  if (
    !brief.en.value ||
    !brief.ru.value ||
    !brief.hy.value ||
    !brief.ar.value
  ) {
    message = "Brief Description is required in all languages";
    isError = true;
  }
  if (
    brief.en.value.length < 3 ||
    brief.ru.value.length < 3 ||
    brief.hy.value.length < 3 ||
    brief.ar.value.length < 3
  ) {
    message = "Brief Description must be at least 3 characters long";
    isError = true;
  }

  console.log("generalInfo_vld generalInfo", generalInfo);
  console.log("generalInfo_vld type", type);
  return { message, isError };
};
