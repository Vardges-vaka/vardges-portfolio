import {
  Brand_add,
  Brand_getAll,
  Brand_getOne,
  Brand_update,
  Brand_delete,
} from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js";

export const useBrands_apiHelpers = () => ({
  apiHelpers: {
    Brand_add,
    Brand_getAll,
    Brand_getOne,
    Brand_update,
    Brand_delete,
  },
});
