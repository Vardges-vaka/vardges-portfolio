# Cloud Kitchen Menu Domain — Routes / Controllers / Services / Validators / Helpers

This file maps every route to its backend & frontend artefacts. Naming conventions and shared `PROPERTIES` shapes are defined at the top and referenced per route.

---

## Naming conventions

**Backend folders (inside `07_controllers/cloudKitchen_cntrl/cloudKitchen_Menu_cntrl/cloudKitchen_<schema>_cntrl/`):**
- `cloudKitchen_<schema>_crud_cntrl/` — create, getAll, getOne, updateAll (master), delete, specialty reads
- `cloudKitchen_<schema>_fields_cntrl/` — per-field PUT endpoints (one controller per field)
- `cloudKitchen_<schema>_relations_cntrl/` — bulk add / remove / reorder for collection fields
- `cloudKitchen_<schema>_cntrl_utils/` — feature-local validators, services, helpers (also split into `_crud_` / `_fields_` / `_relations_`)

**Backend files:**
- controller:  `cloudKitchen_<schema>_<action>_cntrl.js`
- service:     `cloudKitchen_<schema>_<action>_srv.js`
- validator:   `cloudKitchen_<schema>_<action>_vld.js`
- helper:      `cloudKitchen_<schema>_<action>_hlpr.js` *(optional — only create when reusable logic exists)*
- route path:  `/api/<resourceCamelCasePlural>/<action_segments>[/:id]`

**Frontend:**
- apiHelper file: `CloudKitchen_<schema>_<action>.js` *(PascalCase prefix)*
- endpoint config `API_BASE` value: `"api/<resourceCamelCasePlural>"`
- endpoint config key: `<ACTION>_<SCHEMA>` (SCREAMING_SNAKE_CASE — verb first)
- endpoint config value: `{ ENDPOINT, DISPLAY_NAME, PROPERTIES }`

**Shared services (important):**
Field-level controllers (e.g. `update_label_cntrl`, `update_isActive_cntrl`, …) **all call one shared service** `cloudKitchen_<schema>_update_srv.js` with a `{ patch: { fieldName: value } }` payload built by the controller. A per-field service name is listed below for completeness but **can be consolidated into the shared update service** to avoid duplication. Validators and controllers stay per-field (each field has its own validation logic and its own dedicated endpoint).

---

## Shared `PROPERTIES` shapes (referenced below)

```js
// POST_BODY_SHAPE
(body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

// GET_SHAPE
() => ({
  method: "GET",
  credentials: "include",
})

// PUT_BODY_SHAPE
(body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

// DELETE_BODY_SHAPE
(body) => ({
  method: "DELETE",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

// DELETE_NO_BODY_SHAPE
() => ({
  method: "DELETE",
  credentials: "include",
})
```

---
PUT_BODY_SHAPE

## Menu — `backEnd/06_models/cloudKitchen/cloudKitchen_menu/Menu.js`

### Changes I have made

1. the description field has to be simple description, it is not neccecary to have all additional fields.
2. I have changed the ownerId field's required to false, it is ok just to create menus and do not allocate them to a specific brand yet.
3. I have renamed the name field to label and set the value simple label. since the menu name is only for internal purposes, it is not visible to any other platforms. Also set it to be required!
4. Removed the cloudStorage field since there is no files to be stored in this schema.

### Routes

#### 1) create new menu

**backEnd**
- folder: `cloudKitchen_menu_crud_cntrl/`
- controller: `cloudKitchen_menu_create_cntrl.js`
- service: `cloudKitchen_menu_create_srv.js`
- validator: `cloudKitchen_menu_create_vld.js`
- helper: `cloudKitchen_menu_create_hlpr.js`
- route: `POST /api/menus/create`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_create.js`
- API_BASE: `"api/menus"`
- key: `CREATE_MENU`
- value:
```js
{
  ENDPOINT: `${API_BASE}/create`,
  DISPLAY_NAME: "CloudKitchen_menu_create.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 2) get all the menus

**backEnd**
- folder: `cloudKitchen_menu_crud_cntrl/`
- controller: `cloudKitchen_menu_getAll_cntrl.js`
- service: `cloudKitchen_menu_getAll_srv.js`
- validator: `cloudKitchen_menu_getAll_vld.js`
- helper: `cloudKitchen_menu_getAll_hlpr.js`
- route: `GET /api/menus/getAll`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_getAll.js`
- API_BASE: `"api/menus"`
- key: `GETALL_MENU`
- value:
```js
{
  ENDPOINT: `${API_BASE}/getAll`,
  DISPLAY_NAME: "CloudKitchen_menu_getAll.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 3) get one menu by id

**backEnd**
- folder: `cloudKitchen_menu_crud_cntrl/`
- controller: `cloudKitchen_menu_getOne_cntrl.js`
- service: `cloudKitchen_menu_getOne_srv.js`
- validator: `cloudKitchen_menu_getOne_vld.js`
- helper: `cloudKitchen_menu_getOne_hlpr.js`
- route: `GET /api/menus/getOne/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_getOne.js`
- API_BASE: `"api/menus"`
- key: `GETONE_MENU`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_getOne.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 4) update one menu all fields

**backEnd**
- folder: `cloudKitchen_menu_crud_cntrl/`
- controller: `cloudKitchen_menu_updateAll_cntrl.js`
- service: `cloudKitchen_menu_update_srv.js` *(shared — see Naming conventions)*
- validator: `cloudKitchen_menu_updateAll_vld.js`
- helper: `cloudKitchen_menu_updateAll_hlpr.js`
- route: `PUT /api/menus/updateAll/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_updateAll.js`
- API_BASE: `"api/menus"`
- key: `UPDATEALL_MENU`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_updateAll.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 5) update menu's label field

**backEnd**
- folder: `cloudKitchen_menu_fields_cntrl/`
- controller: `cloudKitchen_menu_update_label_cntrl.js`
- service: `cloudKitchen_menu_update_srv.js` *(shared)*
- validator: `cloudKitchen_menu_update_label_vld.js`
- helper: `cloudKitchen_menu_update_label_hlpr.js`
- route: `PUT /api/menus/update/label/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_update_label.js`
- API_BASE: `"api/menus"`
- key: `UPDATE_MENU_LABEL`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/label/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_update_label.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 6) update menu's isActive field

