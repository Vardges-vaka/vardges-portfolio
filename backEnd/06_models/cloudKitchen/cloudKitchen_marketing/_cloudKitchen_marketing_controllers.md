# cloudKitchen_marketing — Backend controllers, services, validators and routes

Reference for every model in `cloudKitchen_marketing/`. Same 4-folder split as general (crud / fields / relations / grouped) + utils.

**Controllers root**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_Marketing_cntrl/`

**Routes root**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_marketing_routes/`

**Naming**: `cK_mkt_<schemaSlug>_<action>_cntrl` / `_srv` / `_vld` (e.g. `cK_mkt_campaign_create_cntrl`).

Mount each router at `/api/<schemaSlug>`.

---

## Campaign

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_marketing/Campaign.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_Marketing_cntrl/cK_mkt_campaign_crud_cntrl/`

### Top-level schema fields

`name`, `description`, `kind`, `source`, `platformPromoId`, `status`, `lifecycle`, `validity`, `valueType`, `value`, `cap`, `currency`, `funding`, `conditions`, `salesChannels`, `files`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_mkt_campaign_crud_cntrl/ + barrel file: _cK_mkt_campaign_crud_cntrl.index.js
├── 📁- cK_mkt_campaign_crud_cntrl/ + barrel file: _cK_mkt_campaign_crud_cntrl.index.js
├── 📁- cK_mkt_campaign_fields_cntrl/ + barrel file: _cK_mkt_campaign_fields_cntrl.index.js
├── 📁- cK_mkt_campaign_relations_cntrl/ + barrel file: _cK_mkt_campaign_relations_cntrl.index.js
├── 📁- cK_mkt_campaign_grouped_cntrl/ (← reserve) + barrel file: _cK_mkt_campaign_grouped_cntrl.index.js
└── 📁- cK_mkt_campaign_cntrl_utils/ + barrel file: _cK_mkt_campaign_cntrl_utils.index.js
    ├── 📁- cK_mkt_campaign_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_mkt_campaign_srv/ + barrel file: _cK_mkt_campaign_srv.index.js
    │   ├── 📁- cK_mkt_campaign_crud_srv/ + barrel file: _cK_mkt_campaign_crud_srv.index.js
    │   ├── 📁- cK_mkt_campaign_fields_srv/ + barrel file: _cK_mkt_campaign_fields_srv.index.js
    │   ├── 📁- cK_mkt_campaign_relations_srv/ + barrel file: _cK_mkt_campaign_relations_srv.index.js
    │   └── 📁- cK_mkt_campaign_grouped_srv/ (← reserve) + barrel file: _cK_mkt_campaign_grouped_srv.index.js
    └── 📁- cK_mkt_campaign_vld/ + barrel file: _cK_mkt_campaign_vld.index.js
        ├── 📁- cK_mkt_campaign_crud_vld/ + barrel file: _cK_mkt_campaign_crud_vld.index.js
        ├── 📁- cK_mkt_campaign_fields_vld/ + barrel file: _cK_mkt_campaign_fields_vld.index.js
        ├── 📁- cK_mkt_campaign_relations_vld/ + barrel file: _cK_mkt_campaign_relations_vld.index.js
        └── 📁- cK_mkt_campaign_grouped_vld/ (← reserve) + barrel file: _cK_mkt_campaign_grouped_vld.index.js
```

### File naming convention

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_mkt_campaign_create_cntrl.js` |
| Service | `cK_mkt_campaign_create_srv.js` |
| Validator | `cK_mkt_campaign_create_vld.js` |

### CRUD (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_mkt_campaign_create` | POST | `/create` |
| `cK_mkt_campaign_getAll` | GET | `/getAll` |
| `cK_mkt_campaign_getOne` | GET | `/getOne/:id` |
| `cK_mkt_campaign_delete` | DELETE | `/delete/:id` |
| `cK_mkt_campaign_updateAll` | PUT | `/updateAll/:id` |

