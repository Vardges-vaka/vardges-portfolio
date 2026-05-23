# cloudKitchen_brand — Backend controllers, services, validators and routes

Reference for every model in `cloudKitchen_brand/`. Same 4-folder split as general/marketing (crud / fields / relations / grouped) + utils.

**Controllers root**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_Brand_cntrl/`

**Routes root**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_brand_routes/`

**Naming**: `cK_brnd_<schemaSlug>_<action>_cntrl` / `_srv` / `_vld` (e.g. `cK_brnd_brand_create_cntrl`).

Mount each router at `/api/<schemaSlug>`.

**Schemas**: Brand, Competitor

---

## Brand

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_brand/Brand.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_Brand_cntrl/cK_brnd_brand_crud_cntrl/`

### Top-level schema fields

`name`, `tagline`, `files`, `socials`, `registeredIn`, `description`, `priceRange`, `cuisineTags`, `website`, `contracts`, `integrations`, `siblings`, `employees`, `equipments`, `branches`, `menus`, `competitors`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_brnd_brand_crud_cntrl/ + barrel file: _cK_brnd_brand_crud_cntrl.index.js
├── 📁- cK_brnd_brand_crud_cntrl/ + barrel file: _cK_brnd_brand_crud_cntrl.index.js
├── 📁- cK_brnd_brand_fields_cntrl/ + barrel file: _cK_brnd_brand_fields_cntrl.index.js
├── 📁- cK_brnd_brand_relations_cntrl/ + barrel file: _cK_brnd_brand_relations_cntrl.index.js
├── 📁- cK_brnd_brand_grouped_cntrl/ (← reserve) + barrel file: _cK_brnd_brand_grouped_cntrl.index.js
└── 📁- cK_brnd_brand_cntrl_utils/ + barrel file: _cK_brnd_brand_cntrl_utils.index.js
    ├── 📁- cK_brnd_brand_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_brnd_brand_srv/ + barrel file: _cK_brnd_brand_srv.index.js
    │   ├── 📁- cK_brnd_brand_crud_srv/ + barrel file: _cK_brnd_brand_crud_srv.index.js
    │   ├── 📁- cK_brnd_brand_fields_srv/ + barrel file: _cK_brnd_brand_fields_srv.index.js
    │   ├── 📁- cK_brnd_brand_relations_srv/ + barrel file: _cK_brnd_brand_relations_srv.index.js
    │   └── 📁- cK_brnd_brand_grouped_srv/ (← reserve) + barrel file: _cK_brnd_brand_grouped_srv.index.js
    └── 📁- cK_brnd_brand_vld/ + barrel file: _cK_brnd_brand_vld.index.js
        ├── 📁- cK_brnd_brand_crud_vld/ + barrel file: _cK_brnd_brand_crud_vld.index.js
        ├── 📁- cK_brnd_brand_fields_vld/ + barrel file: _cK_brnd_brand_fields_vld.index.js
        ├── 📁- cK_brnd_brand_relations_vld/ + barrel file: _cK_brnd_brand_relations_vld.index.js
        └── 📁- cK_brnd_brand_grouped_vld/ (← reserve) + barrel file: _cK_brnd_brand_grouped_vld.index.js
```

### File naming convention

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_brnd_brand_create_cntrl.js` |
| Service | `cK_brnd_brand_create_srv.js` |
| Validator | `cK_brnd_brand_create_vld.js` |

### CRUD (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_brnd_brand_create` | POST | `/create` |
| `cK_brnd_brand_getAll` | GET | `/getAll` |
| `cK_brnd_brand_getOne` | GET | `/getOne/:id` |
| `cK_brnd_brand_delete` | DELETE | `/delete/:id` |
| `cK_brnd_brand_updateAll` | PUT | `/updateAll/:id` |

