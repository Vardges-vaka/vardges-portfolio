# cloudKitchen_general — Backend controllers, services, validators and routes

Reference for every model in `cloudKitchen_general/`. Each section follows the locked 4-folder split (crud / fields / relations / grouped) + utils (hlpr / srv / vld).

**Controllers root**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/`

**Routes root**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/`

**Naming**: `cK_gen_<schemaSlug>_<action>_cntrl` / `_srv` / `_vld` (e.g. `cK_gen_cuisineTag_create_cntrl`).

Each collection has a top folder `cK_gen_<schemaSlug>_crud_cntrl/` containing crud, fields, relations, grouped, and cntrl_utils sub-trees. Mount each router at `/api/<schemaSlug>`.

---

## Branch

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/Branch.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_branch_crud_cntrl/`

### Top-level schema fields

`name`, `location`, `contact`, `files`, `operations`, `expenses`, `contracts`, `employees`, `equipments`, `brands`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_branch_crud_cntrl/ + barrel file: _cK_gen_branch_crud_cntrl.index.js
├── 📁- cK_gen_branch_crud_cntrl/ + barrel file: _cK_gen_branch_crud_cntrl.index.js
├── 📁- cK_gen_branch_fields_cntrl/ + barrel file: _cK_gen_branch_fields_cntrl.index.js
├── 📁- cK_gen_branch_relations_cntrl/ + barrel file: _cK_gen_branch_relations_cntrl.index.js
├── 📁- cK_gen_branch_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_branch_grouped_cntrl.index.js
└── 📁- cK_gen_branch_cntrl_utils/ + barrel file: _cK_gen_branch_cntrl_utils.index.js
    ├── 📁- cK_gen_branch_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_branch_srv/ + barrel file: _cK_gen_branch_srv.index.js
    │   ├── 📁- cK_gen_branch_crud_srv/ + barrel file: _cK_gen_branch_crud_srv.index.js
    │   ├── 📁- cK_gen_branch_fields_srv/ + barrel file: _cK_gen_branch_fields_srv.index.js
    │   ├── 📁- cK_gen_branch_relations_srv/ + barrel file: _cK_gen_branch_relations_srv.index.js
    │   └── 📁- cK_gen_branch_grouped_srv/ (← reserve) + barrel file: _cK_gen_branch_grouped_srv.index.js
    └── 📁- cK_gen_branch_vld/ + barrel file: _cK_gen_branch_vld.index.js
        ├── 📁- cK_gen_branch_crud_vld/ + barrel file: _cK_gen_branch_crud_vld.index.js
        ├── 📁- cK_gen_branch_fields_vld/ + barrel file: _cK_gen_branch_fields_vld.index.js
        ├── 📁- cK_gen_branch_relations_vld/ + barrel file: _cK_gen_branch_relations_vld.index.js
        └── 📁- cK_gen_branch_grouped_vld/ (← reserve) + barrel file: _cK_gen_branch_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_branch_create_cntrl.js` → export `cK_gen_branch_create_cntrl` |
| Service | `cK_gen_branch_create_srv.js` → export `cK_gen_branch_create_srv` |
| Validator | `cK_gen_branch_create_vld.js` → export `cK_gen_branch_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_branch_create` | POST | `/create` |
| `cK_gen_branch_getAll` | GET | `/getAll` |
| `cK_gen_branch_getOne` | GET | `/getOne/:id` |
| `cK_gen_branch_delete` | DELETE | `/delete/:id` |
| `cK_gen_branch_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (11)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_branch_update_name` | PUT | `/update/name/:id` |
| `cK_gen_branch_update_location` | PUT | `/update/location/:id` |
| `cK_gen_branch_update_contact` | PUT | `/update/contact/:id` |
| `cK_gen_branch_update_files` | PUT | `/update/files/:id` |
| `cK_gen_branch_update_operations` | PUT | `/update/operations/:id` |
| `cK_gen_branch_update_expenses` | PUT | `/update/expenses/:id` |
| `cK_gen_branch_update_contracts` | PUT | `/update/contracts/:id` |
| `cK_gen_branch_update_employees` | PUT | `/update/employees/:id` |
| `cK_gen_branch_update_equipments` | PUT | `/update/equipments/:id` |
| `cK_gen_branch_update_brands` | PUT | `/update/brands/:id` |
| `cK_gen_branch_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for Branch — ref arrays (`contracts`, `employees`, `equipments`, `brands`) are bulk-updated via FIELDS. Optional later: add/remove/reorder per relation.

If granular add/remove/reorder is added later:

```
cK_gen_branch_addContracts        POST    /contracts/add/:id
cK_gen_branch_removeContracts     DELETE  /contracts/remove/:id
cK_gen_branch_reorderContracts    PUT     /contracts/reorder/:id
cK_gen_branch_addEmployees        POST    /employees/add/:id
cK_gen_branch_removeEmployees     DELETE  /employees/remove/:id
cK_gen_branch_reorderEmployees    PUT     /employees/reorder/:id
cK_gen_branch_addEquipments        POST    /equipments/add/:id
cK_gen_branch_removeEquipments     DELETE  /equipments/remove/:id
cK_gen_branch_reorderEquipments    PUT     /equipments/reorder/:id
cK_gen_branch_addBrands        POST    /brands/add/:id
cK_gen_branch_removeBrands     DELETE  /brands/remove/:id
cK_gen_branch_reorderBrands    PUT     /brands/reorder/:id
```

### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for Branch**: 16 controllers + 16 validators + 16 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/branchRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_branch_create_vld,
  cK_gen_branch_getAll_vld,
  cK_gen_branch_getOne_vld,
  cK_gen_branch_delete_vld,
  cK_gen_branch_updateAll_vld,
  // Fields
  cK_gen_branch_update_name_vld,
  cK_gen_branch_update_location_vld,
  cK_gen_branch_update_contact_vld,
  cK_gen_branch_update_files_vld,
  cK_gen_branch_update_operations_vld,
  cK_gen_branch_update_expenses_vld,
  cK_gen_branch_update_contracts_vld,
  cK_gen_branch_update_employees_vld,
  cK_gen_branch_update_equipments_vld,
  cK_gen_branch_update_brands_vld,
  cK_gen_branch_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_branch_create_cntrl,
  cK_gen_branch_getAll_cntrl,
  cK_gen_branch_getOne_cntrl,
  cK_gen_branch_delete_cntrl,
  cK_gen_branch_updateAll_cntrl,
  // Fields
  cK_gen_branch_update_name_cntrl,
  cK_gen_branch_update_location_cntrl,
  cK_gen_branch_update_contact_cntrl,
  cK_gen_branch_update_files_cntrl,
  cK_gen_branch_update_operations_cntrl,
  cK_gen_branch_update_expenses_cntrl,
  cK_gen_branch_update_contracts_cntrl,
  cK_gen_branch_update_employees_cntrl,
  cK_gen_branch_update_equipments_cntrl,
  cK_gen_branch_update_brands_cntrl,
  cK_gen_branch_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_branch_create_vld), cK_gen_branch_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_branch_getAll_vld), cK_gen_branch_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_branch_getOne_vld), cK_gen_branch_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_branch_delete_vld), cK_gen_branch_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_branch_updateAll_vld), cK_gen_branch_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_gen_branch_update_name_vld), cK_gen_branch_update_name_cntrl);
router.put("/update/location/:id", vld_sntzr_mddlwre(cK_gen_branch_update_location_vld), cK_gen_branch_update_location_cntrl);
router.put("/update/contact/:id", vld_sntzr_mddlwre(cK_gen_branch_update_contact_vld), cK_gen_branch_update_contact_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_gen_branch_update_files_vld), cK_gen_branch_update_files_cntrl);
router.put("/update/operations/:id", vld_sntzr_mddlwre(cK_gen_branch_update_operations_vld), cK_gen_branch_update_operations_cntrl);
router.put("/update/expenses/:id", vld_sntzr_mddlwre(cK_gen_branch_update_expenses_vld), cK_gen_branch_update_expenses_cntrl);
router.put("/update/contracts/:id", vld_sntzr_mddlwre(cK_gen_branch_update_contracts_vld), cK_gen_branch_update_contracts_cntrl);
router.put("/update/employees/:id", vld_sntzr_mddlwre(cK_gen_branch_update_employees_vld), cK_gen_branch_update_employees_cntrl);
router.put("/update/equipments/:id", vld_sntzr_mddlwre(cK_gen_branch_update_equipments_vld), cK_gen_branch_update_equipments_cntrl);
router.put("/update/brands/:id", vld_sntzr_mddlwre(cK_gen_branch_update_brands_vld), cK_gen_branch_update_brands_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_branch_update_notes_vld), cK_gen_branch_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## Employee

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/Employee.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_employee_crud_cntrl/`

### Top-level schema fields

`name`, `personalDetails`, `address`, `files`, `uniform`, `certifications`, `employmentInfo`, `legalDocs`, `salary`, `attendanceInfo`, `relatedTo`, `branch`, `contracts`, `associatedBrands`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_employee_crud_cntrl/ + barrel file: _cK_gen_employee_crud_cntrl.index.js
├── 📁- cK_gen_employee_crud_cntrl/ + barrel file: _cK_gen_employee_crud_cntrl.index.js
├── 📁- cK_gen_employee_fields_cntrl/ + barrel file: _cK_gen_employee_fields_cntrl.index.js
├── 📁- cK_gen_employee_relations_cntrl/ + barrel file: _cK_gen_employee_relations_cntrl.index.js
├── 📁- cK_gen_employee_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_employee_grouped_cntrl.index.js
└── 📁- cK_gen_employee_cntrl_utils/ + barrel file: _cK_gen_employee_cntrl_utils.index.js
    ├── 📁- cK_gen_employee_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_employee_srv/ + barrel file: _cK_gen_employee_srv.index.js
    │   ├── 📁- cK_gen_employee_crud_srv/ + barrel file: _cK_gen_employee_crud_srv.index.js
    │   ├── 📁- cK_gen_employee_fields_srv/ + barrel file: _cK_gen_employee_fields_srv.index.js
    │   ├── 📁- cK_gen_employee_relations_srv/ + barrel file: _cK_gen_employee_relations_srv.index.js
    │   └── 📁- cK_gen_employee_grouped_srv/ (← reserve) + barrel file: _cK_gen_employee_grouped_srv.index.js
    └── 📁- cK_gen_employee_vld/ + barrel file: _cK_gen_employee_vld.index.js
        ├── 📁- cK_gen_employee_crud_vld/ + barrel file: _cK_gen_employee_crud_vld.index.js
        ├── 📁- cK_gen_employee_fields_vld/ + barrel file: _cK_gen_employee_fields_vld.index.js
        ├── 📁- cK_gen_employee_relations_vld/ + barrel file: _cK_gen_employee_relations_vld.index.js
        └── 📁- cK_gen_employee_grouped_vld/ (← reserve) + barrel file: _cK_gen_employee_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_employee_create_cntrl.js` → export `cK_gen_employee_create_cntrl` |
| Service | `cK_gen_employee_create_srv.js` → export `cK_gen_employee_create_srv` |
| Validator | `cK_gen_employee_create_vld.js` → export `cK_gen_employee_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_employee_create` | POST | `/create` |
| `cK_gen_employee_getAll` | GET | `/getAll` |
| `cK_gen_employee_getOne` | GET | `/getOne/:id` |
| `cK_gen_employee_delete` | DELETE | `/delete/:id` |
| `cK_gen_employee_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (15)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_employee_update_name` | PUT | `/update/name/:id` |
| `cK_gen_employee_update_personalDetails` | PUT | `/update/personalDetails/:id` |
| `cK_gen_employee_update_address` | PUT | `/update/address/:id` |
| `cK_gen_employee_update_files` | PUT | `/update/files/:id` |
| `cK_gen_employee_update_uniform` | PUT | `/update/uniform/:id` |
| `cK_gen_employee_update_certifications` | PUT | `/update/certifications/:id` |
| `cK_gen_employee_update_employmentInfo` | PUT | `/update/employmentInfo/:id` |
| `cK_gen_employee_update_legalDocs` | PUT | `/update/legalDocs/:id` |
| `cK_gen_employee_update_salary` | PUT | `/update/salary/:id` |
| `cK_gen_employee_update_attendanceInfo` | PUT | `/update/attendanceInfo/:id` |
| `cK_gen_employee_update_relatedTo` | PUT | `/update/relatedTo/:id` |
| `cK_gen_employee_update_branch` | PUT | `/update/branch/:id` |
| `cK_gen_employee_update_contracts` | PUT | `/update/contracts/:id` |
| `cK_gen_employee_update_associatedBrands` | PUT | `/update/associatedBrands/:id` |
| `cK_gen_employee_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for now — ref arrays (`relatedTo`, `contracts`, `associatedBrands`) are bulk-updated via FIELDS. Single ref `branch` is a field update.

