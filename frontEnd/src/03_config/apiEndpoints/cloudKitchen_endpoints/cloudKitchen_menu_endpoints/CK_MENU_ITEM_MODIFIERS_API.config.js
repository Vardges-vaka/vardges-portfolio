import { API_BASE } from "../../../siteSettings";

/*

! POOST_BODY_SHAPE
(body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

! GET_SHAPE
() => ({
  method: "GET",
  credentials: "include",
})

! PUUT_BODY_SHAPE
(body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

! DELETE_BODY_SHAPE
(body) => ({
  method: "DELETE",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

! DELETE_NO_BODY_SHAPE
() => ({
  method: "DELETE",
  credentials: "include",
})

*/

const CK_MENU_ITEM_MODIFIERS_API_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_create.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GETALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_getAll.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GETONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_getOne.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    UPDATEALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_updateAll.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_delete.js",
      PROPERTIES: () => ({
        method: "DELETE",
        credentials: "include",
      }),
    },
  },
  FIELDS: {
    UPDATE_OWNERTYPE: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_ownerType.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_OWNERID: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_ownerId.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_TITLE: {
      ENDPOINT: (id) => `${API_BASE}/update/title/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_title.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_description.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ISOPTIONAL: {
      ENDPOINT: (id) => `${API_BASE}/update/isOptional/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_isOptional.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SELECTIONMODE: {
      ENDPOINT: (id) => `${API_BASE}/update/selectionMode/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_selectionMode.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ISFREE: {
      ENDPOINT: (id) => `${API_BASE}/update/isFree/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_isFree.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ISACTIVE: {
      ENDPOINT: (id) => `${API_BASE}/update/isActive/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_isActive.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ACTIVETIMINGS: {
      ENDPOINT: (id) => `${API_BASE}/update/activeTimings/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_update_activeTimings.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
  RELATIONS: {
    ADD_OPTIONS: {
      ENDPOINT: (id) => `${API_BASE}/options/add/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_addOptions.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REMOVE_OPTIONS: {
      ENDPOINT: (id) => `${API_BASE}/options/remove/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_removeOptions.js",
      PROPERTIES: (body) => ({
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REORDER_OPTIONS: {
      ENDPOINT: (id) => `${API_BASE}/options/reorder/${id}`,
      DISPLAY_NAME: "CK_Mn_it_Modifier_reorderOptions.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
};

export default CK_MENU_ITEM_MODIFIERS_API_CONFIG;
