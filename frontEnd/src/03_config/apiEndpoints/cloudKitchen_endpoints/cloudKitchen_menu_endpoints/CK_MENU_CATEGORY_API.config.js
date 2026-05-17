import { API_BASE } from "../../../siteSettings";

const CK_MENU_CATEGORY_API_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_create.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GETALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_getAll.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GETONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_getOne.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    UPDATEALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_updateAll.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_MENUITEMS_POPULATED: {
      ENDPOINT: (id) => `${API_BASE}/getMenuItemsPopulated/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_getMenuItemsPopulated.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GETALL_BY_OWNERTYPE: {
      ENDPOINT: (ownerType) => `${API_BASE}/getAllByOwnerType/${ownerType}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_getAllByOwnerType.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_delete.js",
      PROPERTIES: () => ({
        method: "DELETE",
        credentials: "include",
      }),
    },
  },
  FIELDS: {
    UPDATE_NAME: {
      ENDPOINT: (id) => `${API_BASE}/update/name/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_update_name.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_update_description.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_MENU: {
      ENDPOINT: (id) => `${API_BASE}/update/menu/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_update_menu.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_OWNERTYPE: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_update_ownerType.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_OWNERID: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_update_ownerId.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ISACTIVE: {
      ENDPOINT: (id) => `${API_BASE}/update/isActive/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_update_isActive.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ACTIVETIMINGS: {
      ENDPOINT: (id) => `${API_BASE}/update/activeTimings/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_update_activeTimings.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_DISPLAYORDER: {
      ENDPOINT: (id) => `${API_BASE}/update/displayOrder/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_update_displayOrder.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
  RELATIONS: {
    ADD_MENUITEMS: {
      ENDPOINT: (id) => `${API_BASE}/menuItems/add/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_addMenuItems.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REMOVE_MENUITEMS: {
      ENDPOINT: (id) => `${API_BASE}/menuItems/remove/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_removeMenuItems.js",
      PROPERTIES: (body) => ({
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REORDER_MENUITEMS: {
      ENDPOINT: (id) => `${API_BASE}/menuItems/reorder/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuCategory_reorderMenuItems.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
};

export default CK_MENU_CATEGORY_API_CONFIG;