If granular add/remove/reorder is added later:

```
cK_gen_employee_addRelatedTo        POST    /relatedTo/add/:id
cK_gen_employee_removeRelatedTo     DELETE  /relatedTo/remove/:id
cK_gen_employee_reorderRelatedTo    PUT     /relatedTo/reorder/:id
cK_gen_employee_addContracts        POST    /contracts/add/:id
cK_gen_employee_removeContracts     DELETE  /contracts/remove/:id
cK_gen_employee_reorderContracts    PUT     /contracts/reorder/:id
cK_gen_employee_addAssociatedBrands        POST    /associatedBrands/add/:id
cK_gen_employee_removeAssociatedBrands     DELETE  /associatedBrands/remove/:id
cK_gen_employee_reorderAssociatedBrands    PUT     /associatedBrands/reorder/:id
```

### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for Employee**: 20 controllers + 20 validators + 20 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/employeeRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_employee_create_vld,
  cK_gen_employee_getAll_vld,
  cK_gen_employee_getOne_vld,
  cK_gen_employee_delete_vld,
  cK_gen_employee_updateAll_vld,
  // Fields
  cK_gen_employee_update_name_vld,
  cK_gen_employee_update_personalDetails_vld,
  cK_gen_employee_update_address_vld,
  cK_gen_employee_update_files_vld,
  cK_gen_employee_update_uniform_vld,
  cK_gen_employee_update_certifications_vld,
  cK_gen_employee_update_employmentInfo_vld,
  cK_gen_employee_update_legalDocs_vld,
  cK_gen_employee_update_salary_vld,
  cK_gen_employee_update_attendanceInfo_vld,
  cK_gen_employee_update_relatedTo_vld,
  cK_gen_employee_update_branch_vld,
  cK_gen_employee_update_contracts_vld,
  cK_gen_employee_update_associatedBrands_vld,
  cK_gen_employee_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_employee_create_cntrl,
  cK_gen_employee_getAll_cntrl,
  cK_gen_employee_getOne_cntrl,
  cK_gen_employee_delete_cntrl,
  cK_gen_employee_updateAll_cntrl,
  // Fields
  cK_gen_employee_update_name_cntrl,
  cK_gen_employee_update_personalDetails_cntrl,
  cK_gen_employee_update_address_cntrl,
  cK_gen_employee_update_files_cntrl,
  cK_gen_employee_update_uniform_cntrl,
  cK_gen_employee_update_certifications_cntrl,
  cK_gen_employee_update_employmentInfo_cntrl,
  cK_gen_employee_update_legalDocs_cntrl,
  cK_gen_employee_update_salary_cntrl,
  cK_gen_employee_update_attendanceInfo_cntrl,
  cK_gen_employee_update_relatedTo_cntrl,
  cK_gen_employee_update_branch_cntrl,
  cK_gen_employee_update_contracts_cntrl,
  cK_gen_employee_update_associatedBrands_cntrl,
  cK_gen_employee_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_employee_create_vld), cK_gen_employee_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_employee_getAll_vld), cK_gen_employee_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_employee_getOne_vld), cK_gen_employee_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_employee_delete_vld), cK_gen_employee_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_employee_updateAll_vld), cK_gen_employee_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_gen_employee_update_name_vld), cK_gen_employee_update_name_cntrl);
router.put("/update/personalDetails/:id", vld_sntzr_mddlwre(cK_gen_employee_update_personalDetails_vld), cK_gen_employee_update_personalDetails_cntrl);
router.put("/update/address/:id", vld_sntzr_mddlwre(cK_gen_employee_update_address_vld), cK_gen_employee_update_address_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_gen_employee_update_files_vld), cK_gen_employee_update_files_cntrl);
router.put("/update/uniform/:id", vld_sntzr_mddlwre(cK_gen_employee_update_uniform_vld), cK_gen_employee_update_uniform_cntrl);
router.put("/update/certifications/:id", vld_sntzr_mddlwre(cK_gen_employee_update_certifications_vld), cK_gen_employee_update_certifications_cntrl);
router.put("/update/employmentInfo/:id", vld_sntzr_mddlwre(cK_gen_employee_update_employmentInfo_vld), cK_gen_employee_update_employmentInfo_cntrl);
router.put("/update/legalDocs/:id", vld_sntzr_mddlwre(cK_gen_employee_update_legalDocs_vld), cK_gen_employee_update_legalDocs_cntrl);
router.put("/update/salary/:id", vld_sntzr_mddlwre(cK_gen_employee_update_salary_vld), cK_gen_employee_update_salary_cntrl);
router.put("/update/attendanceInfo/:id", vld_sntzr_mddlwre(cK_gen_employee_update_attendanceInfo_vld), cK_gen_employee_update_attendanceInfo_cntrl);
router.put("/update/relatedTo/:id", vld_sntzr_mddlwre(cK_gen_employee_update_relatedTo_vld), cK_gen_employee_update_relatedTo_cntrl);
router.put("/update/branch/:id", vld_sntzr_mddlwre(cK_gen_employee_update_branch_vld), cK_gen_employee_update_branch_cntrl);
router.put("/update/contracts/:id", vld_sntzr_mddlwre(cK_gen_employee_update_contracts_vld), cK_gen_employee_update_contracts_cntrl);
router.put("/update/associatedBrands/:id", vld_sntzr_mddlwre(cK_gen_employee_update_associatedBrands_vld), cK_gen_employee_update_associatedBrands_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_employee_update_notes_vld), cK_gen_employee_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## Equipment

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/Equipment.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_equipment_crud_cntrl/`

### Top-level schema fields

`name`, `category`, `assetTag`, `description`, `storedIn`, `branch`, `status`, `purchase`, `warranty`, `decommissionedAt`, `decommissionReason`, `maintenance`, `contracts`, `files`, `depreciation`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_equipment_crud_cntrl/ + barrel file: _cK_gen_equipment_crud_cntrl.index.js
├── 📁- cK_gen_equipment_crud_cntrl/ + barrel file: _cK_gen_equipment_crud_cntrl.index.js
├── 📁- cK_gen_equipment_fields_cntrl/ + barrel file: _cK_gen_equipment_fields_cntrl.index.js
├── 📁- cK_gen_equipment_relations_cntrl/ + barrel file: _cK_gen_equipment_relations_cntrl.index.js
├── 📁- cK_gen_equipment_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_equipment_grouped_cntrl.index.js
└── 📁- cK_gen_equipment_cntrl_utils/ + barrel file: _cK_gen_equipment_cntrl_utils.index.js
    ├── 📁- cK_gen_equipment_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_equipment_srv/ + barrel file: _cK_gen_equipment_srv.index.js
    │   ├── 📁- cK_gen_equipment_crud_srv/ + barrel file: _cK_gen_equipment_crud_srv.index.js
    │   ├── 📁- cK_gen_equipment_fields_srv/ + barrel file: _cK_gen_equipment_fields_srv.index.js
    │   ├── 📁- cK_gen_equipment_relations_srv/ + barrel file: _cK_gen_equipment_relations_srv.index.js
    │   └── 📁- cK_gen_equipment_grouped_srv/ (← reserve) + barrel file: _cK_gen_equipment_grouped_srv.index.js
    └── 📁- cK_gen_equipment_vld/ + barrel file: _cK_gen_equipment_vld.index.js
        ├── 📁- cK_gen_equipment_crud_vld/ + barrel file: _cK_gen_equipment_crud_vld.index.js
        ├── 📁- cK_gen_equipment_fields_vld/ + barrel file: _cK_gen_equipment_fields_vld.index.js
        ├── 📁- cK_gen_equipment_relations_vld/ + barrel file: _cK_gen_equipment_relations_vld.index.js
        └── 📁- cK_gen_equipment_grouped_vld/ (← reserve) + barrel file: _cK_gen_equipment_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_equipment_create_cntrl.js` → export `cK_gen_equipment_create_cntrl` |
| Service | `cK_gen_equipment_create_srv.js` → export `cK_gen_equipment_create_srv` |
| Validator | `cK_gen_equipment_create_vld.js` → export `cK_gen_equipment_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_equipment_create` | POST | `/create` |
| `cK_gen_equipment_getAll` | GET | `/getAll` |
| `cK_gen_equipment_getOne` | GET | `/getOne/:id` |
| `cK_gen_equipment_delete` | DELETE | `/delete/:id` |
| `cK_gen_equipment_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (16)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_equipment_update_name` | PUT | `/update/name/:id` |
| `cK_gen_equipment_update_category` | PUT | `/update/category/:id` |
| `cK_gen_equipment_update_assetTag` | PUT | `/update/assetTag/:id` |
| `cK_gen_equipment_update_description` | PUT | `/update/description/:id` |
| `cK_gen_equipment_update_storedIn` | PUT | `/update/storedIn/:id` |
| `cK_gen_equipment_update_branch` | PUT | `/update/branch/:id` |
| `cK_gen_equipment_update_status` | PUT | `/update/status/:id` |
| `cK_gen_equipment_update_purchase` | PUT | `/update/purchase/:id` |
| `cK_gen_equipment_update_warranty` | PUT | `/update/warranty/:id` |
| `cK_gen_equipment_update_decommissionedAt` | PUT | `/update/decommissionedAt/:id` |
| `cK_gen_equipment_update_decommissionReason` | PUT | `/update/decommissionReason/:id` |
| `cK_gen_equipment_update_maintenance` | PUT | `/update/maintenance/:id` |
| `cK_gen_equipment_update_contracts` | PUT | `/update/contracts/:id` |
| `cK_gen_equipment_update_files` | PUT | `/update/files/:id` |
| `cK_gen_equipment_update_depreciation` | PUT | `/update/depreciation/:id` |
| `cK_gen_equipment_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for now — ref array `contracts` is bulk-updated via FIELDS. Single ref `branch` is a field update.

If granular add/remove/reorder is added later:

```
cK_gen_equipment_addContracts        POST    /contracts/add/:id
cK_gen_equipment_removeContracts     DELETE  /contracts/remove/:id
cK_gen_equipment_reorderContracts    PUT     /contracts/reorder/:id
```

### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for Equipment**: 21 controllers + 21 validators + 21 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/equipmentRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_equipment_create_vld,
  cK_gen_equipment_getAll_vld,
  cK_gen_equipment_getOne_vld,
  cK_gen_equipment_delete_vld,
  cK_gen_equipment_updateAll_vld,
  // Fields
  cK_gen_equipment_update_name_vld,
  cK_gen_equipment_update_category_vld,
  cK_gen_equipment_update_assetTag_vld,
  cK_gen_equipment_update_description_vld,
  cK_gen_equipment_update_storedIn_vld,
  cK_gen_equipment_update_branch_vld,
  cK_gen_equipment_update_status_vld,
  cK_gen_equipment_update_purchase_vld,
  cK_gen_equipment_update_warranty_vld,
  cK_gen_equipment_update_decommissionedAt_vld,
  cK_gen_equipment_update_decommissionReason_vld,
  cK_gen_equipment_update_maintenance_vld,
  cK_gen_equipment_update_contracts_vld,
  cK_gen_equipment_update_files_vld,
  cK_gen_equipment_update_depreciation_vld,
  cK_gen_equipment_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_equipment_create_cntrl,
  cK_gen_equipment_getAll_cntrl,
  cK_gen_equipment_getOne_cntrl,
  cK_gen_equipment_delete_cntrl,
  cK_gen_equipment_updateAll_cntrl,
  // Fields
  cK_gen_equipment_update_name_cntrl,
  cK_gen_equipment_update_category_cntrl,
  cK_gen_equipment_update_assetTag_cntrl,
  cK_gen_equipment_update_description_cntrl,
  cK_gen_equipment_update_storedIn_cntrl,
  cK_gen_equipment_update_branch_cntrl,
  cK_gen_equipment_update_status_cntrl,
  cK_gen_equipment_update_purchase_cntrl,
  cK_gen_equipment_update_warranty_cntrl,
  cK_gen_equipment_update_decommissionedAt_cntrl,
  cK_gen_equipment_update_decommissionReason_cntrl,
  cK_gen_equipment_update_maintenance_cntrl,
  cK_gen_equipment_update_contracts_cntrl,
  cK_gen_equipment_update_files_cntrl,
  cK_gen_equipment_update_depreciation_cntrl,
  cK_gen_equipment_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_equipment_create_vld), cK_gen_equipment_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_equipment_getAll_vld), cK_gen_equipment_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_equipment_getOne_vld), cK_gen_equipment_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_equipment_delete_vld), cK_gen_equipment_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_equipment_updateAll_vld), cK_gen_equipment_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_name_vld), cK_gen_equipment_update_name_cntrl);
router.put("/update/category/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_category_vld), cK_gen_equipment_update_category_cntrl);
router.put("/update/assetTag/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_assetTag_vld), cK_gen_equipment_update_assetTag_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_description_vld), cK_gen_equipment_update_description_cntrl);
router.put("/update/storedIn/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_storedIn_vld), cK_gen_equipment_update_storedIn_cntrl);
router.put("/update/branch/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_branch_vld), cK_gen_equipment_update_branch_cntrl);
router.put("/update/status/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_status_vld), cK_gen_equipment_update_status_cntrl);
router.put("/update/purchase/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_purchase_vld), cK_gen_equipment_update_purchase_cntrl);
router.put("/update/warranty/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_warranty_vld), cK_gen_equipment_update_warranty_cntrl);
router.put("/update/decommissionedAt/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_decommissionedAt_vld), cK_gen_equipment_update_decommissionedAt_cntrl);
router.put("/update/decommissionReason/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_decommissionReason_vld), cK_gen_equipment_update_decommissionReason_cntrl);
router.put("/update/maintenance/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_maintenance_vld), cK_gen_equipment_update_maintenance_cntrl);
router.put("/update/contracts/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_contracts_vld), cK_gen_equipment_update_contracts_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_files_vld), cK_gen_equipment_update_files_cntrl);
router.put("/update/depreciation/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_depreciation_vld), cK_gen_equipment_update_depreciation_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_equipment_update_notes_vld), cK_gen_equipment_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## Customer

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/Customer.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_customer_crud_cntrl/`

