import { API_BASE } from "../../../siteSettings";

const CK_API_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CloudKitchen_menu_create.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GETALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CloudKitchen_menu_getAll.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GETONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_getOne.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GET_CATEGORIES_POPULATED: {
      ENDPOINT: (id) => `${API_BASE}/getCategoriesPopulated/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_getCategoriesPopulated.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GETALL_BY_OWNERTYPE: {
      ENDPOINT: (ownerType) => `${API_BASE}/getAllByOwnerType/${ownerType}`,
      DISPLAY_NAME: "CloudKitchen_menu_getAllByOwnerType.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_delete.js",
      PROPERTIES: () => ({
        method: "DELETE",
        credentials: "include",
      }),
    },
    UPDATEALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_updateAll.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
  FIELDS: {
    UPDATE_LABEL: {
      ENDPOINT: (id) => `${API_BASE}/update/label/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_update_label.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ISACTIVE: {
      ENDPOINT: (id) => `${API_BASE}/update/isActive/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_update_isActive.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },

    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_update_description.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },

    UPDATE_OWNER: {
      ENDPOINT: (id) => `${API_BASE}/update/owner/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_update_owner.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
  RELATIONS: {
    ADD_CATEGORIES: {
      ENDPOINT: (id) => `${API_BASE}/categories/add/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_addCategories.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REMOVE_CATEGORIES: {
      ENDPOINT: (id) => `${API_BASE}/categories/remove/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_removeCategories.js",
      PROPERTIES: (body) => ({
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REORDER_CATEGORIES: {
      ENDPOINT: (id) => `${API_BASE}/categories/reorder/${id}`,
      DISPLAY_NAME: "CloudKitchen_menu_reorderCategories.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
};

export default CK_API_CONFIG;
