
<!-- Crud BackENd

cK_Mn_it_Modifier_create
cK_Mn_it_Modifier_getAll
cK_Mn_it_Modifier_getOne
cK_Mn_it_Modifier_updateAll
cK_Mn_it_Modifier_delete


- controller: `cK_Mn_it_Modifier_create_cntrl.js`
- validator: `cK_Mn_it_Modifier_create_vld.js`
- route: `POST /api/menuItemModifiers/create`

- controller: `cK_Mn_it_Modifier_getAll_cntrl.js`
- validator: `cK_Mn_it_Modifier_getAll_vld.js`
- route: `GET /api/menuItemModifiers/getAll`

- controller: `cK_Mn_it_Modifier_getOne_cntrl.js`
- validator: `cK_Mn_it_Modifier_getOne_vld.js`
- route: `GET /api/menuItemModifiers/getOne/:id`

- controller: `cK_Mn_it_Modifier_updateAll_cntrl.js`
- validator: `cK_Mn_it_Modifier_updateAll_vld.js`
- route: `PUT /api/menuItemModifiers/updateAll/:id`

- controller: `cK_Mn_it_Modifier_delete_cntrl.js`
- validator: `cK_Mn_it_Modifier_delete_vld.js`
- route: `DELETE /api/menuItemModifiers/delete/:id`

CREATE:{
  ENDPOINT: `${API_BASE}/create`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_create.js",
  PROPERTIES: POST_BODY_SHAPE,
},
GETALL:{
  ENDPOINT: `${API_BASE}/getAll`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_getAll.js",
  PROPERTIES: GET_SHAPE,
},
GETONE:{
  ENDPOINT: (id) => `${API_BASE}/getOne/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_getOne.js",
  PROPERTIES: GET_SHAPE,
},
UPDATEALL: {
  ENDPOINT: (id) => `${API_BASE}/updateAll/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_updateAll.js",
  PROPERTIES: PUT_BODY_SHAPE,
},
DELETE:{
  ENDPOINT: (id) => `${API_BASE}/delete/${id}`,
  DISPLAY_NAME: "CloudKitchen_menuItemModifier_delete.js",
  PROPERTIES: DELETE_NO_BODY_SHAPE,
}

-->

<!-- Fields BackENd

cK_Mn_it_Modifier_update_ownerType_cntrl
cK_Mn_it_Modifier_update_ownerId_cntrl
cK_Mn_it_Modifier_update_title_cntrl
cK_Mn_it_Modifier_update_description_cntrl
cK_Mn_it_Modifier_update_isOptional_cntrl
cK_Mn_it_Modifier_update_selectionMode_cntrl
cK_Mn_it_Modifier_update_isFree_cntrl
cK_Mn_it_Modifier_update_isActive_cntrl
cK_Mn_it_Modifier_update_activeTimings_cntrl

- controller: `cK_Mn_it_Modifier_update_ownerType_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_ownerType_vld.js`
- route: `PUT /api/menuItemModifiers/update/ownerType/:id`

- controller: `cK_Mn_it_Modifier_update_ownerId_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_ownerId_vld.js`
- route: `PUT /api/menuItemModifiers/update/ownerId/:id`

- controller: `cK_Mn_it_Modifier_update_title_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_title_vld.js`
- route: `PUT /api/menuItemModifiers/update/title/:id`

- controller: `cK_Mn_it_Modifier_update_description_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_description_vld.js`
- route: `PUT /api/menuItemModifiers/update/description/:id`

- controller: `cK_Mn_it_Modifier_update_isOptional_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_isOptional_vld.js`
- route: `PUT /api/menuItemModifiers/update/isOptional/:id`

- controller: `cK_Mn_it_Modifier_update_selectionMode_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_selectionMode_vld.js`
- route: `PUT /api/menuItemModifiers/update/selectionMode/:id`

- controller: `cK_Mn_it_Modifier_update_isFree_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_isFree_vld.js`
- route: `PUT /api/menuItemModifiers/update/isFree/:id`

- controller: `cK_Mn_it_Modifier_update_isActive_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_isActive_vld.js`
- route: `PUT /api/menuItemModifiers/update/isActive/:id`

- controller: `cK_Mn_it_Modifier_update_activeTimings_cntrl.js`
- validator: `cK_Mn_it_Modifier_update_activeTimings_vld.js`
- route: `PUT /api/menuItemModifiers/update/activeTimings/:id`


-->

<!-- Relations BackENd


cK_Mn_it_Modifier_addOptions_cntrl
cK_Mn_it_Modifier_removeOptions_cntrl
cK_Mn_it_Modifier_reorderOptions_cntrl


- controller: `cK_Mn_it_Modifier_addOptions_cntrl.js`
- validator: `cK_Mn_it_Modifier_addOptions_vld.js`
- route: `POST /api/menuItemModifiers/options/add/:id`

- controller: `cK_Mn_it_Modifier_removeOptions_cntrl.js`
- validator: `cK_Mn_it_Modifier_removeOptions_vld.js`
- route: `DELETE /api/menuItemModifiers/options/remove/:id`

- controller: `cK_Mn_it_Modifier_reorderOptions_cntrl.js`
- validator: `cK_Mn_it_Modifier_reorderOptions_vld.js`
- route: `PUT /api/menuItemModifiers/options/reorder/:id`


-->

<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->
<!-- !--------------------------------------------------------------------------------- -->

````






- key: ``

```js

````

#### 12c) reorder menu item modifier's options field (body: { orderedEntryIds: [...] })

**backEnd**

**frontEnd**

- apiHelper file: `CloudKitchen_menuItemModifier_reorderOptions.js`
- API_BASE: `"api/menuItemModifiers"`
- key: ``
- value:

```js

```