### FIELDS (17)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_brnd_brand_update_name` | PUT | `/update/name/:id` |
| `cK_brnd_brand_update_tagline` | PUT | `/update/tagline/:id` |
| `cK_brnd_brand_update_files` | PUT | `/update/files/:id` |
| `cK_brnd_brand_update_socials` | PUT | `/update/socials/:id` |
| `cK_brnd_brand_update_registeredIn` | PUT | `/update/registeredIn/:id` |
| `cK_brnd_brand_update_description` | PUT | `/update/description/:id` |
| `cK_brnd_brand_update_priceRange` | PUT | `/update/priceRange/:id` |
| `cK_brnd_brand_update_cuisineTags` | PUT | `/update/cuisineTags/:id` |
| `cK_brnd_brand_update_website` | PUT | `/update/website/:id` |
| `cK_brnd_brand_update_contracts` | PUT | `/update/contracts/:id` |
| `cK_brnd_brand_update_integrations` | PUT | `/update/integrations/:id` |
| `cK_brnd_brand_update_siblings` | PUT | `/update/siblings/:id` |
| `cK_brnd_brand_update_employees` | PUT | `/update/employees/:id` |
| `cK_brnd_brand_update_equipments` | PUT | `/update/equipments/:id` |
| `cK_brnd_brand_update_branches` | PUT | `/update/branches/:id` |
| `cK_brnd_brand_update_menus` | PUT | `/update/menus/:id` |
| `cK_brnd_brand_update_competitors` | PUT | `/update/competitors/:id` |

### Relations

None for now — ref arrays (`cuisineTags`, `contracts`, `integrations`, `siblings`, `employees`, `equipments`, `branches`, `menus`, `competitors`) and single ref `website` are bulk-updated via FIELDS. Optional later: add/remove/reorder per relation.
If granular add/remove/reorder is added later:

```
cK_brnd_brand_addCuisineTags        POST    /cuisineTags/add/:id
cK_brnd_brand_removeCuisineTags     DELETE  /cuisineTags/remove/:id
cK_brnd_brand_reorderCuisineTags    PUT     /cuisineTags/reorder/:id
cK_brnd_brand_addContracts        POST    /contracts/add/:id
cK_brnd_brand_removeContracts     DELETE  /contracts/remove/:id
cK_brnd_brand_reorderContracts    PUT     /contracts/reorder/:id
cK_brnd_brand_addIntegrations        POST    /integrations/add/:id
cK_brnd_brand_removeIntegrations     DELETE  /integrations/remove/:id
cK_brnd_brand_reorderIntegrations    PUT     /integrations/reorder/:id
cK_brnd_brand_addSiblings        POST    /siblings/add/:id
cK_brnd_brand_removeSiblings     DELETE  /siblings/remove/:id
cK_brnd_brand_reorderSiblings    PUT     /siblings/reorder/:id
cK_brnd_brand_addEmployees        POST    /employees/add/:id
cK_brnd_brand_removeEmployees     DELETE  /employees/remove/:id
cK_brnd_brand_reorderEmployees    PUT     /employees/reorder/:id
cK_brnd_brand_addEquipments        POST    /equipments/add/:id
cK_brnd_brand_removeEquipments     DELETE  /equipments/remove/:id
cK_brnd_brand_reorderEquipments    PUT     /equipments/reorder/:id
cK_brnd_brand_addBranches        POST    /branches/add/:id
cK_brnd_brand_removeBranches     DELETE  /branches/remove/:id
cK_brnd_brand_reorderBranches    PUT     /branches/reorder/:id
cK_brnd_brand_addMenus        POST    /menus/add/:id
cK_brnd_brand_removeMenus     DELETE  /menus/remove/:id
cK_brnd_brand_reorderMenus    PUT     /menus/reorder/:id
cK_brnd_brand_addCompetitors        POST    /competitors/add/:id
cK_brnd_brand_removeCompetitors     DELETE  /competitors/remove/:id
cK_brnd_brand_reorderCompetitors    PUT     /competitors/reorder/:id
```

### Grouped

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation (e.g. brand dashboard snapshot).

