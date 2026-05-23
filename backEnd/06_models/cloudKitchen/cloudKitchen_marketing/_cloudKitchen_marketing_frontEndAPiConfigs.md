# cloudKitchen_marketing — Frontend API configs + apiHelpers

Mirrors controllers one-to-one. Config object: `CK_<SCHEMA>_CONFIG`. CRUD keys: `GET_ALL`, `GET_ONE`, `UPDATE_ALL`. apiHelper prefix: `CK_mkt_`.

---

## Campaign

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_marketing_endpoints/CK_CAMPAIGN_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_marketing/cloudKitchen_campaign/`
- **apiHelpers index**: `_cloudKitchen_campaign.index.js` (barrel)

**Route prefix**: `/campaign`

```js
export const API_BASE = `${BACKEND_URL}/api/campaign`;
```

### Config object: `CK_CAMPAIGN_CONFIG`

```js
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
```

### CRUD entries

| Config key   | HTTP   | Endpoint         | DISPLAY_NAME (apiHelper file)  |
| ------------ | ------ | ---------------- | ------------------------------ |
| `CREATE`     | POST   | `/create`        | `CK_mkt_campaign_create.js`    |
| `GET_ALL`    | GET    | `/getAll`        | `CK_mkt_campaign_getAll.js`    |
| `GET_ONE`    | GET    | `/getOne/:id`    | `CK_mkt_campaign_getOne.js`    |
| `DELETE`     | DELETE | `/delete/:id`    | `CK_mkt_campaign_delete.js`    |
| `UPDATE_ALL` | PUT    | `/updateAll/:id` | `CK_mkt_campaign_updateAll.js` |

### FIELDS entries (17)

| Config key               | HTTP | Endpoint                      | DISPLAY_NAME (apiHelper file)               |
| ------------------------ | ---- | ----------------------------- | ------------------------------------------- |
| `UPDATE_NAME`            | PUT  | `/update/name/:id`            | `CK_mkt_campaign_update_name.js`            |
| `UPDATE_DESCRIPTION`     | PUT  | `/update/description/:id`     | `CK_mkt_campaign_update_description.js`     |
| `UPDATE_KIND`            | PUT  | `/update/kind/:id`            | `CK_mkt_campaign_update_kind.js`            |
| `UPDATE_SOURCE`          | PUT  | `/update/source/:id`          | `CK_mkt_campaign_update_source.js`          |
| `UPDATE_PLATFORMPROMOID` | PUT  | `/update/platformPromoId/:id` | `CK_mkt_campaign_update_platformPromoId.js` |
| `UPDATE_STATUS`          | PUT  | `/update/status/:id`          | `CK_mkt_campaign_update_status.js`          |
| `UPDATE_LIFECYCLE`       | PUT  | `/update/lifecycle/:id`       | `CK_mkt_campaign_update_lifecycle.js`       |
| `UPDATE_VALIDITY`        | PUT  | `/update/validity/:id`        | `CK_mkt_campaign_update_validity.js`        |
| `UPDATE_VALUETYPE`       | PUT  | `/update/valueType/:id`       | `CK_mkt_campaign_update_valueType.js`       |
| `UPDATE_VALUE`           | PUT  | `/update/value/:id`           | `CK_mkt_campaign_update_value.js`           |
| `UPDATE_CAP`             | PUT  | `/update/cap/:id`             | `CK_mkt_campaign_update_cap.js`             |
| `UPDATE_CURRENCY`        | PUT  | `/update/currency/:id`        | `CK_mkt_campaign_update_currency.js`        |
| `UPDATE_FUNDING`         | PUT  | `/update/funding/:id`         | `CK_mkt_campaign_update_funding.js`         |
| `UPDATE_CONDITIONS`      | PUT  | `/update/conditions/:id`      | `CK_mkt_campaign_update_conditions.js`      |
| `UPDATE_SALESCHANNELS`   | PUT  | `/update/salesChannels/:id`   | `CK_mkt_campaign_update_salesChannels.js`   |
| `UPDATE_FILES`           | PUT  | `/update/files/:id`           | `CK_mkt_campaign_update_files.js`           |
| `UPDATE_NOTES`           | PUT  | `/update/notes/:id`           | `CK_mkt_campaign_update_notes.js`           |

### RELATIONS entries

None for now — ref array `salesChannels` is bulk-updated via FIELDS. Optional later: add/remove/reorder per relation.

### GROUPED entries

Reserved — empty for now.

**Total for Campaign**: 22 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file                 | Import line                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| `CK_mkt_campaign_create.js`    | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.CRUD.CREATE;`     |
| `CK_mkt_campaign_getAll.js`    | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.CRUD.GET_ALL;`    |
| `CK_mkt_campaign_getOne.js`    | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.CRUD.GET_ONE;`    |
| `CK_mkt_campaign_delete.js`    | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.CRUD.DELETE;`     |
| `CK_mkt_campaign_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file                              | Import line                                                                                        |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `CK_mkt_campaign_update_name.js`            | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_NAME;`            |
| `CK_mkt_campaign_update_description.js`     | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_DESCRIPTION;`     |
| `CK_mkt_campaign_update_kind.js`            | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_KIND;`            |
| `CK_mkt_campaign_update_source.js`          | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_SOURCE;`          |
| `CK_mkt_campaign_update_platformPromoId.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_PLATFORMPROMOID;` |
| `CK_mkt_campaign_update_status.js`          | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_STATUS;`          |
| `CK_mkt_campaign_update_lifecycle.js`       | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_LIFECYCLE;`       |
| `CK_mkt_campaign_update_validity.js`        | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_VALIDITY;`        |
| `CK_mkt_campaign_update_valueType.js`       | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_VALUETYPE;`       |
| `CK_mkt_campaign_update_value.js`           | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_VALUE;`           |
| `CK_mkt_campaign_update_cap.js`             | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_CAP;`             |
| `CK_mkt_campaign_update_currency.js`        | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_CURRENCY;`        |
| `CK_mkt_campaign_update_funding.js`         | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_FUNDING;`         |
| `CK_mkt_campaign_update_conditions.js`      | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_CONDITIONS;`      |
| `CK_mkt_campaign_update_salesChannels.js`   | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_SALESCHANNELS;`   |
| `CK_mkt_campaign_update_files.js`           | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_FILES;`           |
| `CK_mkt_campaign_update_notes.js`           | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CAMPAIGN_CONFIG.FIELDS.UPDATE_NOTES;`           |

