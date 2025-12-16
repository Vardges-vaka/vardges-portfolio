export const validator_description = (text) => {
  // console.log("validator_title text", text);
  let message = "";
  let isError = false;
  if (!text) {
    message = "Describtion is a Required Field";
    isError = true;
  }
  return { message, isError };
};
