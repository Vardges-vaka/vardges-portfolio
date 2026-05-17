import { API_BASE } from "../../../siteSettings";

const CK_MENU_ITEM_MODIFIER_OPTIONS_API_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_create.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GETALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_getAll.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GETONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_getOne.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    UPDATEALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_updateAll.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_delete.js",
      PROPERTIES: () => ({
        method: "DELETE",
        credentials: "include",
      }),
    },
  },
  FIELDS: {
    UPDATE_OWNERTYPE: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_ownerType.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_OWNERID: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_ownerId.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_NAME: {
      ENDPOINT: (id) => `${API_BASE}/update/name/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_name.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_description.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_IMAGES: {
      ENDPOINT: (id) => `${API_BASE}/update/images/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_images.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_RECIPEFILE: {
      ENDPOINT: (id) => `${API_BASE}/update/recipeFile/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_recipeFile.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_TECHCARDFILE: {
      ENDPOINT: (id) => `${API_BASE}/update/techCardFile/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_techCardFile.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_COST: {
      ENDPOINT: (id) => `${API_BASE}/update/cost/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_cost.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SELLINGPRICE: {
      ENDPOINT: (id) => `${API_BASE}/update/sellingPrice/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_sellingPrice.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_NUTRITION: {
      ENDPOINT: (id) => `${API_BASE}/update/nutrition/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_nutrition.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CLOUDSTORAGE: {
      ENDPOINT: (id) => `${API_BASE}/update/cloudStorage/${id}`,
      DISPLAY_NAME: "CK_Mn_It_Md_Option_update_cloudStorage.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
};

export default CK_MENU_ITEM_MODIFIER_OPTIONS_API_CONFIG;
