import {
  Employee_add,
  Employee_getAll,
  Employee_getOne,
  Employee_update,
  Employee_delete,
  Branch_getAll,
  Brand_getAll,
} from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/_adminFeatures.index.js";

const fetchBranchesSafe = async () => {
  try {
    const response = await Branch_getAll();
    return response?.success ? response.data ?? [] : [];
  } catch {
    return [];
  }
};

const fetchBrandsSafe = async () => {
  try {
    const response = await Brand_getAll();
    return response?.success ? response.data ?? [] : [];
  } catch {
    return [];
  }
};

export const useEmployees_apiHelpers = () => ({
  apiHelpers: {
    Employee_add,
    Employee_getAll,
    Employee_getOne,
    Employee_update,
    Employee_delete,
    fetchBranchesSafe,
    fetchBrandsSafe,
  },
});
