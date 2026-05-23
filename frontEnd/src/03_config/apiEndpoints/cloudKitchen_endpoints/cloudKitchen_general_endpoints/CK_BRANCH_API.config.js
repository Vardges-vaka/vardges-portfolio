import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/branch`;

const CK_BRANCH_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_branch_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_branch_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_branch_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_branch_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_branch_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_branch_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LOCATION: {
      ENDPOINT: (id) => `${API_BASE}/update/location/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_location.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTACT: {
      ENDPOINT: (id) => `${API_BASE}/update/contact/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_contact.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_OPERATIONS: {
      ENDPOINT: (id) => `${API_BASE}/update/operations/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_operations.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EXPENSES: {
      ENDPOINT: (id) => `${API_BASE}/update/expenses/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_expenses.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTRACTS: {
      ENDPOINT: (id) => `${API_BASE}/update/contracts/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_contracts.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EMPLOYEES: {
      ENDPOINT: (id) => `${API_BASE}/update/employees/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_employees.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EQUIPMENTS: {
      ENDPOINT: (id) => `${API_BASE}/update/equipments/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_equipments.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANDS: {
      ENDPOINT: (id) => `${API_BASE}/update/brands/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_brands.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_notes.js",
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

export default CK_BRANCH_CONFIG;