### Top-level schema fields

`name`, `aliases`, `contact`, `addresses`, `encounteredOn`, `orderStats`, `complaints`, `source`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_customer_crud_cntrl/ + barrel file: _cK_gen_customer_crud_cntrl.index.js
├── 📁- cK_gen_customer_crud_cntrl/ + barrel file: _cK_gen_customer_crud_cntrl.index.js
├── 📁- cK_gen_customer_fields_cntrl/ + barrel file: _cK_gen_customer_fields_cntrl.index.js
├── 📁- cK_gen_customer_relations_cntrl/ + barrel file: _cK_gen_customer_relations_cntrl.index.js
├── 📁- cK_gen_customer_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_customer_grouped_cntrl.index.js
└── 📁- cK_gen_customer_cntrl_utils/ + barrel file: _cK_gen_customer_cntrl_utils.index.js
    ├── 📁- cK_gen_customer_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_customer_srv/ + barrel file: _cK_gen_customer_srv.index.js
    │   ├── 📁- cK_gen_customer_crud_srv/ + barrel file: _cK_gen_customer_crud_srv.index.js
    │   ├── 📁- cK_gen_customer_fields_srv/ + barrel file: _cK_gen_customer_fields_srv.index.js
    │   ├── 📁- cK_gen_customer_relations_srv/ + barrel file: _cK_gen_customer_relations_srv.index.js
    │   └── 📁- cK_gen_customer_grouped_srv/ (← reserve) + barrel file: _cK_gen_customer_grouped_srv.index.js
    └── 📁- cK_gen_customer_vld/ + barrel file: _cK_gen_customer_vld.index.js
        ├── 📁- cK_gen_customer_crud_vld/ + barrel file: _cK_gen_customer_crud_vld.index.js
        ├── 📁- cK_gen_customer_fields_vld/ + barrel file: _cK_gen_customer_fields_vld.index.js
        ├── 📁- cK_gen_customer_relations_vld/ + barrel file: _cK_gen_customer_relations_vld.index.js
        └── 📁- cK_gen_customer_grouped_vld/ (← reserve) + barrel file: _cK_gen_customer_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_customer_create_cntrl.js` → export `cK_gen_customer_create_cntrl` |
| Service | `cK_gen_customer_create_srv.js` → export `cK_gen_customer_create_srv` |
| Validator | `cK_gen_customer_create_vld.js` → export `cK_gen_customer_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_customer_create` | POST | `/create` |
| `cK_gen_customer_getAll` | GET | `/getAll` |
| `cK_gen_customer_getOne` | GET | `/getOne/:id` |
| `cK_gen_customer_delete` | DELETE | `/delete/:id` |
| `cK_gen_customer_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (9)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_customer_update_name` | PUT | `/update/name/:id` |
| `cK_gen_customer_update_aliases` | PUT | `/update/aliases/:id` |
| `cK_gen_customer_update_contact` | PUT | `/update/contact/:id` |
| `cK_gen_customer_update_addresses` | PUT | `/update/addresses/:id` |
| `cK_gen_customer_update_encounteredOn` | PUT | `/update/encounteredOn/:id` |
| `cK_gen_customer_update_orderStats` | PUT | `/update/orderStats/:id` |
| `cK_gen_customer_update_complaints` | PUT | `/update/complaints/:id` |
| `cK_gen_customer_update_source` | PUT | `/update/source/:id` |
| `cK_gen_customer_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for now — nested arrays are bulk-updated via FIELDS.



### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for Customer**: 14 controllers + 14 validators + 14 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/customerRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_customer_create_vld,
  cK_gen_customer_getAll_vld,
  cK_gen_customer_getOne_vld,
  cK_gen_customer_delete_vld,
  cK_gen_customer_updateAll_vld,
  // Fields
  cK_gen_customer_update_name_vld,
  cK_gen_customer_update_aliases_vld,
  cK_gen_customer_update_contact_vld,
  cK_gen_customer_update_addresses_vld,
  cK_gen_customer_update_encounteredOn_vld,
  cK_gen_customer_update_orderStats_vld,
  cK_gen_customer_update_complaints_vld,
  cK_gen_customer_update_source_vld,
  cK_gen_customer_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_customer_create_cntrl,
  cK_gen_customer_getAll_cntrl,
  cK_gen_customer_getOne_cntrl,
  cK_gen_customer_delete_cntrl,
  cK_gen_customer_updateAll_cntrl,
  // Fields
  cK_gen_customer_update_name_cntrl,
  cK_gen_customer_update_aliases_cntrl,
  cK_gen_customer_update_contact_cntrl,
  cK_gen_customer_update_addresses_cntrl,
  cK_gen_customer_update_encounteredOn_cntrl,
  cK_gen_customer_update_orderStats_cntrl,
  cK_gen_customer_update_complaints_cntrl,
  cK_gen_customer_update_source_cntrl,
  cK_gen_customer_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_customer_create_vld), cK_gen_customer_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_customer_getAll_vld), cK_gen_customer_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_customer_getOne_vld), cK_gen_customer_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_customer_delete_vld), cK_gen_customer_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_customer_updateAll_vld), cK_gen_customer_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_gen_customer_update_name_vld), cK_gen_customer_update_name_cntrl);
router.put("/update/aliases/:id", vld_sntzr_mddlwre(cK_gen_customer_update_aliases_vld), cK_gen_customer_update_aliases_cntrl);
router.put("/update/contact/:id", vld_sntzr_mddlwre(cK_gen_customer_update_contact_vld), cK_gen_customer_update_contact_cntrl);
router.put("/update/addresses/:id", vld_sntzr_mddlwre(cK_gen_customer_update_addresses_vld), cK_gen_customer_update_addresses_cntrl);
router.put("/update/encounteredOn/:id", vld_sntzr_mddlwre(cK_gen_customer_update_encounteredOn_vld), cK_gen_customer_update_encounteredOn_cntrl);
router.put("/update/orderStats/:id", vld_sntzr_mddlwre(cK_gen_customer_update_orderStats_vld), cK_gen_customer_update_orderStats_cntrl);
router.put("/update/complaints/:id", vld_sntzr_mddlwre(cK_gen_customer_update_complaints_vld), cK_gen_customer_update_complaints_cntrl);
router.put("/update/source/:id", vld_sntzr_mddlwre(cK_gen_customer_update_source_vld), cK_gen_customer_update_source_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_customer_update_notes_vld), cK_gen_customer_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## CuisineTag

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/CuisineTag.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_cuisineTag_crud_cntrl/`

### Top-level schema fields

`value`, `label`, `description`, `platforms`, `kind`, `source`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_cuisineTag_crud_cntrl/ + barrel file: _cK_gen_cuisineTag_crud_cntrl.index.js
├── 📁- cK_gen_cuisineTag_crud_cntrl/ + barrel file: _cK_gen_cuisineTag_crud_cntrl.index.js
├── 📁- cK_gen_cuisineTag_fields_cntrl/ + barrel file: _cK_gen_cuisineTag_fields_cntrl.index.js
├── 📁- cK_gen_cuisineTag_relations_cntrl/ + barrel file: _cK_gen_cuisineTag_relations_cntrl.index.js
├── 📁- cK_gen_cuisineTag_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_cuisineTag_grouped_cntrl.index.js
└── 📁- cK_gen_cuisineTag_cntrl_utils/ + barrel file: _cK_gen_cuisineTag_cntrl_utils.index.js
    ├── 📁- cK_gen_cuisineTag_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_cuisineTag_srv/ + barrel file: _cK_gen_cuisineTag_srv.index.js
    │   ├── 📁- cK_gen_cuisineTag_crud_srv/ + barrel file: _cK_gen_cuisineTag_crud_srv.index.js
    │   ├── 📁- cK_gen_cuisineTag_fields_srv/ + barrel file: _cK_gen_cuisineTag_fields_srv.index.js
    │   ├── 📁- cK_gen_cuisineTag_relations_srv/ + barrel file: _cK_gen_cuisineTag_relations_srv.index.js
    │   └── 📁- cK_gen_cuisineTag_grouped_srv/ (← reserve) + barrel file: _cK_gen_cuisineTag_grouped_srv.index.js
    └── 📁- cK_gen_cuisineTag_vld/ + barrel file: _cK_gen_cuisineTag_vld.index.js
        ├── 📁- cK_gen_cuisineTag_crud_vld/ + barrel file: _cK_gen_cuisineTag_crud_vld.index.js
        ├── 📁- cK_gen_cuisineTag_fields_vld/ + barrel file: _cK_gen_cuisineTag_fields_vld.index.js
        ├── 📁- cK_gen_cuisineTag_relations_vld/ + barrel file: _cK_gen_cuisineTag_relations_vld.index.js
        └── 📁- cK_gen_cuisineTag_grouped_vld/ (← reserve) + barrel file: _cK_gen_cuisineTag_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_cuisineTag_create_cntrl.js` → export `cK_gen_cuisineTag_create_cntrl` |
