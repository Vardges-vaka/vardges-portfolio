export const validator_title = (text) => {
  // console.log("validator_title text", text);
  let message = "";
  let isError = false;
  if (!text) {
    message = "Required Field";
    isError = true;
  }
  if (text.length < 3) {
    message = "Title must be at least 3 characters long";
    isError = true;
  }

  return { message, isError };
};
