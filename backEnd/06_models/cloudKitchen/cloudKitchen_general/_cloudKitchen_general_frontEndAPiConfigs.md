# cloudKitchen_general — Frontend API configs + apiHelpers

Reference for every model in `cloudKitchen_general/`. Mirrors the controller list one-to-one. Config object name: `CK_<SCHEMA>_CONFIG` (e.g. `CK_BRANCH_CONFIG`). CRUD keys use underscores: `GET_ALL`, `GET_ONE`, `UPDATE_ALL`.

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

## Branch

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_BRANCH_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_branch/`
- **apiHelpers index**: `_cloudKitchen_branch.index.js` (barrel)

**Route prefix**: `/branch`

```js
export const API_BASE = `${BACKEND_URL}/api/branch`;
```

### Config object: `CK_BRANCH_CONFIG`

```js
const CK_BRANCH_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_branch_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_branch_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_branch_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_branch_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_branch_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_branch_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LOCATION: {
      ENDPOINT: (id) => `${API_BASE}/update/location/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_location.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTACT: {
      ENDPOINT: (id) => `${API_BASE}/update/contact/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_contact.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_OPERATIONS: {
      ENDPOINT: (id) => `${API_BASE}/update/operations/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_operations.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EXPENSES: {
      ENDPOINT: (id) => `${API_BASE}/update/expenses/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_expenses.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTRACTS: {
      ENDPOINT: (id) => `${API_BASE}/update/contracts/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_contracts.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EMPLOYEES: {
      ENDPOINT: (id) => `${API_BASE}/update/employees/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_employees.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EQUIPMENTS: {
      ENDPOINT: (id) => `${API_BASE}/update/equipments/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_equipments.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANDS: {
      ENDPOINT: (id) => `${API_BASE}/update/brands/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_brands.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_branch_update_notes.js",
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

export default CK_BRANCH_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_branch_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_branch_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_branch_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_branch_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_branch_updateAll.js` |

### FIELDS entries (11)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_NAME` | PUT | `/update/name/:id` | `CK_gen_branch_update_name.js` |
| `UPDATE_LOCATION` | PUT | `/update/location/:id` | `CK_gen_branch_update_location.js` |
| `UPDATE_CONTACT` | PUT | `/update/contact/:id` | `CK_gen_branch_update_contact.js` |
| `UPDATE_FILES` | PUT | `/update/files/:id` | `CK_gen_branch_update_files.js` |
| `UPDATE_OPERATIONS` | PUT | `/update/operations/:id` | `CK_gen_branch_update_operations.js` |
| `UPDATE_EXPENSES` | PUT | `/update/expenses/:id` | `CK_gen_branch_update_expenses.js` |
| `UPDATE_CONTRACTS` | PUT | `/update/contracts/:id` | `CK_gen_branch_update_contracts.js` |
| `UPDATE_EMPLOYEES` | PUT | `/update/employees/:id` | `CK_gen_branch_update_employees.js` |
| `UPDATE_EQUIPMENTS` | PUT | `/update/equipments/:id` | `CK_gen_branch_update_equipments.js` |
| `UPDATE_BRANDS` | PUT | `/update/brands/:id` | `CK_gen_branch_update_brands.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_branch_update_notes.js` |

### RELATIONS entries

None for Branch — ref arrays (`contracts`, `employees`, `equipments`, `brands`) are bulk-updated via FIELDS. Optional later: add/remove/reorder per relation.

| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_CONTRACTS` | POST | `/contracts/add/:id` |
| `REMOVE_CONTRACTS` | DELETE | `/contracts/remove/:id` |
| `REORDER_CONTRACTS` | PUT | `/contracts/reorder/:id` |
| `ADD_EMPLOYEES` | POST | `/employees/add/:id` |
| `REMOVE_EMPLOYEES` | DELETE | `/employees/remove/:id` |
| `REORDER_EMPLOYEES` | PUT | `/employees/reorder/:id` |
| `ADD_EQUIPMENTS` | POST | `/equipments/add/:id` |
| `REMOVE_EQUIPMENTS` | DELETE | `/equipments/remove/:id` |
| `REORDER_EQUIPMENTS` | PUT | `/equipments/reorder/:id` |
| `ADD_BRANDS` | POST | `/brands/add/:id` |
| `REMOVE_BRANDS` | DELETE | `/brands/remove/:id` |
| `REORDER_BRANDS` | PUT | `/brands/reorder/:id` |


### GROUPED entries

Reserved — empty for now.

**Total for Branch**: 16 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_branch_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.CRUD.CREATE;` |
| `CK_gen_branch_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_branch_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_branch_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.CRUD.DELETE;` |
| `CK_gen_branch_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_branch_update_name.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_NAME;` |
| `CK_gen_branch_update_location.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_LOCATION;` |
| `CK_gen_branch_update_contact.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_CONTACT;` |
| `CK_gen_branch_update_files.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_FILES;` |
| `CK_gen_branch_update_operations.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_OPERATIONS;` |
| `CK_gen_branch_update_expenses.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_EXPENSES;` |
| `CK_gen_branch_update_contracts.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_CONTRACTS;` |
| `CK_gen_branch_update_employees.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_EMPLOYEES;` |
| `CK_gen_branch_update_equipments.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_EQUIPMENTS;` |
| `CK_gen_branch_update_brands.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_BRANDS;` |
| `CK_gen_branch_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_BRANCH_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## Employee

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_EMPLOYEE_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_employee/`
- **apiHelpers index**: `_cloudKitchen_employee.index.js` (barrel)

**Route prefix**: `/employee`

```js
export const API_BASE = `${BACKEND_URL}/api/employee`;
```

### Config object: `CK_EMPLOYEE_CONFIG`

```js
const CK_EMPLOYEE_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_employee_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_employee_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_employee_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_employee_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_employee_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_employee_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PERSONALDETAILS: {
      ENDPOINT: (id) => `${API_BASE}/update/personalDetails/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_personalDetails.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ADDRESS: {
      ENDPOINT: (id) => `${API_BASE}/update/address/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_address.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_UNIFORM: {
      ENDPOINT: (id) => `${API_BASE}/update/uniform/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_uniform.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CERTIFICATIONS: {
      ENDPOINT: (id) => `${API_BASE}/update/certifications/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_certifications.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EMPLOYMENTINFO: {
      ENDPOINT: (id) => `${API_BASE}/update/employmentInfo/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_employmentInfo.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LEGALDOCS: {
      ENDPOINT: (id) => `${API_BASE}/update/legalDocs/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_legalDocs.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SALARY: {
      ENDPOINT: (id) => `${API_BASE}/update/salary/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_salary.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ATTENDANCEINFO: {
      ENDPOINT: (id) => `${API_BASE}/update/attendanceInfo/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_attendanceInfo.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_RELATEDTO: {
      ENDPOINT: (id) => `${API_BASE}/update/relatedTo/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_relatedTo.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANCH: {
      ENDPOINT: (id) => `${API_BASE}/update/branch/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_branch.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTRACTS: {
      ENDPOINT: (id) => `${API_BASE}/update/contracts/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_contracts.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ASSOCIATEDBRANDS: {
      ENDPOINT: (id) => `${API_BASE}/update/associatedBrands/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_associatedBrands.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_employee_update_notes.js",
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

export default CK_EMPLOYEE_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_employee_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_employee_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_employee_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_employee_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_employee_updateAll.js` |

### FIELDS entries (15)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_NAME` | PUT | `/update/name/:id` | `CK_gen_employee_update_name.js` |
| `UPDATE_PERSONALDETAILS` | PUT | `/update/personalDetails/:id` | `CK_gen_employee_update_personalDetails.js` |
| `UPDATE_ADDRESS` | PUT | `/update/address/:id` | `CK_gen_employee_update_address.js` |
| `UPDATE_FILES` | PUT | `/update/files/:id` | `CK_gen_employee_update_files.js` |
| `UPDATE_UNIFORM` | PUT | `/update/uniform/:id` | `CK_gen_employee_update_uniform.js` |
| `UPDATE_CERTIFICATIONS` | PUT | `/update/certifications/:id` | `CK_gen_employee_update_certifications.js` |
| `UPDATE_EMPLOYMENTINFO` | PUT | `/update/employmentInfo/:id` | `CK_gen_employee_update_employmentInfo.js` |
| `UPDATE_LEGALDOCS` | PUT | `/update/legalDocs/:id` | `CK_gen_employee_update_legalDocs.js` |
| `UPDATE_SALARY` | PUT | `/update/salary/:id` | `CK_gen_employee_update_salary.js` |
| `UPDATE_ATTENDANCEINFO` | PUT | `/update/attendanceInfo/:id` | `CK_gen_employee_update_attendanceInfo.js` |
| `UPDATE_RELATEDTO` | PUT | `/update/relatedTo/:id` | `CK_gen_employee_update_relatedTo.js` |
| `UPDATE_BRANCH` | PUT | `/update/branch/:id` | `CK_gen_employee_update_branch.js` |
| `UPDATE_CONTRACTS` | PUT | `/update/contracts/:id` | `CK_gen_employee_update_contracts.js` |
| `UPDATE_ASSOCIATEDBRANDS` | PUT | `/update/associatedBrands/:id` | `CK_gen_employee_update_associatedBrands.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_employee_update_notes.js` |

### RELATIONS entries

None for now — ref arrays (`relatedTo`, `contracts`, `associatedBrands`) are bulk-updated via FIELDS. Single ref `branch` is a field update. Optional later: add/remove/reorder per relation array.

| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_RELATEDTO` | POST | `/relatedTo/add/:id` |
| `REMOVE_RELATEDTO` | DELETE | `/relatedTo/remove/:id` |
| `REORDER_RELATEDTO` | PUT | `/relatedTo/reorder/:id` |
| `ADD_CONTRACTS` | POST | `/contracts/add/:id` |
| `REMOVE_CONTRACTS` | DELETE | `/contracts/remove/:id` |
| `REORDER_CONTRACTS` | PUT | `/contracts/reorder/:id` |
| `ADD_ASSOCIATEDBRANDS` | POST | `/associatedBrands/add/:id` |
| `REMOVE_ASSOCIATEDBRANDS` | DELETE | `/associatedBrands/remove/:id` |
| `REORDER_ASSOCIATEDBRANDS` | PUT | `/associatedBrands/reorder/:id` |


### GROUPED entries

Reserved — empty for now.

**Total for Employee**: 20 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_employee_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.CRUD.CREATE;` |
| `CK_gen_employee_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_employee_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_employee_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.CRUD.DELETE;` |
| `CK_gen_employee_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_employee_update_name.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_NAME;` |
| `CK_gen_employee_update_personalDetails.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_PERSONALDETAILS;` |
| `CK_gen_employee_update_address.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_ADDRESS;` |
| `CK_gen_employee_update_files.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_FILES;` |
| `CK_gen_employee_update_uniform.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_UNIFORM;` |
| `CK_gen_employee_update_certifications.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_CERTIFICATIONS;` |
| `CK_gen_employee_update_employmentInfo.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_EMPLOYMENTINFO;` |
| `CK_gen_employee_update_legalDocs.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_LEGALDOCS;` |
| `CK_gen_employee_update_salary.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_SALARY;` |
| `CK_gen_employee_update_attendanceInfo.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_ATTENDANCEINFO;` |
| `CK_gen_employee_update_relatedTo.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_RELATEDTO;` |
| `CK_gen_employee_update_branch.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_BRANCH;` |
| `CK_gen_employee_update_contracts.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_CONTRACTS;` |
| `CK_gen_employee_update_associatedBrands.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_ASSOCIATEDBRANDS;` |
| `CK_gen_employee_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EMPLOYEE_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## Equipment

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_EQUIPMENT_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_equipment/`
- **apiHelpers index**: `_cloudKitchen_equipment.index.js` (barrel)

**Route prefix**: `/equipment`

```js
export const API_BASE = `${BACKEND_URL}/api/equipment`;
```

### Config object: `CK_EQUIPMENT_CONFIG`

```js
const CK_EQUIPMENT_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_equipment_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_equipment_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_equipment_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CATEGORY: {
      ENDPOINT: (id) => `${API_BASE}/update/category/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_category.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ASSETTAG: {
      ENDPOINT: (id) => `${API_BASE}/update/assetTag/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_assetTag.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_description.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STOREDIN: {
      ENDPOINT: (id) => `${API_BASE}/update/storedIn/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_storedIn.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANCH: {
      ENDPOINT: (id) => `${API_BASE}/update/branch/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_branch.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STATUS: {
      ENDPOINT: (id) => `${API_BASE}/update/status/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_status.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PURCHASE: {
      ENDPOINT: (id) => `${API_BASE}/update/purchase/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_purchase.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_WARRANTY: {
      ENDPOINT: (id) => `${API_BASE}/update/warranty/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_warranty.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DECOMMISSIONEDAT: {
      ENDPOINT: (id) => `${API_BASE}/update/decommissionedAt/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_decommissionedAt.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DECOMMISSIONREASON: {
      ENDPOINT: (id) => `${API_BASE}/update/decommissionReason/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_decommissionReason.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_MAINTENANCE: {
      ENDPOINT: (id) => `${API_BASE}/update/maintenance/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_maintenance.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTRACTS: {
      ENDPOINT: (id) => `${API_BASE}/update/contracts/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_contracts.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DEPRECIATION: {
      ENDPOINT: (id) => `${API_BASE}/update/depreciation/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_depreciation.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_equipment_update_notes.js",
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

export default CK_EQUIPMENT_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_equipment_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_equipment_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_equipment_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_equipment_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_equipment_updateAll.js` |

### FIELDS entries (16)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_NAME` | PUT | `/update/name/:id` | `CK_gen_equipment_update_name.js` |
| `UPDATE_CATEGORY` | PUT | `/update/category/:id` | `CK_gen_equipment_update_category.js` |
| `UPDATE_ASSETTAG` | PUT | `/update/assetTag/:id` | `CK_gen_equipment_update_assetTag.js` |
| `UPDATE_DESCRIPTION` | PUT | `/update/description/:id` | `CK_gen_equipment_update_description.js` |
| `UPDATE_STOREDIN` | PUT | `/update/storedIn/:id` | `CK_gen_equipment_update_storedIn.js` |
| `UPDATE_BRANCH` | PUT | `/update/branch/:id` | `CK_gen_equipment_update_branch.js` |
| `UPDATE_STATUS` | PUT | `/update/status/:id` | `CK_gen_equipment_update_status.js` |
| `UPDATE_PURCHASE` | PUT | `/update/purchase/:id` | `CK_gen_equipment_update_purchase.js` |
| `UPDATE_WARRANTY` | PUT | `/update/warranty/:id` | `CK_gen_equipment_update_warranty.js` |
| `UPDATE_DECOMMISSIONEDAT` | PUT | `/update/decommissionedAt/:id` | `CK_gen_equipment_update_decommissionedAt.js` |
| `UPDATE_DECOMMISSIONREASON` | PUT | `/update/decommissionReason/:id` | `CK_gen_equipment_update_decommissionReason.js` |
| `UPDATE_MAINTENANCE` | PUT | `/update/maintenance/:id` | `CK_gen_equipment_update_maintenance.js` |
| `UPDATE_CONTRACTS` | PUT | `/update/contracts/:id` | `CK_gen_equipment_update_contracts.js` |
| `UPDATE_FILES` | PUT | `/update/files/:id` | `CK_gen_equipment_update_files.js` |
| `UPDATE_DEPRECIATION` | PUT | `/update/depreciation/:id` | `CK_gen_equipment_update_depreciation.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_equipment_update_notes.js` |

### RELATIONS entries

None for now — ref array `contracts` is bulk-updated via FIELDS. Single ref `branch` is a field update.

| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_CONTRACTS` | POST | `/contracts/add/:id` |
| `REMOVE_CONTRACTS` | DELETE | `/contracts/remove/:id` |
| `REORDER_CONTRACTS` | PUT | `/contracts/reorder/:id` |


### GROUPED entries

Reserved — empty for now.

**Total for Equipment**: 21 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_equipment_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.CRUD.CREATE;` |
| `CK_gen_equipment_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_equipment_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_equipment_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.CRUD.DELETE;` |
| `CK_gen_equipment_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_equipment_update_name.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_NAME;` |
| `CK_gen_equipment_update_category.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_CATEGORY;` |
| `CK_gen_equipment_update_assetTag.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_ASSETTAG;` |
| `CK_gen_equipment_update_description.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_DESCRIPTION;` |
| `CK_gen_equipment_update_storedIn.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_STOREDIN;` |
| `CK_gen_equipment_update_branch.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_BRANCH;` |
| `CK_gen_equipment_update_status.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_STATUS;` |
| `CK_gen_equipment_update_purchase.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_PURCHASE;` |
| `CK_gen_equipment_update_warranty.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_WARRANTY;` |
| `CK_gen_equipment_update_decommissionedAt.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_DECOMMISSIONEDAT;` |
| `CK_gen_equipment_update_decommissionReason.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_DECOMMISSIONREASON;` |
| `CK_gen_equipment_update_maintenance.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_MAINTENANCE;` |
| `CK_gen_equipment_update_contracts.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_CONTRACTS;` |
| `CK_gen_equipment_update_files.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_FILES;` |
| `CK_gen_equipment_update_depreciation.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_DEPRECIATION;` |
| `CK_gen_equipment_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_EQUIPMENT_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## Customer

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_CUSTOMER_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_customer/`
- **apiHelpers index**: `_cloudKitchen_customer.index.js` (barrel)

**Route prefix**: `/customer`

```js
export const API_BASE = `${BACKEND_URL}/api/customer`;
```

### Config object: `CK_CUSTOMER_CONFIG`

```js
const CK_CUSTOMER_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_customer_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_customer_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_customer_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_customer_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_customer_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_customer_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ALIASES: {
      ENDPOINT: (id) => `${API_BASE}/update/aliases/${id}`,
      DISPLAY_NAME: "CK_gen_customer_update_aliases.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTACT: {
      ENDPOINT: (id) => `${API_BASE}/update/contact/${id}`,
      DISPLAY_NAME: "CK_gen_customer_update_contact.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ADDRESSES: {
      ENDPOINT: (id) => `${API_BASE}/update/addresses/${id}`,
      DISPLAY_NAME: "CK_gen_customer_update_addresses.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ENCOUNTEREDON: {
      ENDPOINT: (id) => `${API_BASE}/update/encounteredOn/${id}`,
      DISPLAY_NAME: "CK_gen_customer_update_encounteredOn.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ORDERSTATS: {
      ENDPOINT: (id) => `${API_BASE}/update/orderStats/${id}`,
      DISPLAY_NAME: "CK_gen_customer_update_orderStats.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COMPLAINTS: {
      ENDPOINT: (id) => `${API_BASE}/update/complaints/${id}`,
      DISPLAY_NAME: "CK_gen_customer_update_complaints.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SOURCE: {
      ENDPOINT: (id) => `${API_BASE}/update/source/${id}`,
      DISPLAY_NAME: "CK_gen_customer_update_source.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_customer_update_notes.js",
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

export default CK_CUSTOMER_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_customer_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_customer_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_customer_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_customer_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_customer_updateAll.js` |

### FIELDS entries (9)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_NAME` | PUT | `/update/name/:id` | `CK_gen_customer_update_name.js` |
| `UPDATE_ALIASES` | PUT | `/update/aliases/:id` | `CK_gen_customer_update_aliases.js` |
| `UPDATE_CONTACT` | PUT | `/update/contact/:id` | `CK_gen_customer_update_contact.js` |
| `UPDATE_ADDRESSES` | PUT | `/update/addresses/:id` | `CK_gen_customer_update_addresses.js` |
| `UPDATE_ENCOUNTEREDON` | PUT | `/update/encounteredOn/:id` | `CK_gen_customer_update_encounteredOn.js` |
| `UPDATE_ORDERSTATS` | PUT | `/update/orderStats/:id` | `CK_gen_customer_update_orderStats.js` |
| `UPDATE_COMPLAINTS` | PUT | `/update/complaints/:id` | `CK_gen_customer_update_complaints.js` |
| `UPDATE_SOURCE` | PUT | `/update/source/:id` | `CK_gen_customer_update_source.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_customer_update_notes.js` |

### RELATIONS entries

None.

### GROUPED entries

Reserved — empty for now.

**Total for Customer**: 14 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_customer_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.CRUD.CREATE;` |
| `CK_gen_customer_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_customer_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_customer_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.CRUD.DELETE;` |
| `CK_gen_customer_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_customer_update_name.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_NAME;` |
| `CK_gen_customer_update_aliases.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_ALIASES;` |
| `CK_gen_customer_update_contact.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_CONTACT;` |
| `CK_gen_customer_update_addresses.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_ADDRESSES;` |
| `CK_gen_customer_update_encounteredOn.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_ENCOUNTEREDON;` |
| `CK_gen_customer_update_orderStats.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_ORDERSTATS;` |
| `CK_gen_customer_update_complaints.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_COMPLAINTS;` |
| `CK_gen_customer_update_source.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_SOURCE;` |
| `CK_gen_customer_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUSTOMER_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## CuisineTag

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_CUISINE_TAG_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_cuisineTag/`
- **apiHelpers index**: `_cloudKitchen_cuisineTag.index.js` (barrel)

**Route prefix**: `/cuisineTag`

```js
export const API_BASE = `${BACKEND_URL}/api/cuisineTag`;
```

### Config object: `CK_CUISINE_TAG_CONFIG`

```js
const CK_CUISINE_TAG_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_cuisineTag_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_cuisineTag_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    UPDATE_VALUE: {
      ENDPOINT: (id) => `${API_BASE}/update/value/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_update_value.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LABEL: {
      ENDPOINT: (id) => `${API_BASE}/update/label/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_update_label.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_update_description.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PLATFORMS: {
      ENDPOINT: (id) => `${API_BASE}/update/platforms/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_update_platforms.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_KIND: {
      ENDPOINT: (id) => `${API_BASE}/update/kind/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_update_kind.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SOURCE: {
      ENDPOINT: (id) => `${API_BASE}/update/source/${id}`,
      DISPLAY_NAME: "CK_gen_cuisineTag_update_source.js",
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

export default CK_CUISINE_TAG_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_cuisineTag_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_cuisineTag_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_cuisineTag_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_cuisineTag_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_cuisineTag_updateAll.js` |

### FIELDS entries (6)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_VALUE` | PUT | `/update/value/:id` | `CK_gen_cuisineTag_update_value.js` |
| `UPDATE_LABEL` | PUT | `/update/label/:id` | `CK_gen_cuisineTag_update_label.js` |
| `UPDATE_DESCRIPTION` | PUT | `/update/description/:id` | `CK_gen_cuisineTag_update_description.js` |
| `UPDATE_PLATFORMS` | PUT | `/update/platforms/:id` | `CK_gen_cuisineTag_update_platforms.js` |
| `UPDATE_KIND` | PUT | `/update/kind/:id` | `CK_gen_cuisineTag_update_kind.js` |
| `UPDATE_SOURCE` | PUT | `/update/source/:id` | `CK_gen_cuisineTag_update_source.js` |

### RELATIONS entries

None.

### GROUPED entries

Reserved — empty for now.

**Total for CuisineTag**: 11 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_cuisineTag_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.CRUD.CREATE;` |
| `CK_gen_cuisineTag_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_cuisineTag_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_cuisineTag_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.CRUD.DELETE;` |
| `CK_gen_cuisineTag_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_cuisineTag_update_value.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.FIELDS.UPDATE_VALUE;` |
| `CK_gen_cuisineTag_update_label.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.FIELDS.UPDATE_LABEL;` |
| `CK_gen_cuisineTag_update_description.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.FIELDS.UPDATE_DESCRIPTION;` |
| `CK_gen_cuisineTag_update_platforms.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.FIELDS.UPDATE_PLATFORMS;` |
| `CK_gen_cuisineTag_update_kind.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.FIELDS.UPDATE_KIND;` |
| `CK_gen_cuisineTag_update_source.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CUISINE_TAG_CONFIG.FIELDS.UPDATE_SOURCE;` |

---

## Integration

> **Security:** credential field updates require extra validation; never expose secrets in list/get responses.

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_INTEGRATION_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_integration/`
- **apiHelpers index**: `_cloudKitchen_integration.index.js` (barrel)

**Route prefix**: `/integration`

```js
export const API_BASE = `${BACKEND_URL}/api/integration`;
```

### Config object: `CK_INTEGRATION_CONFIG`

```js
const CK_INTEGRATION_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_integration_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_integration_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_integration_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_integration_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_integration_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    UPDATE_PROVIDER: {
      ENDPOINT: (id) => `${API_BASE}/update/provider/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_provider.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_KIND: {
      ENDPOINT: (id) => `${API_BASE}/update/kind/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_kind.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ACCOUNTLABEL: {
      ENDPOINT: (id) => `${API_BASE}/update/accountLabel/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_accountLabel.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_description.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STATUS: {
      ENDPOINT: (id) => `${API_BASE}/update/status/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_status.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LIFECYCLE: {
      ENDPOINT: (id) => `${API_BASE}/update/lifecycle/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_lifecycle.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LINKS: {
      ENDPOINT: (id) => `${API_BASE}/update/links/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_links.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PAYMENT: {
      ENDPOINT: (id) => `${API_BASE}/update/payment/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_payment.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LOGINCREDENTIALS: {
      ENDPOINT: (id) => `${API_BASE}/update/loginCredentials/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_loginCredentials.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_KAM: {
      ENDPOINT: (id) => `${API_BASE}/update/kam/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_kam.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SUPPORT: {
      ENDPOINT: (id) => `${API_BASE}/update/support/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_support.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SCHEDULEDMAINTENANCES: {
      ENDPOINT: (id) => `${API_BASE}/update/scheduledMaintenances/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_scheduledMaintenances.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANDS: {
      ENDPOINT: (id) => `${API_BASE}/update/brands/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_brands.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRANCHES: {
      ENDPOINT: (id) => `${API_BASE}/update/branches/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_branches.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_CONTRACT: {
      ENDPOINT: (id) => `${API_BASE}/update/contract/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_contract.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILES: {
      ENDPOINT: (id) => `${API_BASE}/update/files/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_files.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_integration_update_notes.js",
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

export default CK_INTEGRATION_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_integration_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_integration_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_integration_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_integration_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_integration_updateAll.js` |

### FIELDS entries (17)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_PROVIDER` | PUT | `/update/provider/:id` | `CK_gen_integration_update_provider.js` |
| `UPDATE_KIND` | PUT | `/update/kind/:id` | `CK_gen_integration_update_kind.js` |
| `UPDATE_ACCOUNTLABEL` | PUT | `/update/accountLabel/:id` | `CK_gen_integration_update_accountLabel.js` |
| `UPDATE_DESCRIPTION` | PUT | `/update/description/:id` | `CK_gen_integration_update_description.js` |
| `UPDATE_STATUS` | PUT | `/update/status/:id` | `CK_gen_integration_update_status.js` |
| `UPDATE_LIFECYCLE` | PUT | `/update/lifecycle/:id` | `CK_gen_integration_update_lifecycle.js` |
| `UPDATE_LINKS` | PUT | `/update/links/:id` | `CK_gen_integration_update_links.js` |
| `UPDATE_PAYMENT` | PUT | `/update/payment/:id` | `CK_gen_integration_update_payment.js` |
| `UPDATE_LOGINCREDENTIALS` | PUT | `/update/loginCredentials/:id` | `CK_gen_integration_update_loginCredentials.js` |
| `UPDATE_KAM` | PUT | `/update/kam/:id` | `CK_gen_integration_update_kam.js` |
| `UPDATE_SUPPORT` | PUT | `/update/support/:id` | `CK_gen_integration_update_support.js` |
| `UPDATE_SCHEDULEDMAINTENANCES` | PUT | `/update/scheduledMaintenances/:id` | `CK_gen_integration_update_scheduledMaintenances.js` |
| `UPDATE_BRANDS` | PUT | `/update/brands/:id` | `CK_gen_integration_update_brands.js` |
| `UPDATE_BRANCHES` | PUT | `/update/branches/:id` | `CK_gen_integration_update_branches.js` |
| `UPDATE_CONTRACT` | PUT | `/update/contract/:id` | `CK_gen_integration_update_contract.js` |
| `UPDATE_FILES` | PUT | `/update/files/:id` | `CK_gen_integration_update_files.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_integration_update_notes.js` |

### RELATIONS entries

None for now — ref arrays (`brands`, `branches`) are bulk-updated via FIELDS. Single ref `contract` is a field update. **Note:** `loginCredentials` routes must never return credential values in GET responses — handle in service layer.

| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_BRANDS` | POST | `/brands/add/:id` |
| `REMOVE_BRANDS` | DELETE | `/brands/remove/:id` |
| `REORDER_BRANDS` | PUT | `/brands/reorder/:id` |
| `ADD_BRANCHES` | POST | `/branches/add/:id` |
| `REMOVE_BRANCHES` | DELETE | `/branches/remove/:id` |
| `REORDER_BRANCHES` | PUT | `/branches/reorder/:id` |


### GROUPED entries

Reserved — empty for now.

**Total for Integration**: 22 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_integration_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.CRUD.CREATE;` |
| `CK_gen_integration_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_integration_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_integration_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.CRUD.DELETE;` |
| `CK_gen_integration_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_integration_update_provider.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_PROVIDER;` |
| `CK_gen_integration_update_kind.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_KIND;` |
| `CK_gen_integration_update_accountLabel.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_ACCOUNTLABEL;` |
| `CK_gen_integration_update_description.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_DESCRIPTION;` |
| `CK_gen_integration_update_status.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_STATUS;` |
| `CK_gen_integration_update_lifecycle.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_LIFECYCLE;` |
| `CK_gen_integration_update_links.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_LINKS;` |
| `CK_gen_integration_update_payment.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_PAYMENT;` |
| `CK_gen_integration_update_loginCredentials.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_LOGINCREDENTIALS;` |
| `CK_gen_integration_update_kam.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_KAM;` |
| `CK_gen_integration_update_support.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_SUPPORT;` |
| `CK_gen_integration_update_scheduledMaintenances.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_SCHEDULEDMAINTENANCES;` |
| `CK_gen_integration_update_brands.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_BRANDS;` |
| `CK_gen_integration_update_branches.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_BRANCHES;` |
| `CK_gen_integration_update_contract.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_CONTRACT;` |
| `CK_gen_integration_update_files.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_FILES;` |
| `CK_gen_integration_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INTEGRATION_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## Invoice

> **DRAFT**

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_INVOICE_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_invoice/`
- **apiHelpers index**: `_cloudKitchen_invoice.index.js` (barrel)

**Route prefix**: `/invoice`

```js
export const API_BASE = `${BACKEND_URL}/api/invoice`;
```

### Config object: `CK_INVOICE_CONFIG`

```js
const CK_INVOICE_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_invoice_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_invoice_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_invoice_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_invoice_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_invoice_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    // none yet — schema has no top-level fields
  },
  RELATIONS: {},
  GROUPED: {},
};

export default CK_INVOICE_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_invoice_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_invoice_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_invoice_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_invoice_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_invoice_updateAll.js` |

### FIELDS entries (0)

_None — add when schema fields are defined._

### RELATIONS entries

None.

### GROUPED entries

Reserved — empty for now.

**Total for Invoice**: 5 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_invoice_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INVOICE_CONFIG.CRUD.CREATE;` |
| `CK_gen_invoice_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INVOICE_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_invoice_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INVOICE_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_invoice_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INVOICE_CONFIG.CRUD.DELETE;` |
| `CK_gen_invoice_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_INVOICE_CONFIG.CRUD.UPDATE_ALL;` |



---

## Rating

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_RATING_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_rating/`
- **apiHelpers index**: `_cloudKitchen_rating.index.js` (barrel)

**Route prefix**: `/rating`

```js
export const API_BASE = `${BACKEND_URL}/api/rating`;
```

### Config object: `CK_RATING_CONFIG`

```js
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
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_rating_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_rating_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_rating_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_rating_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_rating_updateAll.js` |

### FIELDS entries (15)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_SALESCHANNEL` | PUT | `/update/salesChannel/:id` | `CK_gen_rating_update_salesChannel.js` |
| `UPDATE_ORDER` | PUT | `/update/order/:id` | `CK_gen_rating_update_order.js` |
| `UPDATE_PLATFORMORDERID` | PUT | `/update/platformOrderId/:id` | `CK_gen_rating_update_platformOrderId.js` |
| `UPDATE_CUSTOMER` | PUT | `/update/customer/:id` | `CK_gen_rating_update_customer.js` |
| `UPDATE_STARS` | PUT | `/update/stars/:id` | `CK_gen_rating_update_stars.js` |
| `UPDATE_COMMENT` | PUT | `/update/comment/:id` | `CK_gen_rating_update_comment.js` |
| `UPDATE_RECEIVEDAT` | PUT | `/update/receivedAt/:id` | `CK_gen_rating_update_receivedAt.js` |
| `UPDATE_CUSTOMERNAMESNAPSHOT` | PUT | `/update/customerNameSnapshot/:id` | `CK_gen_rating_update_customerNameSnapshot.js` |
| `UPDATE_CUSTOMERLOYALTYTIER` | PUT | `/update/customerLoyaltyTier/:id` | `CK_gen_rating_update_customerLoyaltyTier.js` |
| `UPDATE_SENTIMENTTAG` | PUT | `/update/sentimentTag/:id` | `CK_gen_rating_update_sentimentTag.js` |
| `UPDATE_ITEMFEEDBACK` | PUT | `/update/itemFeedback/:id` | `CK_gen_rating_update_itemFeedback.js` |
| `UPDATE_ATTACHMENTS` | PUT | `/update/attachments/:id` | `CK_gen_rating_update_attachments.js` |
| `UPDATE_REPLY` | PUT | `/update/reply/:id` | `CK_gen_rating_update_reply.js` |
| `UPDATE_SOURCE` | PUT | `/update/source/:id` | `CK_gen_rating_update_source.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_rating_update_notes.js` |

### RELATIONS entries

None.

### GROUPED entries

Reserved — empty for now.

**Total for Rating**: 20 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_rating_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.CRUD.CREATE;` |
| `CK_gen_rating_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_rating_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_rating_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.CRUD.DELETE;` |
| `CK_gen_rating_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_rating_update_salesChannel.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_SALESCHANNEL;` |
| `CK_gen_rating_update_order.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_ORDER;` |
| `CK_gen_rating_update_platformOrderId.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_PLATFORMORDERID;` |
| `CK_gen_rating_update_customer.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_CUSTOMER;` |
| `CK_gen_rating_update_stars.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_STARS;` |
| `CK_gen_rating_update_comment.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_COMMENT;` |
| `CK_gen_rating_update_receivedAt.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_RECEIVEDAT;` |
| `CK_gen_rating_update_customerNameSnapshot.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_CUSTOMERNAMESNAPSHOT;` |
| `CK_gen_rating_update_customerLoyaltyTier.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_CUSTOMERLOYALTYTIER;` |
| `CK_gen_rating_update_sentimentTag.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_SENTIMENTTAG;` |
| `CK_gen_rating_update_itemFeedback.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_ITEMFEEDBACK;` |
| `CK_gen_rating_update_attachments.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_ATTACHMENTS;` |
| `CK_gen_rating_update_reply.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_REPLY;` |
| `CK_gen_rating_update_source.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_SOURCE;` |
| `CK_gen_rating_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_RATING_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## SalesChannel

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_SALES_CHANNEL_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_salesChannel/`
- **apiHelpers index**: `_cloudKitchen_salesChannel.index.js` (barrel)

**Route prefix**: `/salesChannel`

```js
export const API_BASE = `${BACKEND_URL}/api/salesChannel`;
```

### Config object: `CK_SALES_CHANNEL_CONFIG`

```js
const CK_SALES_CHANNEL_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_salesChannel_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_salesChannel_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    UPDATE_BRANCH: {
      ENDPOINT: (id) => `${API_BASE}/update/branch/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_branch.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_BRAND: {
      ENDPOINT: (id) => `${API_BASE}/update/brand/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_brand.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PLATFORM: {
      ENDPOINT: (id) => `${API_BASE}/update/platform/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_platform.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STOREURL: {
      ENDPOINT: (id) => `${API_BASE}/update/storeUrl/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_storeUrl.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STOREIDS: {
      ENDPOINT: (id) => `${API_BASE}/update/storeIds/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_storeIds.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STATUS: {
      ENDPOINT: (id) => `${API_BASE}/update/status/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_status.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COMMISSIONPCT: {
      ENDPOINT: (id) => `${API_BASE}/update/commissionPct/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_commissionPct.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_RATINGS: {
      ENDPOINT: (id) => `${API_BASE}/update/ratings/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_ratings.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EXCLUDEDMENUITEMS: {
      ENDPOINT: (id) => `${API_BASE}/update/excludedMenuItems/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_excludedMenuItems.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannel_update_notes.js",
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

export default CK_SALES_CHANNEL_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_salesChannel_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_salesChannel_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_salesChannel_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_salesChannel_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_salesChannel_updateAll.js` |

### FIELDS entries (10)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_BRANCH` | PUT | `/update/branch/:id` | `CK_gen_salesChannel_update_branch.js` |
| `UPDATE_BRAND` | PUT | `/update/brand/:id` | `CK_gen_salesChannel_update_brand.js` |
| `UPDATE_PLATFORM` | PUT | `/update/platform/:id` | `CK_gen_salesChannel_update_platform.js` |
| `UPDATE_STOREURL` | PUT | `/update/storeUrl/:id` | `CK_gen_salesChannel_update_storeUrl.js` |
| `UPDATE_STOREIDS` | PUT | `/update/storeIds/:id` | `CK_gen_salesChannel_update_storeIds.js` |
| `UPDATE_STATUS` | PUT | `/update/status/:id` | `CK_gen_salesChannel_update_status.js` |
| `UPDATE_COMMISSIONPCT` | PUT | `/update/commissionPct/:id` | `CK_gen_salesChannel_update_commissionPct.js` |
| `UPDATE_RATINGS` | PUT | `/update/ratings/:id` | `CK_gen_salesChannel_update_ratings.js` |
| `UPDATE_EXCLUDEDMENUITEMS` | PUT | `/update/excludedMenuItems/:id` | `CK_gen_salesChannel_update_excludedMenuItems.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_salesChannel_update_notes.js` |

### RELATIONS entries

None for now — single refs (`branch`, `brand`, `platform`) and array `excludedMenuItems` are bulk-updated via FIELDS.

| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_EXCLUDEDMENUITEMS` | POST | `/excludedMenuItems/add/:id` |
| `REMOVE_EXCLUDEDMENUITEMS` | DELETE | `/excludedMenuItems/remove/:id` |
| `REORDER_EXCLUDEDMENUITEMS` | PUT | `/excludedMenuItems/reorder/:id` |


### GROUPED entries

Reserved — empty for now.

**Total for SalesChannel**: 15 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_salesChannel_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.CRUD.CREATE;` |
| `CK_gen_salesChannel_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_salesChannel_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_salesChannel_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.CRUD.DELETE;` |
| `CK_gen_salesChannel_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_salesChannel_update_branch.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_BRANCH;` |
| `CK_gen_salesChannel_update_brand.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_BRAND;` |
| `CK_gen_salesChannel_update_platform.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_PLATFORM;` |
| `CK_gen_salesChannel_update_storeUrl.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_STOREURL;` |
| `CK_gen_salesChannel_update_storeIds.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_STOREIDS;` |
| `CK_gen_salesChannel_update_status.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_STATUS;` |
| `CK_gen_salesChannel_update_commissionPct.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_COMMISSIONPCT;` |
| `CK_gen_salesChannel_update_ratings.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_RATINGS;` |
| `CK_gen_salesChannel_update_excludedMenuItems.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_EXCLUDEDMENUITEMS;` |
| `CK_gen_salesChannel_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## SalesChannelMetrics

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_SALES_CHANNEL_METRICS_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_salesChannelMetrics/`
- **apiHelpers index**: `_cloudKitchen_salesChannelMetrics.index.js` (barrel)

**Route prefix**: `/salesChannelMetrics`

```js
export const API_BASE = `${BACKEND_URL}/api/salesChannelMetrics`;
```

### Config object: `CK_SALES_CHANNEL_METRICS_CONFIG`

```js
const CK_SALES_CHANNEL_METRICS_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_update_salesChannel.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_GRANULARITY: {
      ENDPOINT: (id) => `${API_BASE}/update/granularity/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_update_granularity.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PERIOD: {
      ENDPOINT: (id) => `${API_BASE}/update/period/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_update_period.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SOURCE: {
      ENDPOINT: (id) => `${API_BASE}/update/source/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_update_source.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILEREF: {
      ENDPOINT: (id) => `${API_BASE}/update/fileRef/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_update_fileRef.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SEGMENTS: {
      ENDPOINT: (id) => `${API_BASE}/update/segments/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_update_segments.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_salesChannelMetrics_update_notes.js",
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

export default CK_SALES_CHANNEL_METRICS_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_salesChannelMetrics_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_salesChannelMetrics_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_salesChannelMetrics_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_salesChannelMetrics_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_salesChannelMetrics_updateAll.js` |

### FIELDS entries (7)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_SALESCHANNEL` | PUT | `/update/salesChannel/:id` | `CK_gen_salesChannelMetrics_update_salesChannel.js` |
| `UPDATE_GRANULARITY` | PUT | `/update/granularity/:id` | `CK_gen_salesChannelMetrics_update_granularity.js` |
| `UPDATE_PERIOD` | PUT | `/update/period/:id` | `CK_gen_salesChannelMetrics_update_period.js` |
| `UPDATE_SOURCE` | PUT | `/update/source/:id` | `CK_gen_salesChannelMetrics_update_source.js` |
| `UPDATE_FILEREF` | PUT | `/update/fileRef/:id` | `CK_gen_salesChannelMetrics_update_fileRef.js` |
| `UPDATE_SEGMENTS` | PUT | `/update/segments/:id` | `CK_gen_salesChannelMetrics_update_segments.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_salesChannelMetrics_update_notes.js` |

### RELATIONS entries

None for now — single ref `salesChannel` and array `segments` are bulk-updated via FIELDS.

| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_SEGMENTS` | POST | `/segments/add/:id` |
| `REMOVE_SEGMENTS` | DELETE | `/segments/remove/:id` |
| `REORDER_SEGMENTS` | PUT | `/segments/reorder/:id` |


### GROUPED entries

Reserved — empty for now.

**Total for SalesChannelMetrics**: 12 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_salesChannelMetrics_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.CRUD.CREATE;` |
| `CK_gen_salesChannelMetrics_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_salesChannelMetrics_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_salesChannelMetrics_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.CRUD.DELETE;` |
| `CK_gen_salesChannelMetrics_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_salesChannelMetrics_update_salesChannel.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.FIELDS.UPDATE_SALESCHANNEL;` |
| `CK_gen_salesChannelMetrics_update_granularity.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.FIELDS.UPDATE_GRANULARITY;` |
| `CK_gen_salesChannelMetrics_update_period.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.FIELDS.UPDATE_PERIOD;` |
| `CK_gen_salesChannelMetrics_update_source.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.FIELDS.UPDATE_SOURCE;` |
| `CK_gen_salesChannelMetrics_update_fileRef.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.FIELDS.UPDATE_FILEREF;` |
| `CK_gen_salesChannelMetrics_update_segments.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.FIELDS.UPDATE_SEGMENTS;` |
| `CK_gen_salesChannelMetrics_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_CHANNEL_METRICS_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## SalesPlatform

> **Security:** credential field updates require extra validation; never expose secrets in list/get responses.

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_SALES_PLATFORM_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_salesPlatform/`
- **apiHelpers index**: `_cloudKitchen_salesPlatform.index.js` (barrel)

**Route prefix**: `/salesPlatform`

```js
export const API_BASE = `${BACKEND_URL}/api/salesPlatform`;
```

### Config object: `CK_SALES_PLATFORM_CONFIG`

```js
const CK_SALES_PLATFORM_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_salesPlatform_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_salesPlatform_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_updateAll.js",
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
      DISPLAY_NAME: "CK_gen_salesPlatform_update_name.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_notes.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LINKS: {
      ENDPOINT: (id) => `${API_BASE}/update/links/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_links.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_KAM: {
      ENDPOINT: (id) => `${API_BASE}/update/kam/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_kam.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_LOGINCREDENTIALS: {
      ENDPOINT: (id) => `${API_BASE}/update/loginCredentials/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_loginCredentials.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_SUPPORT: {
      ENDPOINT: (id) => `${API_BASE}/update/support/${id}`,
      DISPLAY_NAME: "CK_gen_salesPlatform_update_support.js",
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

export default CK_SALES_PLATFORM_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_salesPlatform_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_salesPlatform_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_salesPlatform_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_salesPlatform_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_salesPlatform_updateAll.js` |

### FIELDS entries (6)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_NAME` | PUT | `/update/name/:id` | `CK_gen_salesPlatform_update_name.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_salesPlatform_update_notes.js` |
| `UPDATE_LINKS` | PUT | `/update/links/:id` | `CK_gen_salesPlatform_update_links.js` |
| `UPDATE_KAM` | PUT | `/update/kam/:id` | `CK_gen_salesPlatform_update_kam.js` |
| `UPDATE_LOGINCREDENTIALS` | PUT | `/update/loginCredentials/:id` | `CK_gen_salesPlatform_update_loginCredentials.js` |
| `UPDATE_SUPPORT` | PUT | `/update/support/:id` | `CK_gen_salesPlatform_update_support.js` |

### RELATIONS entries

None.

### GROUPED entries

Reserved — empty for now.

**Total for SalesPlatform**: 11 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_salesPlatform_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.CRUD.CREATE;` |
| `CK_gen_salesPlatform_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_salesPlatform_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_salesPlatform_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.CRUD.DELETE;` |
| `CK_gen_salesPlatform_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_salesPlatform_update_name.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.FIELDS.UPDATE_NAME;` |
| `CK_gen_salesPlatform_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.FIELDS.UPDATE_NOTES;` |
| `CK_gen_salesPlatform_update_links.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.FIELDS.UPDATE_LINKS;` |
| `CK_gen_salesPlatform_update_kam.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.FIELDS.UPDATE_KAM;` |
| `CK_gen_salesPlatform_update_loginCredentials.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.FIELDS.UPDATE_LOGINCREDENTIALS;` |
| `CK_gen_salesPlatform_update_support.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_SALES_PLATFORM_CONFIG.FIELDS.UPDATE_SUPPORT;` |

---

## Contract

> **DRAFT schema** — validated against ~4 of ~22 contract samples. Revisit FIELDS when remaining contracts are reviewed.

- **Endpoint config file**: `frontEnd/src/03_config/apiEndpoints/cloudKitchen_endpoints/cloudKitchen_general_endpoints/CK_CONTRACT_API.config.js`
- **apiHelpers folder**: `frontEnd/src/05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_contract/`
- **apiHelpers index**: `_cloudKitchen_contract.index.js` (barrel)

**Route prefix**: `/contract`

```js
export const API_BASE = `${BACKEND_URL}/api/contract`;
```

### Config object: `CK_CONTRACT_CONFIG`

```js
const CK_CONTRACT_CONFIG = {
  CRUD: {
    CREATE: {
      ENDPOINT: `${API_BASE}/create`,
      DISPLAY_NAME: "CK_gen_contract_create.js",
      PROPERTIES: (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    GET_ALL: {
      ENDPOINT: `${API_BASE}/getAll`,
      DISPLAY_NAME: "CK_gen_contract_getAll.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    GET_ONE: {
      ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
      DISPLAY_NAME: "CK_gen_contract_getOne.js",
      PROPERTIES: () => ({
  method: "GET",
  credentials: "include",
}),
    },
    DELETE: {
      ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
      DISPLAY_NAME: "CK_gen_contract_delete.js",
      PROPERTIES: () => ({
  method: "DELETE",
  credentials: "include",
}),
    },
    UPDATE_ALL: {
      ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
      DISPLAY_NAME: "CK_gen_contract_updateAll.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
  },
  FIELDS: {
    UPDATE_TITLE: {
      ENDPOINT: (id) => `${API_BASE}/update/title/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_title.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_DESCRIPTION: {
      ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_description.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_KIND: {
      ENDPOINT: (id) => `${API_BASE}/update/kind/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_kind.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_OWNERTYPE: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_ownerType.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_OWNERID: {
      ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_ownerId.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COUNTERPARTY: {
      ENDPOINT: (id) => `${API_BASE}/update/counterparty/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_counterparty.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_FILE: {
      ENDPOINT: (id) => `${API_BASE}/update/file/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_file.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EFFECTIVEFROM: {
      ENDPOINT: (id) => `${API_BASE}/update/effectiveFrom/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_effectiveFrom.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_EFFECTIVETO: {
      ENDPOINT: (id) => `${API_BASE}/update/effectiveTo/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_effectiveTo.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_AUTORENEW: {
      ENDPOINT: (id) => `${API_BASE}/update/autoRenew/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_autoRenew.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_TERMINATIONNOTICEDAYS: {
      ENDPOINT: (id) => `${API_BASE}/update/terminationNoticeDays/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_terminationNoticeDays.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_STATUS: {
      ENDPOINT: (id) => `${API_BASE}/update/status/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_status.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COMMISSIONPCT: {
      ENDPOINT: (id) => `${API_BASE}/update/commissionPct/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_commissionPct.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_ADDITIONALCHARGES: {
      ENDPOINT: (id) => `${API_BASE}/update/additionalCharges/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_additionalCharges.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_COMMITMENTS: {
      ENDPOINT: (id) => `${API_BASE}/update/commitments/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_commitments.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_PAYMENT: {
      ENDPOINT: (id) => `${API_BASE}/update/payment/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_payment.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_HISTORY: {
      ENDPOINT: (id) => `${API_BASE}/update/history/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_history.js",
      PROPERTIES: (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}),
    },
    UPDATE_NOTES: {
      ENDPOINT: (id) => `${API_BASE}/update/notes/${id}`,
      DISPLAY_NAME: "CK_gen_contract_update_notes.js",
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

export default CK_CONTRACT_CONFIG;
```

### CRUD entries

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `CREATE` | POST | `/create` | `CK_gen_contract_create.js` |
| `GET_ALL` | GET | `/getAll` | `CK_gen_contract_getAll.js` |
| `GET_ONE` | GET | `/getOne/:id` | `CK_gen_contract_getOne.js` |
| `DELETE` | DELETE | `/delete/:id` | `CK_gen_contract_delete.js` |
| `UPDATE_ALL` | PUT | `/updateAll/:id` | `CK_gen_contract_updateAll.js` |

### FIELDS entries (18)

| Config key | HTTP | Endpoint | DISPLAY_NAME (apiHelper file) |
| ---------- | ---- | -------- | ----------------------------- |
| `UPDATE_TITLE` | PUT | `/update/title/:id` | `CK_gen_contract_update_title.js` |
| `UPDATE_DESCRIPTION` | PUT | `/update/description/:id` | `CK_gen_contract_update_description.js` |
| `UPDATE_KIND` | PUT | `/update/kind/:id` | `CK_gen_contract_update_kind.js` |
| `UPDATE_OWNERTYPE` | PUT | `/update/ownerType/:id` | `CK_gen_contract_update_ownerType.js` |
| `UPDATE_OWNERID` | PUT | `/update/ownerId/:id` | `CK_gen_contract_update_ownerId.js` |
| `UPDATE_COUNTERPARTY` | PUT | `/update/counterparty/:id` | `CK_gen_contract_update_counterparty.js` |
| `UPDATE_FILE` | PUT | `/update/file/:id` | `CK_gen_contract_update_file.js` |
| `UPDATE_EFFECTIVEFROM` | PUT | `/update/effectiveFrom/:id` | `CK_gen_contract_update_effectiveFrom.js` |
| `UPDATE_EFFECTIVETO` | PUT | `/update/effectiveTo/:id` | `CK_gen_contract_update_effectiveTo.js` |
| `UPDATE_AUTORENEW` | PUT | `/update/autoRenew/:id` | `CK_gen_contract_update_autoRenew.js` |
| `UPDATE_TERMINATIONNOTICEDAYS` | PUT | `/update/terminationNoticeDays/:id` | `CK_gen_contract_update_terminationNoticeDays.js` |
| `UPDATE_STATUS` | PUT | `/update/status/:id` | `CK_gen_contract_update_status.js` |
| `UPDATE_COMMISSIONPCT` | PUT | `/update/commissionPct/:id` | `CK_gen_contract_update_commissionPct.js` |
| `UPDATE_ADDITIONALCHARGES` | PUT | `/update/additionalCharges/:id` | `CK_gen_contract_update_additionalCharges.js` |
| `UPDATE_COMMITMENTS` | PUT | `/update/commitments/:id` | `CK_gen_contract_update_commitments.js` |
| `UPDATE_PAYMENT` | PUT | `/update/payment/:id` | `CK_gen_contract_update_payment.js` |
| `UPDATE_HISTORY` | PUT | `/update/history/:id` | `CK_gen_contract_update_history.js` |
| `UPDATE_NOTES` | PUT | `/update/notes/:id` | `CK_gen_contract_update_notes.js` |

### RELATIONS entries

None for now — nested arrays (`additionalCharges`, `commitments`, `history`) are bulk-updated via FIELDS. Polymorphic owner (`ownerType` + `ownerId`) updated via separate field routes.

| Config key | HTTP | Endpoint |
| ---------- | ---- | -------- |
| `ADD_ADDITIONALCHARGES` | POST | `/additionalCharges/add/:id` |
| `REMOVE_ADDITIONALCHARGES` | DELETE | `/additionalCharges/remove/:id` |
| `REORDER_ADDITIONALCHARGES` | PUT | `/additionalCharges/reorder/:id` |
| `ADD_COMMITMENTS` | POST | `/commitments/add/:id` |
| `REMOVE_COMMITMENTS` | DELETE | `/commitments/remove/:id` |
| `REORDER_COMMITMENTS` | PUT | `/commitments/reorder/:id` |
| `ADD_HISTORY` | POST | `/history/add/:id` |
| `REMOVE_HISTORY` | DELETE | `/history/remove/:id` |
| `REORDER_HISTORY` | PUT | `/history/reorder/:id` |


### GROUPED entries

Reserved — empty for now.

**Total for Contract**: 23 apiHelper files.

### apiHelper import mapping

**CRUD**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_contract_create.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.CRUD.CREATE;` |
| `CK_gen_contract_getAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.CRUD.GET_ALL;` |
| `CK_gen_contract_getOne.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.CRUD.GET_ONE;` |
| `CK_gen_contract_delete.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.CRUD.DELETE;` |
| `CK_gen_contract_updateAll.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.CRUD.UPDATE_ALL;` |

**FIELDS**

| apiHelper file | Import line |
| -------------- | ----------- |
| `CK_gen_contract_update_title.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_TITLE;` |
| `CK_gen_contract_update_description.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_DESCRIPTION;` |
| `CK_gen_contract_update_kind.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_KIND;` |
| `CK_gen_contract_update_ownerType.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_OWNERTYPE;` |
| `CK_gen_contract_update_ownerId.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_OWNERID;` |
| `CK_gen_contract_update_counterparty.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_COUNTERPARTY;` |
| `CK_gen_contract_update_file.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_FILE;` |
| `CK_gen_contract_update_effectiveFrom.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_EFFECTIVEFROM;` |
| `CK_gen_contract_update_effectiveTo.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_EFFECTIVETO;` |
| `CK_gen_contract_update_autoRenew.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_AUTORENEW;` |
| `CK_gen_contract_update_terminationNoticeDays.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_TERMINATIONNOTICEDAYS;` |
| `CK_gen_contract_update_status.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_STATUS;` |
| `CK_gen_contract_update_commissionPct.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_COMMISSIONPCT;` |
| `CK_gen_contract_update_additionalCharges.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_ADDITIONALCHARGES;` |
| `CK_gen_contract_update_commitments.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_COMMITMENTS;` |
| `CK_gen_contract_update_payment.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_PAYMENT;` |
| `CK_gen_contract_update_history.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_HISTORY;` |
| `CK_gen_contract_update_notes.js` | `const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = CK_CONTRACT_CONFIG.FIELDS.UPDATE_NOTES;` |

---

## Website

_Skipped — deferred; no scaffold._
