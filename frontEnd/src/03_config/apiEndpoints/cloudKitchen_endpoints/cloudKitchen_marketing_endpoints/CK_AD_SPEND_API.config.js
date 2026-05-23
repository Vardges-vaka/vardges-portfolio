import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/adSpend`;

const CK_AD_SPEND_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_mkt_adSpend_create.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_mkt_adSpend_getAll.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_getOne.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_delete.js",
      PROPERTIES: () => ({
        method: "DELETE",
        credentials: "include",
      }),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_updateAll.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
  FIELDS: {
    UPDATE_SALESCHANNEL: {
      ENDPOINT: (id) => `${API_BASE}/update/salesChannel/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_salesChannel.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_KIND: {
      ENDPOINT: (id) => `${API_BASE}/update/kind/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_kind.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_PERIOD: {
      ENDPOINT: (id) => `${API_BASE}/update/period/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_period.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_AMOUNT: {
      ENDPOINT: (id) => `${API_BASE}/update/amount/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_amount.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_BASIS: {
      ENDPOINT: (id) => `${API_BASE}/update/basis/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_basis.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ISCONTRACTUAL: {
      ENDPOINT: (id) => `${API_BASE}/update/isContractual/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_isContractual.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CONTRACT: {
      ENDPOINT: (id) => `${API_BASE}/update/contract/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_contract.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_METRICS: {
      ENDPOINT: (id) => `${API_BASE}/update/metrics/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_metrics.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_NETSALESFORPERIOD: {
      ENDPOINT: (id) => `${API_BASE}/update/netSalesForPeriod/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_netSalesForPeriod.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SOURCE: {
      ENDPOINT: (id) => `${API_BASE}/update/source/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_source.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_files.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_mkt_adSpend_update_notes.js",
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

export default CK_AD_SPEND_CONFIG;