**backEnd**
- folder: `cloudKitchen_menu_fields_cntrl/`
- controller: `cloudKitchen_menu_update_isActive_cntrl.js`
- service: `cloudKitchen_menu_update_srv.js` *(shared)*
- validator: `cloudKitchen_menu_update_isActive_vld.js`
- helper: `cloudKitchen_menu_update_isActive_hlpr.js`
- route: `PUT /api/menus/update/isActive/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_update_isActive.js`
- API_BASE: `"api/menus"`
- key: `UPDATE_MENU_ISACTIVE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/isActive/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_update_isActive.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 7) update menu's description field

**backEnd**
- folder: `cloudKitchen_menu_fields_cntrl/`
- controller: `cloudKitchen_menu_update_description_cntrl.js`
- service: `cloudKitchen_menu_update_srv.js` *(shared)*
- validator: `cloudKitchen_menu_update_description_vld.js`
- helper: `cloudKitchen_menu_update_description_hlpr.js`
- route: `PUT /api/menus/update/description/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_update_description.js`
- API_BASE: `"api/menus"`
- key: `UPDATE_MENU_DESCRIPTION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_update_description.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 8) add menu categories to menu's categories field (body: { categoryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menu_relations_cntrl/`
- controller: `cloudKitchen_menu_addCategories_cntrl.js`
- service: `cloudKitchen_menu_addCategories_srv.js`
- validator: `cloudKitchen_menu_addCategories_vld.js`
- helper: `cloudKitchen_menu_addCategories_hlpr.js`
- route: `POST /api/menus/categories/add/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_addCategories.js`
- API_BASE: `"api/menus"`
- key: `ADD_MENU_CATEGORIES`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/categories/add/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_addCategories.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 8b) remove menu categories from menu's categories field (body: { categoryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menu_relations_cntrl/`
- controller: `cloudKitchen_menu_removeCategories_cntrl.js`
- service: `cloudKitchen_menu_removeCategories_srv.js`
- validator: `cloudKitchen_menu_removeCategories_vld.js`
- helper: `cloudKitchen_menu_removeCategories_hlpr.js`
- route: `DELETE /api/menus/categories/remove/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_removeCategories.js`
- API_BASE: `"api/menus"`
- key: `REMOVE_MENU_CATEGORIES`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/categories/remove/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_removeCategories.js",
  PROPERTIES: DELETE_BODY_SHAPE,
}
```

#### 8c) reorder menu's categories field (body: { orderedCategoryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menu_relations_cntrl/`
- controller: `cloudKitchen_menu_reorderCategories_cntrl.js`
- service: `cloudKitchen_menu_reorderCategories_srv.js`
- validator: `cloudKitchen_menu_reorderCategories_vld.js`
- helper: `cloudKitchen_menu_reorderCategories_hlpr.js`
- route: `PUT /api/menus/categories/reorder/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_reorderCategories.js`
- API_BASE: `"api/menus"`
- key: `REORDER_MENU_CATEGORIES`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/categories/reorder/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_reorderCategories.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 9) update menu's ownerType + ownerId fields (attach to / detach from a Brand or Competitor)

**backEnd**
- folder: `cloudKitchen_menu_fields_cntrl/`
- controller: `cloudKitchen_menu_update_owner_cntrl.js`
- service: `cloudKitchen_menu_update_srv.js` *(shared)*
- validator: `cloudKitchen_menu_update_owner_vld.js`
- helper: `cloudKitchen_menu_update_owner_hlpr.js`
- route: `PUT /api/menus/update/owner/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_update_owner.js`
- API_BASE: `"api/menus"`
- key: `UPDATE_MENU_OWNER`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/owner/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_update_owner.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```
*(body: `{ ownerType, ownerId }` — both fields together so they stay in sync; pass `ownerId: null` to detach)*

#### 10) get menu's categories (populated)

**backEnd**
- folder: `cloudKitchen_menu_crud_cntrl/`
- controller: `cloudKitchen_menu_getCategoriesPopulated_cntrl.js`
- service: `cloudKitchen_menu_getCategoriesPopulated_srv.js`
- validator: `cloudKitchen_menu_getCategoriesPopulated_vld.js`
- helper: `cloudKitchen_menu_getCategoriesPopulated_hlpr.js`
- route: `GET /api/menus/getCategoriesPopulated/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_getCategoriesPopulated.js`
- API_BASE: `"api/menus"`
- key: `GET_MENU_CATEGORIES_POPULATED`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/getCategoriesPopulated/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_getCategoriesPopulated.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 11) get all the menus by ownerType

> Note: this is equivalent to `GET /api/menus/getAll?ownerType=Brand` if you support query params on the generic `getAll` endpoint. If you'd rather keep it as a dedicated route, the spec below applies.

**backEnd**
- folder: `cloudKitchen_menu_crud_cntrl/`
- controller: `cloudKitchen_menu_getAllByOwnerType_cntrl.js`
- service: `cloudKitchen_menu_getAllByOwnerType_srv.js`
- validator: `cloudKitchen_menu_getAllByOwnerType_vld.js`
- helper: `cloudKitchen_menu_getAllByOwnerType_hlpr.js`
- route: `GET /api/menus/getAllByOwnerType/:ownerType`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_getAllByOwnerType.js`
- API_BASE: `"api/menus"`
- key: `GETALL_MENU_BY_OWNERTYPE`
- value:
```js
{
  ENDPOINT: (ownerType) => `${API_BASE}/getAllByOwnerType/${ownerType}`,
  DISPLAY_NAME: "CloudKitchen_menu_getAllByOwnerType.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 12) delete one menu by id

**backEnd**
- folder: `cloudKitchen_menu_crud_cntrl/`
- controller: `cloudKitchen_menu_delete_cntrl.js`
- service: `cloudKitchen_menu_delete_srv.js`
- validator: `cloudKitchen_menu_delete_vld.js`
- helper: `cloudKitchen_menu_delete_hlpr.js`
- route: `DELETE /api/menus/delete/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menu_delete.js`
- API_BASE: `"api/menus"`
- key: `DELETE_MENU`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
  DISPLAY_NAME: "CloudKitchen_menu_delete.js",
  PROPERTIES: DELETE_NO_BODY_SHAPE,
}
```

---

## MenuCategory — `backEnd/06_models/cloudKitchen/cloudKitchen_menu/MenuCategory.js`

### Changes I have made

1. I have changed the ownerId field's required to false, it is ok just to create menus and do not allocate them to a specific brand yet.
2. Removed the cloudStorage field since there is no files to be stored in this schema.

### Routes

#### 1) create new menu category

**backEnd**
- folder: `cloudKitchen_menuCategory_crud_cntrl/`
- controller: `cloudKitchen_menuCategory_create_cntrl.js`
- service: `cloudKitchen_menuCategory_create_srv.js`
- validator: `cloudKitchen_menuCategory_create_vld.js`
- helper: `cloudKitchen_menuCategory_create_hlpr.js`
- route: `POST /api/menuCategories/create`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_create.js`
- API_BASE: `"api/menuCategories"`
- key: `CREATE_MENUCATEGORY`
- value:
```js
{
  ENDPOINT: `${API_BASE}/create`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_create.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 2) get all the menu categories

