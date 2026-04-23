import {
  Branch_add,
  Branch_getAll,
  Branch_getOne,
  Branch_update,
  Branch_delete,
} from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js";

export const useBranches_apiHelpers = () => {
  return {
    apiHelpers: {
      Branch_add,
      Branch_getAll,
      Branch_getOne,
      Branch_update,
      Branch_delete,
    },
  };
};
