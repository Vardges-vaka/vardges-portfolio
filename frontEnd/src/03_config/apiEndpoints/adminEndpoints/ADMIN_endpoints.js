import { BACKEND_URL } from "../../siteSettings";

const BASE_URL = `${BACKEND_URL}/api/admin`;
const API_BASE = `${BACKEND_URL}/api`;

const ADMIN_endpoints = {
  VKUSNO: {
    GET_ONE: {
      ENDPOINT: (id) => `${BASE_URL}/getOne/${id}`,
      DISPLAY_NAME: "Project_getOne.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
  },

  BRANCH: {
    ADD: {
      ENDPOINT: `${API_BASE}/branches`,
      DISPLAY_NAME: "Branch_add.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/branches`,
      DISPLAY_NAME: "Branch_getAll.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/branches/${id}`,
      DISPLAY_NAME: "Branch_getOne.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UPDATE: {
      ENDPOINT: (id) => `${API_BASE}/branches/${id}`,
      DISPLAY_NAME: "Branch_update.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/branches/${id}`,
      DISPLAY_NAME: "Branch_delete.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
  },

  SETTINGS: {
    GET: {
      ENDPOINT: `${API_BASE}/settings`,
      DISPLAY_NAME: "Settings_get.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    PATCH_STORAGE: {
      ENDPOINT: `${API_BASE}/settings/storage`,
      DISPLAY_NAME: "Settings_patchStorage.js",
      PROPERTIES: (body) => ({
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },

  BRAND: {
    ADD: {
      ENDPOINT: `${API_BASE}/brands`,
      DISPLAY_NAME: "Brand_add.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/brands`,
      DISPLAY_NAME: "Brand_getAll.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/brands/${id}`,
      DISPLAY_NAME: "Brand_getOne.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UPDATE: {
      ENDPOINT: (id) => `${API_BASE}/brands/${id}`,
      DISPLAY_NAME: "Brand_update.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/brands/${id}`,
      DISPLAY_NAME: "Brand_delete.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
  },

  MODIFIER: {
    ADD: {
      ENDPOINT: `${API_BASE}/modifiers`,
      DISPLAY_NAME: "Modifier_add.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/modifiers`,
      DISPLAY_NAME: "Modifier_getAll.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/modifiers/${id}`,
      DISPLAY_NAME: "Modifier_getOne.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UPDATE: {
      ENDPOINT: (id) => `${API_BASE}/modifiers/${id}`,
      DISPLAY_NAME: "Modifier_update.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/modifiers/${id}`,
      DISPLAY_NAME: "Modifier_delete.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
  },

  EMPLOYEE: {
    ADD: {
      ENDPOINT: `${API_BASE}/employees`,
      DISPLAY_NAME: "Employee_add.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/employees`,
      DISPLAY_NAME: "Employee_getAll.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/employees/${id}`,
      DISPLAY_NAME: "Employee_getOne.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UPDATE: {
      ENDPOINT: (id) => `${API_BASE}/employees/${id}`,
      DISPLAY_NAME: "Employee_update.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/employees/${id}`,
      DISPLAY_NAME: "Employee_delete.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
  },
  MENU: {
    ADD: {
      ENDPOINT: `${API_BASE}/menus`,
      DISPLAY_NAME: "Menu_add.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/menus`,
      DISPLAY_NAME: "Menu_getAll.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/menus/${id}`,
      DISPLAY_NAME: "Menu_getOne.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UPDATE: {
      ENDPOINT: (id) => `${API_BASE}/menus/${id}`,
      DISPLAY_NAME: "Menu_update.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/menus/${id}`,
      DISPLAY_NAME: "Menu_delete.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
  },
  MENU_ITEM: {
    ADD: {
      ENDPOINT: `${API_BASE}/menu-items`,
      DISPLAY_NAME: "MenuItem_add.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/menu-items`,
      DISPLAY_NAME: "MenuItem_getAll.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/menu-items/${id}`,
      DISPLAY_NAME: "MenuItem_getOne.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UPDATE: {
      ENDPOINT: (id) => `${API_BASE}/menu-items/${id}`,
      DISPLAY_NAME: "MenuItem_update.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/menu-items/${id}`,
      DISPLAY_NAME: "MenuItem_delete.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
  },
  MENU_CATEGORY: {
    ADD: {
      ENDPOINT: `${API_BASE}/menu-categories`,
      DISPLAY_NAME: "MenuCategory_add.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/menu-categories`,
      DISPLAY_NAME: "MenuCategory_getAll.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/menu-categories/${id}`,
      DISPLAY_NAME: "MenuCategory_getOne.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UPDATE: {
      ENDPOINT: (id) => `${API_BASE}/menu-categories/${id}`,
      DISPLAY_NAME: "MenuCategory_update.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/menu-categories/${id}`,
      DISPLAY_NAME: "MenuCategory_delete.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
  },
};

export default ADMIN_endpoints;
