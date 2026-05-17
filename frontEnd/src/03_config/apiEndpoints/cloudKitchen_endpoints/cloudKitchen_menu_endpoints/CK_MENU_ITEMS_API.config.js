import { API_BASE } from "../../../siteSettings";

const CK_MENU_ITEMS_API_CONFIG = {
  CRUD: {
    GETALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CloudKitchen_menuItem_getAll.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    GETALL_BY_OWNERTYPE: {
      ENDPOINT: (ownerType) => `${API_BASE}/getAllByOwnerType/${ownerType}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_getAllByOwnerType.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CloudKitchen_menuItem_create.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    GETONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_getOne.js",
      PROPERTIES: () => ({
        method: "GET",
        credentials: "include",
      }),
    },
    UPDATEALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_updateAll.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_delete.js",
      PROPERTIES: () => ({
        method: "DELETE",
        credentials: "include",
      }),
    },
  },
  FIELDS: {
    UPDATE_OWNERTYPE: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_ownerType.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_OWNERID: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_ownerId.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_NAME: {
      ENDPOINT: (id) => `${API_BASE}/update/name/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_name.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_COST: {
      ENDPOINT: (id) => `${API_BASE}/update/cost/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_cost.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_description.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SELLINGPRICE: {
      ENDPOINT: (id) => `${API_BASE}/update/sellingPrice/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_sellingPrice.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CUISINETYPE: {
      ENDPOINT: (id) => `${API_BASE}/update/cuisineType/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_cuisineType.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_IMAGES: {
      ENDPOINT: (id) => `${API_BASE}/update/images/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_images.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_RECIPE: {
      ENDPOINT: (id) => `${API_BASE}/update/recipe/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_recipe.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_RECIPEFILE: {
      ENDPOINT: (id) => `${API_BASE}/update/recipeFile/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_recipeFile.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_TECHCARDFILE: {
      ENDPOINT: (id) => `${API_BASE}/update/techCardFile/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_techCardFile.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_OTHERFILES: {
      ENDPOINT: (id) => `${API_BASE}/update/otherFiles/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_otherFiles.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_PRICEHISTORY: {
      ENDPOINT: (id) => `${API_BASE}/update/priceHistory/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_priceHistory.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SIZEBYGRAMS: {
      ENDPOINT: (id) => `${API_BASE}/update/sizeByGrams/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_sizeByGrams.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_QUANTITY: {
      ENDPOINT: (id) => `${API_BASE}/update/quantity/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_quantity.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_DIETARYTAGS: {
      ENDPOINT: (id) => `${API_BASE}/update/dietaryTags/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_dietaryTags.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_ALLERGENS: {
      ENDPOINT: (id) => `${API_BASE}/update/allergens/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_allergens.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SPICYLEVEL: {
      ENDPOINT: (id) => `${API_BASE}/update/spicyLevel/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_spicyLevel.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_PREPARATIONTIMEMIN: {
      ENDPOINT: (id) => `${API_BASE}/update/preparationTimeMin/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_preparationTimeMin.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SKU: {
      ENDPOINT: (id) => `${API_BASE}/update/sku/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_sku.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_KITCHENSTATION: {
      ENDPOINT: (id) => `${API_BASE}/update/kitchenStation/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_kitchenStation.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_NUTRITION: {
      ENDPOINT: (id) => `${API_BASE}/update/nutrition/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_nutrition.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_SOURCE: {
      ENDPOINT: (id) => `${API_BASE}/update/source/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_source.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_EXTERNALID: {
      ENDPOINT: (id) => `${API_BASE}/update/externalId/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_externalId.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    UPDATE_CLOUDSTORAGE: {
      ENDPOINT: (id) => `${API_BASE}/update/cloudStorage/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_update_cloudStorage.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
  RELATIONS: {
    ADD_MODIFIERS: {
      ENDPOINT: (id) => `${API_BASE}/modifiers/add/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_addModifiers.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REMOVE_MODIFIERS: {
      ENDPOINT: (id) => `${API_BASE}/modifiers/remove/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_removeModifiers.js",
      PROPERTIES: (body) => ({
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REORDER_MODIFIERS: {
      ENDPOINT: (id) => `${API_BASE}/modifiers/reorder/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_reorderModifiers.js",
      PROPERTIES: (body) => ({
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    ADD_MIRRORS: {
      ENDPOINT: (id) => `${API_BASE}/mirrors/add/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_addMirrors.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REMOVE_MIRRORS: {
      ENDPOINT: (id) => `${API_BASE}/mirrors/remove/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_removeMirrors.js",
      PROPERTIES: (body) => ({
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    ADD_COMPETES: {
      ENDPOINT: (id) => `${API_BASE}/competes/add/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_addCompetes.js",
      PROPERTIES: (body) => ({
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
    REMOVE_COMPETES: {
      ENDPOINT: (id) => `${API_BASE}/competes/remove/${id}`,
      DISPLAY_NAME: "CloudKitchen_menuItem_removeCompetes.js",
      PROPERTIES: (body) => ({
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    },
  },
};

export default CK_MENU_ITEMS_API_CONFIG;