**backEnd**
- folder: `cloudKitchen_menuCategory_crud_cntrl/`
- controller: `cloudKitchen_menuCategory_getAll_cntrl.js`
- service: `cloudKitchen_menuCategory_getAll_srv.js`
- validator: `cloudKitchen_menuCategory_getAll_vld.js`
- helper: `cloudKitchen_menuCategory_getAll_hlpr.js`
- route: `GET /api/menuCategories/getAll`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_getAll.js`
- API_BASE: `"api/menuCategories"`
- key: `GETALL_MENUCATEGORY`
- value:
```js
{
  ENDPOINT: `${API_BASE}/getAll`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_getAll.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 3) get one menu category by id

**backEnd**
- folder: `cloudKitchen_menuCategory_crud_cntrl/`
- controller: `cloudKitchen_menuCategory_getOne_cntrl.js`
- service: `cloudKitchen_menuCategory_getOne_srv.js`
- validator: `cloudKitchen_menuCategory_getOne_vld.js`
- helper: `cloudKitchen_menuCategory_getOne_hlpr.js`
- route: `GET /api/menuCategories/getOne/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_getOne.js`
- API_BASE: `"api/menuCategories"`
- key: `GETONE_MENUCATEGORY`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_getOne.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 4) update one menu category all fields

**backEnd**
- folder: `cloudKitchen_menuCategory_crud_cntrl/`
- controller: `cloudKitchen_menuCategory_updateAll_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_updateAll_vld.js`
- helper: `cloudKitchen_menuCategory_updateAll_hlpr.js`
- route: `PUT /api/menuCategories/updateAll/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_updateAll.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATEALL_MENUCATEGORY`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_updateAll.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 5) update menu category's name field

**backEnd**
- folder: `cloudKitchen_menuCategory_fields_cntrl/`
- controller: `cloudKitchen_menuCategory_update_name_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_update_name_vld.js`
- helper: `cloudKitchen_menuCategory_update_name_hlpr.js`
- route: `PUT /api/menuCategories/update/name/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_update_name.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATE_MENUCATEGORY_NAME`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/name/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_update_name.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 6) update menu category's description field

**backEnd**
- folder: `cloudKitchen_menuCategory_fields_cntrl/`
- controller: `cloudKitchen_menuCategory_update_description_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_update_description_vld.js`
- helper: `cloudKitchen_menuCategory_update_description_hlpr.js`
- route: `PUT /api/menuCategories/update/description/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_update_description.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATE_MENUCATEGORY_DESCRIPTION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_update_description.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 7) update menu category's menu (parent) field

**backEnd**
- folder: `cloudKitchen_menuCategory_fields_cntrl/`
- controller: `cloudKitchen_menuCategory_update_menu_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_update_menu_vld.js`
- helper: `cloudKitchen_menuCategory_update_menu_hlpr.js`
- route: `PUT /api/menuCategories/update/menu/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_update_menu.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATE_MENUCATEGORY_MENU`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/menu/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_update_menu.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```
*(body: `{ menu: menuId | null }` — single-ref reassignment; pass null to detach)*

#### 8) update menu category's ownerType field

**backEnd**
- folder: `cloudKitchen_menuCategory_fields_cntrl/`
- controller: `cloudKitchen_menuCategory_update_ownerType_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_update_ownerType_vld.js`
- helper: `cloudKitchen_menuCategory_update_ownerType_hlpr.js`
- route: `PUT /api/menuCategories/update/ownerType/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_update_ownerType.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATE_MENUCATEGORY_OWNERTYPE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_update_ownerType.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```
*(Recommended: combine ownerType + ownerId into one `update/owner` route — see Menu #9. Keeping separate per your TODO.)*

#### 9) update menu category's ownerId field (attach / detach owner)

**backEnd**
- folder: `cloudKitchen_menuCategory_fields_cntrl/`
- controller: `cloudKitchen_menuCategory_update_ownerId_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_update_ownerId_vld.js`
- helper: `cloudKitchen_menuCategory_update_ownerId_hlpr.js`
- route: `PUT /api/menuCategories/update/ownerId/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_update_ownerId.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATE_MENUCATEGORY_OWNERID`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_update_ownerId.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 10) update menu category's isActive field

**backEnd**
- folder: `cloudKitchen_menuCategory_fields_cntrl/`
- controller: `cloudKitchen_menuCategory_update_isActive_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_update_isActive_vld.js`
- helper: `cloudKitchen_menuCategory_update_isActive_hlpr.js`
- route: `PUT /api/menuCategories/update/isActive/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_update_isActive.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATE_MENUCATEGORY_ISACTIVE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/isActive/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_update_isActive.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 11) update menu category's activeTimings field

**backEnd**
- folder: `cloudKitchen_menuCategory_fields_cntrl/`
- controller: `cloudKitchen_menuCategory_update_activeTimings_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_update_activeTimings_vld.js`
- helper: `cloudKitchen_menuCategory_update_activeTimings_hlpr.js`
- route: `PUT /api/menuCategories/update/activeTimings/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_update_activeTimings.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATE_MENUCATEGORY_ACTIVETIMINGS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/activeTimings/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_update_activeTimings.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 12) update menu category's displayOrder field

**backEnd**
- folder: `cloudKitchen_menuCategory_fields_cntrl/`
- controller: `cloudKitchen_menuCategory_update_displayOrder_cntrl.js`
- service: `cloudKitchen_menuCategory_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuCategory_update_displayOrder_vld.js`
- helper: `cloudKitchen_menuCategory_update_displayOrder_hlpr.js`
- route: `PUT /api/menuCategories/update/displayOrder/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_update_displayOrder.js`
- API_BASE: `"api/menuCategories"`
- key: `UPDATE_MENUCATEGORY_DISPLAYORDER`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/displayOrder/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_update_displayOrder.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 13) add menu items to menu category's menuItems field (body: { menuItemIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuCategory_relations_cntrl/`
- controller: `cloudKitchen_menuCategory_addMenuItems_cntrl.js`
- service: `cloudKitchen_menuCategory_addMenuItems_srv.js`
- validator: `cloudKitchen_menuCategory_addMenuItems_vld.js`
- helper: `cloudKitchen_menuCategory_addMenuItems_hlpr.js`
- route: `POST /api/menuCategories/menuItems/add/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_addMenuItems.js`
- API_BASE: `"api/menuCategories"`
- key: `ADD_MENUCATEGORY_MENUITEMS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/menuItems/add/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_addMenuItems.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 13b) remove menu items from menu category's menuItems field (body: { entryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuCategory_relations_cntrl/`
- controller: `cloudKitchen_menuCategory_removeMenuItems_cntrl.js`
- service: `cloudKitchen_menuCategory_removeMenuItems_srv.js`
- validator: `cloudKitchen_menuCategory_removeMenuItems_vld.js`
- helper: `cloudKitchen_menuCategory_removeMenuItems_hlpr.js`
- route: `DELETE /api/menuCategories/menuItems/remove/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_removeMenuItems.js`
- API_BASE: `"api/menuCategories"`
- key: `REMOVE_MENUCATEGORY_MENUITEMS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/menuItems/remove/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_removeMenuItems.js",
  PROPERTIES: DELETE_BODY_SHAPE,
}
```