**Total scaffold for Brand**: 22 controllers + 22 validators + 22 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_brand_routes/brandRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_brnd_brand_create_vld,
  cK_brnd_brand_getAll_vld,
  cK_brnd_brand_getOne_vld,
  cK_brnd_brand_delete_vld,
  cK_brnd_brand_updateAll_vld,
  // Fields
  cK_brnd_brand_update_name_vld,
  cK_brnd_brand_update_tagline_vld,
  cK_brnd_brand_update_files_vld,
  cK_brnd_brand_update_socials_vld,
  cK_brnd_brand_update_registeredIn_vld,
  cK_brnd_brand_update_description_vld,
  cK_brnd_brand_update_priceRange_vld,
  cK_brnd_brand_update_cuisineTags_vld,
  cK_brnd_brand_update_website_vld,
  cK_brnd_brand_update_contracts_vld,
  cK_brnd_brand_update_integrations_vld,
  cK_brnd_brand_update_siblings_vld,
  cK_brnd_brand_update_employees_vld,
  cK_brnd_brand_update_equipments_vld,
  cK_brnd_brand_update_branches_vld,
  cK_brnd_brand_update_menus_vld,
  cK_brnd_brand_update_competitors_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_brnd_brand_create_cntrl,
  cK_brnd_brand_getAll_cntrl,
  cK_brnd_brand_getOne_cntrl,
  cK_brnd_brand_delete_cntrl,
  cK_brnd_brand_updateAll_cntrl,
  // Fields
  cK_brnd_brand_update_name_cntrl,
  cK_brnd_brand_update_tagline_cntrl,
  cK_brnd_brand_update_files_cntrl,
  cK_brnd_brand_update_socials_cntrl,
  cK_brnd_brand_update_registeredIn_cntrl,
  cK_brnd_brand_update_description_cntrl,
  cK_brnd_brand_update_priceRange_cntrl,
  cK_brnd_brand_update_cuisineTags_cntrl,
  cK_brnd_brand_update_website_cntrl,
  cK_brnd_brand_update_contracts_cntrl,
  cK_brnd_brand_update_integrations_cntrl,
  cK_brnd_brand_update_siblings_cntrl,
  cK_brnd_brand_update_employees_cntrl,
  cK_brnd_brand_update_equipments_cntrl,
  cK_brnd_brand_update_branches_cntrl,
  cK_brnd_brand_update_menus_cntrl,
  cK_brnd_brand_update_competitors_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_brnd_brand_create_vld), cK_brnd_brand_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_brnd_brand_getAll_vld), cK_brnd_brand_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_brnd_brand_getOne_vld), cK_brnd_brand_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_brnd_brand_delete_vld), cK_brnd_brand_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_brnd_brand_updateAll_vld), cK_brnd_brand_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_name_vld), cK_brnd_brand_update_name_cntrl);
