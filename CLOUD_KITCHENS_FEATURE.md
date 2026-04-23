# Cloud Kitchens Operations Management — Feature Documentation

## Overview

This feature is part of the **Back Office** section of `vardges.me` — a private, auth-protected personal management dashboard built on a MERN stack. The Cloud Kitchens module is designed to manage all operational, financial, and analytical data for a chain of cloud (dark) kitchens operating in Dubai, UAE.

The business currently operates:
- **5 branches** across Dubai
- **3 brands**, each with its own menu and identity
- **Multiple aggregator contracts** per brand per branch (Talabat, Careem, Deliveroo, Keeta, Noon, etc.)

The feature is being built **incrementally**. The immediate goal is to establish a solid, working CRUD foundation for the core entities, then layer in specifications, validations, analytics, and UI complexity on top.

---

## Business Context

Each branch is a physical kitchen location. Inside that branch, one or more brands operate. Each brand has its own menu and is listed on one or more delivery aggregator platforms. The relationship looks like this:

```
Branch
  └── Brand(s)
        └── Aggregator(s)
              └── Daily Sales Entries
```

Each unique combination of `Branch → Brand → Aggregator` is called an **Outlet**. An outlet is the atomic unit for tracking sales.

---

## Core Entities

### 1. Branch
A physical kitchen location. Contains operational, financial, contractual, and geographic data.

**Current branches:**
- Arjan
- Business Bay – SOL
- Business Bay – Cuisinette
- Dubai Marina
- Dubai Silicon Oasis

**Key fields (defined, may expand):**
- Name, address, coordinates (Google Maps compatible)
- Contact info: internal support + kitchen manager
- Operations: active status, opening/closing times (HH:mm), open since / closed since
- Costs: fixed monthly (rent, utilities) + variable/irregular (sewage, pest control, etc.)
- Contract: duration, amount, termination notice period (days), file URL
- Coverage areas: by distance (polygon/radius) and by drive time (polygon/radius) — all stored as `{ lat, lng }` coordinate arrays for Google Maps API compatibility
- Images: array of URLs
- References: employees, equipment, brands
- Notes, timestamps

> ⚠️ Several fields are intentionally undetermined at this stage. The schema is designed to be extended. Do not enforce strict validations until CRUD routes and frontend are confirmed working end-to-end.

---

### 2. Brand
A virtual restaurant brand operating inside one or more branches. Has its own identity, menu, and aggregator presence.

**Current brands:**
- Vkusno (Russian Kitchen)
- Blini
- *(Third brand TBD)*

**Key fields (to be defined):**
- Name, logo, description
- Menu reference
- Opening/closing times (may differ from branch kitchen hours)
- Aggregator references (which aggregators carry this brand)
- Active status

> Brand is independent of Branch at the schema level. The `Branch` document holds an array of `Brand` refs. This allows the same brand to appear in multiple branches.

---

### 3. Aggregator
A food delivery platform that lists a brand's menu and processes orders.

**Current aggregators in use:**
- Talabat
- Talabat Express
- Careem
- Deliveroo
- Keeta
- Noon

**Key fields (to be defined):**
- Name, logo
- Contract terms (commission rate, payment cycle, etc.) — **these vary per Branch + Brand combination**
- Contact / account manager info
- Active status

> ⚠️ Contract terms between an aggregator and a brand are **not** stored on the Aggregator model itself. They belong to the **Outlet** model (see below), since terms differ per branch-brand-aggregator combination.

---

### 4. Outlet
A junction entity representing one unique `Branch → Brand → Aggregator` combination. This is where contract specifics live.

**Example outlets:**
- Arjan / Vkusno / Talabat
- Arjan / Blini / Careem
- Business Bay Cuisinette / Vkusno / Deliveroo

**Key fields (to be defined):**
- References: `branch`, `brand`, `aggregator`
- Contract: commission %, payment terms, contract start/end, file URL
- Opening/closing times specific to this outlet (aggregator may have different hours)
- Active status

> The Outlet model is the critical linking layer. Sales entries reference an outlet, not a raw branch+brand+aggregator combo.

---

### 5. SalesEntry
A daily record of revenue and order count for a specific outlet.

**Key fields:**
- Reference: `outlet` (ObjectId)
- Date
- Revenue (AED)
- Order count
- Notes (optional)
- Timestamps

> This is the data that feeds all analytics and trend tracking. Entered manually every day.

---

### 6. Employee *(future)*
Staff assigned to a branch. Assignment history must be preserved so historical salary costs can be reconstructed accurately.

**Notes:**
- `salaries` field is intentionally omitted from the Branch schema
- When implemented, salary costs will be calculated from employee assignment records
- Historical assignment tracking (who was at which branch and when) is a requirement

---

### 7. Equipment *(future)*
Kitchen equipment assigned to branches. Referenced in the Branch model via an array of ObjectIds.

---

## Data Relationships

```
Branch ──< brands[] >── Brand ──< aggregators[] >── Aggregator
                                                          │
                                               Outlet (Branch + Brand + Aggregator)
                                                          │
                                               SalesEntry (daily)
```