#### 13c) reorder menu category's menuItems field (body: { orderedEntryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuCategory_relations_cntrl/`
- controller: `cloudKitchen_menuCategory_reorderMenuItems_cntrl.js`
- service: `cloudKitchen_menuCategory_reorderMenuItems_srv.js`
- validator: `cloudKitchen_menuCategory_reorderMenuItems_vld.js`
- helper: `cloudKitchen_menuCategory_reorderMenuItems_hlpr.js`
- route: `PUT /api/menuCategories/menuItems/reorder/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_reorderMenuItems.js`
- API_BASE: `"api/menuCategories"`
- key: `REORDER_MENUCATEGORY_MENUITEMS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/menuItems/reorder/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_reorderMenuItems.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 14) get menu category's all menuItems (populated)

**backEnd**
- folder: `cloudKitchen_menuCategory_crud_cntrl/`
- controller: `cloudKitchen_menuCategory_getMenuItemsPopulated_cntrl.js`
- service: `cloudKitchen_menuCategory_getMenuItemsPopulated_srv.js`
- validator: `cloudKitchen_menuCategory_getMenuItemsPopulated_vld.js`
- helper: `cloudKitchen_menuCategory_getMenuItemsPopulated_hlpr.js`
- route: `GET /api/menuCategories/getMenuItemsPopulated/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_getMenuItemsPopulated.js`
- API_BASE: `"api/menuCategories"`
- key: `GET_MENUCATEGORY_MENUITEMS_POPULATED`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/getMenuItemsPopulated/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_getMenuItemsPopulated.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 15) get all menu categories by ownerType

**backEnd**
- folder: `cloudKitchen_menuCategory_crud_cntrl/`
- controller: `cloudKitchen_menuCategory_getAllByOwnerType_cntrl.js`
- service: `cloudKitchen_menuCategory_getAllByOwnerType_srv.js`
- validator: `cloudKitchen_menuCategory_getAllByOwnerType_vld.js`
- helper: `cloudKitchen_menuCategory_getAllByOwnerType_hlpr.js`
- route: `GET /api/menuCategories/getAllByOwnerType/:ownerType`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_getAllByOwnerType.js`
- API_BASE: `"api/menuCategories"`
- key: `GETALL_MENUCATEGORY_BY_OWNERTYPE`
- value:
```js
{
  ENDPOINT: (ownerType) => `${API_BASE}/getAllByOwnerType/${ownerType}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_getAllByOwnerType.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 16) delete one menu category by id

**backEnd**
- folder: `cloudKitchen_menuCategory_crud_cntrl/`
- controller: `cloudKitchen_menuCategory_delete_cntrl.js`
- service: `cloudKitchen_menuCategory_delete_srv.js`
- validator: `cloudKitchen_menuCategory_delete_vld.js`
- helper: `cloudKitchen_menuCategory_delete_hlpr.js`
- route: `DELETE /api/menuCategories/delete/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuCategory_delete.js`
- API_BASE: `"api/menuCategories"`
- key: `DELETE_MENUCATEGORY`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuCategory_delete.js",
  PROPERTIES: DELETE_NO_BODY_SHAPE,
}
```

---

## MenuItem — `backEnd/06_models/cloudKitchen/cloudKitchen_menu/MenuItem.js`

### Changes I have made

1. I have changed the ownerId field's required to false, it is ok just to create menu items and do not allocate them to a specific brand yet.

### Routes

#### 1) get all menu items

**backEnd**
- folder: `cloudKitchen_menuItem_crud_cntrl/`
- controller: `cloudKitchen_menuItem_getAll_cntrl.js`
- service: `cloudKitchen_menuItem_getAll_srv.js`
- validator: `cloudKitchen_menuItem_getAll_vld.js`
- helper: `cloudKitchen_menuItem_getAll_hlpr.js`
- route: `GET /api/menuItems/getAll`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_getAll.js`
- API_BASE: `"api/menuItems"`
- key: `GETALL_MENUITEM`
- value:
```js
{
  ENDPOINT: `${API_BASE}/getAll`,
  DISPLAY_NAME: "CloudKitchen_menuItem_getAll.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 2) get all menu items by ownerType

**backEnd**
- folder: `cloudKitchen_menuItem_crud_cntrl/`
- controller: `cloudKitchen_menuItem_getAllByOwnerType_cntrl.js`
- service: `cloudKitchen_menuItem_getAllByOwnerType_srv.js`
- validator: `cloudKitchen_menuItem_getAllByOwnerType_vld.js`
- helper: `cloudKitchen_menuItem_getAllByOwnerType_hlpr.js`
- route: `GET /api/menuItems/getAllByOwnerType/:ownerType`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_getAllByOwnerType.js`
- API_BASE: `"api/menuItems"`
- key: `GETALL_MENUITEM_BY_OWNERTYPE`
- value:
```js
{
  ENDPOINT: (ownerType) => `${API_BASE}/getAllByOwnerType/${ownerType}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_getAllByOwnerType.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 3) create menu item

**backEnd**
- folder: `cloudKitchen_menuItem_crud_cntrl/`
- controller: `cloudKitchen_menuItem_create_cntrl.js`
- service: `cloudKitchen_menuItem_create_srv.js`
- validator: `cloudKitchen_menuItem_create_vld.js`
- helper: `cloudKitchen_menuItem_create_hlpr.js`
- route: `POST /api/menuItems/create`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_create.js`
- API_BASE: `"api/menuItems"`
- key: `CREATE_MENUITEM`
- value:
```js
{
  ENDPOINT: `${API_BASE}/create`,
  DISPLAY_NAME: "CloudKitchen_menuItem_create.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 4) get one menu item by id

**backEnd**
- folder: `cloudKitchen_menuItem_crud_cntrl/`
- controller: `cloudKitchen_menuItem_getOne_cntrl.js`
- service: `cloudKitchen_menuItem_getOne_srv.js`
- validator: `cloudKitchen_menuItem_getOne_vld.js`
- helper: `cloudKitchen_menuItem_getOne_hlpr.js`
- route: `GET /api/menuItems/getOne/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_getOne.js`
- API_BASE: `"api/menuItems"`
- key: `GETONE_MENUITEM`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_getOne.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 5) update one menu item all fields