| Service | `cK_gen_cuisineTag_create_srv.js` → export `cK_gen_cuisineTag_create_srv` |
| Validator | `cK_gen_cuisineTag_create_vld.js` → export `cK_gen_cuisineTag_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_cuisineTag_create` | POST | `/create` |
| `cK_gen_cuisineTag_getAll` | GET | `/getAll` |
| `cK_gen_cuisineTag_getOne` | GET | `/getOne/:id` |
| `cK_gen_cuisineTag_delete` | DELETE | `/delete/:id` |
| `cK_gen_cuisineTag_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (6)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_cuisineTag_update_value` | PUT | `/update/value/:id` |
| `cK_gen_cuisineTag_update_label` | PUT | `/update/label/:id` |
| `cK_gen_cuisineTag_update_description` | PUT | `/update/description/:id` |
| `cK_gen_cuisineTag_update_platforms` | PUT | `/update/platforms/:id` |
| `cK_gen_cuisineTag_update_kind` | PUT | `/update/kind/:id` |
| `cK_gen_cuisineTag_update_source` | PUT | `/update/source/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None — reference data; no relation routes.



### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for CuisineTag**: 11 controllers + 11 validators + 11 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/cuisineTagRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_cuisineTag_create_vld,
  cK_gen_cuisineTag_getAll_vld,
  cK_gen_cuisineTag_getOne_vld,
  cK_gen_cuisineTag_delete_vld,
  cK_gen_cuisineTag_updateAll_vld,
  // Fields
  cK_gen_cuisineTag_update_value_vld,
  cK_gen_cuisineTag_update_label_vld,
  cK_gen_cuisineTag_update_description_vld,
  cK_gen_cuisineTag_update_platforms_vld,
  cK_gen_cuisineTag_update_kind_vld,
  cK_gen_cuisineTag_update_source_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_cuisineTag_create_cntrl,
  cK_gen_cuisineTag_getAll_cntrl,
  cK_gen_cuisineTag_getOne_cntrl,
  cK_gen_cuisineTag_delete_cntrl,
  cK_gen_cuisineTag_updateAll_cntrl,
  // Fields
  cK_gen_cuisineTag_update_value_cntrl,
  cK_gen_cuisineTag_update_label_cntrl,
  cK_gen_cuisineTag_update_description_cntrl,
  cK_gen_cuisineTag_update_platforms_cntrl,
  cK_gen_cuisineTag_update_kind_cntrl,
  cK_gen_cuisineTag_update_source_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_cuisineTag_create_vld), cK_gen_cuisineTag_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_cuisineTag_getAll_vld), cK_gen_cuisineTag_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_getOne_vld), cK_gen_cuisineTag_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_delete_vld), cK_gen_cuisineTag_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_updateAll_vld), cK_gen_cuisineTag_updateAll_cntrl);

// ! Fields Routes

router.put("/update/value/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_update_value_vld), cK_gen_cuisineTag_update_value_cntrl);
router.put("/update/label/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_update_label_vld), cK_gen_cuisineTag_update_label_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_update_description_vld), cK_gen_cuisineTag_update_description_cntrl);
router.put("/update/platforms/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_update_platforms_vld), cK_gen_cuisineTag_update_platforms_cntrl);
router.put("/update/kind/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_update_kind_vld), cK_gen_cuisineTag_update_kind_cntrl);
router.put("/update/source/:id", vld_sntzr_mddlwre(cK_gen_cuisineTag_update_source_vld), cK_gen_cuisineTag_update_source_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## Integration

> **Security:** credential field updates require extra validation; never expose secrets in list/get responses.

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/Integration.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_integration_crud_cntrl/`

### Top-level schema fields

`provider`, `kind`, `accountLabel`, `description`, `status`, `lifecycle`, `links`, `payment`, `loginCredentials`, `kam`, `support`, `scheduledMaintenances`, `brands`, `branches`, `contract`, `files`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_integration_crud_cntrl/ + barrel file: _cK_gen_integration_crud_cntrl.index.js
├── 📁- cK_gen_integration_crud_cntrl/ + barrel file: _cK_gen_integration_crud_cntrl.index.js
├── 📁- cK_gen_integration_fields_cntrl/ + barrel file: _cK_gen_integration_fields_cntrl.index.js
├── 📁- cK_gen_integration_relations_cntrl/ + barrel file: _cK_gen_integration_relations_cntrl.index.js
├── 📁- cK_gen_integration_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_integration_grouped_cntrl.index.js
└── 📁- cK_gen_integration_cntrl_utils/ + barrel file: _cK_gen_integration_cntrl_utils.index.js
    ├── 📁- cK_gen_integration_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_integration_srv/ + barrel file: _cK_gen_integration_srv.index.js
    │   ├── 📁- cK_gen_integration_crud_srv/ + barrel file: _cK_gen_integration_crud_srv.index.js
    │   ├── 📁- cK_gen_integration_fields_srv/ + barrel file: _cK_gen_integration_fields_srv.index.js
    │   ├── 📁- cK_gen_integration_relations_srv/ + barrel file: _cK_gen_integration_relations_srv.index.js
    │   └── 📁- cK_gen_integration_grouped_srv/ (← reserve) + barrel file: _cK_gen_integration_grouped_srv.index.js
    └── 📁- cK_gen_integration_vld/ + barrel file: _cK_gen_integration_vld.index.js
        ├── 📁- cK_gen_integration_crud_vld/ + barrel file: _cK_gen_integration_crud_vld.index.js
        ├── 📁- cK_gen_integration_fields_vld/ + barrel file: _cK_gen_integration_fields_vld.index.js
        ├── 📁- cK_gen_integration_relations_vld/ + barrel file: _cK_gen_integration_relations_vld.index.js
        └── 📁- cK_gen_integration_grouped_vld/ (← reserve) + barrel file: _cK_gen_integration_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_integration_create_cntrl.js` → export `cK_gen_integration_create_cntrl` |
| Service | `cK_gen_integration_create_srv.js` → export `cK_gen_integration_create_srv` |
| Validator | `cK_gen_integration_create_vld.js` → export `cK_gen_integration_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_integration_create` | POST | `/create` |
| `cK_gen_integration_getAll` | GET | `/getAll` |
| `cK_gen_integration_getOne` | GET | `/getOne/:id` |
| `cK_gen_integration_delete` | DELETE | `/delete/:id` |
| `cK_gen_integration_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (17)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_integration_update_provider` | PUT | `/update/provider/:id` |
| `cK_gen_integration_update_kind` | PUT | `/update/kind/:id` |
| `cK_gen_integration_update_accountLabel` | PUT | `/update/accountLabel/:id` |
| `cK_gen_integration_update_description` | PUT | `/update/description/:id` |
| `cK_gen_integration_update_status` | PUT | `/update/status/:id` |
| `cK_gen_integration_update_lifecycle` | PUT | `/update/lifecycle/:id` |
| `cK_gen_integration_update_links` | PUT | `/update/links/:id` |
| `cK_gen_integration_update_payment` | PUT | `/update/payment/:id` |
| `cK_gen_integration_update_loginCredentials` | PUT | `/update/loginCredentials/:id` |
| `cK_gen_integration_update_kam` | PUT | `/update/kam/:id` |
| `cK_gen_integration_update_support` | PUT | `/update/support/:id` |
| `cK_gen_integration_update_scheduledMaintenances` | PUT | `/update/scheduledMaintenances/:id` |
| `cK_gen_integration_update_brands` | PUT | `/update/brands/:id` |
| `cK_gen_integration_update_branches` | PUT | `/update/branches/:id` |
| `cK_gen_integration_update_contract` | PUT | `/update/contract/:id` |
| `cK_gen_integration_update_files` | PUT | `/update/files/:id` |
| `cK_gen_integration_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for now — ref arrays (`brands`, `branches`) are bulk-updated via FIELDS. Single ref `contract` is a field update. **Security:** `loginCredentials` must never be returned in GET responses.

If granular add/remove/reorder is added later:

```
cK_gen_integration_addBrands        POST    /brands/add/:id
cK_gen_integration_removeBrands     DELETE  /brands/remove/:id
cK_gen_integration_reorderBrands    PUT     /brands/reorder/:id
cK_gen_integration_addBranches        POST    /branches/add/:id
cK_gen_integration_removeBranches     DELETE  /branches/remove/:id
cK_gen_integration_reorderBranches    PUT     /branches/reorder/:id
```

### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for Integration**: 22 controllers + 22 validators + 22 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/integrationRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_integration_create_vld,
  cK_gen_integration_getAll_vld,
  cK_gen_integration_getOne_vld,
  cK_gen_integration_delete_vld,
  cK_gen_integration_updateAll_vld,
  // Fields
  cK_gen_integration_update_provider_vld,
  cK_gen_integration_update_kind_vld,
  cK_gen_integration_update_accountLabel_vld,
  cK_gen_integration_update_description_vld,
  cK_gen_integration_update_status_vld,
  cK_gen_integration_update_lifecycle_vld,
  cK_gen_integration_update_links_vld,
  cK_gen_integration_update_payment_vld,
  cK_gen_integration_update_loginCredentials_vld,
  cK_gen_integration_update_kam_vld,
  cK_gen_integration_update_support_vld,
  cK_gen_integration_update_scheduledMaintenances_vld,
  cK_gen_integration_update_brands_vld,
  cK_gen_integration_update_branches_vld,
  cK_gen_integration_update_contract_vld,
  cK_gen_integration_update_files_vld,
  cK_gen_integration_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_integration_create_cntrl,
  cK_gen_integration_getAll_cntrl,
  cK_gen_integration_getOne_cntrl,
  cK_gen_integration_delete_cntrl,
  cK_gen_integration_updateAll_cntrl,
  // Fields
  cK_gen_integration_update_provider_cntrl,
  cK_gen_integration_update_kind_cntrl,
  cK_gen_integration_update_accountLabel_cntrl,
  cK_gen_integration_update_description_cntrl,
  cK_gen_integration_update_status_cntrl,
  cK_gen_integration_update_lifecycle_cntrl,
  cK_gen_integration_update_links_cntrl,
  cK_gen_integration_update_payment_cntrl,
  cK_gen_integration_update_loginCredentials_cntrl,
  cK_gen_integration_update_kam_cntrl,
  cK_gen_integration_update_support_cntrl,
  cK_gen_integration_update_scheduledMaintenances_cntrl,
  cK_gen_integration_update_brands_cntrl,
  cK_gen_integration_update_branches_cntrl,
  cK_gen_integration_update_contract_cntrl,
  cK_gen_integration_update_files_cntrl,
  cK_gen_integration_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_integration_create_vld), cK_gen_integration_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_integration_getAll_vld), cK_gen_integration_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_integration_getOne_vld), cK_gen_integration_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_integration_delete_vld), cK_gen_integration_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_integration_updateAll_vld), cK_gen_integration_updateAll_cntrl);

// ! Fields Routes

router.put("/update/provider/:id", vld_sntzr_mddlwre(cK_gen_integration_update_provider_vld), cK_gen_integration_update_provider_cntrl);
router.put("/update/kind/:id", vld_sntzr_mddlwre(cK_gen_integration_update_kind_vld), cK_gen_integration_update_kind_cntrl);
router.put("/update/accountLabel/:id", vld_sntzr_mddlwre(cK_gen_integration_update_accountLabel_vld), cK_gen_integration_update_accountLabel_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_gen_integration_update_description_vld), cK_gen_integration_update_description_cntrl);
router.put("/update/status/:id", vld_sntzr_mddlwre(cK_gen_integration_update_status_vld), cK_gen_integration_update_status_cntrl);
router.put("/update/lifecycle/:id", vld_sntzr_mddlwre(cK_gen_integration_update_lifecycle_vld), cK_gen_integration_update_lifecycle_cntrl);
router.put("/update/links/:id", vld_sntzr_mddlwre(cK_gen_integration_update_links_vld), cK_gen_integration_update_links_cntrl);
router.put("/update/payment/:id", vld_sntzr_mddlwre(cK_gen_integration_update_payment_vld), cK_gen_integration_update_payment_cntrl);
router.put("/update/loginCredentials/:id", vld_sntzr_mddlwre(cK_gen_integration_update_loginCredentials_vld), cK_gen_integration_update_loginCredentials_cntrl);
router.put("/update/kam/:id", vld_sntzr_mddlwre(cK_gen_integration_update_kam_vld), cK_gen_integration_update_kam_cntrl);
router.put("/update/support/:id", vld_sntzr_mddlwre(cK_gen_integration_update_support_vld), cK_gen_integration_update_support_cntrl);
router.put("/update/scheduledMaintenances/:id", vld_sntzr_mddlwre(cK_gen_integration_update_scheduledMaintenances_vld), cK_gen_integration_update_scheduledMaintenances_cntrl);
router.put("/update/brands/:id", vld_sntzr_mddlwre(cK_gen_integration_update_brands_vld), cK_gen_integration_update_brands_cntrl);
router.put("/update/branches/:id", vld_sntzr_mddlwre(cK_gen_integration_update_branches_vld), cK_gen_integration_update_branches_cntrl);
router.put("/update/contract/:id", vld_sntzr_mddlwre(cK_gen_integration_update_contract_vld), cK_gen_integration_update_contract_cntrl);
router.put("/update/files/:id", vld_sntzr_mddlwre(cK_gen_integration_update_files_vld), cK_gen_integration_update_files_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_integration_update_notes_vld), cK_gen_integration_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## Invoice

