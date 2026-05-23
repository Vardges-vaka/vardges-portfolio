import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/invoice`;

const CK_INVOICE_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_invoice_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_invoice_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_invoice_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_invoice_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_invoice_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    // none yet — schema has no top-level fields
  },
  RELATIONS: {},
  GROUPED: {},
};

export default CK_INVOICE_CONFIG;