**backEnd**
- folder: `cloudKitchen_menuItem_crud_cntrl/`
- controller: `cloudKitchen_menuItem_updateAll_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_updateAll_vld.js`
- helper: `cloudKitchen_menuItem_updateAll_hlpr.js`
- route: `PUT /api/menuItems/updateAll/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_updateAll.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATEALL_MENUITEM`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_updateAll.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 5b) delete one menu item by id

> *Note: your TODO has a duplicate `# 5)` here — I'm labelling it 5b to keep numbering aligned. Suggest renumbering to `# 6) delete...` and shifting the rest by +1 in a cleanup pass.*

**backEnd**
- folder: `cloudKitchen_menuItem_crud_cntrl/`
- controller: `cloudKitchen_menuItem_delete_cntrl.js`
- service: `cloudKitchen_menuItem_delete_srv.js`
- validator: `cloudKitchen_menuItem_delete_vld.js`
- helper: `cloudKitchen_menuItem_delete_hlpr.js`
- route: `DELETE /api/menuItems/delete/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_delete.js`
- API_BASE: `"api/menuItems"`
- key: `DELETE_MENUITEM`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_delete.js",
  PROPERTIES: DELETE_NO_BODY_SHAPE,
}
```

#### 6) update menu item's ownerType field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_ownerType_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_ownerType_vld.js`
- helper: `cloudKitchen_menuItem_update_ownerType_hlpr.js`
- route: `PUT /api/menuItems/update/ownerType/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_ownerType.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_OWNERTYPE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_ownerType.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 7) update menu item's ownerId field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_ownerId_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_ownerId_vld.js`
- helper: `cloudKitchen_menuItem_update_ownerId_hlpr.js`
- route: `PUT /api/menuItems/update/ownerId/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_ownerId.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_OWNERID`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_ownerId.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 8) update menu item's name field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_name_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_name_vld.js`
- helper: `cloudKitchen_menuItem_update_name_hlpr.js`
- route: `PUT /api/menuItems/update/name/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_name.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_NAME`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/name/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_name.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 9) update menu item's cost field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_cost_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_cost_vld.js`
- helper: `cloudKitchen_menuItem_update_cost_hlpr.js`
- route: `PUT /api/menuItems/update/cost/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_cost.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_COST`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/cost/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_cost.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 10) update menu item's description field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_description_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_description_vld.js`
- helper: `cloudKitchen_menuItem_update_description_hlpr.js`
- route: `PUT /api/menuItems/update/description/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_description.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_DESCRIPTION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_description.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 11) update menu item's sellingPrice field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_sellingPrice_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_sellingPrice_vld.js`
- helper: `cloudKitchen_menuItem_update_sellingPrice_hlpr.js`
- route: `PUT /api/menuItems/update/sellingPrice/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_sellingPrice.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_SELLINGPRICE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/sellingPrice/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_sellingPrice.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 12) update menu item's cuisineType field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_cuisineType_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_cuisineType_vld.js`
- helper: `cloudKitchen_menuItem_update_cuisineType_hlpr.js`
- route: `PUT /api/menuItems/update/cuisineType/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_cuisineType.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_CUISINETYPE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/cuisineType/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_cuisineType.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 13) update menu item's images field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_images_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_images_vld.js`
- helper: `cloudKitchen_menuItem_update_images_hlpr.js`
- route: `PUT /api/menuItems/update/images/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_images.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_IMAGES`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/images/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_images.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 14) update menu item's recipe field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_recipe_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_recipe_vld.js`
- helper: `cloudKitchen_menuItem_update_recipe_hlpr.js`
- route: `PUT /api/menuItems/update/recipe/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_recipe.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_RECIPE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/recipe/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_recipe.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 15) update menu item's recipeFile field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_recipeFile_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_recipeFile_vld.js`
- helper: `cloudKitchen_menuItem_update_recipeFile_hlpr.js`
- route: `PUT /api/menuItems/update/recipeFile/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_recipeFile.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_RECIPEFILE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/recipeFile/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_recipeFile.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 16) update menu item's techCardFile field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_techCardFile_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_techCardFile_vld.js`
- helper: `cloudKitchen_menuItem_update_techCardFile_hlpr.js`
- route: `PUT /api/menuItems/update/techCardFile/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_techCardFile.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_TECHCARDFILE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/techCardFile/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_techCardFile.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 17) update menu item's otherFiles field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_otherFiles_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_otherFiles_vld.js`
- helper: `cloudKitchen_menuItem_update_otherFiles_hlpr.js`
- route: `PUT /api/menuItems/update/otherFiles/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_otherFiles.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_OTHERFILES`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/otherFiles/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_otherFiles.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 18) update menu item's priceHistory field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_priceHistory_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_priceHistory_vld.js`
- helper: `cloudKitchen_menuItem_update_priceHistory_hlpr.js`
- route: `PUT /api/menuItems/update/priceHistory/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_priceHistory.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_PRICEHISTORY`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/priceHistory/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_priceHistory.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 19) add modifiers to menu item's modifiers field (body: { modifierIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuItem_relations_cntrl/`
- controller: `cloudKitchen_menuItem_addModifiers_cntrl.js`
- service: `cloudKitchen_menuItem_addModifiers_srv.js`
- validator: `cloudKitchen_menuItem_addModifiers_vld.js`
- helper: `cloudKitchen_menuItem_addModifiers_hlpr.js`
- route: `POST /api/menuItems/modifiers/add/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_addModifiers.js`
- API_BASE: `"api/menuItems"`
- key: `ADD_MENUITEM_MODIFIERS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/modifiers/add/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_addModifiers.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 19b) remove modifiers from menu item's modifiers field (body: { entryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuItem_relations_cntrl/`
- controller: `cloudKitchen_menuItem_removeModifiers_cntrl.js`
- service: `cloudKitchen_menuItem_removeModifiers_srv.js`
- validator: `cloudKitchen_menuItem_removeModifiers_vld.js`
- helper: `cloudKitchen_menuItem_removeModifiers_hlpr.js`
- route: `DELETE /api/menuItems/modifiers/remove/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_removeModifiers.js`
- API_BASE: `"api/menuItems"`
- key: `REMOVE_MENUITEM_MODIFIERS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/modifiers/remove/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_removeModifiers.js",
  PROPERTIES: DELETE_BODY_SHAPE,
}
```