> **DRAFT** — schema may change.

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/Invoice.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_invoice_crud_cntrl/`

### Top-level schema fields

_none yet_
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_invoice_crud_cntrl/ + barrel file: _cK_gen_invoice_crud_cntrl.index.js
├── 📁- cK_gen_invoice_crud_cntrl/ + barrel file: _cK_gen_invoice_crud_cntrl.index.js
├── 📁- cK_gen_invoice_fields_cntrl/ + barrel file: _cK_gen_invoice_fields_cntrl.index.js
├── 📁- cK_gen_invoice_relations_cntrl/ + barrel file: _cK_gen_invoice_relations_cntrl.index.js
├── 📁- cK_gen_invoice_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_invoice_grouped_cntrl.index.js
└── 📁- cK_gen_invoice_cntrl_utils/ + barrel file: _cK_gen_invoice_cntrl_utils.index.js
    ├── 📁- cK_gen_invoice_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_invoice_srv/ + barrel file: _cK_gen_invoice_srv.index.js
    │   ├── 📁- cK_gen_invoice_crud_srv/ + barrel file: _cK_gen_invoice_crud_srv.index.js
    │   ├── 📁- cK_gen_invoice_fields_srv/ + barrel file: _cK_gen_invoice_fields_srv.index.js
    │   ├── 📁- cK_gen_invoice_relations_srv/ + barrel file: _cK_gen_invoice_relations_srv.index.js
    │   └── 📁- cK_gen_invoice_grouped_srv/ (← reserve) + barrel file: _cK_gen_invoice_grouped_srv.index.js
    └── 📁- cK_gen_invoice_vld/ + barrel file: _cK_gen_invoice_vld.index.js
        ├── 📁- cK_gen_invoice_crud_vld/ + barrel file: _cK_gen_invoice_crud_vld.index.js
        ├── 📁- cK_gen_invoice_fields_vld/ + barrel file: _cK_gen_invoice_fields_vld.index.js
        ├── 📁- cK_gen_invoice_relations_vld/ + barrel file: _cK_gen_invoice_relations_vld.index.js
        └── 📁- cK_gen_invoice_grouped_vld/ (← reserve) + barrel file: _cK_gen_invoice_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_invoice_create_cntrl.js` → export `cK_gen_invoice_create_cntrl` |
| Service | `cK_gen_invoice_create_srv.js` → export `cK_gen_invoice_create_srv` |
| Validator | `cK_gen_invoice_create_vld.js` → export `cK_gen_invoice_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_invoice_create` | POST | `/create` |
| `cK_gen_invoice_getAll` | GET | `/getAll` |
| `cK_gen_invoice_getOne` | GET | `/getOne/:id` |
| `cK_gen_invoice_delete` | DELETE | `/delete/:id` |
| `cK_gen_invoice_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (0)

_None — schema has no top-level fields yet._

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

Schema is a placeholder (`Invoice.js` has no fields yet). CRUD scaffold only — add FIELDS when schema is finalized.



### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for Invoice**: 5 controllers + 5 validators + 5 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/invoiceRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_invoice_create_vld,
  cK_gen_invoice_getAll_vld,
  cK_gen_invoice_getOne_vld,
  cK_gen_invoice_delete_vld,
  cK_gen_invoice_updateAll_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_invoice_create_cntrl,
  cK_gen_invoice_getAll_cntrl,
  cK_gen_invoice_getOne_cntrl,
  cK_gen_invoice_delete_cntrl,
  cK_gen_invoice_updateAll_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_invoice_create_vld), cK_gen_invoice_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_invoice_getAll_vld), cK_gen_invoice_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_invoice_getOne_vld), cK_gen_invoice_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_invoice_delete_vld), cK_gen_invoice_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_invoice_updateAll_vld), cK_gen_invoice_updateAll_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## Rating

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/Rating.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_rating_crud_cntrl/`

### Top-level schema fields

`salesChannel`, `order`, `platformOrderId`, `customer`, `stars`, `comment`, `receivedAt`, `customerNameSnapshot`, `customerLoyaltyTier`, `sentimentTag`, `itemFeedback`, `attachments`, `reply`, `source`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_rating_crud_cntrl/ + barrel file: _cK_gen_rating_crud_cntrl.index.js
├── 📁- cK_gen_rating_crud_cntrl/ + barrel file: _cK_gen_rating_crud_cntrl.index.js
├── 📁- cK_gen_rating_fields_cntrl/ + barrel file: _cK_gen_rating_fields_cntrl.index.js
├── 📁- cK_gen_rating_relations_cntrl/ + barrel file: _cK_gen_rating_relations_cntrl.index.js
├── 📁- cK_gen_rating_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_rating_grouped_cntrl.index.js
└── 📁- cK_gen_rating_cntrl_utils/ + barrel file: _cK_gen_rating_cntrl_utils.index.js
    ├── 📁- cK_gen_rating_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_rating_srv/ + barrel file: _cK_gen_rating_srv.index.js
    │   ├── 📁- cK_gen_rating_crud_srv/ + barrel file: _cK_gen_rating_crud_srv.index.js
    │   ├── 📁- cK_gen_rating_fields_srv/ + barrel file: _cK_gen_rating_fields_srv.index.js
    │   ├── 📁- cK_gen_rating_relations_srv/ + barrel file: _cK_gen_rating_relations_srv.index.js
    │   └── 📁- cK_gen_rating_grouped_srv/ (← reserve) + barrel file: _cK_gen_rating_grouped_srv.index.js
    └── 📁- cK_gen_rating_vld/ + barrel file: _cK_gen_rating_vld.index.js
        ├── 📁- cK_gen_rating_crud_vld/ + barrel file: _cK_gen_rating_crud_vld.index.js
        ├── 📁- cK_gen_rating_fields_vld/ + barrel file: _cK_gen_rating_fields_vld.index.js
        ├── 📁- cK_gen_rating_relations_vld/ + barrel file: _cK_gen_rating_relations_vld.index.js
        └── 📁- cK_gen_rating_grouped_vld/ (← reserve) + barrel file: _cK_gen_rating_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_rating_create_cntrl.js` → export `cK_gen_rating_create_cntrl` |
| Service | `cK_gen_rating_create_srv.js` → export `cK_gen_rating_create_srv` |
| Validator | `cK_gen_rating_create_vld.js` → export `cK_gen_rating_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_rating_create` | POST | `/create` |
| `cK_gen_rating_getAll` | GET | `/getAll` |
| `cK_gen_rating_getOne` | GET | `/getOne/:id` |
| `cK_gen_rating_delete` | DELETE | `/delete/:id` |
| `cK_gen_rating_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (15)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_rating_update_salesChannel` | PUT | `/update/salesChannel/:id` |
| `cK_gen_rating_update_order` | PUT | `/update/order/:id` |
| `cK_gen_rating_update_platformOrderId` | PUT | `/update/platformOrderId/:id` |
| `cK_gen_rating_update_customer` | PUT | `/update/customer/:id` |
| `cK_gen_rating_update_stars` | PUT | `/update/stars/:id` |
| `cK_gen_rating_update_comment` | PUT | `/update/comment/:id` |
| `cK_gen_rating_update_receivedAt` | PUT | `/update/receivedAt/:id` |
| `cK_gen_rating_update_customerNameSnapshot` | PUT | `/update/customerNameSnapshot/:id` |
| `cK_gen_rating_update_customerLoyaltyTier` | PUT | `/update/customerLoyaltyTier/:id` |
| `cK_gen_rating_update_sentimentTag` | PUT | `/update/sentimentTag/:id` |
| `cK_gen_rating_update_itemFeedback` | PUT | `/update/itemFeedback/:id` |
| `cK_gen_rating_update_attachments` | PUT | `/update/attachments/:id` |
| `cK_gen_rating_update_reply` | PUT | `/update/reply/:id` |
| `cK_gen_rating_update_source` | PUT | `/update/source/:id` |
| `cK_gen_rating_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for now — ref fields and nested arrays are bulk-updated via FIELDS.



### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for Rating**: 20 controllers + 20 validators + 20 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/ratingRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_rating_create_vld,
  cK_gen_rating_getAll_vld,
  cK_gen_rating_getOne_vld,
  cK_gen_rating_delete_vld,
  cK_gen_rating_updateAll_vld,
  // Fields
  cK_gen_rating_update_salesChannel_vld,
  cK_gen_rating_update_order_vld,
  cK_gen_rating_update_platformOrderId_vld,
  cK_gen_rating_update_customer_vld,
  cK_gen_rating_update_stars_vld,
  cK_gen_rating_update_comment_vld,
  cK_gen_rating_update_receivedAt_vld,
  cK_gen_rating_update_customerNameSnapshot_vld,
  cK_gen_rating_update_customerLoyaltyTier_vld,
  cK_gen_rating_update_sentimentTag_vld,
  cK_gen_rating_update_itemFeedback_vld,
  cK_gen_rating_update_attachments_vld,
  cK_gen_rating_update_reply_vld,
  cK_gen_rating_update_source_vld,
  cK_gen_rating_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_rating_create_cntrl,
  cK_gen_rating_getAll_cntrl,
  cK_gen_rating_getOne_cntrl,
  cK_gen_rating_delete_cntrl,
  cK_gen_rating_updateAll_cntrl,
  // Fields
  cK_gen_rating_update_salesChannel_cntrl,
  cK_gen_rating_update_order_cntrl,
  cK_gen_rating_update_platformOrderId_cntrl,
  cK_gen_rating_update_customer_cntrl,
  cK_gen_rating_update_stars_cntrl,
  cK_gen_rating_update_comment_cntrl,
  cK_gen_rating_update_receivedAt_cntrl,
  cK_gen_rating_update_customerNameSnapshot_cntrl,
  cK_gen_rating_update_customerLoyaltyTier_cntrl,
  cK_gen_rating_update_sentimentTag_cntrl,
  cK_gen_rating_update_itemFeedback_cntrl,
  cK_gen_rating_update_attachments_cntrl,
  cK_gen_rating_update_reply_cntrl,
  cK_gen_rating_update_source_cntrl,
  cK_gen_rating_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_rating_create_vld), cK_gen_rating_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_rating_getAll_vld), cK_gen_rating_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_rating_getOne_vld), cK_gen_rating_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_rating_delete_vld), cK_gen_rating_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_rating_updateAll_vld), cK_gen_rating_updateAll_cntrl);

// ! Fields Routes

