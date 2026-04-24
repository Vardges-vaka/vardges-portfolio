// Single source of truth for every section in the branch detail view.
// Keeps section layout, payload keys, and editable subset all derivable from
// this one module so component/handler code never has to hard-code strings.

// ---- editable sections (fields the user can currently touch) ----
export const SECTION_KEYS = {
  basic: "basic",           // { name } — left column
  location: "location",     // { address, coordinates } — left column
  contact: "contact",       // { ourSupport, manager }
  operations: "operations", // { isActive, is24Hours, ..., dates }
  costs: "costs",           // { currency, fixed, monthlyServices, variable }
  contract: "contract",     // { duration, amount, terminationNoticePeriod, file* }
  notes: "notes",           // String
};

// ---- placeholder sections (not wired to edit flows yet) ----
export const PLACEHOLDER_SECTION_KEYS = {
  brands: "brands",
  employees: "employees",
  equipments: "equipments",
  coverage: "coverage",
  files: "files",
  sales: "sales",
};

// Maps a SECTION_KEY → the Mongoose top-level path its payload writes to.
// basic/notes are scalars; all other editable sections are subdocs.
export const SECTION_PAYLOAD_KEY = {
  basic: "name",
  location: "location",
  contact: "contact",
  operations: "operations",
  costs: "costs",
  contract: "contract",
  notes: "notes",
};

// Only these sections accept edits today. Bulk mode iterates this list.
export const EDITABLE_SECTIONS = [
  SECTION_KEYS.basic,
  SECTION_KEYS.location,
  SECTION_KEYS.contact,
  SECTION_KEYS.operations,
  SECTION_KEYS.costs,
  SECTION_KEYS.contract,
  SECTION_KEYS.notes,
];

// Layout buckets consumed by Branches_detail.jsx.
// - leftColumn : simple stacked readonly + basic/location edit surfaces
// - rightColumn: collapsible section cards (contact/ops/costs/contract/notes)
// - bottomStrip: placeholder sections wrapped in a row
export const SECTION_LAYOUT = {
  leftColumn: [SECTION_KEYS.basic, SECTION_KEYS.location],
  rightColumn: [
    SECTION_KEYS.contact,
    SECTION_KEYS.operations,
    SECTION_KEYS.costs,
    SECTION_KEYS.contract,
    SECTION_KEYS.notes,
  ],
  bottomStrip: [
    PLACEHOLDER_SECTION_KEYS.brands,
    PLACEHOLDER_SECTION_KEYS.employees,
    PLACEHOLDER_SECTION_KEYS.equipments,
    PLACEHOLDER_SECTION_KEYS.coverage,
    PLACEHOLDER_SECTION_KEYS.files,
  ],
  sales: PLACEHOLDER_SECTION_KEYS.sales,
};

// Legacy ordering (still used by Branches_detail.jsx v1 until the two-column
// rewrite lands). Keeps non-layout callers working.
export const SECTION_ORDER = [
  ...SECTION_LAYOUT.leftColumn,
  ...SECTION_LAYOUT.rightColumn,
];