#### 19c) reorder menu item's modifiers field (body: { orderedEntryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuItem_relations_cntrl/`
- controller: `cloudKitchen_menuItem_reorderModifiers_cntrl.js`
- service: `cloudKitchen_menuItem_reorderModifiers_srv.js`
- validator: `cloudKitchen_menuItem_reorderModifiers_vld.js`
- helper: `cloudKitchen_menuItem_reorderModifiers_hlpr.js`
- route: `PUT /api/menuItems/modifiers/reorder/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_reorderModifiers.js`
- API_BASE: `"api/menuItems"`
- key: `REORDER_MENUITEM_MODIFIERS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/modifiers/reorder/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_reorderModifiers.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 20) update menu item's sizeByGrams field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_sizeByGrams_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_sizeByGrams_vld.js`
- helper: `cloudKitchen_menuItem_update_sizeByGrams_hlpr.js`
- route: `PUT /api/menuItems/update/sizeByGrams/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_sizeByGrams.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_SIZEBYGRAMS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/sizeByGrams/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_sizeByGrams.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 21) update menu item's quantity field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_quantity_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_quantity_vld.js`
- helper: `cloudKitchen_menuItem_update_quantity_hlpr.js`
- route: `PUT /api/menuItems/update/quantity/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_quantity.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_QUANTITY`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/quantity/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_quantity.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 22) update menu item's dietaryTags field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_dietaryTags_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_dietaryTags_vld.js`
- helper: `cloudKitchen_menuItem_update_dietaryTags_hlpr.js`
- route: `PUT /api/menuItems/update/dietaryTags/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_dietaryTags.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_DIETARYTAGS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/dietaryTags/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_dietaryTags.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 23) update menu item's allergens field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_allergens_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_allergens_vld.js`
- helper: `cloudKitchen_menuItem_update_allergens_hlpr.js`
- route: `PUT /api/menuItems/update/allergens/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_allergens.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_ALLERGENS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/allergens/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_allergens.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 24) update menu item's spicyLevel field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_spicyLevel_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_spicyLevel_vld.js`
- helper: `cloudKitchen_menuItem_update_spicyLevel_hlpr.js`
- route: `PUT /api/menuItems/update/spicyLevel/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_spicyLevel.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_SPICYLEVEL`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/spicyLevel/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_spicyLevel.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 25) update menu item's preparationTimeMin field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_preparationTimeMin_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_preparationTimeMin_vld.js`
- helper: `cloudKitchen_menuItem_update_preparationTimeMin_hlpr.js`
- route: `PUT /api/menuItems/update/preparationTimeMin/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_preparationTimeMin.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_PREPARATIONTIMEMIN`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/preparationTimeMin/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_preparationTimeMin.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 26) update menu item's sku field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_sku_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_sku_vld.js`
- helper: `cloudKitchen_menuItem_update_sku_hlpr.js`
- route: `PUT /api/menuItems/update/sku/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_sku.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_SKU`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/sku/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_sku.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 27) update menu item's kitchenStation field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_kitchenStation_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_kitchenStation_vld.js`
- helper: `cloudKitchen_menuItem_update_kitchenStation_hlpr.js`
- route: `PUT /api/menuItems/update/kitchenStation/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_kitchenStation.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_KITCHENSTATION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/kitchenStation/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_kitchenStation.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 28) update menu item's nutrition field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_nutrition_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_nutrition_vld.js`
- helper: `cloudKitchen_menuItem_update_nutrition_hlpr.js`
- route: `PUT /api/menuItems/update/nutrition/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_nutrition.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_NUTRITION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/nutrition/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_nutrition.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 29) add entries to menu item's mirroredWithOtherMenuItems field (body: { entries: [{ brand, item, note }, ...] })

**backEnd**
- folder: `cloudKitchen_menuItem_relations_cntrl/`
- controller: `cloudKitchen_menuItem_addMirrors_cntrl.js`
- service: `cloudKitchen_menuItem_addMirrors_srv.js` *(performs symmetric write — also adds inverse entry on each target item)*
- validator: `cloudKitchen_menuItem_addMirrors_vld.js`
- helper: `cloudKitchen_menuItem_addMirrors_hlpr.js`
- route: `POST /api/menuItems/mirrors/add/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_addMirrors.js`
- API_BASE: `"api/menuItems"`
- key: `ADD_MENUITEM_MIRRORS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/mirrors/add/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_addMirrors.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 29b) remove entries from menu item's mirroredWithOtherMenuItems field (body: { entryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuItem_relations_cntrl/`
- controller: `cloudKitchen_menuItem_removeMirrors_cntrl.js`
- service: `cloudKitchen_menuItem_removeMirrors_srv.js` *(clears inverse entry on each linked item)*
- validator: `cloudKitchen_menuItem_removeMirrors_vld.js`
- helper: `cloudKitchen_menuItem_removeMirrors_hlpr.js`
- route: `DELETE /api/menuItems/mirrors/remove/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_removeMirrors.js`
- API_BASE: `"api/menuItems"`
- key: `REMOVE_MENUITEM_MIRRORS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/mirrors/remove/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_removeMirrors.js",
  PROPERTIES: DELETE_BODY_SHAPE,
}
```

#### 30) add entries to menu item's competesWithOtherMenuItems field (body: { entries: [...] })

**backEnd**
- folder: `cloudKitchen_menuItem_relations_cntrl/`
- controller: `cloudKitchen_menuItem_addCompetes_cntrl.js`
- service: `cloudKitchen_menuItem_addCompetes_srv.js` *(one-directional, no sync needed)*
- validator: `cloudKitchen_menuItem_addCompetes_vld.js`
- helper: `cloudKitchen_menuItem_addCompetes_hlpr.js`
- route: `POST /api/menuItems/competes/add/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_addCompetes.js`
- API_BASE: `"api/menuItems"`
- key: `ADD_MENUITEM_COMPETES`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/competes/add/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_addCompetes.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 30b) remove entries from menu item's competesWithOtherMenuItems field (body: { entryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuItem_relations_cntrl/`
- controller: `cloudKitchen_menuItem_removeCompetes_cntrl.js`
- service: `cloudKitchen_menuItem_removeCompetes_srv.js`
- validator: `cloudKitchen_menuItem_removeCompetes_vld.js`
- helper: `cloudKitchen_menuItem_removeCompetes_hlpr.js`
- route: `DELETE /api/menuItems/competes/remove/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_removeCompetes.js`
- API_BASE: `"api/menuItems"`
- key: `REMOVE_MENUITEM_COMPETES`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/competes/remove/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_removeCompetes.js",
  PROPERTIES: DELETE_BODY_SHAPE,
}
```

#### 31) update menu item's source field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_source_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_source_vld.js`
- helper: `cloudKitchen_menuItem_update_source_hlpr.js`
- route: `PUT /api/menuItems/update/source/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_source.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_SOURCE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/source/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_source.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 32) update menu item's externalId field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_externalId_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_externalId_vld.js`
- helper: `cloudKitchen_menuItem_update_externalId_hlpr.js`
- route: `PUT /api/menuItems/update/externalId/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_externalId.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_EXTERNALID`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/externalId/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_externalId.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 33) update menu item's cloudStorage field