router.put("/update/salesChannel/:id", vld_sntzr_mddlwre(cK_gen_rating_update_salesChannel_vld), cK_gen_rating_update_salesChannel_cntrl);
router.put("/update/order/:id", vld_sntzr_mddlwre(cK_gen_rating_update_order_vld), cK_gen_rating_update_order_cntrl);
router.put("/update/platformOrderId/:id", vld_sntzr_mddlwre(cK_gen_rating_update_platformOrderId_vld), cK_gen_rating_update_platformOrderId_cntrl);
router.put("/update/customer/:id", vld_sntzr_mddlwre(cK_gen_rating_update_customer_vld), cK_gen_rating_update_customer_cntrl);
router.put("/update/stars/:id", vld_sntzr_mddlwre(cK_gen_rating_update_stars_vld), cK_gen_rating_update_stars_cntrl);
router.put("/update/comment/:id", vld_sntzr_mddlwre(cK_gen_rating_update_comment_vld), cK_gen_rating_update_comment_cntrl);
router.put("/update/receivedAt/:id", vld_sntzr_mddlwre(cK_gen_rating_update_receivedAt_vld), cK_gen_rating_update_receivedAt_cntrl);
router.put("/update/customerNameSnapshot/:id", vld_sntzr_mddlwre(cK_gen_rating_update_customerNameSnapshot_vld), cK_gen_rating_update_customerNameSnapshot_cntrl);
router.put("/update/customerLoyaltyTier/:id", vld_sntzr_mddlwre(cK_gen_rating_update_customerLoyaltyTier_vld), cK_gen_rating_update_customerLoyaltyTier_cntrl);
router.put("/update/sentimentTag/:id", vld_sntzr_mddlwre(cK_gen_rating_update_sentimentTag_vld), cK_gen_rating_update_sentimentTag_cntrl);
router.put("/update/itemFeedback/:id", vld_sntzr_mddlwre(cK_gen_rating_update_itemFeedback_vld), cK_gen_rating_update_itemFeedback_cntrl);
router.put("/update/attachments/:id", vld_sntzr_mddlwre(cK_gen_rating_update_attachments_vld), cK_gen_rating_update_attachments_cntrl);
router.put("/update/reply/:id", vld_sntzr_mddlwre(cK_gen_rating_update_reply_vld), cK_gen_rating_update_reply_cntrl);
router.put("/update/source/:id", vld_sntzr_mddlwre(cK_gen_rating_update_source_vld), cK_gen_rating_update_source_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_rating_update_notes_vld), cK_gen_rating_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## SalesChannel

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/SalesChannel.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_salesChannel_crud_cntrl/`

### Top-level schema fields

`branch`, `brand`, `platform`, `storeUrl`, `storeIds`, `status`, `commissionPct`, `ratings`, `excludedMenuItems`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_salesChannel_crud_cntrl/ + barrel file: _cK_gen_salesChannel_crud_cntrl.index.js
├── 📁- cK_gen_salesChannel_crud_cntrl/ + barrel file: _cK_gen_salesChannel_crud_cntrl.index.js
├── 📁- cK_gen_salesChannel_fields_cntrl/ + barrel file: _cK_gen_salesChannel_fields_cntrl.index.js
├── 📁- cK_gen_salesChannel_relations_cntrl/ + barrel file: _cK_gen_salesChannel_relations_cntrl.index.js
├── 📁- cK_gen_salesChannel_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_salesChannel_grouped_cntrl.index.js
└── 📁- cK_gen_salesChannel_cntrl_utils/ + barrel file: _cK_gen_salesChannel_cntrl_utils.index.js
    ├── 📁- cK_gen_salesChannel_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_salesChannel_srv/ + barrel file: _cK_gen_salesChannel_srv.index.js
    │   ├── 📁- cK_gen_salesChannel_crud_srv/ + barrel file: _cK_gen_salesChannel_crud_srv.index.js
    │   ├── 📁- cK_gen_salesChannel_fields_srv/ + barrel file: _cK_gen_salesChannel_fields_srv.index.js
    │   ├── 📁- cK_gen_salesChannel_relations_srv/ + barrel file: _cK_gen_salesChannel_relations_srv.index.js
    │   └── 📁- cK_gen_salesChannel_grouped_srv/ (← reserve) + barrel file: _cK_gen_salesChannel_grouped_srv.index.js
    └── 📁- cK_gen_salesChannel_vld/ + barrel file: _cK_gen_salesChannel_vld.index.js
        ├── 📁- cK_gen_salesChannel_crud_vld/ + barrel file: _cK_gen_salesChannel_crud_vld.index.js
        ├── 📁- cK_gen_salesChannel_fields_vld/ + barrel file: _cK_gen_salesChannel_fields_vld.index.js
        ├── 📁- cK_gen_salesChannel_relations_vld/ + barrel file: _cK_gen_salesChannel_relations_vld.index.js
        └── 📁- cK_gen_salesChannel_grouped_vld/ (← reserve) + barrel file: _cK_gen_salesChannel_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_salesChannel_create_cntrl.js` → export `cK_gen_salesChannel_create_cntrl` |
| Service | `cK_gen_salesChannel_create_srv.js` → export `cK_gen_salesChannel_create_srv` |
| Validator | `cK_gen_salesChannel_create_vld.js` → export `cK_gen_salesChannel_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_salesChannel_create` | POST | `/create` |
| `cK_gen_salesChannel_getAll` | GET | `/getAll` |
| `cK_gen_salesChannel_getOne` | GET | `/getOne/:id` |
| `cK_gen_salesChannel_delete` | DELETE | `/delete/:id` |
| `cK_gen_salesChannel_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (10)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_salesChannel_update_branch` | PUT | `/update/branch/:id` |
| `cK_gen_salesChannel_update_brand` | PUT | `/update/brand/:id` |
| `cK_gen_salesChannel_update_platform` | PUT | `/update/platform/:id` |
| `cK_gen_salesChannel_update_storeUrl` | PUT | `/update/storeUrl/:id` |
| `cK_gen_salesChannel_update_storeIds` | PUT | `/update/storeIds/:id` |
| `cK_gen_salesChannel_update_status` | PUT | `/update/status/:id` |
| `cK_gen_salesChannel_update_commissionPct` | PUT | `/update/commissionPct/:id` |
| `cK_gen_salesChannel_update_ratings` | PUT | `/update/ratings/:id` |
| `cK_gen_salesChannel_update_excludedMenuItems` | PUT | `/update/excludedMenuItems/:id` |
| `cK_gen_salesChannel_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for now — single refs and `excludedMenuItems` array are bulk-updated via FIELDS.

If granular add/remove/reorder is added later:

```
cK_gen_salesChannel_addExcludedMenuItems        POST    /excludedMenuItems/add/:id
cK_gen_salesChannel_removeExcludedMenuItems     DELETE  /excludedMenuItems/remove/:id
cK_gen_salesChannel_reorderExcludedMenuItems    PUT     /excludedMenuItems/reorder/:id
```

### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for SalesChannel**: 15 controllers + 15 validators + 15 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/salesChannelRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_salesChannel_create_vld,
  cK_gen_salesChannel_getAll_vld,
  cK_gen_salesChannel_getOne_vld,
  cK_gen_salesChannel_delete_vld,
  cK_gen_salesChannel_updateAll_vld,
  // Fields
  cK_gen_salesChannel_update_branch_vld,
  cK_gen_salesChannel_update_brand_vld,
  cK_gen_salesChannel_update_platform_vld,
  cK_gen_salesChannel_update_storeUrl_vld,
  cK_gen_salesChannel_update_storeIds_vld,
  cK_gen_salesChannel_update_status_vld,
  cK_gen_salesChannel_update_commissionPct_vld,
  cK_gen_salesChannel_update_ratings_vld,
  cK_gen_salesChannel_update_excludedMenuItems_vld,
  cK_gen_salesChannel_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_salesChannel_create_cntrl,
  cK_gen_salesChannel_getAll_cntrl,
  cK_gen_salesChannel_getOne_cntrl,
  cK_gen_salesChannel_delete_cntrl,
  cK_gen_salesChannel_updateAll_cntrl,
  // Fields
  cK_gen_salesChannel_update_branch_cntrl,
  cK_gen_salesChannel_update_brand_cntrl,
  cK_gen_salesChannel_update_platform_cntrl,
  cK_gen_salesChannel_update_storeUrl_cntrl,
  cK_gen_salesChannel_update_storeIds_cntrl,
  cK_gen_salesChannel_update_status_cntrl,
  cK_gen_salesChannel_update_commissionPct_cntrl,
  cK_gen_salesChannel_update_ratings_cntrl,
  cK_gen_salesChannel_update_excludedMenuItems_cntrl,
  cK_gen_salesChannel_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_salesChannel_create_vld), cK_gen_salesChannel_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_salesChannel_getAll_vld), cK_gen_salesChannel_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_getOne_vld), cK_gen_salesChannel_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_delete_vld), cK_gen_salesChannel_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_updateAll_vld), cK_gen_salesChannel_updateAll_cntrl);

// ! Fields Routes

router.put("/update/branch/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_branch_vld), cK_gen_salesChannel_update_branch_cntrl);
router.put("/update/brand/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_brand_vld), cK_gen_salesChannel_update_brand_cntrl);
router.put("/update/platform/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_platform_vld), cK_gen_salesChannel_update_platform_cntrl);
router.put("/update/storeUrl/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_storeUrl_vld), cK_gen_salesChannel_update_storeUrl_cntrl);
router.put("/update/storeIds/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_storeIds_vld), cK_gen_salesChannel_update_storeIds_cntrl);
router.put("/update/status/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_status_vld), cK_gen_salesChannel_update_status_cntrl);
router.put("/update/commissionPct/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_commissionPct_vld), cK_gen_salesChannel_update_commissionPct_cntrl);
router.put("/update/ratings/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_ratings_vld), cK_gen_salesChannel_update_ratings_cntrl);
router.put("/update/excludedMenuItems/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_excludedMenuItems_vld), cK_gen_salesChannel_update_excludedMenuItems_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_salesChannel_update_notes_vld), cK_gen_salesChannel_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## SalesChannelMetrics

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/SalesChannelMetrics.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_salesChannelMetrics_crud_cntrl/`

### Top-level schema fields

`salesChannel`, `granularity`, `period`, `source`, `fileRef`, `segments`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_salesChannelMetrics_crud_cntrl/ + barrel file: _cK_gen_salesChannelMetrics_crud_cntrl.index.js
├── 📁- cK_gen_salesChannelMetrics_crud_cntrl/ + barrel file: _cK_gen_salesChannelMetrics_crud_cntrl.index.js
├── 📁- cK_gen_salesChannelMetrics_fields_cntrl/ + barrel file: _cK_gen_salesChannelMetrics_fields_cntrl.index.js
├── 📁- cK_gen_salesChannelMetrics_relations_cntrl/ + barrel file: _cK_gen_salesChannelMetrics_relations_cntrl.index.js
├── 📁- cK_gen_salesChannelMetrics_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_salesChannelMetrics_grouped_cntrl.index.js
└── 📁- cK_gen_salesChannelMetrics_cntrl_utils/ + barrel file: _cK_gen_salesChannelMetrics_cntrl_utils.index.js
    ├── 📁- cK_gen_salesChannelMetrics_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_salesChannelMetrics_srv/ + barrel file: _cK_gen_salesChannelMetrics_srv.index.js
    │   ├── 📁- cK_gen_salesChannelMetrics_crud_srv/ + barrel file: _cK_gen_salesChannelMetrics_crud_srv.index.js
    │   ├── 📁- cK_gen_salesChannelMetrics_fields_srv/ + barrel file: _cK_gen_salesChannelMetrics_fields_srv.index.js
    │   ├── 📁- cK_gen_salesChannelMetrics_relations_srv/ + barrel file: _cK_gen_salesChannelMetrics_relations_srv.index.js
    │   └── 📁- cK_gen_salesChannelMetrics_grouped_srv/ (← reserve) + barrel file: _cK_gen_salesChannelMetrics_grouped_srv.index.js
    └── 📁- cK_gen_salesChannelMetrics_vld/ + barrel file: _cK_gen_salesChannelMetrics_vld.index.js
        ├── 📁- cK_gen_salesChannelMetrics_crud_vld/ + barrel file: _cK_gen_salesChannelMetrics_crud_vld.index.js
        ├── 📁- cK_gen_salesChannelMetrics_fields_vld/ + barrel file: _cK_gen_salesChannelMetrics_fields_vld.index.js
        ├── 📁- cK_gen_salesChannelMetrics_relations_vld/ + barrel file: _cK_gen_salesChannelMetrics_relations_vld.index.js
        └── 📁- cK_gen_salesChannelMetrics_grouped_vld/ (← reserve) + barrel file: _cK_gen_salesChannelMetrics_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_salesChannelMetrics_create_cntrl.js` → export `cK_gen_salesChannelMetrics_create_cntrl` |
| Service | `cK_gen_salesChannelMetrics_create_srv.js` → export `cK_gen_salesChannelMetrics_create_srv` |
| Validator | `cK_gen_salesChannelMetrics_create_vld.js` → export `cK_gen_salesChannelMetrics_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_salesChannelMetrics_create` | POST | `/create` |
| `cK_gen_salesChannelMetrics_getAll` | GET | `/getAll` |
| `cK_gen_salesChannelMetrics_getOne` | GET | `/getOne/:id` |
| `cK_gen_salesChannelMetrics_delete` | DELETE | `/delete/:id` |
| `cK_gen_salesChannelMetrics_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (7)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_salesChannelMetrics_update_salesChannel` | PUT | `/update/salesChannel/:id` |
| `cK_gen_salesChannelMetrics_update_granularity` | PUT | `/update/granularity/:id` |
| `cK_gen_salesChannelMetrics_update_period` | PUT | `/update/period/:id` |
| `cK_gen_salesChannelMetrics_update_source` | PUT | `/update/source/:id` |
| `cK_gen_salesChannelMetrics_update_fileRef` | PUT | `/update/fileRef/:id` |
| `cK_gen_salesChannelMetrics_update_segments` | PUT | `/update/segments/:id` |
| `cK_gen_salesChannelMetrics_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for now — single ref `salesChannel` and array `segments` are bulk-updated via FIELDS.