### FIELDS (17)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_mkt_campaign_update_name` | PUT | `/update/name/:id` |
| `cK_mkt_campaign_update_description` | PUT | `/update/description/:id` |
| `cK_mkt_campaign_update_kind` | PUT | `/update/kind/:id` |
| `cK_mkt_campaign_update_source` | PUT | `/update/source/:id` |
| `cK_mkt_campaign_update_platformPromoId` | PUT | `/update/platformPromoId/:id` |
| `cK_mkt_campaign_update_status` | PUT | `/update/status/:id` |
| `cK_mkt_campaign_update_lifecycle` | PUT | `/update/lifecycle/:id` |
| `cK_mkt_campaign_update_validity` | PUT | `/update/validity/:id` |
| `cK_mkt_campaign_update_valueType` | PUT | `/update/valueType/:id` |
| `cK_mkt_campaign_update_value` | PUT | `/update/value/:id` |
| `cK_mkt_campaign_update_cap` | PUT | `/update/cap/:id` |
| `cK_mkt_campaign_update_currency` | PUT | `/update/currency/:id` |
| `cK_mkt_campaign_update_funding` | PUT | `/update/funding/:id` |
| `cK_mkt_campaign_update_conditions` | PUT | `/update/conditions/:id` |
| `cK_mkt_campaign_update_salesChannels` | PUT | `/update/salesChannels/:id` |
| `cK_mkt_campaign_update_files` | PUT | `/update/files/:id` |
| `cK_mkt_campaign_update_notes` | PUT | `/update/notes/:id` |

### Relations

None for now — ref array `salesChannels` is bulk-updated via FIELDS. Optional later: add/remove/reorder per relation.

If granular add/remove/reorder is added later:

```
cK_mkt_campaign_addSalesChannels        POST    /salesChannels/add/:id
cK_mkt_campaign_removeSalesChannels     DELETE  /salesChannels/remove/:id
cK_mkt_campaign_reorderSalesChannels    PUT     /salesChannels/reorder/:id
```

### Grouped

Reserved — empty for now.

**Total scaffold for Campaign**: 22 controllers + 22 validators + 22 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_marketing_routes/campaignRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_mkt_campaign_create_vld,
  cK_mkt_campaign_getAll_vld,
  cK_mkt_campaign_getOne_vld,
  cK_mkt_campaign_delete_vld,
  cK_mkt_campaign_updateAll_vld,
  // Fields
  cK_mkt_campaign_update_name_vld,
  cK_mkt_campaign_update_description_vld,
  cK_mkt_campaign_update_kind_vld,
  cK_mkt_campaign_update_source_vld,
  cK_mkt_campaign_update_platformPromoId_vld,
  cK_mkt_campaign_update_status_vld,
  cK_mkt_campaign_update_lifecycle_vld,
  cK_mkt_campaign_update_validity_vld,
  cK_mkt_campaign_update_valueType_vld,
  cK_mkt_campaign_update_value_vld,
  cK_mkt_campaign_update_cap_vld,
  cK_mkt_campaign_update_currency_vld,
  cK_mkt_campaign_update_funding_vld,
  cK_mkt_campaign_update_conditions_vld,
  cK_mkt_campaign_update_salesChannels_vld,
  cK_mkt_campaign_update_files_vld,
  cK_mkt_campaign_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_mkt_campaign_create_cntrl,
  cK_mkt_campaign_getAll_cntrl,
  cK_mkt_campaign_getOne_cntrl,
  cK_mkt_campaign_delete_cntrl,
  cK_mkt_campaign_updateAll_cntrl,
  // Fields
  cK_mkt_campaign_update_name_cntrl,
  cK_mkt_campaign_update_description_cntrl,
  cK_mkt_campaign_update_kind_cntrl,
  cK_mkt_campaign_update_source_cntrl,
  cK_mkt_campaign_update_platformPromoId_cntrl,
  cK_mkt_campaign_update_status_cntrl,
  cK_mkt_campaign_update_lifecycle_cntrl,
  cK_mkt_campaign_update_validity_cntrl,
  cK_mkt_campaign_update_valueType_cntrl,
  cK_mkt_campaign_update_value_cntrl,
  cK_mkt_campaign_update_cap_cntrl,
  cK_mkt_campaign_update_currency_cntrl,
  cK_mkt_campaign_update_funding_cntrl,
  cK_mkt_campaign_update_conditions_cntrl,
  cK_mkt_campaign_update_salesChannels_cntrl,
  cK_mkt_campaign_update_files_cntrl,
  cK_mkt_campaign_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_mkt_campaign_create_vld), cK_mkt_campaign_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_mkt_campaign_getAll_vld), cK_mkt_campaign_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_mkt_campaign_getOne_vld), cK_mkt_campaign_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_mkt_campaign_delete_vld), cK_mkt_campaign_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_mkt_campaign_updateAll_vld), cK_mkt_campaign_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_name_vld), cK_mkt_campaign_update_name_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_description_vld), cK_mkt_campaign_update_description_cntrl);