**backEnd**
- folder: `cloudKitchen_menuItem_fields_cntrl/`
- controller: `cloudKitchen_menuItem_update_cloudStorage_cntrl.js`
- service: `cloudKitchen_menuItem_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItem_update_cloudStorage_vld.js`
- helper: `cloudKitchen_menuItem_update_cloudStorage_hlpr.js`
- route: `PUT /api/menuItems/update/cloudStorage/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItem_update_cloudStorage.js`
- API_BASE: `"api/menuItems"`
- key: `UPDATE_MENUITEM_CLOUDSTORAGE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/cloudStorage/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItem_update_cloudStorage.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

---

## MenuItemModifier — `backEnd/06_models/cloudKitchen/cloudKitchen_menu/MenuItemModifier.js`

### Changes I have made

1. I have changed the ownerId field's required to false, it is ok just to create menu item modifiers and do not allocate them to a specific brand yet.
2. Removed the cloudStorage field since there is no files to be stored in this schema.

> *Note: your TODO has duplicate `# 2)`, `# 3)`, `# 4)` numbering — I've renumbered cleanly below (5→4, 6→5, etc.).*

### Routes

#### 1) create new menu item modifier

**backEnd**
- folder: `cloudKitchen_menuItemModifier_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifier_create_cntrl.js`
- service: `cloudKitchen_menuItemModifier_create_srv.js`
- validator: `cloudKitchen_menuItemModifier_create_vld.js`
- helper: `cloudKitchen_menuItemModifier_create_hlpr.js`
- route: `POST /api/menuItemModifiers/create`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_create.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `CREATE_MENUITEMMODIFIER`
- value:
```js
{
  ENDPOINT: `${API_BASE}/create`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_create.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 2) get all menu item modifiers

**backEnd**
- folder: `cloudKitchen_menuItemModifier_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifier_getAll_cntrl.js`
- service: `cloudKitchen_menuItemModifier_getAll_srv.js`
- validator: `cloudKitchen_menuItemModifier_getAll_vld.js`
- helper: `cloudKitchen_menuItemModifier_getAll_hlpr.js`
- route: `GET /api/menuItemModifiers/getAll`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_getAll.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `GETALL_MENUITEMMODIFIER`
- value:
```js
{
  ENDPOINT: `${API_BASE}/getAll`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_getAll.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 3) get one menu item modifier by id

**backEnd**
- folder: `cloudKitchen_menuItemModifier_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifier_getOne_cntrl.js`
- service: `cloudKitchen_menuItemModifier_getOne_srv.js`
- validator: `cloudKitchen_menuItemModifier_getOne_vld.js`
- helper: `cloudKitchen_menuItemModifier_getOne_hlpr.js`
- route: `GET /api/menuItemModifiers/getOne/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_getOne.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `GETONE_MENUITEMMODIFIER`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_getOne.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 4) update one menu item modifier all fields

**backEnd**
- folder: `cloudKitchen_menuItemModifier_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifier_updateAll_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_updateAll_vld.js`
- helper: `cloudKitchen_menuItemModifier_updateAll_hlpr.js`
- route: `PUT /api/menuItemModifiers/updateAll/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_updateAll.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATEALL_MENUITEMMODIFIER`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_updateAll.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 5) update menu item modifier's ownerType field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_ownerType_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_ownerType_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_ownerType_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/ownerType/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_ownerType.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_OWNERTYPE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_ownerType.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 6) update menu item modifier's ownerId field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_ownerId_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_ownerId_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_ownerId_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/ownerId/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_ownerId.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_OWNERID`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_ownerId.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 7) update menu item modifier's title field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_title_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_title_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_title_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/title/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_title.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_TITLE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/title/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_title.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 8) update menu item modifier's description field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_description_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_description_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_description_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/description/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_description.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_DESCRIPTION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_description.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 9) update menu item modifier's isOptional field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_isOptional_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_isOptional_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_isOptional_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/isOptional/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_isOptional.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_ISOPTIONAL`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/isOptional/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_isOptional.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 10) update menu item modifier's selectionMode field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_selectionMode_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_selectionMode_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_selectionMode_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/selectionMode/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_selectionMode.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_SELECTIONMODE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/selectionMode/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_selectionMode.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 11) update menu item modifier's isFree field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_isFree_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_isFree_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_isFree_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/isFree/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_isFree.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_ISFREE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/isFree/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_isFree.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 12) add options to menu item modifier's options field (body: { optionIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuItemModifier_relations_cntrl/`
- controller: `cloudKitchen_menuItemModifier_addOptions_cntrl.js`
- service: `cloudKitchen_menuItemModifier_addOptions_srv.js`
- validator: `cloudKitchen_menuItemModifier_addOptions_vld.js`
- helper: `cloudKitchen_menuItemModifier_addOptions_hlpr.js`
- route: `POST /api/menuItemModifiers/options/add/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_addOptions.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `ADD_MENUITEMMODIFIER_OPTIONS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/options/add/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_addOptions.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 12b) remove options from menu item modifier's options field (body: { entryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuItemModifier_relations_cntrl/`
- controller: `cloudKitchen_menuItemModifier_removeOptions_cntrl.js`
- service: `cloudKitchen_menuItemModifier_removeOptions_srv.js`
- validator: `cloudKitchen_menuItemModifier_removeOptions_vld.js`
- helper: `cloudKitchen_menuItemModifier_removeOptions_hlpr.js`
- route: `DELETE /api/menuItemModifiers/options/remove/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_removeOptions.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `REMOVE_MENUITEMMODIFIER_OPTIONS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/options/remove/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_removeOptions.js",
  PROPERTIES: DELETE_BODY_SHAPE,
}
```

#### 12c) reorder menu item modifier's options field (body: { orderedEntryIds: [...] })

**backEnd**
- folder: `cloudKitchen_menuItemModifier_relations_cntrl/`
- controller: `cloudKitchen_menuItemModifier_reorderOptions_cntrl.js`
- service: `cloudKitchen_menuItemModifier_reorderOptions_srv.js`
- validator: `cloudKitchen_menuItemModifier_reorderOptions_vld.js`
- helper: `cloudKitchen_menuItemModifier_reorderOptions_hlpr.js`
- route: `PUT /api/menuItemModifiers/options/reorder/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_reorderOptions.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `REORDER_MENUITEMMODIFIER_OPTIONS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/options/reorder/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_reorderOptions.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 13) update menu item modifier's isActive field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_isActive_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_isActive_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_isActive_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/isActive/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_isActive.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_ISACTIVE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/isActive/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_isActive.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 14) update menu item modifier's activeTimings field

**backEnd**
- folder: `cloudKitchen_menuItemModifier_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifier_update_activeTimings_cntrl.js`
- service: `cloudKitchen_menuItemModifier_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifier_update_activeTimings_vld.js`
- helper: `cloudKitchen_menuItemModifier_update_activeTimings_hlpr.js`
- route: `PUT /api/menuItemModifiers/update/activeTimings/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_update_activeTimings.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `UPDATE_MENUITEMMODIFIER_ACTIVETIMINGS`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/activeTimings/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_update_activeTimings.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 15) delete one menu item modifier by id

