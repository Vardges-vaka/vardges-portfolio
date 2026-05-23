import { BACKEND_URL } from "../../../siteSettings.js";

const API_BASE = `${BACKEND_URL}/api/rating`;

const CK_RATING_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_rating_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_rating_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_rating_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_rating_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_rating_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_rating_update_salesChannel.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ORDER: {
      ENDPOINT: (id) => `${API_BASE}/update/order/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_order.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PLATFORMORDERID: {
      ENDPOINT: (id) => `${API_BASE}/update/platformOrderId/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_platformOrderId.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CUSTOMER: {
      ENDPOINT: (id) => `${API_BASE}/update/customer/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_customer.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STARS: {
      ENDPOINT: (id) => `${API_BASE}/update/stars/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_stars.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COMMENT: {
      ENDPOINT: (id) => `${API_BASE}/update/comment/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_comment.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_RECEIVEDAT: {
      ENDPOINT: (id) => `${API_BASE}/update/receivedAt/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_receivedAt.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CUSTOMERNAMESNAPSHOT: {
      ENDPOINT: (id) => `${API_BASE}/update/customerNameSnapshot/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_customerNameSnapshot.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CUSTOMERLOYALTYTIER: {
      ENDPOINT: (id) => `${API_BASE}/update/customerLoyaltyTier/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_customerLoyaltyTier.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SENTIMENTTAG: {
      ENDPOINT: (id) => `${API_BASE}/update/sentimentTag/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_sentimentTag.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ITEMFEEDBACK: {
      ENDPOINT: (id) => `${API_BASE}/update/itemFeedback/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_itemFeedback.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ATTACHMENTS: {
      ENDPOINT: (id) => `${API_BASE}/update/attachments/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_attachments.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_REPLY: {
      ENDPOINT: (id) => `${API_BASE}/update/reply/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_reply.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SOURCE: {
      ENDPOINT: (id) => `${API_BASE}/update/source/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_source.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_rating_update_notes.js",
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

export default CK_RATING_CONFIG;