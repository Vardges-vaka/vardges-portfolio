import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/brand`;

const CK_BRAND_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_brnd_brand_create.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_brnd_brand_getAll.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_getOne.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_delete.js",
      PROPERTIES: () => ({
        method: "DELETE",
        credentials: "include",
      }),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_updateAll.js",
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
      DISPLAY_NAME: "CK_brnd_brand_update_name.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_TAGLINE: {
      ENDPOINT: (id) => `${API_BASE}/update/tagline/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_tagline.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_files.js",
      PROPERTIES: (formData) => ({
        method: "PUT",
        credentials: "include",
        body: formData,
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
      DISPLAY_NAME: "CK_brnd_brand_get_fileReadUrl.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    UPDATE_SOCIALS: {
      ENDPOINT: (id) => `${API_BASE}/update/socials/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_socials.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_REGISTEREDIN: {
      ENDPOINT: (id) => `${API_BASE}/update/registeredIn/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_registeredIn.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_description.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_PRICERANGE: {
      ENDPOINT: (id) => `${API_BASE}/update/priceRange/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_priceRange.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CUISINETAGS: {
      ENDPOINT: (id) => `${API_BASE}/update/cuisineTags/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_cuisineTags.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_WEBSITE: {
      ENDPOINT: (id) => `${API_BASE}/update/website/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_website.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CONTRACTS: {
      ENDPOINT: (id) => `${API_BASE}/update/contracts/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_contracts.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_INTEGRATIONS: {
      ENDPOINT: (id) => `${API_BASE}/update/integrations/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_integrations.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SIBLINGS: {
      ENDPOINT: (id) => `${API_BASE}/update/siblings/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_siblings.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_EMPLOYEES: {
      ENDPOINT: (id) => `${API_BASE}/update/employees/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_employees.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_EQUIPMENTS: {
      ENDPOINT: (id) => `${API_BASE}/update/equipments/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_equipments.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_BRANCHES: {
      ENDPOINT: (id) => `${API_BASE}/update/branches/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_branches.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_MENUS: {
      ENDPOINT: (id) => `${API_BASE}/update/menus/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_menus.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_COMPETITORS: {
      ENDPOINT: (id) => `${API_BASE}/update/competitors/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_competitors.js",
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

export default CK_BRAND_CONFIG;