If granular add/remove/reorder is added later:

```
cK_gen_salesChannelMetrics_addSegments        POST    /segments/add/:id
cK_gen_salesChannelMetrics_removeSegments     DELETE  /segments/remove/:id
cK_gen_salesChannelMetrics_reorderSegments    PUT     /segments/reorder/:id
```

### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for SalesChannelMetrics**: 12 controllers + 12 validators + 12 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/salesChannelMetricsRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_salesChannelMetrics_create_vld,
  cK_gen_salesChannelMetrics_getAll_vld,
  cK_gen_salesChannelMetrics_getOne_vld,
  cK_gen_salesChannelMetrics_delete_vld,
  cK_gen_salesChannelMetrics_updateAll_vld,
  // Fields
  cK_gen_salesChannelMetrics_update_salesChannel_vld,
  cK_gen_salesChannelMetrics_update_granularity_vld,
  cK_gen_salesChannelMetrics_update_period_vld,
  cK_gen_salesChannelMetrics_update_source_vld,
  cK_gen_salesChannelMetrics_update_fileRef_vld,
  cK_gen_salesChannelMetrics_update_segments_vld,
  cK_gen_salesChannelMetrics_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_salesChannelMetrics_create_cntrl,
  cK_gen_salesChannelMetrics_getAll_cntrl,
  cK_gen_salesChannelMetrics_getOne_cntrl,
  cK_gen_salesChannelMetrics_delete_cntrl,
  cK_gen_salesChannelMetrics_updateAll_cntrl,
  // Fields
  cK_gen_salesChannelMetrics_update_salesChannel_cntrl,
  cK_gen_salesChannelMetrics_update_granularity_cntrl,
  cK_gen_salesChannelMetrics_update_period_cntrl,
  cK_gen_salesChannelMetrics_update_source_cntrl,
  cK_gen_salesChannelMetrics_update_fileRef_cntrl,
  cK_gen_salesChannelMetrics_update_segments_cntrl,
  cK_gen_salesChannelMetrics_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_create_vld), cK_gen_salesChannelMetrics_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_getAll_vld), cK_gen_salesChannelMetrics_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_getOne_vld), cK_gen_salesChannelMetrics_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_delete_vld), cK_gen_salesChannelMetrics_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_updateAll_vld), cK_gen_salesChannelMetrics_updateAll_cntrl);

// ! Fields Routes

