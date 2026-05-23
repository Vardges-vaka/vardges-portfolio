import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/integration`;

const CK_INTEGRATION_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_integration_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_integration_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_integration_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_integration_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_integration_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    UPDATE_PROVIDER: {
      ENDPOINT: (id) => `${API_BASE}/update/provider/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_provider.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_KIND: {
      ENDPOINT: (id) => `${API_BASE}/update/kind/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_kind.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ACCOUNTLABEL: {
      ENDPOINT: (id) => `${API_BASE}/update/accountLabel/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_accountLabel.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_description.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STATUS: {
      ENDPOINT: (id) => `${API_BASE}/update/status/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_status.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LIFECYCLE: {
      ENDPOINT: (id) => `${API_BASE}/update/lifecycle/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_lifecycle.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LINKS: {
      ENDPOINT: (id) => `${API_BASE}/update/links/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_links.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PAYMENT: {
      ENDPOINT: (id) => `${API_BASE}/update/payment/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_payment.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LOGINCREDENTIALS: {
      ENDPOINT: (id) => `${API_BASE}/update/loginCredentials/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_loginCredentials.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_KAM: {
      ENDPOINT: (id) => `${API_BASE}/update/kam/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_kam.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SUPPORT: {
      ENDPOINT: (id) => `${API_BASE}/update/support/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_support.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SCHEDULEDMAINTENANCES: {
      ENDPOINT: (id) => `${API_BASE}/update/scheduledMaintenances/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_scheduledMaintenances.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANDS: {
      ENDPOINT: (id) => `${API_BASE}/update/brands/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_brands.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANCHES: {
      ENDPOINT: (id) => `${API_BASE}/update/branches/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_branches.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTRACT: {
      ENDPOINT: (id) => `${API_BASE}/update/contract/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_contract.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_notes.js",
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

export default CK_INTEGRATION_CONFIG;