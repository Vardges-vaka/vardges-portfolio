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
    PUT_PROVIDER: {
      ENDPOINT: (provider) => `${API_BASE}/settings/storage/${provider}`,
      DISPLAY_NAME: "Settings_putProvider.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPLOAD_LOGO: {
      ENDPOINT: (provider) => `${API_BASE}/settings/storage/${provider}/logo`,
      DISPLAY_NAME: "Settings_uploadLogo.js",
      PROPERTIES: (formData) => ({
        method: "POST",
        credentials: "include",
        body: formData,
      }),
    },
    GET_LOGO: {
      ENDPOINT: (provider) => `${API_BASE}/settings/storage/${provider}/logo`,
      DISPLAY_NAME: "Settings_getLogo.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    DELETE_LOGO: {
      ENDPOINT: (provider) => `${API_BASE}/settings/storage/${provider}/logo`,
      DISPLAY_NAME: "Settings_deleteLogo.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    GET_MONITOR: {
      ENDPOINT: (provider, refresh = false) =>
        `${API_BASE}/settings/storage/${provider}/monitor${refresh ? "?refresh=1" : ""}`,
      DISPLAY_NAME: "Settings_getMonitor.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
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
    SECTION_GET: {
      ENDPOINT: (id, sectionKey) => `${API_BASE}/brands/${id}/sections/${sectionKey}`,
      DISPLAY_NAME: "Brand_getSection.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    SECTION_PUT: {
      ENDPOINT: (id, sectionKey) => `${API_BASE}/brands/${id}/sections/${sectionKey}`,
      DISPLAY_NAME: "Brand_putSection.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    SECTION_CLEAR: {
      ENDPOINT: (id, sectionKey) => `${API_BASE}/brands/${id}/sections/${sectionKey}`,
      DISPLAY_NAME: "Brand_clearSection.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    SECTION_ITEM_ADD: {
      ENDPOINT: (id, sectionKey) =>
        `${API_BASE}/brands/${id}/sections/${sectionKey}/items`,
      DISPLAY_NAME: "Brand_addSectionItem.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    SECTION_ITEM_UPDATE: {
      ENDPOINT: (id, sectionKey, itemId) =>
        `${API_BASE}/brands/${id}/sections/${sectionKey}/items/${itemId}`,
      DISPLAY_NAME: "Brand_updateSectionItem.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    SECTION_ITEM_DELETE: {
      ENDPOINT: (id, sectionKey, itemId) =>
        `${API_BASE}/brands/${id}/sections/${sectionKey}/items/${itemId}`,
      DISPLAY_NAME: "Brand_removeSectionItem.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    CREATE_BRANCH: {
      ENDPOINT: (id) => `${API_BASE}/brands/${id}/branches`,
      DISPLAY_NAME: "Brand_createBranch.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    LINK_BRANCH: {
      ENDPOINT: (id, branchId) => `${API_BASE}/brands/${id}/branches/${branchId}`,
      DISPLAY_NAME: "Brand_linkBranch.js",
      PROPERTIES: {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UNLINK_BRANCH: {
      ENDPOINT: (id, branchId) => `${API_BASE}/brands/${id}/branches/${branchId}`,
      DISPLAY_NAME: "Brand_unlinkBranch.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    LINK_EMPLOYEE: {
      ENDPOINT: (id, employeeId) => `${API_BASE}/brands/${id}/employees/${employeeId}`,
      DISPLAY_NAME: "Brand_linkEmployee.js",
      PROPERTIES: {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    UNLINK_EMPLOYEE: {
      ENDPOINT: (id, employeeId) => `${API_BASE}/brands/${id}/employees/${employeeId}`,
      DISPLAY_NAME: "Brand_unlinkEmployee.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    SET_MENU: {
      ENDPOINT: (id, menuId) => `${API_BASE}/brands/${id}/menu/${menuId}`,
      DISPLAY_NAME: "Brand_setMenu.js",
      PROPERTIES: {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    CLEAR_MENU: {
      ENDPOINT: (id) => `${API_BASE}/brands/${id}/menu`,
      DISPLAY_NAME: "Brand_clearMenu.js",
      PROPERTIES: {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    LOGO_GET: {
      ENDPOINT: (id, logoType) => `${API_BASE}/brands/${id}/files/logos/${logoType}`,
      DISPLAY_NAME: "Brand_getLogo.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      },
    },
    LOGO_UPLOAD: {
      ENDPOINT: (id, logoType, provider) =>
        `${API_BASE}/brands/${id}/files/logos/${logoType}?provider=${provider}`,
      DISPLAY_NAME: "Brand_uploadLogo.js",
      PROPERTIES: (formData) => ({
        method: "POST",
        credentials: "include",
        body: formData,
      }),
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
