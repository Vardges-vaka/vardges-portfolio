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
};

export default ADMIN_endpoints;