---

## AdSpend

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_marketing_endpoints/CK_AD_SPEND_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_marketing/cloudKitchen_adSpend/`
- **apiHelpers index**: `_cloudKitchen_adSpend.index.js` (barrel)

**Route prefix**: `/adSpend`

```js
export const API_BASE = `${BACKEND_URL}/api/adSpend`;
```

### Config object: `CK_AD_SPEND_CONFIG`

```js
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
```

### CRUD entries

| Config key   | HTTP   | Endpoint         | DISPLAY_NAME (apiHelper file) |
| ------------ | ------ | ---------------- | ----------------------------- |
| `CREATE`     | POST   | `/create`        | `CK_mkt_adSpend_create.js`    |
| `GET_ALL`    | GET    | `/getAll`        | `CK_mkt_adSpend_getAll.js`    |
| `GET_ONE`    | GET    | `/getOne/:id`    | `CK_mkt_adSpend_getOne.js`    |
| `DELETE`     | DELETE | `/delete/:id`    | `CK_mkt_adSpend_delete.js`    |
| `UPDATE_ALL` | PUT    | `/updateAll/:id` | `CK_mkt_adSpend_updateAll.js` |

### FIELDS entries (12)

| Config key                 | HTTP | Endpoint                        | DISPLAY_NAME (apiHelper file)                |
| -------------------------- | ---- | ------------------------------- | -------------------------------------------- |
| `UPDATE_SALESCHANNEL`      | PUT  | `/update/salesChannel/:id`      | `CK_mkt_adSpend_update_salesChannel.js`      |
| `UPDATE_KIND`              | PUT  | `/update/kind/:id`              | `CK_mkt_adSpend_update_kind.js`              |
| `UPDATE_PERIOD`            | PUT  | `/update/period/:id`            | `CK_mkt_adSpend_update_period.js`            |
| `UPDATE_AMOUNT`            | PUT  | `/update/amount/:id`            | `CK_mkt_adSpend_update_amount.js`            |
| `UPDATE_BASIS`             | PUT  | `/update/basis/:id`             | `CK_mkt_adSpend_update_basis.js`             |
| `UPDATE_ISCONTRACTUAL`     | PUT  | `/update/isContractual/:id`     | `CK_mkt_adSpend_update_isContractual.js`     |
| `UPDATE_CONTRACT`          | PUT  | `/update/contract/:id`          | `CK_mkt_adSpend_update_contract.js`          |
| `UPDATE_METRICS`           | PUT  | `/update/metrics/:id`           | `CK_mkt_adSpend_update_metrics.js`           |
| `UPDATE_NETSALESFORPERIOD` | PUT  | `/update/netSalesForPeriod/:id` | `CK_mkt_adSpend_update_netSalesForPeriod.js` |
| `UPDATE_SOURCE`            | PUT  | `/update/source/:id`            | `CK_mkt_adSpend_update_source.js`            |
| `UPDATE_FILES`             | PUT  | `/update/files/:id`             | `CK_mkt_adSpend_update_files.js`             |
| `UPDATE_NOTES`             | PUT  | `/update/notes/:id`             | `CK_mkt_adSpend_update_notes.js`             |

### RELATIONS entries

None for now — single refs (`salesChannel`, `contract`) are bulk-updated via FIELDS.

### GROUPED entries

Reserved — empty for now.

**Total for AdSpend**: 17 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file                | Import line                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| `CK_mkt_adSpend_create.js`    | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.CRUD.CREATE;`     |
| `CK_mkt_adSpend_getAll.js`    | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.CRUD.GET_ALL;`    |
| `CK_mkt_adSpend_getOne.js`    | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.CRUD.GET_ONE;`    |
| `CK_mkt_adSpend_delete.js`    | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.CRUD.DELETE;`     |
| `CK_mkt_adSpend_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file                               | Import line                                                                                          |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `CK_mkt_adSpend_update_salesChannel.js`      | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_SALESCHANNEL;`      |
| `CK_mkt_adSpend_update_kind.js`              | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_KIND;`              |
| `CK_mkt_adSpend_update_period.js`            | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_PERIOD;`            |
| `CK_mkt_adSpend_update_amount.js`            | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_AMOUNT;`            |
| `CK_mkt_adSpend_update_basis.js`             | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_BASIS;`             |
| `CK_mkt_adSpend_update_isContractual.js`     | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_ISCONTRACTUAL;`     |
| `CK_mkt_adSpend_update_contract.js`          | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_CONTRACT;`          |
| `CK_mkt_adSpend_update_metrics.js`           | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_METRICS;`           |
| `CK_mkt_adSpend_update_netSalesForPeriod.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_NETSALESFORPERIOD;` |
| `CK_mkt_adSpend_update_source.js`            | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_SOURCE;`            |
| `CK_mkt_adSpend_update_files.js`             | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_FILES;`             |
| `CK_mkt_adSpend_update_notes.js`             | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_AD_SPEND_CONFIG.FIELDS.UPDATE_NOTES;`             |

---
