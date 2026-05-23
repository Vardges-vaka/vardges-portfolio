import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/contract`;

const CK_CONTRACT_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_contract_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_contract_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_contract_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_contract_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_contract_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    UPDATE_TITLE: {
      ENDPOINT: (id) => `${API_BASE}/update/title/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_title.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_description.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_KIND: {
      ENDPOINT: (id) => `${API_BASE}/update/kind/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_kind.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_OWNERTYPE: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_ownerType.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_OWNERID: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_ownerId.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COUNTERPARTY: {
      ENDPOINT: (id) => `${API_BASE}/update/counterparty/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_counterparty.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILE: {
      ENDPOINT: (id) => `${API_BASE}/update/file/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_file.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EFFECTIVEFROM: {
      ENDPOINT: (id) => `${API_BASE}/update/effectiveFrom/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_effectiveFrom.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EFFECTIVETO: {
      ENDPOINT: (id) => `${API_BASE}/update/effectiveTo/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_effectiveTo.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_AUTORENEW: {
      ENDPOINT: (id) => `${API_BASE}/update/autoRenew/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_autoRenew.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_TERMINATIONNOTICEDAYS: {
      ENDPOINT: (id) => `${API_BASE}/update/terminationNoticeDays/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_terminationNoticeDays.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STATUS: {
      ENDPOINT: (id) => `${API_BASE}/update/status/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_status.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COMMISSIONPCT: {
      ENDPOINT: (id) => `${API_BASE}/update/commissionPct/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_commissionPct.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ADDITIONALCHARGES: {
      ENDPOINT: (id) => `${API_BASE}/update/additionalCharges/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_additionalCharges.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COMMITMENTS: {
      ENDPOINT: (id) => `${API_BASE}/update/commitments/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_commitments.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PAYMENT: {
      ENDPOINT: (id) => `${API_BASE}/update/payment/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_payment.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_HISTORY: {
      ENDPOINT: (id) => `${API_BASE}/update/history/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_history.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_notes.js",
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

export default CK_CONTRACT_CONFIG;