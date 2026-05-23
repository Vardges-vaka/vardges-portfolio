import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/campaign`;

const CK_CAMPAIGN_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_mkt_campaign_create.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_mkt_campaign_getAll.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_getOne.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_delete.js",
      PROPERTIES: () => ({
        method: "DELETE",
        credentials: "include",
      }),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_updateAll.js",
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
      DISPLAY_NAME: "CK_mkt_campaign_update_name.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_description.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_KIND: {
      ENDPOINT: (id) => `${API_BASE}/update/kind/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_kind.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SOURCE: {
      ENDPOINT: (id) => `${API_BASE}/update/source/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_source.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_PLATFORMPROMOID: {
      ENDPOINT: (id) => `${API_BASE}/update/platformPromoId/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_platformPromoId.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_STATUS: {
      ENDPOINT: (id) => `${API_BASE}/update/status/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_status.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_LIFECYCLE: {
      ENDPOINT: (id) => `${API_BASE}/update/lifecycle/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_lifecycle.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_VALIDITY: {
      ENDPOINT: (id) => `${API_BASE}/update/validity/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_validity.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_VALUETYPE: {
      ENDPOINT: (id) => `${API_BASE}/update/valueType/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_valueType.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_VALUE: {
      ENDPOINT: (id) => `${API_BASE}/update/value/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_value.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CAP: {
      ENDPOINT: (id) => `${API_BASE}/update/cap/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_cap.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CURRENCY: {
      ENDPOINT: (id) => `${API_BASE}/update/currency/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_currency.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_FUNDING: {
      ENDPOINT: (id) => `${API_BASE}/update/funding/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_funding.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CONDITIONS: {
      ENDPOINT: (id) => `${API_BASE}/update/conditions/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_conditions.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SALESCHANNELS: {
      ENDPOINT: (id) => `${API_BASE}/update/salesChannels/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_salesChannels.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_files.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_mkt_campaign_update_notes.js",
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

export default CK_CAMPAIGN_CONFIG;
