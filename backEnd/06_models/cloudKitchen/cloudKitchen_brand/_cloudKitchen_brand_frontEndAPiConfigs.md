# cloudKitchen_brand — Frontend API configs + apiHelpers

Mirrors controllers one-to-one. Config object: `CK_<SCHEMA>_CONFIG`. CRUD keys: `GET_ALL`, `GET_ONE`, `UPDATE_ALL`. apiHelper prefix: `CK_brnd_`.

**Shared shapes** (for reference — each entry inlines PROPERTIES fully):

```js
// POST + PUT body
(body) => ({
  method: "POST" | "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

// GET / DELETE (no body)
() => ({
  method: "GET" | "DELETE",
  credentials: "include",
})
```

---

## Brand

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_brand_endpoints/CK_BRAND_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_brand/cloudKitchen_brand/`
- **apiHelpers index**: `_cloudKitchen_brand.index.js` (barrel)

**Route prefix**: `/brand`

```js
const API_BASE = `${BACKEND_URL}/api/brand`;
```

### Config object: `CK_BRAND_CONFIG`

```js
const CK_BRAND_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_brnd_brand_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_brnd_brand_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_updateAll.js",
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
      DISPLAY_NAME: "CK_brnd_brand_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_TAGLINE: {
      ENDPOINT: (id) => `${API_BASE}/update/tagline/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_tagline.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SOCIALS: {
      ENDPOINT: (id) => `${API_BASE}/update/socials/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_socials.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_REGISTEREDIN: {
      ENDPOINT: (id) => `${API_BASE}/update/registeredIn/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_registeredIn.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_description.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PRICERANGE: {
      ENDPOINT: (id) => `${API_BASE}/update/priceRange/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_priceRange.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CUISINETAGS: {
      ENDPOINT: (id) => `${API_BASE}/update/cuisineTags/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_cuisineTags.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_WEBSITE: {
      ENDPOINT: (id) => `${API_BASE}/update/website/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_website.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTRACTS: {
      ENDPOINT: (id) => `${API_BASE}/update/contracts/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_contracts.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_INTEGRATIONS: {
      ENDPOINT: (id) => `${API_BASE}/update/integrations/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_integrations.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SIBLINGS: {
      ENDPOINT: (id) => `${API_BASE}/update/siblings/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_siblings.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EMPLOYEES: {
      ENDPOINT: (id) => `${API_BASE}/update/employees/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_employees.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EQUIPMENTS: {
      ENDPOINT: (id) => `${API_BASE}/update/equipments/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_equipments.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANCHES: {
      ENDPOINT: (id) => `${API_BASE}/update/branches/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_branches.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_MENUS: {
      ENDPOINT: (id) => `${API_BASE}/update/menus/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_menus.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COMPETITORS: {
      ENDPOINT: (id) => `${API_BASE}/update/competitors/${id}`,
      DISPLAY_NAME: "CK_brnd_brand_update_competitors.js",
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

export default CK_BRAND_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_brnd_brand_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_brnd_brand_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_brnd_brand_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_brnd_brand_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_brnd_brand_updateAll.js` |

### FIELDS entries (17)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_NAME` | PUT | `/update/name/:id` | `CK_brnd_brand_update_name.js` |
| `UPDATE_TAGLINE` | PUT | `/update/tagline/:id` | `CK_brnd_brand_update_tagline.js` |
| `UPDATE_FILES` | PUT | `/update/files/:id` | `CK_brnd_brand_update_files.js` |
| `UPDATE_SOCIALS` | PUT | `/update/socials/:id` | `CK_brnd_brand_update_socials.js` |
| `UPDATE_REGISTEREDIN` | PUT | `/update/registeredIn/:id` | `CK_brnd_brand_update_registeredIn.js` |
| `UPDATE_DESCRIPTION` | PUT | `/update/description/:id` | `CK_brnd_brand_update_description.js` |
| `UPDATE_PRICERANGE` | PUT | `/update/priceRange/:id` | `CK_brnd_brand_update_priceRange.js` |
| `UPDATE_CUISINETAGS` | PUT | `/update/cuisineTags/:id` | `CK_brnd_brand_update_cuisineTags.js` |
| `UPDATE_WEBSITE` | PUT | `/update/website/:id` | `CK_brnd_brand_update_website.js` |
| `UPDATE_CONTRACTS` | PUT | `/update/contracts/:id` | `CK_brnd_brand_update_contracts.js` |
| `UPDATE_INTEGRATIONS` | PUT | `/update/integrations/:id` | `CK_brnd_brand_update_integrations.js` |
| `UPDATE_SIBLINGS` | PUT | `/update/siblings/:id` | `CK_brnd_brand_update_siblings.js` |
| `UPDATE_EMPLOYEES` | PUT | `/update/employees/:id` | `CK_brnd_brand_update_employees.js` |
| `UPDATE_EQUIPMENTS` | PUT | `/update/equipments/:id` | `CK_brnd_brand_update_equipments.js` |
| `UPDATE_BRANCHES` | PUT | `/update/branches/:id` | `CK_brnd_brand_update_branches.js` |
| `UPDATE_MENUS` | PUT | `/update/menus/:id` | `CK_brnd_brand_update_menus.js` |
| `UPDATE_COMPETITORS` | PUT | `/update/competitors/:id` | `CK_brnd_brand_update_competitors.js` |

### RELATIONS entries

None for now — ref arrays (`cuisineTags`, `contracts`, `integrations`, `siblings`, `employees`, `equipments`, `branches`, `menus`, `competitors`) and single ref `website` are bulk-updated via FIELDS. Optional later: add/remove/reorder per relation.
| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_CUISINETAGS` | POST | `/cuisineTags/add/:id` |
| `REMOVE_CUISINETAGS` | DELETE | `/cuisineTags/remove/:id` |
| `REORDER_CUISINETAGS` | PUT | `/cuisineTags/reorder/:id` |
| `ADD_CONTRACTS` | POST | `/contracts/add/:id` |
| `REMOVE_CONTRACTS` | DELETE | `/contracts/remove/:id` |
| `REORDER_CONTRACTS` | PUT | `/contracts/reorder/:id` |
| `ADD_INTEGRATIONS` | POST | `/integrations/add/:id` |
| `REMOVE_INTEGRATIONS` | DELETE | `/integrations/remove/:id` |
| `REORDER_INTEGRATIONS` | PUT | `/integrations/reorder/:id` |
| `ADD_SIBLINGS` | POST | `/siblings/add/:id` |
| `REMOVE_SIBLINGS` | DELETE | `/siblings/remove/:id` |
| `REORDER_SIBLINGS` | PUT | `/siblings/reorder/:id` |
| `ADD_EMPLOYEES` | POST | `/employees/add/:id` |
| `REMOVE_EMPLOYEES` | DELETE | `/employees/remove/:id` |
| `REORDER_EMPLOYEES` | PUT | `/employees/reorder/:id` |
| `ADD_EQUIPMENTS` | POST | `/equipments/add/:id` |
| `REMOVE_EQUIPMENTS` | DELETE | `/equipments/remove/:id` |
| `REORDER_EQUIPMENTS` | PUT | `/equipments/reorder/:id` |
| `ADD_BRANCHES` | POST | `/branches/add/:id` |
| `REMOVE_BRANCHES` | DELETE | `/branches/remove/:id` |
| `REORDER_BRANCHES` | PUT | `/branches/reorder/:id` |
| `ADD_MENUS` | POST | `/menus/add/:id` |
| `REMOVE_MENUS` | DELETE | `/menus/remove/:id` |
| `REORDER_MENUS` | PUT | `/menus/reorder/:id` |
| `ADD_COMPETITORS` | POST | `/competitors/add/:id` |
| `REMOVE_COMPETITORS` | DELETE | `/competitors/remove/:id` |
| `REORDER_COMPETITORS` | PUT | `/competitors/reorder/:id` |

### GROUPED entries

Reserved — empty for now.

**Total for Brand**: 22 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_brnd_brand_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.CRUD.CREATE;` |
| `CK_brnd_brand_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.CRUD.GET_ALL;` |
| `CK_brnd_brand_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.CRUD.GET_ONE;` |
| `CK_brnd_brand_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.CRUD.DELETE;` |
| `CK_brnd_brand_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_brnd_brand_update_name.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_NAME;` |
| `CK_brnd_brand_update_tagline.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_TAGLINE;` |
| `CK_brnd_brand_update_files.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_FILES;` |
| `CK_brnd_brand_update_socials.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_SOCIALS;` |
| `CK_brnd_brand_update_registeredIn.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_REGISTEREDIN;` |
| `CK_brnd_brand_update_description.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_DESCRIPTION;` |
| `CK_brnd_brand_update_priceRange.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_PRICERANGE;` |
| `CK_brnd_brand_update_cuisineTags.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_CUISINETAGS;` |
| `CK_brnd_brand_update_website.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_WEBSITE;` |
| `CK_brnd_brand_update_contracts.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_CONTRACTS;` |
| `CK_brnd_brand_update_integrations.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_INTEGRATIONS;` |
| `CK_brnd_brand_update_siblings.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_SIBLINGS;` |
| `CK_brnd_brand_update_employees.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_EMPLOYEES;` |
| `CK_brnd_brand_update_equipments.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_EQUIPMENTS;` |
| `CK_brnd_brand_update_branches.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_BRANCHES;` |
| `CK_brnd_brand_update_menus.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_MENUS;` |
| `CK_brnd_brand_update_competitors.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRAND_CONFIG.FIELDS.UPDATE_COMPETITORS;` |

---

## Competitor

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_brand_endpoints/CK_COMPETITOR_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_brand/cloudKitchen_competitor/`
- **apiHelpers index**: `_cloudKitchen_competitor.index.js` (barrel)

**Route prefix**: `/competitor`

```js
const API_BASE = `${BACKEND_URL}/api/competitor`;
```

### Config object: `CK_COMPETITOR_CONFIG`

```js
const CK_COMPETITOR_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_brnd_competitor_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_brnd_competitor_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_updateAll.js",
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
      DISPLAY_NAME: "CK_brnd_competitor_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_description.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_MENUS: {
      ENDPOINT: (id) => `${API_BASE}/update/menus/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_menus.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PRICERANGE: {
      ENDPOINT: (id) => `${API_BASE}/update/priceRange/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_priceRange.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CUISINETAGS: {
      ENDPOINT: (id) => `${API_BASE}/update/cuisineTags/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_cuisineTags.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTACT: {
      ENDPOINT: (id) => `${API_BASE}/update/contact/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_contact.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SOCIALMEDIA: {
      ENDPOINT: (id) => `${API_BASE}/update/socialMedia/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_socialMedia.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_GLOBALOBSERVATIONS: {
      ENDPOINT: (id) => `${API_BASE}/update/globalObservations/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_globalObservations.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANCHES: {
      ENDPOINT: (id) => `${API_BASE}/update/branches/${id}`,
      DISPLAY_NAME: "CK_brnd_competitor_update_branches.js",
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

export default CK_COMPETITOR_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_brnd_competitor_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_brnd_competitor_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_brnd_competitor_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_brnd_competitor_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_brnd_competitor_updateAll.js` |

### FIELDS entries (10)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_NAME` | PUT | `/update/name/:id` | `CK_brnd_competitor_update_name.js` |
| `UPDATE_DESCRIPTION` | PUT | `/update/description/:id` | `CK_brnd_competitor_update_description.js` |
| `UPDATE_MENUS` | PUT | `/update/menus/:id` | `CK_brnd_competitor_update_menus.js` |
| `UPDATE_PRICERANGE` | PUT | `/update/priceRange/:id` | `CK_brnd_competitor_update_priceRange.js` |
| `UPDATE_CUISINETAGS` | PUT | `/update/cuisineTags/:id` | `CK_brnd_competitor_update_cuisineTags.js` |
| `UPDATE_FILES` | PUT | `/update/files/:id` | `CK_brnd_competitor_update_files.js` |
| `UPDATE_CONTACT` | PUT | `/update/contact/:id` | `CK_brnd_competitor_update_contact.js` |
| `UPDATE_SOCIALMEDIA` | PUT | `/update/socialMedia/:id` | `CK_brnd_competitor_update_socialMedia.js` |
| `UPDATE_GLOBALOBSERVATIONS` | PUT | `/update/globalObservations/:id` | `CK_brnd_competitor_update_globalObservations.js` |
| `UPDATE_BRANCHES` | PUT | `/update/branches/:id` | `CK_brnd_competitor_update_branches.js` |

### RELATIONS entries

None for now — ref arrays (`menus`, `cuisineTags`) are bulk-updated via FIELDS. Embedded subdoc array `branches` (with nested `competesWith`) is bulk-updated via FIELDS. Optional later: add/remove/reorder for ref arrays; grouped ops for nested branch CRUD inside a competitor document.
| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_MENUS` | POST | `/menus/add/:id` |
| `REMOVE_MENUS` | DELETE | `/menus/remove/:id` |
| `REORDER_MENUS` | PUT | `/menus/reorder/:id` |
| `ADD_CUISINETAGS` | POST | `/cuisineTags/add/:id` |
| `REMOVE_CUISINETAGS` | DELETE | `/cuisineTags/remove/:id` |
| `REORDER_CUISINETAGS` | PUT | `/cuisineTags/reorder/:id` |

### GROUPED entries

Reserved — empty for now.

**Total for Competitor**: 15 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_brnd_competitor_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.CRUD.CREATE;` |
| `CK_brnd_competitor_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.CRUD.GET_ALL;` |
| `CK_brnd_competitor_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.CRUD.GET_ONE;` |
| `CK_brnd_competitor_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.CRUD.DELETE;` |
| `CK_brnd_competitor_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_brnd_competitor_update_name.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_NAME;` |
| `CK_brnd_competitor_update_description.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_DESCRIPTION;` |
| `CK_brnd_competitor_update_menus.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_MENUS;` |
| `CK_brnd_competitor_update_priceRange.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_PRICERANGE;` |
| `CK_brnd_competitor_update_cuisineTags.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_CUISINETAGS;` |
| `CK_brnd_competitor_update_files.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_FILES;` |
| `CK_brnd_competitor_update_contact.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_CONTACT;` |
| `CK_brnd_competitor_update_socialMedia.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_SOCIALMEDIA;` |
| `CK_brnd_competitor_update_globalObservations.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_GLOBALOBSERVATIONS;` |
| `CK_brnd_competitor_update_branches.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_COMPETITOR_CONFIG.FIELDS.UPDATE_BRANCHES;` |

---