**backEnd**
- folder: `cloudKitchen_menuItemModifier_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifier_delete_cntrl.js`
- service: `cloudKitchen_menuItemModifier_delete_srv.js`
- validator: `cloudKitchen_menuItemModifier_delete_vld.js`
- helper: `cloudKitchen_menuItemModifier_delete_hlpr.js`
- route: `DELETE /api/menuItemModifiers/delete/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifier_delete.js`
- API_BASE: `"api/menuItemModifiers"`
- key: `DELETE_MENUITEMMODIFIER`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_delete.js",
  PROPERTIES: DELETE_NO_BODY_SHAPE,
}
```

---

## MenuItemModifierOption — `backEnd/06_models/cloudKitchen/cloudKitchen_menu/MenuItemModifierOption.js`

### Changes I have made

1. I have changed the ownerId field's required to false, it is ok just to create menu item modifier option and do not allocate them to a specific brand yet.

### Routes

#### 1) create new menu item modifier option

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_create_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_create_srv.js`
- validator: `cloudKitchen_menuItemModifierOption_create_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_create_hlpr.js`
- route: `POST /api/menuItemModifierOptions/create`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_create.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `CREATE_MENUITEMMODIFIEROPTION`
- value:
```js
{
  ENDPOINT: `${API_BASE}/create`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_create.js",
  PROPERTIES: POST_BODY_SHAPE,
}
```

#### 2) get all menu item modifier options

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_getAll_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_getAll_srv.js`
- validator: `cloudKitchen_menuItemModifierOption_getAll_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_getAll_hlpr.js`
- route: `GET /api/menuItemModifierOptions/getAll`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_getAll.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `GETALL_MENUITEMMODIFIEROPTION`
- value:
```js
{
  ENDPOINT: `${API_BASE}/getAll`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_getAll.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 3) get one menu item modifier option by id

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_getOne_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_getOne_srv.js`
- validator: `cloudKitchen_menuItemModifierOption_getOne_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_getOne_hlpr.js`
- route: `GET /api/menuItemModifierOptions/getOne/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_getOne.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `GETONE_MENUITEMMODIFIEROPTION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_getOne.js",
  PROPERTIES: GET_SHAPE,
}
```

#### 4) update one menu item modifier option all fields

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_updateAll_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_updateAll_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_updateAll_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/updateAll/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_updateAll.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATEALL_MENUITEMMODIFIEROPTION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_updateAll.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 5) delete one menu item modifier option by id

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_crud_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_delete_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_delete_srv.js`
- validator: `cloudKitchen_menuItemModifierOption_delete_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_delete_hlpr.js`
- route: `DELETE /api/menuItemModifierOptions/delete/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_delete.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `DELETE_MENUITEMMODIFIEROPTION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_delete.js",
  PROPERTIES: DELETE_NO_BODY_SHAPE,
}
```

#### 6) update menu item modifier option's ownerType field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_ownerType_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_ownerType_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_ownerType_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/ownerType/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_ownerType.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_OWNERTYPE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/ownerType/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_ownerType.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 7) update menu item modifier option's ownerId field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_ownerId_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_ownerId_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_ownerId_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/ownerId/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_ownerId.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_OWNERID`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/ownerId/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_ownerId.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 8) update menu item modifier option's name field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_name_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_name_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_name_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/name/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_name.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_NAME`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/name/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_name.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 9) update menu item modifier option's description field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_description_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_description_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_description_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/description/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_description.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_DESCRIPTION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/description/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_description.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 10) update menu item modifier option's images field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_images_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_images_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_images_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/images/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_images.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_IMAGES`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/images/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_images.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 11) update menu item modifier option's recipeFile field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_recipeFile_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_recipeFile_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_recipeFile_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/recipeFile/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_recipeFile.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_RECIPEFILE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/recipeFile/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_recipeFile.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 12) update menu item modifier option's techCardFile field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_techCardFile_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_techCardFile_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_techCardFile_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/techCardFile/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_techCardFile.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_TECHCARDFILE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/techCardFile/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_techCardFile.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 13) update menu item modifier option's cost field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_cost_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_cost_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_cost_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/cost/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_cost.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_COST`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/cost/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_cost.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 14) update menu item modifier option's sellingPrice field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_sellingPrice_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_sellingPrice_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_sellingPrice_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/sellingPrice/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_sellingPrice.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_SELLINGPRICE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/sellingPrice/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_sellingPrice.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 15) update menu item modifier option's nutrition field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_nutrition_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_nutrition_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_nutrition_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/nutrition/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_nutrition.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_NUTRITION`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/nutrition/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_nutrition.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

#### 16) update menu item modifier option's cloudStorage field

**backEnd**
- folder: `cloudKitchen_menuItemModifierOption_fields_cntrl/`
- controller: `cloudKitchen_menuItemModifierOption_update_cloudStorage_cntrl.js`
- service: `cloudKitchen_menuItemModifierOption_update_srv.js` *(shared)*
- validator: `cloudKitchen_menuItemModifierOption_update_cloudStorage_vld.js`
- helper: `cloudKitchen_menuItemModifierOption_update_cloudStorage_hlpr.js`
- route: `PUT /api/menuItemModifierOptions/update/cloudStorage/:id`

**frontEnd**
- apiHelper file: `CloudKitchen_menuItemModifierOption_update_cloudStorage.js`
- API_BASE: `"api/menuItemModifierOptions"`
- key: `UPDATE_MENUITEMMODIFIEROPTION_CLOUDSTORAGE`
- value:
```js
{
  ENDPOINT: (id) => `${API_BASE}/update/cloudStorage/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifierOption_update_cloudStorage.js",
  PROPERTIES: PUT_BODY_SHAPE,
}
```

---

## Summary

Total routes: **~99** across 5 resources.
- Menu: 14 routes
- MenuCategory: 18 routes
- MenuItem: 37 routes
- MenuItemModifier: 18 routes
- MenuItemModifierOption: 16 routes (could grow if you split `cost` / `sellingPrice` / `nutrition` subdocs into sub-fields later)

Each route maps to **5 backend artefacts** (controller, service, validator, helper, route line) and **3 frontend artefacts** (apiHelper file, endpoint config key, endpoint config value).

If we consolidate per-field services to the shared `cloudKitchen_<schema>_update_srv.js`, the backend file count drops by ~70 service files (only `crud` and `relations` services stay distinct).