router.put("/update/kind/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_kind_vld), cK_mkt_campaign_update_kind_cntrl);
router.put("/update/source/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_source_vld), cK_mkt_campaign_update_source_cntrl);
router.put("/update/platformPromoId/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_platformPromoId_vld), cK_mkt_campaign_update_platformPromoId_cntrl);
router.put("/update/status/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_status_vld), cK_mkt_campaign_update_status_cntrl);
router.put("/update/lifecycle/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_lifecycle_vld), cK_mkt_campaign_update_lifecycle_cntrl);
router.put("/update/validity/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_validity_vld), cK_mkt_campaign_update_validity_cntrl);
router.put("/update/valueType/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_valueType_vld), cK_mkt_campaign_update_valueType_cntrl);
router.put("/update/value/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_value_vld), cK_mkt_campaign_update_value_cntrl);
router.put("/update/cap/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_cap_vld), cK_mkt_campaign_update_cap_cntrl);
router.put("/update/currency/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_currency_vld), cK_mkt_campaign_update_currency_cntrl);
router.put("/update/funding/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_funding_vld), cK_mkt_campaign_update_funding_cntrl);
router.put("/update/conditions/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_conditions_vld), cK_mkt_campaign_update_conditions_cntrl);
router.put("/update/salesChannels/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_salesChannels_vld), cK_mkt_campaign_update_salesChannels_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_files_vld), cK_mkt_campaign_update_files_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_mkt_campaign_update_notes_vld), cK_mkt_campaign_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## AdSpend

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_marketing/AdSpend.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_Marketing_cntrl/cK_mkt_adSpend_crud_cntrl/`

### Top-level schema fields

`salesChannel`, `kind`, `period`, `amount`, `basis`, `isContractual`, `contract`, `metrics`, `netSalesForPeriod`, `source`, `files`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_mkt_adSpend_crud_cntrl/ + barrel file: _cK_mkt_adSpend_crud_cntrl.index.js
├── 📁- cK_mkt_adSpend_crud_cntrl/ + barrel file: _cK_mkt_adSpend_crud_cntrl.index.js
├── 📁- cK_mkt_adSpend_fields_cntrl/ + barrel file: _cK_mkt_adSpend_fields_cntrl.index.js
├── 📁- cK_mkt_adSpend_relations_cntrl/ + barrel file: _cK_mkt_adSpend_relations_cntrl.index.js
├── 📁- cK_mkt_adSpend_grouped_cntrl/ (← reserve) + barrel file: _cK_mkt_adSpend_grouped_cntrl.index.js
└── 📁- cK_mkt_adSpend_cntrl_utils/ + barrel file: _cK_mkt_adSpend_cntrl_utils.index.js
    ├── 📁- cK_mkt_adSpend_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_mkt_adSpend_srv/ + barrel file: _cK_mkt_adSpend_srv.index.js
    │   ├── 📁- cK_mkt_adSpend_crud_srv/ + barrel file: _cK_mkt_adSpend_crud_srv.index.js
    │   ├── 📁- cK_mkt_adSpend_fields_srv/ + barrel file: _cK_mkt_adSpend_fields_srv.index.js
    │   ├── 📁- cK_mkt_adSpend_relations_srv/ + barrel file: _cK_mkt_adSpend_relations_srv.index.js
    │   └── 📁- cK_mkt_adSpend_grouped_srv/ (← reserve) + barrel file: _cK_mkt_adSpend_grouped_srv.index.js
    └── 📁- cK_mkt_adSpend_vld/ + barrel file: _cK_mkt_adSpend_vld.index.js
        ├── 📁- cK_mkt_adSpend_crud_vld/ + barrel file: _cK_mkt_adSpend_crud_vld.index.js
        ├── 📁- cK_mkt_adSpend_fields_vld/ + barrel file: _cK_mkt_adSpend_fields_vld.index.js
        ├── 📁- cK_mkt_adSpend_relations_vld/ + barrel file: _cK_mkt_adSpend_relations_vld.index.js
        └── 📁- cK_mkt_adSpend_grouped_vld/ (← reserve) + barrel file: _cK_mkt_adSpend_grouped_vld.index.js
```

### File naming convention

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_mkt_adSpend_create_cntrl.js` |
| Service | `cK_mkt_adSpend_create_srv.js` |
| Validator | `cK_mkt_adSpend_create_vld.js` |

### CRUD (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_mkt_adSpend_create` | POST | `/create` |
| `cK_mkt_adSpend_getAll` | GET | `/getAll` |
| `cK_mkt_adSpend_getOne` | GET | `/getOne/:id` |
| `cK_mkt_adSpend_delete` | DELETE | `/delete/:id` |
| `cK_mkt_adSpend_updateAll` | PUT | `/updateAll/:id` |

### FIELDS (12)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_mkt_adSpend_update_salesChannel` | PUT | `/update/salesChannel/:id` |
| `cK_mkt_adSpend_update_kind` | PUT | `/update/kind/:id` |
| `cK_mkt_adSpend_update_period` | PUT | `/update/period/:id` |
| `cK_mkt_adSpend_update_amount` | PUT | `/update/amount/:id` |
| `cK_mkt_adSpend_update_basis` | PUT | `/update/basis/:id` |
| `cK_mkt_adSpend_update_isContractual` | PUT | `/update/isContractual/:id` |
| `cK_mkt_adSpend_update_contract` | PUT | `/update/contract/:id` |
| `cK_mkt_adSpend_update_metrics` | PUT | `/update/metrics/:id` |
| `cK_mkt_adSpend_update_netSalesForPeriod` | PUT | `/update/netSalesForPeriod/:id` |
| `cK_mkt_adSpend_update_source` | PUT | `/update/source/:id` |
| `cK_mkt_adSpend_update_files` | PUT | `/update/files/:id` |
| `cK_mkt_adSpend_update_notes` | PUT | `/update/notes/:id` |

### Relations

None for now — single refs (`salesChannel`, `contract`) are bulk-updated via FIELDS.



### Grouped

Reserved — empty for now.

**Total scaffold for AdSpend**: 17 controllers + 17 validators + 17 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_marketing_routes/adSpendRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_mkt_adSpend_create_vld,
  cK_mkt_adSpend_getAll_vld,
  cK_mkt_adSpend_getOne_vld,
  cK_mkt_adSpend_delete_vld,
  cK_mkt_adSpend_updateAll_vld,
  // Fields
  cK_mkt_adSpend_update_salesChannel_vld,
  cK_mkt_adSpend_update_kind_vld,
  cK_mkt_adSpend_update_period_vld,
  cK_mkt_adSpend_update_amount_vld,
  cK_mkt_adSpend_update_basis_vld,
  cK_mkt_adSpend_update_isContractual_vld,
  cK_mkt_adSpend_update_contract_vld,
  cK_mkt_adSpend_update_metrics_vld,
  cK_mkt_adSpend_update_netSalesForPeriod_vld,
  cK_mkt_adSpend_update_source_vld,
  cK_mkt_adSpend_update_files_vld,
  cK_mkt_adSpend_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_mkt_adSpend_create_cntrl,
  cK_mkt_adSpend_getAll_cntrl,
  cK_mkt_adSpend_getOne_cntrl,
  cK_mkt_adSpend_delete_cntrl,
  cK_mkt_adSpend_updateAll_cntrl,
  // Fields
  cK_mkt_adSpend_update_salesChannel_cntrl,
  cK_mkt_adSpend_update_kind_cntrl,
  cK_mkt_adSpend_update_period_cntrl,
  cK_mkt_adSpend_update_amount_cntrl,
  cK_mkt_adSpend_update_basis_cntrl,
  cK_mkt_adSpend_update_isContractual_cntrl,
  cK_mkt_adSpend_update_contract_cntrl,
  cK_mkt_adSpend_update_metrics_cntrl,
  cK_mkt_adSpend_update_netSalesForPeriod_cntrl,
  cK_mkt_adSpend_update_source_cntrl,
  cK_mkt_adSpend_update_files_cntrl,
  cK_mkt_adSpend_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_mkt_adSpend_create_vld), cK_mkt_adSpend_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_mkt_adSpend_getAll_vld), cK_mkt_adSpend_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_getOne_vld), cK_mkt_adSpend_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_delete_vld), cK_mkt_adSpend_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_updateAll_vld), cK_mkt_adSpend_updateAll_cntrl);

// ! Fields Routes

router.put("/update/salesChannel/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_salesChannel_vld), cK_mkt_adSpend_update_salesChannel_cntrl);
router.put("/update/kind/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_kind_vld), cK_mkt_adSpend_update_kind_cntrl);
router.put("/update/period/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_period_vld), cK_mkt_adSpend_update_period_cntrl);
router.put("/update/amount/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_amount_vld), cK_mkt_adSpend_update_amount_cntrl);
router.put("/update/basis/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_basis_vld), cK_mkt_adSpend_update_basis_cntrl);
router.put("/update/isContractual/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_isContractual_vld), cK_mkt_adSpend_update_isContractual_cntrl);
router.put("/update/contract/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_contract_vld), cK_mkt_adSpend_update_contract_cntrl);
router.put("/update/metrics/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_metrics_vld), cK_mkt_adSpend_update_metrics_cntrl);
router.put("/update/netSalesForPeriod/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_netSalesForPeriod_vld), cK_mkt_adSpend_update_netSalesForPeriod_cntrl);
router.put("/update/source/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_source_vld), cK_mkt_adSpend_update_source_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_files_vld), cK_mkt_adSpend_update_files_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_mkt_adSpend_update_notes_vld), cK_mkt_adSpend_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---