import { BACKEND_URL } from "../../siteSettings";

const BASE_URL = `${BACKEND_URL}/api/admin`;
const ADMIN_endpoints = {
  // AdminSignIn_helper.js configurations

  PROJECT: {
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
    GET_ALL: {
      ENDPOINT: `${BASE_URL}/getAll`,
      DISPLAY_NAME: "Project_getAll.js",
      PROPERTIES: {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
    ADD: {
      ENDPOINT: `${BASE_URL}/add`,
      DISPLAY_NAME: "Project_add.js",
      PROPERTIES: (payload) => {
        return {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        };
      },
    },
    UPDATE: {
      ENDPOINT: `${BASE_URL}/update`,
      DISPLAY_NAME: "Project_update.js",
      PROPERTIES: (payload) => {
        return {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        };
      },
    },
    UPDATE_IMAGES: {
      ENDPOINT: `${BASE_URL}/update_images`,
      DISPLAY_NAME: "Project_update_image.js",
      PROPERTIES: (payload) => {
        return {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        };
      },
    },
    UPDATE_FILES: {
      ENDPOINT: `${BASE_URL}/update_files`,
      DISPLAY_NAME: "Project_update_files.js",
      PROPERTIES: (payload) => {
        return {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        };
      },
    },
  },
};

export default ADMIN_endpoints;