router.put("/update/salesChannel/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_salesChannel_vld), cK_gen_salesChannelMetrics_update_salesChannel_cntrl);
router.put("/update/granularity/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_granularity_vld), cK_gen_salesChannelMetrics_update_granularity_cntrl);
router.put("/update/period/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_period_vld), cK_gen_salesChannelMetrics_update_period_cntrl);
router.put("/update/source/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_source_vld), cK_gen_salesChannelMetrics_update_source_cntrl);
router.put("/update/fileRef/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_fileRef_vld), cK_gen_salesChannelMetrics_update_fileRef_cntrl);
router.put("/update/segments/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_segments_vld), cK_gen_salesChannelMetrics_update_segments_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_salesChannelMetrics_update_notes_vld), cK_gen_salesChannelMetrics_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## SalesPlatform

> **Security:** credential field updates require extra validation; never expose secrets in list/get responses.

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/SalesPlatform.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_salesPlatform_crud_cntrl/`

### Top-level schema fields

`name`, `notes`, `links`, `kam`, `loginCredentials`, `support`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_salesPlatform_crud_cntrl/ + barrel file: _cK_gen_salesPlatform_crud_cntrl.index.js
├── 📁- cK_gen_salesPlatform_crud_cntrl/ + barrel file: _cK_gen_salesPlatform_crud_cntrl.index.js
├── 📁- cK_gen_salesPlatform_fields_cntrl/ + barrel file: _cK_gen_salesPlatform_fields_cntrl.index.js
├── 📁- cK_gen_salesPlatform_relations_cntrl/ + barrel file: _cK_gen_salesPlatform_relations_cntrl.index.js
├── 📁- cK_gen_salesPlatform_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_salesPlatform_grouped_cntrl.index.js
└── 📁- cK_gen_salesPlatform_cntrl_utils/ + barrel file: _cK_gen_salesPlatform_cntrl_utils.index.js
    ├── 📁- cK_gen_salesPlatform_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_salesPlatform_srv/ + barrel file: _cK_gen_salesPlatform_srv.index.js
    │   ├── 📁- cK_gen_salesPlatform_crud_srv/ + barrel file: _cK_gen_salesPlatform_crud_srv.index.js
    │   ├── 📁- cK_gen_salesPlatform_fields_srv/ + barrel file: _cK_gen_salesPlatform_fields_srv.index.js
    │   ├── 📁- cK_gen_salesPlatform_relations_srv/ + barrel file: _cK_gen_salesPlatform_relations_srv.index.js
    │   └── 📁- cK_gen_salesPlatform_grouped_srv/ (← reserve) + barrel file: _cK_gen_salesPlatform_grouped_srv.index.js
    └── 📁- cK_gen_salesPlatform_vld/ + barrel file: _cK_gen_salesPlatform_vld.index.js
        ├── 📁- cK_gen_salesPlatform_crud_vld/ + barrel file: _cK_gen_salesPlatform_crud_vld.index.js
        ├── 📁- cK_gen_salesPlatform_fields_vld/ + barrel file: _cK_gen_salesPlatform_fields_vld.index.js
        ├── 📁- cK_gen_salesPlatform_relations_vld/ + barrel file: _cK_gen_salesPlatform_relations_vld.index.js
        └── 📁- cK_gen_salesPlatform_grouped_vld/ (← reserve) + barrel file: _cK_gen_salesPlatform_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_salesPlatform_create_cntrl.js` → export `cK_gen_salesPlatform_create_cntrl` |
| Service | `cK_gen_salesPlatform_create_srv.js` → export `cK_gen_salesPlatform_create_srv` |
| Validator | `cK_gen_salesPlatform_create_vld.js` → export `cK_gen_salesPlatform_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_salesPlatform_create` | POST | `/create` |
| `cK_gen_salesPlatform_getAll` | GET | `/getAll` |
| `cK_gen_salesPlatform_getOne` | GET | `/getOne/:id` |
| `cK_gen_salesPlatform_delete` | DELETE | `/delete/:id` |
| `cK_gen_salesPlatform_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (6)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_salesPlatform_update_name` | PUT | `/update/name/:id` |
| `cK_gen_salesPlatform_update_notes` | PUT | `/update/notes/:id` |
| `cK_gen_salesPlatform_update_links` | PUT | `/update/links/:id` |
| `cK_gen_salesPlatform_update_kam` | PUT | `/update/kam/:id` |
| `cK_gen_salesPlatform_update_loginCredentials` | PUT | `/update/loginCredentials/:id` |
| `cK_gen_salesPlatform_update_support` | PUT | `/update/support/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None — reference data. **Security:** `loginCredentials` requires same treatment as Integration.



### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for SalesPlatform**: 11 controllers + 11 validators + 11 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/salesPlatformRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_salesPlatform_create_vld,
  cK_gen_salesPlatform_getAll_vld,
  cK_gen_salesPlatform_getOne_vld,
  cK_gen_salesPlatform_delete_vld,
  cK_gen_salesPlatform_updateAll_vld,
  // Fields
  cK_gen_salesPlatform_update_name_vld,
  cK_gen_salesPlatform_update_notes_vld,
  cK_gen_salesPlatform_update_links_vld,
  cK_gen_salesPlatform_update_kam_vld,
  cK_gen_salesPlatform_update_loginCredentials_vld,
  cK_gen_salesPlatform_update_support_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_salesPlatform_create_cntrl,
  cK_gen_salesPlatform_getAll_cntrl,
  cK_gen_salesPlatform_getOne_cntrl,
  cK_gen_salesPlatform_delete_cntrl,
  cK_gen_salesPlatform_updateAll_cntrl,
  // Fields
  cK_gen_salesPlatform_update_name_cntrl,
  cK_gen_salesPlatform_update_notes_cntrl,
  cK_gen_salesPlatform_update_links_cntrl,
  cK_gen_salesPlatform_update_kam_cntrl,
  cK_gen_salesPlatform_update_loginCredentials_cntrl,
  cK_gen_salesPlatform_update_support_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_salesPlatform_create_vld), cK_gen_salesPlatform_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_salesPlatform_getAll_vld), cK_gen_salesPlatform_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_getOne_vld), cK_gen_salesPlatform_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_delete_vld), cK_gen_salesPlatform_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_updateAll_vld), cK_gen_salesPlatform_updateAll_cntrl);

// ! Fields Routes

router.put("/update/name/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_update_name_vld), cK_gen_salesPlatform_update_name_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_update_notes_vld), cK_gen_salesPlatform_update_notes_cntrl);
router.put("/update/links/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_update_links_vld), cK_gen_salesPlatform_update_links_cntrl);
router.put("/update/kam/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_update_kam_vld), cK_gen_salesPlatform_update_kam_cntrl);
router.put("/update/loginCredentials/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_update_loginCredentials_vld), cK_gen_salesPlatform_update_loginCredentials_cntrl);
router.put("/update/support/:id", vld_sntzr_mddlwre(cK_gen_salesPlatform_update_support_vld), cK_gen_salesPlatform_update_support_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## Contract

> **DRAFT schema** — validated against ~4 of ~22 contract samples. Revisit FIELDS when remaining contracts are reviewed.

- **Schema**: `backEnd/06_models/cloudKitchen/cloudKitchen_general/Contract.js`
- **Controllers root directory**: `backEnd/07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl/cK_gen_contract_crud_cntrl/`

### Top-level schema fields

`title`, `description`, `kind`, `ownerType`, `ownerId`, `counterparty`, `file`, `effectiveFrom`, `effectiveTo`, `autoRenew`, `terminationNoticeDays`, `status`, `commissionPct`, `additionalCharges`, `commitments`, `payment`, `history`, `notes`
(+ AUDIT spread: `isActive`, `isDeleted`, `deletedAt`, `deletedReason`, `createdBy`, `updatedBy`, `deletedBy`)

### Sub-directories

```
📁- cK_gen_contract_crud_cntrl/ + barrel file: _cK_gen_contract_crud_cntrl.index.js
├── 📁- cK_gen_contract_crud_cntrl/ + barrel file: _cK_gen_contract_crud_cntrl.index.js
├── 📁- cK_gen_contract_fields_cntrl/ + barrel file: _cK_gen_contract_fields_cntrl.index.js
├── 📁- cK_gen_contract_relations_cntrl/ + barrel file: _cK_gen_contract_relations_cntrl.index.js
├── 📁- cK_gen_contract_grouped_cntrl/ (← reserve) + barrel file: _cK_gen_contract_grouped_cntrl.index.js
└── 📁- cK_gen_contract_cntrl_utils/ + barrel file: _cK_gen_contract_cntrl_utils.index.js
    ├── 📁- cK_gen_contract_hlpr/ + barrel file: _.index.js
    ├── 📁- cK_gen_contract_srv/ + barrel file: _cK_gen_contract_srv.index.js
    │   ├── 📁- cK_gen_contract_crud_srv/ + barrel file: _cK_gen_contract_crud_srv.index.js
    │   ├── 📁- cK_gen_contract_fields_srv/ + barrel file: _cK_gen_contract_fields_srv.index.js
    │   ├── 📁- cK_gen_contract_relations_srv/ + barrel file: _cK_gen_contract_relations_srv.index.js
    │   └── 📁- cK_gen_contract_grouped_srv/ (← reserve) + barrel file: _cK_gen_contract_grouped_srv.index.js
    └── 📁- cK_gen_contract_vld/ + barrel file: _cK_gen_contract_vld.index.js
        ├── 📁- cK_gen_contract_crud_vld/ + barrel file: _cK_gen_contract_crud_vld.index.js
        ├── 📁- cK_gen_contract_fields_vld/ + barrel file: _cK_gen_contract_fields_vld.index.js
        ├── 📁- cK_gen_contract_relations_vld/ + barrel file: _cK_gen_contract_relations_vld.index.js
        └── 📁- cK_gen_contract_grouped_vld/ (← reserve) + barrel file: _cK_gen_contract_grouped_vld.index.js
```

### File naming convention

Each action gets three files (same stem, different suffix):

| Layer | Example (create) |
| ----- | ---------------- |
| Controller | `cK_gen_contract_create_cntrl.js` → export `cK_gen_contract_create_cntrl` |
| Service | `cK_gen_contract_create_srv.js` → export `cK_gen_contract_create_srv` |
| Validator | `cK_gen_contract_create_vld.js` → export `cK_gen_contract_create_vld` |

Barrel files use `export { default as ... }` for cntrl and `export { ... }` for srv/vld.

### CRUD controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (5)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_contract_create` | POST | `/create` |
| `cK_gen_contract_getAll` | GET | `/getAll` |
| `cK_gen_contract_getOne` | GET | `/getOne/:id` |
| `cK_gen_contract_delete` | DELETE | `/delete/:id` |
| `cK_gen_contract_updateAll` | PUT | `/updateAll/:id` |

### Field-update controllers(`_cntrl`), services(`_srv`) and validators(`_vld`) (18)

| Controller / service / validator | HTTP | Route path |
| -------------------------------- | ---- | ---------- |
| `cK_gen_contract_update_title` | PUT | `/update/title/:id` |
| `cK_gen_contract_update_description` | PUT | `/update/description/:id` |
| `cK_gen_contract_update_kind` | PUT | `/update/kind/:id` |
| `cK_gen_contract_update_ownerType` | PUT | `/update/ownerType/:id` |
| `cK_gen_contract_update_ownerId` | PUT | `/update/ownerId/:id` |
| `cK_gen_contract_update_counterparty` | PUT | `/update/counterparty/:id` |
| `cK_gen_contract_update_file` | PUT | `/update/file/:id` |
| `cK_gen_contract_update_effectiveFrom` | PUT | `/update/effectiveFrom/:id` |
| `cK_gen_contract_update_effectiveTo` | PUT | `/update/effectiveTo/:id` |
| `cK_gen_contract_update_autoRenew` | PUT | `/update/autoRenew/:id` |
| `cK_gen_contract_update_terminationNoticeDays` | PUT | `/update/terminationNoticeDays/:id` |
| `cK_gen_contract_update_status` | PUT | `/update/status/:id` |
| `cK_gen_contract_update_commissionPct` | PUT | `/update/commissionPct/:id` |
| `cK_gen_contract_update_additionalCharges` | PUT | `/update/additionalCharges/:id` |
| `cK_gen_contract_update_commitments` | PUT | `/update/commitments/:id` |
| `cK_gen_contract_update_payment` | PUT | `/update/payment/:id` |
| `cK_gen_contract_update_history` | PUT | `/update/history/:id` |
| `cK_gen_contract_update_notes` | PUT | `/update/notes/:id` |

### Relations controllers(`_cntrl`), services(`_srv`) and validators(`_vld`)

None for now — nested arrays (`additionalCharges`, `commitments`, `history`) are bulk-updated via FIELDS.

If granular add/remove/reorder is added later:

```
cK_gen_contract_addAdditionalCharges        POST    /additionalCharges/add/:id
cK_gen_contract_removeAdditionalCharges     DELETE  /additionalCharges/remove/:id
cK_gen_contract_reorderAdditionalCharges    PUT     /additionalCharges/reorder/:id
cK_gen_contract_addCommitments        POST    /commitments/add/:id
cK_gen_contract_removeCommitments     DELETE  /commitments/remove/:id
cK_gen_contract_reorderCommitments    PUT     /commitments/reorder/:id
cK_gen_contract_addHistory        POST    /history/add/:id
cK_gen_contract_removeHistory     DELETE  /history/remove/:id
cK_gen_contract_reorderHistory    PUT     /history/reorder/:id
```

### Grouped controllers, services and validators

Reserved — empty for now. Use only for composite operations that don't fit crud / field / relation.

**Total scaffold for Contract**: 23 controllers + 23 validators + 23 services + N helpers.

**Router file**: `backEnd/08_routes/cloudKitchen_routes/cloudKitchen_general_routes/contractRoutes.js`

**Router imports + routes**
```js
import express from "express";
import { vld_sntzr_mddlwre } from "../../../05_middlewares/_mddlwre.index.js";

// ! Validators
import {
  // Crud
  cK_gen_contract_create_vld,
  cK_gen_contract_getAll_vld,
  cK_gen_contract_getOne_vld,
  cK_gen_contract_delete_vld,
  cK_gen_contract_updateAll_vld,
  // Fields
  cK_gen_contract_update_title_vld,
  cK_gen_contract_update_description_vld,
  cK_gen_contract_update_kind_vld,
  cK_gen_contract_update_ownerType_vld,
  cK_gen_contract_update_ownerId_vld,
  cK_gen_contract_update_counterparty_vld,
  cK_gen_contract_update_file_vld,
  cK_gen_contract_update_effectiveFrom_vld,
  cK_gen_contract_update_effectiveTo_vld,
  cK_gen_contract_update_autoRenew_vld,
  cK_gen_contract_update_terminationNoticeDays_vld,
  cK_gen_contract_update_status_vld,
  cK_gen_contract_update_commissionPct_vld,
  cK_gen_contract_update_additionalCharges_vld,
  cK_gen_contract_update_commitments_vld,
  cK_gen_contract_update_payment_vld,
  cK_gen_contract_update_history_vld,
  cK_gen_contract_update_notes_vld,
} from "../../../07_controllers/_controllers.index.js";

// ! Controllers
import {
  // Crud
  cK_gen_contract_create_cntrl,
  cK_gen_contract_getAll_cntrl,
  cK_gen_contract_getOne_cntrl,
  cK_gen_contract_delete_cntrl,
  cK_gen_contract_updateAll_cntrl,
  // Fields
  cK_gen_contract_update_title_cntrl,
  cK_gen_contract_update_description_cntrl,
  cK_gen_contract_update_kind_cntrl,
  cK_gen_contract_update_ownerType_cntrl,
  cK_gen_contract_update_ownerId_cntrl,
  cK_gen_contract_update_counterparty_cntrl,
  cK_gen_contract_update_file_cntrl,
  cK_gen_contract_update_effectiveFrom_cntrl,
  cK_gen_contract_update_effectiveTo_cntrl,
  cK_gen_contract_update_autoRenew_cntrl,
  cK_gen_contract_update_terminationNoticeDays_cntrl,
  cK_gen_contract_update_status_cntrl,
  cK_gen_contract_update_commissionPct_cntrl,
  cK_gen_contract_update_additionalCharges_cntrl,
  cK_gen_contract_update_commitments_cntrl,
  cK_gen_contract_update_payment_cntrl,
  cK_gen_contract_update_history_cntrl,
  cK_gen_contract_update_notes_cntrl,
} from "../../../07_controllers/_controllers.index.js";

const router = express.Router();

// ! Crud Routes

router.post("/create", vld_sntzr_mddlwre(cK_gen_contract_create_vld), cK_gen_contract_create_cntrl);
router.get("/getAll", vld_sntzr_mddlwre(cK_gen_contract_getAll_vld), cK_gen_contract_getAll_cntrl);
router.get("/getOne/:id", vld_sntzr_mddlwre(cK_gen_contract_getOne_vld), cK_gen_contract_getOne_cntrl);
router.delete("/delete/:id", vld_sntzr_mddlwre(cK_gen_contract_delete_vld), cK_gen_contract_delete_cntrl);
router.put("/updateAll/:id", vld_sntzr_mddlwre(cK_gen_contract_updateAll_vld), cK_gen_contract_updateAll_cntrl);

// ! Fields Routes

router.put("/update/title/:id", vld_sntzr_mddlwre(cK_gen_contract_update_title_vld), cK_gen_contract_update_title_cntrl);
router.put("/update/description/:id", vld_sntzr_mddlwre(cK_gen_contract_update_description_vld), cK_gen_contract_update_description_cntrl);
router.put("/update/kind/:id", vld_sntzr_mddlwre(cK_gen_contract_update_kind_vld), cK_gen_contract_update_kind_cntrl);
router.put("/update/ownerType/:id", vld_sntzr_mddlwre(cK_gen_contract_update_ownerType_vld), cK_gen_contract_update_ownerType_cntrl);
router.put("/update/ownerId/:id", vld_sntzr_mddlwre(cK_gen_contract_update_ownerId_vld), cK_gen_contract_update_ownerId_cntrl);
router.put("/update/counterparty/:id", vld_sntzr_mddlwre(cK_gen_contract_update_counterparty_vld), cK_gen_contract_update_counterparty_cntrl);
router.put("/update/file/:id", vld_sntzr_mddlwre(cK_gen_contract_update_file_vld), cK_gen_contract_update_file_cntrl);
router.put("/update/effectiveFrom/:id", vld_sntzr_mddlwre(cK_gen_contract_update_effectiveFrom_vld), cK_gen_contract_update_effectiveFrom_cntrl);
router.put("/update/effectiveTo/:id", vld_sntzr_mddlwre(cK_gen_contract_update_effectiveTo_vld), cK_gen_contract_update_effectiveTo_cntrl);
router.put("/update/autoRenew/:id", vld_sntzr_mddlwre(cK_gen_contract_update_autoRenew_vld), cK_gen_contract_update_autoRenew_cntrl);
router.put("/update/terminationNoticeDays/:id", vld_sntzr_mddlwre(cK_gen_contract_update_terminationNoticeDays_vld), cK_gen_contract_update_terminationNoticeDays_cntrl);
router.put("/update/status/:id", vld_sntzr_mddlwre(cK_gen_contract_update_status_vld), cK_gen_contract_update_status_cntrl);
router.put("/update/commissionPct/:id", vld_sntzr_mddlwre(cK_gen_contract_update_commissionPct_vld), cK_gen_contract_update_commissionPct_cntrl);
router.put("/update/additionalCharges/:id", vld_sntzr_mddlwre(cK_gen_contract_update_additionalCharges_vld), cK_gen_contract_update_additionalCharges_cntrl);
router.put("/update/commitments/:id", vld_sntzr_mddlwre(cK_gen_contract_update_commitments_vld), cK_gen_contract_update_commitments_cntrl);
router.put("/update/payment/:id", vld_sntzr_mddlwre(cK_gen_contract_update_payment_vld), cK_gen_contract_update_payment_cntrl);
router.put("/update/history/:id", vld_sntzr_mddlwre(cK_gen_contract_update_history_vld), cK_gen_contract_update_history_cntrl);
router.put("/update/notes/:id", vld_sntzr_mddlwre(cK_gen_contract_update_notes_vld), cK_gen_contract_update_notes_cntrl);

// ! Relations routes

// ! Grouped routes

export default router;
```

---

## Website

_Skipped — deferred; no scaffold._