router.put("/update/tagline/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_tagline_vld), cK_brnd_brand_update_tagline_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_files_vld), cK_brnd_brand_update_files_cntrl);
router.put("/update/socials/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_socials_vld), cK_brnd_brand_update_socials_cntrl);
router.put("/update/registeredIn/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_registeredIn_vld), cK_brnd_brand_update_registeredIn_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_description_vld), cK_brnd_brand_update_description_cntrl);
router.put("/update/priceRange/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_priceRange_vld), cK_brnd_brand_update_priceRange_cntrl);
router.put("/update/cuisineTags/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_cuisineTags_vld), cK_brnd_brand_update_cuisineTags_cntrl);
router.put("/update/website/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_website_vld), cK_brnd_brand_update_website_cntrl);
router.put("/update/contracts/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_contracts_vld), cK_brnd_brand_update_contracts_cntrl);
router.put("/update/integrations/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_integrations_vld), cK_brnd_brand_update_integrations_cntrl);
router.put("/update/siblings/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_siblings_vld), cK_brnd_brand_update_siblings_cntrl);
router.put("/update/employees/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_employees_vld), cK_brnd_brand_update_employees_cntrl);
router.put("/update/equipments/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_equipments_vld), cK_brnd_brand_update_equipments_cntrl);
router.put("/update/branches/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_branches_vld), cK_brnd_brand_update_branches_cntrl);
router.put("/update/menus/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_menus_vld), cK_brnd_brand_update_menus_cntrl);
router.put("/update/competitors/:id", vld_sntzr_mddlwre(cK_brnd_brand_update_competitors_vld), cK_brnd_brand_update_competitors_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

**Mount**: `/api/brand` — route export `cK_brnd_brandRoutes`

---

## Competitor

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_brand/Competitor.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_Brand_cntrl/cK_brnd_competitor_crud_cntrl/`

### Top-level schema fields

`name`, `description`, `menus`, `priceRange`, `cuisineTags`, `files`, `contact`, `socialMedia`, `globalObservations`, `branches`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_brnd_competitor_crud_cntrl/ + barrel file: _cK_brnd_competitor_crud_cntrl.index.js
├── 📁- cK_brnd_competitor_crud_cntrl/ + barrel file: _cK_brnd_competitor_crud_cntrl.index.js
├── 📁- cK_brnd_competitor_fields_cntrl/ + barrel file: _cK_brnd_competitor_fields_cntrl.index.js
├── 📁- cK_brnd_competitor_relations_cntrl/ + barrel file: _cK_brnd_competitor_relations_cntrl.index.js
├── 📁- cK_brnd_competitor_grouped_cntrl/ (← reserve) + barrel file: _cK_brnd_competitor_grouped_cntrl.index.js
└── 📁- cK_brnd_competitor_cntrl_utils/ + barrel file: _cK_brnd_competitor_cntrl_utils.index.js
    ├── 📁- cK_brnd_competitor_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_brnd_competitor_srv/ + barrel file: _cK_brnd_competitor_srv.index.js
    │   ├── 📁- cK_brnd_competitor_crud_srv/ + barrel file: _cK_brnd_competitor_crud_srv.index.js
    │   ├── 📁- cK_brnd_competitor_fields_srv/ + barrel file: _cK_brnd_competitor_fields_srv.index.js
    │   ├── 📁- cK_brnd_competitor_relations_srv/ + barrel file: _cK_brnd_competitor_relations_srv.index.js
    │   └── 📁- cK_brnd_competitor_grouped_srv/ (← reserve) + barrel file: _cK_brnd_competitor_grouped_srv.index.js
    └── 📁- cK_brnd_competitor_vld/ + barrel file: _cK_brnd_competitor_vld.index.js
        ├── 📁- cK_brnd_competitor_crud_vld/ + barrel file: _cK_brnd_competitor_crud_vld.index.js
        ├── 📁- cK_brnd_competitor_fields_vld/ + barrel file: _cK_brnd_competitor_fields_vld.index.js
        ├── 📁- cK_brnd_competitor_relations_vld/ + barrel file: _cK_brnd_competitor_relations_vld.index.js
        └── 📁- cK_brnd_competitor_grouped_vld/ (← reserve) + barrel file: _cK_brnd_competitor_grouped_vld.index.js
```

### File naming convention

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_brnd_competitor_create_cntrl.js` |
| Service | `cK_brnd_competitor_create_srv.js` |
| Validator | `cK_brnd_competitor_create_vld.js` |

### CRUD (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_brnd_competitor_create` | POST | `/create` |
| `cK_brnd_competitor_getAll` | GET | `/getAll` |
| `cK_brnd_competitor_getOne` | GET | `/getOne/:id` |
| `cK_brnd_competitor_delete` | DELETE | `/delete/:id` |
| `cK_brnd_competitor_updateAll` | PUT | `/updateAll/:id` |

### FIELDS (10)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_brnd_competitor_update_name` | PUT | `/update/name/:id` |
| `cK_brnd_competitor_update_description` | PUT | `/update/description/:id` |
| `cK_brnd_competitor_update_menus` | PUT | `/update/menus/:id` |
| `cK_brnd_competitor_update_priceRange` | PUT | `/update/priceRange/:id` |
| `cK_brnd_competitor_update_cuisineTags` | PUT | `/update/cuisineTags/:id` |
| `cK_brnd_competitor_update_files` | PUT | `/update/files/:id` |
| `cK_brnd_competitor_update_contact` | PUT | `/update/contact/:id` |
| `cK_brnd_competitor_update_socialMedia` | PUT | `/update/socialMedia/:id` |
| `cK_brnd_competitor_update_globalObservations` | PUT | `/update/globalObservations/:id` |
| `cK_brnd_competitor_update_branches` | PUT | `/update/branches/:id` |

### Relations

None for now — ref arrays (`menus`, `cuisineTags`) are bulk-updated via FIELDS. Embedded subdoc array `branches` (with nested `competesWith`) is bulk-updated via FIELDS. Optional later: add/remove/reorder for ref arrays; grouped ops for nested branch CRUD inside a competitor document.
If granular add/remove/reorder is added later:

```
cK_brnd_competitor_addMenus        POST    /menus/add/:id
cK_brnd_competitor_removeMenus     DELETE  /menus/remove/:id
cK_brnd_competitor_reorderMenus    PUT     /menus/reorder/:id
cK_brnd_competitor_addCuisineTags        POST    /cuisineTags/add/:id
cK_brnd_competitor_removeCuisineTags     DELETE  /cuisineTags/remove/:id
cK_brnd_competitor_reorderCuisineTags    PUT     /cuisineTags/reorder/:id
```

### Grouped

Reserved — empty for now. Candidate later: `addCompetitorBranch`, `updateCompetitorBranch`, `removeCompetitorBranch` for granular embedded-branch edits without replacing the whole `branches[]` array.

**Total scaffold for Competitor**: 15 controllers + 15 validators + 15 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_brand_routes/competitorRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_brnd_competitor_create_vld,
  cK_brnd_competitor_getAll_vld,
  cK_brnd_competitor_getOne_vld,
  cK_brnd_competitor_delete_vld,
  cK_brnd_competitor_updateAll_vld,
  // Fields
  cK_brnd_competitor_update_name_vld,
  cK_brnd_competitor_update_description_vld,
  cK_brnd_competitor_update_menus_vld,
  cK_brnd_competitor_update_priceRange_vld,
  cK_brnd_competitor_update_cuisineTags_vld,
  cK_brnd_competitor_update_files_vld,
  cK_brnd_competitor_update_contact_vld,
  cK_brnd_competitor_update_socialMedia_vld,
  cK_brnd_competitor_update_globalObservations_vld,
  cK_brnd_competitor_update_branches_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_brnd_competitor_create_cntrl,
  cK_brnd_competitor_getAll_cntrl,
  cK_brnd_competitor_getOne_cntrl,
  cK_brnd_competitor_delete_cntrl,
  cK_brnd_competitor_updateAll_cntrl,
  // Fields
  cK_brnd_competitor_update_name_cntrl,
  cK_brnd_competitor_update_description_cntrl,
  cK_brnd_competitor_update_menus_cntrl,
  cK_brnd_competitor_update_priceRange_cntrl,
  cK_brnd_competitor_update_cuisineTags_cntrl,
  cK_brnd_competitor_update_files_cntrl,
  cK_brnd_competitor_update_contact_cntrl,
  cK_brnd_competitor_update_socialMedia_cntrl,
  cK_brnd_competitor_update_globalObservations_cntrl,
  cK_brnd_competitor_update_branches_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_brnd_competitor_create_vld), cK_brnd_competitor_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_brnd_competitor_getAll_vld), cK_brnd_competitor_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_brnd_competitor_getOne_vld), cK_brnd_competitor_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_brnd_competitor_delete_vld), cK_brnd_competitor_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_brnd_competitor_updateAll_vld), cK_brnd_competitor_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_name_vld), cK_brnd_competitor_update_name_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_description_vld), cK_brnd_competitor_update_description_cntrl);
router.put("/update/menus/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_menus_vld), cK_brnd_competitor_update_menus_cntrl);
router.put("/update/priceRange/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_priceRange_vld), cK_brnd_competitor_update_priceRange_cntrl);
router.put("/update/cuisineTags/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_cuisineTags_vld), cK_brnd_competitor_update_cuisineTags_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_files_vld), cK_brnd_competitor_update_files_cntrl);
router.put("/update/contact/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_contact_vld), cK_brnd_competitor_update_contact_cntrl);
router.put("/update/socialMedia/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_socialMedia_vld), cK_brnd_competitor_update_socialMedia_cntrl);
router.put("/update/globalObservations/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_globalObservations_vld), cK_brnd_competitor_update_globalObservations_cntrl);
router.put("/update/branches/:id", vld_sntzr_mddlwre(cK_brnd_competitor_update_branches_vld), cK_brnd_competitor_update_branches_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

**Mount**: `/api/competitor` — route export `cK_brnd_competitorRoutes`

---