- Branch references Brands (array of refs)
- Brand references Aggregators (array of refs)
- Outlet ties all three together and holds contract-specific data
- SalesEntry references a single Outlet

---

## Development Philosophy

### Phase 1 — Foundation (Current)
Goal: Get basic CRUD working cleanly for all core entities. No heavy validations. No analytics. Just the ability to create, read, update, and delete.

**Order of implementation:**
1. Branch
2. Brand
3. Aggregator
4. Outlet
5. SalesEntry

For each entity:
1. Define Mongoose schema (minimal required fields)
2. Create RESTful controller (CRUD)
3. Define routes
4. Build basic frontend UI (list view + form)
5. Confirm working end-to-end
6. Then and only then: add validations and extended fields

### Phase 2 — Specifications
- Add validations to all schemas
- Add remaining fields that are currently TBD
- Employee assignment history and salary cost calculation
- Aggregator contract details per outlet
- File uploads (contracts, images)
- Google Maps integration for coverage areas

### Phase 3 — Analytics
- Daily, weekly, monthly sales tracking per outlet / brand / branch
- Revenue trend charts
- Order volume trends
- Cost tracking and profitability per branch
- Aggregator performance comparison
- Brand performance comparison

---

## API Structure (Planned)

All routes are protected behind auth middleware (existing in the app).

```
/api/branches
  GET    /              → list all branches
  POST   /              → create branch
  GET    /:id           → get branch by id (populated: brands)
  PUT    /:id           → update branch
  DELETE /:id           → delete branch

/api/brands
  GET    /              → list all brands
  POST   /              → create brand
  GET    /:id           → get brand by id (populated: aggregators)
  PUT    /:id           → update brand
  DELETE /:id           → delete brand

/api/aggregators
  GET    /              → list all aggregators
  POST   /              → create aggregator
  GET    /:id           → get aggregator by id
  PUT    /:id           → update aggregator
  DELETE /:id           → delete aggregator

/api/outlets
  GET    /              → list all outlets (optionally filter by branch/brand/aggregator)
  POST   /              → create outlet
  GET    /:id           → get outlet by id (fully populated)
  PUT    /:id           → update outlet
  DELETE /:id           → delete outlet

/api/sales
  GET    /              → list sales entries (filter by outlet, date range, brand, branch)
  POST   /              → create sales entry
  GET    /:id           → get single entry
  PUT    /:id           → update entry
  DELETE /:id           → delete entry
```

---

## Frontend UI Concept (Back Office)

The UI follows a drill-down navigation model:

```
Branches List
  → Click Branch → Branch Detail (shows assigned brands)
      → Click Brand → Brand Detail (shows aggregators for this branch)
          → Click Aggregator → Outlet Detail (contract, sales history)
              → Sales entries (daily log, charts)
```

Alongside the drill-down, there will be:
- A **dashboard overview** with top-level KPIs (total revenue today, best performing brand, etc.)
- A **sales input form** — quick daily entry UI
- Filterable/sortable **sales table** for historical review
- Charts for trend analysis (to be built in Phase 3)

---

## File Structure (Suggested)

```
server/
  models/
    Branch.js
    Brand.js
    Aggregator.js
    Outlet.js
    SalesEntry.js
    Employee.js       ← future
    Equipment.js      ← future
  controllers/
    branchController.js
    brandController.js
    aggregatorController.js
    outletController.js
    salesController.js
  routes/
    branchRoutes.js
    brandRoutes.js
    aggregatorRoutes.js
    outletRoutes.js
    salesRoutes.js

client/
  src/
    pages/
      backoffice/
        kitchens/
          BranchesList.jsx
          BranchDetail.jsx
          BrandDetail.jsx
          OutletDetail.jsx
          SalesDashboard.jsx
          SalesEntryForm.jsx
    components/
      kitchens/
        BranchCard.jsx
        BrandCard.jsx
        AggregatorBadge.jsx
        SalesTable.jsx
        SalesChart.jsx       ← Phase 3
```

---

## Important Notes for Cursor / AI Assistance

- **Do not add heavy validations during Phase 1.** Only `name: required` or equivalent minimal constraints. Validations come after the route/controller/frontend loop is confirmed working.
- **Schema fields marked as TBD should be left as placeholders or omitted** until the business logic is clearer.
- **Mongoose `timestamps: true`** must be on every schema.
- **`_id: false`** should be used on all nested sub-schemas that don't need their own ID (e.g., coordinate objects, utility cost objects).
- **Coverage area coordinates** are stored as `{ lat: Number, lng: Number }` arrays — Google Maps API compatible.
- **`openingTime` / `closingTime`** are stored as `String` in `"HH:mm"` format (e.g., `"07:00"`, `"23:00"`).
- **`terminationNoticePeriod`** is stored as `Number` (days).
- **`currency`** defaults to `"AED"` on the Branch cost object.
- **Salaries are not stored on Branch.** They will be derived from Employee assignment history in a future phase.
- The app is already a **MERN stack** with existing auth middleware. All new routes must be protected.
- The **Outlet model is the critical link** — do not bypass it by referencing branch+brand+aggregator directly on SalesEntry.
