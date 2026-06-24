import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/salesPlatform`;

const CK_SALES_PLATFORM_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_salesPlatform_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_salesPlatform_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_salesPlatform_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_notes.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LINKS: {
      ENDPOINT: (id) => `${API_BASE}/update/links/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_links.js",
      PROPERTIES: (body) => {
        if (body instanceof FormData) {
          return {
            method: "PUT",
            credentials: "include",
            body,
          };
        }

        return {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        };
      },
    },
    UPDATE_KAM: {
      ENDPOINT: (id) => `${API_BASE}/update/kam/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_kam.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LOGINCREDENTIALS: {
      ENDPOINT: (id) => `${API_BASE}/update/loginCredentials/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_loginCredentials.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SUPPORT: {
      ENDPOINT: (id) => `${API_BASE}/update/support/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_support.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_FILE_READ_URL: {
      ENDPOINT: (id, objectKey, { download = false, filename = "" } = {}) => {
        const params = new URLSearchParams({ objectKey });
        if (download) {
          params.set("download", "1");
          if (filename) params.set("filename", filename);
        }
        return `${API_BASE}/getFileReadUrl/${id}?${params.toString()}`;
      },
      DISPLAY_NAME: "CK_gen_salesPlatform_get_fileReadUrl.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
  },
  RELATIONS: {},
  GROUPED: {},
};

export default CK_SALES_PLATFORM_CONFIG;