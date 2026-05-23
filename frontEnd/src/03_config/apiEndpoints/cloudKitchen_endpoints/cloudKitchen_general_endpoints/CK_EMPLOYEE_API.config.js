import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/employee`;

const CK_EMPLOYEE_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_employee_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_employee_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_employee_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_employee_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_employee_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    UPDATE_NAME: {
      ENDPOINT: (id) => `${API_BASE}/update/name/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PERSONALDETAILS: {
      ENDPOINT: (id) => `${API_BASE}/update/personalDetails/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_personalDetails.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ADDRESS: {
      ENDPOINT: (id) => `${API_BASE}/update/address/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_address.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_UNIFORM: {
      ENDPOINT: (id) => `${API_BASE}/update/uniform/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_uniform.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CERTIFICATIONS: {
      ENDPOINT: (id) => `${API_BASE}/update/certifications/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_certifications.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EMPLOYMENTINFO: {
      ENDPOINT: (id) => `${API_BASE}/update/employmentInfo/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_employmentInfo.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LEGALDOCS: {
      ENDPOINT: (id) => `${API_BASE}/update/legalDocs/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_legalDocs.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SALARY: {
      ENDPOINT: (id) => `${API_BASE}/update/salary/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_salary.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ATTENDANCEINFO: {
      ENDPOINT: (id) => `${API_BASE}/update/attendanceInfo/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_attendanceInfo.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_RELATEDTO: {
      ENDPOINT: (id) => `${API_BASE}/update/relatedTo/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_relatedTo.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANCH: {
      ENDPOINT: (id) => `${API_BASE}/update/branch/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_branch.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTRACTS: {
      ENDPOINT: (id) => `${API_BASE}/update/contracts/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_contracts.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ASSOCIATEDBRANDS: {
      ENDPOINT: (id) => `${API_BASE}/update/associatedBrands/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_associatedBrands.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_notes.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  RELATIONS: {},
  GROUPED: {},
};

export default CK_EMPLOYEE_CONFIG;